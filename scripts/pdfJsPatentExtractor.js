// pdfJsPatentExtractor.js
// Extract patent data using pdf.js-extract

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Extract patent data from PDF using pdf.js-extract
 * @returns {Promise<Array<Object>>} Array of patent objects
 */
async function extractPDFPatentData() {
  try {
    console.log('Extracting patent data using pdf.js-extract...');
    
    // First make sure pdf.js-extract is installed
    let PDFExtract;
    try {
      const pdfjs = await import('pdf.js-extract');
      PDFExtract = pdfjs.PDFExtract;
    } catch (e) {
      console.error('pdf.js-extract is not installed. Install it with: npm install pdf.js-extract');
      throw new Error('Missing dependency: pdf.js-extract');
    }
    
    // Path to PDF file
    const pdfPath = path.join(__dirname, '../TrophyWall.pdf');
    
    // Make sure the PDF exists
    if (!fs.existsSync(pdfPath)) {
      throw new Error(`PDF file not found: ${pdfPath}`);
    }
    
    console.log(`Using PDF file: ${pdfPath}`);
    
    // Create instance of PDFExtract
    const pdfExtract = new PDFExtract();
    const options = {}; // Default options
    
    console.log('Extracting text from PDF (this may take a moment)...');
    
    // Extract text from PDF
    const data = await pdfExtract.extract(pdfPath, options);
    
    // Create temp directory for extracted data
    const tempDir = path.join(__dirname, '../temp');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }
    
    // Save raw extraction data for inspection
    fs.writeFileSync(
      path.join(tempDir, 'pdf-extract-raw.json'),
      JSON.stringify(data, null, 2)
    );
    
    console.log(`Extracted ${data.pages.length} pages from PDF`);
    
    // Process the extraction to identify table structure
    // Define expected columns based on x-position ranges
    // These ranges may need adjustment based on the actual PDF layout
    const columns = [
      { name: 'index', xMin: 25, xMax: 50 },      // Column for row numbers (#)
      { name: 'id', xMin: 75, xMax: 180 },        // Column for Doc ID
      { name: 'date', xMin: 190, xMax: 280 },     // Column for Date Published
      { name: 'title', xMin: 290, xMax: 550 },    // Column for Title
      { name: 'pages', xMin: 560, xMax: 590 }     // Column for Image Pages
    ];
    
    // Get table bounds by looking for header row
    let headerRow = null;
    let headerY = 0;
    let headerPage = 0;
    
    // Search for header row that contains "Doc ID" and "Title"
    for (let pageIndex = 0; pageIndex < data.pages.length; pageIndex++) {
      const page = data.pages[pageIndex];
      
      // Look for text containing "Doc ID" or "Title" to identify the header row
      for (const item of page.content) {
        if (item.str === 'Doc ID' || item.str === 'Title') {
          headerRow = page.content.filter(
            text => Math.abs(text.y - item.y) < 1 // Items on same line
          );
          headerY = item.y;
          headerPage = pageIndex;
          break;
        }
      }
      
      if (headerRow) break;
    }
    
    if (!headerRow) {
      console.warn('Could not identify header row. Will try to extract patents anyway.');
      // Set some default values
      headerY = 0;
      headerPage = 0;
    } else {
      console.log(`Found header row on page ${headerPage + 1}`);
    }
    
    // Extract patent rows
    const patents = [];
    let currentPatent = null;
    
    // Process each page
    for (let pageIndex = headerPage; pageIndex < data.pages.length; pageIndex++) {
      const page = data.pages[pageIndex];
      
      // Skip header on first page
      const startY = pageIndex === headerPage ? headerY + 5 : 0;
      
      // Group text items by line (y-coordinate)
      const lines = {};
      for (const item of page.content) {
        // Skip items above the header on the first page
        if (pageIndex === headerPage && item.y < startY) continue;
        
        // Round y-position to group items on the same line (allowing for slight variations)
        const yKey = Math.round(item.y * 10) / 10; // Round to 1 decimal place
        if (!lines[yKey]) {
          lines[yKey] = [];
        }
        lines[yKey].push(item);
      }
      
      // Sort lines by y-position (top to bottom)
      const sortedYPositions = Object.keys(lines).map(Number).sort((a, b) => a - b);
      
      // Process each line
      for (const y of sortedYPositions) {
        const lineItems = lines[y];
        
        // Sort items in this line by x-position (left to right)
        lineItems.sort((a, b) => a.x - b.x);
        
        // Check if this is a new patent entry (first item is a number)
        const firstItem = lineItems[0];
        if (firstItem && /^\d+$/.test(firstItem.str.trim())) {
          // This is a new patent row
          
          // Save the previous patent if we have one
          if (currentPatent) {
            // Clean up the title
            currentPatent.title = currentPatent.title.replace(/\s+/g, ' ').trim();
            patents.push(currentPatent);
          }
          
          // Create a new patent object
          currentPatent = {
            index: parseInt(firstItem.str.trim()),
            id: '',
            publicationDate: '',
            title: '',
            imagePages: 0
          };
          
          // Assign text to appropriate columns
          for (const item of lineItems) {
            for (const column of columns) {
              if (item.x >= column.xMin && item.x <= column.xMax) {
                if (column.name === 'index') {
                  // Already set
                } else if (column.name === 'id') {
                  currentPatent.id += item.str + ' ';
                } else if (column.name === 'date') {
                  currentPatent.publicationDate += item.str + ' ';
                } else if (column.name === 'title') {
                  currentPatent.title += item.str + ' ';
                } else if (column.name === 'pages') {
                  if (/^\d+$/.test(item.str.trim())) {
                    currentPatent.imagePages = parseInt(item.str.trim());
                  }
                }
              }
            }
          }
          
          // Clean up strings
          currentPatent.id = currentPatent.id.trim();
          currentPatent.publicationDate = currentPatent.publicationDate.trim();
          currentPatent.title = currentPatent.title.trim();
          
        } else if (currentPatent) {
          // This might be a continuation line for the current patent
          // Check if any items fall in the title column
          for (const item of lineItems) {
            if (item.x >= columns.find(c => c.name === 'title').xMin && 
                item.x <= columns.find(c => c.name === 'title').xMax) {
              currentPatent.title += ' ' + item.str;
            }
            
            // Check for image pages if not set yet
            if (currentPatent.imagePages === 0 &&
                item.x >= columns.find(c => c.name === 'pages').xMin && 
                item.x <= columns.find(c => c.name === 'pages').xMax) {
              if (/^\d+$/.test(item.str.trim())) {
                currentPatent.imagePages = parseInt(item.str.trim());
              }
            }
          }
        }
      }
    }
    
    // Don't forget to add the last patent
    if (currentPatent) {
      currentPatent.title = currentPatent.title.replace(/\s+/g, ' ').trim();
      patents.push(currentPatent);
    }
    
    // Clean up and validate patents
    const cleanedPatents = patents.map(patent => {
      return {
        ...patent,
        // Make sure ID has correct format (US-XXXXXXXX-XX)
        id: patent.id.replace(/US[\s-]*(\d+)[\s-]*([A-Z]\d+)/i, 'US-$1-$2').trim(),
        // Clean up title
        title: patent.title.replace(/\s+/g, ' ').trim()
      };
    }).filter(patent => {
      // Filter out invalid patents
      const isValid = patent.id && patent.publicationDate && patent.title;
      if (!isValid) {
        console.warn(`Skipping invalid patent entry: ${JSON.stringify(patent)}`);
      }
      return isValid;
    });
    
    console.log(`Extracted ${cleanedPatents.length} patents with pdf.js-extract`);
    
    // Save extracted patents as JSON
    fs.writeFileSync(
      path.join(tempDir, 'extracted-patents-pdfjs.json'),
      JSON.stringify(cleanedPatents, null, 2)
    );
    
    return cleanedPatents;
  } catch (error) {
    console.error('Error extracting patent data with pdf.js-extract:', error);
    throw error;
  }
}

export default {
  extractPDFPatentData
};

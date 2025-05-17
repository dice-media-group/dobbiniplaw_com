// tabulaPatentExtractor.js
// Extract patent data as proper tables using tabula-js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Extract patent data from TrophyWall.pdf using tabula-js
 * @returns {Promise<Array<Object>>} Array of patent objects
 */
async function extractPatentTableData() {
  try {
    console.log('Extracting table data from TrophyWall.pdf...');
    
    // Load tabula-js (needs to be installed: npm install tabula-js)
    const tabulaModule = await import('tabula-js');
    const tabula = tabulaModule.default;
    
    if (!tabula) {
      throw new Error('Failed to import tabula-js. Make sure it is installed correctly.');
    }
    
    // Path to PDF file
    const pdfPath = path.join(__dirname, '../TrophyWall.pdf');
    
    // Make sure the PDF exists
    if (!fs.existsSync(pdfPath)) {
      throw new Error(`PDF file not found: ${pdfPath}`);
    }
    
    console.log(`Using PDF file: ${pdfPath}`);
    
    // Extract tables from all pages using tabula-js
    // Based on tabula-js documentation
    return new Promise((resolve, reject) => {
      try {
        // Create temporary directory for extracted files
        const tempDir = path.join(__dirname, '../temp');
        if (!fs.existsSync(tempDir)) {
          fs.mkdirSync(tempDir, { recursive: true });
        }
        
        // Use extractCsv and write to a file
        const tempFile = path.join(tempDir, 'extracted-patents.csv');
        
        // Extract to file
        const tabulaExtractor = tabula(pdfPath, {
          pages: 'all',
          spreadsheet: true,
          silent: false
        });
        
        console.log('Running tabula-java extraction (this may take a moment)...');
        
        // Extract to a temporary CSV file
        tabulaExtractor.extractCsv((err, data) => {
          if (err) {
            console.error('Tabula extraction error:', err);
            return reject(err);
          }
          
          console.log('Tabula extraction complete, saving CSV data...');
          
          // Write raw CSV to file for inspection
          fs.writeFileSync(tempFile, data);
          console.log(`Raw CSV data saved to: ${tempFile}`);
          
          // Parse CSV data
          const rows = data.split('\n').map(row => {
            // Clean and split each row
            return row.split(',').map(cell => cell.trim());
          });
          
          // Find the header row
          let headerRowIndex = -1;
          for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            if (row.some(cell => cell.includes('Doc ID') || cell.includes('Title'))) {
              headerRowIndex = i;
              break;
            }
          }
          
          // Validate we found a header
          if (headerRowIndex === -1) {
            console.warn('Could not find header row. Using first row as header.');
            headerRowIndex = 0;
          }
          
          console.log(`Found header row at index ${headerRowIndex}`);
          
          // Parse each patent row
          const patents = [];
          
          // Start from the row after the header
          for (let i = headerRowIndex + 1; i < rows.length; i++) {
            const row = rows[i];
            
            // Skip empty rows
            if (row.length < 3 || !row[0].trim()) {
              continue;
            }
            
            // Check if this starts a new patent (first cell contains a number)
            if (/^\d+$/.test(row[0].trim())) {
              // Extract patent data
              // Format: [index, docId, date, title, imagePages]
              const patent = {
                index: parseInt(row[0].trim()),
                id: row[1] ? row[1].trim() : '',
                publicationDate: row[2] ? row[2].trim() : '',
                title: row[3] ? row[3].trim() : '',
                imagePages: row[4] && /^\d+$/.test(row[4].trim()) ? parseInt(row[4].trim()) : 0
              };
              
              // Add to patents array
              patents.push(patent);
              
              // Look ahead for continuation rows
              let j = i + 1;
              while (j < rows.length && 
                     (rows[j].length < 3 || !rows[j][0].trim() || !rows[j][0].match(/^\d+$/))) {
                
                // If this has content in the title column, append it
                if (rows[j][3] && rows[j][3].trim()) {
                  patent.title += ' ' + rows[j][3].trim();
                }
                
                // If this has content in the imagePages column and we don't have imagePages yet
                if (patent.imagePages === 0 && rows[j][4] && /^\d+$/.test(rows[j][4].trim())) {
                  patent.imagePages = parseInt(rows[j][4].trim());
                }
                
                j++;
              }
              
              // Clean up the title
              patent.title = patent.title.replace(/\s+/g, ' ').trim();
            }
          }
          
          console.log(`Extracted ${patents.length} patents from CSV data`);
          
          // Save patents as JSON for further analysis
          const patentsJson = path.join(tempDir, 'extracted-patents.json');
          fs.writeFileSync(patentsJson, JSON.stringify(patents, null, 2));
          console.log(`Patents saved to: ${patentsJson}`);
          
          resolve(patents);
        });
      } catch (error) {
        console.error('Error during tabula extraction process:', error);
        reject(error);
      }
    });
  } catch (error) {
    console.error('Error extracting table data:', error);
    throw error;
  }
}

export default {
  extractPatentTableData
};

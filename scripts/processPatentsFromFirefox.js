// processPatentsFromFirefox.js
// Script to process patents using Firefox-downloaded files

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import processPatents from './processPatents.js';
import firefoxPatentProcessor from './firefoxPatentProcessor.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { parsePatentsList, categorizePatents, savePatentData } = processPatents;
const { enhancePatentDataFromFirefox, LOCAL_PATENT_DIR } = firefoxPatentProcessor;

/**
 * Parse patent entries from text content with better title handling
 * @param {string} text - Text content from TrophyWall.txt
 * @returns {Array<Object>} Array of patent objects
 */
function parsePatentsListImproved(text) {
  const patents = [];
  const lines = text.split('\n');
  
  // Regular expression to match the first line of a patent entry
  // Format: <index> <doc-id> <date> <title> <image-pages>
  const patentHeaderRegex = /^(\d+)\s+(US-[\d]+-[A-Z]\d+)\s+(\d{4}-\d{2}-\d{2})\s+(.+?)\s+(\d+)$/;
  
  let i = 0;
  while (i < lines.length) {
    const line = lines[i].trim();
    
    // Skip empty lines or page markers
    if (!line || line.match(/^\d+\/\d+\/\d+ \d+:\d+:\d+ [AP]M$/)) {
      i++;
      continue;
    }
    
    // Check if line starts a new patent entry
    const headerMatch = line.match(patentHeaderRegex);
    
    if (headerMatch) {
      const [_, index, docId, date, title, imagePages] = headerMatch;
      
      // Add the patent with just this line's title
      const patent = {
        index: parseInt(index),
        id: docId,
        publicationDate: date,
        title: title.trim(),
        imagePages: parseInt(imagePages)
      };
      
      patents.push(patent);
      
      // Look ahead to see if next line is a continuation of this title
      let j = i + 1;
      while (j < lines.length) {
        const nextLine = lines[j].trim();
        
        // If next line is empty, a page marker, or starts a new patent, stop
        if (!nextLine || 
            nextLine.match(/^\d+\/\d+\/\d+ \d+:\d+:\d+ [AP]M$/) ||
            nextLine.match(patentHeaderRegex)) {
          break;
        }
        
        // Otherwise, it's a continuation of the title
        patent.title += ' ' + nextLine;
        j++;
      }
      
      i = j; // Skip ahead to after the title continuation
    } else {
      // If line doesn't match pattern, move to next line
      i++;
    }
  }
  
  return patents;
}

/**
 * Process patents using Firefox-downloaded files
 */
async function processPatentsFromFirefox() {
  try {
    console.log('Starting patent processing with Firefox downloads...');
    console.log(`Using local patent directory: ${LOCAL_PATENT_DIR}`);
    
    // Verify the local patent directory exists
    if (!fs.existsSync(LOCAL_PATENT_DIR)) {
      console.error(`ERROR: Local patent directory not found: ${LOCAL_PATENT_DIR}`);
      console.error('Please download patent pages to this directory or set the PATENT_COLLECTION_DIR environment variable.');
      return;
    }
    
    // First, process the TrophyWall.pdf to extract patent data
    const textContent = fs.readFileSync(path.join(__dirname, '../source examples/TrophyWall.txt'), 'utf8');
    // Use the improved parser for better title handling
    const patents = parsePatentsListImproved(textContent);
    console.log(`Parsed ${patents.length} patents from TrophyWall`);
    
    // Option to take a subset for testing
    let patentsToProcess = patents;
    const testMode = process.env.TEST_MODE === 'true';
    
    if (testMode) {
      const testCount = parseInt(process.env.TEST_COUNT) || 5;
      patentsToProcess = patents.slice(0, testCount);
      console.log(`TEST MODE: Using ${patentsToProcess.length} patents for testing`);
    }
    
    // Enhance patents with abstracts and images from Firefox downloads
    console.log('Enhancing patents with abstracts and images from Firefox downloads...');
    const enhancedPatents = await enhancePatentDataFromFirefox(patentsToProcess);
    
    // Categorize enhanced patents
    const categorizedPatents = categorizePatents(enhancedPatents);
    console.log('\nCategorized patents:');
    Object.entries(categorizedPatents).forEach(([category, patents]) => {
      console.log(`- ${category}: ${patents.length} patents`);
    });
    
    // Save to JSON files
    savePatentData(categorizedPatents);
    
    console.log('\nPatent processing with Firefox downloads complete!');
    console.log(`Successfully processed ${enhancedPatents.length} patents`);
    
    if (testMode) {
      console.log('\nTEST MODE was enabled. To process all patents, run without TEST_MODE=true');
    }
  } catch (error) {
    console.error('Error processing patents with Firefox downloads:', error);
  }
}

// Export the function
export default {
  processPatentsFromFirefox
};

// improvedPatentProcessor-table.js
// Improved patent processor using table extraction

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pdfJsPatentExtractor from './pdfJsPatentExtractor.js';
import processPatents from './processPatents.js';
import firefoxPatentProcessor from './firefoxPatentProcessor.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { categorizePatents, savePatentData } = processPatents;
const { enhancePatentDataFromFirefox } = firefoxPatentProcessor;

/**
 * Process patents using improved PDF table extraction
 * @param {string} method - Extraction method: 'pdfjs' (default) or 'tabula' (if you want to try the tabula method later)
 */
async function processPatentsWithTableExtraction(method = 'pdfjs') {
  try {
    console.log(`Starting patent processing with ${method} table extraction...`);
    
    // Extract patents from PDF
    let patents;
    
    // Use pdf.js-extract by default (more reliable)
    patents = await pdfJsPatentExtractor.extractPDFPatentData();
    
    console.log(`Successfully parsed ${patents.length} patents from PDF using ${method}`);
    
    // Save raw extracted data for comparison
    const outputDir = path.join(__dirname, '../source examples');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    fs.writeFileSync(
      path.join(outputDir, `patents-${method}-extracted.json`),
      JSON.stringify(patents, null, 2)
    );
    
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
    
    console.log('\nImproved patent processing with table extraction complete!');
    console.log(`Successfully processed ${enhancedPatents.length} patents`);
    
    if (testMode) {
      console.log('\nTEST MODE was enabled. To process all patents, run without TEST_MODE=true');
    }
  } catch (error) {
    console.error(`Error in patent processing with ${method}:`, error);
  }
}

// Add a runner function with method selection
function runProcessing(method = 'pdfjs') {
  console.log(`Starting patent processing with ${method} table extraction...`);
  processPatentsWithTableExtraction(method)
    .then(() => {
      console.log('Processing complete!');
    })
    .catch((error) => {
      console.error('Error during processing:', error);
      process.exit(1);
    });
}

// Export the functions
export default {
  processPatentsWithTableExtraction,
  runProcessing
};

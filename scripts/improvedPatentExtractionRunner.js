// improvedPatentExtractionRunner.js
// Runner script for improved patent extraction with enhanced image analysis

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pdfJsPatentExtractor from './pdfJsPatentExtractor.js';
import enhancedImageProcessor from './enhancedImageProcessor.js';
import processPatents from './processPatents.js';

const { categorizePatents, savePatentData } = processPatents;
const { enhancePatentsWithImages } = enhancedImageProcessor;

// Get directory paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Run improved patent extraction with enhanced image analysis
 */
async function runImprovedExtraction() {
  try {
    console.log('Starting improved patent extraction with enhanced image analysis...');
    
    // First extract patents from PDF
    const patents = await pdfJsPatentExtractor.extractPDFPatentData();
    console.log(`Successfully extracted ${patents.length} patents from PDF`);
    
    // Option for testing with a subset
    let patentsToProcess = patents;
    const testMode = process.env.TEST_MODE === 'true';
    
    if (testMode) {
      const testCount = parseInt(process.env.TEST_COUNT) || 5;
      patentsToProcess = patents.slice(0, testCount);
      console.log(`TEST MODE: Using ${patentsToProcess.length} patents for testing`);
    }
    
    // Enhance patents with abstracts and images using the improved analyzer
    console.log('Enhancing patents with abstracts and images (intelligent analysis)...');
    const enhancedPatents = await enhancePatentsWithImages(patentsToProcess);
    
    // Categorize enhanced patents
    const categorizedPatents = categorizePatents(enhancedPatents);
    console.log('\nCategorized patents:');
    Object.entries(categorizedPatents).forEach(([category, patents]) => {
      console.log(`- ${category}: ${patents.length} patents`);
    });
    
    // Save to JSON files
    savePatentData(categorizedPatents);
    
    // Also save the complete list of patents to all-patents.json
    const allPatentsPath = path.join(__dirname, '../content/patents/all-patents.json');
    fs.writeFileSync(allPatentsPath, JSON.stringify({ patents: enhancedPatents }, null, 2));
    console.log(`Saved all patents to ${allPatentsPath}`);
    
    console.log('\nImproved patent extraction complete!');
    console.log(`Successfully processed ${enhancedPatents.length} patents`);
    
    if (testMode) {
      console.log('\nTEST MODE was enabled. To process all patents, run without TEST_MODE=true');
    }
  } catch (error) {
    console.error('Error in improved patent extraction:', error);
  }
}

// Run the extraction process
runImprovedExtraction()
  .then(() => console.log('Process complete!'))
  .catch(error => {
    console.error('Error during processing:', error);
    process.exit(1);
  });

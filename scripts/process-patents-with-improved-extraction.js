// process-patents-with-improved-extraction.js
// Runner script that combines improved PDF extraction with existing high-res image handling

import pdfJsPatentExtractor from './pdfJsPatentExtractor.js';
import processPatents from './processPatents.js';
import firefoxPatentProcessor from './firefoxPatentProcessor.js';

const { categorizePatents, savePatentData } = processPatents;
const { enhancePatentDataFromFirefox } = firefoxPatentProcessor;

/**
 * Process patents using improved PDF extraction and existing high-res image handling
 */
async function processPatentsWithImprovedExtraction() {
  try {
    console.log('Starting patent processing with improved PDF extraction...');
    
    // Extract patents using the improved PDF.js extractor
    const patents = await pdfJsPatentExtractor.extractPDFPatentData();
    console.log(`Successfully extracted ${patents.length} patents from PDF`);
    
    // Option for testing with a subset of patents
    let patentsToProcess = patents;
    const testMode = process.env.TEST_MODE === 'true';
    
    if (testMode) {
      const testCount = parseInt(process.env.TEST_COUNT) || 5;
      patentsToProcess = patents.slice(0, testCount);
      console.log(`TEST MODE: Using ${patentsToProcess.length} patents for testing`);
    }
    
    // Enhance patents with abstracts and images (including high-res) using your existing process
    console.log('Enhancing patents with abstracts and images from Firefox downloads...');
    const enhancedPatents = await enhancePatentDataFromFirefox(patentsToProcess);
    
    // Categorize enhanced patents
    const categorizedPatents = categorizePatents(enhancedPatents);
    console.log('\nCategorized patents:');
    Object.entries(categorizedPatents).forEach(([category, patents]) => {
      console.log(`- ${category}: ${patents.length} patents`);
    });
    
    // Save to JSON files using your existing function
    savePatentData(categorizedPatents);
    
    console.log('\nPatent processing with improved extraction complete!');
    console.log(`Successfully processed ${enhancedPatents.length} patents`);
    
    if (testMode) {
      console.log('\nTEST MODE was enabled. To process all patents, run without TEST_MODE=true');
    }
  } catch (error) {
    console.error('Error in patent processing with improved extraction:', error);
  }
}

// Run the function if called directly
processPatentsWithImprovedExtraction()
  .then(() => console.log('Processing complete!'))
  .catch(error => {
    console.error('Error during processing:', error);
    process.exit(1);
  });

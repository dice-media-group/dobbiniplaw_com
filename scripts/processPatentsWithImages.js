// processPatentsWithImages.js
// Combined script to process patents and fetch images/abstracts

const fs = require('fs');
const path = require('path');
const { processTrophyWall, parsePatentsList, categorizePatents, savePatentData } = require('./processPatents');
const { enhancePatentData } = require('./patentImageFetcher');

/**
 * Process patents and enhance with images and abstracts
 * @param {boolean} downloadImages - Whether to download real images from Google Patents
 */
async function processPatentsWithImages(downloadImages = false) {
  try {
    console.log('Starting patent processing with image fetching...');
    
    // First, process the TrophyWall.pdf to extract patent data
    const textContent = fs.readFileSync(path.join(__dirname, '../source examples/TrophyWall.txt'), 'utf8');
    const patents = parsePatentsList(textContent);
    console.log(`Parsed ${patents.length} patents from TrophyWall`);
    
    // Process all patents instead of just a subset
    console.log(`Using all ${patents.length} patents from the list`);
    
    // Enhance patents with abstracts and images
    console.log('Enhancing patents with abstracts and images...');
    const enhancedPatents = await enhancePatentData(patents, downloadImages);
    
    // Categorize enhanced patents
    const categorizedPatents = categorizePatents(enhancedPatents);
    console.log('Categorized patents:');
    Object.entries(categorizedPatents).forEach(([category, patents]) => {
      console.log(`- ${category}: ${patents.length} patents`);
    });
    
    // Save to JSON files
    savePatentData(categorizedPatents);
    
    // Also save the complete list of patents to all-patents.json
    const allPatentsPath = path.join(__dirname, '../content/patents/all-patents.json');
    fs.writeFileSync(allPatentsPath, JSON.stringify({ patents: enhancedPatents }, null, 2));
    console.log(`Saved all patents to ${allPatentsPath}`);
    
    console.log('Patent processing with images complete!');
  } catch (error) {
    console.error('Error processing patents with images:', error);
  }
}

// Export the function
module.exports = {
  processPatentsWithImages
};

// Uncomment to run the process
// processPatentsWithImages(true);

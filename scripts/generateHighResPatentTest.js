// generateHighResPatentTest.js
// Generate a test all-patents.json with high-resolution images

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pdfJsPatentExtractor from './pdfJsPatentExtractor.js';
import firefoxPatentProcessor from './firefoxPatentProcessor.js';
import processPatents from './processPatents.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { enhancePatentDataFromFirefox, findPatentImagesInCentralDirectory, LOCAL_PATENT_DIR } = firefoxPatentProcessor;
const { categorizePatents } = processPatents;

/**
 * Generate a test all-patents.json with high-resolution images
 */
async function generateHighResPatentTest() {
  try {
    console.log('Generating test patent data with high-resolution images...');
    console.log(`Using local patent directory: ${LOCAL_PATENT_DIR}`);
    
    // Verify image directory exists
    const imagesDir = path.join(LOCAL_PATENT_DIR, 'images');
    if (!fs.existsSync(imagesDir)) {
      console.error(`ERROR: Images directory not found: ${imagesDir}`);
      return;
    }
    
    // Extract patents using improved PDF extraction
    const patents = await pdfJsPatentExtractor.extractPDFPatentData();
    console.log(`Extracted ${patents.length} patents from PDF`);
    
    // Option to take a subset for testing
    let patentsToProcess = patents;
    const testMode = process.env.TEST_MODE === 'true';
    
    if (testMode) {
      const testCount = parseInt(process.env.TEST_COUNT) || 5;
      patentsToProcess = patents.slice(0, testCount);
      console.log(`TEST MODE: Using ${patentsToProcess.length} patents for testing`);
    }
    
    // Enhanced patents with abstracts and images
    console.log('\nEnhancing patents with abstracts and images...');
    const enhancedPatents = await enhancePatentDataFromFirefox(patentsToProcess);
    
    // Additional step: Check for high-res images for each patent
    console.log('\nChecking for high-resolution images...');
    let highResCount = 0;
    
    const patentsWithHighRes = enhancedPatents.map(patent => {
      // Check the central images directory for this patent
      const centralImages = findPatentImagesInCentralDirectory(patent.id);
      
      // Count patents with high-res images
      const hasHighRes = centralImages.some(img => img.hiresPath);
      if (hasHighRes) {
        highResCount++;
      }
      
      // Add hiresImages array if high-res images exist
      if (hasHighRes) {
        // Filter to just high-res images
        const hiResImages = centralImages
          .filter(img => img.hiresPath)
          .map(img => {
            // Extract figure number from the path
            const figNum = img.figureNum || 1;
            // Path to public high-res image
            return `/images/patents/${patent.id}/hires/fig${figNum}${path.extname(img.hiresPath)}`;
          });
        
        return {
          ...patent,
          // Make sure hiresImages is included in the JSON
          hiresImages: hiResImages
        };
      }
      
      return patent;
    });
    
    console.log(`Found ${highResCount} patents with high-resolution images`);
    
    // Create content directory if it doesn't exist
    const contentDir = path.join(__dirname, '../content/patents');
    if (!fs.existsSync(contentDir)) {
      fs.mkdirSync(contentDir, { recursive: true });
    }
    
    // Generate all-patents.json with high-res images
    const allPatents = patentsWithHighRes.map(patent => {
      // Create a clean patent entry for the JSON
      return {
        id: patent.id,
        title: patent.title,
        publicationDate: patent.publicationDate,
        imagePages: patent.imagePages,
        abstract: patent.abstract || "To be fetched from Google Patents",
        featured: false,
        // Regular images
        images: patent.images || [`/images/patents/${patent.id}/fig1.jpg`],
        // Include high-res images if available
        hiresImages: patent.hiresImages || []
      };
    });
    
    // Sort patents by publication date (newest first)
    allPatents.sort((a, b) => 
      new Date(b.publicationDate).getTime() - new Date(a.publicationDate).getTime()
    );
    
    // Mark the first patent as featured
    if (allPatents.length > 0) {
      allPatents[0].featured = true;
    }
    
    // Save the test all-patents.json
    fs.writeFileSync(
      path.join(contentDir, 'test-all-patents.json'),
      JSON.stringify({ patents: allPatents }, null, 2)
    );
    
    console.log(`\nTest all-patents.json generated with ${allPatents.length} patents`);
    console.log(`File saved to: ${path.join(contentDir, 'test-all-patents.json')}`);
    
    // Also generate a test file for each category
    const categorizedPatents = categorizePatents(patentsWithHighRes);
    
    for (const [category, patents] of Object.entries(categorizedPatents)) {
      if (patents.length === 0) continue;
      
      // Sort patents by publication date (newest first)
      patents.sort((a, b) => 
        new Date(b.publicationDate).getTime() - new Date(a.publicationDate).getTime()
      );
      
      const categoryData = {
        categoryId: category,
        patents: patents.map(patent => {
          // Create a clean patent object
          const cleanPatent = {
            id: patent.id,
            title: patent.title,
            publicationDate: patent.publicationDate,
            imagePages: patent.imagePages,
            abstract: patent.abstract || "To be fetched from Google Patents",
            featured: false,
            // Regular images
            images: patent.images || [`/images/patents/${patent.id}/fig1.jpg`],
            // Include high-res images if available
            hiresImages: patent.hiresImages || []
          };
          
          return cleanPatent;
        })
      };
      
      // Mark first (newest) patent as featured
      if (categoryData.patents.length > 0) {
        categoryData.patents[0].featured = true;
      }
      
      // Save the test category JSON
      fs.writeFileSync(
        path.join(contentDir, `test-${category}.json`),
        JSON.stringify(categoryData, null, 2)
      );
      
      console.log(`Test ${category}.json generated with ${patents.length} patents`);
    }
    
    console.log('\nAll test files generated successfully!');
  } catch (error) {
    console.error('Error generating high-res patent test:', error);
  }
}

// Run the function if executed directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  generateHighResPatentTest()
    .then(() => console.log('Test generation complete'))
    .catch(error => console.error('Error during test generation:', error));
}

export default {
  generateHighResPatentTest
};

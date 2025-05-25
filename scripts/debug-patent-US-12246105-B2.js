// Debug script for specific patent US-12246105-B2
import { getValidatedConfig } from './patent-processing/config.js';
import { ImageProcessor } from './patent-processing/ImageProcessor.js';

const config = getValidatedConfig();
const imageProcessor = new ImageProcessor(config);

async function debugPatentImages() {
  const patentId = 'US-12246105-B2';
  const formattedId = patentId.replace(/-/g, ''); // US12246105B2
  const patentIdBase = formattedId.replace(/([A-Z]\d+)$/, ''); // US12246105
  
  console.log('='.repeat(60));
  console.log(`🔍 DEBUGGING PATENT: ${patentId}`);
  console.log('='.repeat(60));
  console.log(`Formatted ID: ${formattedId}`);
  console.log(`Base ID: ${patentIdBase}`);
  console.log(`Patent collection dir: ${config.LOCAL_PATENT_DIR}`);
  console.log(`Central images dir: ${config.CENTRAL_IMAGES_DIR}`);
  console.log('');
  
  // Call the image finding function with detailed logging
  try {
    const allImages = await imageProcessor.findAllPatentImages(patentId, formattedId);
    
    console.log('='.repeat(60));
    console.log(`📊 RESULTS: Found ${allImages.length} total images`);
    console.log('='.repeat(60));
    
    if (allImages.length > 0) {
      allImages.forEach((img, index) => {
        console.log(`${index + 1}. ${img.filename}`);
        console.log(`   Path: ${img.path}`);
        console.log(`   Source: ${img.source}`);
        console.log(`   Size: ${img.size} bytes`);
        console.log(`   Figure: ${img.figureNum}`);
        console.log(`   Priority: ${img.priority}`);
        console.log('');
      });
    } else {
      console.log('❌ NO IMAGES FOUND');
      console.log('This could mean:');
      console.log('1. No files contain "US12246105" in their name');
      console.log('2. Files exist but are not PNG format');
      console.log('3. Files are in directories not being searched');
      console.log('4. Permission issues accessing files');
    }
  } catch (error) {
    console.error('❌ ERROR during image search:', error);
  }
}

debugPatentImages();

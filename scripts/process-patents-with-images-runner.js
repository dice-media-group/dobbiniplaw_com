// process-patents-with-images-runner.js
// Simple runner script for processPatentsWithImages

import processPatentsWithImages from './processPatentsWithImages.js';

// Get download images flag from command line argument
const shouldDownload = process.argv[2] === 'true';

console.log(`Starting patent processing with images (download=${shouldDownload})...`);
processPatentsWithImages.processPatentsWithImages(shouldDownload)
  .then(() => {
    console.log('Processing complete!');
  })
  .catch((error) => {
    console.error('Error during processing:', error);
    process.exit(1);
  });

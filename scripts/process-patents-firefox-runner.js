// process-patents-firefox-runner.js
// Simple runner script for processPatentsFromFirefox

import processPatentsFromFirefox from './processPatentsFromFirefox.js';

console.log('Starting patent processing from Firefox downloads...');
processPatentsFromFirefox.processPatentsFromFirefox()
  .then(() => {
    console.log('Processing complete!');
  })
  .catch((error) => {
    console.error('Error during processing:', error);
    process.exit(1);
  });

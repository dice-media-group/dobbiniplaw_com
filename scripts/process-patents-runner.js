// process-patents-runner.js
// Simple runner script for processTrophyWall

import processPatents from './processPatents.js';

console.log('Starting basic patent processing...');
processPatents.processTrophyWall()
  .then(() => {
    console.log('Processing complete!');
  })
  .catch((error) => {
    console.error('Error during processing:', error);
    process.exit(1);
  });

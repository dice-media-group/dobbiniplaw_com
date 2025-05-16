// test-patent-processing.js
// A simple script to test the patent processing functionality

const { processTrophyWall } = require('./processPatents');

console.log('Starting patent processing test...');
processTrophyWall()
  .then(() => {
    console.log('Patent processing test completed successfully!');
  })
  .catch(err => {
    console.error('Patent processing test failed:', err);
    process.exit(1);
  });

// generate-highres-test-runner.js
// Runner script for generating test patent data with high-resolution images

import generateHighResPatentTest from './generateHighResPatentTest.js';

console.log('Starting high-resolution patent test data generation...');
generateHighResPatentTest.generateHighResPatentTest()
  .then(() => {
    console.log('High-resolution patent test generation complete!');
  })
  .catch((error) => {
    console.error('Error during test generation:', error);
    process.exit(1);
  });

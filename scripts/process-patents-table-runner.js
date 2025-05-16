// process-patents-table-runner.js
// Runner script for improved patent processor with table extraction

import improvedPatentProcessor from './improvedPatentProcessor-table.js';

// Method is 'pdfjs' by default
const extractionMethod = process.argv[2] || 'pdfjs';

console.log(`Starting patent processing with ${extractionMethod} table extraction...`);
improvedPatentProcessor.runProcessing(extractionMethod);

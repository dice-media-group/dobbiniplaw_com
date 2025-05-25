// improvedPatentExtractionRunner.js
// Runner script for improved patent extraction with enhanced image analysis

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pdfJsPatentExtractor from './pdfJsPatentExtractor.js';
import enhancedImageProcessor from './enhancedImageProcessor.js';
import processPatents from './processPatents.js';
import { getValidatedConfig } from './patent-processing/config.js';
import { Logger, ProcessingError, validateEnvironment, retry } from './patent-processing/utils.js';

const { categorizePatents, savePatentData } = processPatents;
const { enhancePatentsWithImages } = enhancedImageProcessor;

// Get directory paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Validate and get environment variables
const env = validateEnvironment({
  VERBOSE: false,
  BATCH_SIZE: 3,
  TEST_MODE: false,
  TEST_COUNT: 5
});

// Initialize logger
const logger = new Logger(env.VERBOSE, 'PatentExtractor');

// Global tracking for completion report
const processingReport = {
  missingHtmlFiles: new Set(),
  processingErrors: new Set(),  
  imageErrors: new Set(),
  successfulPatents: new Set(),
  startTime: null,
  endTime: null
};

/**
 * Process patents in parallel batches for better performance
 * @param {Array} patents - Array of patents to process
 * @param {Function} processor - Function to process each patent
 * @param {number} batchSize - Number of patents to process concurrently
 * @returns {Promise<Array>} Array of processed results
 */
async function processPatentsInBatches(patents, processor, batchSize = env.BATCH_SIZE) {
  // Input validation
  if (!Array.isArray(patents) || patents.length === 0) {
    throw new ProcessingError('Patents array is required and must not be empty');
  }
  if (typeof processor !== 'function') {
    throw new ProcessingError('Processor must be a function');
  }
  if (batchSize < 1 || batchSize > 50) {
    throw new ProcessingError('Batch size must be between 1 and 50');
  }

  const results = [];
  const totalBatches = Math.ceil(patents.length / batchSize);
  
  logger.info(`Processing ${patents.length} patents in ${totalBatches} batches of ${batchSize}`);
  
  for (let i = 0; i < patents.length; i += batchSize) {
    const batch = patents.slice(i, i + batchSize);
    const batchNumber = Math.floor(i / batchSize) + 1;
    
    logger.progress(
      `Processing batch ${batchNumber}/${totalBatches}`,
      i + batch.length,
      patents.length
    );
    
    // Process batch in parallel with retry logic
    const batchResults = await Promise.all(
      batch.map(async (patent, index) => {
        const globalIndex = i + index;
        const timer = logger.timer(`Patent ${globalIndex + 1}: ${patent.id}`);
        
        try {
          const result = await retry(
            () => processor(patent),
            3, // max retries
            1000, // initial delay
            logger
          );
          
          timer.end();
          
          // Track successful processing for report
          processingReport.successfulPatents.add(patent.id);
          
          return result;
        } catch (error) {
          timer.end();
          logger.error(`Failed to process patent ${patent.id}`, error);
          
          // Track processing error for report
          processingReport.processingErrors.add({
            patentId: patent.id,
            error: error.message,
            type: 'processing_failure'
          });
          
          // Return a fallback patent object instead of failing completely
          return {
            ...patent,
            abstract: `Error processing patent ${patent.id}: ${error.message}`,
            inventors: [],
            assignee: `Error processing patent ${patent.id}`,
            images: [{
              thumbnail: `/images/patents/placeholder.svg`,
              hires: `/images/patents/placeholder.svg`,
              caption: 'No image available'
            }],
            processingError: true,
            errorType: 'processing_failure',
            errorMessage: error.message
          };
        }
      })
    );
    
    results.push(...batchResults);
    
    // Small delay between batches to prevent overwhelming the file system
    if (i + batchSize < patents.length) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
  
  return results;
}

/**
 * Enhanced patent processor with better error handling and issue tracking
 * @param {Object} patent - Patent object to process
 * @returns {Promise<Object>} Enhanced patent object
 */
async function processPatent(patent) {
  logger.debug(`Enhancing data for patent ${patent.id}`);
  
  if (!patent || !patent.id) {
    throw new ProcessingError('Invalid patent object - missing id', patent?.id);
  }
  
  try {
    // Process patent images
    const images = await enhancedImageProcessor.processPatentImagesEnhanced(patent.id);
    
    // Check if images are just placeholders (indicates image processing issues)
    const hasOnlyPlaceholders = images.every(img => 
      img.thumbnail.includes('placeholder') || img.hires.includes('placeholder')
    );
    
    if (hasOnlyPlaceholders && images.length === 1) {
      processingReport.imageErrors.add({
        patentId: patent.id,
        issue: 'No images found, using placeholder'
      });
    }
    
    // Fetch patent details
    const details = await enhancedImageProcessor.extractPatentDetails(patent.id);
    
    // Check for missing HTML file indicators
    if (details.abstract && details.abstract.includes('HTML file not found')) {
      processingReport.missingHtmlFiles.add({
        patentId: patent.id,
        issue: 'HTML file not found',
        abstract: details.abstract,
        assignee: details.assignee
      });
    }
    
    // Check for other metadata extraction issues
    if (details.abstract && details.abstract.includes('Error extracting details')) {
      processingReport.processingErrors.add({
        patentId: patent.id,
        error: details.abstract,
        type: 'metadata_extraction_error'
      });
    }
    
    // Add enhanced data to patent
    const enhancedPatent = {
      ...patent,
      abstract: details.abstract,
      inventors: details.inventors,
      assignee: details.assignee,
      images: images,
      featured: patent.id === 'US-10794647-B2', // Example featured patent
      lastProcessed: new Date().toISOString()
    };
    
    // Add flags for issues found
    if (details.abstract && details.abstract.includes('HTML file not found')) {
      enhancedPatent.missingHtmlFile = true;
    }
    
    if (hasOnlyPlaceholders && images.length === 1) {
      enhancedPatent.missingImages = true;
    }
    
    return enhancedPatent;
    
  } catch (error) {
    throw new ProcessingError(
      `Failed to enhance patent data`,
      patent.id,
      error
    );
  }
}

/**
 * Generate and display completion report
 * @param {Array} enhancedPatents - Array of processed patents
 * @param {number} processingTime - Total processing time in ms
 */
function generateCompletionReport(enhancedPatents, processingTime) {
  const totalPatents = enhancedPatents.length;
  const successfulCount = processingReport.successfulPatents.size;
  const missingHtmlCount = processingReport.missingHtmlFiles.size;
  const processingErrorCount = processingReport.processingErrors.size;
  const imageErrorCount = processingReport.imageErrors.size;
  
  logger.info('\n' + '='.repeat(80));
  logger.success('🎉 PATENT PROCESSING COMPLETION REPORT');
  logger.info('='.repeat(80));
  
  // Overall Statistics
  logger.info(`📊 Overall Statistics:`);
  logger.info(`  • Total patents processed: ${totalPatents}`);
  logger.info(`  • Successfully processed: ${successfulCount} (${Math.round((successfulCount/totalPatents)*100)}%)`);
  logger.info(`  • Total processing time: ${Math.round(processingTime/1000)}s`);
  logger.info(`  • Average time per patent: ${Math.round(processingTime/totalPatents)}ms`);
  
  // Issues Summary
  if (missingHtmlCount + processingErrorCount + imageErrorCount > 0) {
    logger.info(`\n⚠️  Issues Found:`);
    
    if (missingHtmlCount > 0) {
      logger.warn(`  • Missing HTML files: ${missingHtmlCount} patents`);
    }
    
    if (imageErrorCount > 0) {
      logger.warn(`  • Image processing issues: ${imageErrorCount} patents`);
    }
    
    if (processingErrorCount > 0) {
      logger.warn(`  • Processing errors: ${processingErrorCount} patents`);
    }
  } else {
    logger.success(`\n✅ No issues found - all patents processed successfully!`);
  }
  
  // Detailed Missing HTML Files Report
  if (missingHtmlCount > 0) {
    logger.info(`\n🔍 Patents with Missing HTML Files:`);
    const missingHtmlArray = Array.from(processingReport.missingHtmlFiles);
    
    missingHtmlArray.forEach((item, index) => {
      logger.warn(`  ${index + 1}. ${item.patentId}`);
      if (env.VERBOSE) {
        logger.info(`     Issue: ${item.issue}`);
      }
    });
    
    // Save detailed report to file - Updated to use data directory
    const reportPath = path.join(__dirname, '../data/patents/missing-html-report.json');
    const detailedReport = {
      generatedAt: new Date().toISOString(),
      totalPatents,
      missingHtmlFiles: missingHtmlArray,
      processingErrors: Array.from(processingReport.processingErrors),
      imageErrors: Array.from(processingReport.imageErrors),
      successfulPatents: Array.from(processingReport.successfulPatents),
      statistics: {
        successRate: Math.round((successfulCount/totalPatents)*100),
        missingHtmlRate: Math.round((missingHtmlCount/totalPatents)*100),
        processingTime: processingTime
      }
    };
    
    fs.writeFileSync(reportPath, JSON.stringify(detailedReport, null, 2));
    logger.info(`\n📄 Detailed report saved to: ${reportPath}`);
  }
  
  // Processing Errors Details
  if (processingErrorCount > 0) {
    logger.info(`\n💥 Processing Errors:`);
    const errorArray = Array.from(processingReport.processingErrors);
    
    errorArray.forEach((item, index) => {
      logger.error(`  ${index + 1}. ${item.patentId}: ${item.error}`);
    });
  }
  
  // Image Issues Details  
  if (imageErrorCount > 0) {
    logger.info(`\n🖼️  Image Processing Issues:`);
    const imageErrorArray = Array.from(processingReport.imageErrors);
    
    imageErrorArray.forEach((item, index) => {
      logger.warn(`  ${index + 1}. ${item.patentId}: ${item.issue}`);
    });
  }
  
  // Recommendations
  logger.info(`\n💡 Recommendations:`);
  
  if (missingHtmlCount > 0) {
    logger.info(`  • Check patent directory structure and file naming`);
    logger.info(`  • Verify PATENT_COLLECTION_DIR environment variable`);
    logger.info(`  • Run: find /patent/dir -name "*.html" | head -10`);
  }
  
  if (imageErrorCount > 0) {
    logger.info(`  • Check if patent image files exist in expected locations`);
    logger.info(`  • Verify image file formats (PNG recommended)`);
  }
  
  if (processingErrorCount > 0) {
    logger.info(`  • Review processing errors above for specific issues`);
    logger.info(`  • Consider running with VERBOSE=true for more details`);
  }
  
  if (missingHtmlCount + processingErrorCount + imageErrorCount === 0) {
    logger.success(`  • Perfect run! No action needed. 🎯`);
  }
  
  logger.info('\n' + '='.repeat(80));
  
  // Quick action items
  if (missingHtmlCount > 0) {
    logger.info(`\n🔧 Quick Fix Commands:`);
    logger.info(`  # Check patent directory contents:`);
    logger.info(`  ls -la "${getValidatedConfig().LOCAL_PATENT_DIR}"`);
    logger.info(`  `);
    logger.info(`  # Search for missing patents (example):`);
    const firstMissing = Array.from(processingReport.missingHtmlFiles)[0];
    if (firstMissing) {
      const baseId = firstMissing.patentId.replace(/-/g, '').replace(/[A-Z]\d*$/, '');
      logger.info(`  find "${getValidatedConfig().LOCAL_PATENT_DIR}" -name "*${baseId}*" -type f`);
    }
  }
}

/**
 * Run improved patent extraction with enhanced image analysis
 */
async function runImprovedExtraction() {
  processingReport.startTime = Date.now();
  const mainTimer = logger.timer('Total processing time');
  
  try {
    logger.info('🚀 Starting improved patent extraction with enhanced image analysis...');
    
    // Validate configuration first
    logger.info('Validating configuration...');
    const config = getValidatedConfig();
    logger.success('Configuration validated successfully');
    
    logger.info(`Processing settings:`);
    logger.info(`- Verbose logging: ${env.VERBOSE ? 'Enabled' : 'Disabled'}`);
    logger.info(`- Batch size: ${env.BATCH_SIZE} patents processed concurrently`);
    logger.info(`- Test mode: ${env.TEST_MODE ? `Enabled (${env.TEST_COUNT} patents)` : 'Disabled'}`);
    logger.info(`- PNG-only optimization: Enabled`);
    logger.info(`- Output directory: data/patents/`);
    
    // Extract patents from PDF
    logger.info('📄 Extracting patents from PDF...');
    const patents = await pdfJsPatentExtractor.extractPDFPatentData();
    logger.success(`Successfully extracted ${patents.length} patents from PDF`);
    
    // Option for testing with a subset
    let patentsToProcess = patents;
    if (env.TEST_MODE) {
      patentsToProcess = patents.slice(0, env.TEST_COUNT);
      logger.info(`🧪 TEST MODE: Processing ${patentsToProcess.length} patents for testing`);
    }
    
    // Enhance patents with abstracts and images using parallel processing
    logger.info('🔄 Enhancing patents with abstracts and images...');
    const enhancedPatents = await processPatentsInBatches(patentsToProcess, processPatent, env.BATCH_SIZE);
    
    logger.success(`Successfully enhanced ${enhancedPatents.length} patents`);
    
    // Categorize enhanced patents
    logger.info('📂 Categorizing patents...');
    const categorizedPatents = categorizePatents(enhancedPatents);
    
    logger.info('Category breakdown:');
    Object.entries(categorizedPatents).forEach(([category, patents]) => {
      logger.info(`  - ${category}: ${patents.length} patents`);
    });
    
    // Save to JSON files - Updated to use data directory
    logger.info('💾 Saving patent data to JSON files...');
    savePatentData(categorizedPatents);
    
    // Also save the complete list of patents to all-patents.json - Updated path
    const allPatentsPath = path.join(__dirname, '../data/patents/all-patents.json');
    fs.writeFileSync(allPatentsPath, JSON.stringify({ patents: enhancedPatents }, null, 2));
    logger.success(`Saved all patents to ${allPatentsPath}`);
    
    // Final summary with detailed completion report
    processingReport.endTime = Date.now();
    const processingTime = mainTimer.end();
    
    // Generate comprehensive completion report
    generateCompletionReport(enhancedPatents, processingTime);
    
    if (env.TEST_MODE) {
      logger.info('\n🧪 TEST MODE was enabled. To process all patents, run without TEST_MODE=true');
    }
    
  } catch (error) {
    mainTimer.end();
    logger.error('💥 Critical error in patent extraction process', error);
    
    if (error instanceof ProcessingError) {
      console.error('\n' + error.getFormattedMessage());
    }
    
    throw error; // Re-throw to be caught by the main promise handler
  }
}

// Run the extraction process with proper error handling
runImprovedExtraction()
  .then(() => {
    logger.success('🎉 Process completed successfully!');
    process.exit(0);
  })
  .catch(error => {
    logger.error('💥 Fatal error during processing', error);
    
    // Provide helpful error messages for common issues
    if (error.message.includes('Patent directory does not exist')) {
      console.error('\n🔧 Quick Fix: Set the correct patent directory path:');
      console.error('   export PATENT_COLLECTION_DIR="/path/to/your/patent/collection"');
      console.error('   Then run the script again.');
    }
    
    process.exit(1);
  });

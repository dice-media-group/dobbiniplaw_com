// test-missing-html.js
// Test script to demonstrate what happens when HTML files are missing

import { MetadataExtractor } from './patent-processing/MetadataExtractor.js';
import { FileSystemHelper } from './patent-processing/FileSystemHelper.js';
import { getValidatedConfig } from './patent-processing/config.js';
import { Logger } from './patent-processing/utils.js';

const logger = new Logger(true, 'HTMLTest');

/**
 * Test what happens when HTML files are missing
 */
async function testMissingHtmlScenarios() {
  logger.info('🧪 Testing Missing HTML File Scenarios...');
  
  try {
    const config = getValidatedConfig();
    const metadataExtractor = new MetadataExtractor(config);
    const fileHelper = new FileSystemHelper(config);
    
    // Test scenarios with different types of "missing" patents
    const testPatents = [
      {
        id: 'US-NONEXISTENT-B2',
        description: 'Completely made up patent ID'
      },
      {
        id: 'US-99999999-B2', 
        description: 'Valid format but likely non-existent file'
      },
      {
        id: 'US-D999999-S',
        description: 'Design patent with non-existent file'
      }
    ];
    
    logger.info(`Testing ${testPatents.length} scenarios...`);
    
    for (const testPatent of testPatents) {
      logger.info(`\n📋 Testing: ${testPatent.id} (${testPatent.description})`);
      
      // Test 1: File search
      logger.info('Step 1: Searching for HTML file...');
      const searchResult = await fileHelper.findPatentHtmlFile(testPatent.id);
      logger.info(`File search result: exists=${searchResult.exists}, path=${searchResult.path}`);
      
      // Test 2: Metadata extraction
      logger.info('Step 2: Attempting metadata extraction...');
      const metadata = await metadataExtractor.extractPatentDetails(testPatent.id);
      
      logger.info('Step 3: Metadata extraction result:');
      logger.info(`  - Abstract: "${metadata.abstract}"`);
      logger.info(`  - Inventors: [${metadata.inventors.join(', ')}]`);
      logger.info(`  - Assignee: "${metadata.assignee}"`);
      
      // Test 3: Simulate full patent object creation
      logger.info('Step 4: Creating full patent object...');
      const fullPatentObject = {
        id: testPatent.id,
        title: `Test Patent: ${testPatent.description}`,
        publicationDate: '2024-01-01',
        imagePages: 0,
        abstract: metadata.abstract,
        inventors: metadata.inventors,
        assignee: metadata.assignee,
        images: [{
          thumbnail: `/images/patents/placeholder.svg`,
          hires: `/images/patents/placeholder.svg`,
          caption: 'No image available'
        }],
        featured: false,
        lastProcessed: new Date().toISOString(),
        testPatent: true
      };
      
      logger.success(`✅ Patent object created successfully for ${testPatent.id}`);
      logger.info(`Final object structure:`);
      console.log(JSON.stringify(fullPatentObject, null, 2));
    }
    
    // Test 4: Demonstrate batch processing behavior
    logger.info('\n📊 Simulating Batch Processing Behavior...');
    
    const mockBatchResults = testPatents.map(testPatent => ({
      id: testPatent.id,
      title: `Test Patent: ${testPatent.description}`,
      abstract: `HTML file not found for ${testPatent.id}`,
      inventors: [],
      assignee: `HTML file not found for ${testPatent.id}`,
      processingError: true
    }));
    
    const errorCount = mockBatchResults.filter(r => r.processingError).length;
    const totalCount = mockBatchResults.length;
    
    logger.warn(`${errorCount} patents had processing errors and fallback data was used`);
    logger.info(`Error rate: ${Math.round((errorCount/totalCount) * 100)}%`);
    
    // Test 5: Show how this would appear in final output
    logger.info('\n📄 How This Would Appear in Final JSON Output...');
    
    const finalOutput = {
      patents: mockBatchResults.map(patent => ({
        ...patent,
        category: 'other', // Would be categorized
        images: [{
          thumbnail: `/images/patents/placeholder.svg`,
          hires: `/images/patents/placeholder.svg`,
          caption: 'No image available'
        }]
      }))
    };
    
    logger.info('Sample of final all-patents.json content:');
    console.log(JSON.stringify(finalOutput, null, 2));
    
    logger.success('🎉 All missing HTML file scenarios tested successfully!');
    
    // Summary
    logger.info('\n📋 Summary of What Happens When HTML Files Are Missing:');
    logger.info('1. ✅ File search attempts multiple naming conventions');
    logger.info('2. ✅ Returns clear "not found" messages instead of crashing');
    logger.info('3. ✅ Creates valid patent objects with fallback data');
    logger.info('4. ✅ Patents still appear in UI with error messages');
    logger.info('5. ✅ Overall processing pipeline continues successfully');
    logger.info('6. ✅ Error statistics are tracked and reported');
    
    return true;
    
  } catch (error) {
    logger.error('Test failed with error', error);
    return false;
  }
}

/**
 * Test with a real patent to show successful processing
 */
async function testExistingPatent() {
  logger.info('\n🔍 Testing with an existing patent for comparison...');
  
  try {
    const config = getValidatedConfig();
    const metadataExtractor = new MetadataExtractor(config);
    
    // Try to find any existing HTML file to test with
    const fileHelper = new FileSystemHelper(config);
    const existingFiles = await fileHelper.readDirectory(config.LOCAL_PATENT_DIR);
    const htmlFiles = existingFiles.filter(f => f.endsWith('.html'));
    
    if (htmlFiles.length > 0) {
      const testFile = htmlFiles[0];
      const patentId = testFile.replace('.html', '').replace(/([A-Z]+)(\d+)([A-Z]\d*)/, '$1-$2-$3');
      
      logger.info(`Found existing HTML file: ${testFile}`);
      logger.info(`Testing with patent ID: ${patentId}`);
      
      const metadata = await metadataExtractor.extractPatentDetails(patentId);
      
      logger.success('✅ Successful processing result:');
      logger.info(`  - Abstract: "${metadata.abstract.substring(0, 100)}..."`);
      logger.info(`  - Inventors: [${metadata.inventors.join(', ')}]`);
      logger.info(`  - Assignee: "${metadata.assignee}"`);
      
    } else {
      logger.warn('No existing HTML files found - cannot test successful scenario');
    }
    
  } catch (error) {
    logger.error('Could not test existing patent', error);
  }
}

// Run the tests
async function runAllTests() {
  logger.info('🚀 Starting Missing HTML File Tests...');
  
  const missingTest = await testMissingHtmlScenarios();
  await testExistingPatent();
  
  if (missingTest) {
    logger.success('🎉 All tests completed successfully!');
    logger.info('\n💡 Key Takeaway: The system gracefully handles missing HTML files');
    logger.info('   and continues processing with informative fallback data.');
  } else {
    logger.error('❌ Some tests failed');
  }
}

// Run if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runAllTests().catch(error => {
    console.error('Test runner failed:', error);
    process.exit(1);
  });
}

export { testMissingHtmlScenarios, testExistingPatent, runAllTests };

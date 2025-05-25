// test-configuration.js
// Quick test script to validate configuration and dependencies

import { getValidatedConfig, validateConfig } from './patent-processing/config.js';
import { Logger, ProcessingError, validateEnvironment } from './patent-processing/utils.js';
import fs from 'fs';
import path from 'path';

const logger = new Logger(true, 'ConfigTest');

/**
 * Test configuration validation
 */
async function testConfiguration() {
  logger.info('🧪 Testing configuration validation...');
  
  try {
    // Test environment variable validation
    const env = validateEnvironment({
      VERBOSE: false,
      BATCH_SIZE: 3,
      TEST_MODE: false,
      TEST_COUNT: 5
    });
    
    logger.success('Environment variables validated');
    logger.info(`Environment settings: ${JSON.stringify(env, null, 2)}`);
    
    // Test configuration validation
    const config = getValidatedConfig();
    logger.success('Configuration validated successfully');
    logger.info(`Configuration: ${JSON.stringify(config, null, 2)}`);
    
    return true;
  } catch (error) {
    logger.error('Configuration validation failed', error);
    return false;
  }
}

/**
 * Test directory access
 */
async function testDirectoryAccess() {
  logger.info('🗂️  Testing directory access...');
  
  try {
    const config = getValidatedConfig();
    
    // Test LOCAL_PATENT_DIR
    if (fs.existsSync(config.LOCAL_PATENT_DIR)) {
      const files = fs.readdirSync(config.LOCAL_PATENT_DIR);
      logger.success(`LOCAL_PATENT_DIR accessible (${files.length} items)`);
    } else {
      logger.error(`LOCAL_PATENT_DIR not found: ${config.LOCAL_PATENT_DIR}`);
      return false;
    }
    
    // Test CENTRAL_IMAGES_DIR
    if (fs.existsSync(config.CENTRAL_IMAGES_DIR)) {
      const files = fs.readdirSync(config.CENTRAL_IMAGES_DIR);
      logger.success(`CENTRAL_IMAGES_DIR accessible (${files.length} items)`);
    } else {
      logger.warn(`CENTRAL_IMAGES_DIR not found: ${config.CENTRAL_IMAGES_DIR}`);
    }
    
    // Test PUBLIC_PATENTS_DIR
    if (fs.existsSync(config.PUBLIC_PATENTS_DIR)) {
      logger.success(`PUBLIC_PATENTS_DIR accessible`);
    } else {
      logger.info(`PUBLIC_PATENTS_DIR will be created during processing`);
    }
    
    return true;
  } catch (error) {
    logger.error('Directory access test failed', error);
    return false;
  }
}

/**
 * Test import dependencies
 */
async function testDependencies() {
  logger.info('📦 Testing dependencies...');
  
  try {
    // Test core modules
    await import('./pdfJsPatentExtractor.js');
    logger.success('pdfJsPatentExtractor.js imported successfully');
    
    await import('./enhancedImageProcessor.js');
    logger.success('enhancedImageProcessor.js imported successfully');
    
    await import('./processPatents.js');
    logger.success('processPatents.js imported successfully');
    
    // Test patent-processing modules
    const { ImageProcessor } = await import('./patent-processing/ImageProcessor.js');
    const { MetadataExtractor } = await import('./patent-processing/MetadataExtractor.js');
    const { FileSystemHelper } = await import('./patent-processing/FileSystemHelper.js');
    
    logger.success('All patent-processing modules imported successfully');
    
    // Test third-party dependencies
    await import('cheerio');
    logger.success('cheerio imported successfully');
    
    return true;
  } catch (error) {
    logger.error('Dependency test failed', error);
    return false;
  }
}

/**
 * Test error handling
 */
async function testErrorHandling() {
  logger.info('⚠️  Testing error handling...');
  
  try {
    // Test ProcessingError
    const error = new ProcessingError('Test error', 'US-TEST-123', new Error('Original error'));
    logger.info('ProcessingError created successfully');
    logger.debug(error.getFormattedMessage());
    
    // Test invalid configuration
    try {
      validateConfig({
        LOCAL_PATENT_DIR: '/nonexistent/path',
        CENTRAL_IMAGES_DIR: '/nonexistent/path',
        PUBLIC_PATENTS_DIR: '/nonexistent/path'
      });
      logger.error('Configuration validation should have failed');
      return false;
    } catch (configError) {
      logger.success('Configuration validation correctly rejected invalid paths');
    }
    
    return true;
  } catch (error) {
    logger.error('Error handling test failed', error);
    return false;
  }
}

/**
 * Run all tests
 */
async function runAllTests() {
  logger.info('🚀 Starting configuration and dependency tests...');
  
  const tests = [
    { name: 'Configuration', test: testConfiguration },
    { name: 'Directory Access', test: testDirectoryAccess },
    { name: 'Dependencies', test: testDependencies },
    { name: 'Error Handling', test: testErrorHandling }
  ];
  
  let passedTests = 0;
  
  for (const { name, test } of tests) {
    try {
      const result = await test();
      if (result) {
        logger.success(`✅ ${name} test passed`);
        passedTests++;
      } else {
        logger.error(`❌ ${name} test failed`);
      }
    } catch (error) {
      logger.error(`💥 ${name} test crashed`, error);
    }
    
    console.log(''); // Add spacing between tests
  }
  
  // Final summary
  logger.info(`📊 Test Results: ${passedTests}/${tests.length} tests passed`);
  
  if (passedTests === tests.length) {
    logger.success('🎉 All tests passed! The system is ready for patent processing.');
    return true;
  } else {
    logger.error('❌ Some tests failed. Please fix the issues before running patent processing.');
    return false;
  }
}

// Run tests if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runAllTests()
    .then(success => {
      process.exit(success ? 0 : 1);
    })
    .catch(error => {
      console.error('Test runner crashed:', error);
      process.exit(1);
    });
}

export { runAllTests, testConfiguration, testDirectoryAccess, testDependencies, testErrorHandling };

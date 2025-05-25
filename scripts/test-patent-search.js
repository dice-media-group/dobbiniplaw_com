// test-patent-search.js
// Quick test script to verify the FileSystemHelper fix

import { FileSystemHelper } from './patent-processing/FileSystemHelper.js';
import { getValidatedConfig } from './patent-processing/config.js';

async function testPatentSearch() {
  console.log('🧪 Testing Patent Search Fix');
  console.log('=' .repeat(60));
  
  // Initialize with config
  const config = getValidatedConfig();
  const fileHelper = new FileSystemHelper(config);
  
  // Test patents that were previously failing
  const testPatents = [
    'US-D882015-S',    // Should find USD882015S1.html
    'US-D614719-S',    // Should find USD614719S1.html  
    'US-D1012542-S',   // Should find USD1012542S1.html
    'US-8832986-B2',   // Should genuinely not be found
    'US-12246105-B2',  // Should find the Google Patents named file
  ];
  
  console.log(`Testing ${testPatents.length} patents:\n`);
  
  for (const patentId of testPatents) {
    console.log(`\n${'🔬 TEST: ' + patentId}`);
    console.log('-' .repeat(40));
    
    try {
      const result = await fileHelper.findPatentHtmlFile(patentId);
      
      if (result.exists) {
        console.log(`✅ SUCCESS: Found at ${result.path}`);
      } else {
        console.log(`❌ NOT FOUND: ${patentId}`);
      }
    } catch (error) {
      console.error(`💥 ERROR testing ${patentId}:`, error.message);
    }
    
    console.log('-' .repeat(40));
  }
  
  console.log('\n🏁 Test completed!');
}

// Run the test
testPatentSearch().catch(error => {
  console.error('Test failed:', error);
  process.exit(1);
});

// test-single-patent.js
// Test script to verify the ImageProcessor fix with US-D510209-S

import { ImageProcessor } from './patent-processing/ImageProcessor.js';
import { getValidatedConfig } from './patent-processing/config.js';
import { Logger } from './patent-processing/utils.js';

const logger = new Logger(true, 'PatentTest'); // Verbose logging

async function testSinglePatent() {
  try {
    console.log('🧪 TESTING SINGLE PATENT: US-D510209-S');
    console.log('='.repeat(60));
    
    // Initialize configuration and image processor
    const config = getValidatedConfig();
    const imageProcessor = new ImageProcessor(config);
    
    // Test the failing patent
    const patentId = 'US-D510209-S';
    const formattedId = patentId.replace(/-/g, ''); // USD510209S
    
    console.log(`📝 Input:`);
    console.log(`   Patent ID: ${patentId}`);
    console.log(`   Formatted ID: ${formattedId}`);
    console.log(`   Expected image: USD0510209-20051004-D00000.png`);
    console.log(`   Expected location: /patents-p12/images/`);
    
    console.log('\n🔍 TESTING ENHANCED BASE ID EXTRACTION...');
    const baseIds = imageProcessor.extractPatentBaseIds(patentId, formattedId);
    console.log(`✅ Generated base IDs: [${baseIds.join(', ')}]`);
    
    // Test if the base IDs would match the actual file
    const actualFileName = 'USD0510209-20051004-D00000.png';
    const wouldMatch = baseIds.some(baseId => actualFileName.includes(baseId));
    console.log(`🎯 Base ID matching test: ${wouldMatch ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`   Testing "${actualFileName}" against [${baseIds.join(', ')}]`);
    
    console.log('\n🔍 TESTING DIRECTORY VARIATIONS...');
    const dirVariations = imageProcessor.getFormattedIdVariations(patentId, formattedId);
    console.log(`✅ Directory variations: [${dirVariations.join(', ')}]`);
    
    console.log('\n🚀 RUNNING FULL IMAGE PROCESSING...');
    console.log('-'.repeat(40));
    
    const result = await imageProcessor.processPatentImages(patentId);
    
    console.log('\n📊 RESULTS:');
    console.log('='.repeat(60));
    
    if (result.length === 1 && result[0].thumbnail.includes('placeholder')) {
      console.log(`❌ FAILED: Still using placeholder`);
      console.log(`   Result: ${JSON.stringify(result[0], null, 2)}`);
    } else {
      console.log(`✅ SUCCESS: Found ${result.length} images!`);
      result.forEach((img, i) => {
        console.log(`   ${i + 1}. ${img.caption}`);
        console.log(`      Thumbnail: ${img.thumbnail}`);
        console.log(`      Hi-res: ${img.hires}`);
        if (img.source) console.log(`      Source: ${img.source}`);
        if (img.originalFilename) console.log(`      Original: ${img.originalFilename}`);
      });
    }
    
    console.log('\n🏆 TEST SUMMARY:');
    console.log('='.repeat(60));
    const success = result.length > 0 && !result[0].thumbnail.includes('placeholder');
    console.log(`Result: ${success ? '✅ FIXED!' : '❌ Still broken'}`);
    
    if (success) {
      console.log('🎉 The leading zero fix works!');  
      console.log('🎯 This should resolve all 91 failing patents');
    } else {
      console.log('❌ Need further debugging');
    }
    
  } catch (error) {
    console.error('💥 Test failed with error:', error);
  }
}

// Run the test
testSinglePatent();

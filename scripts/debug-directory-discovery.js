// Enhanced debug script to find ALL patent directories
import fs from 'fs';
import path from 'path';
import { getValidatedConfig } from './patent-processing/config.js';

const config = getValidatedConfig();

async function debugDirectoryDiscovery() {
  console.log('='.repeat(60));
  console.log('🔍 DIRECTORY DISCOVERY DEBUG');
  console.log('='.repeat(60));
  console.log(`Patent collection dir: ${config.LOCAL_PATENT_DIR}`);
  console.log('');
  
  try {
    // Read ALL items in the directory
    const allItems = fs.readdirSync(config.LOCAL_PATENT_DIR);
    console.log(`📁 Total items in directory: ${allItems.length}`);
    
    // Filter for items starting with "patents-"
    const patentItems = allItems.filter(item => item.startsWith('patents-'));
    console.log(`📁 Items starting with "patents-": ${patentItems.length}`);
    console.log(`   ${patentItems.join(', ')}`);
    console.log('');
    
    // Check each patents- item in detail
    const patentDirectories = [];
    const patentFiles = [];
    const patentErrors = [];
    
    for (const item of patentItems) {
      const fullPath = path.join(config.LOCAL_PATENT_DIR, item);
      try {
        const stats = fs.statSync(fullPath);
        
        if (stats.isDirectory()) {
          patentDirectories.push(item);
          console.log(`✅ ${item} - Directory (${stats.size} bytes)`);
        } else {
          patentFiles.push(item);
          console.log(`📄 ${item} - File (${stats.size} bytes)`);
        }
      } catch (error) {
        patentErrors.push({ item, error: error.message });
        console.log(`❌ ${item} - Error: ${error.message}`);
      }
    }
    
    console.log('');
    console.log('='.repeat(60));
    console.log('📊 SUMMARY');
    console.log('='.repeat(60));
    console.log(`Total patent directories: ${patentDirectories.length}`);
    console.log(`Patent files (not dirs): ${patentFiles.length}`);
    console.log(`Errors accessing items: ${patentErrors.length}`);
    
    if (patentDirectories.length > 0) {
      console.log('');
      console.log('✅ Valid patent directories:');
      patentDirectories.sort().forEach((dir, index) => {
        console.log(`   ${index + 1}. ${dir}`);
      });
    }
    
    if (patentFiles.length > 0) {
      console.log('');
      console.log('📄 Patent files (not directories):');
      patentFiles.forEach(file => {
        console.log(`   - ${file}`);
      });
    }
    
    if (patentErrors.length > 0) {
      console.log('');
      console.log('❌ Items with errors:');
      patentErrors.forEach(({ item, error }) => {
        console.log(`   - ${item}: ${error}`);
      });
    }
    
    // Now let's specifically look for US-12246105-B2 files
    console.log('');
    console.log('='.repeat(60));
    console.log('🔍 SEARCHING FOR US-12246105-B2 FILES');
    console.log('='.repeat(60));
    
    // Check each valid directory for our patent
    for (const dir of patentDirectories) {
      const dirPath = path.join(config.LOCAL_PATENT_DIR, dir);
      console.log(`\n📁 Checking ${dir}:`);
      
      try {
        const dirItems = fs.readdirSync(dirPath);
        
        // Look for any files containing "12246105"
        const matchingFiles = dirItems.filter(item => item.includes('12246105'));
        
        if (matchingFiles.length > 0) {
          console.log(`   🎯 Found ${matchingFiles.length} matching files:`);
          matchingFiles.forEach(file => {
            const filePath = path.join(dirPath, file);
            try {
              const stats = fs.statSync(filePath);
              const fileType = stats.isDirectory() ? 'DIR' : 'FILE';
              console.log(`      ${fileType}: ${file} (${stats.size} bytes)`);
            } catch (error) {
              console.log(`      ERROR: ${file} - ${error.message}`);
            }
          });
        } else {
          console.log(`   - No files containing "12246105"`);
        }
        
        // Also check for images subdirectory
        const imagesDir = path.join(dirPath, 'images');
        if (fs.existsSync(imagesDir)) {
          console.log(`   📸 Has images/ subdirectory`);
          try {
            const imageFiles = fs.readdirSync(imagesDir);
            const matchingImages = imageFiles.filter(file => file.includes('12246105'));
            if (matchingImages.length > 0) {
              console.log(`      🎯 Found ${matchingImages.length} matching images:`);
              matchingImages.forEach(file => {
                console.log(`         ${file}`);
              });
            } else {
              console.log(`      - No images containing "12246105"`);
            }
          } catch (error) {
            console.log(`      ❌ Error reading images directory: ${error.message}`);
          }
        } else {
          console.log(`   - No images/ subdirectory`);
        }
        
      } catch (error) {
        console.log(`   ❌ Error reading directory: ${error.message}`);
      }
    }
    
  } catch (error) {
    console.error('❌ Fatal error:', error);
  }
}

debugDirectoryDiscovery();

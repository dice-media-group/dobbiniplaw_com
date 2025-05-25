#!/usr/bin/env node

/**
 * Update Patent Images Script
 * 
 * This script updates the image references in patent JSON files after you've
 * updated patent images in the public/images/patents/ directory.
 * 
 * Usage:
 *   node scripts/update-patent-images.js
 *   node scripts/update-patent-images.js --patent US-12270996-B2
 *   node scripts/update-patent-images.js --verbose
 *   node scripts/update-patent-images.js --dry-run
 * 
 * What it does:
 * 1. Scans all patent directories in public/images/patents/
 * 2. Updates image references in category JSON files
 * 3. Preserves all other patent metadata (abstract, inventors, etc.)
 * 4. Supports both regular and high-resolution images
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration - Updated to use data directory
const DATA_DIR = path.join(__dirname, '../data/patents');
const PUBLIC_IMAGES_DIR = path.join(__dirname, '../public/images/patents');
const SUPPORTED_IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp'];

// Command line arguments
const args = process.argv.slice(2);
const isVerbose = args.includes('--verbose') || args.includes('-v');
const isDryRun = args.includes('--dry-run') || args.includes('-n');
const specificPatent = args.find(arg => arg.startsWith('US-'))?.replace('--patent=', '').replace('--patent', '');

// Logging utilities
function log(message) {
  console.log(`📋 ${message}`);
}

function success(message) {
  console.log(`✅ ${message}`);
}

function warn(message) {
  console.log(`⚠️  ${message}`);
}

function error(message) {
  console.log(`❌ ${message}`);
}

function verbose(message) {
  if (isVerbose) {
    console.log(`🔍 ${message}`);
  }
}

function dryRun(message) {
  if (isDryRun) {
    console.log(`🔍 DRY RUN: ${message}`);
  }
}

/**
 * Check if a file is an image based on its extension
 */
function isImageFile(filename) {
  const ext = path.extname(filename).toLowerCase();
  return SUPPORTED_IMAGE_EXTENSIONS.includes(ext);
}

/**
 * Extract figure number from image filename
 */
function extractFigureNumber(filename) {
  // Remove extension
  const nameWithoutExt = path.parse(filename).name;
  
  // Look for fig pattern (fig0, fig1, figure1, etc.)
  const figMatch = nameWithoutExt.match(/fig(?:ure)?(\d+)/i);
  if (figMatch) {
    return parseInt(figMatch[1]);
  }
  
  // Look for D00001 pattern (USPTO standard)
  const dMatch = nameWithoutExt.match(/D0*(\d+)/i);
  if (dMatch) {
    return parseInt(dMatch[1]);
  }
  
  // Look for standalone numbers
  const numMatch = nameWithoutExt.match(/^(\d+)$/);
  if (numMatch) {
    return parseInt(numMatch[1]);
  }
  
  return null;
}

/**
 * Scan a patent directory for images and return organized image data
 */
function scanPatentImages(patentId) {
  const patentDir = path.join(PUBLIC_IMAGES_DIR, patentId);
  const hiresDir = path.join(patentDir, 'hires');
  
  if (!fs.existsSync(patentDir)) {
    verbose(`No image directory found for ${patentId}`);
    return null;
  }
  
  const images = [];
  const imageMap = new Map(); // figNum -> { regular, hires }
  
  try {
    // Scan regular images
    const regularFiles = fs.readdirSync(patentDir);
    for (const filename of regularFiles) {
      if (isImageFile(filename)) {
        const figNum = extractFigureNumber(filename);
        if (figNum !== null) {
          if (!imageMap.has(figNum)) {
            imageMap.set(figNum, {});
          }
          imageMap.get(figNum).regular = `/images/patents/${patentId}/${filename}`;
          imageMap.get(figNum).figNum = figNum;
        }
      }
    }
    
    // Scan high-res images if directory exists
    if (fs.existsSync(hiresDir)) {
      const hiresFiles = fs.readdirSync(hiresDir);
      for (const filename of hiresFiles) {
        if (isImageFile(filename)) {
          const figNum = extractFigureNumber(filename);
          if (figNum !== null) {
            if (!imageMap.has(figNum)) {
              imageMap.set(figNum, {});
            }
            imageMap.get(figNum).hires = `/images/patents/${patentId}/hires/${filename}`;
            imageMap.get(figNum).figNum = figNum;
          }
        }
      }
    }
    
    // Convert map to sorted array
    const sortedFigNums = Array.from(imageMap.keys()).sort((a, b) => a - b);
    
    for (const figNum of sortedFigNums) {
      const imageData = imageMap.get(figNum);
      images.push({
        thumbnail: imageData.regular || imageData.hires || `/images/patents/placeholder.svg`,
        hires: imageData.hires || imageData.regular || `/images/patents/placeholder.svg`,
        caption: `Figure ${figNum}`
      });
    }
    
    verbose(`Found ${images.length} images for ${patentId}: figures ${sortedFigNums.join(', ')}`);
    
  } catch (err) {
    warn(`Error scanning images for ${patentId}: ${err.message}`);
    return null;
  }
  
  // Return placeholder if no images found
  if (images.length === 0) {
    verbose(`No valid images found for ${patentId}, using placeholder`);
    return [{
      thumbnail: `/images/patents/placeholder.svg`,
      hires: `/images/patents/placeholder.svg`,
      caption: 'No image available'
    }];
  }
  
  return images;
}

/**
 * Update images in a patent object
 */
function updatePatentImages(patent) {
  const newImages = scanPatentImages(patent.id);
  if (newImages) {
    const oldImageCount = patent.images ? patent.images.length : 0;
    patent.images = newImages;
    verbose(`Updated ${patent.id}: ${oldImageCount} -> ${newImages.length} images`);
    return true;
  }
  return false;
}

/**
 * Load and update a category JSON file
 */
function updateCategoryFile(categoryId) {
  const filePath = path.join(DATA_DIR, `${categoryId}.json`);
  
  if (!fs.existsSync(filePath)) {
    verbose(`Category file not found: ${categoryId}.json`);
    return { updated: 0, total: 0 };
  }
  
  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    let updatedCount = 0;
    let totalPatents = 0;
    
    // Update main patents array
    if (data.patents && Array.isArray(data.patents)) {
      totalPatents += data.patents.length;
      for (const patent of data.patents) {
        if (!specificPatent || patent.id === specificPatent) {
          if (updatePatentImages(patent)) {
            updatedCount++;
          }
        }
      }
    }
    
    // Update subcategory patents if they exist
    if (data.subcategories) {
      for (const [subId, subcategory] of Object.entries(data.subcategories)) {
        if (subcategory.patents && Array.isArray(subcategory.patents)) {
          totalPatents += subcategory.patents.length;
          for (const patent of subcategory.patents) {
            if (!specificPatent || patent.id === specificPatent) {
              if (updatePatentImages(patent)) {
                updatedCount++;
              }
            }
          }
        }
      }
    }
    
    // Save updated file
    if (updatedCount > 0 && !isDryRun) {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      success(`Updated ${categoryId}.json: ${updatedCount}/${totalPatents} patents`);
    } else if (updatedCount > 0 && isDryRun) {
      dryRun(`Would update ${categoryId}.json: ${updatedCount}/${totalPatents} patents`);
    } else {
      verbose(`No updates needed for ${categoryId}.json`);
    }
    
    return { updated: updatedCount, total: totalPatents };
    
  } catch (err) {
    error(`Error processing ${categoryId}.json: ${err.message}`);
    return { updated: 0, total: 0 };
  }
}

/**
 * Update all-patents.json file
 */
function updateAllPatentsFile() {
  const filePath = path.join(DATA_DIR, 'all-patents.json');
  
  if (!fs.existsSync(filePath)) {
    verbose(`all-patents.json not found`);
    return { updated: 0, total: 0 };
  }
  
  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    let updatedCount = 0;
    let totalPatents = 0;
    
    if (data.patents && Array.isArray(data.patents)) {
      totalPatents = data.patents.length;
      for (const patent of data.patents) {
        if (!specificPatent || patent.id === specificPatent) {
          if (updatePatentImages(patent)) {
            updatedCount++;
          }
        }
      }
    }
    
    // Save updated file
    if (updatedCount > 0 && !isDryRun) {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      success(`Updated all-patents.json: ${updatedCount}/${totalPatents} patents`);
    } else if (updatedCount > 0 && isDryRun) {
      dryRun(`Would update all-patents.json: ${updatedCount}/${totalPatents} patents`);
    } else {
      verbose(`No updates needed for all-patents.json`);
    }
    
    return { updated: updatedCount, total: totalPatents };
    
  } catch (err) {
    error(`Error processing all-patents.json: ${err.message}`);
    return { updated: 0, total: 0 };
  }
}

/**
 * Get list of category files
 */
function getCategoryFiles() {
  const files = fs.readdirSync(DATA_DIR);
  return files
    .filter(file => file.endsWith('.json') && !file.startsWith('categories') && !file.startsWith('all-patents') && !file.startsWith('subcategories') && !file.includes('report'))
    .map(file => path.parse(file).name);
}

/**
 * Main function
 */
async function main() {
  console.log('🖼️  Patent Image Update Script\n');
  
  if (isDryRun) {
    log('Running in DRY RUN mode - no files will be modified');
  }
  
  if (specificPatent) {
    log(`Updating images for specific patent: ${specificPatent}`);
  } else {
    log('Updating images for all patents');
  }
  
  if (isVerbose) {
    log('Verbose logging enabled');
  }
  
  console.log();
  
  // Check directories exist
  if (!fs.existsSync(DATA_DIR)) {
    error(`Data directory not found: ${DATA_DIR}`);
    process.exit(1);
  }
  
  if (!fs.existsSync(PUBLIC_IMAGES_DIR)) {
    error(`Public images directory not found: ${PUBLIC_IMAGES_DIR}`);
    process.exit(1);
  }
  
  let totalUpdated = 0;
  let totalProcessed = 0;
  
  try {
    // Update category files
    const categoryFiles = getCategoryFiles();
    log(`Found ${categoryFiles.length} category files to process`);
    
    for (const categoryId of categoryFiles) {
      const result = updateCategoryFile(categoryId);
      totalUpdated += result.updated;
      totalProcessed += result.total;
    }
    
    // Update all-patents.json
    log('Processing all-patents.json...');
    const allPatientsResult = updateAllPatentsFile();
    // Note: Don't add to totals since it's the same patents
    
    // Summary
    console.log('\n' + '='.repeat(60));
    if (isDryRun) {
      log(`DRY RUN COMPLETE:`);
      log(`- Would update ${totalUpdated} patent image references`);
      log(`- Out of ${totalProcessed} total patents processed`);
    } else {
      success(`IMAGE UPDATE COMPLETE:`);
      success(`- Updated ${totalUpdated} patent image references`);
      success(`- Out of ${totalProcessed} total patents processed`);
    }
    
    if (specificPatent) {
      log(`- Processed specific patent: ${specificPatent}`);
    }
    
    console.log('='.repeat(60));
    
    // Instructions for next steps
    if (!isDryRun && totalUpdated > 0) {
      console.log('\n💡 Next Steps:');
      console.log('1. The patent browser will automatically show updated images');
      console.log('2. If running in dev mode, the changes should be visible immediately');
      console.log('3. For production, rebuild and deploy your site');
      
      if (specificPatent) {
        console.log(`4. Check patent ${specificPatent} in the browser to verify images`);
      }
    }
    
  } catch (err) {
    error(`Fatal error: ${err.message}`);
    process.exit(1);
  }
}

// Help text
if (args.includes('--help') || args.includes('-h')) {
  console.log(`
🖼️  Patent Image Update Script

Updates image references in patent JSON files after you've updated
patent images in the public/images/patents/ directory.

Usage:
  node scripts/update-patent-images.js [options]

Options:
  --patent US-XXXXXXX-XX    Update specific patent only
  --verbose, -v             Enable verbose logging
  --dry-run, -n             Show what would be updated without making changes
  --help, -h                Show this help message

Examples:
  # Update all patents
  node scripts/update-patent-images.js

  # Update specific patent with verbose output
  node scripts/update-patent-images.js --patent US-12270996-B2 --verbose

  # Preview changes without making them
  node scripts/update-patent-images.js --dry-run

Image Structure Expected:
  public/images/patents/US-XXXXXXX-XX/
  ├── fig1.png (thumbnail)
  ├── fig2.png (thumbnail)
  └── hires/
      ├── fig1.png (high resolution)
      └── fig2.png (high resolution)

The script will:
1. Scan image directories for each patent
2. Update thumbnail and hires image paths
3. Preserve all other patent metadata
4. Sort images by figure number
`);
  process.exit(0);
}

// Run the script
main();

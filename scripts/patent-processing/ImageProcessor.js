// ImageProcessor.js - COMPREHENSIVE ENHANCED VERSION  
// Handles image analysis and processing for patents with COMPLETE design patent support
// FIXES: Leading zero logic, S→S1 suffix mapping, multiple search locations

import path from 'path';
import fs from 'fs';
import { FileSystemHelper } from './FileSystemHelper.js';

export class ImageProcessor {
  constructor(config) {
    this.config = config;
    this.fileHelper = new FileSystemHelper(config);
  }

  /**
   * COMPREHENSIVE FIX: Extract all possible base patent IDs for image matching 
   * Handles the discovered S → S1 suffix mapping and leading zero requirements
   * @param {string} patentId - Patent ID with hyphens (e.g., "US-D510209-S")
   * @param {string} formattedId - Patent ID without hyphens (e.g., "USD510209S")
   * @returns {Array<string>} Array of possible base IDs to search for
   */
  extractPatentBaseIds(patentId, formattedId) {
    console.log(`🔍 Extracting base IDs from: ${patentId} (formatted: ${formattedId})`);
    
    const baseIds = [];
    
    // Handle Design Patents (US-D######-S format)
    if (patentId.includes('-D') && patentId.endsWith('-S')) {
      const match = patentId.match(/US-D(\d+)-S/);
      if (match) {
        const patentNumber = match[1]; // "510209"
        
        // CRITICAL: 6-digit design patents need leading zero, 7-digit don't
        if (patentNumber.length === 6) {
          baseIds.push(`USD0${patentNumber}`); // USD0510209 (PRIMARY FORMAT)
        } else if (patentNumber.length === 7) {
          baseIds.push(`USD${patentNumber}`);  // USD1234567 (for 7-digit)
        }
        
        // Also try without leading zero as fallback
        baseIds.push(`USD${patentNumber}`); // USD510209
        
        console.log(`🎨 Design patent base IDs: ${baseIds.join(', ')}`);
        return baseIds;
      }
    }
    
    // Handle Utility Patents (US-#######-B1/B2 format)  
    if (formattedId.match(/B[12]$/)) {
      const baseId = formattedId.replace(/B[12]$/, '');
      
      // For utility patents, also try with leading zero if 7 digits
      const match = baseId.match(/US(\d+)/);
      if (match && match[1].length === 7) {
        baseIds.push(`US0${match[1]}`); // US06883261
      }
      
      baseIds.push(baseId); // US6883261
      
      console.log(`⚙️ Utility patent base IDs: ${baseIds.join(', ')}`);
      return baseIds;
    }
    
    // Fallback: use the formatted ID as-is
    baseIds.push(formattedId);
    console.log(`📄 Using full formatted ID as base: ${formattedId}`);
    return baseIds;
  }

  /**
   * COMPREHENSIVE: Get all possible formatted ID variations for file system search
   * Handles the S → S1 suffix mapping discovered in the analysis
   * @param {string} patentId - Patent ID with hyphens (e.g., "US-D510209-S")
   * @param {string} formattedId - Patent ID without hyphens (e.g., "USD510209S")
   * @returns {Array<string>} Array of possible formatted IDs for file directory search
   */
  getFormattedIdVariations(patentId, formattedId) {
    const variations = [formattedId]; // Always include the original
    
    // Handle Design Patents: S → S1 mapping
    if (patentId.includes('-D') && patentId.endsWith('-S')) {
      // TrophyWall.pdf: US-D510209-S → formattedId: USD510209S
      // File System: USD510209S1 (add "1" suffix)
      const s1Variation = formattedId.replace(/S$/, 'S1');
      variations.push(s1Variation);
      
      console.log(`🔄 S→S1 mapping: ${formattedId} → ${s1Variation}`);
    }
    
    return variations;
  }

  /**
   * ENHANCED: Check if filename matches any of the possible base IDs
   * @param {string} filename - Image filename to check
   * @param {Array<string>} baseIds - Array of possible base IDs
   * @returns {boolean} True if filename matches any base ID
   */
  filenameMatchesBaseIds(filename, baseIds) {
    return baseIds.some(baseId => filename.includes(baseId));
  }

  /**
   * Extract figure number from filename
   * @param {string} filename - Image filename
   * @returns {number|null} Figure number or null if not found
   */
  extractFigureNumber(filename) {
    // Look for D00001 pattern (USPTO standard format)
    const dMatch = filename.match(/D0*(\d+)/i);
    if (dMatch) {
      return parseInt(dMatch[1]);
    }
    
    // Look for fig1, figure1, etc.
    const figMatch = filename.match(/fig(?:ure)?[_-]?(\d+)/i);
    if (figMatch) {
      return parseInt(figMatch[1]);
    }
    
    // Look for numbers in the filename
    const numMatch = filename.match(/[^\d](\d+)[^\d]/);
    if (numMatch) {
      return parseInt(numMatch[1]);
    }
    
    return null;
  }

  /**
   * Determine image quality/priority based on filename and source
   * @param {string} filename - Image filename
   * @param {string} source - Source type ('central', 'patent_images', etc.)
   * @returns {number} Priority score (higher is better quality)
   */
  getImagePriority(filename, source = 'unknown') {
    let priority = 0;
    
    // Source-based priority
    if (source === 'central') priority += 50;
    else if (source === 'patent_images') priority += 40;
    else if (source === 'supporting') priority += 20;
    else if (source === 'patent_subdir') priority += 10;
    
    // USPTO format files get bonus points
    if (filename.match(/US\w?\d+-\d+-D\d+\.png$/i)) {
      priority += 100;
    }
    
    // Named files get medium priority bonus
    if (!filename.startsWith('unnamed')) {
      priority += 20;
    }
    
    return priority;
  }

  /**
   * Get basic image metadata without loading the full image
   * @param {string} imagePath - Path to the image file
   * @param {string} source - Source type
   * @returns {Promise<Object>} Object with image metadata
   */
  async getImageMetadata(imagePath, source = 'unknown') {
    try {
      const stats = await this.fileHelper.getStats(imagePath);
      const filename = path.basename(imagePath);
      
      return {
        path: imagePath,
        filename: filename,
        size: stats.size,
        priority: this.getImagePriority(filename, source),
        source: source,
        figureNum: this.extractFigureNumber(filename)
      };
    } catch (error) {
      console.error(`Error getting metadata for ${imagePath}:`, error.message);
      return {
        path: imagePath,
        filename: path.basename(imagePath),
        size: 0,
        priority: 0,
        source: source,
        figureNum: this.extractFigureNumber(path.basename(imagePath))
      };
    }
  }

  /**
   * Determine if an image is high-resolution based on its properties
   */
  isHighResolution(imageMetadata, otherImages = []) {
    // Source-based determination
    if (imageMetadata.source === 'central' || imageMetadata.source === 'patent_images') {
      return true;
    }
    
    // Size-based determination
    if (imageMetadata.size > 100000) { // 100KB
      return true;
    }
    
    // Priority-based determination
    if (imageMetadata.priority > 50) {
      return true;
    }
    
    // Compare with similar images
    const similarImages = otherImages.filter(img => 
      img.figureNum === imageMetadata.figureNum && 
      img.path !== imageMetadata.path
    );
    
    if (similarImages.length > 0) {
      for (const other of similarImages) {
        const sizeRatio = imageMetadata.size / other.size;
        if (sizeRatio > 1.5) return true;
      }
    }
    
    return false;
  }

  /**
   * ENHANCED: Find ALL patent subdirectories
   */
  async findAllPatentSubdirectories() {
    try {
      const items = await this.fileHelper.readDirectory(this.config.LOCAL_PATENT_DIR);
      const subdirs = [];
      
      for (const item of items) {
        if (item.startsWith('patents-')) {
          const fullPath = path.join(this.config.LOCAL_PATENT_DIR, item);
          
          try {
            const stats = await this.fileHelper.getStats(fullPath);
            if (stats.isDirectory()) {
              subdirs.push(fullPath);
              console.log(`✅ Found patent subdirectory: ${item}`);
            }
          } catch (error) {
            console.warn(`⚠️ Could not access ${item}: ${error.message}`);
          }
        }
      }
      
      subdirs.sort();
      console.log(`📁 Total patent subdirectories found: ${subdirs.length}`);
      return subdirs;
    } catch (error) {
      console.error('❌ Error finding patent subdirectories:', error);
      return [];
    }
  }

  /**
   * FIXED: Process high-resolution images directory with enhanced matching
   */
  async processHighResImagesDirectory(imagesDir, baseIds, seenFigureNums, allImages, sourceType) {
    let imagesFound = 0;
    
    if (await this.fileHelper.fileExists(imagesDir)) {
      const imageFiles = await this.fileHelper.readDirectory(imagesDir);
      
      console.log(`🔍 Looking for PNG images matching base IDs: [${baseIds.join(', ')}] in ${path.basename(imagesDir)}`);
      console.log(`📂 Directory contains ${imageFiles.length} total files`);
      
      const matchingImages = imageFiles.filter(filename => {
        // Skip non-PNG files  
        if (!filename.match(/\.png$/i)) return false;
        
        // ENHANCED: Must match ANY of our possible base IDs
        const matches = this.filenameMatchesBaseIds(filename, baseIds);
        if (!matches) return false;
        
        // Skip if not a file
        try {
          if (!fs.statSync(path.join(imagesDir, filename)).isFile()) return false;
        } catch (err) {
          return false;
        }
        
        // Extract figure number to check for duplicates
        const figNum = this.extractFigureNumber(filename);
        if (figNum === null) return false;
        
        // Only include unique figure numbers per source type
        const figureKey = `${sourceType}-${figNum}`;
        if (seenFigureNums.has(figureKey)) return false;
        
        seenFigureNums.add(figureKey);
        return true;
      });
      
      imagesFound = matchingImages.length;
      
      if (imagesFound > 0) {
        console.log(`🎯 FOUND ${imagesFound} unique PNG images in ${path.basename(imagesDir)}`);
        console.log(`📋 Matching files: ${matchingImages.slice(0, 3).join(', ')}${matchingImages.length > 3 ? `... (+${matchingImages.length - 3} more)` : ''}`);
      } else {
        console.log(`❌ No matching PNG images found in ${path.basename(imagesDir)}`);
        // Debug: show what files were actually found
        const pngFiles = imageFiles.filter(f => f.match(/\.png$/i)).slice(0, 5);
        if (pngFiles.length > 0) {
          console.log(`🔍 Debug - PNG files in directory: ${pngFiles.join(', ')}`);
        }
      }
      
      // Add to all images collection
      for (const filename of matchingImages) {
        const imagePath = path.join(imagesDir, filename);
        const metadata = await this.getImageMetadata(imagePath, sourceType);
        allImages.push(metadata);
      }
    } else {
      console.log(`❌ Directory does not exist: ${imagesDir}`);
    }
    
    return imagesFound;
  }

  /**
   * COMPREHENSIVE FIX: Find all potential PNG image files for a patent
   * Now searches all discovered locations with proper suffix handling
   * @param {string} patentId - Patent ID with hyphens
   * @param {string} formattedId - Patent ID without hyphens
   * @returns {Promise<Array<Object>>} Array of image metadata objects
   */
  async findAllPatentImages(patentId, formattedId) {
    const allImages = [];
    
    // Get all possible base IDs for image matching (with leading zeros, etc.)
    const baseIds = this.extractPatentBaseIds(patentId, formattedId);
    
    // Get all possible formatted ID variations for directory search (S → S1 mapping)
    const formattedIdVariations = this.getFormattedIdVariations(patentId, formattedId);
    
    let seenFigureNums = new Set();
    
    console.log(`🎯 Searching for images:`);
    console.log(`   Base IDs: [${baseIds.join(', ')}]`);
    console.log(`   Directory formats: [${formattedIdVariations.join(', ')}]`);
    
    // 1. 🏆 HIGH PRIORITY: Check patent-pX/images/ directories for high-res images
    console.log(`\n1️⃣ Searching high-resolution images in patent subdirectories...`);
    const subdirs = await this.findAllPatentSubdirectories();
    
    let highResFound = 0;
    for (const dir of subdirs) {
      const patentImagesDir = path.join(dir, 'images');
      const found = await this.processHighResImagesDirectory(
        patentImagesDir,
        baseIds,
        seenFigureNums,
        allImages,
        'patent_images'
      );
      highResFound += found;
      
      if (found > 0) {
        console.log(`🎯 Found ${found} high-res images in ${path.basename(dir)}/images/`);
      }
    }
    
    // 2. 📎 Check patent-specific supporting directories (with S1 suffix support)
    console.log(`\n2️⃣ Searching supporting directories...`);
    let supportingFound = 0;
    
    for (const formattedVariation of formattedIdVariations) {
      // Try main directory
      const supportingDir = path.join(this.config.LOCAL_PATENT_DIR, `${formattedVariation}_files`);
      if (await this.fileHelper.fileExists(supportingDir)) {
        console.log(`📂 Checking: ${formattedVariation}_files/`);
        await this.processSupportingDirectory(supportingDir, baseIds, seenFigureNums, allImages);
        supportingFound++;
      }
      
      // Try subdirectories
      for (const dir of subdirs) {
        const subSupportingDir = path.join(dir, `${formattedVariation}_files`);
        if (await this.fileHelper.fileExists(subSupportingDir)) {
          console.log(`📂 Checking: ${path.basename(dir)}/${formattedVariation}_files/`);
          await this.processSupportingDirectory(subSupportingDir, baseIds, seenFigureNums, allImages);
          supportingFound++;
        }
      }
    }
    
    // 3. 🎯 Check central images directory
    console.log(`\n3️⃣ Checking central images directory...`);
    const centralImagesFound = await this.processHighResImagesDirectory(
      this.config.CENTRAL_IMAGES_DIR, 
      baseIds, 
      seenFigureNums, 
      allImages, 
      'central'
    );
    
    console.log(`\n📊 SEARCH RESULTS for ${patentId}:`);
    console.log(`   • High-res images (patents-pX/images/): ${highResFound}`);
    console.log(`   • Supporting directories found: ${supportingFound}`);
    console.log(`   • Central images: ${centralImagesFound}`);
    console.log(`   • Total unique images: ${allImages.length}`);
    
    if (allImages.length === 0) {
      console.log(`❌ NO IMAGES FOUND for ${patentId} - will use placeholder`);
      
      // Debug information for troubleshooting
      console.log(`🔍 Debug info:`);
      console.log(`   • Patent ID: ${patentId}`);
      console.log(`   • Formatted: ${formattedId}`);
      console.log(`   • Expected base IDs: ${baseIds.join(', ')}`);
      console.log(`   • Expected directories: ${formattedIdVariations.map(v => `${v}_files`).join(', ')}`);
    } else {
      // Group by source for summary
      const bySources = allImages.reduce((acc, img) => {
        acc[img.source] = (acc[img.source] || 0) + 1;
        return acc;
      }, {});
      console.log(`   • By source: ${Object.entries(bySources).map(([k,v]) => `${k}:${v}`).join(', ')}`);
    }
    
    return allImages;
  }

  /**
   * ENHANCED: Process a directory containing supporting PNG images
   */
  async processSupportingDirectory(dirPath, baseIds, seenFigureNums, allImages) {
    try {
      const supportingFiles = await this.fileHelper.readDirectory(dirPath);
      
      const supportingImages = supportingFiles.filter(filename => {
        // Skip non-PNG files
        if (!filename.match(/\.png$/i)) return false;
        
        // Skip account_data subdirectory files
        if (filename.includes('account_data')) return false;
        
        // Skip if not a file
        try {
          if (!fs.statSync(path.join(dirPath, filename)).isFile()) return false;
        } catch (err) {
          return false;
        }
        
        // ENHANCED: Must match ANY of our possible base IDs OR be a generic unnamed file
        const matchesBaseId = this.filenameMatchesBaseIds(filename, baseIds);
        const isGenericFile = filename.startsWith('unnamed');
        
        if (!matchesBaseId && !isGenericFile) {
          return false;
        }
        
        // Extract figure number to check for duplicates
        const figNum = this.extractFigureNumber(filename);
        if (figNum === null && !isGenericFile) return false;
        
        // For generic unnamed files, create a pseudo figure number
        let figureKey;
        if (isGenericFile) {
          // Use filename as key for unnamed files to avoid conflicts
          figureKey = `supporting-${filename}`;
        } else {
          figureKey = `supporting-${figNum}`;
        }
        
        if (seenFigureNums.has(figureKey)) return false;
        
        seenFigureNums.add(figureKey);
        return true;
      });
      
      console.log(`📎 Found ${supportingImages.length} PNG images in ${path.basename(dirPath)}`);
      
      if (supportingImages.length > 0) {
        console.log(`   Files: ${supportingImages.join(', ')}`);
      }
      
      // Add to all images collection
      for (const filename of supportingImages) {
        const imagePath = path.join(dirPath, filename);
        const metadata = await this.getImageMetadata(imagePath, 'supporting');
        allImages.push(metadata);
      }
    } catch (error) {
      console.error(`Error processing supporting directory ${dirPath}:`, error);
    }
  }

  /**
   * Process all patent images with enhanced analysis
   */
  async processPatentImages(patentId) {
    try {
      console.log(`\n🎯 Processing images for patent ${patentId}...`);
      
      const patentIdWithHyphens = patentId;
      const formattedId = patentId.replace(/-/g, '');
      
      // Clean and recreate directories in public folder
      const publicPatentDir = path.join(this.config.PUBLIC_PATENTS_DIR, patentIdWithHyphens);
      const publicHiResDir = path.join(publicPatentDir, 'hires');
      
      console.log(`🧹 Cleaning directories for ${patentId}...`);
      if (fs.existsSync(publicPatentDir)) {
        await this.fileHelper.cleanDirectory(publicPatentDir);
      } else {
        await this.fileHelper.ensureDirectoryExists(publicPatentDir);
      }
      
      if (!fs.existsSync(publicHiResDir)) {
        await this.fileHelper.ensureDirectoryExists(publicHiResDir);
      }
      
      // Find all potential images for this patent
      const allImages = await this.findAllPatentImages(patentId, formattedId);
      
      if (allImages.length === 0) {
        console.log(`❌ No images found for ${patentId}, using placeholder`);
        return [{
          thumbnail: `/images/patents/placeholder.svg`,
          hires: `/images/patents/placeholder.svg`,
          caption: 'No image available'
        }];
      }
      
      console.log(`\n🔄 Analyzing ${allImages.length} images for ${patentId}...`);
      
      // Group images by figure number
      const imagesByFigure = {};
      for (const img of allImages) {
        // Handle both numbered figures and unnamed files
        const figKey = img.figureNum !== null ? img.figureNum : `unnamed-${img.filename}`;
        
        if (!imagesByFigure[figKey]) {
          imagesByFigure[figKey] = [];
        }
        imagesByFigure[figKey].push(img);
      }
      
      // Process images for each figure
      return await this.copyAndFormatImages(patentIdWithHyphens, imagesByFigure, publicPatentDir, publicHiResDir);
      
    } catch (error) {
      console.error(`❌ Error processing images for ${patentId}:`, error);
      return [{
        thumbnail: `/images/patents/placeholder.svg`,
        hires: `/images/patents/placeholder.svg`,
        caption: 'No image available'
      }];
    }
  }

  /**
   * ENHANCED: Copy and format images for the patent
   */
  async copyAndFormatImages(patentIdWithHyphens, imagesByFigure, publicPatentDir, publicHiResDir) {
    const imagePaths = [];
    
    console.log(`📋 Processing ${Object.keys(imagesByFigure).length} figure groups...`);
    
    for (const [figKey, images] of Object.entries(imagesByFigure)) {
      // Sort images by priority (highest first)
      images.sort((a, b) => b.priority - a.priority);
      
      const bestImage = images[0];
      const isUnnamedFile = figKey.startsWith('unnamed-');
      
      // Determine figure number for filename
      let figNum;
      if (isUnnamedFile) {
        // For unnamed files, use a sequential number
        const unnamedIndex = Object.keys(imagesByFigure)
          .filter(k => k.startsWith('unnamed-'))
          .indexOf(figKey) + 1;
        figNum = 100 + unnamedIndex; // Start unnamed at 101, 102, etc.
      } else {
        figNum = parseInt(figKey);
      }
      
      const destFilename = `fig${figNum}.png`;
      const thumbnailDestPath = path.join(publicPatentDir, destFilename);
      const hiResDestPath = path.join(publicHiResDir, destFilename);
      
      const thumbnailPath = `/images/patents/${patentIdWithHyphens}/${destFilename}`;
      const hiresPath = `/images/patents/${patentIdWithHyphens}/hires/${destFilename}`;
      
      console.log(`📁 Copying ${bestImage.filename} -> fig${figNum}.png (priority: ${bestImage.priority}, source: ${bestImage.source})`);
      
      // Copy best image to both locations
      await this.fileHelper.copyFile(bestImage.path, thumbnailDestPath);
      await this.fileHelper.copyFile(bestImage.path, hiResDestPath);
      
      imagePaths.push({
        thumbnail: thumbnailPath,
        hires: hiresPath,
        caption: `Figure ${figNum}`,
        source: bestImage.source,
        originalFilename: bestImage.filename
      });
    }
    
    // Sort by figure number
    imagePaths.sort((a, b) => {
      const figNumA = parseInt(a.caption.match(/\d+/)[0]);
      const figNumB = parseInt(b.caption.match(/\d+/)[0]);
      return figNumA - figNumB;
    });
    
    console.log(`✅ Generated ${imagePaths.length} image entries for ${patentIdWithHyphens}`);
    
    return imagePaths;
  }
}
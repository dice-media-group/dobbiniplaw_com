// ImageProcessor.js
// Handles image analysis and processing for patents

import path from 'path';
import fs from 'fs';
import { FileSystemHelper } from './FileSystemHelper.js';

export class ImageProcessor {
  constructor(config) {
    this.config = config;
    this.fileHelper = new FileSystemHelper(config);
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
   * Get basic image metadata without loading the full image
   * @param {string} imagePath - Path to the image file
   * @returns {Promise<Object>} Object with image metadata
   */
  async getImageMetadata(imagePath) {
    try {
      // Get file stats
      const stats = await this.fileHelper.getStats(imagePath);
      
      return {
        path: imagePath,
        filename: path.basename(imagePath),
        size: stats.size,
        // Extract figure number from filename
        figureNum: this.extractFigureNumber(path.basename(imagePath))
      };
    } catch (error) {
      console.error(`Error getting metadata for ${imagePath}:`, error.message);
      // Return basic info if metadata extraction fails
      return {
        path: imagePath,
        filename: path.basename(imagePath),
        size: 0,
        figureNum: this.extractFigureNumber(path.basename(imagePath))
      };
    }
  }

  /**
   * Determine if an image is high-resolution based on its properties
   * @param {Object} imageMetadata - Image metadata object
   * @param {Array<Object>} otherImages - Array of other image metadata for comparison
   * @returns {boolean} True if the image is high-resolution
   */
  isHighResolution(imageMetadata, otherImages = []) {
    // If there are similar images to compare (same figure number)
    const similarImages = otherImages.filter(img => 
      img.figureNum === imageMetadata.figureNum && 
      img.path !== imageMetadata.path
    );
    
    if (similarImages.length > 0) {
      // Compare with similar images - if this is significantly larger, it's high-res
      for (const other of similarImages) {
        const sizeRatio = imageMetadata.size / other.size;
        
        // If this image is at least 1.5x larger
        if (sizeRatio > 1.5) {
          return true;
        }
      }
    }
    
    // If file is large in absolute terms
    if (imageMetadata.size > 100000) { // 100KB
      return true;
    }
    
    // Default for central images directory files - likely high-res
    if (imageMetadata.path.includes(this.config.CENTRAL_IMAGES_DIR)) {
      return true;
    }
    
    return false;
  }

  /**
   * Find all potential image files for a patent
   * @param {string} patentId - Patent ID with hyphens
   * @param {string} formattedId - Patent ID without hyphens
   * @returns {Promise<Array<Object>>} Array of image metadata objects
   */
  async findAllPatentImages(patentId, formattedId) {
    const allImages = [];
    const patentIdBase = formattedId.replace(/([A-Z]\d+)$/, ''); // For example, US12260863 from US12260863B1
    
    // 1. Check central images directory for high-res images
    console.log(`Checking central images directory: ${this.config.CENTRAL_IMAGES_DIR}`);
    let centralImagesFound = 0;
    if (await this.fileHelper.fileExists(this.config.CENTRAL_IMAGES_DIR)) {
      const centralFiles = await this.fileHelper.readDirectory(this.config.CENTRAL_IMAGES_DIR);
      
      console.log(`Looking for images matching base ID: ${patentIdBase}`);
      
      // Find matching images (only include actual image files, exclude duplicates)
      let seenFigureNums = new Set();
      
      // Match pattern with date component if available
      const matchingCentralImages = centralFiles.filter(filename => {
        // Skip non-image files
        if (!filename.match(/\.(png|jpg|jpeg|gif|tiff|webp)$/i)) return false;
        
        // Must match our patent ID base
        if (!filename.includes(patentIdBase)) return false;
        
        // Skip if not a file
        try {
          if (!fs.statSync(path.join(this.config.CENTRAL_IMAGES_DIR, filename)).isFile()) return false;
        } catch (err) {
          return false;
        }
        
        // Extract figure number to check for duplicates
        const figNum = this.extractFigureNumber(filename);
        if (figNum === null) return false;
        
        // Only include unique figure numbers
        if (seenFigureNums.has(figNum)) return false;
        
        seenFigureNums.add(figNum);
        return true;
      });
      
      centralImagesFound = matchingCentralImages.length;
      console.log(`Found ${centralImagesFound} unique high-res images in central directory`);
      
      // Add to all images collection
      for (const filename of matchingCentralImages) {
        const imagePath = path.join(this.config.CENTRAL_IMAGES_DIR, filename);
        const metadata = await this.getImageMetadata(imagePath);
        allImages.push({
          ...metadata,
          source: 'central'
        });
      }
    }
    
    // 2. Check patent-specific supporting directory for thumbnails
    const supportingDir = path.join(this.config.LOCAL_PATENT_DIR, `${formattedId}_files`);
    console.log(`Checking supporting directory: ${supportingDir}`);
    
    let supportingImagesFound = 0;
    let seenSupportingFigureNums = new Set();
    
    if (await this.fileHelper.fileExists(supportingDir)) {
      await this.processSupportingDirectory(supportingDir, seenSupportingFigureNums, allImages);
      supportingImagesFound += seenSupportingFigureNums.size;
    }
    
    // 3. Check additional "patents-" directories
    const subdirs = await this.fileHelper.findPatentSubdirectories();
    for (const dir of subdirs) {
      // Check for supporting directories in each patents- folder
      const subSupportingDir = path.join(dir, `${formattedId}_files`);
      if (await this.fileHelper.fileExists(subSupportingDir)) {
        console.log(`Checking supporting directory in ${path.basename(dir)}: ${subSupportingDir}`);
        await this.processSupportingDirectory(subSupportingDir, seenSupportingFigureNums, allImages);
      }
      
      // Also check for images directly in the patents- directory
      const patentFiles = await this.fileHelper.readDirectory(dir);
      const patentImages = patentFiles.filter(filename => {
        // Must be an image file
        if (!filename.match(/\.(png|jpg|jpeg|gif|tiff|webp)$/i)) return false;
        
        // Must include the patent ID
        if (!filename.includes(formattedId) && !filename.includes(patentIdBase)) return false;
        
        // Must be a file
        try {
          if (!fs.statSync(path.join(dir, filename)).isFile()) return false;
        } catch (err) {
          return false;
        }
        
        // Extract figure number
        const figNum = this.extractFigureNumber(filename);
        if (figNum === null) return false;
        
        // Only include unique figure numbers
        if (seenSupportingFigureNums.has(figNum)) return false;
        
        seenSupportingFigureNums.add(figNum);
        return true;
      });
      
      console.log(`Found ${patentImages.length} patent images directly in ${path.basename(dir)}`);
      
      // Add to all images collection
      for (const filename of patentImages) {
        const imagePath = path.join(dir, filename);
        const metadata = await this.getImageMetadata(imagePath);
        allImages.push({
          ...metadata,
          source: 'patent_subdir'
        });
        supportingImagesFound++;
      }
    }
    
    console.log(`Found ${supportingImagesFound} total supporting images`);
    
    return allImages;
  }

  /**
   * Process a directory containing supporting images
   * @param {string} dirPath - Directory path
   * @param {Set<number>} seenFigureNums - Set of already seen figure numbers
   * @param {Array<Object>} allImages - Array to add found images to
   * @returns {Promise<void>}
   */
  async processSupportingDirectory(dirPath, seenFigureNums, allImages) {
    try {
      const supportingFiles = await this.fileHelper.readDirectory(dirPath);
      
      // Find image files in supporting directory (excluding duplicates)
      const supportingImages = supportingFiles.filter(filename => {
        // Skip non-image files
        if (!filename.match(/\.(png|jpg|jpeg|gif|tiff|webp)$/i)) return false;
        
        // Skip if not a file
        try {
          if (!fs.statSync(path.join(dirPath, filename)).isFile()) return false;
        } catch (err) {
          return false;
        }
        
        // Extract figure number to check for duplicates
        const figNum = this.extractFigureNumber(filename);
        if (figNum === null) return false;
        
        // Skip variants (like file_002.png)
        if (filename.includes('_002') || filename.includes('_003')) return false;
        
        // Include only if we haven't seen this figure number yet
        if (seenFigureNums.has(figNum)) return false;
        
        seenFigureNums.add(figNum);
        return true;
      });
      
      console.log(`Found ${supportingImages.length} unique thumbnail images in ${path.basename(dirPath)}`);
      
      // Add to all images collection
      for (const filename of supportingImages) {
        const imagePath = path.join(dirPath, filename);
        const metadata = await this.getImageMetadata(imagePath);
        allImages.push({
          ...metadata,
          source: 'supporting'
        });
      }
    } catch (error) {
      console.error(`Error processing supporting directory ${dirPath}:`, error);
    }
  }

  /**
   * Process all patent images with enhanced analysis
   * @param {string} patentId - Patent ID with hyphens (e.g., US-12270996-B2)
   * @returns {Promise<Array<Object>>} Array of image objects with thumbnail and hires properties
   */
  async processPatentImages(patentId) {
    try {
      console.log(`\nProcessing images for patent ${patentId}...`);
      
      // Format the patent ID (with and without hyphens)
      const patentIdWithHyphens = patentId;
      const formattedId = patentId.replace(/-/g, '');
      
      // Clean and recreate directories in public folder
      const publicPatentDir = path.join(this.config.PUBLIC_PATENTS_DIR, patentIdWithHyphens);
      const publicHiResDir = path.join(publicPatentDir, 'hires');
      
      // Clean existing directories if they exist
      console.log(`Cleaning existing directories for ${patentId}...`);
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
      
      // Now analyze and categorize all the images
      console.log(`Analyzing ${allImages.length} total images for ${patentId}...`);
      
      // Group images by figure number
      const imagesByFigure = {};
      for (const img of allImages) {
        if (img.figureNum === null) continue; // Skip images without figure numbers
        
        const figNum = img.figureNum;
        if (!imagesByFigure[figNum]) {
          imagesByFigure[figNum] = [];
        }
        imagesByFigure[figNum].push(img);
      }
      
      // For each figure, determine which is high-res and which is regular
      const highResImages = [];
      const regularImages = [];
      
      for (const [figNum, images] of Object.entries(imagesByFigure)) {
        if (images.length === 1) {
          // If only one image for this figure, decide based on absolute criteria
          const img = images[0];
          if (this.isHighResolution(img)) {
            highResImages.push(img);
          } else {
            regularImages.push(img);
          }
        } else if (images.length > 1) {
          // If multiple images for this figure, compare them
          // Sort by size (largest first)
          images.sort((a, b) => b.size - a.size);
          
          // The largest is likely high-res, others are regular
          highResImages.push(images[0]);
          regularImages.push(...images.slice(1));
        }
      }
      
      console.log(`Categorized ${highResImages.length} high-res images and ${regularImages.length} regular images`);
      
      return await this.copyAndFormatImages(patentIdWithHyphens, highResImages, regularImages, publicPatentDir, publicHiResDir);
    } catch (error) {
      console.error(`Error processing images for ${patentId}:`, error);
      return [{
        thumbnail: `/images/patents/placeholder.svg`,
        hires: `/images/patents/placeholder.svg`,
        caption: 'No image available'
      }];
    }
  }

  /**
   * Copy and format images for the patent
   * @param {string} patentIdWithHyphens - Patent ID with hyphens
   * @param {Array<Object>} highResImages - Array of high-res image metadata
   * @param {Array<Object>} regularImages - Array of regular image metadata
   * @param {string} publicPatentDir - Public patent directory path
   * @param {string} publicHiResDir - Public high-res directory path
   * @returns {Promise<Array<Object>>} Array of image objects with thumbnail and hires properties
   */
  async copyAndFormatImages(patentIdWithHyphens, highResImages, regularImages, publicPatentDir, publicHiResDir) {
    // Copy the images to public directory
    const imagePaths = [];
    
    // Process the images by figure number
    const processedFigures = new Set();
    
    // First process regular images
    for (const img of regularImages) {
      if (img.figureNum === null) continue; // Skip images without figure numbers
      
      const figNum = img.figureNum;
      
      // Skip if we already processed this figure
      if (processedFigures.has(figNum)) continue;
      processedFigures.add(figNum);
      
      const destFilename = `fig${figNum}${path.extname(img.filename)}`;
      const destPath = path.join(publicPatentDir, destFilename);
      const thumbnailPath = `/images/patents/${patentIdWithHyphens}/${destFilename}`;
      
      console.log(`Copying regular image: ${img.filename} -> ${destFilename}`);
      await this.fileHelper.copyFile(img.path, destPath);
      
      // Find a matching high-res image for this figure
      const matchingHiRes = highResImages.find(hi => hi.figureNum === figNum);
      let hiresPath = thumbnailPath; // Default to thumbnail if no hi-res exists
      
      if (matchingHiRes) {
        const hiResFilename = `fig${figNum}${path.extname(matchingHiRes.filename)}`;
        const hiResDestPath = path.join(publicHiResDir, hiResFilename);
        hiresPath = `/images/patents/${patentIdWithHyphens}/hires/${hiResFilename}`;
        
        console.log(`Copying matching high-res image: ${matchingHiRes.filename} -> hires/${hiResFilename}`);
        await this.fileHelper.copyFile(matchingHiRes.path, hiResDestPath);
      }
      
      // Add to image paths with the new format
      imagePaths.push({
        thumbnail: thumbnailPath,
        hires: hiresPath,
        caption: `Figure ${figNum}`
      });
    }
    
    // Now process any high-res images that don't have a regular counterpart
    for (const img of highResImages) {
      if (img.figureNum === null) continue; // Skip images without figure numbers
      
      const figNum = img.figureNum;
      
      // Skip if we already processed this figure
      if (processedFigures.has(figNum)) continue;
      processedFigures.add(figNum);
      
      const destFilename = `fig${figNum}${path.extname(img.filename)}`;
      const thumbnailDestPath = path.join(publicPatentDir, destFilename);
      const hiResDestPath = path.join(publicHiResDir, destFilename);
      
      const thumbnailPath = `/images/patents/${patentIdWithHyphens}/${destFilename}`;
      const hiresPath = `/images/patents/${patentIdWithHyphens}/hires/${destFilename}`;
      
      // Copy high-res to both locations
      console.log(`Copying high-res image as both regular and hi-res: ${img.filename}`);
      await this.fileHelper.copyFile(img.path, hiResDestPath);
      await this.fileHelper.copyFile(img.path, thumbnailDestPath);
      
      // Add to image paths
      imagePaths.push({
        thumbnail: thumbnailPath,
        hires: hiresPath,
        caption: `Figure ${figNum}`
      });
    }
    
    // Sort image paths by figure number
    imagePaths.sort((a, b) => {
      const figNumA = parseInt(a.caption.match(/\d+/)[0]);
      const figNumB = parseInt(b.caption.match(/\d+/)[0]);
      return figNumA - figNumB;
    });
    
    // Log all the actual figures we found
    console.log(`Generated ${imagePaths.length} image entries for patent ${patentIdWithHyphens}`);
    
    if (imagePaths.length > 0) {
      const figureNumbers = imagePaths.map(p => {
        const match = p.caption.match(/Figure (\d+)/);
        return match ? match[1] : '';
      }).join(', ');
      
      console.log(`Figure numbers included: ${figureNumbers}`);
    }
    
    // Use placeholders if no images were found
    if (imagePaths.length === 0) {
      console.log(`No images found for ${patentIdWithHyphens}, using placeholder`);
      imagePaths.push({
        thumbnail: `/images/patents/placeholder.svg`,
        hires: `/images/patents/placeholder.svg`,
        caption: 'No image available'
      });
    }
    
    // Return the image paths with the new format
    return imagePaths;
  }
}

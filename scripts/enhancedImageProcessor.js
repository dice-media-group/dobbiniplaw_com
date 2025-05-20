// enhancedImageProcessor.js
// Enhanced script for analyzing and processing patent images

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { promisify } from 'util';
import * as cheerio from 'cheerio';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const LOCAL_PATENT_DIR = process.env.PATENT_COLLECTION_DIR || '/Users/carltanner/Documents/projects/2025_04_08__dobbiniplaw_com/patent_collection';
const CENTRAL_IMAGES_DIR = path.join(LOCAL_PATENT_DIR, 'images');
const PUBLIC_PATENTS_DIR = path.join(__dirname, '../public/images/patents');

// Promisify fs functions
const statAsync = promisify(fs.stat);
const readFileAsync = promisify(fs.readFile);
const readdirAsync = promisify(fs.readdir);
const mkdirAsync = promisify(fs.mkdir);
const copyFileAsync = promisify(fs.copyFile);
const existsAsync = promisify(fs.exists);
const rmdirAsync = promisify(fs.rmdir);
const unlinkAsync = promisify(fs.unlink);

/**
 * Find all directories in the patent collection that start with "patents-"
 * @returns {Promise<Array<string>>} Array of directory paths
 */
async function findPatentSubdirectories() {
  try {
    const items = await readdirAsync(LOCAL_PATENT_DIR);
    const subdirs = [];
    
    for (const item of items) {
      if (item.startsWith('patents-')) {
        const fullPath = path.join(LOCAL_PATENT_DIR, item);
        const stats = await statAsync(fullPath);
        
        if (stats.isDirectory()) {
          subdirs.push(fullPath);
        }
      }
    }
    
    console.log(`Found ${subdirs.length} additional patent directories: ${subdirs.map(d => path.basename(d)).join(', ')}`);
    return subdirs;
  } catch (error) {
    console.error('Error finding patent subdirectories:', error);
    return [];
  }
}

/**
 * Class for analyzing and comparing images
 */
class ImageAnalyzer {
  /**
   * Get basic image metadata without loading the full image
   * @param {string} imagePath - Path to the image file
   * @returns {Promise<Object>} Object with image metadata
   */
  static async getImageMetadata(imagePath) {
    try {
      // Get file stats
      const stats = await statAsync(imagePath);
      
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
   * Extract figure number from filename
   * @param {string} filename - Image filename
   * @returns {number|null} Figure number or null if not found
   */
  static extractFigureNumber(filename) {
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
   * Determine if an image is high-resolution based on its properties
   * @param {Object} imageMetadata - Image metadata object
   * @param {Array<Object>} otherImages - Array of other image metadata for comparison
   * @returns {boolean} True if the image is high-resolution
   */
  static isHighResolution(imageMetadata, otherImages = []) {
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
    if (imageMetadata.path.includes(CENTRAL_IMAGES_DIR)) {
      return true;
    }
    
    return false;
  }
}

/**
 * Extract abstract from HTML file
 * @param {string} patentId - Patent ID with hyphens
 * @returns {Promise<string>} Abstract text
 */
async function extractAbstract(patentId) {
  try {
    const formattedId = patentId.replace(/-/g, '');
    
    // Search in main directory first
    let htmlPath = path.join(LOCAL_PATENT_DIR, `${formattedId}.html`);
    let exists = await existsAsync(htmlPath);
    
    // If not found, search in subdirectories
    if (!exists) {
      const subdirs = await findPatentSubdirectories();
      for (const dir of subdirs) {
        const subHtmlPath = path.join(dir, `${formattedId}.html`);
        if (await existsAsync(subHtmlPath)) {
          htmlPath = subHtmlPath;
          exists = true;
          break;
        }
      }
    }
    
    if (!exists) {
      return `HTML file not found for ${patentId}`;
    }
    
    // Read the HTML file
    const htmlContent = await readFileAsync(htmlPath, 'utf8');
    
    // Parse the HTML
    const $ = cheerio.load(htmlContent);
    
    // Try different selectors that might contain the abstract
    let abstract = '';
    
    // Try 'section#text abstract div.abstract'
    const abstractDiv = $('section#text abstract div.abstract');
    if (abstractDiv.length > 0) {
      abstract = abstractDiv.text().trim();
    } 
    // Try 'abstract .abstract'
    else {
      const altAbstractElem = $('abstract .abstract');
      if (altAbstractElem.length > 0) {
        abstract = altAbstractElem.text().trim();
      } 
      // Try '.abstract'
      else {
        const anyAbstractElem = $('.abstract');
        if (anyAbstractElem.length > 0) {
          abstract = anyAbstractElem.text().trim();
        }
        // Try 'section[itemprop="abstract"]'
        else {
          const itempropAbstract = $('section[itemprop="abstract"]');
          if (itempropAbstract.length > 0) {
            abstract = itempropAbstract.text().trim();
          } else {
            abstract = `Abstract not found for ${patentId}`;
          }
        }
      }
    }
    
    return abstract;
  } catch (error) {
    console.error(`Error extracting abstract for ${patentId}:`, error.message);
    return `Error extracting abstract for ${patentId}: ${error.message}`;
  }
}

/**
 * Delete all files in a directory
 * @param {string} directoryPath - Path to the directory
 * @returns {Promise<void>}
 */
async function cleanDirectory(directoryPath) {
  if (!fs.existsSync(directoryPath)) {
    return;
  }
  
  const files = await readdirAsync(directoryPath);
  
  for (const file of files) {
    const filePath = path.join(directoryPath, file);
    const fileStat = await statAsync(filePath);
    
    if (fileStat.isDirectory()) {
      // Recursively clean subdirectory
      await cleanDirectory(filePath);
      
      // Remove empty directory
      try {
        await rmdirAsync(filePath);
      } catch (error) {
        console.error(`Error removing directory ${filePath}:`, error.message);
      }
    } else {
      // Remove file
      try {
        await unlinkAsync(filePath);
      } catch (error) {
        console.error(`Error removing file ${filePath}:`, error.message);
      }
    }
  }
}

/**
 * Find all potential image files for a patent
 * @param {string} patentId - Patent ID with hyphens
 * @param {string} formattedId - Patent ID without hyphens
 * @returns {Promise<Array<Object>>} Array of image metadata objects
 */
async function findAllPatentImages(patentId, formattedId) {
  const allImages = [];
  const patentIdBase = formattedId.replace(/([A-Z]\d+)$/, ''); // For example, US12260863 from US12260863B1
  
  // 1. Check central images directory for high-res images
  console.log(`Checking central images directory: ${CENTRAL_IMAGES_DIR}`);
  let centralImagesFound = 0;
  if (await existsAsync(CENTRAL_IMAGES_DIR)) {
    const centralFiles = await readdirAsync(CENTRAL_IMAGES_DIR);
    
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
        if (!fs.statSync(path.join(CENTRAL_IMAGES_DIR, filename)).isFile()) return false;
      } catch (err) {
        return false;
      }
      
      // Extract figure number to check for duplicates
      const figNum = ImageAnalyzer.extractFigureNumber(filename);
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
      const imagePath = path.join(CENTRAL_IMAGES_DIR, filename);
      const metadata = await ImageAnalyzer.getImageMetadata(imagePath);
      allImages.push({
        ...metadata,
        source: 'central'
      });
    }
  }
  
  // 2. Check patent-specific supporting directory for thumbnails
  const supportingDir = path.join(LOCAL_PATENT_DIR, `${formattedId}_files`);
  console.log(`Checking supporting directory: ${supportingDir}`);
  
  let supportingImagesFound = 0;
  let seenSupportingFigureNums = new Set();
  
  if (await existsAsync(supportingDir)) {
    await processSupportingDirectory(supportingDir);
  }
  
  // 3. Check additional "patents-" directories
  const subdirs = await findPatentSubdirectories();
  for (const dir of subdirs) {
    // Check for supporting directories in each patents- folder
    const subSupportingDir = path.join(dir, `${formattedId}_files`);
    if (await existsAsync(subSupportingDir)) {
      console.log(`Checking supporting directory in ${path.basename(dir)}: ${subSupportingDir}`);
      await processSupportingDirectory(subSupportingDir);
    }
    
    // Also check for images directly in the patents- directory
    const patentFiles = await readdirAsync(dir);
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
      const figNum = ImageAnalyzer.extractFigureNumber(filename);
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
      const metadata = await ImageAnalyzer.getImageMetadata(imagePath);
      allImages.push({
        ...metadata,
        source: 'patent_subdir'
      });
      supportingImagesFound++;
    }
  }
  
  console.log(`Found ${supportingImagesFound} total supporting images`);
  
  // Helper function to process supporting directories
  async function processSupportingDirectory(dirPath) {
    try {
      const supportingFiles = await readdirAsync(dirPath);
      
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
        const figNum = ImageAnalyzer.extractFigureNumber(filename);
        if (figNum === null) return false;
        
        // Skip variants (like file_002.png)
        if (filename.includes('_002') || filename.includes('_003')) return false;
        
        // Include only if we haven't seen this figure number yet
        if (seenSupportingFigureNums.has(figNum)) return false;
        
        seenSupportingFigureNums.add(figNum);
        return true;
      });
      
      console.log(`Found ${supportingImages.length} unique thumbnail images in ${path.basename(dirPath)}`);
      
      // Add to all images collection
      for (const filename of supportingImages) {
        const imagePath = path.join(dirPath, filename);
        const metadata = await ImageAnalyzer.getImageMetadata(imagePath);
        allImages.push({
          ...metadata,
          source: 'supporting'
        });
        supportingImagesFound += supportingImages.length;
      }
    } catch (error) {
      console.error(`Error processing supporting directory ${dirPath}:`, error);
    }
  }
  
  return allImages;
}

/**
 * Process all patent images with enhanced analysis
 * @param {string} patentId - Patent ID with hyphens (e.g., US-12270996-B2)
 * @returns {Promise<Array<Object>>} Array of image objects with thumbnail and hires properties
 */
async function processPatentImagesEnhanced(patentId) {
  try {
    console.log(`\nProcessing images for patent ${patentId}...`);
    
    // Format the patent ID (with and without hyphens)
    const patentIdWithHyphens = patentId;
    const formattedId = patentId.replace(/-/g, '');
    
    // Clean and recreate directories in public folder
    const publicPatentDir = path.join(PUBLIC_PATENTS_DIR, patentIdWithHyphens);
    const publicHiResDir = path.join(publicPatentDir, 'hires');
    
    // Clean existing directories if they exist
    console.log(`Cleaning existing directories for ${patentId}...`);
    if (fs.existsSync(publicPatentDir)) {
      await cleanDirectory(publicPatentDir);
    } else {
      await mkdirAsync(publicPatentDir, { recursive: true });
    }
    
    if (!fs.existsSync(publicHiResDir)) {
      await mkdirAsync(publicHiResDir, { recursive: true });
    }
    
    // Find all potential images for this patent
    const allImages = await findAllPatentImages(patentId, formattedId);
    
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
        if (ImageAnalyzer.isHighResolution(img)) {
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
      await copyFileAsync(img.path, destPath);
      
      // Find a matching high-res image for this figure
      const matchingHiRes = highResImages.find(hi => hi.figureNum === figNum);
      let hiresPath = thumbnailPath; // Default to thumbnail if no hi-res exists
      
      if (matchingHiRes) {
        const hiResFilename = `fig${figNum}${path.extname(matchingHiRes.filename)}`;
        const hiResDestPath = path.join(publicHiResDir, hiResFilename);
        hiresPath = `/images/patents/${patentIdWithHyphens}/hires/${hiResFilename}`;
        
        console.log(`Copying matching high-res image: ${matchingHiRes.filename} -> hires/${hiResFilename}`);
        await copyFileAsync(matchingHiRes.path, hiResDestPath);
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
      await copyFileAsync(img.path, hiResDestPath);
      await copyFileAsync(img.path, thumbnailDestPath);
      
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
    console.log(`Generated ${imagePaths.length} image entries for patent ${patentId}`);
    
    if (imagePaths.length > 0) {
      const figureNumbers = imagePaths.map(p => {
        const match = p.caption.match(/Figure (\d+)/);
        return match ? match[1] : '';
      }).join(', ');
      
      console.log(`Figure numbers included: ${figureNumbers}`);
    }
    
    // Use placeholders if no images were found
    if (imagePaths.length === 0) {
      console.log(`No images found for ${patentId}, using placeholder`);
      imagePaths.push({
        thumbnail: `/images/patents/placeholder.svg`,
        hires: `/images/patents/placeholder.svg`,
        caption: 'No image available'
      });
    }
    
    // Return the image paths with the new format
    return imagePaths;
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
 * Process all patents using the enhanced image analysis
 * @param {Array<Object>} patents - Array of patent objects
 * @returns {Promise<Array<Object>>} Enhanced patent objects with image paths
 */
async function enhancePatentsWithImages(patents) {
  const enhancedPatents = [];
  
  for (const patent of patents) {
    console.log(`\nEnhancing data for patent ${patent.id}`);
    
    try {
      // Process patent images (now returns an array of image objects)
      const images = await processPatentImagesEnhanced(patent.id);
      
      // Fetch abstract
      const abstract = await extractAbstract(patent.id);
      
      // Add enhanced data to patent
      enhancedPatents.push({
        ...patent,
        abstract,
        images: images,
        featured: patent.id === 'US-10794647-B2' // Example featured patent
      });
      
    } catch (error) {
      console.error(`Error enhancing patent ${patent.id}:`, error);
      enhancedPatents.push({
        ...patent,
        abstract: `Error processing patent ${patent.id}: ${error.message}`,
        images: [{
          thumbnail: `/images/patents/placeholder.svg`,
          hires: `/images/patents/placeholder.svg`,
          caption: 'No image available'
        }]
      });
    }
  }
  
  return enhancedPatents;
}

export default {
  processPatentImagesEnhanced,
  enhancePatentsWithImages,
  ImageAnalyzer,
  extractAbstract
};
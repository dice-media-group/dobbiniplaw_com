// firefoxPatentProcessor.js
// Script to process patent pages downloaded with Firefox
// Enhanced to handle both thumbnail and high-resolution images

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as cheerio from 'cheerio';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const LOCAL_PATENT_DIR = process.env.PATENT_COLLECTION_DIR || '/Users/carltanner/Documents/projects/2025_04_08__dobbiniplaw_com/patent_collection';

/**
 * Check the central images directory for images matching this patent
 * @param {string} patentId - The patent ID with hyphens (e.g., "US-12270996-B2")
 * @returns {Array<Object>} Array of image objects with paths and metadata
 */
function findPatentImagesInCentralDirectory(patentId) {
  const centralImagesDir = path.join(LOCAL_PATENT_DIR, 'images');
  if (!fs.existsSync(centralImagesDir)) {
    return [];
  }
  
  // Convert patent ID format (from "US-12270996-B2" to "US12270996")
  const formattedId = patentId.replace(/-/g, '');
  const patentIdBase = formattedId.split('-')[0];
  
  // Find all images for this patent in the central directory
  const allImages = fs.readdirSync(centralImagesDir);
  
  // Sort them into high-res and regular folders
  const hiresFolder = path.join(centralImagesDir, `${formattedId}_hires`);
  let hiresImages = [];
  
  // Check if high-res directory exists
  if (fs.existsSync(hiresFolder) && fs.statSync(hiresFolder).isDirectory()) {
    hiresImages = fs.readdirSync(hiresFolder)
      .filter(file => file.match(/\.(jpg|jpeg|png|gif|tiff)$/i));
  }
  
  // Get regular images from main directory
  const regularImages = allImages.filter(filename => 
    filename.startsWith(patentIdBase) && 
    filename.match(/\.(jpg|jpeg|png|gif|tiff)$/i) &&
    fs.statSync(path.join(centralImagesDir, filename)).isFile() // Make sure it's a file, not a directory
  );
  
  // Sort by figure number (D00001, D00002, etc.)
  const sortByDNumber = (a, b) => {
    // Extract the D number from the filename
    const dNumberA = a.match(/D0*(\d+)/i);
    const dNumberB = b.match(/D0*(\d+)/i);
    
    if (dNumberA && dNumberB) {
      return parseInt(dNumberA[1]) - parseInt(dNumberB[1]);
    }
    
    // Fall back to alphabetical order
    return a.localeCompare(b);
  };
  
  regularImages.sort(sortByDNumber);
  hiresImages.sort(sortByDNumber);
  
  // Map regular images to objects with paths and metadata
  const imageObjects = regularImages.map(filename => {
    const filePath = path.join(centralImagesDir, filename);
    
    // Extract figure number from filename
    const dMatch = filename.match(/D0*(\d+)/i);
    const figureNum = dMatch ? parseInt(dMatch[1]) : null;
    
    // Look for matching high-res image
    let hiresPath = null;
    if (hiresImages.length > 0) {
      // Try to find by exact D number match
      const hiresMatch = hiresImages.find(hf => {
        const hfMatch = hf.match(/D0*(\d+)/i);
        return hfMatch && parseInt(hfMatch[1]) === figureNum;
      });
      
      if (hiresMatch) {
        hiresPath = path.join(hiresFolder, hiresMatch);
      }
    }
    
    return {
      filename,
      path: filePath,
      hiresPath,
      figureNum
    };
  });
  
  console.log(`Found ${imageObjects.length} matching images for ${patentId} in central directory`);
  if (hiresImages.length > 0) {
    console.log(`Found ${hiresImages.length} high-resolution images for ${patentId}`);
  }
  
  return imageObjects;
}

/**
 * Extract image URLs from the patent HTML
 * @param {CheerioAPI} $ - Cheerio API instance
 * @param {string} formattedId - Patent ID without hyphens
 * @param {string} supportingDir - Path to supporting files directory
 * @returns {Array<Object>} Array of image objects with path and filename
 */
function extractImageUrlsFromHtml($, formattedId, supportingDir) {
  const imageUrls = [];
  const srcMap = new Map(); // To avoid duplicate images
  
  // Find image-carousel images (thumbnails section)
  $('image-carousel .thumbnails img, .thumbnails img').each((i, el) => {
    const src = $(el).attr('src');
    if (src && !srcMap.has(src)) {
      srcMap.set(src, true);
      
      // Handle both absolute URLs and relative paths
      let filename;
      let fullPath;
      let originalUrl = null;
      
      if (src.startsWith('http')) {
        // Absolute URL from Google Patents
        originalUrl = src; // Save original URL for later reference
        const urlParts = src.split('/');
        filename = urlParts[urlParts.length - 1];
        fullPath = src; // Keep the full URL as the path
      } else {
        // Relative path (e.g., "US7271420B2_files/US07271420-20070918-D00000_002.png")
        // Extract just the filename part
        filename = path.basename(src);
        
        // If the source includes the _files directory, use it directly
        if (src.includes('_files')) {
          // The full path is relative to the collection directory
          fullPath = path.join(LOCAL_PATENT_DIR, src);
        } else {
          // Otherwise assume it's in the supporting directory
          fullPath = path.join(supportingDir, filename);
        }
      }
      
      // Extract figure number from filename
      const dMatch = filename.match(/D0*(\d+)/i);
      const figureNum = dMatch ? parseInt(dMatch[1]) : null;
      
      imageUrls.push({
        path: fullPath,
        filename,
        figureIndex: i,
        figureNum,
        originalUrl
      });
    }
  });
  
  // If no images found in image-carousel, try alternate selectors
  if (imageUrls.length === 0) {
    // Try any img tags with src containing the patent ID or D0000 pattern
    $('img').each((i, el) => {
      const src = $(el).attr('src');
      if (src && !srcMap.has(src) && (src.includes(formattedId) || src.includes('D0000'))) {
        srcMap.set(src, true);
        
        let filename;
        let fullPath;
        let originalUrl = null;
        
        if (src.startsWith('http')) {
          originalUrl = src;
          const urlParts = src.split('/');
          filename = urlParts[urlParts.length - 1];
          fullPath = src;
        } else {
          filename = path.basename(src);
          if (src.includes('_files')) {
            fullPath = path.join(LOCAL_PATENT_DIR, src);
          } else {
            fullPath = path.join(supportingDir, filename);
          }
        }
        
        // Extract figure number from filename
        const dMatch = filename.match(/D0*(\d+)/i);
        const figureNum = dMatch ? parseInt(dMatch[1]) : null;
        
        imageUrls.push({
          path: fullPath,
          filename,
          figureIndex: i,
          figureNum,
          originalUrl
        });
      }
    });
  }
  
  console.log(`Extracted ${imageUrls.length} image paths from HTML`);
  
  // Sort by D-number
  imageUrls.sort((a, b) => {
    if (a.figureNum !== null && b.figureNum !== null) {
      return a.figureNum - b.figureNum;
    }
    // Fall back to original order if no figureNum
    return a.figureIndex - b.figureIndex;
  });
  
  return imageUrls;
}

/**
 * Fetches patent information from Firefox-downloaded Google Patents page
 * @param {string} patentId - The patent ID in format US-XXXXXXXX-XX
 * @returns {Promise<Object>} Patent information including abstract and image paths
 */
async function fetchFirefoxPatentInfo(patentId) {
  try {
    console.log(`\nProcessing patent ${patentId}`);
    
    // Check central images directory first
    const centralImages = findPatentImagesInCentralDirectory(patentId);
    
    // Format the patent ID for the local file path
    const formattedId = patentId.replace(/-/g, '');
    
    // Firefox typically saves HTML file directly in the collection directory
    // with a supporting folder named "filename_files"
    const htmlPath = path.join(LOCAL_PATENT_DIR, `${formattedId}.html`);
    const supportingDir = path.join(LOCAL_PATENT_DIR, `${formattedId}_files`);
    
    console.log(`Reading patent info from: ${htmlPath}`);
    
    // Prepare variables for HTML content and images
    let abstract = '';
    let imageInfo = [];
    let htmlFileExists = false;
    
    // Check if HTML file exists
    if (fs.existsSync(htmlPath)) {
      htmlFileExists = true;
      
      // Read the HTML file
      const htmlContent = fs.readFileSync(htmlPath, 'utf8');
      
      // Parse the HTML
      const $ = cheerio.load(htmlContent);
      
      // Extract the abstract - updated selector to match the actual HTML structure
      // Try different selectors that might contain the abstract
      const abstractDiv = $('section#text abstract div.abstract');
      if (abstractDiv.length > 0) {
        abstract = abstractDiv.text().trim();
        console.log('Found abstract using section#text abstract div.abstract');
      } 
      // Try alternative selector as backup
      else {
        const altAbstractElem = $('abstract .abstract');
        if (altAbstractElem.length > 0) {
          abstract = altAbstractElem.text().trim();
          console.log('Found abstract using abstract .abstract');
        } 
        // Try another alternative
        else {
          const anyAbstractElem = $('.abstract');
          if (anyAbstractElem.length > 0) {
            abstract = anyAbstractElem.text().trim();
            console.log('Found abstract using .abstract');
          }
          // As a last resort, try the section with itemprop="abstract"
          else {
            const itempropAbstract = $('section[itemprop="abstract"]');
            if (itempropAbstract.length > 0) {
              abstract = itempropAbstract.text().trim();
              console.log('Found abstract using section[itemprop="abstract"]');
            } else {
              console.warn('Could not find abstract in HTML');
              abstract = `Abstract not found for ${patentId}`;
            }
          }
        }
      }
      
      // Extract image URLs from the HTML
      imageInfo = extractImageUrlsFromHtml($, formattedId, supportingDir);
      
      if (abstract && abstract.length > 0) {
        console.log(`Abstract (first 50 chars): ${abstract.substring(0, 50)}${abstract.length > 50 ? '...' : ''}`);
      }
    } else {
      console.log(`HTML file not found for ${patentId}`);
    }
    
    // Prepare final image paths and references
    let finalImagePaths = [];
    const originalUrls = [];
    
    // If we have central images, use those first
    if (centralImages.length > 0) {
      console.log(`Using ${centralImages.length} images from central directory for ${patentId}`);
      finalImagePaths = centralImages.map(img => img.path);
      
      // Store hi-res paths if available
      const hiResPaths = centralImages.filter(img => img.hiresPath).map(img => img.hiresPath);
      if (hiResPaths.length > 0) {
        console.log(`Found ${hiResPaths.length} hi-res images for ${patentId}`);
      }
    } 
    // If we have HTML images, verify and use them
    else if (htmlFileExists && imageInfo.length > 0) {
      // Filter to only existing paths
      const validHtmlPaths = imageInfo
        .filter(img => !img.path.startsWith('http') && fs.existsSync(img.path))
        .map(img => img.path);
      
      if (validHtmlPaths.length > 0) {
        console.log(`Found ${validHtmlPaths.length} valid image paths from HTML`);
        finalImagePaths = validHtmlPaths;
        
        // Extract original URLs for reference
        imageInfo.forEach(img => {
          if (img.originalUrl) {
            originalUrls.push(img.originalUrl);
          }
        });
      }
    }
    
    // If still no images, try to find images in supporting directory
    if (finalImagePaths.length === 0 && fs.existsSync(supportingDir)) {
      // Read all files in the supporting directory
      const allFiles = fs.readdirSync(supportingDir);
      
      // First, filter to just image files
      const imageFiles = allFiles.filter(file => 
        file.match(/\.(jpg|jpeg|png|gif)$/i) &&
        !file.includes('thumbnail') && // Exclude obvious thumbnails
        fs.statSync(path.join(supportingDir, file)).size > 10000 // Filter out tiny images (likely icons)
      );
      
      // Filter for files that contain D0000 pattern
      const dNumberFiles = imageFiles.filter(file => file.includes('D0000'));
      
      if (dNumberFiles.length > 0) {
        // Sort by D-number
        dNumberFiles.sort((a, b) => {
          const dNumberA = a.match(/D0*(\d+)/i);
          const dNumberB = b.match(/D0*(\d+)/i);
          
          if (dNumberA && dNumberB) {
            return parseInt(dNumberA[1]) - parseInt(dNumberB[1]);
          }
          return 0;
        });
        
        console.log(`Found ${dNumberFiles.length} image files with D0000 pattern`);
        finalImagePaths = dNumberFiles.map(file => path.join(supportingDir, file));
      } else {
        // If no D0000 files, sort by file size (descending)
        const sortedImageFiles = imageFiles.sort((a, b) => {
          const sizeA = fs.statSync(path.join(supportingDir, a)).size;
          const sizeB = fs.statSync(path.join(supportingDir, b)).size;
          return sizeB - sizeA; // Descending order (largest first)
        });
        
        // Check for image files that likely contain patent figures
        const figureCandidates = sortedImageFiles.filter(file => 
          file.toLowerCase().includes('figure') || 
          file.toLowerCase().includes('fig') || 
          file.toLowerCase().includes('image')
        );
        
        // If we found likely figure images, use those
        // Otherwise, use the largest images (which are probably the figures)
        const selectedImages = figureCandidates.length > 0 
          ? figureCandidates 
          : sortedImageFiles.slice(0, Math.min(5, sortedImageFiles.length));
        
        // Create paths to the selected image files
        finalImagePaths = selectedImages.map(file => path.join(supportingDir, file));
        
        console.log(`Found ${selectedImages.length} patent images out of ${imageFiles.length} total images in supporting dir`);
      }
    }
    
    return {
      id: patentId,
      abstract,
      imagePaths: finalImagePaths,
      imageInfo,
      centralImages,
      originalUrls
    };
  } catch (error) {
    console.error(`Error processing Firefox patent info for ${patentId}:`, error.message);
    return {
      id: patentId,
      abstract: `Error processing local file for ${patentId}: ${error.message}`,
      imagePaths: [],
      imageInfo: [],
      centralImages: [],
      originalUrls: []
    };
  }
}

/**
 * Copies patent images to public directory with support for high-res versions
 * @param {string} patentId - The patent ID
 * @param {Array<string>} imagePaths - Array of local image paths
 * @param {Array<Object>} imageInfo - Array of image info objects
 * @param {Array<Object>} centralImages - Array of central directory image objects
 * @returns {Promise<Object>} Object with public paths and high-res paths
 */
async function copyPatentImages(patentId, imagePaths, imageInfo, centralImages) {
  // Create directories for patent images
  const patentDir = path.join(__dirname, '../public/images/patents', patentId);
  const hiresDir = path.join(patentDir, 'hires');
  
  if (!fs.existsSync(patentDir)) {
    fs.mkdirSync(patentDir, { recursive: true });
  }
  
  if (!fs.existsSync(hiresDir)) {
    fs.mkdirSync(hiresDir, { recursive: true });
  }
  
  const publicPaths = [];
  const hiresPaths = [];
  // Use Sets to avoid adding duplicate paths
  const copiedFiles = new Set();
  const copiedHiresFiles = new Set();
  
  // Create a mapping of filenames to figure numbers based on imageInfo
  const filenameToFigMap = {};
  if (imageInfo && Array.isArray(imageInfo)) {
    imageInfo.forEach(img => {
      if (img.figureNum !== null) {
        filenameToFigMap[img.filename] = img.figureNum;
      } else {
        // Extract figure number from the original filename
        const match = img.filename.match(/D0*(\d+)/i);
        if (match) {
          const figNum = parseInt(match[1]);
          filenameToFigMap[img.filename] = figNum;
        }
      }
    });
  }
  
  // First, copy any high-res images from central directory
  if (centralImages && centralImages.length > 0) {
    for (let i = 0; i < centralImages.length; i++) {
      const imgObj = centralImages[i];
      if (imgObj.hiresPath && fs.existsSync(imgObj.hiresPath)) {
        const figNum = imgObj.figureNum || i;
        const hiresFilename = `fig${figNum}${path.extname(imgObj.hiresPath)}`;
        const destHiresPath = path.join(hiresDir, hiresFilename);
        const publicHiresPath = `/images/patents/${patentId}/hires/${hiresFilename}`;
        
        // Skip if already copied
        if (copiedHiresFiles.has(hiresFilename)) {
          continue;
        }
        
        try {
          console.log(`Copying hi-res image for ${patentId}: ${path.basename(imgObj.hiresPath)} -> ${hiresFilename}`);
          fs.copyFileSync(imgObj.hiresPath, destHiresPath);
          hiresPaths.push(publicHiresPath);
          copiedHiresFiles.add(hiresFilename);
        } catch (error) {
          console.error(`Error copying hi-res image for ${patentId}:`, error.message);
        }
      }
    }
  }
  
  // Now copy regular images
  for (let i = 0; i < imagePaths.length; i++) {
    try {
      const localPath = imagePaths[i];
      const filename = path.basename(localPath);
      let destFilename;
      
      // First try to use the figure number from imageInfo mapping
      if (filenameToFigMap[filename]) {
        destFilename = `fig${filenameToFigMap[filename]}${path.extname(filename)}`;
      } 
      // Otherwise extract from D number in filename
      else {
        const dMatch = filename.match(/D0*(\d+)/i);
        if (dMatch) {
          const figureNum = parseInt(dMatch[1]);
          destFilename = `fig${figureNum}${path.extname(filename)}`;
        } 
        // Fall back to sequential numbering
        else {
          destFilename = `fig${i + 1}${path.extname(filename)}`;
        }
      }
      
      const imagePath = path.join(patentDir, destFilename);
      const publicPath = `/images/patents/${patentId}/${destFilename}`;
      
      // Skip if this file has already been copied
      if (copiedFiles.has(destFilename)) {
        console.log(`Skipping duplicate image ${destFilename}`);
        continue;
      }
      
      console.log(`Copying image ${i + 1}/${imagePaths.length} for ${patentId}: ${filename} -> ${destFilename}`);
      
      // Copy the image
      fs.copyFileSync(localPath, imagePath);
      
      // Add to publicPaths and mark as copied
      publicPaths.push(publicPath);
      copiedFiles.add(destFilename);
    } catch (error) {
      console.error(`Error copying image for ${patentId}:`, error.message);
    }
  }
  
  return {
    regularPaths: publicPaths,
    hiresPaths
  };
}

/**
 * Process a list of patents using Firefox-downloaded files and central image directory
 * @param {Array<Object>} patents - Array of patent objects
 * @returns {Promise<Array<Object>>} Enhanced patent objects
 */
async function enhancePatentDataFromFirefox(patents) {
  const enhancedPatents = [];
  
  for (const patent of patents) {
    console.log(`\nEnhancing data for patent ${patent.id}`);
    
    try {
      // Fetch patent info from Firefox-downloaded files
      const patentInfo = await fetchFirefoxPatentInfo(patent.id);
      
      // Copy images to public directory
      let imagePaths = [];
      let hiresPaths = [];
      let originalUrls = patentInfo.originalUrls || [];
      
      if (patentInfo.imagePaths.length > 0) {
        const copyResult = await copyPatentImages(
          patent.id, 
          patentInfo.imagePaths, 
          patentInfo.imageInfo,
          patentInfo.centralImages
        );
        
        imagePaths = copyResult.regularPaths;
        hiresPaths = copyResult.hiresPaths;
        
        console.log(`Successfully copied ${imagePaths.length} regular images for ${patent.id}`);
        if (hiresPaths.length > 0) {
          console.log(`Successfully copied ${hiresPaths.length} high-resolution images for ${patent.id}`);
        }
      } else {
        console.log(`No images found for ${patent.id}, using placeholder`);
      }
      
      // If no images found or copied, use placeholder
      if (imagePaths.length === 0 && patent.imagePages > 0) {
        // Use placeholder for images
        imagePaths = Array(Math.min(patent.imagePages, 5))
          .fill()
          .map((_, i) => `/images/patents/placeholder.svg`);
      }
      
      // Enhance the patent object
      enhancedPatents.push({
        ...patent,
        abstract: patentInfo.abstract,
        images: imagePaths,
        hiresImages: hiresPaths.length > 0 ? hiresPaths : undefined,
        originalUrls: originalUrls.length > 0 ? originalUrls : undefined
      });
      
    } catch (error) {
      console.error(`Error enhancing patent ${patent.id}:`, error.message);
      enhancedPatents.push({
        ...patent,
        abstract: `Failed to process Firefox download for ${patent.id}: ${error.message}`,
        images: [`/images/patents/placeholder.svg`]
      });
    }
  }
  
  return enhancedPatents;
}

// Export the functions
export default {
  fetchFirefoxPatentInfo,
  copyPatentImages,
  enhancePatentDataFromFirefox,
  findPatentImagesInCentralDirectory,
  LOCAL_PATENT_DIR
};

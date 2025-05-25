// index.js
// Main entry point for patent processing functionality

import { ImageProcessor } from './ImageProcessor.js';
import { MetadataExtractor } from './MetadataExtractor.js';
import { FileSystemHelper } from './FileSystemHelper.js';
import { getValidatedConfig } from './config.js';
import { Logger, ProcessingError } from './utils.js';

// Get validated configuration
const config = getValidatedConfig();
const logger = new Logger(false, 'PatentProcessing');

/**
 * Extract abstract from HTML file (maintained for backward compatibility)
 * @param {string} patentId - Patent ID with hyphens
 * @returns {Promise<string>} Abstract text
 */
export async function extractAbstract(patentId) {
  try {
    const metadataExtractor = new MetadataExtractor(config);
    const details = await metadataExtractor.extractPatentDetails(patentId);
    return details.abstract;
  } catch (error) {
    logger.error(`Failed to extract abstract for ${patentId}`, error);
    throw new ProcessingError(`Failed to extract abstract`, patentId, error);
  }
}

/**
 * Extract patent details including abstract, inventors, and assignee
 * @param {string} patentId - Patent ID with hyphens
 * @returns {Promise<Object>} Object containing abstract, inventors, and assignee
 */
export async function extractPatentDetails(patentId) {
  try {
    const metadataExtractor = new MetadataExtractor(config);
    return await metadataExtractor.extractPatentDetails(patentId);
  } catch (error) {
    logger.error(`Failed to extract patent details for ${patentId}`, error);
    throw new ProcessingError(`Failed to extract patent details`, patentId, error);
  }
}

/**
 * Process all patent images with enhanced analysis
 * @param {string} patentId - Patent ID with hyphens (e.g., US-12270996-B2)
 * @returns {Promise<Array<Object>>} Array of image objects with thumbnail and hires properties
 */
export async function processPatentImagesEnhanced(patentId) {
  try {
    const imageProcessor = new ImageProcessor(config);
    return await imageProcessor.processPatentImages(patentId);
  } catch (error) {
    logger.error(`Failed to process images for ${patentId}`, error);
    
    // Return placeholder instead of throwing to prevent pipeline failure
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
export async function enhancePatentsWithImages(patents) {
  if (!Array.isArray(patents)) {
    throw new ProcessingError('Patents must be an array');
  }
  
  const imageProcessor = new ImageProcessor(config);
  const metadataExtractor = new MetadataExtractor(config);
  const enhancedPatents = [];
  
  logger.info(`Starting enhancement of ${patents.length} patents`);
  
  for (const patent of patents) {
    logger.debug(`Enhancing patent ${patent.id}`);
    
    try {
      // Process patent images
      const images = await imageProcessor.processPatentImages(patent.id);
      
      // Fetch patent details
      const details = await metadataExtractor.extractPatentDetails(patent.id);
      
      // Add enhanced data to patent
      enhancedPatents.push({
        ...patent,
        abstract: details.abstract,
        inventors: details.inventors,
        assignee: details.assignee,
        images: images,
        featured: patent.id === 'US-10794647-B2', // Example featured patent
        lastProcessed: new Date().toISOString()
      });
      
    } catch (error) {
      logger.error(`Error enhancing patent ${patent.id}`, error);
      
      // Add patent with error information instead of failing completely
      enhancedPatents.push({
        ...patent,
        abstract: `Error processing patent ${patent.id}: ${error.message}`,
        inventors: [],
        assignee: `Error processing patent ${patent.id}: ${error.message}`,
        images: [{
          thumbnail: `/images/patents/placeholder.svg`,
          hires: `/images/patents/placeholder.svg`,
          caption: 'No image available'
        }],
        processingError: true,
        lastProcessed: new Date().toISOString()
      });
    }
  }
  
  logger.success(`Enhanced ${enhancedPatents.length} patents`);
  return enhancedPatents;
}

// Export the ImageAnalyzer as a class for backward compatibility
export class ImageAnalyzer {
  static async getImageMetadata(imagePath) {
    try {
      const imageProcessor = new ImageProcessor(config);
      return await imageProcessor.getImageMetadata(imagePath);
    } catch (error) {
      logger.error(`Failed to get image metadata for ${imagePath}`, error);
      throw new ProcessingError(`Failed to get image metadata`, null, error);
    }
  }
  
  static extractFigureNumber(filename) {
    const imageProcessor = new ImageProcessor(config);
    return imageProcessor.extractFigureNumber(filename);
  }
  
  static isHighResolution(imageMetadata, otherImages = []) {
    const imageProcessor = new ImageProcessor(config);
    return imageProcessor.isHighResolution(imageMetadata, otherImages);
  }
}

// Export default object for backward compatibility
export default {
  processPatentImagesEnhanced,
  enhancePatentsWithImages,
  ImageAnalyzer,
  extractAbstract,
  extractPatentDetails
};

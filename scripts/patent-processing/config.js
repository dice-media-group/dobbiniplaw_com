// config.js
// Configuration settings for patent processing

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const config = {
  LOCAL_PATENT_DIR: process.env.PATENT_COLLECTION_DIR || '/Users/carltanner/Documents/projects/2025_04_08__dobbiniplaw_com/patent_collection',
  CENTRAL_IMAGES_DIR: null, // Will be set below
  PUBLIC_PATENTS_DIR: path.join(__dirname, '../../public/images/patents'),
  
  // Performance settings
  supportedImageFormats: ['.png'], // Focus on PNG for performance
  maxBatchSize: 50,
  minBatchSize: 1,
  defaultBatchSize: 3
};

// Set dependent paths
config.CENTRAL_IMAGES_DIR = path.join(config.LOCAL_PATENT_DIR, 'images');

/**
 * Validate configuration and ensure required directories exist
 * @param {Object} configToValidate - Configuration object to validate
 * @throws {Error} If configuration is invalid or directories don't exist
 * @returns {boolean} True if valid
 */
export function validateConfig(configToValidate = config) {
  const required = ['LOCAL_PATENT_DIR', 'CENTRAL_IMAGES_DIR', 'PUBLIC_PATENTS_DIR'];
  
  // Check required configuration keys
  for (const key of required) {
    if (!configToValidate[key]) {
      throw new Error(`Missing required configuration: ${key}`);
    }
  }
  
  // Check if LOCAL_PATENT_DIR exists (this is critical)
  if (!fs.existsSync(configToValidate.LOCAL_PATENT_DIR)) {
    throw new Error(`Patent directory does not exist: ${configToValidate.LOCAL_PATENT_DIR}`);
  }
  
  // Warn if CENTRAL_IMAGES_DIR doesn't exist but don't fail (it might be optional)
  if (!fs.existsSync(configToValidate.CENTRAL_IMAGES_DIR)) {
    console.warn(`⚠️  Central images directory does not exist: ${configToValidate.CENTRAL_IMAGES_DIR}`);
    console.warn('   This may be normal if no central images are available.');
  }
  
  // Ensure PUBLIC_PATENTS_DIR can be created
  try {
    if (!fs.existsSync(configToValidate.PUBLIC_PATENTS_DIR)) {
      fs.mkdirSync(configToValidate.PUBLIC_PATENTS_DIR, { recursive: true });
      console.log(`✅ Created public patents directory: ${configToValidate.PUBLIC_PATENTS_DIR}`);
    }
  } catch (error) {
    throw new Error(`Cannot create or access public patents directory: ${configToValidate.PUBLIC_PATENTS_DIR} - ${error.message}`);
  }
  
  console.log('✅ Configuration validation passed');
  return true;
}

/**
 * Get validated configuration
 * @returns {Object} Validated configuration object
 */
export function getValidatedConfig() {
  validateConfig(config);
  return config;
}

export default config;

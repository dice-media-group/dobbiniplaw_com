// enhancedImageProcessor.js
// This file is now a simple wrapper that imports from the modularized code
// Maintained for backward compatibility

import {
  processPatentImagesEnhanced,
  enhancePatentsWithImages,
  ImageAnalyzer,
  extractAbstract,
  extractPatentDetails
} from './patent-processing/index.js';

// Export all functions and classes from the modular implementation
export default {
  processPatentImagesEnhanced,
  enhancePatentsWithImages,
  ImageAnalyzer,
  extractAbstract,
  extractPatentDetails
};

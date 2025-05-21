// processPatents.js
// This file is now a simple wrapper that imports from the modularized code
// Maintained for backward compatibility

import {
  processTrophyWall,
  parsePatentsList,
  categorizePatents,
  categorizePatentsIntoSubcategories,
  savePatentData,
  cleanPatent
} from './patent-categorization/index.js';

// Export all functions from the modular implementation
export default {
  processTrophyWall,
  parsePatentsList,
  categorizePatents,
  categorizePatentsIntoSubcategories,
  savePatentData,
  cleanPatent
};

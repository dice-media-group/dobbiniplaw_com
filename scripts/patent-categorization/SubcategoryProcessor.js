// SubcategoryProcessor.js
// Processes patents into subcategories

export class SubcategoryProcessor {
  /**
   * Categorize patents into subcategories based on keywords
   * @param {Object} categorizedPatents - Object with patents already grouped by main category
   * @param {Object} subcategories - Object with subcategory definitions
   * @returns {Object} Object with patents categorized by subcategories within main categories
   */
  categorizePatentsIntoSubcategories(categorizedPatents, subcategories) {
    const result = {};
    
    // For each main category
    for (const [categoryId, patents] of Object.entries(categorizedPatents)) {
      result[categoryId] = {
        subcategories: {},
        patents: [] // Keep all patents at the main category level too
      };
      
      // Create subcategory containers
      if (subcategories[categoryId]) {
        subcategories[categoryId].forEach(sub => {
          result[categoryId].subcategories[sub.id] = [];
        });
      }
      
      // Add patents to corresponding subcategories
      for (const patent of patents) {
        // Add to main category list
        result[categoryId].patents.push(patent);
        
        // Find matching subcategories
        if (subcategories[categoryId]) {
          let matched = false;
          const lowerTitle = patent.title.toLowerCase();
          
          for (const subcategory of subcategories[categoryId]) {
            for (const keyword of subcategory.keywords) {
              if (lowerTitle.includes(keyword.toLowerCase())) {
                // Add to subcategory
                result[categoryId].subcategories[subcategory.id].push(patent);
                matched = true;
                break;
              }
            }
            
            if (matched) break;
          }
          
          // If no match, add to the first subcategory (or 'misc' for 'other' category)
          if (!matched) {
            const firstSubId = categoryId === 'other' ? 'misc' : subcategories[categoryId][0].id;
            result[categoryId].subcategories[firstSubId].push(patent);
          }
        }
      }
    }
    
    return result;
  }

  /**
   * Load subcategory definitions from file
   * @param {string} outputDir - Directory containing subcategories.json
   * @returns {Promise<Object>} Object with subcategory definitions
   */
  async loadSubcategoryDefinitions(outputDir) {
    try {
      const fs = await import('fs');
      const path = await import('path');
      
      const subcatPath = path.join(outputDir, 'subcategories.json');
      if (fs.existsSync(subcatPath)) {
        const subcatContent = fs.readFileSync(subcatPath, 'utf8');
        return JSON.parse(subcatContent).subcategories;
      } else {
        // If subcategories.json doesn't exist yet, return empty object
        console.log('No subcategories.json found, skipping subcategorization');
        return {};
      }
    } catch (error) {
      console.error('Error loading subcategories:', error);
      return {};
    }
  }
}

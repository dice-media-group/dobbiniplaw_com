// FileHandler.js
// Handles file operations for patent categorization

import fs from 'fs';
import path from 'path';
import { categoryMetadata } from './categoryConfig.js';
import { PatentCategorizer } from './PatentCategorizer.js';

export class FileHandler {
  constructor() {
    this.patentCategorizer = new PatentCategorizer();
  }

  /**
   * Ensure the output directory exists
   * @param {string} outputDir - Directory path
   * @returns {Promise<void>}
   */
  async ensureDirectoryExists(outputDir) {
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
  }

  /**
   * Save categorized patent data to JSON files
   * @param {Object} categorizedPatents - Object with patents categorized by main category
   * @param {Object} subcategorizedPatents - Object with patents categorized by subcategories
   * @param {string} outputDir - Directory to save JSON files
   * @returns {Promise<void>}
   */
  async savePatentData(categorizedPatents, subcategorizedPatents, outputDir) {
    // Ensure the output directory exists
    await this.ensureDirectoryExists(outputDir);
    
    // Create categories.json with proper structure
    const categories = Object.keys(categorizedPatents)
      .filter(category => categorizedPatents[category].length > 0)
      .map((category, index) => ({
        id: category,
        name: category.charAt(0).toUpperCase() + category.slice(1) + 
              (category !== 'other' ? categoryMetadata[category] : ''),
        description: `Patents related to ${category === 'other' ? 'various fields' : category}`,
        featured: index < 3, // First 3 categories are featured
        order: index + 1,
        patentCount: categorizedPatents[category].length
      }));
      
    fs.writeFileSync(
      path.join(outputDir, 'categories.json'),
      JSON.stringify({ categories }, null, 2)
    );
    
    console.log(`Created categories.json with ${categories.length} categories`);
    
    // Create a JSON file for each category
    await this.saveCategoryFiles(categorizedPatents, subcategorizedPatents, outputDir);
    
    // Create all-patents.json with patents from all categories
    await this.saveAllPatentsFile(categorizedPatents, outputDir);
  }

  /**
   * Save individual category files
   * @param {Object} categorizedPatents - Object with patents categorized by main category
   * @param {Object} subcategorizedPatents - Object with patents categorized by subcategories
   * @param {string} outputDir - Directory to save JSON files
   * @returns {Promise<void>}
   */
  async saveCategoryFiles(categorizedPatents, subcategorizedPatents, outputDir) {
    for (const [category, patents] of Object.entries(categorizedPatents)) {
      if (patents.length === 0) continue;
      
      // Sort patents by publication date (newest first)
      const sortedPatents = this.patentCategorizer.sortPatentsByDate(patents);
      
      // Prepare subcategories data if available
      let subcategoriesData = null;
      if (subcategorizedPatents && subcategorizedPatents[category]) {
        subcategoriesData = this.prepareSubcategoryData(subcategorizedPatents[category]);
      }
      
      const categoryData = {
        categoryId: category,
        patents: sortedPatents.map(p => this.patentCategorizer.cleanPatent(p))
      };
      
      // Add subcategories if available
      if (subcategoriesData && Object.keys(subcategoriesData).length > 0) {
        categoryData.subcategories = subcategoriesData;
      }
      
      // Mark first (newest) patent as featured
      if (categoryData.patents.length > 0) {
        categoryData.patents[0].featured = true;
      }
      
      fs.writeFileSync(
        path.join(outputDir, `${category}.json`),
        JSON.stringify(categoryData, null, 2)
      );
      
      console.log(`Created ${category}.json with ${patents.length} patents` + 
        (subcategoriesData ? ` and ${Object.keys(subcategoriesData).length} subcategories` : ''));
    }
  }

  /**
   * Prepare subcategory data for JSON output
   * @param {Object} categorySubcategories - Object with subcategories for a category
   * @returns {Object} Prepared subcategory data
   */
  prepareSubcategoryData(categorySubcategories) {
    const subcategoriesData = {};
    
    // Transform subcategory objects to arrays with metadata
    for (const [subId, subPatents] of Object.entries(categorySubcategories.subcategories)) {
      // Find subcategory definition
      if (subPatents.length > 0) {
        subcategoriesData[subId] = {
          id: subId,
          name: subId.charAt(0).toUpperCase() + subId.slice(1).replace(/-/g, ' '),
          patentCount: subPatents.length,
          patents: subPatents.map(p => this.patentCategorizer.cleanPatent(p))
        };
      }
    }
    
    return subcategoriesData;
  }

  /**
   * Save all patents to a single file
   * @param {Object} categorizedPatents - Object with patents categorized by main category
   * @param {string} outputDir - Directory to save JSON files
   * @returns {Promise<void>}
   */
  async saveAllPatentsFile(categorizedPatents, outputDir) {
    const allPatents = [];
    
    // Use a Set to track patent IDs we've already added to avoid duplicates
    const addedPatentIds = new Set();
    
    // Flatten patents from all categories, ensuring no duplicates
    Object.values(categorizedPatents).forEach(categoryPatents => {
      categoryPatents.forEach(patent => {
        if (!addedPatentIds.has(patent.id)) {
          allPatents.push(this.patentCategorizer.cleanPatent(patent));
          addedPatentIds.add(patent.id);
        }
      });
    });
    
    // Sort patents by publication date (newest first)
    const sortedPatents = this.patentCategorizer.sortPatentsByDate(allPatents);
    
    fs.writeFileSync(
      path.join(outputDir, 'all-patents.json'),
      JSON.stringify({ patents: sortedPatents }, null, 2)
    );
    
    console.log(`Created all-patents.json with ${allPatents.length} patents`);
  }

  /**
   * Save enhanced patents directly to all-patents.json
   * @param {Array} enhancedPatents - Array of enhanced patent objects
   * @param {string} outputDir - Directory to save JSON file
   * @returns {Promise<void>}
   */
  async saveEnhancedPatents(enhancedPatents, outputDir) {
    await this.ensureDirectoryExists(outputDir);
    
    const cleanedPatents = enhancedPatents.map(p => this.patentCategorizer.cleanPatent(p));
    
    fs.writeFileSync(
      path.join(outputDir, 'all-patents.json'),
      JSON.stringify({ patents: cleanedPatents }, null, 2)
    );
    
    console.log(`Saved ${enhancedPatents.length} enhanced patents to all-patents.json`);
  }
}

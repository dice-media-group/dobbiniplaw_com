// update-subcategories.js
// Script to update category JSON files with subcategory data

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Categorize patents into subcategories based on keywords
 * @param {Array} patents - Array of patents to categorize
 * @param {Array} subcategoryDefs - Array of subcategory definitions
 * @returns {Object} Object with patents categorized into subcategories
 */
function categorizeIntoSubcategories(patents, subcategoryDefs) {
  // Initialize subcategories
  const subcategoriesMap = {};
  subcategoryDefs.forEach(sub => {
    subcategoriesMap[sub.id] = {
      id: sub.id,
      name: sub.name,
      patentCount: 0,
      patents: []
    };
  });

  // Categorize each patent
  for (const patent of patents) {
    let matched = false;
    const lowerTitle = patent.title.toLowerCase();
    
    // Check each subcategory
    for (const subcategory of subcategoryDefs) {
      for (const keyword of subcategory.keywords) {
        if (lowerTitle.includes(keyword.toLowerCase())) {
          subcategoriesMap[subcategory.id].patents.push(patent);
          subcategoriesMap[subcategory.id].patentCount++;
          matched = true;
          break;
        }
      }
      
      if (matched) break;
    }
    
    // If no match, add to the first subcategory
    if (!matched && subcategoryDefs.length > 0) {
      const firstSubId = subcategoryDefs[0].id;
      subcategoriesMap[firstSubId].patents.push(patent);
      subcategoriesMap[firstSubId].patentCount++;
    }
  }
  
  return subcategoriesMap;
}

/**
 * Update category JSON files with subcategory data
 */
async function updateCategoriesWithSubcategories() {
  try {
    console.log('Starting subcategory update process...');
    
    const patentsDir = path.join(__dirname, '../content/patents');
    
    // Load subcategories.json
    const subcategoriesPath = path.join(patentsDir, 'subcategories.json');
    if (!fs.existsSync(subcategoriesPath)) {
      console.error('subcategories.json not found. Please create this file first.');
      return;
    }
    
    const subcategoriesData = JSON.parse(fs.readFileSync(subcategoriesPath, 'utf8'));
    const subcategories = subcategoriesData.subcategories;
    
    if (!subcategories) {
      console.error('Invalid subcategories.json format. Expected "subcategories" property.');
      return;
    }
    
    // Load categories.json
    const categoriesPath = path.join(patentsDir, 'categories.json');
    const categoriesData = JSON.parse(fs.readFileSync(categoriesPath, 'utf8'));
    const categories = categoriesData.categories;
    
    // Process each category
    for (const category of categories) {
      const categoryId = category.id;
      const categoryPath = path.join(patentsDir, `${categoryId}.json`);
      
      if (!fs.existsSync(categoryPath)) {
        console.log(`Skipping ${categoryId}.json: File not found`);
        continue;
      }
      
      // Skip if this category doesn't have subcategories defined
      if (!subcategories[categoryId]) {
        console.log(`Skipping ${categoryId}.json: No subcategories defined`);
        continue;
      }
      
      // Load category data
      const categoryData = JSON.parse(fs.readFileSync(categoryPath, 'utf8'));
      const patents = categoryData.patents;
      
      // Categorize patents into subcategories
      const subcategoriesMap = categorizeIntoSubcategories(patents, subcategories[categoryId]);
      
      // Update category data with subcategories
      categoryData.subcategories = subcategoriesMap;
      
      // Write updated category data
      fs.writeFileSync(categoryPath, JSON.stringify(categoryData, null, 2));
      
      console.log(`Updated ${categoryId}.json with ${Object.keys(subcategoriesMap).length} subcategories`);
    }
    
    console.log('Subcategory update process complete!');
  } catch (error) {
    console.error('Error updating subcategories:', error);
  }
}

// Run the update process
updateCategoriesWithSubcategories()
  .then(() => console.log('Process complete!'))
  .catch(error => {
    console.error('Error during processing:', error);
    process.exit(1);
  });

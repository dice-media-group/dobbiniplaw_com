// index.js
// Main entry point for patent categorization

import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { PatentParser } from './PatentParser.js';
import { PatentCategorizer } from './PatentCategorizer.js';
import { SubcategoryProcessor } from './SubcategoryProcessor.js';
import { FileHandler } from './FileHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create instances of all classes
const patentParser = new PatentParser();
const patentCategorizer = new PatentCategorizer();
const subcategoryProcessor = new SubcategoryProcessor();
const fileHandler = new FileHandler();

/**
 * Categorize patents based on keywords in title
 * @param {Array} patents - Array of patent objects
 * @returns {Object} Object with patents categorized by main category
 */
export function categorizePatents(patents) {
  return patentCategorizer.categorizePatents(patents);
}

/**
 * Categorize patents into subcategories based on keywords
 * @param {Object} categorizedPatents - Object with patents already grouped by main category
 * @param {Object} subcategories - Object with subcategory definitions
 * @returns {Object} Object with patents categorized by subcategories within main categories
 */
export function categorizePatentsIntoSubcategories(categorizedPatents, subcategories) {
  return subcategoryProcessor.categorizePatentsIntoSubcategories(categorizedPatents, subcategories);
}

/**
 * Save categorized patent data to JSON files
 * @param {Object} categorizedPatents - Object with patents categorized by main category
 * @returns {Promise<void>}
 */
export async function savePatentData(categorizedPatents) {
  const outputDir = path.join(__dirname, '../../content/patents');
  
  // Load subcategories
  const subcategoryDefs = await subcategoryProcessor.loadSubcategoryDefinitions(outputDir);
  
  // Process subcategories if definitions exist
  let subcategorizedPatents = {};
  if (Object.keys(subcategoryDefs).length > 0) {
    subcategorizedPatents = subcategoryProcessor.categorizePatentsIntoSubcategories(
      categorizedPatents, 
      subcategoryDefs
    );
  }
  
  // Save patent data to JSON files
  await fileHandler.savePatentData(categorizedPatents, subcategorizedPatents, outputDir);
}

/**
 * Parse patent list from the extracted text
 * @param {string} text - Extracted text from PDF
 * @returns {Array} Array of patent objects
 */
export function parsePatentsList(text) {
  return patentParser.parsePatentsList(text);
}

/**
 * Clean patent object for JSON output
 * @param {Object} patent - Patent object
 * @returns {Object} Cleaned patent object
 */
export function cleanPatent(patent) {
  return patentCategorizer.cleanPatent(patent);
}

/**
 * Main function to process TrophyWall
 * @returns {Promise<void>}
 */
export async function processTrophyWall() {
  try {
    // Generate sample text file for testing
    const outputDir = path.join(__dirname, '../..');
    const samplePath = await patentParser.generateTrophyWallTextSample(outputDir);
    
    // Read the PDF file (using text file for now)
    const textContent = fs.readFileSync(samplePath, 'utf8');
    
    // Process the text content
    const patents = patentParser.parsePatentsList(textContent);
    console.log(`Parsed ${patents.length} patents from TrophyWall`);
    
    // Categorize patents
    const categorizedPatents = patentCategorizer.categorizePatents(patents);
    console.log('Categorized patents:');
    Object.entries(categorizedPatents).forEach(([category, patents]) => {
      console.log(`- ${category}: ${patents.length} patents`);
    });
    
    // Save to JSON files
    await savePatentData(categorizedPatents);
    
    console.log('Patent processing complete!');
  } catch (error) {
    console.error('Error processing TrophyWall:', error);
  }
}

// Export default object for backward compatibility
export default {
  processTrophyWall,
  parsePatentsList,
  categorizePatents,
  categorizePatentsIntoSubcategories,
  savePatentData,
  cleanPatent
};

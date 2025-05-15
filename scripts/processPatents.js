const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');
const axios = require('axios');
const cheerio = require('cheerio');

// Patent categorization keywords
const categories = {
  firearms: ['firearm', 'gun', 'rifle', 'ammunition', 'barrel', 'sight', 'trigger', 'revolver', 'sling', 'stock', 'handgrip', 'shotgun', 'pistol', 'gunstock', 'magazine'],
  medical: ['medical', 'dental', 'suction', 'gel', 'massage', 'disinfection', 'uv', 'peroxide', 'expandable', 'massage', 'bleaching', 'operatory', 'endodontic'],
  electronics: ['electronic', 'LED', 'semiconductor', 'circuit', 'light', 'loupe', 'sensor', 'emission', 'diode', 'digital', 'frequency', 'tracking', 'lighting'],
  manufacturing: ['apparatus', 'device', 'system', 'machine', 'assembly', 'manufacturing', 'method', 'process'],
  tools: ['tool', 'handle', 'measuring', 'bending', 'clip', 'adjustable', 'positionable', 'adapter', 'customizable'],
  other: []
};

/**
 * Process the TrophyWall PDF to extract patent information
 */
async function processTrophyWall() {
  try {
    // Read the PDF file
    const pdfPath = path.join(__dirname, '../source examples/TrophyWall.pdf');
    const dataBuffer = fs.readFileSync(pdfPath);
    const data = await pdf(dataBuffer);
    
    // Process the text content
    const patents = parsePatentsList(data.text);
    
    // Categorize patents
    const categorizedPatents = categorizePatents(patents);
    
    // Save to JSON files
    savePatentData(categorizedPatents);
    
    console.log(`Processed ${patents.length} patents into ${Object.keys(categorizedPatents).length} categories`);
  } catch (error) {
    console.error('Error processing TrophyWall PDF:', error);
  }
}

/**
 * Parse the text content from the PDF to extract patent information
 * @param {string} text - Text content from the PDF
 * @returns {Array} List of parsed patents
 */
function parsePatentsList(text) {
  const patents = [];
  const lines = text.split('\n');

  let currentPatent = null;
  
  for (const line of lines) {
    // Check if this line contains a patent ID
    const patentIdMatch = line.match(/^(\d+)\s+(US-[\d]+-[A-Z]\d)\s+(\d{4}-\d{2}-\d{2})\s+(.+?)\s+(\d+)$/);
    
    if (patentIdMatch) {
      const [_, index, docId, date, title, imagePages] = patentIdMatch;
      
      currentPatent = {
        index: parseInt(index),
        id: docId,
        publicationDate: date,
        title: title.trim(),
        imagePages: parseInt(imagePages)
      };
      
      patents.push(currentPatent);
    } else if (currentPatent && line.trim() && !line.match(/^[\d\/]+\s+[\d:]+\s+[AP]M$/)) {
      // This might be a continuation of the title from the previous line
      // Avoid page numbers and timestamps
      currentPatent.title += ' ' + line.trim();
    }
  }

  return patents;
}

/**
 * Categorize patents based on keywords in their titles
 * @param {Array} patents - List of patents
 * @returns {Object} Patents organized by category
 */
function categorizePatents(patents) {
  const categorized = Object.keys(categories).reduce((acc, category) => {
    acc[category] = [];
    return acc;
  }, {});
  
  for (const patent of patents) {
    let assigned = false;
    const lowerTitle = patent.title.toLowerCase();
    
    // Check each category's keywords
    for (const [category, keywords] of Object.entries(categories)) {
      if (category === 'other') continue;
      
      for (const keyword of keywords) {
        if (lowerTitle.includes(keyword.toLowerCase())) {
          categorized[category].push(patent);
          assigned = true;
          break;
        }
      }
      
      if (assigned) break;
    }
    
    // If not assigned to any category, put in 'other'
    if (!assigned) {
      categorized.other.push(patent);
    }
  }
  
  return categorized;
}

/**
 * Save categorized patent data to JSON files
 * @param {Object} categorizedPatents - Patents organized by category
 */
function savePatentData(categorizedPatents) {
  // Create directory if it doesn't exist
  const outputDir = path.join(__dirname, '../content/patents');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Create categories.json
  const categories = Object.keys(categorizedPatents)
    .filter(category => categorizedPatents[category].length > 0)
    .map((category, index) => ({
      id: category,
      name: category.charAt(0).toUpperCase() + category.slice(1),
      description: `Patents related to ${category}`,
      featured: index < 3, // First 3 categories are featured
      order: index + 1,
      patentCount: categorizedPatents[category].length
    }));
    
  fs.writeFileSync(
    path.join(outputDir, 'categories.json'),
    JSON.stringify({ categories }, null, 2)
  );
  
  // Create a JSON file for each category
  for (const [category, patents] of Object.entries(categorizedPatents)) {
    if (patents.length === 0) continue;
    
    const categoryData = {
      categoryId: category,
      patents: patents.map(patent => ({
        ...patent,
        abstract: "To be fetched from Google Patents",
        featured: false,
        images: [`/images/patents/${patent.id}/fig1.jpg`]
      }))
    };
    
    // Mark first patent as featured
    if (categoryData.patents.length > 0) {
      categoryData.patents[0].featured = true;
    }
    
    fs.writeFileSync(
      path.join(outputDir, `${category}.json`),
      JSON.stringify(categoryData, null, 2)
    );
  }
}

// Run the process
processTrophyWall();

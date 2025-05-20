// processPatents.js
// Script to extract and parse patent data from TrophyWall.pdf

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Patent categorization keywords with expanded lists based on TrophyWall.pdf content
const categories = {
  firearms: [
    'firearm', 'gun', 'rifle', 'ammunition', 'barrel', 'sight', 'trigger', 'revolver', 'sling', 'stock', 
    'handgrip', 'shotgun', 'pistol', 'gunstock', 'magazine', 'bolt', 'tang', 'louver', 'charging', 
    'follower', 'foldable', 'fore grip', 'hand guard', 'butt pad', 'reticule', 'rimmed', 'round', 
    'concealable', 'gun chassis', 'fire arm', 'bullpup', 'recoil', 'caliber', 'linkage', 'rear sight',
    'front sight', 'bayonet', 'armament', 'launcher'
  ],
  medical: [
    'medical', 'dental', 'suction', 'gel', 'massage', 'disinfection', 'uv', 'peroxide', 'expandable',
    'bleaching', 'operatory', 'endodontic', 'oral', 'surgeon', 'therapeutic', 'physician', 'patient',
    'treatment', 'healthcare', 'diagnostic', 'therapy', 'clinical', 'healing', 'recovery', 'procedure',
    'hygiene', 'sanitization', 'alcohol', 'sterilize', 'clean', 'dilation', 'anatomy', 'dental bleaching'
  ],
  electronics: [
    'electronic', 'LED', 'semiconductor', 'circuit', 'light', 'loupe', 'sensor', 'emission', 'diode', 
    'digital', 'frequency', 'tracking', 'lighting', 'audio', 'parameter', 'cognitive', 'intelligence',
    'artificial intelligence', 'AI', 'computer', 'processor', 'memory', 'storage', 'capacitor', 'resistor',
    'chip', 'motherboard', 'display', 'screen', 'device', 'output', 'input', 'IoT', 'amplifier',
    'oscillator', 'photonic', 'nano', 'transistor', 'microchip', 'carrier profiling', 'microscopy'
  ],
  manufacturing: [
    'apparatus', 'device', 'system', 'machine', 'assembly', 'manufacturing', 'method', 'process',
    'production', 'industrial', 'factory', 'automation', 'fabrication', 'construction', 'composite',
    'material', 'polymer', 'metal', 'extrusion', 'casting', 'molding', 'forming', 'cutting', 'stamping',
    'welding', 'binding', 'polyvinyl', 'chloride', 'wood-plastic', 'siding', 'building', 'framing',
    'steel', 'asphalt', 'mix', 'recycle', 'pvc', 'concrete', 'structural', 'engineering', 'plant'
  ],
  tools: [
    'tool', 'handle', 'measuring', 'bending', 'clip', 'adjustable', 'positionable', 'adapter', 
    'customizable', 'wrench', 'screwdriver', 'hammer', 'cutting', 'clamp', 'holder', 'gripper',
    'vise', 'guide', 'template', 'pattern', 'gauge', 'calibration', 'positioning', 'alignment',
    'fixture', 'jig', 'work light', 'rack', 'ladder', 'storage', 'bin', 'organizer', 'equipment',
    'hoist', 'lift', 'jack', 'roller', 'slider', 'fastener', 'snap', 'skate', 'blade', 'dispenser'
  ],
  sports: [
    'sport', 'athletic', 'exercise', 'fitness', 'game', 'training', 'workout', 'gym', 'skate',
    'snowboard', 'ski', 'bike', 'bicycle', 'weight', 'resistance', 'aerobic', 'cardio', 'strength',
    'conditioning', 'ball', 'racket', 'paddle', 'stick', 'martial', 'boxing', 'golf', 'tennis',
    'running', 'swimming', 'diving', 'climbing', 'hiking', 'camping', 'outdoor', 'recreation'
  ],
  household: [
    'home', 'house', 'kitchen', 'bathroom', 'bedroom', 'furniture', 'appliance', 'decor', 'fixture',
    'lighting', 'heating', 'cooling', 'ventilation', 'hvac', 'plumbing', 'electrical', 'storage',
    'organization', 'cleaning', 'maintenance', 'repair', 'improvement', 'renovation', 'construction',
    'security', 'safety', 'lock', 'alarm', 'sensor', 'detector', 'monitor', 'camera', 'doorbell'
  ],
  other: []
};

// Function to parse the patent list from the extracted text
function parsePatentsList(text) {
  const patents = [];
  const lines = text.split('\n');
  let currentPatent = null;
  
  // Regular expression to match patent entries
  // Format: <index> <doc-id> <date> <title> <image-pages>
  const patentRegex = /^(\d+)\s+(US-[\d]+-[A-Z]\d+)\s+(\d{4}-\d{2}-\d{2})\s+(.+?)\s+(\d+)$/;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Skip empty lines or page markers
    if (!line || line.match(/^\d+\/\d+\/\d+ \d+:\d+:\d+ [AP]M$/)) {
      continue;
    }
    
    // Check if line matches patent entry pattern
    const patentMatch = line.match(patentRegex);
    
    if (patentMatch) {
      // We found a new patent entry
      const [_, index, docId, date, title, imagePages] = patentMatch;
      
      currentPatent = {
        index: parseInt(index),
        id: docId,
        publicationDate: date,
        title: title.trim(),
        imagePages: parseInt(imagePages)
      };
      
      patents.push(currentPatent);
    } else if (currentPatent) {
      // This might be a continuation of the title from the previous line
      // We'll append it to the current patent's title if it doesn't look like a page number or timestamp
      if (!line.match(/^\d+\/\d+\/\d+ \d+:\d+:\d+ [AP]M$/)) {
        currentPatent.title += ' ' + line;
      }
    }
  }
  
  return patents;
}

// Function to categorize patents based on keywords in title
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
 * Categorize patents into subcategories based on keywords
 * @param {Object} categorizedPatents - Object with patents already grouped by main category
 * @param {Object} subcategories - Object with subcategory definitions
 * @returns {Object} Object with patents categorized by subcategories within main categories
 */
function categorizePatentsIntoSubcategories(categorizedPatents, subcategories) {
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

// Function to save categorized patent data to JSON files
function savePatentData(categorizedPatents) {
  // Create directory if it doesn't exist
  const outputDir = path.join(__dirname, '../content/patents');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Load subcategories
  let subcategoryDefs;
  try {
    const subcatPath = path.join(outputDir, 'subcategories.json');
    if (fs.existsSync(subcatPath)) {
      subcategoryDefs = JSON.parse(fs.readFileSync(subcatPath, 'utf8')).subcategories;
    } else {
      // If subcategories.json doesn't exist yet, we'll just skip subcategorization
      subcategoryDefs = {};
    }
  } catch (error) {
    console.error('Error loading subcategories:', error);
    subcategoryDefs = {};
  }
  
  // Create categories.json with proper structure
  const categories = Object.keys(categorizedPatents)
    .filter(category => categorizedPatents[category].length > 0)
    .map((category, index) => ({
      id: category,
      name: category.charAt(0).toUpperCase() + category.slice(1) + 
            (category !== 'other' ? 
              (category === 'electronics' ? ' & Technology' : 
              category === 'manufacturing' ? ' & Industrial' : 
              category === 'firearms' ? ' & Accessories' : 
              category === 'tools' ? ' & Equipment' : 
              category === 'medical' ? ' Devices' : 
              category === 'household' ? ' & Living' : 
              category === 'sports' ? ' & Recreation' : '') 
              : ''),
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
  
  // Categorize patents into subcategories if subcategory definitions exist
  let subcategorizedPatents = {};
  if (Object.keys(subcategoryDefs).length > 0) {
    subcategorizedPatents = categorizePatentsIntoSubcategories(categorizedPatents, subcategoryDefs);
  }
  
  // Create a JSON file for each category
  for (const [category, patents] of Object.entries(categorizedPatents)) {
    if (patents.length === 0) continue;
    
    // Sort patents by publication date (newest first)
    patents.sort((a, b) => 
      new Date(b.publicationDate).getTime() - new Date(a.publicationDate).getTime()
    );
    
    // Prepare subcategories data if available
    let subcategoriesData = null;
    if (subcategorizedPatents[category]) {
      subcategoriesData = {};
      
      // Transform subcategory objects to arrays with metadata
      for (const [subId, subPatents] of Object.entries(subcategorizedPatents[category].subcategories)) {
        // Find subcategory definition
        const subDef = subcategoryDefs[category]?.find(s => s.id === subId);
        if (subDef && subPatents.length > 0) {
          subcategoriesData[subId] = {
            id: subId,
            name: subDef.name,
            patentCount: subPatents.length,
            patents: subPatents.map(cleanPatent)
          };
        }
      }
    }
    
    const categoryData = {
      categoryId: category,
      patents: patents.map(cleanPatent)
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
  
  // Helper function to clean patent objects
  function cleanPatent(patent) {
    // Create a clean patent object without any duplicate properties
    const cleanPatent = {
      id: patent.id,
      title: patent.title,
      publicationDate: patent.publicationDate,
      imagePages: patent.imagePages,
      abstract: patent.abstract || "To be fetched from Google Patents",
      featured: false
    };
    
    // Only add images if they exist and weren't already added
    if (patent.images && Array.isArray(patent.images)) {
      cleanPatent.images = patent.images;
    } else {
      cleanPatent.images = [`/images/patents/${patent.id}/fig1.jpg`];
    }
    
    return cleanPatent;
  }
  
  // Create an all-patents.json with all patents across categories
  const allPatents = [];
  
  // Use a Set to track patent IDs we've already added to avoid duplicates
  const addedPatentIds = new Set();
  
  // Flatten patents from all categories, ensuring no duplicates
  Object.values(categorizedPatents).forEach(categoryPatents => {
    categoryPatents.forEach(patent => {
      if (!addedPatentIds.has(patent.id)) {
        allPatents.push(cleanPatent(patent));
        addedPatentIds.add(patent.id);
      }
    });
  });
  
  // Sort patents by publication date (newest first)
  allPatents.sort((a, b) => 
    new Date(b.publicationDate).getTime() - new Date(a.publicationDate).getTime()
  );
  
  fs.writeFileSync(
    path.join(outputDir, 'all-patents.json'),
    JSON.stringify({ patents: allPatents }, null, 2)
  );
  
  console.log(`Created all-patents.json with ${allPatents.length} patents`);
}

// Function to generate a sample of patents.txt for testing
function generateTrophyWallTextSample() {
  // Create a sample based on what we've seen in the TrophyWall.pdf
  const sampleContent = `List of Selected Search Result Documents
# Doc ID 
Date
Published 
Title 
Image
Pages
1 US-12270996-B2 2025-04-08 Electronic loupe 15
2 US-12260863-B1 2025-03-25
Method and system for providing
assistance for cognitively
impaired users by utilizing
artifical intelligence
18
3 US-12243306-B1 2025-03-04
System, method, and device to
proactively detect in real time
one or more threats in crowded
areas
22
4 US-12108227-B2 2024-10-01
System and method for
adjusting audio parameters for a
user
12
5 US-12090381-B2 2024-09-17 
Head target for martial arts
practice 
11
5/2/2025 03:02:55 PM`;

  const outputDir = path.join(__dirname, '../source examples');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  fs.writeFileSync(
    path.join(outputDir, 'TrophyWall.txt'),
    sampleContent
  );
  
  console.log('Created TrophyWall.txt sample for testing');
}

// Main function to process TrophyWall
async function processTrophyWall() {
  try {
    // Generate sample text file for testing
    generateTrophyWallTextSample();
    
    // Read the PDF file (using text file for now)
    const textContent = fs.readFileSync(path.join(__dirname, '../source examples/TrophyWall.txt'), 'utf8');
    
    // Process the text content
    const patents = parsePatentsList(textContent);
    console.log(`Parsed ${patents.length} patents from TrophyWall`);
    
    // Categorize patents
    const categorizedPatents = categorizePatents(patents);
    console.log('Categorized patents:');
    Object.entries(categorizedPatents).forEach(([category, patents]) => {
      console.log(`- ${category}: ${patents.length} patents`);
    });
    
    // Save to JSON files
    savePatentData(categorizedPatents);
    
    console.log('Patent processing complete!');
  } catch (error) {
    console.error('Error processing TrophyWall:', error);
  }
}

// Export functions for use in other scripts
export default {
  processTrophyWall,
  parsePatentsList,
  categorizePatents,
  categorizePatentsIntoSubcategories,
  savePatentData
};
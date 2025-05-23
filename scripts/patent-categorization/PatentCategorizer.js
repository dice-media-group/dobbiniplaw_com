// PatentCategorizer.js
// Handles categorization of patents based on keywords

import { categories } from './categoryConfig.js';

export class PatentCategorizer {
  constructor() {
    this.categories = categories;
  }

  /**
   * Categorize patents based on keywords in title
   * @param {Array} patents - Array of patent objects
   * @returns {Object} Object with patents categorized by main category
   */
  categorizePatents(patents) {
    const categorized = Object.keys(this.categories).reduce((acc, category) => {
      acc[category] = [];
      return acc;
    }, {});
    
    for (const patent of patents) {
      let assigned = false;
      const lowerTitle = patent.title.toLowerCase();
      
      // Check each category's keywords
      for (const [category, keywords] of Object.entries(this.categories)) {
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
   * Sort patents by publication date (newest first)
   * @param {Array} patents - Array of patent objects
   * @returns {Array} Sorted array of patent objects
   */
  sortPatentsByDate(patents) {
    return [...patents].sort((a, b) => 
      new Date(b.publicationDate).getTime() - new Date(a.publicationDate).getTime()
    );
  }

  /**
   * Clean title by removing leading item numbers
   * @param {string} title - Original patent title
   * @returns {string} Cleaned patent title
   */
  cleanTitle(title) {
    // Remove numbers followed by period at beginning (e.g., "1. Patent Title")
    return title.replace(/^\d+\.\s*/, '')
      // Also remove item numbering patterns like "(1)" at beginning
      .replace(/^\(\d+\)\s*/, '')
      // Also remove isolated numbers at the beginning
      .replace(/^\d+\s+/, '');
  }

  /**
   * Clean patent object for JSON output
   * @param {Object} patent - Patent object
   * @returns {Object} Cleaned patent object
   */
  cleanPatent(patent) {
    // Create a clean patent object without any duplicate properties
    const cleanPatent = {
      id: patent.id,
      title: this.cleanTitle(patent.title), // Clean the title
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
    
    // Add inventors and assignee if available
    if (patent.inventors) {
      cleanPatent.inventors = patent.inventors;
    }
    
    if (patent.assignee) {
      cleanPatent.assignee = patent.assignee;
    }
    
    return cleanPatent;
  }
}

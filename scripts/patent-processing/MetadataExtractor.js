// MetadataExtractor.js
// Extracts metadata from patent HTML files

import * as cheerio from 'cheerio';
import { FileSystemHelper } from './FileSystemHelper.js';

export class MetadataExtractor {
  constructor(config) {
    this.config = config;
    this.fileHelper = new FileSystemHelper(config);
  }

  /**
   * Extract patent details including abstract, inventors, and assignee
   * @param {string} patentId - Patent ID with hyphens
   * @returns {Promise<Object>} Object containing abstract, inventors, and assignee
   */
  async extractPatentDetails(patentId) {
    try {
      // Find the HTML file for the patent
      const { path: htmlPath, exists } = await this.fileHelper.findPatentHtmlFile(patentId);
      
      if (!exists) {
        console.warn(`❌ Cannot extract metadata - HTML file not found for ${patentId}`);
        return {
          abstract: `HTML file not found for ${patentId}`,
          inventors: [],
          assignee: `HTML file not found for ${patentId}`
        };
      }
      
      // Read the HTML file
      console.log(`Reading HTML file: ${htmlPath}`);
      const htmlContent = await this.fileHelper.readHtmlFile(htmlPath);
      
      if (!htmlContent || htmlContent.trim().length === 0) {
        console.warn(`⚠️ Empty HTML content for ${patentId}`);
        return {
          abstract: `Empty HTML file for ${patentId}`,
          inventors: [],
          assignee: `Empty HTML file for ${patentId}`
        };
      }
      
      // Check for design patents - they may have different structures
      const isDesignPatent = patentId.includes('-D') && patentId.endsWith('-S');
      
      // Parse the HTML
      const $ = cheerio.load(htmlContent);
      
      // Extract the abstract (design patents may not have abstracts)
      let abstract;
      if (isDesignPatent) {
        abstract = this.extractDesignPatentDescription($, patentId);
      } else {
        abstract = this.extractAbstractFromHtml($, patentId);
      }
      
      // Extract inventors
      const inventors = this.extractInventorsFromHtml($, patentId);
      
      // Extract assignee
      const assignee = this.extractAssigneeFromHtml($, patentId);
      
      // Log what we found
      console.log(`Extracted details for ${patentId}:`);
      console.log(`- Abstract: ${abstract.substring(0, 100)}${abstract.length > 100 ? '...' : ''}`);
      console.log(`- Inventors: ${inventors.join(', ') || 'None found'}`);
      console.log(`- Assignee: ${assignee}`);
      
      return {
        abstract,
        inventors,
        assignee
      };
    } catch (error) {
      console.error(`Error extracting details for ${patentId}:`, error.message);
      return {
        abstract: `Error extracting details for ${patentId}: ${error.message}`,
        inventors: [],
        assignee: `Error extracting details for ${patentId}: ${error.message}`
      };
    }
  }

  /**
   * Extract abstract from HTML
   * @param {CheerioAPI} $ - Cheerio API instance
   * @param {string} patentId - Patent ID with hyphens
   * @returns {string} Abstract text
   */
  extractAbstractFromHtml($, patentId) {
    // Try different selectors that might contain the abstract
    let abstract = '';
    
    // Try 'section#text abstract div.abstract'
    const abstractDiv = $('section#text abstract div.abstract');
    if (abstractDiv.length > 0) {
      abstract = abstractDiv.text().trim();
      console.log('Found abstract using section#text abstract div.abstract');
    } 
    // Try 'abstract .abstract'
    else if ($('abstract .abstract').length > 0) {
      abstract = $('abstract .abstract').text().trim();
      console.log('Found abstract using abstract .abstract');
    } 
    // Try '.abstract'
    else if ($('.abstract').length > 0) {
      abstract = $('.abstract').text().trim();
      console.log('Found abstract using .abstract');
    }
    // Try 'section[itemprop="abstract"]'
    else if ($('section[itemprop="abstract"]').length > 0) {
      abstract = $('section[itemprop="abstract"]').text().trim();
      console.log('Found abstract using section[itemprop="abstract"]');
    } 
    // Try for a description section if no abstract
    else if ($('section#description').length > 0) {
      abstract = $('section#description').text().trim().substring(0, 250) + '...';
      console.log('Found abstract using description section');
    }
    else {
      abstract = `Abstract not found for ${patentId}`;
      
      // List all section elements to help debug
      const sections = [];
      $('section').each(function() {
        const id = $(this).attr('id');
        const className = $(this).attr('class');
        sections.push(id ? `#${id}` : (className ? `.${className}` : 'unknown'));
      });
      console.log(`Available sections: ${sections.join(', ')}`);
    }
    
    return abstract;
  }

  /**
   * Extract description for design patents (which don't usually have abstracts)
   * @param {CheerioAPI} $ - Cheerio API instance
   * @param {string} patentId - Patent ID with hyphens
   * @returns {string} Description text
   */
  extractDesignPatentDescription($, patentId) {
    // Design patents typically don't have abstracts, but may have descriptions
    console.log('Looking for design patent description sections');
    
    // Try for a description or claim
    if ($('section#description').length > 0) {
      console.log('Found design patent description');
      return $('section#description').text().trim();
    } 
    else if ($('section#claims').length > 0) {
      console.log('Found design patent claim');
      return $('section#claims').text().trim();
    }
    else if ($('section#text div.description').length > 0) {
      console.log('Found design patent text description');
      return $('section#text div.description').text().trim();
    }
    // Try finding ANY text that might describe the design
    else if ($('section#text').length > 0) {
      console.log('Using general text section for design patent');
      const text = $('section#text').text().trim();
      return text.substring(0, Math.min(300, text.length));
    }
    else {
      // Fallback for design patents
      return `Design patent ${patentId}`;
    }
  }

  /**
   * Extract inventors from HTML
   * @param {CheerioAPI} $ - Cheerio API instance
   * @param {string} patentId - Patent ID with hyphens
   * @returns {Array<string>} Array of inventor names
   */
  extractInventorsFromHtml($, patentId) {
    console.log('Extracting inventors');
    const inventors = [];
    
    // Look for a.link with href starting with "/?inventor="
    $('a.link[href^="/?inventor="]').each(function() {
      const inventor = $(this).text().trim();
      if (inventor) {
        inventors.push(inventor);
        console.log(`Found inventor: ${inventor}`);
      }
    });
    
    // Alternative method if no inventors found
    if (inventors.length === 0) {
      console.log('Trying alternative methods to find inventors');
      
      // Try looking for inventor section or label
      $('section').each(function() {
        const text = $(this).text();
        if (text.includes('Inventor:') || text.includes('Inventors:')) {
          const inventorText = text.split(/Inventor[s]?:/)[1]?.trim();
          if (inventorText) {
            // Split by commas or semicolons if multiple inventors
            const inventorNames = inventorText.split(/[,;]/).map(name => name.trim());
            inventorNames.forEach(name => {
              if (name && !name.includes('Assignee')) {
                inventors.push(name);
                console.log(`Found inventor using section text: ${name}`);
              }
            });
          }
        }
      });
    }
    
    return inventors;
  }

  /**
   * Extract assignee from HTML
   * @param {CheerioAPI} $ - Cheerio API instance
   * @param {string} patentId - Patent ID with hyphens
   * @returns {string} Assignee name
   */
  extractAssigneeFromHtml($, patentId) {
    console.log('Extracting assignee');
    let assignee = '';
    
    // Look for span with "Current Assignee" text
    const assigneeWarning = $('span.tooltip-hint#assigneeWarning:contains("Current Assignee")');
    if (assigneeWarning.length > 0) {
      console.log('Found assignee warning span');
      
      // Try different approaches to find the assignee element based on common HTML structures
      
      // First try: check the next element or sibling
      let assigneeElement = assigneeWarning.parent().next();
      if (assigneeElement.length > 0 && assigneeElement.text().trim()) {
        assignee = assigneeElement.text().trim();
        console.log(`Found assignee in next element: ${assignee}`);
      } 
      // Second try: look for links near the assignee warning
      else {
        const nearbyLink = assigneeWarning.parent().parent().find('a.link').first();
        if (nearbyLink.length > 0) {
          assignee = nearbyLink.text().trim();
          console.log(`Found assignee in nearby link: ${assignee}`);
        }
        // Third try: look in nearby spans
        else {
          const nearbySpan = assigneeWarning.parent().parent().find('span:not(.tooltip-hint)').first();
          if (nearbySpan.length > 0) {
            assignee = nearbySpan.text().trim();
            console.log(`Found assignee in nearby span: ${assignee}`);
          } else {
            assignee = `Assignee not found for ${patentId}`;
          }
        }
      }
    } else {
      console.log('No assignee warning span found, trying alternative methods');
      
      // Alternative method: look for text containing "Assignee" or "Assigned to"
      $('section').each(function() {
        const text = $(this).text();
        if (text.includes('Assignee:') || text.includes('Assigned to:')) {
          const assigneeText = text.split(/Assignee:|Assigned to:/)[1]?.trim().split('\n')[0].trim();
          if (assigneeText) {
            assignee = assigneeText;
            console.log(`Found assignee using section text: ${assignee}`);
            return false; // break the each loop
          }
        }
      });
      
      if (!assignee) {
        assignee = `Assignee not found for ${patentId}`;
      }
    }
    
    return assignee;
  }
}

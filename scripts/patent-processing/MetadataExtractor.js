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
    
    // Debug information - print all 'dt' and 'th' elements to see available labels
    console.log('Available labels in document:');
    $('dt, th').each(function() {
      const labelText = $(this).text().trim();
      if (labelText) {
        console.log(`  - Label: "${labelText}"`);
      }
    });
    
    // Method 1: Look for the Google Patents structure - find lines with "Inventor :" format
    // These are often in <dl> lists with dt/dd pairs
    $('dl').each(function() {
      $(this).find('dt').each(function() {
        const label = $(this).text().trim();
        if (label === 'Inventor' || label === 'Inventors') {
          console.log(`Found inventor label: "${label}"`);
          const ddElement = $(this).next('dd');
          if (ddElement.length > 0) {
            const inventorText = ddElement.text().trim();
            console.log(`Found inventor text: "${inventorText}"`);
            if (inventorText) {
              const names = inventorText.split(/[,;]/).map(name => name.trim());
              names.forEach(name => {
                if (name && !inventors.includes(name)) {
                  inventors.push(name);
                  console.log(`Added inventor from dt/dd: ${name}`);
                }
              });
            }
          }
        }
      });
    });
    
    // Method 2: Look for table structures - often used in newer Google Patents pages
    $('table, .table').each(function() {
      $(this).find('tr').each(function() {
        const thElement = $(this).find('th, .th').first();
        const tdElement = $(this).find('td, .td').first();
        
        if (thElement.length > 0 && tdElement.length > 0) {
          const label = thElement.text().trim();
          if (label === 'Inventor' || label === 'Inventors') {
            console.log(`Found inventor label in table: "${label}"`);
            const inventorText = tdElement.text().trim();
            console.log(`Found inventor text in table: "${inventorText}"`);
            if (inventorText) {
              const names = inventorText.split(/[,;]/).map(name => name.trim());
              names.forEach(name => {
                if (name && !inventors.includes(name)) {
                  inventors.push(name);
                  console.log(`Added inventor from table: ${name}`);
                }
              });
            }
          }
        }
      });
    });
    
    // Method 3: Look for 'Info' section structure used in some Google Patents pages
    $('.info, section#info').each(function() {
      const infoText = $(this).text();
      const inventorMatch = infoText.match(/Inventor[s]?\s*:\s*([^:]+?)(?=\n|$|:|Assignee)/i);
      if (inventorMatch && inventorMatch[1]) {
        console.log(`Found inventor section text: "${inventorMatch[1].trim()}"`);
        const names = inventorMatch[1].trim().split(/[,;]/).map(name => name.trim());
        names.forEach(name => {
          if (name && !inventors.includes(name)) {
            inventors.push(name);
            console.log(`Added inventor from info section: ${name}`);
          }
        });
      }
    });
    
    // Method 4: Search for inventor links - common in Google Patents
    $('a[href*="inventor"]').each(function() {
      const inventorName = $(this).text().trim();
      if (inventorName && !inventors.includes(inventorName)) {
        inventors.push(inventorName);
        console.log(`Added inventor from inventor link: ${inventorName}`);
      }
    });
    
    // Method 5: Generic text search - Look for "Inventor: Name" pattern in entire document
    if (inventors.length === 0) {
      const fullText = $('body').text();
      // Using a more flexible pattern that looks for "Inventor:" or "Inventors:" followed by text
      // up to another label (like "Assignee:") or end of line
      const inventorPattern = /Inventor[s]?\s*:\s*([^:]+?)(?=\n|$|:|Assignee|Priority|Application|Publication)/i;
      const match = fullText.match(inventorPattern);
      if (match && match[1]) {
        console.log(`Found inventor using text pattern: "${match[1].trim()}"`);
        const names = match[1].trim().split(/[,;]/).map(name => name.trim());
        names.forEach(name => {
          if (name && !inventors.includes(name)) {
            inventors.push(name);
            console.log(`Added inventor from text pattern: ${name}`);
          }
        });
      }
    }
    
    // Method 6: Last resort - create a simpler pattern just looking for 'Inventor' followed by a name
    if (inventors.length === 0) {
      $('.info, section#info, section').each(function() {
        const text = $(this).text();
        if (text.includes('Inventor:') || text.includes('Inventors:')) {
          // Extract content after "Inventor:" or "Inventors:"
          const lines = text.split('\n');
          for (let i = 0; i < lines.length; i++) {
            if (lines[i].includes('Inventor:') || lines[i].includes('Inventors:')) {
              // Try to extract from the same line
              let inventorLine = lines[i].split(/Inventor[s]?:/)[1]?.trim();
              
              // If empty, try the next line
              if (!inventorLine && i < lines.length - 1) {
                inventorLine = lines[i + 1].trim();
              }
              
              if (inventorLine) {
                // Stop at known section markers or punctuation
                inventorLine = inventorLine.split(/Authority:|Priority|Filing date|Publication|Assignee|:/)[0].trim();
                console.log(`Found inventor line: "${inventorLine}"`);
                
                const names = inventorLine.split(/[,;]/).map(name => name.trim());
                names.forEach(name => {
                  if (name && !inventors.includes(name)) {
                    inventors.push(name);
                    console.log(`Added inventor from line search: ${name}`);
                  }
                });
                break;
              }
            }
          }
        }
      });
    }
    
    // Clean up any inventors with parenthetical text
    const cleanedInventors = inventors.map(inventor => 
      inventor.replace(/\([^)]*\)/g, '').trim() // Remove parenthetical content
    );
    
    // Log results
    if (cleanedInventors.length > 0) {
      console.log(`Found ${cleanedInventors.length} inventors: ${cleanedInventors.join(', ')}`);
    } else {
      console.log(`No inventors found for ${patentId}`);
    }
    
    return cleanedInventors;
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
    
    // Google Patents Format: Look for "Current Assignee" or "Original Assignee" in the info section
    // This is the most common case for Google Patents HTML
    $('dt, .th').each(function() {
      let labelText = $(this).text().trim();
      
      // We prioritize Current Assignee, but fall back to Original Assignee
      if (labelText.includes('Current Assignee') || 
          (!assignee && labelText.includes('Original Assignee'))) {
        
        const assigneeElement = $(this).next('dd, .td');
        if (assigneeElement.length > 0) {
          const text = assigneeElement.text().trim();
          // Remove any explanatory text that might be in parentheses
          const cleanedText = text.replace(/\([^)]*\)/g, '').trim();
          
          if (cleanedText) {
            assignee = cleanedText;
            console.log(`Found assignee using Google Patents format: ${assignee}`);
            
            // If we found a Current Assignee, we can stop searching
            if (labelText.includes('Current Assignee')) {
              return false; // Break the each loop
            }
          }
        }
      }
    });
    
    // Look for span with "Current Assignee" text (older method)
    if (!assignee) {
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
            }
          }
        }
      }
    }
    
    // Alternative method - look for text patterns
    if (!assignee) {
      console.log('Trying alternative methods to find assignee');
      
      // Look for patterns like "Assignee : Name" in any part of the document
      const assigneePattern = /(?:Current\s+|Original\s+)?Assignee[\s]*:[\s]*([^:]+?)(?:\n|$|:)/i;
      const fullText = $('body').text();
      const assigneeMatch = fullText.match(assigneePattern);
      
      if (assigneeMatch && assigneeMatch[1]) {
        assignee = assigneeMatch[1].trim();
        // Remove any explanatory text that might be in parentheses
        assignee = assignee.replace(/\([^)]*\)/g, '').trim();
        console.log(`Found assignee using text pattern: ${assignee}`);
      }
      
      // Look for text containing "Assignee" or "Assigned to"
      if (!assignee) {
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
      }
    }
    
    if (!assignee) {
      assignee = `Assignee not found for ${patentId}`;
    }
    
    return assignee;
  }
}

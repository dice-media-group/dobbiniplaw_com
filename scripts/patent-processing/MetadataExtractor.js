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
        return {
          abstract: `HTML file not found for ${patentId}`,
          inventors: [],
          assignee: `HTML file not found for ${patentId}`
        };
      }
      
      // Read the HTML file
      const htmlContent = await this.fileHelper.readHtmlFile(htmlPath);
      
      // Parse the HTML
      const $ = cheerio.load(htmlContent);
      
      // Extract the abstract
      const abstract = this.extractAbstractFromHtml($, patentId);
      
      // Extract inventors
      const inventors = this.extractInventorsFromHtml($, patentId);
      
      // Extract assignee
      const assignee = this.extractAssigneeFromHtml($, patentId);
      
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
    } 
    // Try 'abstract .abstract'
    else if ($('abstract .abstract').length > 0) {
      abstract = $('abstract .abstract').text().trim();
    } 
    // Try '.abstract'
    else if ($('.abstract').length > 0) {
      abstract = $('.abstract').text().trim();
    }
    // Try 'section[itemprop="abstract"]'
    else if ($('section[itemprop="abstract"]').length > 0) {
      abstract = $('section[itemprop="abstract"]').text().trim();
    } else {
      abstract = `Abstract not found for ${patentId}`;
    }
    
    return abstract;
  }

  /**
   * Extract inventors from HTML
   * @param {CheerioAPI} $ - Cheerio API instance
   * @param {string} patentId - Patent ID with hyphens
   * @returns {Array<string>} Array of inventor names
   */
  extractInventorsFromHtml($, patentId) {
    const inventors = [];
    
    // Look for a.link with href starting with "/?inventor="
    $('a.link[href^="/?inventor="]').each(function() {
      const inventor = $(this).text().trim();
      if (inventor) inventors.push(inventor);
    });
    
    return inventors;
  }

  /**
   * Extract assignee from HTML
   * @param {CheerioAPI} $ - Cheerio API instance
   * @param {string} patentId - Patent ID with hyphens
   * @returns {string} Assignee name
   */
  extractAssigneeFromHtml($, patentId) {
    let assignee = '';
    
    // Look for span with "Current Assignee" text
    const assigneeWarning = $('span.tooltip-hint#assigneeWarning:contains("Current Assignee")');
    if (assigneeWarning.length > 0) {
      // Try different approaches to find the assignee element based on common HTML structures
      
      // First try: check the next element or sibling
      let assigneeElement = assigneeWarning.parent().next();
      if (assigneeElement.length > 0 && assigneeElement.text().trim()) {
        assignee = assigneeElement.text().trim();
      } 
      // Second try: look for links near the assignee warning
      else {
        const nearbyLink = assigneeWarning.parent().parent().find('a.link').first();
        if (nearbyLink.length > 0) {
          assignee = nearbyLink.text().trim();
        }
        // Third try: look in nearby spans
        else {
          const nearbySpan = assigneeWarning.parent().parent().find('span:not(.tooltip-hint)').first();
          if (nearbySpan.length > 0) {
            assignee = nearbySpan.text().trim();
          } else {
            assignee = `Assignee not found for ${patentId}`;
          }
        }
      }
    } else {
      assignee = `Assignee not found for ${patentId}`;
    }
    
    return assignee;
  }
}

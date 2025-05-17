import axios from 'axios';
import cheerio from 'cheerio';

/**
 * Service to fetch and process patent data
 */
export const patentService = {
  /**
   * Fetch patent data from Google Patents
   * @param {string} patentId - Patent ID in format US-12345678-B2
   * @returns {Promise<Object>} Patent data including images
   */
  async getPatentDetails(patentId) {
    try {
      // Format patent ID for Google Patents URL
      const formattedId = patentId.replace(/-/g, '');
      const url = `https://patents.google.com/patent/${formattedId}`;
      
      // Fetch the HTML
      const response = await fetch(url);
      const html = await response.text();
      
      // Parse the HTML to extract relevant data
      const data = this.parsePatentHTML(html, patentId);
      return data;
    } catch (error) {
      console.error(`Error fetching patent ${patentId}:`, error);
      return null;
    }
  },
  
  /**
   * Parse HTML from Google Patents to extract relevant patent data
   * @param {string} html - HTML content from Google Patents
   * @param {string} patentId - Original patent ID
   * @returns {Object} Structured patent data
   */
  parsePatentHTML(html, patentId) {
    const $ = cheerio.load(html);
    
    // Base patent data
    const patent = {
      id: patentId,
      title: $('.title').text().trim() || $('meta[property="og:title"]').attr('content') || '',
      abstract: $('.abstract').text().trim(),
      inventors: [],
      assignee: $('.assignee-list').text().trim(),
      publishedDate: '',
      images: []
    };
    
    // Extract inventors
    $('.inventor-list .inventor').each((i, el) => {
      patent.inventors.push($(el).text().trim());
    });
    
    // Extract images
    $('.patent-image img').each((i, el) => {
      const imgSrc = $(el).attr('src');
      if (imgSrc) {
        patent.images.push(imgSrc);
      }
    });
    
    return patent;
  },
  
  /**
   * Transform a patent ID into a clean format for Google Patents
   * @param {string} patentId - Patent ID (e.g., US-12345678-B2)
   * @returns {string} Cleaned patent ID (e.g., US12345678B2)
   */
  formatPatentId(patentId) {
    return patentId.replace(/-/g, '');
  },
  
  /**
   * Get a Google Patents URL for a patent
   * @param {string} patentId - Patent ID
   * @returns {string} Google Patents URL
   */
  getGooglePatentsUrl(patentId) {
    const formattedId = this.formatPatentId(patentId);
    return `https://patents.google.com/patent/${formattedId}`;
  }
};

export default patentService;
// patentImageFetcher.js
// Script to fetch patent images and abstracts from Google Patents

const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');

/**
 * Fetches patent information from Google Patents
 * @param {string} patentId - The patent ID in format US-XXXXXXXX-XX
 * @returns {Promise<Object>} Patent information including abstract and image URLs
 */
async function fetchPatentInfo(patentId) {
  try {
    // Format the patent ID for Google Patents URL
    const formattedId = patentId.replace(/-/g, '');
    const url = `https://patents.google.com/patent/${formattedId}`;
    
    console.log(`Fetching patent info from: ${url}`);
    
    // Fetch the Google Patents page
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    // Parse the HTML
    const $ = cheerio.load(response.data);
    
    // Extract the abstract
    const abstract = $('section[itemprop="abstract"]').text().trim();
    
    // Extract image URLs
    const imageUrls = [];
    $('figure img').each((i, el) => {
      const imgSrc = $(el).attr('src');
      if (imgSrc && imgSrc.includes('image')) {
        // Convert relative URLs to absolute
        const imageUrl = imgSrc.startsWith('http') ? imgSrc : `https://patents.google.com${imgSrc}`;
        imageUrls.push(imageUrl);
      }
    });
    
    return {
      id: patentId,
      abstract: abstract || `No abstract available for ${patentId}`,
      imageUrls
    };
  } catch (error) {
    console.error(`Error fetching patent info for ${patentId}:`, error.message);
    return {
      id: patentId,
      abstract: `Failed to fetch abstract for ${patentId}`,
      imageUrls: []
    };
  }
}

/**
 * Downloads patent images from Google Patents
 * @param {string} patentId - The patent ID
 * @param {Array<string>} imageUrls - Array of image URLs
 * @returns {Promise<Array<Object>>} Array of image objects with thumbnail and hires paths
 */
async function downloadPatentImages(patentId, imageUrls) {
  // Create directory for patent images
  const patentDir = path.join(__dirname, '../public/images/patents', patentId);
  const hiresDir = path.join(patentDir, 'hires');
  
  if (!fs.existsSync(patentDir)) {
    fs.mkdirSync(patentDir, { recursive: true });
  }
  
  if (!fs.existsSync(hiresDir)) {
    fs.mkdirSync(hiresDir, { recursive: true });
  }
  
  const imageObjects = [];
  
  for (let i = 0; i < imageUrls.length; i++) {
    try {
      const url = imageUrls[i];
      const figNum = i;
      const thumbnailPath = path.join(patentDir, `fig${figNum}.png`);
      const hiresPath = path.join(hiresDir, `fig${figNum}.png`);
      
      const thumbnailPublicPath = `/images/patents/${patentId}/fig${figNum}.png`;
      const hiresPublicPath = `/images/patents/${patentId}/hires/fig${figNum}.png`;
      
      console.log(`Downloading image ${i + 1}/${imageUrls.length} for ${patentId}`);
      
      // Download the high-res image
      const response = await axios({
        method: 'GET',
        url,
        responseType: 'stream',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });
      
      // Save the hi-res image
      const hiresWriter = fs.createWriteStream(hiresPath);
      response.data.pipe(hiresWriter);
      
      await new Promise((resolve, reject) => {
        hiresWriter.on('finish', resolve);
        hiresWriter.on('error', reject);
      });
      
      // TODO: For a production system, create a proper thumbnail from the hi-res image
      // For now, we'll just copy the same file as the thumbnail
      fs.copyFileSync(hiresPath, thumbnailPath);
      
      imageObjects.push({
        thumbnail: thumbnailPublicPath,
        hires: hiresPublicPath,
        caption: `Figure ${figNum}`
      });
    } catch (error) {
      console.error(`Error downloading image for ${patentId}:`, error.message);
    }
  }
  
  return imageObjects;
}

/**
 * Creates placeholder images when real images aren't available
 * @param {string} patentId - The patent ID
 * @param {number} count - Number of placeholder images to create
 * @returns {Promise<Array<Object>>} Array of image objects with thumbnail and hires paths
 */
async function createPlaceholderImages(patentId, count = 1) {
  // Create directory for patent images
  const patentDir = path.join(__dirname, '../public/images/patents', patentId);
  const hiresDir = path.join(patentDir, 'hires');
  
  if (!fs.existsSync(patentDir)) {
    fs.mkdirSync(patentDir, { recursive: true });
  }
  
  if (!fs.existsSync(hiresDir)) {
    fs.mkdirSync(hiresDir, { recursive: true });
  }
  
  const imageObjects = [];
  const placeholderSvg = path.join(__dirname, '../public/images/patents/placeholder.svg');
  
  // Check if the placeholder exists, if not create it
  if (!fs.existsSync(placeholderSvg)) {
    const svgContent = `<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
      <rect width="300" height="200" fill="#f0f0f0"/>
      <text x="150" y="100" font-family="Arial" font-size="14" text-anchor="middle">Image not available</text>
    </svg>`;
    fs.writeFileSync(placeholderSvg, svgContent);
  }
  
  // Just return the placeholder image for simplicity
  return [{
    thumbnail: `/images/patents/placeholder.svg`,
    hires: `/images/patents/placeholder.svg`,
    caption: 'No image available'
  }];
}

/**
 * Process a list of patents to fetch abstracts and images
 * @param {Array<Object>} patents - Array of patent objects
 * @param {boolean} downloadImages - Whether to download images
 * @returns {Promise<Array<Object>>} Enhanced patent objects
 */
async function enhancePatentData(patents, downloadImages = false) {
  const enhancedPatents = [];
  
  for (const patent of patents) {
    console.log(`Enhancing data for patent ${patent.id}`);
    
    try {
      // Fetch patent info from Google Patents
      const patentInfo = await fetchPatentInfo(patent.id);
      
      // Get patent directory paths
      const patentDir = path.join(__dirname, '../public/images/patents', patent.id);
      const hiresDir = path.join(patentDir, 'hires');
      
      // Initialize images array
      let images = [];
      
      // Check if patent directory exists and collect existing images
      if (fs.existsSync(patentDir)) {
        const patentFiles = fs.readdirSync(patentDir)
          .filter(file => /^fig\d+\.(png|jpg|jpeg|svg)$/i.test(file)); // Only include fig*.png|jpg|jpeg|svg files
        
        for (const file of patentFiles) {
          // Skip the 'hires' directory itself
          if (file === 'hires') continue;
          
          const figNum = file.match(/\d+/)[0];
          const baseFileName = `fig${figNum}`;
          const fileExt = path.extname(file);
          
          const hiresFile = path.join(hiresDir, file);
          
          const imageObject = {
            thumbnail: `/images/patents/${patent.id}/${baseFileName}${fileExt}`,
            caption: `Figure ${figNum}`
          };
          
          // Check if hi-res version exists
          if (fs.existsSync(hiresFile)) {
            imageObject.hires = `/images/patents/${patent.id}/hires/${baseFileName}${fileExt}`;
          } else {
            // Use thumbnail as fallback if no hi-res exists
            imageObject.hires = imageObject.thumbnail;
          }
          
          images.push(imageObject);
        }
        
        // Sort images numerically
        images.sort((a, b) => {
          const numA = parseInt(a.caption.match(/\d+/) || 0);
          const numB = parseInt(b.caption.match(/\d+/) || 0);
          return numA - numB;
        });
      }
      
      // If downloading is enabled and no images exist, download them
      if (downloadImages && images.length === 0 && patentInfo.imageUrls.length > 0) {
        images = await downloadPatentImages(patent.id, patentInfo.imageUrls);
      } 
      // If no images were found or downloaded, check if we should create placeholders
      else if (images.length === 0 && patent.imagePages > 0) {
        images = await createPlaceholderImages(patent.id);
      }
      
      // If still no images, use standard placeholder
      if (images.length === 0) {
        images = [{
          thumbnail: `/images/patents/placeholder.svg`,
          hires: `/images/patents/placeholder.svg`,
          caption: 'No image available'
        }];
      }
      
      // Enhance the patent object
      enhancedPatents.push({
        ...patent,
        abstract: patentInfo.abstract,
        images: images
      });
      
      // Add a delay to avoid overloading the server
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`Error enhancing patent ${patent.id}:`, error.message);
      enhancedPatents.push({
        ...patent,
        abstract: `Failed to fetch abstract for ${patent.id}`,
        images: [{
          thumbnail: `/images/patents/placeholder.svg`,
          hires: `/images/patents/placeholder.svg`,
          caption: 'No image available'
        }]
      });
    }
  }
  
  return enhancedPatents;
}

// Export the functions
module.exports = {
  fetchPatentInfo,
  downloadPatentImages,
  createPlaceholderImages,
  enhancePatentData
};

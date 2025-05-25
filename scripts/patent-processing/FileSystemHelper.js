// FileSystemHelper.js - FIXED VERSION
// Handles file operations for patent processing with improved design patent name matching

import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

// Promisify fs functions
const statAsync = promisify(fs.stat);
const readFileAsync = promisify(fs.readFile);
const readdirAsync = promisify(fs.readdir);
const mkdirAsync = promisify(fs.mkdir);
const copyFileAsync = promisify(fs.copyFile);
const existsAsync = promisify(fs.exists);
const rmdirAsync = promisify(fs.rmdir);
const unlinkAsync = promisify(fs.unlink);

export class FileSystemHelper {
  constructor(config) {
    this.config = config;
  }

  /**
   * Find all directories in the patent collection that start with "patents-"
   * @returns {Promise<Array<string>>} Array of directory paths
   */
  async findPatentSubdirectories() {
    try {
      const items = await readdirAsync(this.config.LOCAL_PATENT_DIR);
      const subdirs = [];
      
      for (const item of items) {
        if (item.startsWith('patents-')) {
          const fullPath = path.join(this.config.LOCAL_PATENT_DIR, item);
          const stats = await statAsync(fullPath);
          
          if (stats.isDirectory()) {
            subdirs.push(fullPath);
          }
        }
      }
      
      console.log(`Found ${subdirs.length} additional patent directories: ${subdirs.map(d => path.basename(d)).join(', ')}`);
      return subdirs;
    } catch (error) {
      console.error('Error finding patent subdirectories:', error);
      return [];
    }
  }

  /**
   * Format patent ID for file search with comprehensive variant handling
   * @param {string} patentId - Patent ID with hyphens (e.g., "US-D882015-S")
   * @returns {Array<string>} Array of possible formatted IDs
   */
  formatPatentIdForFileSearch(patentId) {
    console.log(`🔍 Generating search formats for: ${patentId}`);
    
    // Basic format - remove hyphens
    const baseFormattedId = patentId.replace(/-/g, '');
    const possibleFormats = [baseFormattedId];
    
    // ENHANCED Design patent handling (US-D######-S format)
    const designPatternRegex = /^US-D(\d+)-S$/i;
    const designMatch = patentId.match(designPatternRegex);
    
    if (designMatch) {
      console.log(`🎨 Design patent detected: ${patentId}`);
      const digitPart = designMatch[1]; // Extract the number part
      
      // Generate comprehensive design patent variants
      const designVariants = [
        // Standard Google Patents format
        `USD${digitPart}S1`,    // Most common format
        `USD${digitPart}S`,     // Without the "1"
        `USD${digitPart}S2`,    // Alternative with "2"
        `USD${digitPart}S3`,    // Alternative with "3"
        
        // With zero-padding variations
        `USD0${digitPart}S1`,   // Zero-padded
        `USD0${digitPart}S`,    // Zero-padded without "1"
        
        // Different case variations
        `usd${digitPart}S1`,    // Lowercase
        `usd${digitPart}s1`,    // All lowercase
        `USD${digitPart}s1`,    // Mixed case
        
        // With original format
        `US-D${digitPart}-S`,   // Original with hyphens
      ];
      
      // Add all variants to possible formats
      possibleFormats.push(...designVariants);
      
      console.log(`🎨 Generated ${designVariants.length} design patent variants`);
    }
    
    // ENHANCED Utility patent handling (ends with B1 or B2)
    if (baseFormattedId.match(/B[12]$/i)) {
      console.log(`⚙️ Utility patent detected: ${patentId}`);
      
      // Try both B1 and B2 variants
      if (baseFormattedId.match(/B1$/i)) {
        const alternateB = baseFormattedId.replace(/B1$/i, 'B2');
        possibleFormats.push(alternateB);
        console.log(`⚙️ Added utility patent variant: ${alternateB}`);
      } else if (baseFormattedId.match(/B2$/i)) {
        const alternateB = baseFormattedId.replace(/B2$/i, 'B1');
        possibleFormats.push(alternateB);
        console.log(`⚙️ Added utility patent variant: ${alternateB}`);
      }
    }
    
    // Remove duplicates while preserving order (prioritize most likely matches first)
    const uniqueFormats = [...new Set(possibleFormats)];
    
    console.log(`📋 Final search formats for ${patentId}:`);
    uniqueFormats.forEach((format, index) => {
      console.log(`   ${index + 1}. ${format}`);
    });
    
    return uniqueFormats;
  }

  /**
   * Find HTML file for a patent using flexible pattern matching
   * @param {string} directory - Directory to search in
   * @param {string} formattedId - Patent ID without hyphens (e.g., US12246105B2)
   * @returns {Promise<{path: string, exists: boolean}>} Result with path and exists flag
   */
  async findPatentHtmlInDirectory(directory, formattedId) {
    try {
      const items = await readdirAsync(directory);
      
      // ENHANCED SEARCH: Look for HTML files that START with the formatted ID
      const htmlFiles = items.filter(item => {
        return item.toLowerCase().startsWith(formattedId.toLowerCase()) && 
               item.toLowerCase().endsWith('.html');
      });
      
      if (htmlFiles.length > 0) {
        // Sort by preference: exact matches first, then by length (shorter is likely better)
        htmlFiles.sort((a, b) => {
          const exactMatchA = a.toLowerCase() === `${formattedId.toLowerCase()}.html`;
          const exactMatchB = b.toLowerCase() === `${formattedId.toLowerCase()}.html`;
          
          if (exactMatchA && !exactMatchB) return -1;
          if (!exactMatchA && exactMatchB) return 1;
          
          return a.length - b.length;
        });
        
        const selectedFile = htmlFiles[0];
        const fullPath = path.join(directory, selectedFile);
        
        console.log(`✅ Found HTML file: ${selectedFile} (from ${htmlFiles.length} candidates)`);
        return { path: fullPath, exists: true };
      }
      
      return { path: path.join(directory, `${formattedId}.html`), exists: false };
    } catch (error) {
      console.error(`❌ Error finding HTML file in ${directory}:`, error);
      return { path: path.join(directory, `${formattedId}.html`), exists: false };
    }
  }

  /**
   * Try to find HTML file in a directory using all possible formats with ENHANCED LOGGING
   * @param {string} directory - Directory to search in
   * @param {Array<string>} possibleIds - Array of possible formatted IDs
   * @returns {Promise<{path: string, exists: boolean}|null>} Result with path and exists flag
   */
  async tryFindHtmlInDirectory(directory, possibleIds) {
    console.log(`🔍 Searching in directory: ${path.basename(directory)}`);
    
    // First try flexible matching (handles Google Patents naming variations)
    for (const formattedId of possibleIds) {
      console.log(`   Trying format: ${formattedId}`);
      const result = await this.findPatentHtmlInDirectory(directory, formattedId);
      if (result.exists) {
        console.log(`🎯 SUCCESS: Found using format ${formattedId}`);
        return result;
      }
    }
    
    // Fallback to exact matching
    for (const formattedId of possibleIds) {
      const htmlPath = path.join(directory, `${formattedId}.html`);
      if (await existsAsync(htmlPath)) {
        console.log(`🎯 SUCCESS: Found exact match ${formattedId}.html`);
        return { path: htmlPath, exists: true };
      }
    }
    
    console.log(`❌ No matches found in ${path.basename(directory)}`);
    return null;
  }

  /**
   * ENHANCED: Find the HTML file for a patent with comprehensive search strategy
   * @param {string} patentId - Patent ID with hyphens (e.g., "US-D882015-S")
   * @returns {Promise<{path: string, exists: boolean}>} Object with path and exists flag
   */
  async findPatentHtmlFile(patentId) {
    console.log(`\n🔍 SEARCHING FOR: ${patentId}`);
    console.log('=' .repeat(50));
    
    // Get all possible formatted IDs with enhanced logic
    const possibleIds = this.formatPatentIdForFileSearch(patentId);
    
    // Search strategy: main directory first, then subdirectories
    console.log(`\n🏠 Step 1: Searching main directory`);
    const mainDirResult = await this.tryFindHtmlInDirectory(this.config.LOCAL_PATENT_DIR, possibleIds);
    if (mainDirResult) {
      console.log(`✅ FOUND in main directory: ${mainDirResult.path}`);
      return mainDirResult;
    }
    
    // Search in subdirectories
    console.log(`\n📁 Step 2: Searching subdirectories`);
    const subdirs = await this.findPatentSubdirectories();
    for (const dir of subdirs) {
      const subDirResult = await this.tryFindHtmlInDirectory(dir, possibleIds);
      if (subDirResult) {
        console.log(`✅ FOUND in ${path.basename(dir)}: ${subDirResult.path}`);
        return subDirResult;
      }
    }
    
    // Enhanced diagnostic search if not found
    console.log(`\n🔍 Step 3: Running diagnostic search`);
    await this.runDiagnosticSearch(patentId, possibleIds);
    
    console.log(`\n❌ FINAL RESULT: HTML file not found for ${patentId}`);
    console.log('=' .repeat(50));
    
    return { 
      path: path.join(this.config.LOCAL_PATENT_DIR, `${possibleIds[0]}.html`),
      exists: false 
    };
  }

  /**
   * NEW: Run diagnostic search to help understand why a file wasn't found
   * @param {string} patentId - Original patent ID
   * @param {Array<string>} triedFormats - Formats already tried
   */
  async runDiagnosticSearch(patentId, triedFormats) {
    console.log(`🔍 Running diagnostic search for ${patentId}...`);
    
    try {
      // Extract core identifier from the patent ID
      let coreId;
      if (patentId.includes('-D') && patentId.endsWith('-S')) {
        // Design patent: extract just the number
        const matches = patentId.match(/US-D(\d+)-S/);
        coreId = matches ? matches[1] : patentId.replace(/[^0-9]/g, '');
      } else {
        // Utility patent: extract number part
        coreId = patentId.replace(/[^0-9]/g, '');
      }
      
      console.log(`🔍 Searching for files containing: ${coreId}`);
      
      // Search all directories for any files containing the core ID
      const allDirs = [this.config.LOCAL_PATENT_DIR, ...(await this.findPatentSubdirectories())];
      
      for (const dir of allDirs) {
        try {
          const files = await readdirAsync(dir);
          const matches = files.filter(file => 
            file.includes(coreId) && file.endsWith('.html')
          );
          
          if (matches.length > 0) {
            console.log(`📄 Similar files in ${path.basename(dir)}:`);
            matches.forEach(match => console.log(`     - ${match}`));
          }
        } catch (error) {
          // Skip directories we can't read
        }
      }
    } catch (error) {
      console.error(`Error in diagnostic search: ${error.message}`);
    }
  }

  /**
   * Find supporting files directory for a patent (handles Google Patents naming)
   * @param {string} directory - Directory to search in
   * @param {string} formattedId - Patent ID without hyphens (e.g., US12246105B2)
   * @returns {Promise<{path: string, exists: boolean}>} Result with path and exists flag
   */
  async findSupportingDirectory(directory, formattedId) {
    try {
      const items = await readdirAsync(directory);
      
      // Look for directories that START with the formatted ID and end with "_files"
      const supportingDirs = items.filter(item => {
        return item.startsWith(formattedId) && item.endsWith('_files');
      });
      
      if (supportingDirs.length > 0) {
        // Sort by length (prefer exact match first, then shortest match)
        supportingDirs.sort((a, b) => {
          if (a === `${formattedId}_files`) return -1;
          if (b === `${formattedId}_files`) return 1;
          return a.length - b.length;
        });
        
        const selectedDir = supportingDirs[0];
        const fullPath = path.join(directory, selectedDir);
        
        // Verify it's actually a directory
        const stats = await statAsync(fullPath);
        if (stats.isDirectory()) {
          console.log(`Found supporting directory: ${selectedDir}`);
          return { path: fullPath, exists: true };
        }
      }
      
      return { path: path.join(directory, `${formattedId}_files`), exists: false };
    } catch (error) {
      console.error(`Error finding supporting directory in ${directory}:`, error);
      return { path: path.join(directory, `${formattedId}_files`), exists: false };
    }
  }

  /**
   * Delete all files in a directory
   * @param {string} directoryPath - Path to the directory
   * @returns {Promise<void>}
   */
  async cleanDirectory(directoryPath) {
    if (!fs.existsSync(directoryPath)) {
      return;
    }
    
    const files = await readdirAsync(directoryPath);
    
    for (const file of files) {
      const filePath = path.join(directoryPath, file);
      const fileStat = await statAsync(filePath);
      
      if (fileStat.isDirectory()) {
        // Recursively clean subdirectory
        await this.cleanDirectory(filePath);
        
        // Remove empty directory
        try {
          await rmdirAsync(filePath);
        } catch (error) {
          console.error(`Error removing directory ${filePath}:`, error.message);
        }
      } else {
        // Remove file
        try {
          await unlinkAsync(filePath);
        } catch (error) {
          console.error(`Error removing file ${filePath}:`, error.message);
        }
      }
    }
  }

  /**
   * Read HTML file content
   * @param {string} filePath - Path to the HTML file
   * @returns {Promise<string>} HTML content
   */
  async readHtmlFile(filePath) {
    return await readFileAsync(filePath, 'utf8');
  }

  /**
   * Create directory if it doesn't exist
   * @param {string} dirPath - Directory path
   * @returns {Promise<void>}
   */
  async ensureDirectoryExists(dirPath) {
    if (!fs.existsSync(dirPath)) {
      await mkdirAsync(dirPath, { recursive: true });
    }
  }

  /**
   * Copy a file from source to destination
   * @param {string} sourcePath - Source file path
   * @param {string} destPath - Destination file path
   * @returns {Promise<void>}
   */
  async copyFile(sourcePath, destPath) {
    await copyFileAsync(sourcePath, destPath);
  }

  /**
   * Check if file exists
   * @param {string} filePath - File path to check
   * @returns {Promise<boolean>} True if file exists
   */
  async fileExists(filePath) {
    return await existsAsync(filePath);
  }

  /**
   * Get file stats
   * @param {string} filePath - File path
   * @returns {Promise<fs.Stats>} File stats
   */
  async getStats(filePath) {
    return await statAsync(filePath);
  }

  /**
   * Read directory contents (OPTIMIZED - skips account_data subdirectories)
   * @param {string} dirPath - Directory path
   * @returns {Promise<string[]>} Array of file/directory names
   */
  async readDirectory(dirPath) {
    const allItems = await readdirAsync(dirPath);
    
    // Filter out account_data directories and other non-essential items for performance
    return allItems.filter(item => {
      // Skip account_data directories entirely (PERFORMANCE OPTIMIZATION)
      if (item === 'account_data' || item.includes('account_data')) {
        return false;
      }
      
      // Skip hidden files and system files
      if (item.startsWith('.') || item.startsWith('~')) {
        return false;
      }
      
      return true;
    });
  }
}

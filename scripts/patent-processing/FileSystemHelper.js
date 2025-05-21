// FileSystemHelper.js
// Handles file operations for patent processing

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
   * Format patent ID for file search with variant handling using regex
   * @param {string} patentId - Patent ID with hyphens
   * @returns {Array<string>} Array of possible formatted IDs
   */
  formatPatentIdForFileSearch(patentId) {
    // Basic format - remove hyphens
    const baseFormattedId = patentId.replace(/-/g, '');
    const possibleFormats = [baseFormattedId];
    
    // Design patent pattern: D + digits + S
    const designPatternRegex = /D(\d+)S$/i;
    const designMatch = baseFormattedId.match(designPatternRegex);
    
    if (designMatch) {
      console.log(`Found design patent pattern in ${patentId} (base: ${baseFormattedId})`);
      // Extract the digit part
      const digitPart = designMatch[1];
      
      // Add common variants (S1, S2)
      for (let i = 1; i <= 3; i++) {
        const designVariant = `USD${digitPart}S${i}`;
        possibleFormats.push(designVariant);
        console.log(`Added design patent variant: ${designVariant}`);
      }
      
      // Add variants with lowercase 's' instead of 'S'
      possibleFormats.push(`USD${digitPart}s`);
      possibleFormats.push(`USD${digitPart}s1`);
      
      // Add variants with different casing
      possibleFormats.push(`usd${digitPart}S`);
      possibleFormats.push(`usd${digitPart}S1`);
      possibleFormats.push(`usd${digitPart}s`);
      possibleFormats.push(`usd${digitPart}s1`);
    }
    
    // Utility patent pattern: ends with B1 or B2
    if (baseFormattedId.match(/B[12]$/i)) {
      console.log(`Found utility patent pattern in ${patentId} (base: ${baseFormattedId})`);
      
      // Try both B1 and B2 variants
      if (baseFormattedId.match(/B1$/i)) {
        const alternateB = baseFormattedId.replace(/B1$/i, 'B2');
        possibleFormats.push(alternateB);
        console.log(`Added utility patent variant: ${alternateB}`);
      } else if (baseFormattedId.match(/B2$/i)) {
        const alternateB = baseFormattedId.replace(/B2$/i, 'B1');
        possibleFormats.push(alternateB);
        console.log(`Added utility patent variant: ${alternateB}`);
      }
    }
    
    console.log(`Generated ${possibleFormats.length} format(s) for ${patentId}: ${possibleFormats.join(', ')}`);
    return possibleFormats;
  }

  /**
   * Try to find HTML file in a directory using all possible formats
   * @param {string} directory - Directory to search in
   * @param {Array<string>} possibleIds - Array of possible formatted IDs
   * @returns {Promise<{path: string, exists: boolean}>} Result with path and exists flag
   */
  async tryFindHtmlInDirectory(directory, possibleIds) {
    for (const formattedId of possibleIds) {
      const htmlPath = path.join(directory, `${formattedId}.html`);
      if (await existsAsync(htmlPath)) {
        console.log(`Found HTML file for format ${formattedId} at ${htmlPath}`);
        return { path: htmlPath, exists: true };
      }
    }
    return null;
  }

  /**
   * Find HTML files by globbing pattern in directory
   * @param {string} directory - Directory to search in
   * @param {string} pattern - Glob pattern (simplified regex)
   * @returns {Promise<Array<string>>} Array of matching file paths
   */
  async findFilesByPattern(directory, pattern) {
    try {
      const files = await readdirAsync(directory);
      const regex = new RegExp(pattern, 'i');
      return files.filter(file => regex.test(file)).map(file => path.join(directory, file));
    } catch (error) {
      console.error(`Error searching for files in ${directory}: ${error.message}`);
      return [];
    }
  }

  /**
   * Find the HTML file for a patent
   * @param {string} patentId - Patent ID with hyphens
   * @returns {Promise<{path: string, exists: boolean}>} Object with path and exists flag
   */
  async findPatentHtmlFile(patentId) {
    // Special handling for US-D882015-S (troubleshooting)
    if (patentId === 'US-D882015-S') {
      const found = await this.findSpecificDesignPatent(patentId);
      if (found) {
        return found;
      }
    }
    
    // Get all possible formatted IDs
    const possibleIds = this.formatPatentIdForFileSearch(patentId);
    
    // First try main directory with all possible formats
    const mainDirResult = await this.tryFindHtmlInDirectory(this.config.LOCAL_PATENT_DIR, possibleIds);
    if (mainDirResult) {
      return mainDirResult;
    }
    
    // If not found, search in subdirectories
    const subdirs = await this.findPatentSubdirectories();
    for (const dir of subdirs) {
      const subDirResult = await this.tryFindHtmlInDirectory(dir, possibleIds);
      if (subDirResult) {
        return subDirResult;
      }
    }
    
    // If still not found, log the issue and return not exists
    console.warn(`HTML file not found for ${patentId} (tried formats: ${possibleIds.join(', ')})`);
    
    // Check if any files in subdirectories have similar names
    await this.searchForSimilarFiles(patentId, possibleIds);
    
    return { 
      path: path.join(this.config.LOCAL_PATENT_DIR, `${possibleIds[0]}.html`),
      exists: false 
    };
  }

  /**
   * Special handling to find the troublesome US-D882015-S patent
   * @param {string} patentId - Patent ID (US-D882015-S)
   * @returns {Promise<{path: string, exists: boolean}|null>} Result or null if not found
   */
  async findSpecificDesignPatent(patentId) {
    console.log(`🔍 Special handling for troublesome patent: ${patentId}`);
    
    // Extract core components
    const matches = patentId.match(/US-D(\d+)-S/);
    if (!matches) return null;
    
    const digitPart = matches[1]; // 882015
    
    // Define various patterns to try
    const patterns = [
      // Standard formats
      `USD${digitPart}S.html`,
      `USD${digitPart}S1.html`,
      // Special formats
      `US-D${digitPart}-S.html`,
      `US-D${digitPart}-S1.html`,
      // More general pattern to find ANY file containing the digit part
      `.*${digitPart}.*\\.html`
    ];
    
    console.log(`Trying specialized patterns for ${patentId}: ${patterns.join(', ')}`);
    
    // Helper to log all HTML files in a directory
    const logAllHtmlFiles = async (dir) => {
      try {
        const allFiles = await readdirAsync(dir);
        const htmlFiles = allFiles.filter(f => f.endsWith('.html'));
        if (htmlFiles.length > 0) {
          console.log(`All HTML files in ${path.basename(dir)}: ${htmlFiles.join(', ')}`);
        }
      } catch (error) {
        console.error(`Error listing HTML files in ${dir}: ${error.message}`);
      }
    };
    
    // Exhaustive search through all directories
    // First check main directory
    console.log(`Searching main directory for US-D${digitPart}-S files`);
    await logAllHtmlFiles(this.config.LOCAL_PATENT_DIR);
    
    for (const pattern of patterns) {
      const mainMatches = await this.findFilesByPattern(this.config.LOCAL_PATENT_DIR, pattern);
      if (mainMatches.length > 0) {
        console.log(`🎯 Found matches in main directory using pattern ${pattern}: ${mainMatches.join(', ')}`);
        return { path: mainMatches[0], exists: true };
      }
    }
    
    // Then check all subdirectories
    const subdirs = await this.findPatentSubdirectories();
    for (const dir of subdirs) {
      console.log(`Searching subdirectory ${path.basename(dir)} for US-D${digitPart}-S files`);
      await logAllHtmlFiles(dir);
      
      for (const pattern of patterns) {
        const subMatches = await this.findFilesByPattern(dir, pattern);
        if (subMatches.length > 0) {
          console.log(`🎯 Found matches in ${path.basename(dir)} using pattern ${pattern}: ${subMatches.join(', ')}`);
          return { path: subMatches[0], exists: true };
        }
      }
    }
    
    console.log(`❌ Special handling failed to find any matches for ${patentId}`);
    return null;
  }

  /**
   * Search for similar HTML files to help diagnose issues
   * @param {string} patentId - Original patent ID
   * @param {Array<string>} triedFormats - Formats already tried
   * @returns {Promise<void>}
   */
  async searchForSimilarFiles(patentId, triedFormats) {
    try {
      // Extract the core part of the ID (remove prefixes, suffixes)
      let baseId;
      
      // For design patents, extract just the digit part
      if (patentId.includes('-D') && patentId.endsWith('-S')) {
        const matches = patentId.match(/US-D(\d+)-S/);
        if (matches) {
          baseId = matches[1]; // Just the digits
        } else {
          baseId = patentId.replace(/-/g, '').replace(/[BS][0-9]*$/i, '');
        }
      } else {
        baseId = patentId.replace(/-/g, '').replace(/[BS][0-9]*$/i, '');
      }
      
      const regex = new RegExp(`.*${baseId}.*\\.html$`, 'i');
      
      console.log(`Searching for similar files matching pattern: ${regex}`);
      
      // Check main directory
      const mainDirFiles = await this.readDirectory(this.config.LOCAL_PATENT_DIR);
      const mainMatches = mainDirFiles.filter(file => regex.test(file));
      
      if (mainMatches.length > 0) {
        console.log(`Found similar files in main directory: ${mainMatches.join(', ')}`);
      }
      
      // Check subdirectories
      const subdirs = await this.findPatentSubdirectories();
      for (const dir of subdirs) {
        const subDirFiles = await this.readDirectory(dir);
        const subMatches = subDirFiles.filter(file => regex.test(file));
        
        if (subMatches.length > 0) {
          console.log(`Found similar files in ${path.basename(dir)}: ${subMatches.join(', ')}`);
        }
      }
    } catch (error) {
      console.error(`Error searching for similar files: ${error.message}`);
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
   * Read directory contents
   * @param {string} dirPath - Directory path
   * @returns {Promise<string[]>} Array of file/directory names
   */
  async readDirectory(dirPath) {
    return await readdirAsync(dirPath);
  }
}

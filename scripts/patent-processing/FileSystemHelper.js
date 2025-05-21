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
   * Find the HTML file for a patent
   * @param {string} patentId - Patent ID with hyphens
   * @returns {Promise<{path: string, exists: boolean}>} Object with path and exists flag
   */
  async findPatentHtmlFile(patentId) {
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
   * Search for similar HTML files to help diagnose issues
   * @param {string} patentId - Original patent ID
   * @param {Array<string>} triedFormats - Formats already tried
   * @returns {Promise<void>}
   */
  async searchForSimilarFiles(patentId, triedFormats) {
    try {
      const baseId = patentId.replace(/-/g, '').replace(/[BS][0-9]*$/i, '');
      const regex = new RegExp(`^${baseId}.*\\.html$`, 'i');
      
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

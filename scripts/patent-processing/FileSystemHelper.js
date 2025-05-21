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
   * Find the HTML file for a patent
   * @param {string} patentId - Patent ID with hyphens
   * @returns {Promise<{path: string, exists: boolean}>} Object with path and exists flag
   */
  async findPatentHtmlFile(patentId) {
    const formattedId = patentId.replace(/-/g, '');
    
    // Search in main directory first
    let htmlPath = path.join(this.config.LOCAL_PATENT_DIR, `${formattedId}.html`);
    let exists = await existsAsync(htmlPath);
    
    // If not found, search in subdirectories
    if (!exists) {
      const subdirs = await this.findPatentSubdirectories();
      for (const dir of subdirs) {
        const subHtmlPath = path.join(dir, `${formattedId}.html`);
        if (await existsAsync(subHtmlPath)) {
          htmlPath = subHtmlPath;
          exists = true;
          break;
        }
      }
    }
    
    return { path: htmlPath, exists };
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

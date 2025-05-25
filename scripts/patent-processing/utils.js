// utils.js
// Utility classes for better error handling and logging

/**
 * Custom error class for patent processing errors
 */
export class ProcessingError extends Error {
  constructor(message, patentId = null, originalError = null) {
    super(message);
    this.name = 'ProcessingError';
    this.patentId = patentId;
    this.originalError = originalError;
    this.timestamp = new Date().toISOString();
    
    // Maintain proper stack trace for V8
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ProcessingError);
    }
  }
  
  /**
   * Get a formatted error message with context
   * @returns {string} Formatted error message
   */
  getFormattedMessage() {
    let message = `[${this.timestamp}] ${this.name}: ${this.message}`;
    
    if (this.patentId) {
      message += ` (Patent: ${this.patentId})`;
    }
    
    if (this.originalError) {
      message += `\nCaused by: ${this.originalError.message}`;
    }
    
    return message;
  }
}

/**
 * Logging utility with different levels and formatting
 */
export class Logger {
  constructor(verbose = false, context = 'PatentProcessor') {
    this.verbose = verbose;
    this.context = context;
  }
  
  /**
   * Format message with timestamp and context
   * @param {string} level - Log level
   * @param {string} message - Message to log
   * @returns {string} Formatted message
   */
  formatMessage(level, message) {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level}] [${this.context}] ${message}`;
  }
  
  /**
   * Log info message
   * @param {string} message - Message to log
   * @param {...any} args - Additional arguments
   */
  info(message, ...args) {
    console.log(this.formatMessage('INFO', message), ...args);
  }
  
  /**
   * Log debug message (only if verbose is enabled)
   * @param {string} message - Message to log
   * @param {...any} args - Additional arguments
   */
  debug(message, ...args) {
    if (this.verbose) {
      console.log(this.formatMessage('DEBUG', message), ...args);
    }
  }
  
  /**
   * Log error message
   * @param {string} message - Message to log
   * @param {Error} error - Error object (optional)
   * @param {...any} args - Additional arguments
   */
  error(message, error = null, ...args) {
    const errorMessage = this.formatMessage('ERROR', message);
    console.error(errorMessage, ...args);
    
    if (error) {
      if (error instanceof ProcessingError) {
        console.error(error.getFormattedMessage());
      } else {
        console.error('Error details:', error);
      }
    }
  }
  
  /**
   * Log warning message
   * @param {string} message - Message to log
   * @param {...any} args - Additional arguments
   */
  warn(message, ...args) {
    console.warn(this.formatMessage('WARN', message), ...args);
  }
  
  /**
   * Log success message with emoji
   * @param {string} message - Message to log
   * @param {...any} args - Additional arguments
   */
  success(message, ...args) {
    console.log(this.formatMessage('SUCCESS', `✅ ${message}`), ...args);
  }
  
  /**
   * Log progress message
   * @param {string} message - Message to log
   * @param {number} current - Current progress
   * @param {number} total - Total items
   * @param {...any} args - Additional arguments
   */
  progress(message, current, total, ...args) {
    const percentage = Math.round((current / total) * 100);
    const progressMessage = `${message} (${current}/${total} - ${percentage}%)`;
    console.log(this.formatMessage('PROGRESS', progressMessage), ...args);
  }
  
  /**
   * Create a timer for measuring performance
   * @param {string} label - Timer label
   * @returns {Object} Timer object with end method
   */
  timer(label) {
    const startTime = Date.now();
    this.debug(`Timer started: ${label}`);
    
    return {
      end: () => {
        const duration = Date.now() - startTime;
        this.info(`Timer ended: ${label} - ${duration}ms`);
        return duration;
      }
    };
  }
}

/**
 * Retry utility for handling transient failures
 * @param {Function} fn - Function to retry
 * @param {number} maxRetries - Maximum number of retries
 * @param {number} delay - Delay between retries in ms
 * @param {Logger} logger - Logger instance
 * @returns {Promise} Promise that resolves with the function result
 */
export async function retry(fn, maxRetries = 3, delay = 1000, logger = null) {
  let lastError;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      if (logger) {
        logger.warn(`Attempt ${attempt}/${maxRetries} failed: ${error.message}`);
      }
      
      if (attempt === maxRetries) {
        break;
      }
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, delay));
      delay *= 2; // Exponential backoff
    }
  }
  
  throw new ProcessingError(
    `Failed after ${maxRetries} attempts`,
    null,
    lastError
  );
}

/**
 * Validate environment variables with default values
 * @param {Object} envVars - Object with env var names and their default values
 * @returns {Object} Object with validated environment variables
 */
export function validateEnvironment(envVars) {
  const result = {};
  
  for (const [key, defaultValue] of Object.entries(envVars)) {
    const envValue = process.env[key];
    
    if (envValue === undefined) {
      result[key] = defaultValue;
    } else {
      // Try to parse boolean and number values
      if (defaultValue === true || defaultValue === false) {
        result[key] = envValue.toLowerCase() === 'true';
      } else if (typeof defaultValue === 'number') {
        const parsed = parseInt(envValue);
        result[key] = isNaN(parsed) ? defaultValue : parsed;
      } else {
        result[key] = envValue;
      }
    }
  }
  
  return result;
}

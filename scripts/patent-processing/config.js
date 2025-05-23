// config.js
// Configuration settings for patent processing

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const config = {
  LOCAL_PATENT_DIR: process.env.PATENT_COLLECTION_DIR || '/Users/carltanner/Documents/projects/2025_04_08__dobbiniplaw_com/patent_collection',
  CENTRAL_IMAGES_DIR: null, // Will be set below
  PUBLIC_PATENTS_DIR: path.join(__dirname, '../../public/images/patents')
};

// Set dependent paths
config.CENTRAL_IMAGES_DIR = path.join(config.LOCAL_PATENT_DIR, 'images');

export default config;

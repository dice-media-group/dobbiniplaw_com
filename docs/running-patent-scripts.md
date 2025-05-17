# Running the Patent Processing Script on ESM Project

This guide explains how to run the patent processing scripts in the ES Module-based project structure.

## Updated Scripts

We've converted the patent processing scripts to ES modules to match the project's `"type": "module"` setting in package.json. The following scripts are now available:

```bash
# Basic patent processing (extracts data from TrophyWall.txt)
npm run process-patents

# Process patents with placeholder images
npm run process-patents-with-images

# Process patents with image downloads from Google Patents (use sparingly)
npm run process-patents-with-downloads

# Process patents using Firefox-downloaded files
npm run process-patents-firefox

# Test Firefox processing with just 5 patents
npm run process-patents-firefox-test
```

## Directory Structure for Firefox Downloads

For the Firefox-based workflow, organize your files as follows:

```
~/Documents/projects/2025_04_08__dobbiniplaw_com/patent_collection/
├── US12270996B2.html               # Patent HTML pages downloaded with Firefox
├── US12270996B2_files/             # Supporting files created by Firefox
├── images/                         # Central images directory
│   ├── US12270996B2-20250408-D00001.png  # Saved with original filenames from Google Patents
│   ├── US12270996B2-20250408-D00002.png
│   └── ...
```

## Step-by-Step Usage

1. **Install Dependencies**
   ```bash
   npm install cheerio pdf-parse axios
   ```

2. **Create Collection Directories**
   ```bash
   mkdir -p ~/Documents/projects/2025_04_08__dobbiniplaw_com/patent_collection/images
   ```

3. **Download HTML Files with Firefox**
   - Visit Google Patents (e.g., https://patents.google.com/patent/US12270996B2)
   - Save page as "Web Page, complete"
   - Use the patent ID without hyphens as filename (e.g., US12270996B2.html)

4. **Download Patent Images**
   - Click on figures to view full size
   - Right-click and "Save Image As..."
   - Save to the central images directory
   - Keep the default filename (e.g., US12270996B2-20250408-D00001.png)

5. **Run the Test Processor**
   ```bash
   npm run process-patents-firefox-test
   ```

6. **Process All Patents**
   ```bash
   npm run process-patents-firefox
   ```

## Custom Directory Path

If your patent collection is in a different location, you can specify it with an environment variable:

```bash
PATENT_COLLECTION_DIR=/path/to/your/collection npm run process-patents-firefox
```

## Troubleshooting

If you encounter issues:

1. **Check that TrophyWall.txt exists**
   ```bash
   ls -la ./source\ examples/TrophyWall.txt
   ```

2. **Verify Node.js Version**
   ```bash
   node --version
   ```
   Ensure you're using Node.js 14 or higher for ES Modules support.

3. **Check Patent Collection Directory**
   ```bash
   ls -la ~/Documents/projects/2025_04_08__dobbiniplaw_com/patent_collection
   ls -la ~/Documents/projects/2025_04_08__dobbiniplaw_com/patent_collection/images
   ```

4. **Inspect Logs for Errors**
   The script provides detailed logging that can help identify issues with specific patents.

# Using Firefox to Download Patents for Processing

This guide explains how to download patent pages with Firefox and process them for the Netflix-style patent browser.

## Step 1: Create the Patent Collection Directory

First, create a directory to store your downloaded patent pages:

```bash
mkdir -p /Users/carltanner/Documents/projects/2025_04_08__dobbiniplaw_com/patent_collection
```

## Step 2: Download Patents with Firefox

For each patent you want to include:

1. Visit Google Patents with the patent ID:
   ```
   https://patents.google.com/patent/US12270996B2
   ```
   (Replace the ID with each patent ID from TrophyWall.pdf)

2. Once the page loads, go to **File → Save Page As...**

3. In the save dialog:
   - Make sure "Save as type" is set to "Web Page, complete"
   - Save to your patent collection directory
   - Use the patent ID (without hyphens) as the filename
   
   Example: `/Users/carltanner/Documents/projects/2025_04_08__dobbiniplaw_com/patent_collection/US12270996B2.html`

4. Firefox will save:
   - The HTML file (e.g., `US12270996B2.html`)
   - A folder with supporting files (e.g., `US12270996B2_files/`)

5. Repeat for each patent you want to include in your browser

## Step 3: Process the Firefox-Downloaded Patents

Run the Firefox processor with our test mode first to verify everything works:

```bash
npm run process-patents-firefox-test
```

This will process the first 5 patents in TrophyWall.pdf and check if they exist in your download directory.

Once you confirm it's working, process all downloaded patents:

```bash
npm run process-patents-firefox
```

## How the Process Works

The script:

1. Reads the patent list from TrophyWall.txt
2. For each patent ID:
   - Looks for the HTML file in your collection directory
   - Extracts the abstract from the HTML
   - Finds patent images in the supporting files directory
   - Selects the best images (full-size figures, not thumbnails)
   - Copies them to your project's public directory

3. Categorizes all patents based on keywords
4. Generates JSON files with patent data and image paths

## Tips for Efficient Downloading

1. **Start with a small test set**:
   Download 5-10 patents first and run the test script to confirm everything works.

2. **Focus on featured patents first**:
   Start with patents from each category that will be featured in your browser.

3. **Look for image-rich patents**:
   Patents with more images (see "Image Pages" column in TrophyWall.pdf) will provide better visual content.

4. **Organize by category**:
   Download a few patents from each category to ensure your browser has balanced content.

5. **Use Firefox's download manager**:
   You can queue up multiple downloads in Firefox.

## Troubleshooting

If you encounter issues:

1. **Missing HTML files**:
   - Make sure files are saved with the correct name format (patent ID without hyphens)
   - Verify the correct collection directory path

2. **No images found**:
   - Check if the supporting files directory exists (named `[patentID]_files`)
   - Examine the files in the supporting directory manually

3. **Wrong images selected**:
   - The script tries to select the largest image files that likely contain patent figures
   - You can manually edit the script's image selection logic if needed

4. **Environment variable issues**:
   - If your collection directory is different, set the PATENT_COLLECTION_DIR environment variable:
     ```bash
     PATENT_COLLECTION_DIR=/path/to/your/directory npm run process-patents-firefox
     ```

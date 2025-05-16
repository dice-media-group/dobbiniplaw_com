# Streamlined Patent Collection Workflow

This guide explains the most efficient workflow for collecting and processing patent data for the Netflix-style browser, using a central image repository.

## Directory Structure

```
/Users/carltanner/Documents/projects/2025_04_08__dobbiniplaw_com/patent_collection/
├── US12270996B2.html               # Patent HTML files
├── US12260863B1.html
├── images/                         # Central image directory
│   ├── US12270996B2-20250408-D00001.png
│   ├── US12270996B2-20250408-D00002.png
│   ├── US12260863B1-20250325-D00001.png
│   └── ...
```

## Step 1: Setup (One-Time)

Create the collection directories:

```bash
mkdir -p ~/Documents/projects/2025_04_08__dobbiniplaw_com/patent_collection
mkdir -p ~/Documents/projects/2025_04_08__dobbiniplaw_com/patent_collection/images
```

## Step 2: Collect HTML Files (For Abstracts)

1. Visit Google Patents for a patent (e.g., https://patents.google.com/patent/US12270996B2)
2. Use Firefox to save the page:
   - File → Save Page As...
   - Choose "Web Page, complete"
   - Save to the patent collection directory
   - Use the patent ID without hyphens as the filename (e.g., US12270996B2.html)

## Step 3: Collect Images (Streamlined Method)

1. Visit Google Patents for a patent
2. Click on a figure to view it full-size
3. Right-click and select "Save Image As..."
4. **Important:** Don't change the default filename! Google Patents uses the standardized format `US12270996B2-20250408-D00001.png`
5. Save to the central `images` directory
6. Repeat for each important figure

The standard filename format contains:
- Patent ID (US12270996B2)
- Publication date (20250408)
- Figure number (D00001)

This format allows our script to automatically match images to patents and maintain the correct figure order.

## Step 4: Process the Collection

Run the enhanced processor:

```bash
# Test with a few patents first
npm run process-patents-firefox-test

# Then process all patents
npm run process-patents-firefox
```

## Benefits of This Workflow

1. **Single destination for images** - No need to create separate directories for each patent
2. **No manual renaming** - Use default filenames from Google Patents
3. **Automatic organization** - Script matches images to patents based on the filename
4. **Flexible collection** - Can collect some or all figures per patent
5. **Incremental approach** - Easy to add more patents or images later

## Tips for Efficient Collection

1. **Prioritize important patents** - Start with 3-5 patents from each category
2. **Batch download by category** - Work through one category at a time
3. **Focus on key figures** - For most patents, the first 2-3 figures are sufficient
4. **Check image quality** - Ensure images are clear and properly represent the patent
5. **Use Firefox tabs efficiently** - Open multiple patents in tabs, then save one by one

## Troubleshooting

- **HTML files not found** - Make sure you're saving with the correct filename (patent ID without hyphens)
- **Images not matched** - Check that the filename starts with the correct patent ID
- **Poor image quality** - Try downloading from USPTO instead of Google Patents
- **Missing abstracts** - Make sure the HTML file includes the abstract section

This workflow balances efficiency with quality, allowing you to quickly build a comprehensive patent collection for your Netflix-style browser.

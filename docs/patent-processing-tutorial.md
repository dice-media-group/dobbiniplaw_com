# Patent Browser Data Processing Tutorial

This guide explains how to process patent data from the TrophyWall.pdf file and generate the necessary JSON files for the Netflix-style patent browser.

## Prerequisites

Before running the patent processing script, install the required dependencies:

```bash
npm install
```

This will install the necessary packages like pdf-lib, pdf-parse, axios, and cheerio.

## Available Scripts

We've created several scripts to process patent data with different levels of functionality:

1. **Basic Patent Processing**
   ```bash
   npm run process-patents
   ```
   This script parses the patent list from TrophyWall.pdf, categorizes patents, and creates basic JSON files with dummy abstracts and image placeholders.

2. **Patent Processing with Placeholder Images**
   ```bash
   npm run process-patents-with-images
   ```
   This script does everything the basic script does, plus it creates placeholder image files for each patent based on the number of images mentioned in the PDF.

3. **Patent Processing with Image Downloads**
   ```bash
   npm run process-patents-with-downloads
   ```
   This script does everything above, plus it attempts to fetch real patent images and abstracts from Google Patents. Note that this might be slow and could be rate-limited by Google.

## Step-by-Step Usage

1. Make sure you have the TrophyWall.pdf file in the correct location:
   ```
   /source examples/TrophyWall.pdf
   ```

2. For initial testing, we're using a text representation of the PDF in:
   ```
   /source examples/TrophyWall.txt
   ```

3. Run one of the processing scripts:
   ```bash
   npm run process-patents
   ```

4. Check the output in the following locations:
   - `/content/patents/categories.json`: List of all categories
   - `/content/patents/[category].json`: JSON files for each category (firearms.json, electronics.json, etc.)
   - `/content/patents/all-patents.json`: Complete list of all patents

5. If you ran the script with image downloads, check for downloaded images in:
   ```
   /public/images/patents/[patent-id]/fig1.jpg
   ```

## Generated Files Structure

The script generates JSON files with the following structure:

### categories.json
```json
{
  "categories": [
    {
      "id": "firearms",
      "name": "Firearms & Accessories",
      "description": "Patents related to firearms",
      "featured": true,
      "order": 1,
      "patentCount": 42
    },
    ...
  ]
}
```

### [category].json (e.g., firearms.json)
```json
{
  "categoryId": "firearms",
  "patents": [
    {
      "id": "US-10794647-B2",
      "title": "Bolt conversion apparatus for firearm",
      "publicationDate": "2020-10-06",
      "imagePages": 15,
      "abstract": "A bolt conversion apparatus for a firearm...",
      "featured": true,
      "images": ["/images/patents/US-10794647-B2/fig1.jpg", ...]
    },
    ...
  ]
}
```

## Troubleshooting

If you encounter issues with the script:

1. **PDF Parsing Issues**: We're currently using a text representation of the PDF. If needed, we can update the script to directly parse the PDF using pdf-parse.

2. **Google Patents Access**: Google Patents may rate-limit or block automated access. Consider adding delays between requests or using a different source for patent information.

3. **Image Download Failures**: If images fail to download, the script will fall back to placeholder images. Check the console output for specific errors.

4. **Missing Dependencies**: Ensure all dependencies are properly installed with `npm install`.

## Future Enhancements

In the next phase, we'll:

1. Improve the categorization algorithm using more sophisticated methods like NLP
2. Add support for batch processing to handle large numbers of patents
3. Implement proper caching of Google Patents requests to avoid rate limiting
4. Create custom patent image placeholder generation
5. Add support for exporting data in different formats (CSV, Excel)

## Fetching Additional Patent Details

If you want to fetch more detailed information about patents, consider:

1. Using the USPTO API for official patent data
2. Implementing a more robust Google Patents scraper with throttling
3. Adding support for other patent databases like Espacenet or PatFT

For any questions or issues, please contact the development team.

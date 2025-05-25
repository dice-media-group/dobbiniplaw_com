# Patent Image Update Script

## Overview

The `update-patent-images.js` script is designed to update image references in your patent JSON files after you've updated or added new patent images. This is much faster than running the full patent processing pipeline when you only need to update images.

## When to Use This Script

Use this script when you:
- Add new patent images to the `public/images/patents/` directory
- Replace existing patent images with better quality versions
- Reorganize or rename patent image files
- Want to refresh image references without reprocessing all patent metadata

## Quick Start

```bash
# Update all patent images
node scripts/update-patent-images.js

# Update a specific patent
node scripts/update-patent-images.js --patent US-12270996-B2

# Preview changes without making them
node scripts/update-patent-images.js --dry-run

# Verbose output
node scripts/update-patent-images.js --verbose
```

## Image Directory Structure

The script expects images to be organized like this:

```
public/images/patents/
├── US-12270996-B2/
│   ├── fig1.png          # Regular/thumbnail images
│   ├── fig2.png
│   ├── fig3.png
│   └── hires/            # High-resolution images (optional)
│       ├── fig1.png
│       ├── fig2.png
│       └── fig3.png
├── US-12260863-B1/
│   ├── fig1.png
│   └── fig2.png
└── placeholder.svg       # Fallback for patents without images
```

## Supported Image Formats

- PNG (recommended)
- JPG/JPEG
- GIF
- SVG
- WebP

## Figure Number Detection

The script automatically detects figure numbers from filenames:
- `fig1.png`, `fig2.png` → Figure 1, Figure 2
- `figure1.png`, `figure2.png` → Figure 1, Figure 2
- `D00001.png`, `D00002.png` → Figure 1, Figure 2 (USPTO format)
- `1.png`, `2.png` → Figure 1, Figure 2

## Command Options

| Option | Description |
|--------|-------------|
| `--patent US-XXXXXXX-XX` | Update only the specified patent |
| `--verbose` or `-v` | Show detailed processing information |
| `--dry-run` or `-n` | Preview changes without saving them |
| `--help` or `-h` | Show help information |

## What the Script Does

1. **Scans Image Directories**: Looks through each patent's image directory
2. **Detects Images**: Finds regular and high-resolution images by figure number
3. **Updates JSON Files**: Updates image references in patent data files
4. **Preserves Metadata**: Keeps all other patent data (abstracts, inventors, etc.)
5. **Sorts by Figure**: Orders images by figure number (1, 2, 3, ...)

## Example Output

```
🖼️  Patent Image Update Script

📋 Updating images for all patents
📋 Found 8 category files to process
✅ Updated firearms.json: 45/67 patents
✅ Updated medical.json: 12/23 patents
✅ Updated electronics.json: 8/15 patents
📋 Processing all-patents.json...
✅ Updated all-patents.json: 65/105 patents

============================================================
✅ IMAGE UPDATE COMPLETE:
✅ - Updated 65 patent image references
✅ - Out of 105 total patents processed
============================================================

💡 Next Steps:
1. The patent browser will automatically show updated images
2. If running in dev mode, the changes should be visible immediately
3. For production, rebuild and deploy your site
```

## Integration with Patent Browser

After running this script, your patent browser (`pages/patent-browser.vue`) will automatically display the updated images because it loads data from the JSON files this script updates.

The image format used in the JSON files:

```json
{
  "images": [
    {
      "thumbnail": "/images/patents/US-12270996-B2/fig1.png",
      "hires": "/images/patents/US-12270996-B2/hires/fig1.png",
      "caption": "Figure 1"
    },
    {
      "thumbnail": "/images/patents/US-12270996-B2/fig2.png", 
      "hires": "/images/patents/US-12270996-B2/hires/fig2.png",
      "caption": "Figure 2"
    }
  ]
}
```

## Workflow Examples

### Adding New Patent Images

1. Place images in the correct directory:
   ```bash
   mkdir -p public/images/patents/US-NEW123456-B2/hires
   cp ~/patent-images/fig*.png public/images/patents/US-NEW123456-B2/
   cp ~/patent-images/hires/fig*.png public/images/patents/US-NEW123456-B2/hires/
   ```

2. Update the patent references:
   ```bash
   node scripts/update-patent-images.js --patent US-NEW123456-B2 --verbose
   ```

3. Check the results in your patent browser

### Updating Multiple Patents

1. Update image files for multiple patents
2. Run the script for all patents:
   ```bash
   node scripts/update-patent-images.js --verbose
   ```

### Safe Testing

Always test with dry-run first:
```bash
node scripts/update-patent-images.js --dry-run --verbose
```

## Troubleshooting

### No Images Found
- Check that patent directory exists: `public/images/patents/US-XXXXXXX-XX/`
- Verify image files have supported extensions
- Ensure figure numbers are detectable in filenames

### Script Errors
- Verify Node.js can access the directories
- Check that JSON files are valid and not corrupted
- Run with `--verbose` to see detailed error messages

### Images Not Appearing in Browser
- Clear browser cache
- Check browser developer tools for 404 errors
- Verify image paths in generated JSON files
- Restart development server if using one

## Performance

This script is designed to be fast and efficient:
- Only updates image references, doesn't reprocess patent metadata
- Processes patents in parallel when possible
- Skips unchanged patents automatically
- Typical run time: 1-5 seconds for 100+ patents

## Files Modified

The script updates these JSON files in the `data/patents/` directory:
- `data/patents/firearms.json`
- `data/patents/medical.json`
- `data/patents/electronics.json`
- `data/patents/manufacturing.json`
- `data/patents/tools.json`
- `data/patents/sports.json`
- `data/patents/household.json`
- `data/patents/other.json`
- `data/patents/all-patents.json`

**Note**: The script preserves all existing patent metadata and only updates the `images` array for each patent.

## Directory Structure Change

**Important**: Patent JSON files have been moved from `content/patents/` to `data/patents/` to avoid conflicts with @nuxt/content's SQLite database. The patent browser automatically loads from the new location.

```
data/patents/           # Patent JSON data files (NEW LOCATION)
├── categories.json
├── firearms.json
├── medical.json
├── electronics.json
└── ...

content/patents/        # Patent markdown files (UNCHANGED)
├── 1-led-chip.md
├── 2-magazine-grip.md
└── ...

public/images/patents/  # Patent images (UNCHANGED)
├── US-12270996-B2/
└── ...
```

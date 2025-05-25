# Dobbin IP Law Website

This is a Nuxt 3 based website for Dobbin IP Law, converted from the original WordPress site.

## 🎯 Patent Systems Overview

This website features **two patent management systems**:

### 🔥 **New: Comprehensive Patent Processing System** (Recommended)
- **Netflix-style patent browser** at `/patent-browser`
- **256+ patents** automatically categorized and processed
- **Enhanced image processing** with high-resolution support
- **Comprehensive metadata extraction** from HTML files
- **Smart categorization** into technology areas

### 📊 **Legacy: Simple Patent Carousel** (Prior Work page)
- **Manual patent curation** for highlights
- **Simple carousel display** on Prior Work page
- **Static JSON-based** configuration

---

## 🚀 Comprehensive Patent Processing System

### Quick Start

```bash
# Test the system (recommended first run)
npm run process-patents-improved-test

# Process all patents
npm run process-patents-improved

# Check configuration
npm run test-patent-config
```

### Features
- ✅ **Automatic PDF extraction** from TrophyWall.pdf
- ✅ **Smart categorization** (Firearms, Electronics, Medical, etc.)
- ✅ **Image processing** with high-res support
- ✅ **Missing file detection** and reporting
- ✅ **Batch processing** for performance
- ✅ **Comprehensive error handling**

### Generated Files
```
content/patents/
├── categories.json              # Category definitions
├── firearms.json               # Firearms & Accessories patents
├── electronics.json            # Electronics & Technology patents
├── medical.json               # Medical Devices patents
├── all-patents.json           # Complete patent list
└── missing-html-report.json   # Issue reports
```

### Configuration
Set your patent collection directory:
```bash
export PATENT_COLLECTION_DIR="/path/to/patent/collection"
```

### Full Documentation
📖 **[Complete Guide](scripts/IMPROVED-PATENT-EXTRACTION-README.md)** - Detailed setup, usage, and troubleshooting

---

## 📊 Legacy Patent Carousel System

### Patent Data

Patents for the Prior Work page carousel are stored in `/public/patents.json`:

```json
{
  "patents": [
    {
      "title": "Patent Title",
      "description": "Patent description text...",
      "image": "/img/prior-work/image-filename.png",
      "patentNumber": "X,XXX,XXX",
      "linkText": "Patent X,XXX,XXX",
      "order": 1
    }
  ]
}
```

### Patent Images

Patent images should be stored in `/public/img/prior-work/` directory.

### Adding New Patents

To add a new patent to the carousel:
1. Add its image to `/public/img/prior-work/`
2. Add an entry to the patents array in `/public/patents.json`
3. Set the "order" property to control its position

### Image Fallback System

The carousel has a robust fallback system:
- Primary image specified in patent data
- Fallback to default image based on patent number
- Final fallback to placeholder with error message

---

## 🛠️ Development

### Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Patent Processing Commands
```bash
# Comprehensive system (recommended)
npm run process-patents-improved          # Full processing
npm run process-patents-improved-test     # Test mode (5 patents)
npm run process-patents-improved-verbose  # Detailed logging
npm run test-patent-config               # Configuration check

# Legacy systems
npm run process-patents                  # Basic processing
npm run process-patents-firefox         # Firefox-based processing
```

### Key Files
```
├── pages/patent-browser.vue            # Netflix-style patent browser
├── content/patents/                    # Generated patent data
├── scripts/improvedPatentExtractionRunner.js  # Main processing script
├── public/patents.json                 # Legacy carousel data
└── TrophyWall.pdf                     # Source patent list
```

## 🚀 Deployment

```bash
# Build for production
npm run build

# Generate static site
npm run generate
```

## 🎯 Recommended Workflow

### For New Patent Updates
1. **Add new patents** to TrophyWall.pdf
2. **Run processing**: `npm run process-patents-improved`
3. **Review report** for any missing files
4. **Test the patent browser** at `/patent-browser`
5. **Update carousel** manually if needed for featured patents

### For Development
1. **Test first**: `npm run process-patents-improved-test`
2. **Check config**: `npm run test-patent-config`
3. **Run full processing**: `npm run process-patents-improved`
4. **Review generated files** in `content/patents/`

## 📞 Support

### Troubleshooting
- **Configuration issues**: Run `npm run test-patent-config`
- **Missing files**: Check the completion report for specific patent IDs
- **Performance issues**: Adjust `BATCH_SIZE` environment variable
- **Detailed logging**: Use `npm run process-patents-improved-verbose`

### Documentation
- 📖 **[Comprehensive Patent Processing Guide](scripts/IMPROVED-PATENT-EXTRACTION-README.md)**
- 📋 **[Critical Fixes Applied](scripts/CRITICAL-FIXES-README.md)**
- 🎯 **[Completion Report Enhancement](scripts/COMPLETION-REPORT-ENHANCEMENT.md)**

---

💡 **Pro Tip**: Use the comprehensive patent processing system for automatic updates, and maintain the legacy carousel for manually curated highlights on the Prior Work page.

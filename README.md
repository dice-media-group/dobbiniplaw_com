# Dobbin IP Law Website

This is a Nuxt 3 based website for Dobbin IP Law, converted from the original WordPress site.

## Patent Carousel Maintenance

The patent carousel on the Prior Work page displays patents from a consolidated data source. Here's how to maintain it:

### Patent Data

Patents are stored in `/public/patents.json` with the following structure:

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

Patent images should be stored in `/public/img/prior-work/` directory. The image paths in patents.json should reference this location.

### Adding New Patents

To add a new patent:
1. Add its image to `/public/img/prior-work/`
2. Add an entry to the patents array in `/public/patents.json`
3. Make sure to set the "order" property to control its position in the carousel

### Image Fallback System

The carousel has a robust fallback system:
- It first tries to load the primary image specified in the patent data
- If that fails, it looks for any specified fallback image
- If that fails, it uses a default image based on patent number
- As a last resort, it displays a placeholder with an error message

## Patent Trophy Wall

The patent "trophy wall" will display the extensive number of patents submitted by the firm.

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Deployment

```bash
# Build for production
npm run build

# Deploy
npm run deploy
```

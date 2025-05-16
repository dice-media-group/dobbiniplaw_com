# Netflix-Style Patent Browser - Implementation Plan

## Overview
This document outlines the development plan for creating a Netflix-style visual browser for Dobbin IP Law's patent portfolio, enabling visitors to explore patents by category with a visually engaging interface similar to streaming platforms.

## Requirements & Goals

### Core Features
- Visual browsing interface with horizontal carousels by category
- Featured patent hero section
- Patent detail modal/page with comprehensive information
- Responsive design for all devices
- Integration with patent information sources

### Business Goals
- Showcase the firm's extensive patent experience
- Present technical work in an accessible, visual format
- Differentiate from competitors' text-heavy portfolio listings
- Improve engagement with the firm's capabilities

## Data Architecture

### Patent Data Structure
```javascript
{
  "id": "US-10794647-B2",
  "title": "Bolt conversion apparatus for firearm and upper receiver for the same",
  "publicationDate": "2020-10-06",
  "category": "firearms",
  "imageCount": 15,
  "abstract": "...",
  "images": [
    {
      "url": "/images/patents/US-10794647-B2/fig1.jpg",
      "isMain": true
    },
    // Additional images
  ]
}
```

### Data Sources
- Primary: TrophyWall.pdf (256 patents with basic metadata)
- Secondary: Google Patents API or scraping for images and details
- Tertiary: USPTO Public Patent Database for additional information

### Data Processing Pipeline
1. Extract data from TrophyWall.pdf using a parser script
2. Categorize patents using keyword analysis
3. Fetch and store patent images from Google Patents
4. Enhance metadata with additional patent information
5. Generate static JSON files for Nuxt SSG

## UI Components

### Page Structure
- Patents index page with categories and carousels
- Optional dedicated patent detail pages (SEO-friendly)
- Category browsing pages

### Vue Components
- `PatentCarousel.vue` - Horizontal scrolling component 
- `PatentCard.vue` - Individual patent display
- `PatentHero.vue` - Featured patent showcase
- `PatentDetailModal.vue` - Patent details popup
- `CategorySection.vue` - Section with title and carousel

## Technical Implementation

### Development Approach
We'll use a static-first approach compatible with Nuxt SSG:

1. **Build-time Processing**:
   - Parse patent data and generate category organization
   - Fetch and optimize patent images
   - Create static JSON data files

2. **Runtime Enhancement**:
   - Client-side filtering and search
   - Lazy-loading additional patent data
   - Dynamic interactions (carousels, modals)

### Static Site Generation Compatibility
- Pre-generate all patent data during build
- Store optimized images in static directory
- Implement client-side interactions with pre-loaded data

### Technology Stack
- Nuxt.js (existing framework)
- Nuxt Content module for structured data
- Nuxt Image for optimization
- Tailwind CSS for styling

## Development Phases

### Phase 1: Data Processing (1-2 weeks)
- Create script to extract and parse TrophyWall.pdf
- Develop categorization algorithm
- Set up image fetching and optimization pipeline
- Generate structured JSON data

### Phase 2: Core UI Implementation (2-3 weeks)
- Develop base components (PatentCard, Carousel)
- Implement main patent browsing page
- Create featured patent section
- Build category navigation

### Phase 3: Detail Views & Refinement (1-2 weeks)
- Implement patent detail modal/page
- Add search functionality
- Optimize for performance
- Ensure responsive design

### Phase 4: Testing & Launch (1 week)
- Cross-browser testing
- Performance optimization
- Accessibility review
- Deploy to production

## Challenges & Considerations

### Technical Challenges
- **Image Management**: Handling 250+ patents with multiple images each
- **Build Performance**: Ensuring reasonable build times with large dataset
- **External Dependencies**: Managing API usage limits if using Google Patents
- **SSG Compatibility**: Maintaining dynamic feel with static generation

### Legal Considerations
- Ensure compliance with Google Patents and USPTO terms of service
- Verify rights to display patent images
- Consider attribution requirements

## Resources Required

### Development Resources
- Frontend developer (1 full-time, 4-6 weeks)
- Design review (intermittent, 1 week total)
- Data processing script developer (1 week)

### Infrastructure
- Image storage (CDN recommended)
- Build pipeline enhancement for data processing
- Additional Netlify build minutes

## Timeline Estimation
Total estimated time: **5-8 weeks**

- Data structure & processing: 1-2 weeks
- Core UI implementation: 2-3 weeks
- Detail views & refinement: 1-2 weeks
- Testing & launch: 1 week
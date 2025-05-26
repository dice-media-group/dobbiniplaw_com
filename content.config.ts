import { defineContentConfig, defineCollection } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    // Main content collection for all markdown files
    content: defineCollection({
      name: 'content',
      pattern: '**/*.md',
      type: 'page'
    })
  },
  
  // Global settings
  ignores: [
    '**/*.json', // Ignore all JSON files to prevent processing errors
    '**/node_modules/**',
    '**/.git/**',
    '**/.nuxt/**',
    '**/dist/**'
  ],
  
  // Only process markdown files
  sources: {
    content: {
      driver: 'fs',
      include: '**/*.md',
      exclude: [
        '**/*.json',
        '**/node_modules/**',
        '**/.git/**'
      ]
    }
  }
})

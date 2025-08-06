#!/usr/bin/env node
// scripts/verify-internal-links.js - Verify all internal links follow no-trailing-slash standard

import fs from 'fs'
import path from 'path'
import { glob } from 'glob'

const rootDir = process.cwd()
console.log('🔍 Verifying internal links follow no-trailing-slash standard...\n')

// Function to read file content
function readFileSync(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8')
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error.message)
    return ''
  }
}

// Function to check for internal links with trailing slashes
function checkInternalLinks(filePath, content) {
  const issues = []
  const lines = content.split('\n')
  
  lines.forEach((line, index) => {
    // Check for NuxtLink to attributes with trailing slashes (except root)
    const nuxtLinkMatches = line.match(/to="([^"]+)\/"/g)
    if (nuxtLinkMatches) {
      nuxtLinkMatches.forEach(match => {
        const url = match.match(/to="([^"]+)\/"/)[1]
        // Allow root path "/" but flag others
        if (url !== '') {
          issues.push({
            line: index + 1,
            issue: `NuxtLink with trailing slash: ${match}`,
            suggestion: `to="${url}"`
          })
        }
      })
    }
    
    // Check for href attributes with internal trailing slashes
    const hrefMatches = line.match(/href="\/([^"]*)\/"[^\/]/g)
    if (hrefMatches) {
      hrefMatches.forEach(match => {
        const fullMatch = match.match(/href="(\/[^"]*)\/"[^\/]/)[1]
        if (!fullMatch.includes('://')) { // Only internal links
          issues.push({
            line: index + 1,
            issue: `Internal href with trailing slash: href="${fullMatch}/"`,
            suggestion: `href="${fullMatch}"`
          })
        }
      })
    }
  })
  
  return issues
}

// Main verification function
async function verifyLinks() {
  let totalIssues = 0
  
  // Get all Vue files
  const vueFiles = await glob('**/*.vue', { 
    cwd: rootDir,
    ignore: ['node_modules/**', 'dist/**', '.nuxt/**', '**/seo-test.vue', '**/drafts/**']
  })
  
  // Check each Vue file
  for (const file of vueFiles) {
    const filePath = path.join(rootDir, file)
    const content = readFileSync(filePath)
    const issues = checkInternalLinks(filePath, content)
    
    if (issues.length > 0) {
      console.log(`❌ ${file}:`)
      issues.forEach(issue => {
        console.log(`   Line ${issue.line}: ${issue.issue}`)
        console.log(`   Suggestion: ${issue.suggestion}`)
      })
      console.log()
      totalIssues += issues.length
    }
  }
  
  // Summary
  if (totalIssues === 0) {
    console.log('✅ All internal links are properly formatted without trailing slashes!')
  } else {
    console.log(`❌ Found ${totalIssues} internal link(s) with trailing slashes that need fixing.`)
    process.exit(1)
  }
}

// Run verification
verifyLinks().catch(error => {
  console.error('Error during verification:', error)
  process.exit(1)
})

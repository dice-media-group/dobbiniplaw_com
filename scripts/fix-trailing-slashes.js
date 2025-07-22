#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';
import { globSync } from 'glob';

/**
 * Fix Internal Links Script
 * Removes trailing slashes from all internal links to prevent canonical redirect issues
 */

console.log('🔧 Fixing internal links to remove trailing slashes...\n');

// Define the link fixes needed
const LINK_FIXES = [
  // NuxtLink to="" attributes
  { pattern: /to="([^"]+)\/"/g, replacement: 'to="$1"', description: 'NuxtLink to attributes' },
  { pattern: /to='([^']+)\/'/g, replacement: "to='$1'", description: 'NuxtLink to attributes (single quotes)' },
  
  // href="" attributes for internal links
  { pattern: /href="(\/[^"]*[^\/])\/"/g, replacement: 'href="$1"', description: 'href attributes' },
  { pattern: /href='(\/[^']*[^\/])\/'/g, replacement: "href='$1'", description: 'href attributes (single quotes)' },
  
  // Special case: keep root as is
  { pattern: /to=""\//g, replacement: 'to="/"', description: 'Root path correction' },
  { pattern: /href=""\//g, replacement: 'href="/"', description: 'Root href correction' }
];

// Find all relevant files
const files = globSync('**/*.{vue,js,ts,html}', {
  ignore: ['node_modules/**', '.nuxt/**', 'dist/**', 'build/**', '.git/**']
});

let totalFiles = 0;
let totalFixes = 0;
const modifiedFiles = [];

files.forEach(file => {
  let content = readFileSync(file, 'utf8');
  const originalContent = content;
  let fileFixes = 0;
  
  LINK_FIXES.forEach(({ pattern, replacement, description }) => {
    const matches = content.match(pattern);
    if (matches) {
      content = content.replace(pattern, replacement);
      fileFixes += matches.length;
      console.log(`  📝 ${file}: Fixed ${matches.length} ${description}`);
    }
  });
  
  // Special handling for root path - ensure / stays as /
  content = content.replace(/to="\/"\/"/g, 'to="/"');
  content = content.replace(/href="\/"\/"/g, 'href="/"');
  
  // Write file if changes were made
  if (content !== originalContent) {
    writeFileSync(file, content, 'utf8');
    modifiedFiles.push(file);
    totalFixes += fileFixes;
    console.log(`  ✅ ${file}: ${fileFixes} fixes applied\n`);
  }
  
  totalFiles++;
});

// Summary
console.log('📊 Summary:');
console.log(`  Files scanned: ${totalFiles}`);
console.log(`  Files modified: ${modifiedFiles.length}`);
console.log(`  Total fixes applied: ${totalFixes}\n`);

if (modifiedFiles.length > 0) {
  console.log('📁 Modified files:');
  modifiedFiles.forEach(file => console.log(`  - ${file}`));
  
  console.log('\n🚀 Next steps:');
  console.log('  1. Review changes: git diff');
  console.log('  2. Test locally: npm run dev');
  console.log('  3. Commit changes: git add . && git commit -m "fix: remove trailing slashes from internal links"');
  console.log('  4. Deploy and re-crawl with Ahrefs\n');
} else {
  console.log('✅ No trailing slash issues found in internal links!\n');
}

console.log('🎯 Result: All canonical URLs will now have NO trailing slashes');
console.log('🔍 This should resolve the "canonical points to redirect" errors in Ahrefs');

#!/usr/bin/env node

/**
 * Build verification script to ensure no Next.js artifacts exist
 */

const fs = require('fs');
const path = require('path');

function checkForNextJsArtifacts(dir) {
  const items = fs.readdirSync(dir);
  const errors = [];
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    // Check for Next.js directories
    if (stat.isDirectory() && (item === '_next' || item === '.next')) {
      errors.push(`Found Next.js directory: ${fullPath}`);
      continue;
    }
    
    // Check for Next.js files
    if (stat.isFile()) {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('_next/') || content.includes('__NEXT_') || content.includes('next/static')) {
        errors.push(`Found Next.js reference in file: ${fullPath}`);
      }
    }
    
    // Recursively check subdirectories (but skip node_modules)
    if (stat.isDirectory() && item !== 'node_modules' && item !== '.git') {
      errors.push(...checkForNextJsArtifacts(fullPath));
    }
  }
  
  return errors;
}

// Run verification
const distPath = path.join(__dirname, '../dist');
if (!fs.existsSync(distPath)) {
  console.error('❌ Dist directory does not exist');
  process.exit(1);
}

const errors = checkForNextJsArtifacts(distPath);

if (errors.length > 0) {
  console.error('❌ Build verification failed:');
  errors.forEach(error => console.error(`  ${error}`));
  process.exit(1);
} else {
  console.log('✅ Build verification passed - no Next.js artifacts found');
}
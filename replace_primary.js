const fs = require('fs');
const path = require('path');

const dirsToSearch = ['components', 'app'];

const replacements = [
  { search: /rgba\(255,85,0,([0-9.]+)\)/g, replace: 'rgba(var(--primary-rgb),$1)' },
];

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;
      
      for (const {search, replace} of replacements) {
        content = content.replace(search, replace);
      }
      
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

dirsToSearch.forEach(processDirectory);

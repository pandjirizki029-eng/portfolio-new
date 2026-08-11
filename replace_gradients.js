const fs = require('fs');
const path = require('path');

const dirsToSearch = ['components', 'app'];

const replacements = [
  { search: /from-zinc-950(\/\d+)?/g, replace: 'from-background$1' },
  { search: /via-zinc-950(\/\d+)?/g, replace: 'via-background$1' },
  { search: /to-zinc-950(\/\d+)?/g, replace: 'to-background$1' },
  
  { search: /from-zinc-900(\/\d+)?/g, replace: 'from-card$1' },
  { search: /via-zinc-900(\/\d+)?/g, replace: 'via-card$1' },
  { search: /to-zinc-900(\/\d+)?/g, replace: 'to-card$1' },
  
  { search: /from-white(\/\d+)?/g, replace: 'from-foreground$1' },
  { search: /via-white(\/\d+)?/g, replace: 'via-foreground$1' },
  { search: /to-white(\/\d+)?/g, replace: 'to-foreground$1' },
  
  { search: /border-white\/(5|10|20)/g, replace: 'border-border' },
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

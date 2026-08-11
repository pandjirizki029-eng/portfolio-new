const fs = require('fs');
const path = require('path');

const dirsToSearch = ['components', 'app'];

const replacements = {
  'border-zinc-700/80': 'border-border/80',
  'border-zinc-700': 'border-border',
  'bg-zinc-750': 'bg-muted',
  'from-zinc-800': 'from-muted',
  'text-zinc-200': 'text-foreground',
  'text-zinc-100': 'text-foreground',
  'bg-zinc-600': 'bg-muted-foreground',
  'bg-zinc-500': 'bg-muted-foreground',
  'border-zinc-800': 'border-border',
  'text-zinc-600': 'text-muted-foreground',
  'text-zinc-700': 'text-muted-foreground',
  'border-zinc-950': 'border-background',
};

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;
      
      for (const [search, replace] of Object.entries(replacements)) {
        const regex = new RegExp(`\\b${search.replace('/', '\\/')}\\b`, 'g');
        content = content.replace(regex, replace);
      }
      
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

dirsToSearch.forEach(processDirectory);

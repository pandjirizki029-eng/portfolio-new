const fs = require('fs');
const path = require('path');

const dirsToSearch = ['components', 'app'];

const replacements = {
  'bg-zinc-950': 'bg-background',
  'bg-zinc-900': 'bg-card',
  'bg-zinc-800': 'bg-muted',
  'text-white': 'text-foreground',
  'text-zinc-400': 'text-muted-foreground',
  'text-zinc-300': 'text-muted-foreground',
  'text-zinc-500': 'text-muted-foreground',
  'border-white/10': 'border-border',
  'border-white/20': 'border-border',
  'border-white/5': 'border-border',
  'bg-white/5': 'bg-secondary',
  'bg-white/10': 'bg-secondary',
  'text-zinc-300': 'text-muted-foreground',
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
      
      // Additional replacements for things with opacity modifiers
      content = content.replace(/\bbg-zinc-950\/(\d+)\b/g, 'bg-background/$1');
      content = content.replace(/\bbg-zinc-900\/(\d+)\b/g, 'bg-card/$1');
      content = content.replace(/\btext-white\/(\d+)\b/g, 'text-foreground/$1');
      
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

dirsToSearch.forEach(processDirectory);

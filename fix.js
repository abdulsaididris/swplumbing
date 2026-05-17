const fs = require('fs');
const path = require('path');

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;
  
  content = content.replace(/â€”/g, '—')
                   .replace(/â€“/g, '–')
                   .replace(/â€™/g, '’')
                   .replace(/â€œ/g, '“')
                   .replace(/â€ /g, '”')
                   .replace(/â€¢/g, '•');
                   
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Fixed ' + filePath);
  }
}

function walkDir(dir) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory && f !== 'node_modules' && f !== '.git') {
      walkDir(dirPath);
    } else if (f.endsWith('.html')) {
      fixFile(dirPath);
    }
  });
}

walkDir(__dirname);

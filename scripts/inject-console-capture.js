const fs = require('fs');
const path = require('path');

const scriptTag = '<script src="/dashboard-console-capture.js"></script>';

function injectScript(htmlPath) {
  let html = fs.readFileSync(htmlPath, 'utf8');
  
  if (html.includes('dashboard-console-capture.js')) {
    console.log(`✓ Script already present in ${htmlPath}`);
    return;
  }
  
  if (html.includes('</head>')) {
    html = html.replace('</head>', `  ${scriptTag}\n  </head>`);
  } else if (html.includes('<body')) {
    html = html.replace('<body', `${scriptTag}\n  <body`);
  } else {
    console.warn(`⚠ Could not find injection point in ${htmlPath}`);
    return;
  }
  
  fs.writeFileSync(htmlPath, html);
  console.log(`✓ Injected console capture script into ${htmlPath}`);
}

const outDir = path.join(process.cwd(), '.next', 'server', 'app');

function processDirectory(dir) {
  if (!fs.existsSync(dir)) return;
  
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else if (file.endsWith('.html')) {
      injectScript(filePath);
    }
  });
}

console.log('Injecting console capture script into built HTML files...\n');
processDirectory(outDir);
console.log('\nConsole capture script injection complete!');
const fs = require('fs');
const path = require('path');

const mobileMetaTags = `
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, viewport-fit=cover">
    <meta name="theme-color" content="#2B3A67">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">`;

const requiredScripts = [
    '<script src="../scripts/mobile-nav.js"></script>',
    '<script src="../scripts/navigation.js"></script>'
];

function checkAndUpdateFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let updated = false;

        // Check and update viewport meta tag
        if (!content.includes('viewport')) {
            content = content.replace('<head>', `<head>\n${mobileMetaTags}`);
            updated = true;
        }

        // Check and add mobile navigation scripts
        requiredScripts.forEach(script => {
            if (!content.includes(script)) {
                content = content.replace('</body>', `    ${script}\n</body>`);
                updated = true;
            }
        });

        if (updated) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ Updated: ${filePath}`);
            return true;
        } else {
            console.log(`✅ Already up to date: ${filePath}`);
            return false;
        }
    } catch (error) {
        console.error(`❌ Error processing ${filePath}:`, error.message);
        return false;
    }
}

// Get all HTML files in the project
function processHtmlFiles(dir) {
    const files = fs.readdirSync(dir);
    let updatedCount = 0;
    
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            updatedCount += processHtmlFiles(fullPath);
        } else if (file.endsWith('.html')) {
            if (checkAndUpdateFile(fullPath)) {
                updatedCount++;
            }
        }
    });
    
    return updatedCount;
}

console.log('🚀 Starting mobile readiness check...\n');
const updatedCount = processHtmlFiles('.');
console.log(`\n✅ Check complete! Updated ${updatedCount} files.`);

const fs = require('fs');
const path = require('path');

// List of all HTML files in the project
const htmlFiles = [
    'index.html',
    'about.html',
    'src/pages/about.html',
    'src/pages/career-map.html',
    'src/pages/contact.html',
    'src/pages/services.html',
    'src/pages/solutions.html',
    'src/pages/why-choose-us.html',
    'src/pages/why-invest.html',
    'src/pages/work-with-us.html'
];

// The navigation script to include
const navScript = `
    <!-- Navigation Script -->
    <script src="../scripts/navigation.js" defer></script>
`;

// The main script to include
const mainScript = `
    <!-- Main Scripts -->
    <script type="module" src="../scripts/main.js"></script>
`;

// Function to update a single HTML file
function updateHtmlFile(filePath) {
    try {
        // Read the file
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Check if the file already has the navigation container
        if (!content.includes('<div id="navbar-container">')) {
            // Add the navbar container after the opening body tag
            content = content.replace(
                /<body[^>]*>([\s\S]*?)<\/body>/,
                (match, bodyContent) => {
                    // Add navbar container after opening body tag
                    return match.replace(
                        /(<body[^>]*>)/,
                        `$1\n    <!-- Navigation will be injected here by navigation.js -->\n    <div id="navbar-container"></div>\n`
                    );
                }
            );
        }
        
        // Check if the file already has the navigation script
        if (!content.includes('navigation.js')) {
            // Add the navigation script before the closing body tag
            content = content.replace(
                /<\/body>/,
                `    ${navScript}\n    ${mainScript}\n</body>`
            );
        } else {
            // Update the navigation script path if it exists
            content = content.replace(
                /<script[^>]*src=["'][^"']*navigation\.js[^"']*["'][^>]*>\s*<\/script>/,
                '<script src="../scripts/navigation.js" defer></script>'
            );
        }
        
        // Remove any mobile-menu.js references
        content = content.replace(
            /<script[^>]*src=["'][^"']*mobile-menu\.js[^"']*["'][^>]*>\s*<\/script>/g,
            ''
        );
        
        // Write the updated content back to the file
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Updated: ${filePath}`);
    } catch (error) {
        console.error(`❌ Error updating ${filePath}:`, error.message);
    }
}

// Update all HTML files
console.log('Updating navigation scripts...');
htmlFiles.forEach(filePath => {
    if (fs.existsSync(filePath)) {
        updateHtmlFile(filePath);
    } else {
        console.log(`ℹ️  File not found, skipping: ${filePath}`);
    }
});

console.log('\nUpdate complete!');

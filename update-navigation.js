const fs = require('fs');
const path = require('path');

// List of HTML files to update
const htmlFiles = [
    'about.html',
    'index.html',
    'src/pages/about.html',
    'src/pages/contact.html',
    'src/pages/services.html',
    'src/pages/solutions.html',
    'src/pages/why-invest.html',
    'src/pages/work-with-us.html'
];

// New navigation HTML structure
const newNavHTML = `
    <nav class="navbar">
        <div class="container nav-container">
            <a href="../../index.html" class="nav-logo">
                <img src="C:/Users/krris/OneDrive/Pictures/Saved Pictures/WhatsApp Image 2025-06-14 at 17.20.16_c1433007.jpg" alt="Kaizen Logo" class="logo-img">
            </a>
            
            <button class="menu-btn" aria-label="Toggle menu">
                <i class="fas fa-bars"></i>
            </button>
            
            <ul class="nav-links">
                <li><a href="../../index.html" class="active">Home</a></li>
                <li><a href="work-with-us.html">Work With Us</a></li>
                <li><a href="services.html">Services</a></li>
                <li><a href="solutions.html">Solutions</a></li>
                <li><a href="about.html">About</a></li>
                <li><a href="contact.html">Contact</a></li>
            </ul>
        </div>
    </nav>`;

// Function to update a single HTML file
function updateHTMLFile(filePath) {
    try {
        // Read the file
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Update the navigation
        const navRegex = /<nav[\s\S]*?<\/nav>/i;
        const updatedContent = content.replace(navRegex, newNavHTML);
        
        // Add mobile menu script if not present
        const scriptTag = '<script type="module" src="../../src/scripts/main.js"></script>\n    <script src="../../src/scripts/mobile-menu.js"></script>';
        
        let finalContent = updatedContent;
        if (!updatedContent.includes('mobile-menu.js')) {
            finalContent = updatedContent.replace(
                /<\/body>/i, 
                `    ${scriptTag}\n</body>`
            );
        }
        
        // Write the updated content back to the file
        fs.writeFileSync(filePath, finalContent, 'utf8');
        console.log(`✅ Updated: ${filePath}`);
        
    } catch (error) {
        console.error(`❌ Error updating ${filePath}:`, error.message);
    }
}

// Process all HTML files
htmlFiles.forEach(filePath => {
    const fullPath = path.join(__dirname, filePath);
    if (fs.existsSync(fullPath)) {
        updateHTMLFile(fullPath);
    } else {
        console.log(`⚠️  File not found: ${filePath}`);
    }
});

console.log('\n🎉 Navigation update complete!');

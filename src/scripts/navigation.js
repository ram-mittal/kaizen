// Navigation Configuration
const navigationConfig = {
    logo: {
        // Using absolute path to ensure the logo loads from any page
        src: 'src/assets/images/logo.png',
        alt: 'Kaizen Logo',
        class: 'logo.png',
        style: 'height: 50px; width: auto; max-width: 220px; object-fit: contain;'
    },
    links: [
        { path: '../../index.html', text: 'Home', class: 'nav-link' },
        { path: 'work-with-us.html', text: 'Work With Us', class: 'nav-link' },
        { path: 'career-map.html', text: 'Career Map', class: 'nav-link' },
        { path: 'services.html', text: 'Services', class: 'nav-link' },
        { path: 'solutions.html', text: 'Solutions', class: 'nav-link' },
        { path: 'about.html', text: 'About', class: 'nav-link' },
        { path: 'contact.html', text: 'Contact', class: 'nav-link' }
    ]
};

// Generate Navigation HTML
function generateNavigation(currentPage = '') {
    return `
        <nav class="navbar">
            <div class="container nav-container">
                <a href="${navigationConfig.links[0].path}" class="nav-logo" style="display: flex; align-items: center; text-decoration: none;">
                    <img 
                        src="${navigationConfig.logo.src}" 
                        alt="${navigationConfig.logo.alt}" 
                        class="${navigationConfig.logo.class}"
                        style="${navigationConfig.logo.style}"
                        loading="lazy"
                    >
                </a>
                
                <button class="menu-btn" aria-label="Toggle menu" aria-expanded="false">
                    <i class="fas fa-bars"></i>
                </button>
                
                <ul class="nav-links">
                    ${navigationConfig.links.map(link => `
                        <li>
                            <a 
                                href="${link.path}" 
                                class="${link.class} ${currentPage === link.text.toLowerCase() ? 'active' : ''}"
                                ${currentPage === link.text.toLowerCase() ? 'aria-current="page"' : ''}
                            >
                                ${link.text}
                            </a>
                        </li>
                    `).join('')}
                </ul>
            </div>
        </nav>
    `;
}

// Initialize Navigation
document.addEventListener('DOMContentLoaded', function() {
    let navContainer = document.getElementById('navbar-container');
    
    // Create container if it doesn't exist
    if (!navContainer) {
        navContainer = document.createElement('div');
        navContainer.id = 'navbar-container';
        document.body.insertBefore(navContainer, document.body.firstChild);
    }
    
    // Get current page for active state
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const currentPage = navigationConfig.links.find(link => 
        currentPath === link.path.split('/').pop()
    )?.text.toLowerCase() || '';
    
    // Inject navigation
    navContainer.innerHTML = generateNavigation(currentPage);
    
    // Initialize mobile menu if on mobile
    if (window.innerWidth <= 768) {
        const menuBtn = document.querySelector('.menu-btn');
        const navLinks = document.querySelector('.nav-links');
        if (menuBtn && navLinks) {
            // Import and initialize mobile nav
            const mobileNavScript = document.createElement('script');
            mobileNavScript.src = '../scripts/mobile-nav.js';
            document.body.appendChild(mobileNavScript);
        }
    }
});

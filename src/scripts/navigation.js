console.log('Navigation script loaded');

// Navigation Configuration
const navigationConfig = {
    logo: {
        // Using root-relative path to the logo
        src: '/kaizenlogo.jpg',
        alt: 'Kaizen Logo',
        class: 'logo',
        style: 'height: 60px; width: auto; max-width: 260px; object-fit: contain;'
    },
    links: [
        { path: '/index.html', text: 'Home', class: 'nav-link' },
        { path: '/src/pages/work-with-us.html', text: 'Work With Us', class: 'nav-link' },
        { path: '/src/pages/career-map.html', text: 'Career Map', class: 'nav-link' },
        { path: '/src/pages/services.html', text: 'Services', class: 'nav-link' },
        { path: '/src/pages/solutions.html', text: 'Solutions', class: 'nav-link' },
        { path: '/src/pages/about.html', text: 'About', class: 'nav-link' },
        { path: '/src/pages/contact.html', text: 'Contact', class: 'nav-link' }
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
                
                ${window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname === '' ? '' : `
                <button class="menu-btn" aria-label="Toggle menu" aria-expanded="false">
                    <i class="fas fa-bars"></i>
                </button>`}
                
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

// Function to initialize navigation
function initializeNavigation() {
    console.log('Initializing navigation...');
    
    let navContainer = document.getElementById('navbar-container');
    
    if (!navContainer) {
        console.error('❌ Navigation container not found');
        return false;
    }
    
    try {
        // Get current page from URL
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        let currentPage = '';
        
        // Find the current page name for active link highlighting
        navigationConfig.links.forEach(link => {
            const linkPath = link.path.split('/').pop();
            if (currentPath === linkPath || (currentPath === '' && linkPath === 'index.html')) {
                currentPage = link.text.toLowerCase();
            }
        });
        
        // Generate and set the navigation HTML
        navContainer.innerHTML = generateNavigation(currentPage);
        
        // Initialize mobile menu after navigation is set up
        initMobileMenu();
        
        console.log('Navigation and mobile menu initialized successfully');
        return true;
    } catch (error) {
        console.error('Error initializing navigation:', error);
    }
}

// Self-executing function to initialize navigation
(function() {
    console.log('Setting up navigation initialization...');
    
    function init() {
        console.log('DOM ready, initializing navigation...');
        const success = initializeNavigation();
        if (!success) {
            console.log('Retrying navigation initialization in 100ms...');
            setTimeout(initializeNavigation, 100);
        }
    }

    if (document.readyState === 'loading') {
        console.log('Document still loading, adding DOMContentLoaded listener');
        document.addEventListener('DOMContentLoaded', init);
    } else {
        console.log('DOM already loaded, initializing immediately');
        init();
    }
})();
    
    function initMobileMenu() {
        const menuBtn = document.querySelector('.menu-btn');
        const navLinks = document.querySelector('.nav-links');
        
        if (!menuBtn || !navLinks) {
            console.error('Mobile menu elements not found');
            return;
        }
        
        const body = document.body;
        let isMenuOpen = false;
        
        // Ensure menu is closed by default on mobile
        navLinks.classList.remove('active');
        menuBtn.setAttribute('aria-expanded', 'false');
        
        // Add a class to the body when menu is open
        function updateBodyClass() {
            if (isMenuOpen) {
                body.classList.add('menu-open');
            } else {
                body.classList.remove('menu-open');
            }
        }

        function toggleMenu(forceClose = false) {
            isMenuOpen = forceClose ? false : !navLinks.classList.contains('active');
            
            if (isMenuOpen) {
                navLinks.classList.add('active');
                menuBtn.setAttribute('aria-expanded', 'true');
                body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
                document.addEventListener('click', handleClickOutside, true);
            } else {
                navLinks.classList.remove('active');
                menuBtn.setAttribute('aria-expanded', 'false');
                body.style.overflow = ''; // Re-enable scrolling
                document.removeEventListener('click', handleClickOutside, true);
            }
            
            updateBodyClass();
        }

        // Close menu when clicking outside
        function handleClickOutside(event) {
            if (!navLinks.contains(event.target) && !menuBtn.contains(event.target)) {
                toggleMenu(false);
            }
        }

        // Toggle menu on button click
        function handleMenuButtonClick(e) {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
            toggleMenu();
        }
        
        // Add event listeners
        menuBtn.addEventListener('click', handleMenuButtonClick);
        
        // Handle touch events for mobile
        menuBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            menuBtn.classList.add('active');
        }, { passive: false });
        
        menuBtn.addEventListener('touchend', (e) => {
            e.preventDefault();
            menuBtn.classList.remove('active');
            handleMenuButtonClick(e);
        }, { passive: false });
        
        // Close menu when clicking on a nav link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 992) {
                    toggleMenu(false);
                }
            });
        });
        
        // Close menu when window is resized above mobile breakpoint
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                if (window.innerWidth > 992) {
                    toggleMenu(false);
                }
            }, 250);
        });
    }

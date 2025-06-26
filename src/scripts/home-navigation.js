console.log('Home navigation script loaded');

// Simple navigation initialization for home page
function initHomeNavigation() {
    console.log('Initializing home navigation...');
    
    // Navigation configuration for home page
    const navConfig = {
        logo: {
            src: 'src/assets/images/logo.png',
            alt: 'Kaizen Logo',
            class: 'logo-img',
            style: 'height: 50px; width: auto; max-width: 220px; object-fit: contain;'
        },
        links: [
            { path: 'index.html', text: 'Home', class: 'nav-link' },
            { path: 'src/pages/work-with-us.html', text: 'Work With Us', class: 'nav-link' },
            { path: 'src/pages/career-map.html', text: 'Career Map', class: 'nav-link' },
            { path: 'src/pages/services.html', text: 'Services', class: 'nav-link' },
            { path: 'src/pages/solutions.html', text: 'Solutions', class: 'nav-link' },
            { path: 'src/pages/about.html', text: 'About', class: 'nav-link' },
            { path: 'src/pages/contact.html', text: 'Contact', class: 'nav-link' }
        ]
    };

    // Generate navigation HTML
    function generateNavHTML() {
        return `
            <nav class="navbar">
                <div class="container nav-container">
                    <a href="${navConfig.links[0].path}" class="nav-logo">
                        <img 
                            src="${navConfig.logo.src}" 
                            alt="${navConfig.logo.alt}" 
                            class="${navConfig.logo.class}"
                            style="${navConfig.logo.style}"
                            loading="lazy"
                        >
                    </a>
                    
                    <button class="menu-btn" aria-label="Toggle menu" aria-expanded="false">
                        <i class="fas fa-bars"></i>
                    </button>
                    
                    <ul class="nav-links">
                        ${navConfig.links.map(link => `
                            <li>
                                <a 
                                    href="${link.path}" 
                                    class="${link.class} ${window.location.pathname.endsWith(link.path) ? 'active' : ''}"
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

    // Initialize mobile menu
    function initMobileMenu() {
        const menuBtn = document.querySelector('.menu-btn');
        const navLinks = document.querySelector('.nav-links');
        
        if (!menuBtn || !navLinks) {
            console.error('Mobile menu elements not found');
            return;
        }

        function toggleMenu() {
            const isOpen = navLinks.classList.toggle('active');
            menuBtn.setAttribute('aria-expanded', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
        }

        // Toggle menu on button click
        menuBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleMenu();
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') && 
                !e.target.closest('.nav-links') && 
                !e.target.closest('.menu-btn')) {
                toggleMenu();
            }
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 992) {
                    toggleMenu();
                }
            });
        });
    }

    // Initialize everything
    const navContainer = document.getElementById('navbar-container');
    if (navContainer) {
        navContainer.innerHTML = generateNavHTML();
        initMobileMenu();
        console.log('Home navigation initialized successfully');
    } else {
        console.error('Navigation container not found');
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHomeNavigation);
} else {
    initHomeNavigation();
}

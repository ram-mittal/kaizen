// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Wait for navigation to be injected
    const checkForNavigation = setInterval(() => {
        const menuBtn = document.querySelector('.menu-btn');
        const navLinks = document.querySelector('.nav-links');
        
        if (menuBtn && navLinks) {
            clearInterval(checkForNavigation);
            // Ensure menu is closed by default on mobile
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                const icon = menuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
            initMobileNav(menuBtn, navLinks);
        }
    }, 100);

    // Add resize animation stopper and handle menu state on resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        document.body.classList.add('resize-animation-stopper');
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            document.body.classList.remove('resize-animation-stopper');
            
            // Reset menu state when switching between mobile and desktop
            const menuBtn = document.querySelector('.menu-btn');
            const navLinks = document.querySelector('.nav-links');
            if (window.innerWidth > 768 && navLinks) {
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
                if (menuBtn) {
                    const icon = menuBtn.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            }
        }, 400);
    });
});

function initMobileNav(menuBtn, navLinks) {
    const navItems = document.querySelectorAll('.nav-links a');
    let isMenuOpen = false;

    // Toggle mobile menu
    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        navLinks.classList.toggle('active');
        menuBtn.setAttribute('aria-expanded', isMenuOpen);
        
        // Toggle between menu and close icon
        const icon = menuBtn.querySelector('i');
        if (isMenuOpen) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            document.body.style.overflow = ''; // Re-enable scrolling
        }
    }

    // Close menu when clicking on a nav item
    function closeMenu() {
        if (window.innerWidth <= 768) {
            isMenuOpen = false;
            navLinks.classList.remove('active');
            menuBtn.setAttribute('aria-expanded', 'false');
            const icon = menuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            document.body.style.overflow = '';
        }
    }

    // Add event listeners
    menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    navItems.forEach(item => {
        item.addEventListener('click', closeMenu);
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (isMenuOpen && !menuBtn.contains(e.target) && !navLinks.contains(e.target)) {
            closeMenu();
        }
    });

    // Close menu on window resize if it becomes desktop view
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 768 && isMenuOpen) {
                closeMenu();
            }
        }, 250);
    });

    // Prevent scroll when menu is open
        // Prevent scroll when menu is open
    const preventScroll = (e) => {
        if (isMenuOpen) {
            e.preventDefault();
        }
    };

    document.addEventListener('touchmove', preventScroll, { passive: false });

    // Cleanup function
    return () => {
        document.removeEventListener('touchmove', preventScroll);
    };
});

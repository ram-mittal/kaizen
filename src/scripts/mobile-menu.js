document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuBtn.setAttribute('aria-expanded', 
                menuBtn.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
            );
            
            // Toggle between hamburger and close icon
            const icon = this.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                    body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                    body.style.overflow = ''; // Re-enable scrolling
                }
            }
        });

        // Close menu when clicking on a nav link
        const navItems = navLinks.querySelectorAll('a');
        navItems.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 992) { // Match the mobile breakpoint in CSS
                    navLinks.classList.remove('active');
                    const icon = menuBtn.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                    body.style.overflow = '';
                }
            });
        });
    }

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        // Clear the timer on each resize event
        clearTimeout(resizeTimer);
        
        // Set a new timer to run after resizing has stopped
        resizeTimer = setTimeout(function() {
            if (window.innerWidth > 992) {
                // Reset mobile menu when resizing to desktop
                if (navLinks) {
                    navLinks.classList.remove('active');
                    const icon = menuBtn?.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                    body.style.overflow = '';
                }
            }
        }, 250); // Adjust the delay as needed
    });
});

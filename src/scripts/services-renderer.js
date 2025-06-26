// Import services data and categories
import services, { categories } from './services-data.js';

// Current filter state
let currentFilter = 'all';
let isLoading = false;

// DOM Elements
let servicesGrid;
let filterButtonsContainer;

// Intersection Observer for lazy loading
let observer;

// Image placeholder for lazy loading
const placeholderImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMjI1IiB2aWV3Qm94PSIwIDAgNDAwIDIyNSIgZmlsbD0iI2YzZjNmMyI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIyMjUiLz48L3N2Zz4=';

// Function to create a service card
function createServiceCard(service, index) {
    // Only create features HTML if the card is in viewport
    const featuresHtml = service.features ? service.features.slice(0, 3).map((feature, i) => `
        <li data-aos="fade-up" data-aos-delay="${Math.min(100 * i, 300)}">
            <i class="${feature.icon}"></i>
            <div>
                <h4>${feature.title}</h4>
                <p>${feature.description}</p>
            </div>
        </li>
    `).join('') : '';

    // Return a lightweight card first
    return `
        <div class="service-card" data-aos="fade-up" data-aos-delay="${index * 100}" data-service-id="${service.id}">
            <div class="card-image-wrapper">
                <img src="${service.image}" alt="${service.title}" class="card-image" loading="lazy" width="400" height="225">
                <div class="card-overlay">
                    <i class="fas ${service.icon}"></i>
                </div>
            </div>
            <div class="card-content">
                <h3>${service.title}</h3>
                <p class="card-tagline">${service.tagline}</p>
                <p class="card-description">${service.description}</p>
                <ul class="feature-list">
                    ${featuresHtml}
                </ul>
                <a href="#contact" class="btn btn-primary">${service.ctaText || 'Learn More'}</a>
                </div>
            </div>
        </div>
    `;
}

// Function to filter services by category
function filterServices(category) {
    if (isLoading || currentFilter === category) return;
    
    currentFilter = category;
    isLoading = true;
    
    // Show loading state
    servicesGrid.innerHTML = `
        <div class="loading-spinner">
            <div class="spinner"></div>
            <p>Loading services...</p>
        </div>`;
    
    // Update active filter button
    const buttons = filterButtonsContainer.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
        if (btn.dataset.category === category) {
            btn.classList.add('active');
            btn.disabled = true;
        } else {
            btn.classList.remove('active');
            btn.disabled = false;
        }
    });
    
    // Use requestAnimationFrame to keep UI responsive
    requestAnimationFrame(() => {
        // Filter services
        const filteredServices = category === 'all' 
            ? services 
            : services.filter(service => service.categories.includes(category));
        
        // Render with a small delay to show loading state
        setTimeout(() => {
            renderServices(filteredServices);
            isLoading = false;
            
            // Re-enable buttons after render
            buttons.forEach(btn => {
                btn.disabled = false;
            });
        }, 50);
    });
}

// Function to render filter buttons
function renderFilterButtons() {
    filterButtonsContainer = document.querySelector('.filter-buttons');
    
    if (!filterButtonsContainer) return;
    
    // Clear existing buttons
    filterButtonsContainer.innerHTML = '';
    
    // Create and append filter buttons
    categories.forEach(category => {
        const button = document.createElement('button');
        button.className = `filter-btn ${category.id === 'all' ? 'active' : ''}`;
        button.textContent = category.name;
        button.dataset.category = category.id;
        button.addEventListener('click', () => filterServices(category.id));
        filterButtonsContainer.appendChild(button);
    });
}

// Function to initialize lazy loading observer
function initLazyLoading() {
    if (window.IntersectionObserver) {
        observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.dataset.src;
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });
    }
}

// Function to render services
function renderServices(servicesToRender = services) {
    if (!servicesGrid) {
        servicesGrid = document.querySelector('.services-grid');
        if (!servicesGrid) return;
    }
    
    // Clear existing content
    servicesGrid.innerHTML = '';
    
    if (servicesToRender.length === 0) {
        servicesGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>No services found</h3>
                <p>Try selecting a different filter</p>
            </div>`;
        return;
    }
    
    // Create a document fragment for better performance
    const fragment = document.createDocumentFragment();
    const tempContainer = document.createElement('div');
    
    // Add each service to the temporary container
    servicesToRender.forEach((service, index) => {
        tempContainer.insertAdjacentHTML('beforeend', createServiceCard(service, index));
    });
    
    // Move nodes to fragment
    while (tempContainer.firstChild) {
        fragment.appendChild(tempContainer.firstChild);
    }
    
    // Append all at once
    servicesGrid.appendChild(fragment);
    
    // Initialize lazy loading for images
    if (window.IntersectionObserver) {
        document.querySelectorAll('.card-image[data-src]').forEach(img => {
            observer.observe(img);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        document.querySelectorAll('.card-image[data-src]').forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
}

// Back to Top Button
function initBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    if (!backToTopButton) return;
    
    // Show/hide button on scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    // Smooth scroll to top
    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize the services when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize lazy loading
    initLazyLoading();
    
    // Initialize filter buttons
    renderFilterButtons();
    
    // Render services with the default filter
    filterServices('all');
    
    // Initialize AOS with optimized settings
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            easing: 'ease-out',
            offset: 100,
            disable: window.innerWidth < 768 // Disable on mobile for better performance
        });
    }
    
    // Initialize back to top button
    initBackToTop();
    
    // Add smooth scrolling for anchor links with passive listeners
    const handleSmoothScroll = (e) => {
        const targetId = this.getAttribute('href');
        if (targetId.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    };
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', handleSmoothScroll, { passive: true });
    });
    
    // Add typing animation to the hero title with requestAnimationFrame
    const dynamicText = document.querySelector('.dynamic-text');
    if (dynamicText) {
        const text = dynamicText.textContent;
        dynamicText.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                dynamicText.textContent += text.charAt(i);
                i++;
                requestAnimationFrame(() => setTimeout(typeWriter, 50));
            }
        };
        
        // Start animation after a short delay
        setTimeout(typeWriter, 300);
    }
    
    // Hide loader when everything is loaded
    const loader = document.querySelector('.loader-wrapper');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
            // Remove from DOM after animation
            setTimeout(() => {
                loader.remove();
            }, 300);
        }, 300);
    }
});

// Export the render function for use in other modules
export { renderServices };

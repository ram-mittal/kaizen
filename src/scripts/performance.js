document.addEventListener('DOMContentLoaded', () => {
    // Preload essential images
    const preloadImages = [
        '../assets/images/hero-bg.jpg',
        '../assets/images/services-hero.jpg'
    ];
    
    preloadImages.forEach(img => {
        const image = new Image();
        image.src = img;
    });

    // Remove loader after content is ready
    window.addEventListener('load', () => {
        const loader = document.querySelector('.loader-wrapper');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 200);
        }
    });
});
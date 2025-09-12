document.addEventListener('DOMContentLoaded', function() {
    // Image loading optimization
    function optimizeImageLoading() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        // Create intersection observer for lazy loading
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        // Preload next carousel images when current becomes visible
                        if (img.closest('.carousel-item')) {
                            preloadNextCarouselImages(img);
                        }
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        }
        
        // Add load event listeners for smooth transitions
        document.querySelectorAll('.carousel-item img').forEach(img => {
            img.addEventListener('load', function() {
                this.classList.add('loaded');
            });
            
            // If image is already cached, trigger load immediately
            if (img.complete) {
                img.classList.add('loaded');
            }
        });
    }
    
    function preloadNextCarouselImages(currentImg) {
        const currentItem = currentImg.closest('.carousel-item');
        const allItems = document.querySelectorAll('.carousel-item');
        const currentIndex = Array.from(allItems).indexOf(currentItem);
        
        // Preload next 2 images
        for (let i = 1; i <= 2; i++) {
            const nextIndex = (currentIndex + i) % allItems.length;
            const nextImg = allItems[nextIndex].querySelector('img');
            if (nextImg && !nextImg.classList.contains('loaded')) {
                // Create a new image to trigger preload
                const preloadImg = new Image();
                preloadImg.src = nextImg.src;
            }
        }
    }
    
    // Initialize image optimization
    optimizeImageLoading();
    
    const items = document.querySelectorAll('.carousel-item');
    let currentIndex = 0;

    function showNextItem() {
        items[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % items.length;
        items[currentIndex].classList.add('active');
        
        // Preload next images when switching
        const currentImg = items[currentIndex].querySelector('img');
        if (currentImg) {
            preloadNextCarouselImages(currentImg);
        }
    }

    // Start the carousel
    items[currentIndex].classList.add('active');

    // Change image every 5 seconds
    setInterval(showNextItem, 5000);

    // Typing animation function
    function typeText(element, text, speed = 50) {
        element.innerHTML = '<span class="typing-text"></span><span class="typing-cursor"></span>';
        const textSpan = element.querySelector('.typing-text');
        let i = 0;
        
        function typeCharacter() {
            if (i < text.length) {
                textSpan.textContent += text.charAt(i);
                i++;
                setTimeout(typeCharacter, speed);
            } else {
                // Remove cursor after typing is complete
                setTimeout(() => {
                    const cursor = element.querySelector('.typing-cursor');
                    if (cursor) cursor.remove();
                }, 2000);
            }
        }
        
        // Start typing after a short delay
        setTimeout(typeCharacter, 500);
    }

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Trigger typing animation for about section
                if (entry.target.id === 'about') {
                    const aboutText = entry.target.querySelector('p');
                    if (aboutText && !aboutText.classList.contains('typed')) {
                        aboutText.classList.add('typed');
                        const originalText = aboutText.textContent;
                        typeText(aboutText, originalText, 30);
                    }
                }
            }
        });
    }, observerOptions);

    // Observe all scroll animation elements
    const scrollElements = document.querySelectorAll('.scroll-animation');
    scrollElements.forEach(el => {
        observer.observe(el);
    });
});

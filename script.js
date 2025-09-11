document.addEventListener('DOMContentLoaded', function() {
    const items = document.querySelectorAll('.carousel-item');
    let currentIndex = 0;

    function showNextItem() {
        items[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % items.length;
        items[currentIndex].classList.add('active');
    }

    // Start the carousel
    items[currentIndex].classList.add('active');

    // Change image every 5 seconds
    setInterval(showNextItem, 5000);

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
                    if (aboutText) {
                        aboutText.style.whiteSpace = 'nowrap';
                        aboutText.style.animation = 'typing 3s steps(100) 0.5s forwards, blink 1s infinite 0.5s';
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

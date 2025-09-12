document.addEventListener('DOMContentLoaded', function() {
    const items = document.querySelectorAll('.carousel-item');
    let currentIndex = 0;

    function showNextItem() {
        // Remove active class and reset animations
        items[currentIndex].classList.remove('active');
        const currentCaptions = items[currentIndex].querySelectorAll('.carousel-title, .carousel-text');
        currentCaptions.forEach(caption => {
            caption.style.animation = 'none';
            caption.style.opacity = '0';
        });
        
        // Move to next slide
        currentIndex = (currentIndex + 1) % items.length;
        items[currentIndex].classList.add('active');
        
        // Restart animations for new slide
        setTimeout(() => {
            const newCaptions = items[currentIndex].querySelectorAll('.carousel-title, .carousel-text');
            newCaptions.forEach(caption => {
                caption.style.animation = '';
                if (caption.classList.contains('carousel-title')) {
                    caption.style.animation = 'slideInFromBottom 1s ease-out 1.5s forwards';
                } else if (caption.classList.contains('carousel-text')) {
                    caption.style.animation = 'fadeInDelayed 1s ease-out 2.5s forwards';
                }
            });
        }, 100);
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

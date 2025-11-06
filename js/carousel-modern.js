/**
 * Modern Carousel Enhancement
 * Espaço Terapêutico Morada Azul
 */

document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('carouselThree');
    const indicators = carousel.querySelectorAll('.carousel-indicators li');
    const items = carousel.querySelectorAll('.carousel-item');
    const prevBtn = carousel.querySelector('.carousel-control-prev');
    const nextBtn = carousel.querySelector('.carousel-control-next');
    
    let currentSlide = 0;
    let isAnimating = false;
    let autoplayInterval;
    
    // Initialize carousel
    initCarousel();
    
    function initCarousel() {
        // Set up autoplay
        startAutoplay();
        
        // Add event listeners
        setupEventListeners();
        
        // Initialize first slide
        showSlide(0);
        
        // Add progress bar to active indicator
        addProgressBar();
    }
    
    function setupEventListeners() {
        // Pause autoplay on hover
        carousel.addEventListener('mouseenter', pauseAutoplay);
        carousel.addEventListener('mouseleave', startAutoplay);
        
        // Touch/swipe support
        let startX = 0;
        let endX = 0;
        
        carousel.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
            pauseAutoplay();
        });
        
        carousel.addEventListener('touchend', function(e) {
            endX = e.changedTouches[0].clientX;
            handleSwipe();
            startAutoplay();
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                previousSlide();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                nextSlide();
            }
        });
        
        // Click events for controls
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            previousSlide();
        });
        
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            nextSlide();
        });
        
        // Indicator clicks
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', function() {
                showSlide(index);
            });
        });
    }
    
    function handleSwipe() {
        const threshold = 50;
        const difference = startX - endX;
        
        if (Math.abs(difference) > threshold) {
            if (difference > 0) {
                nextSlide();
            } else {
                previousSlide();
            }
        }
    }
    
    function nextSlide() {
        if (isAnimating) return;
        
        const nextIndex = (currentSlide + 1) % items.length;
        showSlide(nextIndex);
    }
    
    function previousSlide() {
        if (isAnimating) return;
        
        const prevIndex = (currentSlide - 1 + items.length) % items.length;
        showSlide(prevIndex);
    }
    
    function showSlide(index) {
        if (isAnimating || index === currentSlide) return;
        
        isAnimating = true;
        
        // Hide all slides first
        items.forEach(item => {
            item.classList.remove('active');
            item.style.opacity = '0';
            item.style.zIndex = '1';
        });
        
        // Update indicators
        indicators[currentSlide].classList.remove('active');
        indicators[index].classList.add('active');
        
        // Show new slide with delay to ensure smooth transition
        setTimeout(() => {
            items[index].classList.add('active');
            items[index].style.opacity = '1';
            items[index].style.zIndex = '2';
        }, 50);
        
        currentSlide = index;
        
        // Reset animation flag after transition
        setTimeout(() => {
            isAnimating = false;
        }, 850);
        
        // Update progress bar
        updateProgressBar();
    }
    
    function startAutoplay() {
        clearInterval(autoplayInterval);
        autoplayInterval = setInterval(nextSlide, 5000);
    }
    
    function pauseAutoplay() {
        clearInterval(autoplayInterval);
    }
    
    function addProgressBar() {
        indicators.forEach(indicator => {
            const progressBar = document.createElement('div');
            progressBar.className = 'indicator-progress';
            indicator.appendChild(progressBar);
        });
        
        // Add CSS for progress bar
        const style = document.createElement('style');
        style.textContent = `
            .carousel-indicators li {
                position: relative;
                overflow: hidden;
            }
            
            .indicator-progress {
                position: absolute;
                bottom: 0;
                left: 0;
                height: 2px;
                background: linear-gradient(90deg, #fff, #90caf9);
                width: 0%;
                transition: width 5s linear;
            }
            
            .carousel-indicators li.active .indicator-progress {
                width: 100%;
            }
        `;
        document.head.appendChild(style);
    }
    
    function updateProgressBar() {
        // Reset all progress bars
        indicators.forEach(indicator => {
            const progressBar = indicator.querySelector('.indicator-progress');
            if (progressBar) {
                progressBar.style.width = '0%';
            }
        });
        
        // Start progress for active indicator
        setTimeout(() => {
            const activeProgress = indicators[currentSlide].querySelector('.indicator-progress');
            if (activeProgress) {
                activeProgress.style.width = '100%';
            }
        }, 100);
    }
    
    // Intersection Observer for performance
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startAutoplay();
            } else {
                pauseAutoplay();
            }
        });
    });
    
    observer.observe(carousel);
    
    // Lazy loading for images
    const images = carousel.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Add loading states
    function addLoadingStates() {
        const style = document.createElement('style');
        style.textContent = `
            .carousel-item img {
                opacity: 0;
                transition: opacity 0.5s ease;
            }
            
            .carousel-item img.loaded {
                opacity: 1;
            }
            
            .carousel-loading {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                color: rgba(255, 255, 255, 0.7);
                font-size: 1.2rem;
            }
        `;
        document.head.appendChild(style);
        
        // Add loaded class when images load
        carousel.querySelectorAll('img').forEach(img => {
            if (img.complete) {
                img.classList.add('loaded');
            } else {
                img.addEventListener('load', () => {
                    img.classList.add('loaded');
                });
            }
        });
    }
    
    addLoadingStates();
    
    // Add parallax effect to background elements
    function addParallaxEffect() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = carousel.querySelectorAll('.slider-image-box');
            
            parallaxElements.forEach(element => {
                const speed = 0.5;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }
    
    if (window.innerWidth > 768) {
        addParallaxEffect();
    }
    
    // Enhanced accessibility
    function enhanceAccessibility() {
        // Add ARIA labels
        carousel.setAttribute('aria-label', 'Carousel de serviços terapêuticos');
        prevBtn.setAttribute('aria-label', 'Slide anterior');
        nextBtn.setAttribute('aria-label', 'Próximo slide');
        
        indicators.forEach((indicator, index) => {
            indicator.setAttribute('aria-label', `Ir para slide ${index + 1}`);
            indicator.setAttribute('role', 'button');
            indicator.setAttribute('tabindex', '0');
            
            // Add keyboard support for indicators
            indicator.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    showSlide(index);
                }
            });
        });
        
        // Add live region for screen readers
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        carousel.appendChild(liveRegion);
        
        // Update live region when slide changes
        const originalShowSlide = showSlide;
        showSlide = function(index) {
            originalShowSlide.call(this, index);
            const slideTitle = items[index].querySelector('.title').textContent;
            liveRegion.textContent = `Slide ${index + 1}: ${slideTitle}`;
        };
    }
    
    enhanceAccessibility();
    
    // Performance monitoring
    function monitorPerformance() {
        const observer = new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
                if (entry.entryType === 'measure' && entry.name.includes('carousel')) {
                    console.log(`Carousel performance: ${entry.name} took ${entry.duration}ms`);
                }
            });
        });
        
        observer.observe({ entryTypes: ['measure'] });
    }
    
    if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'development') {
        monitorPerformance();
    }
});
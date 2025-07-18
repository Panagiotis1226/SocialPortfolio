// Global variables
let isLoading = true;
let testimonialSwiper = null;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize App
function initializeApp() {
    // Remove loading screen after a delay
    setTimeout(() => {
        hideLoadingScreen();
    }, 1500);

    // Initialize all features
    initializeNavigation();
    initializeThemeToggle();
    initializeScrollEffects();
    initializePortfolio();
    initializeAnimatedCounters();
    initializeSkillBars();
    initializeTestimonials();
    initializeFAQ();
    initializeContactInteractions();
    initializeImageModal();
    initializeBackToTop();
    initializeLazyLoading();
    initializeTypingEffect();
    initializeParallax();
    initializeParticles();
    initializeTyped();
    
    // Add intersection observer for animations
    initializeScrollAnimations();
}

// Loading Screen
function hideLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }
    isLoading = false;
}

// Navigation
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background change on scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(26, 26, 46, 0.98)';
            navbar.style.backdropFilter = 'blur(15px)';
        } else {
            navbar.style.background = 'rgba(26, 26, 46, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    });
}

// Theme Toggle
function initializeThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    const icon = themeToggle?.querySelector('i');

    // Get saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(icon, savedTheme);

    themeToggle?.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(icon, newTheme);
        
        // Add animation effect
        themeToggle.style.transform = 'scale(0.8)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 150);
    });
}

function updateThemeIcon(icon, theme) {
    if (icon) {
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// Scroll Effects
function initializeScrollEffects() {
    let ticking = false;

    function updateScrollEffects() {
        const scrolled = window.pageYOffset;
        
        // Parallax effect for hero
        // const hero = document.querySelector('.hero');
        // if (hero) {
        //     hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        // }

        // Update back to top button
        updateBackToTop();
        
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    });
}

// Portfolio Filter
function initializePortfolio() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            portfolioItems.forEach((item, index) => {
                setTimeout(() => {
                    if (filterValue === 'all') {
                        item.style.display = 'block';
                        item.style.animation = 'fadeInUp 0.5s ease-in-out';
                    } else {
                        if (item.getAttribute('data-category') === filterValue) {
                            item.style.display = 'block';
                            item.style.animation = 'fadeInUp 0.5s ease-in-out';
                        } else {
                            item.style.display = 'none';
                        }
                    }
                }, index * 100);
            });
        });
    });

    // Add hover effects
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) {
                this.style.transform = 'translateY(-15px) scale(1.02)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            if (window.innerWidth > 768) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
}

// Animated Counters
function initializeAnimatedCounters() {
    const counters = document.querySelectorAll('.counter');
    const options = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, options);

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const increment = target / 100;
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (target === 100 ? '' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 20);
}

// Skill Progress Bars
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.progress-fill');
    const options = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.getAttribute('data-width');
                
                setTimeout(() => {
                    progressBar.style.width = width + '%';
                }, 500);
                
                observer.unobserve(entry.target);
            }
        });
    }, options);

    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Testimonials Slider
function initializeTestimonials() {
    if (typeof Swiper !== 'undefined') {
        testimonialSwiper = new Swiper('.testimonials-slider', {
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            effect: 'slide',
            speed: 800,
            spaceBetween: 30,
            breakpoints: {
                768: {
                    slidesPerView: 1,
                },
                1024: {
                    slidesPerView: 1,
                }
            }
        });
    }
}

// FAQ Accordion
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });
}

// Contact interactions (simplified)
function initializeContactInteractions() {
    const socialLinks = document.querySelectorAll('.social-link-large');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const isEmail = this.classList.contains('email');
            const isInstagram = this.classList.contains('instagram');
            
            if (isEmail) {
                showNotification('Opening your email client...', 'info');
            } else if (isInstagram) {
                showNotification('Opening Instagram...', 'info');
            }
        });
    });
}

// Image Modal
function initializeImageModal() {
    const modal = document.getElementById('imageModal');
    const modalImage = modal?.querySelector('.modal-image');
    const modalTitle = modal?.querySelector('.modal-title');
    const modalDescription = modal?.querySelector('.modal-description');
    const modalClose = modal?.querySelector('.modal-close');
    const viewButtons = document.querySelectorAll('.view-btn');

    viewButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const portfolioItem = this.closest('.portfolio-item');
            const imageSrc = this.getAttribute('data-image');
            const title = portfolioItem.querySelector('.portfolio-info h3').textContent;
            const description = portfolioItem.querySelector('.portfolio-info p').textContent;

            if (modal && modalImage && modalTitle && modalDescription) {
                modalImage.src = imageSrc;
                modalImage.alt = title;
                modalTitle.textContent = title;
                modalDescription.textContent = description;
                modal.classList.add('show');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal
    function closeModal() {
        if (modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    }

    modalClose?.addEventListener('click', closeModal);
    modal?.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal?.classList.contains('show')) {
            closeModal();
        }
    });
}

// Back to Top Button
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

function updateBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    }
}

// Lazy Loading and Image Error Handling
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    // Add error handling for all images
    images.forEach(img => {
        img.addEventListener('error', function() {
            console.log('Failed to load image:', this.src);
            this.style.display = 'none';
            
            // Create a fallback element
            const fallback = document.createElement('div');
            fallback.style.cssText = `
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 100%;
                background: var(--bg-tertiary);
                color: var(--text-secondary);
                font-size: 1rem;
                text-align: center;
                padding: 2rem;
                border-radius: 8px;
            `;
            fallback.innerHTML = `
                <div>
                    <i class="fas fa-image" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                    <p>Image Preview<br>Click "View Full Size" to see the flyer</p>
                </div>
            `;
            
            this.parentElement.appendChild(fallback);
        });
        
        img.addEventListener('load', function() {
            console.log('Successfully loaded image:', this.src);
            this.classList.add('loaded');
        });
    });
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('fade-in');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Typing Effect
function initializeTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && !isLoading) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 80);
    }
}

function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    setTimeout(type, 500); // Delay to start after loading
}

// Parallax Effect
function initializeParallax() {
    const parallaxElements = document.querySelectorAll('.floating-card');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach((element, index) => {
            const rate = scrolled * -0.2 * (index + 1);
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

// Particles.js
function initializeParticles() {
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#ffffff"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                }
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "push": {
                    "particles_nb": 4
                }
            }
        },
        "retina_detect": true
    });
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll(`
        .service-card, 
        .portfolio-item, 
        .stat-item, 
        .timeline-item,
        .testimonial-content,
        .faq-item,
        .contact-item
    `);
    
    animatedElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add notification styles
    const bgColors = {
        success: '#4CAF50',
        error: '#f44336',
        info: '#2196F3',
        warning: '#ff9800'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${bgColors[type] || bgColors.info};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 350px;
        font-weight: 500;
        font-size: 0.95rem;
        line-height: 1.4;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
    
    // Click to dismiss
    notification.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    });
}

// Touch and Swipe Support for Mobile
function initializeTouchSupport() {
    let startX, startY, distX, distY;
    const threshold = 50;
    
    document.addEventListener('touchstart', function(e) {
        const touch = e.touches[0];
        startX = touch.clientX;
        startY = touch.clientY;
    });
    
    document.addEventListener('touchend', function(e) {
        if (!startX || !startY) return;
        
        const touch = e.changedTouches[0];
        distX = touch.clientX - startX;
        distY = touch.clientY - startY;
        
        // Swipe detection for testimonials
        if (Math.abs(distX) > Math.abs(distY) && Math.abs(distX) > threshold) {
            if (testimonialSwiper) {
                if (distX > 0) {
                    testimonialSwiper.slidePrev();
                } else {
                    testimonialSwiper.slideNext();
                }
            }
        }
        
        startX = startY = null;
    });
}

// Performance Optimization
function optimizePerformance() {
    // Debounce scroll events
    let scrollTimeout;
    const originalScrollHandler = window.onscroll;
    
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(function() {
            if (originalScrollHandler) {
                originalScrollHandler();
            }
        }, 10);
    });
    
    // Preload critical images
    const criticalImages = ['SundayFlyer.png', 'SAMEDI.png', 'VENDREDI.png'];
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize touch support and performance optimizations
document.addEventListener('DOMContentLoaded', function() {
    initializeTouchSupport();
    optimizePerformance();
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from { 
            opacity: 0; 
            transform: translateY(30px); 
        }
        to { 
            opacity: 1; 
            transform: translateY(0); 
        }
    }
    
    .fade-in {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .fade-in.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .notification {
        cursor: pointer;
    }
    
    .notification:hover {
        transform: translateX(-5px) !important;
    }
`;
document.head.appendChild(style);

// Error handling
window.addEventListener('error', function(e) {
    console.error('An error occurred:', e.error);
    // Could show user-friendly error message here
});

// Service Worker Registration (for future PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Could register service worker here for offline capabilities
    });
} 

function initializeTyped() {
    new Typed('#typed-subtitle', {
        strings: [
            'Bringing Community Together Through Entertainment',
            'From Nightlife to Family Fun',
            'Creative Designs for Arcades and Events',
            'Engaging Social Media for Gaming Specialists'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 1500,
        loop: true
    });
} 
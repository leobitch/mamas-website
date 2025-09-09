/* =====================================
   Christina Bradtke Health Coach Website
   Main JavaScript Functionality
   ===================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollEffects();
    initAnimations();
    initContactForm();
    initStickyBooking();
    initSpiritualFeatures();
    initSmoothScrolling();
    initScrollToTop();
});

/* =====================================
   Navigation Functionality
   ===================================== */
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active nav link highlighting
    updateActiveNavLink();
    window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

/* =====================================
   Scroll Effects and Animations
   ===================================== */
function initScrollEffects() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements that should fade in
    const fadeElements = document.querySelectorAll('.service-card, .testimonial-card, .principle-card, .food-category');
    fadeElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

function initAnimations() {
    // Counter animation for stats (if needed in future)
    animateCounters();
    
    // Parallax effect for hero section
    initParallax();
    
    // Typing effect for hero text (optional enhancement)
    initTypingEffect();
}

function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            counter.textContent = Math.floor(current);
            
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            }
        }, 16);
    });
}

function initParallax() {
    const hero = document.querySelector('.hero');
    
    if (hero && window.innerWidth > 768) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        });
    }
}

function initTypingEffect() {
    const typewriterElements = document.querySelectorAll('[data-typewriter]');
    
    typewriterElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        
        let i = 0;
        const typeInterval = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);
            }
        }, 100);
    });
}

/* =====================================
   Contact Form Functionality
   ===================================== */
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', handleFormSubmission);
        
        // Real-time form validation
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
        });
    }
}

function handleFormSubmission(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Validate all fields
    if (!validateForm(form)) {
        showNotification('Bitte füllen Sie alle Pflichtfelder korrekt aus.', 'error');
        return;
    }
    
    // Show loading state
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Wird gesendet...';
    submitButton.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Reset form
        form.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Show success message
        showNotification('Vielen Dank für Ihre Nachricht! Ich melde mich schnellstmöglich bei Ihnen.', 'success');
        
        // Track form submission (Google Analytics, if implemented)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submit', {
                'event_category': 'Contact',
                'event_label': 'Contact Form'
            });
        }
    }, 2000);
}

function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField({ target: field })) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(event) {
    const field = event.target;
    const value = field.value.trim();
    const fieldType = field.type;
    const fieldName = field.name;
    
    // Remove existing error
    clearFieldError({ target: field });
    
    // Check if required field is empty
    if (field.required && !value) {
        showFieldError(field, 'Dieses Feld ist erforderlich.');
        return false;
    }
    
    // Email validation
    if (fieldType === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Bitte geben Sie eine gültige E-Mail-Adresse ein.');
            return false;
        }
    }
    
    // Phone validation (optional)
    if (fieldName === 'phone' && value) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
            showFieldError(field, 'Bitte geben Sie eine gültige Telefonnummer ein.');
            return false;
        }
    }
    
    // Message length validation
    if (fieldName === 'message' && value && value.length < 10) {
        showFieldError(field, 'Ihre Nachricht sollte mindestens 10 Zeichen lang sein.');
        return false;
    }
    
    return true;
}

function showFieldError(field, message) {
    field.classList.add('error');
    
    // Create error message element
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    
    // Insert error message after the field
    field.parentNode.insertBefore(errorElement, field.nextSibling);
}

function clearFieldError(event) {
    const field = event.target;
    field.classList.remove('error');
    
    // Remove error message
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

/* =====================================
   Notification System
   ===================================== */
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
}

/* =====================================
   Smooth Scrolling
   ===================================== */
function initSmoothScrolling() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* =====================================
   Scroll to Top Button
   ===================================== */
function initScrollToTop() {
    // Create scroll to top button
    const scrollButton = document.createElement('button');
    scrollButton.className = 'scroll-to-top';
    scrollButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollButton.setAttribute('aria-label', 'Nach oben scrollen');
    document.body.appendChild(scrollButton);
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollButton.classList.add('visible');
        } else {
            scrollButton.classList.remove('visible');
        }
    });
    
    // Scroll to top functionality
    scrollButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* =====================================
   Utility Functions
   ===================================== */

// Debounce function for performance optimization
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Get scroll position
function getScrollPosition() {
    return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
}

/* =====================================
   Cookie Consent (Future Enhancement)
   ===================================== */
function initCookieConsent() {
    // This can be implemented later if GDPR compliance is needed
    const cookieConsent = localStorage.getItem('cookieConsent');
    
    if (!cookieConsent) {
        showCookieBanner();
    }
}

function showCookieBanner() {
    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.innerHTML = `
        <div class="cookie-content">
            <p>Diese Website verwendet Cookies, um Ihnen die bestmögliche Erfahrung zu bieten.</p>
            <div class="cookie-buttons">
                <button onclick="acceptCookies()" class="btn btn-primary">Akzeptieren</button>
                <button onclick="declineCookies()" class="btn btn-secondary">Ablehnen</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(banner);
}

function acceptCookies() {
    localStorage.setItem('cookieConsent', 'accepted');
    document.querySelector('.cookie-banner').remove();
}

function declineCookies() {
    localStorage.setItem('cookieConsent', 'declined');
    document.querySelector('.cookie-banner').remove();
}

/* =====================================
   Performance Optimization
   ===================================== */

// Lazy loading for images (future enhancement)
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Preload critical resources
function preloadResources() {
    const criticalResources = [
        '/css/style.css',
        '/css/responsive.css',
        '/js/main.js'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = resource.endsWith('.css') ? 'style' : 'script';
        document.head.appendChild(link);
    });
}

/* =====================================
   Error Handling
   ===================================== */
window.addEventListener('error', function(event) {
    console.error('JavaScript Error:', event.error);
    
    // Optional: Send error to analytics or error tracking service
    if (typeof gtag !== 'undefined') {
        gtag('event', 'exception', {
            'description': event.error.message,
            'fatal': false
        });
    }
});

/* =====================================
   Browser Compatibility Checks
   ===================================== */
function checkBrowserSupport() {
    // Check for modern JavaScript features
    const supportsES6 = (function() {
        try {
            new Function("(a = 0) => a");
            return true;
        } catch (err) {
            return false;
        }
    })();
    
    if (!supportsES6) {
        console.warn('Browser does not support ES6 features. Some functionality may be limited.');
    }
    
    // Check for CSS Grid support
    if (!CSS.supports('display', 'grid')) {
        document.body.classList.add('no-grid-support');
    }
    
    // Check for Intersection Observer support
    if (!('IntersectionObserver' in window)) {
        console.warn('IntersectionObserver not supported. Falling back to scroll-based animations.');
        // Fallback to scroll-based animations
        initScrollBasedAnimations();
    }
}

function initScrollBasedAnimations() {
    window.addEventListener('scroll', throttle(function() {
        const fadeElements = document.querySelectorAll('.fade-in:not(.visible)');
        fadeElements.forEach(element => {
            if (isInViewport(element)) {
                element.classList.add('visible');
            }
        });
    }, 100));
}

/* =====================================
   Spiritual Features
   ===================================== */
function initSpiritualFeatures() {
    // Angel card functionality
    const drawAngelCardBtn = document.getElementById('drawAngelCard');
    const angelCardDisplay = document.getElementById('dailyAngelCard');
    
    if (drawAngelCardBtn && angelCardDisplay) {
        const angelCards = [
            {
                symbol: '✨',
                message: 'Vertraue dem Prozess deiner Heilung. Die Engel stehen dir zur Seite.',
                angel: 'Erzengel Raphael',
                color: 'linear-gradient(135deg, #c8b5d6 0%, #f7f4f0 100%)'
            },
            {
                symbol: '🕊️',
                message: 'Friede und Liebe umgeben dich. Alles ist gut so wie es ist.',
                angel: 'Erzengel Michael',
                color: 'linear-gradient(135deg, #9caf88 0%, #f7f4f0 100%)'
            },
            {
                symbol: '💫',
                message: 'Deine innere Stimme führt dich auf den richtigen Weg. Vertraue darauf.',
                angel: 'Erzengel Gabriel',
                color: 'linear-gradient(135deg, #d4a574 0%, #f7f4f0 100%)'
            },
            {
                symbol: '🌟',
                message: 'Du bist ein Licht in dieser Welt. Deine Heilung beginnt jetzt.',
                angel: 'Erzengel Uriel',
                color: 'linear-gradient(135deg, #d4af37 0%, #f7f4f0 100%)'
            },
            {
                symbol: '🌸',
                message: 'Die Engel senden dir bedingungslose Liebe und Mitgefühl.',
                angel: 'Erzengel Chamuel',
                color: 'linear-gradient(135deg, #d4a574 0%, #c8b5d6 100%)'
            }
        ];
        
        drawAngelCardBtn.addEventListener('click', function() {
            const randomCard = angelCards[Math.floor(Math.random() * angelCards.length)];
            
            // Add animation
            angelCardDisplay.style.opacity = '0';
            angelCardDisplay.style.transform = 'scale(0.9)';
            
            setTimeout(() => {
                angelCardDisplay.innerHTML = `
                    <div class="angel-card-front" style="background: ${randomCard.color}">
                        <h4>Deine heutige Engel-Botschaft:</h4>
                        <div class="angel-symbol">${randomCard.symbol}</div>
                        <p class="angel-message">"${randomCard.message}"</p>
                        <p class="angel-name">- ${randomCard.angel} -</p>
                    </div>
                `;
                
                angelCardDisplay.style.opacity = '1';
                angelCardDisplay.style.transform = 'scale(1)';
            }, 300);
        });
    }
    
    // Moon phase functionality (simplified)
    updateMoonPhase();
    
    // Meditation downloads
    const downloadBtns = document.querySelectorAll('.download-btn');
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const downloadType = this.getAttribute('data-download');
            
            // Simulate download
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Wird heruntergeladen...';
            this.style.pointerEvents = 'none';
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-check"></i> Download abgeschlossen!';
                this.style.background = 'var(--success)';
                
                setTimeout(() => {
                    const originalText = this.textContent;
                    this.innerHTML = `
<i class="fas fa-download"></i> ${this.textContent.split(' ')[0]}
                    `;
                    this.style.pointerEvents = 'auto';
                    this.style.background = 'var(--primary-light)';
                }, 2000);
            }, 1500);
        });
    });
    
    // Community links
    const communityLinks = document.querySelectorAll('.community-link');
    communityLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Simulate joining community
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Wird geladen...';
            this.style.pointerEvents = 'none';
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-check"></i> Beigetreten!';
                this.style.background = 'var(--success)';
                this.style.color = 'var(--white)';
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.style.pointerEvents = 'auto';
                    this.style.background = '';
                    this.style.color = '';
                }, 2000);
            }, 1500);
        });
    });
}

function updateMoonPhase() {
    // Simplified moon phase calculation based on current date
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    
    // Calculate moon phase (simplified algorithm)
    const totalDays = Math.floor((now - new Date(year, 0, 6)) / (1000 * 60 * 60 * 24));
    const lunarCycle = 29.53;
    const moonAge = (totalDays % lunarCycle);
    const moonPhase = moonAge / lunarCycle;
    
    const moonPhases = [
        { symbol: '🌑', name: 'Neumond', meaning: 'Zeit für neue Beginn und Absichten setzen' },
        { symbol: '🌒', name: 'zunehmender Mond', meaning: 'Zeit für Wachstum und Entwicklung' },
        { symbol: '🌓', name: 'erstes Viertel', meaning: 'Zeit für Entscheidungen und Durchbruch' },
        { symbol: '🌔', name: 'zunehmender Mond', meaning: 'Zeit für Vollendung und Integration' },
        { symbol: '🌕', name: 'Vollmond', meaning: 'Zeit für Fülle und Ernte' },
        { symbol: '🌖', name: 'abnehmender Mond', meaning: 'Zeit für Loslassen und Reinigung' },
        { symbol: '🌗', name: 'letztes Viertel', meaning: 'Zeit für Reflexion und Bewertung' },
        { symbol: '🌘', name: 'abnehmender Mond', meaning: 'Zeit für Vorbereitung auf Neuanfang' }
    ];
    
    const currentPhaseIndex = Math.floor(moonPhase * 8);
    const currentPhase = moonPhases[currentPhaseIndex] || moonPhases[0];
    
    const moonPhaseElement = document.getElementById('currentMoonPhase');
    if (moonPhaseElement) {
        moonPhaseElement.innerHTML = `
            <div class="moon-icon ${currentPhaseIndex === 5 ? 'waning-gibbous' : ''}">${currentPhase.symbol}</div>
            <div class="moon-info">
                <strong>${currentPhase.name}</strong>
                <p>${currentPhase.meaning}</p>
            </div>
        `;
    }
}

/* =====================================
   Utility Functions
   ===================================== */
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}


// Initialize browser compatibility checks
checkBrowserSupport();

/* =====================================
   Enhanced Contact Form & Booking Modal
   ===================================== */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const stickyBookingBtn = document.getElementById('stickyBookingBtn');
    const bookingModal = document.getElementById('bookingModal');
    const closeModal = document.querySelector('.close');

    // Initialize booking modal
    if (stickyBookingBtn && bookingModal) {
        stickyBookingBtn.addEventListener('click', function() {
            bookingModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });

        // Close modal functionality
        if (closeModal) {
            closeModal.addEventListener('click', function() {
                bookingModal.style.display = 'none';
                document.body.style.overflow = '';
            });
        }

        // Close modal when clicking outside
        window.addEventListener('click', function(event) {
            if (event.target === bookingModal) {
                bookingModal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });

        // Handle booking button clicks
        const bookingBtns = document.querySelectorAll('.booking-btn');
        bookingBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                if (this.getAttribute('href') === '#contact') {
                    e.preventDefault();
                    bookingModal.style.display = 'none';
                    document.body.style.overflow = '';
                    
                    // Smooth scroll to contact form
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                        contactSection.scrollIntoView({ 
                            behavior: 'smooth',
                            block: 'start'
                        });
                        
                        // Focus on the first form field
                        setTimeout(() => {
                            const firstInput = contactForm.querySelector('input[type="text"]');
                            if (firstInput) firstInput.focus();
                        }, 1000);
                    }
                }
            });
        });
    }

    // Enhanced form validation
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateContactForm()) {
                // Simulate form submission
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                
                // Show loading state
                submitBtn.innerHTML = 'Wird gesendet... <i class="fas fa-spinner fa-spin"></i>';
                submitBtn.disabled = true;
                
                // Simulate API call
                setTimeout(() => {
                    // Show success message
                    showFormSuccess('Vielen Dank! Deine Nachricht wurde erfolgreich gesendet. Ich melde mich innerhalb von 24 Stunden bei dir.');
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Reset button
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        const successMsg = document.querySelector('.form-success');
                        if (successMsg) successMsg.classList.remove('show');
                    }, 5000);
                    
                }, 2000);
            }
        });

        // Real-time validation
        const formFields = contactForm.querySelectorAll('input, select, textarea');
        formFields.forEach(field => {
            field.addEventListener('blur', function() {
                validateField(this);
            });
            
            field.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });
    }
}

function validateContactForm() {
    const form = document.getElementById('contactForm');
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });

    return isValid;
}

function validateField(field) {
    const fieldName = field.name;
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Remove previous error state
    field.classList.remove('error');
    const errorElement = field.parentElement.querySelector('.error-message');
    if (errorElement) {
        errorElement.classList.remove('show');
    }

    // Validation rules
    switch (fieldName) {
        case 'name':
            if (value.length < 2) {
                isValid = false;
                errorMessage = 'Bitte gib deinen Vornamen ein (min. 2 Zeichen).';
            }
            break;
            
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Bitte gib eine gültige E-Mail-Adresse ein.';
            }
            break;
            
        case 'interest':
            if (!value) {
                isValid = false;
                errorMessage = 'Bitte wähle ein Interessensgebiet aus.';
            }
            break;
            
        case 'message':
            if (value.length < 10) {
                isValid = false;
                errorMessage = 'Bitte gib eine Nachricht ein (min. 10 Zeichen).';
            }
            break;
            
        case 'privacy':
            if (!field.checked) {
                isValid = false;
                errorMessage = 'Die Zustimmung zur Datenschutzerklärung ist erforderlich.';
            }
            break;
    }

    if (!isValid) {
        field.classList.add('error');
        if (errorElement) {
            errorElement.textContent = errorMessage;
            errorElement.classList.add('show');
        } else {
            // Create error element if it doesn't exist
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message show';
            errorDiv.textContent = errorMessage;
            field.parentElement.appendChild(errorDiv);
        }
    }

    return isValid;
}

function showFormSuccess(message) {
    const form = document.getElementById('contactForm');
    const existingSuccess = form.querySelector('.form-success');
    
    if (existingSuccess) {
        existingSuccess.remove();
    }
    
    const successDiv = document.createElement('div');
    successDiv.className = 'form-success show';
    successDiv.textContent = message;
    
    form.insertBefore(successDiv, form.firstChild);
}

// Add form validation styles to head
const style = document.createElement('style');
style.textContent = `
    .form-group {
        position: relative;
    }
    
    .form-group .error-message {
        position: absolute;
        left: 0;
        top: 100%;
        font-size: 12px;
        color: #c85a54;
        margin-top: 2px;
    }
`;
document.head.appendChild(style);

/* =====================================
   Sticky Booking Button
   ===================================== */
function initStickyBooking() {
    const stickyBtn = document.getElementById('stickyBookingBtn');
    
    if (stickyBtn) {
        // Show button after user scrolls down
        window.addEventListener('scroll', throttle(function() {
            const scrollPosition = window.pageYOffset;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            
            // Show button when user has scrolled past hero section
            if (scrollPosition > windowHeight * 0.5) {
                stickyBtn.classList.add('visible');
            } else {
                stickyBtn.classList.remove('visible');
            }
            
            // Hide button when user is near the contact form
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                const contactTop = contactSection.offsetTop;
                const contactHeight = contactSection.offsetHeight;
                
                if (scrollPosition > contactTop - windowHeight && 
                    scrollPosition < contactTop + contactHeight) {
                    stickyBtn.classList.add('hidden');
                } else {
                    stickyBtn.classList.remove('hidden');
                }
            }
        }, 100));
    }
}
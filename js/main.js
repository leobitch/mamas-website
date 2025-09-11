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
    initSmoothScrolling();
    initScrollToTop();
    initNewsletterForms();
    initProductCards();
    initMembershipTiers();
    initVideoTestimonials();
    initBARFCalculator();
    initLoginModal();
    initPremiumFeatures();
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
   Premium Features & E-Commerce
   ===================================== */

function initNewsletterForms() {
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    
    newsletterForms.forEach(form => {
        form.addEventListener('submit', handleNewsletterSubmission);
    });
}

function handleNewsletterSubmission(event) {
    event.preventDefault();
    
    const form = event.target;
    const email = form.querySelector('input[type="email"]').value;
    const button = form.querySelector('button');
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Bitte geben Sie eine gültige E-Mail-Adresse ein.', 'error');
        return;
    }
    
    // Show loading state
    const originalHTML = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    button.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        button.innerHTML = '<i class="fas fa-check"></i>';
        form.querySelector('input').value = '';
        showNotification('🌿 Willkommen! Du erhältst bald deine ersten Heilungsimpulse.', 'success');
        
        // Reset button after 2 seconds
        setTimeout(() => {
            button.innerHTML = originalHTML;
            button.disabled = false;
        }, 2000);
        
        // Track newsletter signup
        if (typeof gtag !== 'undefined') {
            gtag('event', 'newsletter_signup', {
                'event_category': 'Newsletter',
                'event_label': 'Hero Form'
            });
        }
    }, 1500);
}

function initProductCards() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const button = card.querySelector('.btn');
        if (button) {
            button.addEventListener('click', handleProductPurchase);
        }
    });
}

function handleProductPurchase(event) {
    event.preventDefault();
    
    const button = event.target;
    const card = button.closest('.product-card');
    const productName = card.querySelector('h4').textContent;
    const price = card.querySelector('.new-price').textContent;
    
    // Simulate purchase process
    const originalText = button.textContent;
    button.textContent = 'Wird geladen...';
    button.disabled = true;
    
    setTimeout(() => {
        // Show purchase modal (simplified)
        showPurchaseModal(productName, price);
        
        button.textContent = originalText;
        button.disabled = false;
        
        // Track product interest
        if (typeof gtag !== 'undefined') {
            gtag('event', 'product_click', {
                'event_category': 'E-Commerce',
                'event_label': productName,
                'value': parseFloat(price.replace('€', '').replace(',', '.'))
            });
        }
    }, 1000);
}

function showPurchaseModal(productName, price) {
    const modal = document.createElement('div');
    modal.className = 'purchase-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>🛒 ${productName}</h3>
                <button class="modal-close" onclick="this.closest('.purchase-modal').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="product-summary">
                    <p><strong>Preis:</strong> ${price}</p>
                    <p><strong>Sofortiger Download:</strong> ✅</p>
                    <p><strong>30 Tage Geld-zurück-Garantie:</strong> ✅</p>
                </div>
                <div class="payment-options">
                    <button class="btn btn-primary btn-large" onclick="proceedToPayment('${productName}')">
                        💳 Jetzt kaufen
                    </button>
                    <button class="btn btn-outline" onclick="this.closest('.purchase-modal').remove()">
                        Später
                    </button>
                </div>
                <div class="security-badges">
                    <span class="badge">🔒 SSL gesichert</span>
                    <span class="badge">💳 PayPal & Kreditkarte</span>
                </div>
            </div>
        </div>
        <div class="modal-overlay" onclick="this.closest('.purchase-modal').remove()"></div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 100);
}

function proceedToPayment(productName) {
    // In a real implementation, this would redirect to a payment processor
    showNotification(`Weiterleitung zu sicherer Bezahlung für "${productName}"...`, 'info');
    
    // Simulate redirect delay
    setTimeout(() => {
        // This would be replaced with actual payment URL
        console.log('Redirecting to payment processor for:', productName);
        
        // Track conversion
        if (typeof gtag !== 'undefined') {
            gtag('event', 'begin_checkout', {
                'event_category': 'E-Commerce',
                'event_label': productName
            });
        }
    }, 1500);
}

function initMembershipTiers() {
    const tierButtons = document.querySelectorAll('.tier-card .btn');
    
    tierButtons.forEach(button => {
        button.addEventListener('click', handleMembershipSelection);
    });
}

function handleMembershipSelection(event) {
    event.preventDefault();
    
    const button = event.target;
    const tier = button.closest('.tier-card');
    const tierName = tier.querySelector('h3').textContent;
    const price = tier.querySelector('.price').textContent;
    
    showMembershipModal(tierName, price);
}

function showMembershipModal(tierName, price) {
    const modal = document.createElement('div');
    modal.className = 'membership-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>✨ ${tierName} Mitgliedschaft</h3>
                <button class="modal-close" onclick="this.closest('.membership-modal').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="membership-benefits">
                    <h4>Deine Vorteile:</h4>
                    <ul>
                        <li>🌿 Sofortiger Zugang zu allen Inhalten</li>
                        <li>📱 Mobile App inklusive</li>
                        <li>💬 Premium Community</li>
                        <li>🎯 Persönliche Betreuung</li>
                        <li>📚 Alle E-Books inklusive</li>
                        <li>🚀 Monatlich neue Inhalte</li>
                    </ul>
                </div>
                <div class="trial-offer">
                    <div class="trial-badge">🎁 Sonderangebot</div>
                    <h4>7 Tage kostenlos testen</h4>
                    <p>Danach ${price}/Monat - jederzeit kündbar</p>
                </div>
                <div class="membership-actions">
                    <button class="btn btn-primary btn-large" onclick="startFreeTrial('${tierName}')">
                        🚀 Kostenlos starten
                    </button>
                    <button class="btn btn-outline" onclick="this.closest('.membership-modal').remove()">
                        Später entscheiden
                    </button>
                </div>
            </div>
        </div>
        <div class="modal-overlay" onclick="this.closest('.membership-modal').remove()"></div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 100);
}

function startFreeTrial(tierName) {
    showNotification(`🎉 Perfekt! Deine ${tierName} Mitgliedschaft startet in wenigen Minuten.`, 'success');
    document.querySelector('.membership-modal').remove();
    
    // Track trial start
    if (typeof gtag !== 'undefined') {
        gtag('event', 'trial_start', {
            'event_category': 'Membership',
            'event_label': tierName
        });
    }
}

function initVideoTestimonials() {
    const videoElements = document.querySelectorAll('.video-testimonial');
    
    videoElements.forEach(video => {
        video.addEventListener('click', playVideoTestimonial);
    });
}

function playVideoTestimonial(event) {
    const videoContainer = event.currentTarget;
    const title = videoContainer.querySelector('h4').textContent;
    
    // Create video modal
    const modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.innerHTML = `
        <div class="modal-content video-content">
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="modal-close" onclick="this.closest('.video-modal').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="video-wrapper">
                <div class="video-placeholder">
                    <i class="fas fa-play"></i>
                    <p>Video wird geladen...</p>
                    <small>In der echten Version würde hier das Testimonial-Video abgespielt.</small>
                </div>
            </div>
        </div>
        <div class="modal-overlay" onclick="this.closest('.video-modal').remove()"></div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 100);
}

function initBARFCalculator() {
    // Add BARF calculator functionality
    const calculatorBtn = document.createElement('button');
    calculatorBtn.className = 'floating-calculator';
    calculatorBtn.innerHTML = '🐱 BARF Rechner';
    calculatorBtn.onclick = showBARFCalculator;
    
    // Only show on BARF section
    const barfSection = document.querySelector('#barf');
    if (barfSection) {
        barfSection.appendChild(calculatorBtn);
    }
}

function showBARFCalculator() {
    const modal = document.createElement('div');
    modal.className = 'barf-calculator-modal';
    modal.innerHTML = `
        <div class="modal-content calculator-content">
            <div class="modal-header">
                <h3>🐱 BARF Rechner für Katzen</h3>
                <button class="modal-close" onclick="this.closest('.barf-calculator-modal').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="calculator-body">
                <div class="calc-input-group">
                    <label>Gewicht deiner Katze (kg):</label>
                    <input type="number" id="catWeight" step="0.1" min="1" max="15" placeholder="z.B. 4.5">
                </div>
                <div class="calc-input-group">
                    <label>Aktivitätslevel:</label>
                    <select id="activityLevel">
                        <option value="low">Niedrig (Wohnungskatze)</option>
                        <option value="medium" selected>Mittel (Normal aktiv)</option>
                        <option value="high">Hoch (Sehr aktiv/Freigänger)</option>
                    </select>
                </div>
                <button class="btn btn-primary" onclick="calculateBARF()">🧮 Berechnen</button>
                <div id="barfResult" class="calc-result"></div>
            </div>
        </div>
        <div class="modal-overlay" onclick="this.closest('.barf-calculator-modal').remove()"></div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 100);
}

function calculateBARF() {
    const weight = parseFloat(document.getElementById('catWeight').value);
    const activity = document.getElementById('activityLevel').value;
    const resultDiv = document.getElementById('barfResult');
    
    if (!weight || weight < 1 || weight > 15) {
        resultDiv.innerHTML = '<p class="error">Bitte geben Sie ein gültiges Gewicht zwischen 1-15 kg ein.</p>';
        return;
    }
    
    // BARF calculation based on weight and activity
    let dailyAmount;
    switch(activity) {
        case 'low': dailyAmount = weight * 0.02; break;
        case 'medium': dailyAmount = weight * 0.03; break;
        case 'high': dailyAmount = weight * 0.04; break;
        default: dailyAmount = weight * 0.03;
    }
    
    const meat = dailyAmount * 0.8;
    const bones = dailyAmount * 0.1;
    const liver = dailyAmount * 0.05;
    const organs = dailyAmount * 0.05;
    
    resultDiv.innerHTML = `
        <div class="calc-success">
            <h4>🎯 Tägliche BARF-Ration für deine Katze:</h4>
            <div class="barf-breakdown">
                <div class="barf-item">
                    <span class="amount">${(meat * 1000).toFixed(0)}g</span>
                    <span class="type">Muskelfleisch (80%)</span>
                </div>
                <div class="barf-item">
                    <span class="amount">${(bones * 1000).toFixed(0)}g</span>
                    <span class="type">Fleischige Knochen (10%)</span>
                </div>
                <div class="barf-item">
                    <span class="amount">${(liver * 1000).toFixed(0)}g</span>
                    <span class="type">Leber (5%)</span>
                </div>
                <div class="barf-item">
                    <span class="amount">${(organs * 1000).toFixed(0)}g</span>
                    <span class="type">Andere Organe (5%)</span>
                </div>
            </div>
            <div class="calc-note">
                <p><strong>Gesamtmenge:</strong> ${(dailyAmount * 1000).toFixed(0)}g pro Tag</p>
                <p><em>💡 Tipp: Teile die Menge auf 2-3 Mahlzeiten auf und führe Supplements hinzu.</em></p>
            </div>
        </div>
    `;
}

function initLoginModal() {
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', showLoginModal);
    }
}

function showLoginModal(event) {
    event.preventDefault();
    
    const modal = document.createElement('div');
    modal.className = 'login-modal';
    modal.innerHTML = `
        <div class="modal-content login-content">
            <div class="modal-header">
                <h3>🌿 Soulsgold Login</h3>
                <button class="modal-close" onclick="this.closest('.login-modal').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="login-body">
                <form class="login-form" onsubmit="handleLogin(event)">
                    <div class="form-group">
                        <label>E-Mail:</label>
                        <input type="email" required placeholder="deine@email.de">
                    </div>
                    <div class="form-group">
                        <label>Passwort:</label>
                        <input type="password" required placeholder="••••••••">
                    </div>
                    <button type="submit" class="btn btn-primary btn-large">🔑 Einloggen</button>
                </form>
                <div class="login-divider">oder</div>
                <button class="btn btn-outline btn-large" onclick="showSignupForm()">✨ Kostenloses Konto erstellen</button>
                <div class="login-benefits">
                    <h4>Deine Vorteile als Mitglied:</h4>
                    <ul>
                        <li>🎁 Kostenlose Rezeptsammlung</li>
                        <li>📅 Persönlicher Heilungsplaner</li>
                        <li>💬 Zugang zur Community</li>
                        <li>📚 Exklusive Artikel & Tipps</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="modal-overlay" onclick="this.closest('.login-modal').remove()"></div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 100);
}

function handleLogin(event) {
    event.preventDefault();
    
    const form = event.target;
    const email = form.querySelector('input[type="email"]').value;
    const button = form.querySelector('button');
    
    button.textContent = 'Einloggen...';
    button.disabled = true;
    
    // Simulate login
    setTimeout(() => {
        showNotification('🎉 Willkommen zurück! Du wirst zur Mitgliederbereich weitergeleitet.', 'success');
        document.querySelector('.login-modal').remove();
        
        // Update nav button
        const loginBtn = document.getElementById('loginBtn');
        loginBtn.textContent = 'Mein Konto';
        loginBtn.onclick = () => showNotification('Mitgliederbereich wird geladen...', 'info');
    }, 1500);
}

function showSignupForm() {
    document.querySelector('.login-modal').remove();
    showNotification('Registrierung wird vorbereitet... 🌱', 'info');
}

function initPremiumFeatures() {
    // Add premium animations and effects
    addFloatingElements();
    initParticleEffect();
    initProgressBars();
}

function addFloatingElements() {
    const hero = document.querySelector('.hero');
    if (hero) {
        // Add floating healing symbols
        const symbols = ['🌿', '✨', '🌟', '🕊️', '💎'];
        
        symbols.forEach((symbol, index) => {
            const element = document.createElement('div');
            element.className = 'floating-symbol';
            element.textContent = symbol;
            element.style.cssText = `
                position: absolute;
                font-size: 2rem;
                opacity: 0.6;
                animation: float ${3 + index}s ease-in-out infinite alternate;
                left: ${20 + index * 15}%;
                top: ${30 + index * 10}%;
                z-index: 0;
                pointer-events: none;
            `;
            hero.appendChild(element);
        });
    }
}

function initParticleEffect() {
    // Simple particle effect for premium sections
    const premiumSections = document.querySelectorAll('.membership, .digital-products');
    
    premiumSections.forEach(section => {
        section.addEventListener('mouseenter', createParticles);
    });
}

function createParticles(event) {
    const section = event.currentTarget;
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: var(--secondary-color);
        border-radius: 50%;
        pointer-events: none;
        animation: particle-float 2s ease-out forwards;
        left: ${event.clientX}px;
        top: ${event.clientY}px;
    `;
    
    document.body.appendChild(particle);
    
    setTimeout(() => particle.remove(), 2000);
}

function initProgressBars() {
    // Add progress bars to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        const progressBar = document.createElement('div');
        progressBar.className = 'service-progress';
        progressBar.innerHTML = '<div class="progress-fill"></div>';
        
        card.appendChild(progressBar);
        
        // Animate on hover
        card.addEventListener('mouseenter', () => {
            const fill = progressBar.querySelector('.progress-fill');
            fill.style.width = '100%';
        });
        
        card.addEventListener('mouseleave', () => {
            const fill = progressBar.querySelector('.progress-fill');
            fill.style.width = '0%';
        });
    });
}

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

// Initialize browser compatibility checks
checkBrowserSupport();

// Add CSS for new features
const newStyles = document.createElement('style');
newStyles.textContent = `
    /* Modal Styles */
    .purchase-modal, .membership-modal, .video-modal, .barf-calculator-modal, .login-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .purchase-modal.show, .membership-modal.show, .video-modal.show, 
    .barf-calculator-modal.show, .login-modal.show {
        opacity: 1;
    }
    
    .modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        cursor: pointer;
    }
    
    .modal-content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--white);
        border-radius: var(--radius-xl);
        max-width: 90vw;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: var(--shadow-xl);
    }
    
    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--spacing-lg);
        border-bottom: 1px solid var(--light-gray);
    }
    
    .modal-close {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: var(--medium-gray);
        padding: var(--spacing-xs);
    }
    
    .modal-body {
        padding: var(--spacing-lg);
    }
    
    /* Floating Calculator */
    .floating-calculator {
        position: fixed;
        bottom: 100px;
        right: 20px;
        background: var(--secondary-color);
        color: var(--white);
        border: none;
        padding: var(--spacing-md);
        border-radius: 50px;
        font-weight: 600;
        cursor: pointer;
        box-shadow: var(--shadow-lg);
        z-index: 1000;
        transition: var(--transition-normal);
    }
    
    .floating-calculator:hover {
        transform: translateY(-3px);
        box-shadow: var(--shadow-xl);
    }
    
    /* BARF Calculator Styles */
    .calc-input-group {
        margin-bottom: var(--spacing-md);
    }
    
    .calc-input-group label {
        display: block;
        margin-bottom: var(--spacing-xs);
        font-weight: 600;
        color: var(--primary-color);
    }
    
    .calc-input-group input,
    .calc-input-group select {
        width: 100%;
        padding: var(--spacing-sm);
        border: 2px solid var(--light-gray);
        border-radius: var(--radius-md);
        font-size: 1rem;
    }
    
    .calc-result {
        margin-top: var(--spacing-lg);
    }
    
    .barf-breakdown {
        display: grid;
        gap: var(--spacing-sm);
        margin: var(--spacing-md) 0;
    }
    
    .barf-item {
        display: flex;
        justify-content: space-between;
        padding: var(--spacing-sm);
        background: var(--light-gray);
        border-radius: var(--radius-md);
    }
    
    .barf-item .amount {
        font-weight: 700;
        color: var(--secondary-color);
    }
    
    /* Floating Symbols Animation */
    @keyframes float {
        0% { transform: translateY(0px) rotate(0deg); }
        100% { transform: translateY(-20px) rotate(10deg); }
    }
    
    /* Particle Animation */
    @keyframes particle-float {
        0% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(0, -100px) scale(0);
        }
    }
    
    /* Service Progress Bars */
    .service-progress {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background: var(--light-gray);
        overflow: hidden;
    }
    
    .progress-fill {
        height: 100%;
        width: 0%;
        background: linear-gradient(90deg, var(--secondary-color), var(--secondary-light));
        transition: width 0.5s ease;
    }
    
    /* Security Badges */
    .security-badges {
        display: flex;
        gap: var(--spacing-sm);
        margin-top: var(--spacing-md);
        justify-content: center;
    }
    
    .badge {
        background: var(--healing-cream);
        color: var(--primary-color);
        padding: var(--spacing-xs);
        border-radius: var(--radius-sm);
        font-size: 0.8rem;
        font-weight: 500;
    }
    
    /* Login Benefits */
    .login-benefits {
        margin-top: var(--spacing-lg);
        padding: var(--spacing-md);
        background: var(--light-gray);
        border-radius: var(--radius-md);
    }
    
    .login-benefits h4 {
        color: var(--primary-color);
        margin-bottom: var(--spacing-sm);
    }
    
    .login-benefits ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }
    
    .login-benefits li {
        padding: var(--spacing-xs) 0;
        color: var(--medium-gray);
    }
    
    .login-divider {
        text-align: center;
        margin: var(--spacing-md) 0;
        color: var(--medium-gray);
        position: relative;
    }
    
    .login-divider::before,
    .login-divider::after {
        content: '';
        position: absolute;
        top: 50%;
        width: 40%;
        height: 1px;
        background: var(--light-gray);
    }
    
    .login-divider::before { left: 0; }
    .login-divider::after { right: 0; }
`;
document.head.appendChild(newStyles);
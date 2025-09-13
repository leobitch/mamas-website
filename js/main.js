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
    initKnowledgeLinks();
    initCertificateLinks();
    initRecipeButtons();
    initStickyBookingButton();
    initServiceBookingButtons();
    initShopButtons();
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
    
    // Simulate API call with actual functionality
    setTimeout(() => {
        button.innerHTML = '<i class="fas fa-check"></i>';
        form.querySelector('input').value = '';
        showNotification('🌿 Vielen Dank für Ihre Anmeldung! Sie erhalten in Kürze eine Bestätigungs-E-Mail.', 'success');
        
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
        
        // Here you would typically send the email to your backend/newsletter service
        console.log('Newsletter signup:', email);
        
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
    
    // Show on entire page, not just BARF section
    document.body.appendChild(calculatorBtn);
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', function() {
        const barfSection = document.querySelector('#barf');
        if (barfSection) {
            const rect = barfSection.getBoundingClientRect();
            const visible = rect.top < window.innerHeight && rect.bottom > 0;
            calculatorBtn.style.display = visible ? 'block' : 'none';
        }
    });
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
    const password = form.querySelector('input[type="password"]').value;
    const button = form.querySelector('button');
    
    // Basic validation
    if (!email || !password) {
        showNotification('❌ Bitte füllen Sie alle Felder aus.', 'error');
        return;
    }
    
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('❌ Bitte geben Sie eine gültige E-Mail-Adresse ein.', 'error');
        return;
    }
    
    button.textContent = 'Einloggen...';
    button.disabled = true;
    
    // Simulate login process
    setTimeout(() => {
        // For demo purposes, accept any email/password
        if (password.length >= 6) {
            showNotification('🎉 Willkommen zurück! Du wirst zum Mitgliederbereich weitergeleitet.', 'success');
            document.querySelector('.login-modal').remove();
            
            // Update nav button to show logged in state
            const loginBtn = document.getElementById('loginBtn');
            loginBtn.textContent = 'Mein Konto';
            loginBtn.className = 'nav-link nav-cta logged-in';
            loginBtn.onclick = (e) => {
                e.preventDefault();
                showMemberArea();
            };
            
            // Store login state in localStorage
            localStorage.setItem('soulsgold_logged_in', 'true');
            localStorage.setItem('soulsgold_user_email', email);
            
        } else {
            showNotification('❌ Das Passwort muss mindestens 6 Zeichen lang sein.', 'error');
            button.textContent = '🔑 Einloggen';
            button.disabled = false;
        }
    }, 1500);
}

function showMemberArea() {
    const modal = document.createElement('div');
    modal.className = 'member-area-modal';
    
    const userEmail = localStorage.getItem('soulsgold_user_email') || 'Mitglied';
    
    modal.innerHTML = `
        <div class="modal-content member-content">
            <div class="modal-header">
                <h3>👤 Mein Soulsgold Konto</h3>
                <button class="modal-close" onclick="this.closest('.member-area-modal').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="welcome-section">
                    <h4>🌿 Willkommen zurück!</h4>
                    <p><strong>E-Mail:</strong> ${userEmail}</p>
                    <p><strong>Mitgliedsstatus:</strong> <span class="status-badge premium">✨ Premium</span></p>
                </div>
                
                <div class="member-menu">
                    <h5>📋 Meine Bereiche:</h5>
                    <div class="menu-grid">
                        <button class="menu-item" onclick="showSection('downloads')">
                            <i class="fas fa-download"></i>
                            <span>Meine Downloads</span>
                        </button>
                        <button class="menu-item" onclick="showSection('courses')">
                            <i class="fas fa-graduation-cap"></i>
                            <span>Meine Kurse</span>
                        </button>
                        <button class="menu-item" onclick="showSection('sessions')">
                            <i class="fas fa-calendar"></i>
                            <span>Termine</span>
                        </button>
                        <button class="menu-item" onclick="showSection('community')">
                            <i class="fas fa-users"></i>
                            <span>Community</span>
                        </button>
                        <button class="menu-item" onclick="showSection('profile')">
                            <i class="fas fa-user-cog"></i>
                            <span>Profil</span>
                        </button>
                        <button class="menu-item" onclick="logout()">
                            <i class="fas fa-sign-out-alt"></i>
                            <span>Abmelden</span>
                        </button>
                    </div>
                </div>
                
                <div class="member-stats">
                    <h5>📊 Ihr Fortschritt:</h5>
                    <div class="stats-grid">
                        <div class="stat-item">
                            <span class="stat-number">3</span>
                            <span class="stat-label">Abgeschlossene Kurse</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">12</span>
                            <span class="stat-label">Downloads</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">87%</span>
                            <span class="stat-label">Kurs-Fortschritt</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-overlay" onclick="this.closest('.member-area-modal').remove()"></div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 100);
}

function showSection(sectionName) {
    let message = '';
    switch(sectionName) {
        case 'downloads':
            message = '📥 Ihre Downloads werden geladen...';
            break;
        case 'courses':
            message = '🎓 Ihre Kurse werden geladen...';
            break;
        case 'sessions':
            message = '📅 Ihre Termine werden geladen...';
            break;
        case 'community':
            message = '👥 Community-Bereich wird geöffnet...';
            break;
        case 'profile':
            message = '⚙️ Profil-Einstellungen werden geladen...';
            break;
        default:
            message = `${sectionName} wird geladen...`;
    }
    
    showNotification(message, 'info');
    // In real implementation, this would load the actual section content
}

function logout() {
    localStorage.removeItem('soulsgold_logged_in');
    localStorage.removeItem('soulsgold_user_email');
    
    // Reset nav button
    const loginBtn = document.getElementById('loginBtn');
    loginBtn.textContent = 'Login';
    loginBtn.className = 'nav-link nav-cta';
    loginBtn.onclick = (e) => {
        e.preventDefault();
        showLoginModal(e);
    };
    
    document.querySelector('.member-area-modal').remove();
    showNotification('👋 Sie wurden erfolgreich abgemeldet.', 'success');
}

// Check if user is already logged in on page load
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('soulsgold_logged_in');
    const userEmail = localStorage.getItem('soulsgold_user_email');
    
    if (isLoggedIn === 'true' && userEmail) {
        const loginBtn = document.getElementById('loginBtn');
        if (loginBtn) {
            loginBtn.textContent = 'Mein Konto';
            loginBtn.className = 'nav-link nav-cta logged-in';
            loginBtn.onclick = (e) => {
                e.preventDefault();
                showMemberArea();
            };
        }
    }
}

// Add login status check to initialization
document.addEventListener('DOMContentLoaded', function() {
    // ... existing initialization code ...
    checkLoginStatus();
});

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

/* =====================================
   New Functionality for Missing Links
   ===================================== */

function initKnowledgeLinks() {
    // Handle "Mehr erfahren" links in knowledge section
    const knowledgeLinks = document.querySelectorAll('.topic-link');
    
    knowledgeLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const topicCard = this.closest('.topic-card');
            const topicTitle = topicCard.querySelector('h4').textContent;
            showKnowledgeModal(topicTitle);
        });
    });
}

function showKnowledgeModal(topicTitle) {
    const modal = document.createElement('div');
    modal.className = 'knowledge-modal';
    
    let content = '';
    switch(topicTitle) {
        case 'Trauma & das Gehirn':
            content = `
                <h4>Trauma & das Gehirn - Medical Medium Erkenntnisse</h4>
                <p>Nach Anthony William entstehen traumatische Belastungen durch Glucose-Mangel im Gehirn. Wenn unser Nervensystem überfordert wird, verbraucht es extreme Mengen an Glucose - unserem wichtigsten Gehirn-Treibstoff.</p>
                <h5>Wie Trauma das Gehirn beeinflusst:</h5>
                <ul>
                    <li><strong>Glucose-Depletion:</strong> Stress und Trauma entziehen dem Gehirn lebenswichtige Glucose</li>
                    <li><strong>Adrenalin-Überflutung:</strong> Chronischer Stress produziert schädliches Adrenalin</li>
                    <li><strong>Neurotransmitter-Ungleichgewicht:</strong> Serotonin und Dopamin werden reduziert</li>
                    <li><strong>Gehirn-Entzündung:</strong> Toxische Substanzen verursachen Neuroinflammation</li>
                </ul>
                <h5>Die Lösung - Glucose-reiche Ernährung:</h5>
                <ul>
                    <li>🍌 <strong>Wilde Blaubeeren:</strong> Ultimative Gehirn-Nahrung</li>
                    <li>🍎 <strong>Äpfel:</strong> Stabilisieren Blutzucker und beruhigen</li>
                    <li>🍊 <strong>Orangen:</strong> Vitamin C für Neurotransmitter-Produktion</li>
                    <li>🥭 <strong>Datteln:</strong> Sofortige Glucose für das Gehirn</li>
                    <li>🍯 <strong>Roher Honig:</strong> Heilt und nährt Gehirnzellen</li>
                </ul>
            `;
            break;
        case 'Schwermetalle & Emotionen':
            content = `
                <h4>Schwermetalle & Emotionen - Die versteckte Verbindung</h4>
                <p>Schwermetalle wie Quecksilber, Aluminium und Kupfer lagern sich in unserem Gehirn ab und beeinflussen direkt unsere emotionale Stabilität und geistige Klarheit.</p>
                <h5>Wie Schwermetalle wirken:</h5>
                <ul>
                    <li><strong>Quecksilber:</strong> Verursacht Angst, Depression und emotionale Instabilität</li>
                    <li><strong>Aluminium:</strong> Führt zu Vergesslichkeit und Konzentrationsproblemen</li>
                    <li><strong>Kupfer:</strong> Kann zu Reizbarkeit und Stimmungsschwankungen führen</li>
                    <li><strong>Blei:</strong> Blockiert wichtige Gehirnfunktionen</li>
                </ul>
                <h5>Der Heavy Metal Detox Smoothie (HMDS):</h5>
                <ul>
                    <li>🫐 <strong>Wilde Blaubeeren:</strong> Ziehen Schwermetalle aus dem Gehirn</li>
                    <li>🌿 <strong>Spirulina:</strong> Bindet Toxine im Darm</li>
                    <li>🌱 <strong>Gerstengras:</strong> Entgiftet die Leber</li>
                    <li>🌿 <strong>Koriander:</strong> Mobilisiert Schwermetalle</li>
                    <li>🌊 <strong>Dulse:</strong> Transportiert Metalle sicher aus dem Körper</li>
                </ul>
            `;
            break;
        case 'Adrenalin & das Nervensystem':
            content = `
                <h4>Adrenalin & das Nervensystem - Heilung durch Verstehen</h4>
                <p>Chronische Adrenalin-Ausschüttung ist einer der Hauptverursacher von Angst, PTBS und Nervensystem-Dysregulation. Anthony William erklärt, wie wir unser Nervensystem natürlich beruhigen können.</p>
                <h5>Adrenalin-Problematik:</h5>
                <ul>
                    <li><strong>Korrosive Wirkung:</strong> Adrenalin ätzt buchstäblich unsere Nerven an</li>
                    <li><strong>Gehirnfraktion:</strong> Reduziert kritische Glucose-Reserven</li>
                    <li><strong>Schlafstörungen:</strong> Verhindert erholsamen Tiefschlaf</li>
                    <li><strong>Verdauungsprobleme:</strong> Stört die Magnesäure-Produktion</li>
                </ul>
                <h5>Nervensystem-beruhigende Lebensmittel:</h5>
                <ul>
                    <li>🥥 <strong>Sellerie-Saft:</strong> Natürliche Natrium-Cluster beruhigen Nerven</li>
                    <li>🍌 <strong>Bananen:</strong> Kalium entspannt das Nervensystem</li>
                    <li>🥑 <strong>Avocado:</strong> Gesunde Fette nähren Gehirnzellen</li>
                    <li>🌿 <strong>Zitronenmelisse:</strong> Beruhigt überaktive Nerven</li>
                    <li>🥥 <strong>Gurke:</strong> Hydratiert und kühlt das System</li>
                </ul>
            `;
            break;
        case 'Spirituelle Heilung':
            content = `
                <h4>Spirituelle Heilung - Seele und Körper als Einheit</h4>
                <p>Wahre Heilung geschieht auf allen Ebenen - körperlich, emotional und spirituell. Anthony William betont die Wichtigkeit der Engel-Kommunikation und spirituellen Praktiken für vollständige Genesung.</p>
                <h5>Spirituelle Heilungsmethoden:</h5>
                <ul>
                    <li><strong>Soul Light Infusion:</strong> Licht-Meditation für Seelenheilung</li>
                    <li><strong>Brain & Moon Meditation:</strong> Nutzt Mondphasen für Gehirnheilung</li>
                    <li><strong>Engel-Kommunikation:</strong> Direkte Verbindung zu himmlischen Helfern</li>
                    <li><strong>Spiritual Light of Free Will:</strong> Stärkt die Seelen-Autonomie</li>
                </ul>
                <h5>Spirituelle Schutz-Übungen:</h5>
                <ul>
                    <li>✨ <strong>Weißes Licht-Visualisierung:</strong> Schutz vor negativen Energien</li>
                    <li>🙏 <strong>Dankbarkeits-Meditation:</strong> Erhöht die Schwingung</li>
                    <li>🌙 <strong>Mond-Rituale:</strong> Loslassen und Neuanfang</li>
                    <li>🎵 <strong>Heilungs-Mantras:</strong> 'I am healing, I am loved, I am protected'</li>
                </ul>
            `;
            break;
        default:
            content = `<h4>${topicTitle}</h4><p>Weitere Informationen zu diesem Thema werden bald verfügbar sein.</p>`;
    }
    
    modal.innerHTML = `
        <div class="modal-content knowledge-content">
            <div class="modal-header">
                <h3>🌿 Medical Medium Wissen</h3>
                <button class="modal-close" onclick="this.closest('.knowledge-modal').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                ${content}
                <div class="knowledge-actions">
                    <a href="#contact" class="btn btn-primary" onclick="this.closest('.knowledge-modal').remove()">Persönliche Beratung buchen</a>
                    <button class="btn btn-outline" onclick="this.closest('.knowledge-modal').remove()">Schließen</button>
                </div>
            </div>
        </div>
        <div class="modal-overlay" onclick="this.closest('.knowledge-modal').remove()"></div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 100);
}

function initCertificateLinks() {
    // Handle certificate display links
    const certificateLinks = document.querySelectorAll('.certificate-link');
    
    certificateLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const certificateType = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            showCertificateModal(certificateType);
        });
    });
}

function showCertificate(certificateType) {
    showCertificateModal(certificateType);
}

function showCertificateModal(certificateType) {
    const modal = document.createElement('div');
    modal.className = 'certificate-modal';
    
    let certificateInfo = '';
    switch(certificateType) {
        case 'medical-medium':
            certificateInfo = `
                <h4>🌿 Medical Medium Coach Zertifikat</h4>
                <div class="certificate-details">
                    <p><strong>Ausstellende Institution:</strong> Rise Up Academy (Muneeza Ahmed)</p>
                    <p><strong>Ausbildungsdauer:</strong> 6 Monate intensives Training</p>
                    <p><strong>Schwerpunkte:</strong></p>
                    <ul>
                        <li>Anthony William's Medical Medium Protokolle</li>
                        <li>Trauma-sensible Ernährungsberatung</li>
                        <li>Heavy Metal Detox Begleitung</li>
                        <li>Brain Shots & Heilungssäfte</li>
                        <li>Spirituelle Heilungsansätze</li>
                    </ul>
                    <p><strong>Zertifizierungsjahr:</strong> 2019</p>
                    <div class="certificate-badge">
                        🏅 Zertifizierte Medical Medium Practitioner
                    </div>
                </div>
            `;
            break;
        case 'somatic':
            certificateInfo = `
                <h4>🧠 Somatic Experiencing® Zertifikat</h4>
                <div class="certificate-details">
                    <p><strong>Entwickelt von:</strong> Dr. Peter Levine</p>
                    <p><strong>Ausbildungsdauer:</strong> 3 Jahre (Stufen I-III)</p>
                    <p><strong>Schwerpunkte:</strong></p>
                    <ul>
                        <li>Traumatherapie nach neuesten Erkenntnissen</li>
                        <li>Körperorientierte Traumaarbeit</li>
                        <li>Nervensystem-Regulation</li>
                        <li>Polyvagal-Theorie in der Praxis</li>
                        <li>Ressourcen-orientierte Arbeit</li>
                    </ul>
                    <p><strong>Zertifizierungsjahr:</strong> 2020</p>
                    <div class="certificate-badge">
                        🏅 Somatic Experiencing® Practitioner
                    </div>
                </div>
            `;
            break;
        case 'ihc':
            certificateInfo = `
                <h4>🌐 IHC Mitgliedschafts-Zertifikat</h4>
                <div class="certificate-details">
                    <p><strong>Organisation:</strong> International Health Coach Association</p>
                    <p><strong>Mitgliedschaftsstatus:</strong> Aktives Vollmitglied</p>
                    <p><strong>Qualitätsstandards:</strong></p>
                    <ul>
                        <li>Kontinuierliche Weiterbildung (40h/Jahr)</li>
                        <li>Ethische Richtlinien für Health Coaching</li>
                        <li>Regelmäßige Supervision und Qualitätskontrolle</li>
                        <li>Internationale Best-Practice Standards</li>
                        <li>Versicherungsschutz für Klienten</li>
                    </ul>
                    <p><strong>Mitglied seit:</strong> 2018</p>
                    <div class="certificate-badge">
                        🏅 IHC Certified Health Coach
                    </div>
                </div>
            `;
            break;
        default:
            certificateInfo = '<p>Zertifikatsinformationen werden geladen...</p>';
    }
    
    modal.innerHTML = `
        <div class="modal-content certificate-content">
            <div class="modal-header">
                <h3>📜 Zertifikate & Qualifikationen</h3>
                <button class="modal-close" onclick="this.closest('.certificate-modal').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                ${certificateInfo}
                <div class="certificate-actions">
                    <button class="btn btn-primary" onclick="this.closest('.certificate-modal').remove()">Verstanden</button>
                    <a href="#contact" class="btn btn-outline" onclick="this.closest('.certificate-modal').remove()">Beratung anfragen</a>
                </div>
            </div>
        </div>
        <div class="modal-overlay" onclick="this.closest('.certificate-modal').remove()"></div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 100);
}

function initRecipeButtons() {
    // Handle recipe display buttons
    const recipeLinks = document.querySelectorAll('.recipe-link');
    
    recipeLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const recipeCard = this.closest('.recipe-card');
            const recipeTitle = recipeCard.querySelector('h4').textContent;
            showRecipeModal(recipeTitle);
        });
    });
}

function showRecipeModal(recipeTitle) {
    const modal = document.createElement('div');
    modal.className = 'recipe-modal';
    
    let recipeContent = '';
    switch(recipeTitle) {
        case 'Heavy Metal Detox Smoothie':
            recipeContent = `
                <h4>🥤 Heavy Metal Detox Smoothie (HMDS)</h4>
                <div class="recipe-details">
                    <div class="recipe-info">
                        <span class="recipe-time">⏱️ 5 Min.</span>
                        <span class="recipe-serves">🍽️ 1 Portion</span>
                        <span class="recipe-difficulty">⭐ Einfach</span>
                    </div>
                    <h5>Zutaten:</h5>
                    <ul class="ingredients">
                        <li>2 Bananen (für Kalium und Cremigkeit)</li>
                        <li>2 Tassen wilde Blaubeeren (gefroren oder frisch)</li>
                        <li>1 Tasse frischer Koriander</li>
                        <li>1 Tasse frisches Gerstengras-Pulver oder -Saft</li>
                        <li>1 Tasse Spirulina-Pulver</li>
                        <li>2 Tassen Dulse (Rotalgen-Flocken)</li>
                        <li>1 Tasse reines Wasser oder Kokoswasser</li>
                        <li>1 Tasse Orangensaft (optional für Süße)</li>
                    </ul>
                    <h5>Zubereitung:</h5>
                    <ol class="instructions">
                        <li>Alle Zutaten in einen Hochleistungsmixer geben</li>
                        <li>Bei höchster Stufe 60-90 Sekunden mixen bis cremig</li>
                        <li>Bei Bedarf mehr Wasser hinzufügen für gewünschte Konsistenz</li>
                        <li>Sofort trinken für maximale Wirkung</li>
                    </ol>
                    <div class="recipe-benefits">
                        <h5>🌿 Heilwirkung:</h5>
                        <p>Diese 5 Zutaten arbeiten synergistisch zusammen, um Schwermetalle sicher aus Gehirn und Körper zu entfernen. Wilde Blaubeeren ziehen die Metalle aus dem Gehirn, Spirulina bindet sie im Darm, und Dulse transportiert sie sicher aus dem Körper.</p>
                    </div>
                </div>
            `;
            break;
        case 'Brain Soother Juice':
            recipeContent = `
                <h4>🥤 Brain Soother Juice</h4>
                <div class="recipe-details">
                    <div class="recipe-info">
                        <span class="recipe-time">⏱️ 10 Min.</span>
                        <span class="recipe-serves">🍽️ 2 Portionen</span>
                        <span class="recipe-difficulty">⭐ Einfach</span>
                    </div>
                    <h5>Zutaten:</h5>
                    <ul class="ingredients">
                        <li>4 grüne Äpfel (süß-säuerlich)</li>
                        <li>2 Birnen (für natürliche Süße)</li>
                        <li>1 große Gurke (kühlend und hydratisierend)</li>
                        <li>1 Handvoll frische Zitronenmelisse</li>
                        <li>1/2 Zitrone (Saft)</li>
                        <li>1 Stück frischer Ingwer (2cm, optional)</li>
                    </ul>
                    <h5>Zubereitung:</h5>
                    <ol class="instructions">
                        <li>Äpfel und Birnen entkernen, Gurke schälen</li>
                        <li>Alle Zutaten durch den Entsafter geben</li>
                        <li>Zitronensaft unterrühren</li>
                        <li>Sofort servieren oder bis zu 24h im Kühlschrank lagern</li>
                    </ol>
                    <div class="recipe-benefits">
                        <h5>🙏 Beruhigende Wirkung:</h5>
                        <p>Dieser Saft beruhigt überreiztes Nervensystem und gestresste Gehirnzellen. Zitronenmelisse ist besonders kraftvoll gegen Angst und Nervosität.</p>
                    </div>
                </div>
            `;
            break;
        case 'Brain Builder Juice':
            recipeContent = `
                <h4>🧠 Brain Builder Juice</h4>
                <div class="recipe-details">
                    <div class="recipe-info">
                        <span class="recipe-time">⏱️ 15 Min.</span>
                        <span class="recipe-serves">🍽️ 2 Portionen</span>
                        <span class="recipe-difficulty">⭐ Mittel</span>
                    </div>
                    <h5>Zutaten:</h5>
                    <ul class="ingredients">
                        <li>4 Stangen Staudensellerie</li>
                        <li>1 große Gurke</li>
                        <li>2 Handvoll frischer Spinat</li>
                        <li>1 Handvoll Petersilie</li>
                        <li>2 Äpfel (für Glucose)</li>
                        <li>1/2 Zitrone (Saft)</li>
                        <li>1 kleines Stück frischer Ingwer</li>
                    </ul>
                    <h5>Zubereitung:</h5>
                    <ol class="instructions">
                        <li>Sellerie gründlich waschen und blättrige Teile entfernen</li>
                        <li>Gurke schälen, Äpfel entkernen</li>
                        <li>Grünes Blattgemüse gründlich waschen</li>
                        <li>Alle Zutaten entsaften, mit Zitrone abschmecken</li>
                        <li>Sofort trinken für maximale Enzymwirkung</li>
                    </ol>
                    <div class="recipe-benefits">
                        <h5>⚙️ Gehirn-stärkende Wirkung:</h5>
                        <p>Diese grüne Kraft-Kombination liefert essentielle Mineralien und Vitamine direkt an die Gehirnzellen. Sellerie enthält natürliche Natrium-Cluster, die das Nervensystem nähren.</p>
                    </div>
                </div>
            `;
            break;
        case 'SOS Adrenalin Surge Protector':
            recipeContent = `
                <h4>⚡ SOS Adrenalin Surge Protector</h4>
                <div class="recipe-details">
                    <div class="recipe-info">
                        <span class="recipe-time">⏱️ 2 Min.</span>
                        <span class="recipe-serves">🍽️ 1 Portion</span>
                        <span class="recipe-difficulty">⭐ Sehr einfach</span>
                    </div>
                    <h5>Zutaten:</h5>
                    <ul class="ingredients">
                        <li>1 Tasse junges Kokoswasser (nicht aus Konzentrat)</li>
                        <li>Saft einer halben frischen Zitrone</li>
                        <li>1 Prise hochwertiges Meersalz (optional)</li>
                        <li>1 TL roher Honig (optional, für extra Glucose)</li>
                    </ul>
                    <h5>Zubereitung:</h5>
                    <ol class="instructions">
                        <li>Kokoswasser in ein Glas gießen</li>
                        <li>Zitronensaft frisch auspressen und hinzufügen</li>
                        <li>Bei Bedarf eine kleine Prise Meersalz einrühren</li>
                        <li>Honig unterrühren bis aufgelöst</li>
                        <li>Sofort trinken bei Adrenalinschüben oder Panik</li>
                    </ol>
                    <div class="recipe-benefits">
                        <h5>🌊 Notfall-Schutz:</h5>
                        <p>Dieses einfache Getränk stabilisiert den Elektrolythaushalt und puffert korrosive Adrenalin-Auswirkungen ab. Die Zitrone liefert Vitamin C für die Nebennierenreparatur.</p>
                        <div class="emergency-note">
                            <strong>🚨 Anwendung:</strong> Bei akuten Angstanfällen, Panikattacken oder starkem Stress sofort trinken. Kann mehrmals täglich eingenommen werden.
                        </div>
                    </div>
                </div>
            `;
            break;
        default:
            recipeContent = `<h4>${recipeTitle}</h4><p>Rezept wird geladen...</p>`;
    }
    
    modal.innerHTML = `
        <div class="modal-content recipe-content">
            <div class="modal-header">
                <h3>🍳 Medical Medium Rezepte</h3>
                <button class="modal-close" onclick="this.closest('.recipe-modal').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                ${recipeContent}
                <div class="recipe-actions">
                    <button class="btn btn-primary" onclick="printRecipe()">🖨️ Rezept drucken</button>
                    <button class="btn btn-outline" onclick="this.closest('.recipe-modal').remove()">Schließen</button>
                </div>
            </div>
        </div>
        <div class="modal-overlay" onclick="this.closest('.recipe-modal').remove()"></div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 100);
}

function printRecipe() {
    window.print();
}

function initStickyBookingButton() {
    const stickyBtn = document.getElementById('stickyBookingBtn');
    if (stickyBtn) {
        stickyBtn.addEventListener('click', function() {
            // Scroll to contact section
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

function initServiceBookingButtons() {
    const serviceButtons = document.querySelectorAll('.service-booking-btn');
    
    serviceButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            const serviceName = this.getAttribute('data-service');
            
            // Pre-fill contact form with service information
            setTimeout(() => {
                const contactSection = document.querySelector('#contact');
                if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                    
                    // Pre-fill form fields
                    setTimeout(() => {
                        const subjectSelect = document.getElementById('subject');
                        const messageField = document.getElementById('message');
                        
                        if (subjectSelect && serviceName) {
                            // Map service names to form options
                            const serviceMap = {
                                'Ernährungsberatung': 'nutrition',
                                'Spirituelle Begleitung': 'spiritual',
                                'Ganzheitliches Coaching': 'holistic',
                                'Vorträge & Seminare': 'speaking'
                            };
                            
                            const formValue = serviceMap[serviceName];
                            if (formValue) {
                                subjectSelect.value = formValue;
                            }
                        }
                        
                        if (messageField && serviceName) {
                            messageField.value = `Hallo Christina,\n\nich interessiere mich für Ihre ${serviceName} und würde gerne ein kostenloses Erstgespräch vereinbaren.\n\nBitte kontaktieren Sie mich, um einen Termin zu besprechen.\n\nVielen Dank!`;
                            messageField.focus();
                        }
                    }, 500);
                }
            }, 100);
            
            showNotification(`✨ Perfekt! Scrolle zum Kontaktformular und teile uns deine Wünsche mit.`, 'info');
        });
    });
    
    // Handle course discovery link
    const courseLinks = document.querySelectorAll('.course-link');
    courseLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const coursesSection = document.querySelector('#courses') || document.querySelector('#shop');
            if (coursesSection) {
                coursesSection.scrollIntoView({ behavior: 'smooth' });
            }
            showNotification('🎓 Hier finden Sie unsere aktuellen Kursangebote!', 'info');
        });
    });
}

function initShopButtons() {
    // Handle product purchase buttons
    const buyButtons = document.querySelectorAll('.product-buy-btn');
    const infoButtons = document.querySelectorAll('.product-info-btn');
    const previewButtons = document.querySelectorAll('.product-preview-btn');
    
    buyButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            const productName = this.getAttribute('data-product');
            const price = this.getAttribute('data-price');
            showPurchaseProcess(productName, price);
        });
    });
    
    infoButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            const productName = this.getAttribute('data-product');
            showProductInfo(productName);
        });
    });
    
    previewButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            const productName = this.getAttribute('data-product');
            showProductPreview(productName);
        });
    });
}

function showPurchaseProcess(productName, price) {
    const modal = document.createElement('div');
    modal.className = 'purchase-process-modal';
    
    modal.innerHTML = `
        <div class="modal-content purchase-content">
            <div class="modal-header">
                <h3>🛒 ${productName} bestellen</h3>
                <button class="modal-close" onclick="this.closest('.purchase-process-modal').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="purchase-summary">
                    <h4>📦 Produktdetails:</h4>
                    <div class="product-detail">
                        <span class="detail-label">Produkt:</span>
                        <span class="detail-value">${productName}</span>
                    </div>
                    <div class="product-detail">
                        <span class="detail-label">Preis:</span>
                        <span class="detail-value">${price}</span>
                    </div>
                    <div class="product-detail">
                        <span class="detail-label">Verfügbarkeit:</span>
                        <span class="detail-value">✅ Sofortiger Download</span>
                    </div>
                </div>
                
                <div class="purchase-benefits">
                    <h4>🌟 Was Sie erhalten:</h4>
                    <ul>
                        <li>✨ Sofortigen Zugang nach dem Kauf</li>
                        <li>📱 Lebenslanger Zugriff auf alle Inhalte</li>
                        <li>🔄 Kostenlose Updates</li>
                        <li>💝 30-Tage Geld-zurück-Garantie</li>
                        <li>🏆 Premium-Support von Christina</li>
                    </ul>
                </div>
                
                <div class="purchase-actions">
                    <button class="btn btn-primary btn-large" onclick="processPurchase('${productName}', '${price}')">
                        💳 Jetzt sicher kaufen
                    </button>
                    <button class="btn btn-outline" onclick="requestPersonalConsultation('${productName}')">
                        📞 Persönliche Beratung
                    </button>
                </div>
                
                <div class="security-info">
                    <div class="security-badges">
                        <span class="security-badge">🔒 SSL-verschlüsselt</span>
                        <span class="security-badge">💳 PayPal & Kreditkarte</span>
                        <span class="security-badge">🛡️ Sicher & vertrauensvoll</span>
                    </div>
                    <p class="security-note">Ihre Daten sind bei uns sicher. Wir verwenden modernste Verschlüsselungstechnologie.</p>
                </div>
            </div>
        </div>
        <div class="modal-overlay" onclick="this.closest('.purchase-process-modal').remove()"></div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 100);
}

function processPurchase(productName, price) {
    showNotification(`🔄 Weiterleitung zur sicheren Bezahlung für "${productName}"...`, 'info');
    
    // In a real implementation, this would integrate with Stripe, PayPal, or similar
    setTimeout(() => {
        showNotification(`✅ Vielen Dank für Ihr Interesse! Kontaktieren Sie uns für den Kaufprozess.`, 'success');
        document.querySelector('.purchase-process-modal').remove();
        
        // Scroll to contact form
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
            
            setTimeout(() => {
                const messageField = document.getElementById('message');
                if (messageField) {
                    messageField.value = `Hallo Christina,\n\nich möchte "${productName}" (${price}) kaufen.\n\nBitte senden Sie mir die Zahlungsinformationen und Zugangsdetails.\n\nVielen Dank!`;
                    messageField.focus();
                }
            }, 500);
        }
    }, 2000);
}

function requestPersonalConsultation(productName) {
    document.querySelector('.purchase-process-modal').remove();
    
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        
        setTimeout(() => {
            const messageField = document.getElementById('message');
            if (messageField) {
                messageField.value = `Hallo Christina,\n\nich interessiere mich für "${productName}" und hätte gerne eine persönliche Beratung dazu.\n\nKönnen wir einen Termin für ein kostenloses Gespräch vereinbaren?\n\nVielen Dank!`;
                messageField.focus();
            }
        }, 500);
    }
    
    showNotification('📞 Perfekt! Teilen Sie uns Ihre Fragen im Kontaktformular mit.', 'success');
}

function showProductInfo(productName) {
    const modal = document.createElement('div');
    modal.className = 'product-info-modal';
    
    let productDetails = '';
    
    switch(productName) {
        case 'HMDS Detox Challenge':
            productDetails = `
                <h4>🌿 HMDS Detox Challenge - 21 Tage zur Heilung</h4>
                <div class="product-info-content">
                    <h5>📋 Was ist die HMDS Detox Challenge?</h5>
                    <p>Eine geführte 21-Tage-Kur mit dem berühmten Heavy Metal Detox Smoothie nach Anthony William. Täglich begleiten wir Sie bei der sanften Schwermetall-Ausleitung.</p>
                    
                    <h5>📅 Ablauf der Challenge:</h5>
                    <ul>
                        <li><strong>Tag 1-7:</strong> Sanfte Einführung und Körper-Vorbereitung</li>
                        <li><strong>Tag 8-14:</strong> Intensive Detox-Phase mit täglichen HMDS</li>
                        <li><strong>Tag 15-21:</strong> Integration und Stabilisierung</li>
                    </ul>
                    
                    <h5>🎁 Was Sie erhalten:</h5>
                    <ul>
                        <li>📱 Zugang zur exklusiven Challenge-App</li>
                        <li>🥤 21 verschiedene HMDS-Rezepte</li>
                        <li>📊 Tägliches Fortschritts-Tracking</li>
                        <li>👥 Private Facebook-Gruppe</li>
                        <li>📞 Wöchentliche Live-Q&A Sessions</li>
                        <li>📧 Tägliche Motivation per E-Mail</li>
                    </ul>
                    
                    <h5>💎 Besondere Vorteile:</h5>
                    <ul>
                        <li>🧠 Verbesserte Konzentration und Klarheit</li>
                        <li>😌 Reduzierte Angst und emotionale Blockaden</li>
                        <li>⚡ Mehr Energie und Vitalität</li>
                        <li>😴 Besserer Schlaf</li>
                        <li>🌟 Strahlendere Haut</li>
                    </ul>
                </div>
            `;
            break;
        default:
            productDetails = `<h4>${productName}</h4><p>Detaillierte Produktinformationen werden geladen...</p>`;
    }
    
    modal.innerHTML = `
        <div class="modal-content product-info-content">
            <div class="modal-header">
                <h3>ℹ️ Produktinformation</h3>
                <button class="modal-close" onclick="this.closest('.product-info-modal').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                ${productDetails}
                <div class="product-info-actions">
                    <button class="btn btn-primary" onclick="this.closest('.product-info-modal').remove(); showPurchaseProcess('${productName}', '67€')">
                        🛒 Jetzt kaufen
                    </button>
                    <button class="btn btn-outline" onclick="this.closest('.product-info-modal').remove()">
                        Schließen
                    </button>
                </div>
            </div>
        </div>
        <div class="modal-overlay" onclick="this.closest('.product-info-modal').remove()"></div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 100);
}

function showProductPreview(productName) {
    const modal = document.createElement('div');
    modal.className = 'product-preview-modal';
    
    modal.innerHTML = `
        <div class="modal-content preview-content">
            <div class="modal-header">
                <h3>🎧 ${productName} - Vorschau</h3>
                <button class="modal-close" onclick="this.closest('.product-preview-modal').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="preview-player">
                    <h4>🎵 Hörprobe: Seelenheilung Meditation</h4>
                    <div class="audio-player-placeholder">
                        <i class="fas fa-play-circle"></i>
                        <p>Hier würden Sie eine 3-minütige Hörprobe unserer "Soul Light Infusion Meditation" anhören.</p>
                        <div class="audio-controls">
                            <button class="btn btn-outline">▶️ Hörprobe abspielen</button>
                        </div>
                    </div>
                    
                    <h5>📚 Inhalt der kompletten Sammlung:</h5>
                    <ul class="meditation-list">
                        <li>🌅 Morgen-Meditation (10 Min.)</li>
                        <li>🌙 Abend-Meditation (15 Min.)</li>
                        <li>💚 Soul Light Infusion (20 Min.)</li>
                        <li>🧠 Brain Healing Meditation (25 Min.)</li>
                        <li>🛡️ Schutz-Meditation (12 Min.)</li>
                        <li>😌 Angst-Lösung (18 Min.)</li>
                        <li>❤️ Herz-Chakra Heilung (22 Min.)</li>
                        <li>🌊 Trauma-Release (30 Min.)</li>
                    </ul>
                </div>
                
                <div class="preview-actions">
                    <button class="btn btn-primary" onclick="this.closest('.product-preview-modal').remove(); showPurchaseProcess('${productName}', '47€')">
                        🛒 Komplette Sammlung kaufen
                    </button>
                    <button class="btn btn-outline" onclick="this.closest('.product-preview-modal').remove()">
                        Schließen
                    </button>
                </div>
            </div>
        </div>
        <div class="modal-overlay" onclick="this.closest('.product-preview-modal').remove()"></div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 100);
}

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
    
    /* New Modal Styles */
    .knowledge-modal, .certificate-modal, .recipe-modal,
    .purchase-process-modal, .product-info-modal, .product-preview-modal,
    .member-area-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .knowledge-modal.show, .certificate-modal.show, .recipe-modal.show,
    .purchase-process-modal.show, .product-info-modal.show, .product-preview-modal.show,
    .member-area-modal.show {
        opacity: 1;
    }
    
    .knowledge-content, .certificate-content, .recipe-content,
    .purchase-content, .product-info-content, .preview-content,
    .member-content {
        max-width: 800px;
        max-height: 85vh;
        overflow-y: auto;
        margin: 20px;
    }
    
    /* Recipe Modal Styles */
    .recipe-details h5 {
        color: var(--secondary-color);
        margin-top: var(--spacing-lg);
        margin-bottom: var(--spacing-sm);
        font-size: 1.2rem;
    }
    
    .recipe-info {
        display: flex;
        gap: var(--spacing-md);
        margin-bottom: var(--spacing-lg);
        flex-wrap: wrap;
    }
    
    .recipe-time, .recipe-serves, .recipe-difficulty {
        background: var(--healing-cream);
        padding: var(--spacing-xs) var(--spacing-sm);
        border-radius: var(--radius-md);
        font-size: 0.9rem;
        color: var(--primary-color);
        font-weight: 500;
    }
    
    .ingredients, .instructions {
        margin: var(--spacing-md) 0;
    }
    
    .ingredients li, .instructions li {
        margin-bottom: var(--spacing-xs);
        line-height: 1.6;
    }
    
    .instructions {
        counter-reset: step-counter;
    }
    
    .instructions li {
        counter-increment: step-counter;
        position: relative;
        padding-left: 2em;
    }
    
    .instructions li::before {
        content: counter(step-counter);
        position: absolute;
        left: 0;
        top: 0;
        background: var(--secondary-color);
        color: white;
        width: 1.5em;
        height: 1.5em;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.8em;
        font-weight: bold;
    }
    
    .recipe-benefits {
        background: var(--light-gray);
        padding: var(--spacing-md);
        border-radius: var(--radius-lg);
        margin-top: var(--spacing-lg);
        border-left: 4px solid var(--secondary-color);
    }
    
    .emergency-note {
        background: #fff3cd;
        border: 1px solid #ffeaa7;
        border-radius: var(--radius-md);
        padding: var(--spacing-sm);
        margin-top: var(--spacing-md);
        font-size: 0.9rem;
    }
    
    /* Purchase Modal Styles */
    .purchase-summary {
        background: var(--healing-cream);
        padding: var(--spacing-md);
        border-radius: var(--radius-lg);
        margin-bottom: var(--spacing-lg);
    }
    
    .product-detail {
        display: flex;
        justify-content: space-between;
        margin-bottom: var(--spacing-xs);
        padding: var(--spacing-xs) 0;
        border-bottom: 1px solid var(--light-gray);
    }
    
    .detail-label {
        font-weight: 500;
        color: var(--medium-gray);
    }
    
    .detail-value {
        font-weight: 600;
        color: var(--primary-color);
    }
    
    .purchase-benefits ul {
        list-style: none;
        margin: var(--spacing-sm) 0;
    }
    
    .purchase-benefits li {
        padding: var(--spacing-xs) 0;
        color: var(--dark-gray);
    }
    
    .security-info {
        margin-top: var(--spacing-lg);
        text-align: center;
    }
    
    .security-badges {
        display: flex;
        gap: var(--spacing-sm);
        justify-content: center;
        margin-bottom: var(--spacing-sm);
        flex-wrap: wrap;
    }
    
    .security-badge {
        background: var(--success);
        color: white;
        padding: var(--spacing-xs) var(--spacing-sm);
        border-radius: var(--radius-sm);
        font-size: 0.8rem;
        font-weight: 500;
    }
    
    .security-note {
        font-size: 0.9rem;
        color: var(--medium-gray);
        margin: 0;
    }
    
    /* Member Area Styles */
    .welcome-section {
        background: linear-gradient(135deg, var(--primary-light), var(--secondary-light));
        color: white;
        padding: var(--spacing-lg);
        border-radius: var(--radius-lg);
        margin-bottom: var(--spacing-lg);
    }
    
    .status-badge.premium {
        background: var(--secondary-color);
        color: white;
        padding: var(--spacing-xs) var(--spacing-sm);
        border-radius: var(--radius-sm);
        font-size: 0.8rem;
        font-weight: 500;
    }
    
    .menu-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: var(--spacing-sm);
        margin-top: var(--spacing-sm);
    }
    
    .menu-item {
        background: white;
        border: 2px solid var(--light-gray);
        border-radius: var(--radius-lg);
        padding: var(--spacing-md);
        cursor: pointer;
        transition: var(--transition-normal);
        text-align: center;
    }
    
    .menu-item:hover {
        border-color: var(--secondary-color);
        transform: translateY(-2px);
        box-shadow: var(--shadow-md);
    }
    
    .menu-item i {
        font-size: 1.5rem;
        color: var(--primary-color);
        display: block;
        margin-bottom: var(--spacing-xs);
    }
    
    .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: var(--spacing-md);
        margin-top: var(--spacing-sm);
    }
    
    .stat-item {
        text-align: center;
        background: white;
        padding: var(--spacing-md);
        border-radius: var(--radius-lg);
        border: 1px solid var(--light-gray);
    }
    
    .stat-number {
        display: block;
        font-size: 2rem;
        font-weight: 700;
        color: var(--secondary-color);
    }
    
    .stat-label {
        font-size: 0.9rem;
        color: var(--medium-gray);
    }
    
    /* Logged in state */
    .nav-cta.logged-in {
        background: linear-gradient(135deg, var(--success), #4caf50);
        color: white;
    }
    
    /* Success Metrics Styles */
    .success-metrics {
        margin-top: var(--spacing-xl);
    }
    
    .metrics-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: var(--spacing-lg);
        margin-top: var(--spacing-lg);
    }
    
    .metric-card {
        background: white;
        padding: var(--spacing-lg);
        border-radius: var(--radius-xl);
        text-align: center;
        box-shadow: var(--shadow-md);
        transition: var(--transition-normal);
    }
    
    .metric-card:hover {
        transform: translateY(-5px);
        box-shadow: var(--shadow-lg);
    }
    
    .metric-number {
        font-size: 3rem;
        font-weight: 700;
        color: var(--secondary-color);
        display: block;
        line-height: 1;
    }
    
    .metric-label {
        font-size: 1.2rem;
        font-weight: 600;
        color: var(--primary-color);
        margin: var(--spacing-sm) 0 var(--spacing-xs);
    }
    
    .metric-description {
        color: var(--medium-gray);
        font-size: 0.9rem;
    }
    
    /* Responsive Design */
    @media (max-width: 768px) {
        .modal-content {
            max-width: 95vw;
            margin: 10px;
        }
        
        .menu-grid {
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        }
        
        .stats-grid {
            grid-template-columns: 1fr;
        }
        
        .recipe-info {
            flex-direction: column;
        }
        
        .security-badges {
            flex-direction: column;
            align-items: center;
        }
    }
`;
document.head.appendChild(newStyles);
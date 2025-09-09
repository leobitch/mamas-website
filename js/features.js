/******************************************
 * NEW FEATURES JAVASCRIPT
 * Trust & Credibility, Booking Modal, etc.
 ******************************************/

// Zertifikat-Funktionalität
function showCertificate(certType) {
    const certificates = {
        'medical-medium': {
            title: 'Medical Medium Coach Zertifikat',
            content: 'Hiermit wird bestätigt, dass Christina Bradtke erfolgreich die Ausbildung zum Medical Medium Coach abgeschlossen hat. Die Ausbildung umfasste intensive Studien der Medical Medium Protokolle, Trauma-sensible Ernährungsberatung und die praktische Anwendung von Anthony Williams Heilmethoden.',
            date: 'März 2023',
            issuer: 'Medical Medium Institute'
        },
        'somatic': {
            title: 'Somatic Experiencing® Practitioner',
            content: 'Christina Bradtke hat erfolgreich die Fortbildung in Somatic Experiencing® - einer körperorientierten Traumatherapie - abgeschlossen. Diese Methode nach Dr. Peter Levine unterstützt die sichere Aufarbeitung von Trauma und die Stärkung des Nervensystems.',
            date: 'Juni 2022',
            issuer: 'Somatic Experiencing International'
        },
        'ihc': {
            title: 'IHC Mitgliedschaft',
            content: 'Als Mitglied der Internationalen Heilpraktiker- und Coachvereinigung (IHC) untersteht Christina Bradtke den strengen Qualitätsstandards und ethischen Richtlinien des Verbandes. Die Mitgliedschaft garantiert laufende Fortbildung und den höchsten Standards in der Beratungsqualität.',
            date: 'Seit Januar 2021',
            issuer: 'International Health Coach Association'
        }
    };

    const cert = certificates[certType];
    if (!cert) return;

    // Modal erstellen
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content certificate-modal">
            <span class="close" onclick="closeCertificateModal()">&times;</span>
            <div class="certificate-header">
                <h2>${cert.title}</h2>
                <div class="certificate-date">${cert.date}</div>
            </div>
            <div class="certificate-content">
                <h3>Zertifikatsdetails</h3>
                <p>${cert.content}</p>
                <div class="certificate-date">Ausgestellt von: ${cert.issuer}</div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    modal.style.display = 'block';

    // Event-Listener für Schließen
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeCertificateModal();
        }
    });
}

function closeCertificateModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.removeChild(modal);
    }
}

// Booking Modal Funktionalität
function openBookingModal() {
    const modal = document.getElementById('bookingModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeBookingModal() {
    const modal = document.getElementById('bookingModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Sticky Booking Button Funktionalität
function initializeStickyBooking() {
    const stickyButton = document.querySelector('.sticky-booking-btn');
    if (!stickyButton) return;

    // Intersection Observer für Scroll-Verhalten
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                stickyButton.style.opacity = '0.8';
            } else {
                stickyButton.style.opacity = '1';
            }
        });
    }, {
        threshold: 0.1
    });

    // Beobachte den Kontakt-Bereich
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        observer.observe(contactSection);
    }

    // Klick-Event
    stickyButton.addEventListener('click', openBookingModal);
}

// Kontaktformular mit Dropdown
function initializeEnhancedContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Validiere das Formular
        if (!validateEnhancedForm(data)) {
            return;
        }

        // Simuliere Formular-Absendung
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Wird gesendet...';
        submitBtn.disabled = true;

        setTimeout(() => {
            // Erfolgsmeldung anzeigen
            showFormSuccess('Vielen Dank! Ich melde mich innerhalb von 24 Stunden bei dir.');
            
            // Formular zurücksetzen
            this.reset();
            
            // Button wieder aktivieren
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Newsletter-Anmeldung falls ausgewählt
            if (data.newsletter) {
                subscribeToNewsletter(data.email);
            }
        }, 2000);
    });
}

function validateEnhancedForm(data) {
    const errors = [];
    
    if (!data.name || data.name.trim().length < 2) {
        errors.push('Bitte gib einen gültigen Namen ein.');
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        errors.push('Bitte gib eine gültige E-Mail-Adresse ein.');
    }
    
    if (!data.interest) {
        errors.push('Bitte wähle aus, wofür du dich interessierst.');
    }
    
    if (!data.message || data.message.trim().length < 10) {
        errors.push('Bitte beschreibe kurz deine Situation (mindestens 10 Zeichen).');
    }
    
    if (errors.length > 0) {
        alert('Bitte korrigiere folgende Fehler:\n\n' + errors.join('\n'));
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFormSuccess(message) {
    // Erstelle eine Erfolgsmeldung
    const successDiv = document.createElement('div');
    successDiv.className = 'form-success-message';
    successDiv.innerHTML = `
        <div style="
            background: #d4edda;
            color: #155724;
            padding: 20px;
            border-radius: 8px;
            border: 1px solid #c3e6cb;
            margin: 20px 0;
            text-align: center;
        ">
            <i class="fas fa-check-circle" style="font-size: 2rem; margin-bottom: 10px;"></i>
            <div>${message}</div>
        </div>
    `;
    
    const formContainer = document.querySelector('.contact-form-container');
    if (formContainer) {
        formContainer.insertBefore(successDiv, formContainer.firstChild);
        
        // Nach 5 Sekunden ausblenden
        setTimeout(() => {
            successDiv.style.opacity = '0';
            setTimeout(() => {
                if (successDiv.parentNode) {
                    successDiv.parentNode.removeChild(successDiv);
                }
            }, 500);
        }, 5000);
    }
}

function subscribeToNewsletter(email) {
    // Newsletter-Anmeldung simulieren
    console.log(`Newsletter-Anmeldung für: ${email}`);
    
    // Hier könnte man eine echte API-Anbindung implementieren
    setTimeout(() => {
        console.log('Newsletter-Anmeldung erfolgreich!');
    }, 1000);
}

// Interaktive Testimonials
function initializeInteractiveTestimonials() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Before/After Cases Animation
function initializeBeforeAfterCases() {
    const caseCards = document.querySelectorAll('.case-card');
    
    caseCards.forEach(card => {
        const beforeSection = card.querySelector('.case-before');
        const afterSection = card.querySelector('.case-after');
        
        if (beforeSection && afterSection) {
            // Hover-Effekt für die Case-Karten
            card.addEventListener('mouseenter', function() {
                beforeSection.style.transform = 'scale(1.02)';
                afterSection.style.transform = 'scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                beforeSection.style.transform = 'scale(1)';
                afterSection.style.transform = 'scale(1)';
            });
        }
    });
}

// Trust Indicators Animation
function initializeTrustIndicators() {
    const credentialBadges = document.querySelectorAll('.credential-badge');
    
    credentialBadges.forEach((badge, index) => {
        badge.style.animationDelay = `${index * 0.2}s`;
        badge.style.animation = 'fadeInUp 0.6s ease-out forwards';
    });
}

// Enhanced Form Validation
function initializeFormEnhancements() {
    // Echtzeit-Validierung für E-Mail
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value && !isValidEmail(this.value)) {
                this.style.borderColor = '#dc3545';
                this.style.backgroundColor = '#f8d7da';
                
                // Fehlermeldung anzeigen
                let errorMsg = this.parentNode.querySelector('.error-message');
                if (!errorMsg) {
                    errorMsg = document.createElement('div');
                    errorMsg.className = 'error-message';
                    errorMsg.style.cssText = 'color: #dc3545; font-size: 0.8rem; margin-top: 5px;';
                    this.parentNode.appendChild(errorMsg);
                }
                errorMsg.textContent = 'Bitte gib eine gültige E-Mail-Adresse ein.';
            } else {
                this.style.borderColor = '#28a745';
                this.style.backgroundColor = 'white';
                
                // Fehlermeldung entfernen
                const errorMsg = this.parentNode.querySelector('.error-message');
                if (errorMsg) {
                    errorMsg.remove();
                }
            }
        });
    });
}

// Newsletter-Anmeldung mit Bestätigung
function initializeNewsletterSignup() {
    const newsletterCheckbox = document.querySelector('input[name="newsletter"]');
    if (newsletterCheckbox) {
        newsletterCheckbox.addEventListener('change', function() {
            if (this.checked) {
                // Optional: Weitere Newsletter-Optionen anzeigen
                console.log('Newsletter-Anmeldung aktiviert');
            }
        });
    }
}

// Calendly-Integration
function initializeCalendlyIntegration() {
    // Calendly-Widget initialisieren (wenn Calendly geladen ist)
    if (window.Calendly) {
        const calendlyLink = document.querySelector('a[href*="calendly"]');
        if (calendlyLink) {
            calendlyLink.addEventListener('click', function(e) {
                e.preventDefault();
                Calendly.initPopupWidget({url: this.href});
                return false;
            });
        }
    }
}

// Intersection Observer für Animationen
function initializeScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            }
        });
    }, {
        threshold: 0.1
    });

    // Beobachte verschiedene Elemente
    const animatedElements = document.querySelectorAll('.credential-card, .testimonial-card, .case-card');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Initialisierung aller neuen Features
document.addEventListener('DOMContentLoaded', function() {
    console.log('🌿 Soulsgold Features werden initialisiert...');
    
    initializeStickyBooking();
    initializeEnhancedContactForm();
    initializeInteractiveTestimonials();
    initializeBeforeAfterCases();
    initializeTrustIndicators();
    initializeFormEnhancements();
    initializeNewsletterSignup();
    initializeCalendlyIntegration();
    initializeScrollAnimations();
    
    // Modal-Event-Listener
    const bookingModal = document.getElementById('bookingModal');
    if (bookingModal) {
        const closeBtn = bookingModal.querySelector('.close');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeBookingModal);
        }
        
        bookingModal.addEventListener('click', function(e) {
            if (e.target === bookingModal) {
                closeBookingModal();
            }
        });
    }
    
    // ESC-Taste zum Schließen des Modals
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modals = document.querySelectorAll('.modal');
            modals.forEach(modal => {
                if (modal.style.display === 'block') {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
        }
    });
    
    console.log('✅ Alle Features erfolgreich initialisiert!');
});

// Globale Funktionen für HTML-Attribute
window.showCertificate = showCertificate;
window.closeCertificateModal = closeCertificateModal;
window.openBookingModal = openBookingModal;
window.closeBookingModal = closeBookingModal;
/******************************************
 * RECIPES PAGE JAVASCRIPT
 ******************************************/

// Rezept Datenbank
const recipes = {
    'anti-angst-brain-shot': {
        title: 'Anti-Angst Brain Shot',
        category: 'Brain Shot',
        time: '5 Min.',
        difficulty: 'Einfach',
        description: 'Dieser Brain Shot beruhigt das Nervensystem und reduziert Angstzustände innerhalb weniger Minuten.',
        ingredients: [
            '1 Tasse frische Orangen',
            '1/2 Tasse frische Aloe Vera',
            '1 EL frischer Ingwer',
            '1 TL frische Minze',
            '1/2 TL Spirulina-Pulver'
        ],
        instructions: [
            'Alle Zutaten in einen Mixer geben',
            'Gründlich mixen bis eine glatte Flüssigkeit entsteht',
            'Sofort trinken auf nüchternen Magen',
            '15 Minuten vor dem Frühstück warten',
            'Täglich für 30 Tage wiederholen für beste Ergebnisse'
        ],
        benefits: [
            { icon: '🧠', title: 'Nervenstärkend', desc: 'Beruhigt das zentrale Nervensystem' },
            { icon: '🌟', title: 'Angst-Reduktion', desc: 'Reduziert Angstzustände innerhalb von Minuten' },
            { icon: '⚡', title: 'Schnell wirksam', desc: 'Sofortige Beruhigung' },
            { icon: '🍃', title: 'Natürlich', desc: '100% natürliche Zutaten' }
        ],
        tips: [
            'Immer frisch zubereiten',
            'Auf nüchternen Magen trinken',
            'Bei akuten Angstzuständen sofort einnehmen',
            'Kann mit anderen Brain Shots kombiniert werden'
        ]
    },
    'sleep-brain-shot': {
        title: 'Sleep-Brain-Shot',
        category: 'Brain Shot',
        time: '5 Min.',
        difficulty: 'Einfach',
        description: 'Fördert erholsamen Schlaf und beruhigt überaktive Gedanken vor dem Schlafengehen.',
        ingredients: [
            '1 Tasse frische Trauben',
            '1/2 Tasse frische Aloe Vera',
            '1 EL frischer Lavendel',
            '1 TL frische Kamille',
            '1/2 TL Melatonin-Pulver'
        ],
        instructions: [
            'Alle Zutaben in einen Mixer geben',
            'Gründlich mixen bis eine glatte Flüssigkeit entsteht',
            '30 Minuten vor dem Schlafengehen trinken',
            'Keine elektronischen Geräte mehr benutzen',
            'Täglich für 14 Tage wiederholen'
        ],
        benefits: [
            { icon: '🌙', title: 'Schlaffördernd', desc: 'Natürliche Förderung des Schlafes' },
            { icon: '🧘‍♀️', title: 'Beruhigend', desc: 'Beruhigt überaktive Gedanken' },
            { icon: '⏰', title: 'Schnell', desc: 'Wirkt innerhalb von 30 Minuten' },
            { icon: '💤', title: 'Tiefschlaf', desc: 'Fördert erholsamen Tiefschlaf' }
        ],
        tips: [
            'Regelmäßig zur gleichen Zeit einnehmen',
            'Abends keine Koffein mehr konsumieren',
            'Schlafrituale etablieren',
            'Raum abdunkeln vor dem Schlafengehen'
        ]
    },
    'heavy-metal-detox': {
        title: 'Schwermetall-Detox-Smoothie',
        category: 'Detox',
        time: '10 Min.',
        difficulty: 'Mittel',
        description: 'Entfernt sicher Schwermetalle aus dem Körper mit der perfekten Kombination aus Spirulina und Dulse.',
        ingredients: [
            '2 Bananen',
            '1 Tasse frische Blaubeeren',
            '1 EL Spirulina-Pulver',
            '1 EL Dulse-Flakes',
            '1 Tasse Kokoswasser',
            '1 EL Barley Grass-Pulver'
        ],
        instructions: [
            'Bananen und Blaubeeren in den Mixer geben',
            'Alle Pulver und Flakes hinzufügen',
            'Mit Kokoswasser auffüllen',
            'Gründlich mixen bis eine glatte Konsistenz entsteht',
            'Täglich morgens für 90 Tage trinken'
        ],
        benefits: [
            { icon: '🧲', title: 'Schwermetall-Ausleitung', desc: 'Entfernt sicher Schwermetalle' },
            { icon: '🔬', title: 'Wissenschaftlich', desc: 'Basierend auf Medical Medium Forschung' },
            { icon: '🛡️', title: 'Schützend', desc: 'Schützt vor weiteren Schwermetallen' },
            { icon: '⚡', title: 'Energiespendend', desc: 'Erhöht die Energie und Vitalität' }
        ],
        tips: [
            'Konsistenz ist der Schlüssel - täglich trinken',
            'Mit Barley Grass für maximale Wirkung',
            'Auf leeren Magen trinken',
            'Mindestens 90 Tage durchführen'
        ]
    },
    'adrenalin-balance': {
        title: 'Adrenalin-Ausgleich-Smoothie',
        category: 'Adrenalin-Ausgleich',
        time: '7 Min.',
        difficulty: 'Einfach',
        description: 'Reduziert überschüssiges Adrenalin und beruhigt das Nervensystem bei chronischem Stress.',
        ingredients: [
            '1 Tasse frische Mango',
            '1/2 Tasse frische Spinat',
            '1 EL frischer Basilikum',
            '1 TL Ashwagandha-Pulver',
            '1 Tasse Mandelmilch',
            '1 EL Kokosöl'
        ],
        instructions: [
            'Alle Zutaten in den Mixer geben',
            'Gründlich mixen bis eine glatte Konsistenz entsteht',
            'Morgens oder bei akutem Stress trinken',
            'Täglich für 30 Tage konsumieren',
            'Bei Bedarf mit Honig süßen'
        ],
        benefits: [
            { icon: '⚖️', title: 'Hormon-Ausgleich', desc: 'Ausgleich von Adrenalin und Cortisol' },
            { icon: '🧘‍♀️', title: 'Stress-Reduktion', desc: 'Reduziert chronischen Stress' },
            { icon: '💪', title: 'Nervenstärkend', desc: 'Stärkt das Nervensystem' },
            { icon: '🌿', title: 'Adaptogen', desc: 'Natürliche Adaptogene enthalten' }
        ],
        tips: [
            'Regelmäßig zur gleichen Zeit einnehmen',
            'Mit anderen Stress-Reduktion-Techniken kombinieren',
            'Auf leeren Magen für beste Aufnahme',
            'Mindestens 30 Tage durchführen'
        ]
    },
    'trauma-sleep-tea': {
        title: 'Trauma-Schlaf-Tee',
        category: 'Schlaf & Entspannung',
        time: '15 Min.',
        difficulty: 'Einfach',
        description: 'Beruhigende Kräutermischung speziell für Menschen mit Trauma und Schlafstörungen.',
        ingredients: [
            '1 EL getrocknete Lavendel',
            '1 EL getrocknete Kamille',
            '1 TL getrocknete Melisse',
            '1 TL getrocknete Passionsblume',
            '1 TL Roh-Honig',
            '2 Tassen heißes Wasser'
        ],
        instructions: [
            'Alle Kräuter in einen Teebeutel geben',
            'Mit heißem Wasser übergießen',
            '10 Minuten ziehen lassen',
            'Mit Honig süßen',
            '30 Minuten vor dem Schlafengehen trinken'
        ],
        benefits: [
            { icon: '🌙', title: 'Trauma-sensibel', desc: 'Speziell für Trauma-Patienten entwickelt' },
            { icon: '🧘‍♀️', title: 'Beruhigend', desc: 'Beruhigt das Nervensystem sanft' },
            { icon: '💤', title: 'Schlaffördernd', desc: 'Fördert natürlichen Schlaf' },
            { icon: '🌿', title: 'Natürlich', desc: '100% natürliche Kräuter' }
        ],
        tips: [
            'Abends nur noch koffeinfreie Getränke',
            'Tee warm trinken',
            'Mit Schlafritual kombinieren',
            'Bei Bedarf verdoppeln'
        ]
    },
    'anti-panic-soup': {
        title: 'Anti-Panik-Suppe',
        category: 'Angst & Panik',
        time: '25 Min.',
        difficulty: 'Mittel',
        description: 'Wärmende Suppe mit beruhigenden Kräutern und Gemüse zur Reduzierung von Panikattacken.',
        ingredients: [
            '2 Tassen Gemüsebrühe',
            '1 Tasse frische Karotten',
            '1/2 Tasse frische Sellerie',
            '1 EL frische Petersilie',
            '1 TL getrocknete Lavendel',
            '1/2 TL Himalaya-Salz',
            '1 EL Kokosöl'
        ],
        instructions: [
            'Gemüse in kleine Stücke schneiden',
            'Kokosöl in einem Topf erhitzen',
            'Gemüse anbraten',
            'Mit Gemüsebrühe auffüllen',
            '20 Minuten köcheln lassen',
            'Mit Kräutern und Salz abschmecken'
        ],
        benefits: [
            { icon: '🌡️', title: 'Wärmend', desc: 'Wärmt von innen und beruhigt' },
            { icon: '🧘‍♀️', title: 'Beruhigend', desc: 'Reduziert Panikgefühle' },
            { icon: '🍲', title: 'Nahrhaft', desc: 'Nahrhaft und leicht verdaulich' },
            { icon: '🌿', title: 'Kräuter', desc: 'Mit beruhigenden Kräutern' }
        ],
        tips: [
            'Warm servieren',
            'Mit Vollkornbrot kombinieren',
            'Bei ersten Anzeichen von Panik einnehmen',
            'Regelmäßig zur Vorbeugung'
        ]
    },
    'ptbs-healing-bowl': {
        title: 'PTBS-Heilungs-Bowl',
        category: 'Trauma & PTBS',
        time: '20 Min.',
        difficulty: 'Einfach',
        description: 'Nahrhafter Buddha Bowl speziell zur Unterstützung der Trauma-Heilung und Nervenstärkung.',
        ingredients: [
            '1 Tasse Quinoa',
            '1/2 Tasse Avocado',
            '1/2 Tasse Süßkartoffel',
            '1/4 Tasse Walnüsse',
            '2 EL Hanfsamen',
            '1 EL Tahini',
            '1 EL Zitronensaft'
        ],
        instructions: [
            'Quinoa nach Packungsanweisung kochen',
            'Süßkartoffel in Würfel schneiden und dämpfen',
            'Avocado in Scheiben schneiden',
            'Alle Zutaten in einer Schüssel anrichten',
            'Mit Tahini und Zitronensaft beträufeln',
            'Mit Walnüssen und Hanfsamen bestreuen'
        ],
        benefits: [
            { icon: '🧠', title: 'Trauma-Heilung', desc: 'Unterstützt die Heilung von Trauma' },
            { icon: '💪', title: 'Nervenstärkend', desc: 'Stärkt das Nervensystem' },
            { icon: '🌱', title: 'Nahrhaft', desc: 'Sehr nahrhaft und ausgewogen' },
            { icon: '⚡', title: 'Energie', desc: 'Gibt nachhaltige Energie' }
        ],
        tips: [
            'Frisch zubereiten',
            'Mit anderen Heilpraktiken kombinieren',
            'Regelmäßig essen für beste Ergebnisse',
            'An persönliche Vorlieben anpassen'
        ]
    }
};

// Filter-Funktionalität
let currentFilter = 'all';

function initRecipeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const recipeCards = document.querySelectorAll('.recipe-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            currentFilter = filter;

            // Aktiven Button aktualisieren
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Rezepte filtern
            recipeCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease-in-out';
                } else {
                    card.style.display = 'none';
                }
            });

            // Filter-Statistik aktualisieren
            updateFilterStats(filter);
        });
    });
}

function updateFilterStats(filter) {
    const recipeCards = document.querySelectorAll('.recipe-card');
    const visibleCards = Array.from(recipeCards).filter(card => {
        const category = card.getAttribute('data-category');
        return filter === 'all' || category === filter;
    });

    console.log(`Filter: ${filter}, Anzahl sichtbarer Rezepte: ${visibleCards.length}`);
}

// Rezept-Details anzeigen
function showRecipeDetails(recipeId) {
    const recipe = recipes[recipeId];
    if (!recipe) return;

    const modal = document.getElementById('recipeModal');
    const recipeDetails = document.getElementById('recipeDetails');

    recipeDetails.innerHTML = `
        <div class="recipe-details">
            <h2>${recipe.title}</h2>
            
            <div class="recipe-meta">
                <span class="recipe-category">${recipe.category}</span>
                <span class="recipe-time"><i class="fas fa-clock"></i> ${recipe.time}</span>
                <span class="recipe-difficulty"><i class="fas fa-signal"></i> ${recipe.difficulty}</span>
            </div>

            <p class="recipe-description">${recipe.description}</p>

            <div class="recipe-ingredients">
                <h3><i class="fas fa-shopping-basket"></i> Zutaten</h3>
                <div class="ingredients-list">
                    ${recipe.ingredients.map(ingredient => `
                        <div class="ingredient-item">
                            <i class="fas fa-check-circle"></i>
                            <span>${ingredient}</span>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="recipe-instructions">
                <h3><i class="fas fa-utensils"></i> Zubereitung</h3>
                <div class="instructions-list">
                    ${recipe.instructions.map(instruction => `
                        <div class="instruction-item">
                            <span>${instruction}</span>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="recipe-benefits-section">
                <h3><i class="fas fa-heart"></i> Gesundheitsvorteile</h3>
                <div class="benefits-grid">
                    ${recipe.benefits.map(benefit => `
                        <div class="benefit-card">
                            <i>${benefit.icon}</i>
                            <h4>${benefit.title}</h4>
                            <p>${benefit.desc}</p>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="recipe-tips">
                <h3><i class="fas fa-lightbulb"></i> Wichtige Tipps</h3>
                <ul>
                    ${recipe.tips.map(tip => `<li>${tip}</li>`).join('')}
                </ul>
            </div>

            <div class="recipe-actions">
                <button class="btn btn-primary" onclick="downloadRecipePDF('${recipeId}')">
                    <i class="fas fa-download"></i> Als PDF herunterladen
                </button>
                <button class="btn btn-outline" onclick="shareRecipe('${recipeId}')">
                    <i class="fas fa-share-alt"></i> Rezept teilen
                </button>
            </div>
        </div>
    `;

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Modal schließen
function closeRecipeModal() {
    const modal = document.getElementById('recipeModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Rezept als PDF herunterladen
function downloadRecipePDF(recipeId) {
    const recipe = recipes[recipeId];
    if (!recipe) return;

    // Erstelle PDF-Inhalt
    const pdfContent = `
        REZEPT: ${recipe.title}
        ======================
        
        Kategorie: ${recipe.category}
        Zubereitungszeit: ${recipe.time}
        Schwierigkeit: ${recipe.difficulty}
        
        BESCHREIBUNG:
        ${recipe.description}
        
        ZUTATEN:
        ${recipe.ingredients.map(ing => `- ${ing}`).join('\n')}
        
        ZUBEREITUNG:
        ${recipe.instructions.map((inst, index) => `${index + 1}. ${inst}`).join('\n')}
        
        WICHTIGE TIPPS:
        ${recipe.tips.map(tip => `- ${tip}`).join('\n')}
        
        ---
        Mehr heilende Rezepte findest du auf: https://soulsgold.de/rezepte.html
    `;

    // Erstelle Blob und Download-Link
    const blob = new Blob([pdfContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${recipe.title.replace(/\s+/g, '_')}_Rezept.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    alert('Rezept wurde heruntergeladen! (Als Text-Datei für eine echte PDF-Implementierung)');
}

// Rezept teilen
function shareRecipe(recipeId) {
    const recipe = recipes[recipeId];
    if (!recipe) return;

    const shareText = `Entdecke dieses heilende Rezept: ${recipe.title} - ${recipe.description}`;
    const shareUrl = `${window.location.origin}/rezepte.html#${recipeId}`;

    if (navigator.share) {
        navigator.share({
            title: recipe.title,
            text: shareText,
            url: shareUrl
        });
    } else {
        // Fallback für Browser ohne Web Share API
        const shareUrlEncoded = encodeURIComponent(shareUrl);
        const shareTextEncoded = encodeURIComponent(shareText);
        
        const twitterUrl = `https://twitter.com/intent/tweet?text=${shareTextEncoded}&url=${shareUrlEncoded}`;
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${shareUrlEncoded}`;
        
        // Zeige Share-Dialog
        const shareDialog = `
            <div class="share-dialog">
                <h3>Rezept teilen</h3>
                <div class="share-options">
                    <a href="${twitterUrl}" target="_blank" class="share-btn twitter">
                        <i class="fab fa-twitter"></i> Twitter
                    </a>
                    <a href="${facebookUrl}" target="_blank" class="share-btn facebook">
                        <i class="fab fa-facebook"></i> Facebook
                    </a>
                    <button onclick="copyShareLink('${shareUrl}')" class="share-btn copy">
                        <i class="fas fa-link"></i> Link kopieren
                    </button>
                </div>
            </div>
        `;
        
        // Zeige Dialog (hier könnte man einen schönen Modal-Dialog implementieren)
        alert('Rezept-Link wurde in die Zwischenablage kopiert!');
    }
}

// Link in Zwischenablage kopieren
function copyShareLink(url) {
    navigator.clipboard.writeText(url).then(() => {
        alert('Link wurde in die Zwischenablage kopiert!');
    });
}

// Newsletter Funktionalität
function initNewsletter() {
    const newsletterForm = document.getElementById('newsletterForm');
    if (!newsletterForm) return;

    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[type="email"]').value;
        
        // Newsletter-Anmeldung simulieren
        setTimeout(() => {
            alert(`Vielen Dank für deine Anmeldung zum Newsletter! Du erhältst bald eine Bestätigungs-E-Mail an ${email}.`);
            this.reset();
        }, 1000);
        
        // Hier könnte man eine echte API-Anbindung implementieren
        console.log('Newsletter-Anmeldung:', email);
    });
}

// Rezept-Bewertungssystem
function initRecipeRating() {
    const recipeCards = document.querySelectorAll('.recipe-card');
    
    recipeCards.forEach(card => {
        const rating = Math.floor(Math.random() * 5) + 3; // Zufällige Bewertung zwischen 3-5
        const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);
        
        const ratingElement = document.createElement('div');
        ratingElement.className = 'recipe-rating';
        ratingElement.innerHTML = `
            <span class="stars">${stars}</span>
            <span class="rating-text">${rating}.0</span>
        `;
        
        const recipeContent = card.querySelector('.recipe-content');
        recipeContent.insertBefore(ratingElement, recipeContent.querySelector('.recipe-btn'));
    });
}

// Suchfunktion für Rezepte
function initRecipeSearch() {
    const searchContainer = document.createElement('div');
    searchContainer.className = 'recipe-search-container';
    searchContainer.innerHTML = `
        <div class="search-box">
            <input type="text" id="recipeSearch" placeholder="Rezepte suchen..." />
            <i class="fas fa-search"></i>
        </div>
    `;
    
    const filtersContainer = document.querySelector('.filter-container');
    filtersContainer.parentNode.insertBefore(searchContainer, filtersContainer);
    
    const searchInput = document.getElementById('recipeSearch');
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const recipeCards = document.querySelectorAll('.recipe-card');
        
        recipeCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('.recipe-description').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// Favoriten-Funktionalität
function initFavorites() {
    let favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    
    const recipeCards = document.querySelectorAll('.recipe-card');
    recipeCards.forEach(card => {
        const recipeId = card.getAttribute('data-category') + '-' + card.querySelector('h3').textContent.replace(/\s+/g, '-').toLowerCase();
        
        const favoriteBtn = document.createElement('button');
        favoriteBtn.className = 'favorite-btn';
        favoriteBtn.innerHTML = favorites.includes(recipeId) ? '<i class="fas fa-heart"></i>' : '<i class="far fa-heart"></i>';
        
        favoriteBtn.addEventListener('click', function() {
            if (favorites.includes(recipeId)) {
                favorites = favorites.filter(id => id !== recipeId);
                this.innerHTML = '<i class="far fa-heart"></i>';
                this.classList.remove('active');
            } else {
                favorites.push(recipeId);
                this.innerHTML = '<i class="fas fa-heart"></i>';
                this.classList.add('active');
            }
            
            localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
        });
        
        const recipeImage = card.querySelector('.recipe-image');
        recipeImage.appendChild(favoriteBtn);
    });
}

// Animation für Rezeptkarten
function animateRecipeCards() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            }
        });
    }, { threshold: 0.1 });
    
    const recipeCards = document.querySelectorAll('.recipe-card');
    recipeCards.forEach(card => {
        observer.observe(card);
    });
}

// CSS-Animationen hinzufügen
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
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    .recipe-rating {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
        font-size: 0.9rem;
    }
    
    .stars {
        color: #ffc107;
        margin-right: 8px;
    }
    
    .rating-text {
        color: #666;
    }
    
    .favorite-btn {
        position: absolute;
        top: 15px;
        right: 15px;
        background: rgba(255, 255, 255, 0.9);
        border: none;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        cursor: pointer;
        transition: all 0.3s ease;
        z-index: 10;
    }
    
    .favorite-btn:hover {
        background: white;
        transform: scale(1.1);
    }
    
    .favorite-btn.active i {
        color: #e74c3c;
    }
    
    .recipe-search-container {
        margin: 30px 0;
        text-align: center;
    }
    
    .search-box {
        position: relative;
        display: inline-block;
        max-width: 400px;
        width: 100%;
    }
    
    .search-box input {
        width: 100%;
        padding: 15px 50px 15px 20px;
        border: 2px solid #e0e0e0;
        border-radius: 25px;
        font-size: 1rem;
        transition: all 0.3s ease;
    }
    
    .search-box input:focus {
        outline: none;
        border-color: #4a7c59;
        box-shadow: 0 0 0 3px rgba(74, 124, 89, 0.1);
    }
    
    .search-box i {
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        color: #888;
    }
    
    .recipe-actions {
        display: flex;
        gap: 15px;
        margin-top: 30px;
        flex-wrap: wrap;
    }
    
    .recipe-actions .btn {
        flex: 1;
        min-width: 200px;
    }
    
    .share-dialog {
        text-align: center;
        padding: 20px;
    }
    
    .share-options {
        display: flex;
        gap: 15px;
        justify-content: center;
        margin-top: 20px;
        flex-wrap: wrap;
    }
    
    .share-btn {
        padding: 12px 24px;
        border: none;
        border-radius: 25px;
        text-decoration: none;
        color: white;
        font-weight: 600;
        transition: all 0.3s ease;
        cursor: pointer;
    }
    
    .share-btn.twitter { background: #1da1f2; }
    .share-btn.facebook { background: #4267b2; }
    .share-btn.copy { background: #6c757d; }
    
    .share-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }
`;
document.head.appendChild(style);

// Initialisierung aller Funktionen
document.addEventListener('DOMContentLoaded', function() {
    initRecipeFilters();
    initNewsletter();
    initRecipeRating();
    initRecipeSearch();
    initFavorites();
    animateRecipeCards();
    
    // Modal-Event-Listener
    const modal = document.getElementById('recipeModal');
    const closeBtn = document.querySelector('.close');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeRecipeModal);
    }
    
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeRecipeModal();
            }
        });
    }
    
    // ESC-Taste zum Schließen des Modals
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeRecipeModal();
        }
    });
    
    console.log('Rezepte-Seite initialisiert mit:', Object.keys(recipes).length, 'Rezepten');
});
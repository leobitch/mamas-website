/******************************************
 * ADMIN DASHBOARD JAVASCRIPT
 ******************************************/

// Admin-Daten
let adminData = {
    bookings: [],
    clients: [],
    analytics: {},
    settings: {}
};

// Mock-Daten für die Demo
const mockBookings = [
    {
        id: 'BK001',
        name: 'Anna Schmidt',
        email: 'anna.schmidt@email.de',
        service: '1:1 Ernährungsberatung',
        date: '2024-09-15',
        time: '14:00',
        status: 'confirmed',
        phone: '+49 123 456789',
        notes: 'Erstgespräch - PTBS',
        price: '150€',
        created: '2024-09-01'
    },
    {
        id: 'BK002',
        name: 'Michael Weber',
        email: 'm.weber@email.de',
        service: 'Spirituelle Begleitung',
        date: '2024-09-16',
        time: '16:30',
        status: 'pending',
        phone: '+49 987 654321',
        notes: 'Meditation - Angststörung',
        price: '120€',
        created: '2024-09-02'
    },
    {
        id: 'BK003',
        name: 'Lisa Müller',
        email: 'lisa.mueller@email.de',
        service: '1:1 Ernährungsberatung',
        date: '2024-09-17',
        time: '10:00',
        status: 'confirmed',
        phone: '+49 555 123456',
        notes: 'Follow-up - Trauma',
        price: '150€',
        created: '2024-09-03'
    },
    {
        id: 'BK004',
        name: 'Thomas Richter',
        email: 't.richter@email.de',
        service: 'Schwermetall-Detox',
        date: '2024-09-18',
        time: '11:30',
        status: 'cancelled',
        phone: '+49 777 888999',
        notes: 'Ausleitung - Termin verschoben',
        price: '180€',
        created: '2024-09-04'
    }
];

const mockClients = [
    {
        id: 'CL001',
        name: 'Anna Schmidt',
        email: 'anna.schmidt@email.de',
        phone: '+49 123 456789',
        avatar: 'AS',
        status: 'active',
        totalBookings: 3,
        lastVisit: '2024-09-15',
        notes: 'PTBS, sehr empfindsam',
        services: ['1:1 Ernährungsberatung', 'Brain Shots'],
        progress: 75
    },
    {
        id: 'CL002',
        name: 'Michael Weber',
        email: 'm.weber@email.de',
        phone: '+49 987 654321',
        avatar: 'MW',
        status: 'active',
        totalBookings: 5,
        lastVisit: '2024-09-10',
        notes: 'Angststörung, gute Fortschritte',
        services: ['Spirituelle Begleitung', 'Meditation'],
        progress: 60
    },
    {
        id: 'CL003',
        name: 'Lisa Müller',
        email: 'lisa.mueller@email.de',
        phone: '+49 555 123456',
        avatar: 'LM',
        status: 'active',
        totalBookings: 2,
        lastVisit: '2024-09-05',
        notes: 'Trauma-Heilung, sehr engagiert',
        services: ['1:1 Ernährungsberatung', 'Trauma-Coaching'],
        progress: 45
    }
];

// Initialisierung
document.addEventListener('DOMContentLoaded', function() {
    initializeAdmin();
});

function initializeAdmin() {
    // Login-Form initialisieren
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Navigation initialisieren
    initializeNavigation();
    
    // Daten laden
    loadAdminData();
    
    // Charts initialisieren
    setTimeout(initializeCharts, 100);
}

// Login-Funktionalität
function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Einfache Demo-Authentifizierung
    if (username === 'admin' && password === 'soulsgold2024') {
        showDashboard();
        localStorage.setItem('adminLoggedIn', 'true');
        localStorage.setItem('adminName', username);
    } else {
        alert('Ungültige Anmeldedaten! Bitte verwenden Sie:\nBenutzername: admin\nPasswort: soulsgold2024');
    }
}

function showDashboard() {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('adminDashboard').style.display = 'block';
    document.getElementById('adminName').textContent = localStorage.getItem('adminName') || 'Admin';
    
    // Dashboard-Daten aktualisieren
    updateDashboardStats();
    renderRecentBookings();
}

function logout() {
    if (confirm('Möchten Sie sich wirklich abmelden?')) {
        localStorage.removeItem('adminLoggedIn');
        localStorage.removeItem('adminName');
        
        document.getElementById('loginScreen').style.display = 'flex';
        document.getElementById('adminDashboard').style.display = 'none';
        document.getElementById('loginForm').reset();
    }
}

// Navigation
default function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.admin-section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Aktiven Link aktualisieren
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Sektion anzeigen
            const targetSection = this.getAttribute('data-section');
            sections.forEach(section => {
                section.classList.remove('active');
            });
            document.getElementById(targetSection).classList.add('active');
            
            // Sektion-spezifische Daten laden
            loadSectionData(targetSection);
        });
    });
}

function loadSectionData(section) {
    switch(section) {
        case 'bookings':
            renderBookingsTable();
            break;
        case 'clients':
            renderClientsGrid();
            break;
        case 'analytics':
            updateAnalyticsData();
            break;
    }
}

// Dashboard-Statistiken
function updateDashboardStats() {
    const totalBookings = mockBookings.length;
    const totalClients = mockClients.length;
    const monthlyRevenue = mockBookings
        .filter(b => b.status === 'confirmed')
        .reduce((sum, b) => sum + parseInt(b.price), 0);
    const conversionRate = ((mockBookings.filter(b => b.status === 'confirmed').length / totalBookings) * 100).toFixed(1);
    
    document.getElementById('totalBookings').textContent = totalBookings;
    document.getElementById('totalClients').textContent = totalClients;
    document.getElementById('monthlyRevenue').textContent = monthlyRevenue + '€';
    document.getElementById('conversionRate').textContent = conversionRate + '%';
}

// Letzte Buchungen rendern
default function renderRecentBookings() {
    const container = document.getElementById('recentBookingsList');
    const recentBookings = mockBookings.slice(0, 3); // Nur die letzten 3
    
    container.innerHTML = recentBookings.map(booking => `
        <div class="booking-item">
            <div class="booking-info">
                <h4>${booking.name}</h4>
                <p>${booking.service} - ${booking.date} um ${booking.time}</p>
            </div>
            <div class="booking-status status-${booking.status}">
                ${getStatusText(booking.status)}
            </div>
        </div>
    `).join('');
}

// Buchungen-Tabelle
function renderBookingsTable() {
    const tbody = document.getElementById('bookingsTableBody');
    
    tbody.innerHTML = mockBookings.map(booking => `
        <tr>
            <td><strong>${booking.id}</strong></td>
            <td>
                <div style="font-weight: 600;">${booking.name}</div>
                <div style="font-size: 0.8rem; color: #666;">${booking.email}</div>
            </td>
            <td>${booking.service}</td>
            <td>${booking.date}</td>
            <td>${booking.time}</td>
            <td>
                <span class="booking-status status-${booking.status}">
                    ${getStatusText(booking.status)}
                </span>
            </td>
            <td>
                <button class="action-btn btn-view" onclick="viewBooking('${booking.id}')" title="Anzeigen">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="action-btn btn-edit" onclick="editBooking('${booking.id}')" title="Bearbeiten">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn btn-confirm" onclick="confirmBooking('${booking.id}')" title="Bestätigen">
                    <i class="fas fa-check"></i>
                </button>
                <button class="action-btn btn-delete" onclick="deleteBooking('${booking.id}')" title="Löschen">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// Klienten-Grid
function renderClientsGrid() {
    const container = document.getElementById('clientsGrid');
    
    container.innerHTML = mockClients.map(client => `
        <div class="client-card">
            <div class="client-avatar">${client.avatar}</div>
            <h3>${client.name}</h3>
            <p>${client.email}</p>
            <div class="client-stats">
                <div class="client-stat">
                    <span class="number">${client.totalBookings}</span>
                    <span class="label">Buchungen</span>
                </div>
                <div class="client-stat">
                    <span class="number">${client.progress}%</span>
                    <span class="label">Fortschritt</span>
                </div>
            </div>
            <div style="margin: 15px 0;">
                <small style="color: #666;">Letzter Besuch: ${client.lastVisit}</small>
            </div>
            <div style="display: flex; gap: 10px; justify-content: center;">
                <button class="btn btn-outline" onclick="viewClient('${client.id}')" style="font-size: 0.8rem; padding: 8px 16px;">
                    <i class="fas fa-eye"></i> Anzeigen
                </button>
                <button class="btn btn-outline" onclick="editClient('${client.id}')" style="font-size: 0.8rem; padding: 8px 16px;">
                    <i class="fas fa-edit"></i> Bearbeiten
                </button>
            </div>
        </div>
    `).join('');
}

// Charts initialisieren
function initializeCharts() {
    // Buchungen Chart
    const bookingsCtx = document.getElementById('bookingsChart');
    if (bookingsCtx) {
        new Chart(bookingsCtx, {
            type: 'line',
            data: {
                labels: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
                datasets: [{
                    label: 'Buchungen',
                    data: [3, 5, 2, 8, 6, 4, 7],
                    borderColor: '#4a7c59',
                    backgroundColor: 'rgba(74, 124, 89, 0.1)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
    
    // Services Chart
    const servicesCtx = document.getElementById('servicesChart');
    if (servicesCtx) {
        new Chart(servicesCtx, {
            type: 'doughnut',
            data: {
                labels: ['Ernährungsberatung', 'Spirituelle Begleitung', 'Schwermetall-Detox'],
                datasets: [{
                    data: [45, 35, 20],
                    backgroundColor: ['#4a7c59', '#6b8e23', '#8fbc8f']
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
    
    // Visitors Chart für Analytics
    const visitorsCtx = document.getElementById('visitorsChart');
    if (visitorsCtx) {
        new Chart(visitorsCtx, {
            type: 'bar',
            data: {
                labels: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
                datasets: [{
                    label: 'Besucher',
                    data: [127, 156, 134, 189, 167, 145, 178],
                    backgroundColor: 'rgba(74, 124, 89, 0.8)',
                    borderColor: '#4a7c59',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}

// Hilfsfunktionen
function getStatusText(status) {
    const statusMap = {
        'confirmed': 'Bestätigt',
        'pending': 'Ausstehend',
        'cancelled': 'Storniert',
        'completed': 'Abgeschlossen'
    };
    return statusMap[status] || status;
}

function loadAdminData() {
    // Daten aus localStorage laden oder Mock-Daten verwenden
    adminData.bookings = JSON.parse(localStorage.getItem('bookings')) || mockBookings;
    adminData.clients = JSON.parse(localStorage.getItem('clients')) || mockClients;
    adminData.analytics = JSON.parse(localStorage.getItem('analytics')) || {};
    adminData.settings = JSON.parse(localStorage.getItem('settings')) || {};
}

// Buchungs-Aktionen
function viewBooking(bookingId) {
    const booking = mockBookings.find(b => b.id === bookingId);
    if (booking) {
        alert(`Buchungsdetails:\n\nID: ${booking.id}\nName: ${booking.name}\nEmail: ${booking.email}\nTelefon: ${booking.phone}\nService: ${booking.service}\nDatum: ${booking.date} um ${booking.time}\nStatus: ${getStatusText(booking.status)}\nNotiz: ${booking.notes}\nPreis: ${booking.price}`);
    }
}

function editBooking(bookingId) {
    const booking = mockBookings.find(b => b.id === bookingId);
    if (booking) {
        // Hier könnte man ein Modal öffnen
        alert(`Buchung ${bookingId} bearbeiten - In einer echten Anwendung würde hier ein Bearbeitungsmodal erscheinen.`);
    }
}

function confirmBooking(bookingId) {
    if (confirm(`Möchten Sie die Buchung ${bookingId} wirklich bestätigen?`)) {
        const booking = mockBookings.find(b => b.id === bookingId);
        if (booking) {
            booking.status = 'confirmed';
            renderBookingsTable();
            updateDashboardStats();
            alert('Buchung wurde bestätigt!');
        }
    }
}

function deleteBooking(bookingId) {
    if (confirm(`Möchten Sie die Buchung ${bookingId} wirklich löschen?`)) {
        const bookingIndex = mockBookings.findIndex(b => b.id === bookingId);
        if (bookingIndex > -1) {
            mockBookings.splice(bookingIndex, 1);
            renderBookingsTable();
            updateDashboardStats();
            alert('Buchung wurde gelöscht!');
        }
    }
}

// Klienten-Aktionen
function viewClient(clientId) {
    const client = mockClients.find(c => c.id === clientId);
    if (client) {
        alert(`Klientendetails:\n\nName: ${client.name}\nEmail: ${client.email}\nTelefon: ${client.phone}\nStatus: ${client.status}\nFortschritt: ${client.progress}%\nNotizen: ${client.notes}\nServices: ${client.services.join(', ')}`);
    }
}

function editClient(clientId) {
    const client = mockClients.find(c => c.id === clientId);
    if (client) {
        alert(`Klient ${clientId} bearbeiten - In einer echten Anwendung würde hier ein Bearbeitungsmodal erscheinen.`);
    }
}

function addClient() {
    alert('Neuen Klienten hinzufügen - In einer echten Anwendung würde hier ein Formular erscheinen.');
}

// Export-Funktionen
function exportBookings() {
    const csvContent = [
        ['Buchungs-ID', 'Name', 'Email', 'Service', 'Datum', 'Uhrzeit', 'Status', 'Preis'],
        ...mockBookings.map(b => [b.id, b.name, b.email, b.service, b.date, b.time, b.status, b.price])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'buchungen_' + new Date().toISOString().split('T')[0] + '.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert('Buchungen wurden als CSV exportiert!');
}

// Content Management
function editPage(page) {
    alert(`Seite ${page} bearbeiten - In einer echten Anwendung würde hier ein Editor erscheinen.`);
}

function editRecipes() {
    alert('Rezepte bearbeiten - In einer echten Anwendung würde hier ein Rezept-Manager erscheinen.');
}

function editBlog() {
    alert('Blog-Beiträge bearbeiten - In einer echten Anwendung würde hier ein Blog-Editor erscheinen.');
}

function editFAQ() {
    alert('FAQ bearbeiten - In einer echten Anwendung würde hier ein FAQ-Editor erscheinen.');
}

// Analytics
function updateAnalyticsData() {
    // Hier könnte man echte Analytics-Daten laden
    console.log('Analytics-Daten aktualisieren');
}

// Settings
function initializeSettings() {
    const generalForm = document.getElementById('generalSettingsForm');
    const passwordForm = document.getElementById('passwordChangeForm');
    
    if (generalForm) {
        generalForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Einstellungen wurden gespeichert!');
        });
    }
    
    if (passwordForm) {
        passwordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Passwort wurde geändert!');
        });
    }
}

// Überprüfen des Login-Status
function checkLoginStatus() {
    if (localStorage.getItem('adminLoggedIn') === 'true') {
        showDashboard();
    }
}

// Initialisierung nach DOM-Content
setTimeout(checkLoginStatus, 100);
setTimeout(initializeSettings, 500);
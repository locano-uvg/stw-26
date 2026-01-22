import { presentations } from './presentations.js';

const grid = document.querySelector('.presentations-grid');
const searchBar = document.getElementById('search-bar');

function createCardHTML(presentation, index) {
    const delay = index * 100; // Stagger delay in ms
    const paddedIndex = (index + 1).toString().padStart(2, '0');
    
    return `
        <div class="image-container">
            <img src="${presentation.image}" alt="${presentation.title}" loading="lazy">
        </div>
        <div class="card-content">
            <span class="card-number">Tema ${paddedIndex}</span>
            <h2>${presentation.title}</h2>
            <p>${presentation.description}</p>
            <div class="card-action">
                <a href="${presentation.path}" class="btn-glitch">
                    Ver contenido
                </a>
            </div>
        </div>
    `;
}

function renderPresentations(searchTerm = '') {
    grid.innerHTML = '';
    const filteredPresentations = presentations.filter(p => {
        if (!p.active) return false;
        if (!searchTerm) return true;
        const term = searchTerm.toLowerCase();
        return p.title.toLowerCase().includes(term) || 
               p.description.toLowerCase().includes(term);
    });

    filteredPresentations.forEach((presentation, index) => {
        const card = document.createElement('div');
        card.className = 'presentation-card';
        card.style.animationDelay = `${index * 100}ms`;
        card.innerHTML = createCardHTML(presentation, index);
        grid.appendChild(card);
    });
}

// Initial render
renderPresentations();

// Search handler
searchBar.addEventListener('input', (event) => {
    renderPresentations(event.target.value);
});

// Reading progress indicator
const progressBar = document.querySelector('.scanline');

window.addEventListener('scroll', () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = window.scrollY;
    const progress = (scrolled / documentHeight);
    
    progressBar.style.transform = `scaleX(${progress})`;
});

// Smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';

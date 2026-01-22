
import { presentations } from './presentations.js';

const grid = document.querySelector('.presentations-grid');
const emptyState = document.getElementById('empty-state');
const searchBar = document.getElementById('search-bar');
const activeCount = document.getElementById('active-count');
const searchHint = document.getElementById('search-hint');
const themeToggle = document.getElementById('theme-toggle');

const THEMES = [
  { id: 'oxide', label: 'Claro', themeColor: '#f5f5f5' },
  { id: 'paper', label: 'Oscuro', themeColor: '#0C2C55' },
  { id: 'night', label: 'Claro', themeColor: '#f5f5f5' },
];

function setTheme(themeId) {
  const theme = THEMES.find(t => t.id === themeId) ?? THEMES[0];
  document.body.dataset.theme = theme.id;
  themeToggle.textContent = `Tema: ${theme.label}`;

  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', theme.themeColor);

  try {
    localStorage.setItem('stw-theme', theme.id);
  } catch {
    // ignore
  }
}

function getInitialTheme() {
  try {
    const saved = localStorage.getItem('stw-theme');
    if (saved) return saved;
  } catch {
    // ignore
  }

  const prefersLight = window.matchMedia?.('(prefers-color-scheme: light)')?.matches;
  return prefersLight ? 'paper' : 'oxide';
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function render(list) {
  grid.innerHTML = '';

  if (list.length === 0) {
    emptyState.hidden = false;
    return;
  }

  emptyState.hidden = true;

  list.forEach((presentation, index) => {
    const card = document.createElement('article');
    card.className = 'presentation-card';
    card.style.setProperty('--i', String(index));
    card.innerHTML = `
      <a class="card__link" href="${escapeHtml(presentation.path)}">
        <div class="card__media" aria-hidden="true">
          <img
            src="${escapeHtml(presentation.image)}"
            alt="${escapeHtml(presentation.title)}"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div class="card__body">
          <h2 class="card__title">${escapeHtml(presentation.title)}</h2>
          <p class="card__desc">${escapeHtml(presentation.description)}</p>
          <div class="card__cta">
            <span>Ver presentación</span>
            <span class="card__arrow" aria-hidden="true">→</span>
          </div>
        </div>
      </a>
    `;
    grid.appendChild(card);
  });
}

const activePresentations = presentations.filter(p => p.active);
activeCount.textContent = `${activePresentations.length} activas`;
searchHint.textContent = 'Tip: prueba “web”, “css”, “terminal”…';

setTheme(getInitialTheme());
render(activePresentations);

searchBar.addEventListener('input', (event) => {
  const raw = event.target.value ?? '';
  const q = raw.toLowerCase().trim();

  if (!q) {
    searchHint.textContent = 'Tip: prueba “web”, “css”, “terminal”…';
    render(activePresentations);
    return;
  }

  const filtered = activePresentations.filter(p => (
    p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
  ));

  searchHint.textContent = `Filtrando: “${raw.trim()}”`;
  render(filtered);
});

themeToggle.addEventListener('click', () => {
  const current = document.body.dataset.theme || 'oxide';
  const idx = THEMES.findIndex(t => t.id === current);
  const next = THEMES[(idx + 1 + THEMES.length) % THEMES.length].id;
  setTheme(next);
});

// Orchestrated reveal: let layout paint once, then animate in.
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    document.body.classList.remove('is-loading');
  });
});
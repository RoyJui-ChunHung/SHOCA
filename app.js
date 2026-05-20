/* ── PRODUCT DATA ── */
const products = [
  {
    id: 1, name: 'Y2K Metal Blind Box Vol.1', series: 'Y2K Series',
    price: 'USD $38', amount: 38, category: 'y2k', badge: 'Blind Box',
    img: 'https://loremflickr.com/400/530/jewelry,silver?lock=1'
  },
  {
    id: 2, name: 'Healing Planet Series', series: 'Healing',
    price: 'USD $25', amount: 25, category: 'healing', badge: 'New',
    img: 'https://loremflickr.com/400/530/crystal,necklace?lock=2'
  },
  {
    id: 3, name: 'Dark Designer Series', series: 'Designer',
    price: 'USD $40', amount: 40, category: 'designer', badge: '',
    img: 'https://loremflickr.com/400/530/gold,jewelry?lock=3'
  },
  {
    id: 4, name: 'Dream Bubble Series', series: 'Healing',
    price: 'USD $32', amount: 32, category: 'healing', badge: 'Limited',
    img: 'https://loremflickr.com/400/530/pearl,necklace?lock=4'
  },
  {
    id: 5, name: 'Noir Designer Blind Box', series: 'Designer',
    price: 'USD $38', amount: 38, category: 'designer', badge: '',
    img: 'https://loremflickr.com/400/530/bracelet,jewelry?lock=5'
  },
  {
    id: 6, name: 'Luxury Blind Box', series: 'Luxury',
    price: 'USD $40', amount: 40, category: 'luxury', badge: 'Luxury',
    img: 'https://loremflickr.com/400/530/diamond,ring?lock=6'
  },
  {
    id: 7, name: 'Y2K Limited Blind Box', series: 'Y2K Series',
    price: 'USD $35', amount: 35, category: 'y2k', badge: 'Y2K',
    img: 'https://loremflickr.com/400/530/earrings,jewelry?lock=7'
  },
  {
    id: 8, name: 'Starter Blind Box', series: 'Essentials',
    price: 'USD $22', amount: 22, category: 'healing', badge: '',
    img: 'https://loremflickr.com/400/530/ring,silver?lock=8'
  }
];


/* ── PRIZES ── */
const prizes = [
  { tier: 'ssr',     chance: 1,  icon: '💎', name: 'RARE Grand Prize',  sub: 'Diamond / Jade Jewelry',         msg: 'Congratulations! You won the RARE Grand Prize!',    particles: { color: '#FFD700', count: 28 } },
  { tier: 'sr-plus', chance: 5,  icon: '🏆', name: 'RARE Runner-up',    sub: 'Semi-precious Designer Piece',   msg: 'You\'re so lucky — RARE Runner-up is yours!',       particles: { color: '#B8A0FF', count: 20 } },
  { tier: 'sr',      chance: 15, icon: '🎁', name: 'Bonus Blind Box',   sub: 'One random jewelry blind box',   msg: 'Bonus blind box! The surprises keep coming!',       particles: { color: '#80CFFF', count: 12 } },
  { tier: 'r',       chance: 30, icon: '✨', name: '10% Off Coupon',    sub: 'Valid on your next order',        msg: '10% off coupon sent to your account!',              particles: null },
  { tier: 'n',       chance: 49, icon: '🃏', name: 'Thank-You Card',    sub: 'SHOCA limited-edition design',   msg: 'Thank you! Hope to see you again soon.',            particles: null }
];


/* ── STATE ── */
let cart = [];
let cardFlipped = false;
let currentFilter = 'all';


/* ══════════════════════════════════════
   RENDER PRODUCTS
══════════════════════════════════════ */
function renderProducts(containerSelector, filter = 'all', query = '') {
  const container = document.getElementById(containerSelector);
  if (!container) return;

  const filtered = products.filter(p => {
    const matchCat = filter === 'all' || p.category === filter;
    const matchQ   = !query || p.name.toLowerCase().includes(query.toLowerCase())
                             || p.series.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQ;
  });

  const noResults = document.getElementById('no-results');
  if (filtered.length === 0) {
    container.innerHTML = '';
    if (noResults) noResults.style.display = 'block';
    return;
  }
  if (noResults) noResults.style.display = 'none';

  container.innerHTML = filtered.map((p, i) => `
    <div class="product-card" style="animation-delay:${i * 0.06}s">
      <div class="product-img">
        <img src="${p.img}" alt="${p.name}" loading="lazy">
        ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
        <div class="product-overlay">
          <button class="overlay-btn" onclick="addToCart('${p.name}','${p.price}',${p.amount})">Add to Bag</button>
        </div>
      </div>
      <div class="product-info">
        <p class="product-series">${p.series}</p>
        <p class="product-name">${p.name}</p>
        <p class="product-price">${p.price}</p>
      </div>
    </div>
  `).join('');
}


/* ══════════════════════════════════════
   PAGE NAVIGATION
══════════════════════════════════════ */
function showPage(id, linkEl) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const page = document.getElementById('page-' + id);
  if (page) page.classList.add('active');

  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  if (linkEl) linkEl.classList.add('active');

  window.scrollTo(0, 0);

  if (id === 'shop') renderProducts('product-grid-shop', currentFilter);
}


/* ══════════════════════════════════════
   MOBILE MENU
══════════════════════════════════════ */
function openMobileMenu() {
  document.getElementById('mobile-menu').classList.add('open');
  document.getElementById('overlay').classList.add('open');
}

function closeMobileMenu() {
  document.getElementById('mobile-menu').classList.remove('open');
  document.getElementById('overlay').classList.remove('open');
}


/* ══════════════════════════════════════
   SEARCH
══════════════════════════════════════ */
let searchOpen = false;

function toggleSearch() {
  searchOpen = !searchOpen;
  const overlay = document.getElementById('search-overlay');
  const input   = document.getElementById('search-input');
  const results = document.getElementById('search-results');

  if (searchOpen) {
    overlay.classList.add('open');
    results.innerHTML = '';
    setTimeout(() => input.focus(), 280);
  } else {
    overlay.classList.remove('open');
    input.value = '';
    results.innerHTML = '';
  }
}

function handleSearch(query) {
  const results = document.getElementById('search-results');
  if (!query.trim()) { results.innerHTML = ''; return; }

  const matches = products.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.series.toLowerCase().includes(query.toLowerCase())
  );

  if (matches.length === 0) {
    results.innerHTML = '<p class="search-empty">No products found</p>';
    return;
  }

  results.innerHTML = matches.map(p => `
    <div class="search-result-item">
      <div>
        <p class="search-result-name">${p.name}</p>
        <p class="search-result-price">${p.series} · ${p.price}</p>
      </div>
      <button class="search-result-add" onclick="addToCart('${p.name}','${p.price}',${p.amount}); toggleSearch()">Add</button>
    </div>
  `).join('');
}


/* ══════════════════════════════════════
   ACCOUNT MODAL
══════════════════════════════════════ */
function toggleAccount() {
  const modal = document.getElementById('account-modal');
  modal.classList.contains('open') ? closeAccount() : modal.classList.add('open');
}

function closeAccount() {
  document.getElementById('account-modal').classList.remove('open');
}

function switchTab(tab) {
  document.getElementById('tab-login').style.display    = tab === 'login'    ? 'block' : 'none';
  document.getElementById('tab-register').style.display = tab === 'register' ? 'block' : 'none';
  document.getElementById('tab-btn-login').classList.toggle('active',    tab === 'login');
  document.getElementById('tab-btn-register').classList.toggle('active', tab === 'register');
}


/* ══════════════════════════════════════
   CART
══════════════════════════════════════ */
function addToCart(name, price, amount) {
  cart.push({ name, price, amount });
  updateCartUI();
  openCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartUI();
}

function openCart() {
  document.getElementById('cart-sidebar').classList.add('open');
  document.getElementById('overlay').classList.add('open');
}

function toggleCart() {
  const sidebar = document.getElementById('cart-sidebar');
  const overlay = document.getElementById('overlay');
  const isOpen  = sidebar.classList.contains('open');
  sidebar.classList.toggle('open', !isOpen);
  overlay.classList.toggle('open', !isOpen);
}

function updateCartUI() {
  const count    = cart.length;
  const itemsEl  = document.getElementById('cart-items');
  const footerEl = document.getElementById('cart-footer');

  document.getElementById('cart-count').textContent = count;

  if (count === 0) {
    itemsEl.innerHTML = '<div class="cart-empty">Your bag is empty</div>';
    footerEl.classList.remove('visible');
    return;
  }

  footerEl.classList.add('visible');
  const total = cart.reduce((s, i) => s + i.amount, 0);
  document.getElementById('cart-subtotal').textContent = 'USD $' + total.toLocaleString();

  itemsEl.innerHTML = cart.map((item, i) => `
    <div class="cart-item">
      <div class="cart-item-img">
        <svg width="30" height="38" viewBox="0 0 30 38" fill="none">
          <rect x="4" y="3" width="22" height="28" rx="1" fill="none" stroke="#DDD" stroke-width="0.6"/>
          <text x="15" y="22" text-anchor="middle" font-size="10" fill="#CCC" font-family="Georgia">?</text>
        </svg>
      </div>
      <div class="cart-item-info">
        <p class="cart-item-name">${item.name}</p>
        <p class="cart-item-price">${item.price}</p>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${i})" aria-label="Remove">✕</button>
    </div>
  `).join('');
}

function openCheckout() {
  const total = cart.reduce((s, i) => s + i.amount, 0);
  document.getElementById('modal-items').innerHTML =
    cart.map(i => `<div class="modal-item"><span>${i.name}</span><span>${i.price}</span></div>`).join('');
  document.getElementById('modal-total').textContent = 'USD $' + total.toLocaleString();
  document.getElementById('checkout-modal').classList.add('open');
  document.getElementById('cart-sidebar').classList.remove('open');
  document.getElementById('overlay').classList.remove('open');
}

function closeCheckout() {
  document.getElementById('checkout-modal').classList.remove('open');
}


/* ══════════════════════════════════════
   OVERLAY — close whatever is open
══════════════════════════════════════ */
function closeOverlay() {
  document.getElementById('overlay').classList.remove('open');
  document.getElementById('cart-sidebar').classList.remove('open');
  document.getElementById('mobile-menu').classList.remove('open');
}


/* ══════════════════════════════════════
   FILTER
══════════════════════════════════════ */
function filterProducts(category, btn) {
  currentFilter = category;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderProducts('product-grid-shop', category);
}


/* ══════════════════════════════════════
   DRAW
══════════════════════════════════════ */
function triggerDraw() {
  closeCheckout();
  cart = [];
  updateCartUI();

  cardFlipped = false;
  const card   = document.getElementById('card-3d');
  const screen = document.getElementById('draw-screen');

  card.classList.remove('flipped');
  screen.className = 'draw-screen';
  document.getElementById('draw-result-msg').classList.remove('show');
  document.getElementById('draw-close').classList.remove('show');
  document.getElementById('draw-hint').classList.remove('hidden');
  document.getElementById('draw-text').textContent = 'Tap the card to reveal your fate';

  const roll = Math.random() * 100;
  let cumulative = 0;
  let prize = prizes[prizes.length - 1];
  for (const p of prizes) {
    cumulative += p.chance;
    if (roll < cumulative) { prize = p; break; }
  }

  document.getElementById('result-icon').textContent = prize.icon;
  document.getElementById('result-name').textContent = prize.name;
  document.getElementById('result-sub').textContent  = prize.sub;
  document.getElementById('draw-result-msg').textContent = prize.msg;

  card.dataset.prizeTier      = prize.tier;
  card.dataset.prizeParticles = JSON.stringify(prize.particles);

  screen.classList.add('open');
}

function flipCard() {
  if (cardFlipped) return;
  cardFlipped = true;

  const card   = document.getElementById('card-3d');
  const screen = document.getElementById('draw-screen');
  const tier   = card.dataset.prizeTier;

  card.classList.add('flipped');
  document.getElementById('draw-hint').classList.add('hidden');
  screen.classList.add('tier-' + tier);

  const particleData = JSON.parse(card.dataset.prizeParticles || 'null');
  if (particleData) {
    setTimeout(() => spawnParticles(particleData.color, particleData.count), 600);
  }

  setTimeout(() => {
    document.getElementById('draw-result-msg').classList.add('show');
    document.getElementById('draw-close').classList.add('show');
  }, 1300);
}

function closeDraw() {
  document.getElementById('draw-screen').classList.remove('open');
}

function spawnParticles(color, count) {
  const screen = document.getElementById('draw-screen');
  const cx = window.innerWidth  / 2;
  const cy = window.innerHeight / 2;

  for (let i = 0; i < count; i++) {
    const p     = document.createElement('div');
    p.className = 'particle';
    const angle = (360 / count) * i + (Math.random() - 0.5) * (360 / count);
    const dist  = 80 + Math.random() * 160;
    const rad   = angle * Math.PI / 180;
    const dur   = (0.6 + Math.random() * 0.7).toFixed(2) + 's';

    p.style.cssText = `
      background:${color};
      left:${cx}px; top:${cy}px;
      --tx:${(Math.cos(rad) * dist).toFixed(0)}px;
      --ty:${(Math.sin(rad) * dist).toFixed(0)}px;
      --dur:${dur};
      animation-delay:${(Math.random() * 0.2).toFixed(2)}s;
    `;
    screen.appendChild(p);
    setTimeout(() => p.remove(), 1600);
  }
}


/* ══════════════════════════════════════
   HOME GRID CAROUSEL
══════════════════════════════════════ */
let homeGridPage = 0;

function homeGridSlide(dir) {
  const items = document.querySelectorAll('#product-grid-home .product-card');
  const totalPages = Math.ceil(items.length / 4);
  homeGridPage = Math.max(0, Math.min(totalPages - 1, homeGridPage + dir));
  updateHomeGrid();
}

function updateHomeGrid() {
  const items = document.querySelectorAll('#product-grid-home .product-card');
  const totalPages = Math.ceil(items.length / 4);
  const start = homeGridPage * 4;

  items.forEach((item, i) => {
    item.style.display = (i >= start && i < start + 4) ? '' : 'none';
  });

  const dotsEl = document.getElementById('home-grid-indicators');
  if (dotsEl) {
    dotsEl.innerHTML = Array.from({ length: totalPages }, (_, i) =>
      `<button class="box-dot${i === homeGridPage ? ' active' : ''}" onclick="homeGridPage=${i};updateHomeGrid()" aria-label="Page ${i + 1}"></button>`
    ).join('');
  }

  const arrows = document.querySelectorAll('.home-grid-carousel .box-arrow-btn');
  if (arrows[0]) arrows[0].disabled = homeGridPage === 0;
  if (arrows[1]) arrows[1].disabled = homeGridPage === totalPages - 1;
}


/* ══════════════════════════════════════
   BOX CAROUSEL
══════════════════════════════════════ */
let boxPage = 0;
const BOX_PER_PAGE = 4;

function boxSlide(dir) {
  const items = document.querySelectorAll('#box-grid .box-item');
  const totalPages = Math.ceil(items.length / BOX_PER_PAGE);
  boxPage = (boxPage + dir + totalPages) % totalPages;
  updateBoxCarousel();
}

function updateBoxCarousel() {
  const items = document.querySelectorAll('#box-grid .box-item');
  const totalPages = Math.ceil(items.length / BOX_PER_PAGE);
  const start = boxPage * BOX_PER_PAGE;

  items.forEach((item, i) => {
    item.classList.toggle('box-hidden', i < start || i >= start + BOX_PER_PAGE);
  });

  const dotsEl = document.getElementById('box-indicators');
  if (dotsEl) {
    dotsEl.innerHTML = Array.from({ length: totalPages }, (_, i) =>
      `<button class="box-dot${i === boxPage ? ' active' : ''}" onclick="boxPage=${i};updateBoxCarousel()" aria-label="Page ${i + 1}"></button>`
    ).join('');
  }
}


/* ══════════════════════════════════════
   CURSOR SPARKLE
══════════════════════════════════════ */
let lastSparkle = 0;

function spawnCursorSparkle(x, y) {
  const el = document.createElement('div');
  el.className = 'cursor-sparkle';
  const size = 7 + Math.random() * 10;
  el.style.cssText = `
    left:${x}px; top:${y}px;
    width:${size}px; height:${size}px;
    margin-left:${-size / 2}px; margin-top:${-size / 2}px;
    --dur:${(0.45 + Math.random() * 0.35).toFixed(2)}s;
  `;
  el.innerHTML = `<svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 0 L5.7 4.3 L10 5 L5.7 5.7 L5 10 L4.3 5.7 L0 5 L4.3 4.3 Z" fill="#c9a96e"/>
  </svg>`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 900);
}


/* ══════════════════════════════════════
   INIT
══════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  renderProducts('product-grid-home', 'all');
  updateHomeGrid();
  renderProducts('product-grid-shop', 'all');
  updateBoxCarousel();

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (searchOpen) toggleSearch();
      closeAccount();
      closeCheckout();
    }
  });

  document.addEventListener('mousemove', e => {
    const now = Date.now();
    if (now - lastSparkle > 85 && Math.random() > 0.52) {
      lastSparkle = now;
      spawnCursorSparkle(e.clientX, e.clientY);
    }
  });
});

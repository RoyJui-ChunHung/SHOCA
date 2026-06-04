/* ── XSS HELPER ── */
function esc(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

/* ── PRODUCT DATA ── */
const products = [
  {
    id: 1, name: 'Y2K Metal Blind Box Vol.1', series: 'Y2K Series',
    price: 'USD $38', amount: 38, category: 'y2k', badge: 'Blind Box',
    img: 'https://images.pexels.com/photos/16109264/pexels-photo-16109264.jpeg?auto=compress&cs=tinysrgb&w=400&h=530'
  },
  {
    id: 2, name: 'Healing Planet Series', series: 'Healing',
    price: 'USD $25', amount: 25, category: 'healing', badge: 'New',
    img: 'https://images.pexels.com/photos/4040611/pexels-photo-4040611.jpeg?auto=compress&cs=tinysrgb&w=400&h=530'
  },
  {
    id: 3, name: 'Dark Designer Series', series: 'Designer',
    price: 'USD $40', amount: 40, category: 'designer', badge: '',
    img: 'https://images.pexels.com/photos/8105129/pexels-photo-8105129.jpeg?auto=compress&cs=tinysrgb&w=400&h=530'
  },
  {
    id: 4, name: 'Dream Bubble Series', series: 'Healing',
    price: 'USD $32', amount: 32, category: 'healing', badge: 'Limited',
    img: 'https://images.pexels.com/photos/10556215/pexels-photo-10556215.jpeg?auto=compress&cs=tinysrgb&w=400&h=530'
  },
  {
    id: 5, name: 'Noir Designer Blind Box', series: 'Designer',
    price: 'USD $38', amount: 38, category: 'designer', badge: '',
    img: 'https://images.pexels.com/photos/8706563/pexels-photo-8706563.jpeg?auto=compress&cs=tinysrgb&w=400&h=530'
  },
  {
    id: 6, name: 'Luxury Blind Box', series: 'Luxury',
    price: 'USD $40', amount: 40, category: 'luxury', badge: 'Luxury',
    img: 'https://images.pexels.com/photos/5737315/pexels-photo-5737315.jpeg?auto=compress&cs=tinysrgb&w=400&h=530'
  },
  {
    id: 7, name: 'Y2K Limited Blind Box', series: 'Y2K Series',
    price: 'USD $35', amount: 35, category: 'y2k', badge: 'Y2K',
    img: 'https://images.pexels.com/photos/17298688/pexels-photo-17298688.jpeg?auto=compress&cs=tinysrgb&w=400&h=530'
  },
  {
    id: 8, name: 'Starter Blind Box', series: 'Essentials',
    price: 'USD $22', amount: 22, category: 'healing', badge: '',
    img: 'https://images.pexels.com/photos/2849742/pexels-photo-2849742.jpeg?auto=compress&cs=tinysrgb&w=400&h=530'
  }
];


/* ── PRIZES ── */
const prizes = [
  { tier: 'ssr',     chance: 1,  icon: '♠', name: 'RARE Grand Prize',  sub: 'Diamond / Jade Jewelry',         msg: 'Congratulations! You won the RARE Grand Prize!',    particles: { color: '#FFD700', count: 28 } },
  { tier: 'sr-plus', chance: 5,  icon: '♥', name: 'RARE Runner-up',    sub: 'Semi-precious Designer Piece',   msg: 'You\'re so lucky — RARE Runner-up is yours!',       particles: { color: '#c0392b', count: 20 } },
  { tier: 'sr',      chance: 15, icon: '♦', name: 'Bonus Blind Box',   sub: 'One random jewelry blind box',   msg: 'Bonus blind box! The surprises keep coming!',       particles: { color: '#80CFFF', count: 12 } },
  { tier: 'r',       chance: 30, icon: '♣', name: '10% Off Coupon',    sub: 'Valid on your next order',        msg: '10% off coupon sent to your account!',              particles: null },
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
        <img src="${esc(p.img)}" alt="${esc(p.name)}" loading="lazy">
        ${p.badge ? `<span class="product-badge">${esc(p.badge)}</span>` : ''}
        <div class="product-overlay">
          <button class="overlay-btn" data-pid="${p.id}" onclick="addToCartById(this.dataset.pid)">Add to Bag</button>
        </div>
      </div>
      <div class="product-info">
        <p class="product-series">${esc(p.series)}</p>
        <p class="product-name">${esc(p.name)}</p>
        <p class="product-price">${esc(p.price)}</p>
      </div>
    </div>
  `).join('');
}


function addToCartById(id) {
  const p = products.find(p => p.id === +id);
  if (p) addToCart(p.name, p.price, p.amount);
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
   CATEGORY SHORTCUT
══════════════════════════════════════ */
function goToCategory(category) {
  showPage('shop');
  currentFilter = category;
  document.querySelectorAll('.filter-btn').forEach(b => {
    b.classList.toggle('active', b.textContent.trim().toLowerCase() === category);
  });
  renderProducts('product-grid-shop', category);
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
        <p class="search-result-name">${esc(p.name)}</p>
        <p class="search-result-price">${esc(p.series)} · ${esc(p.price)}</p>
      </div>
      <button class="search-result-add" data-pid="${p.id}" onclick="addToCartById(this.dataset.pid); toggleSearch()">Add</button>
    </div>
  `).join('');
}


/* ══════════════════════════════════════
   ACCOUNT — 雙模式 (Firebase / localStorage)
══════════════════════════════════════ */
let currentUser = null;

/* ── localStorage helpers ── */
function lsGetUsers()  { return JSON.parse(localStorage.getItem('shoca_users') || '[]'); }
function lsSaveUsers(u){ localStorage.setItem('shoca_users', JSON.stringify(u)); }
function lsGetUser()   { return JSON.parse(localStorage.getItem('shoca_user')  || 'null'); }
function lsSaveUser(u) { localStorage.setItem('shoca_user',  JSON.stringify(u)); }
function lsClearUser() { localStorage.removeItem('shoca_user'); }

function updateNavAccount() {
  const btn     = document.getElementById('nav-account-btn');
  const wrap    = document.getElementById('nav-account-wrap');
  if (!btn || !wrap) return;
  if (currentUser) {
    btn.textContent = `Hi, ${currentUser.name.split(' ')[0]}`;
    wrap.classList.add('logged-in');
  } else {
    btn.textContent = 'Account';
    wrap.classList.remove('logged-in');
  }
}

function handleAccountClick() {
  if (!currentUser) {
    document.getElementById('account-modal').classList.add('open');
  }
  /* when logged in, hover dropdown handles everything — no click needed */
}

function toggleAccount() {
  handleAccountClick();
}

function showProfile() {
  const modal = document.getElementById('account-modal');
  document.getElementById('tab-login').style.display    = 'none';
  document.getElementById('tab-register').style.display = 'none';
  document.querySelector('.account-tabs').style.display = 'none';

  let prof = document.getElementById('tab-profile');
  if (!prof) {
    prof = document.createElement('div');
    prof.id = 'tab-profile';
    modal.querySelector('.modal').appendChild(prof);
  }

  const wallet  = currentUser.wallet || 0;
  const initial = esc(currentUser.name.charAt(0).toUpperCase());

  prof.innerHTML = `
    <div class="profile-header">
      <div class="profile-avatar">${initial}</div>
      <div>
        <p class="profile-name">${esc(currentUser.name)}</p>
        <p class="profile-email">${esc(currentUser.email)}</p>
      </div>
    </div>

    <div class="profile-list">

      <div class="profile-row" onclick="toggleProfileSection('name')">
        <span>Change Name</span><span class="profile-arrow">›</span>
      </div>
      <div class="profile-section" id="psec-name">
        <div class="form-group" style="margin-bottom:12px">
          <label>New Name</label>
          <input id="new-name-input" type="text" placeholder="${esc(currentUser.name)}">
        </div>
        <p id="name-msg" class="profile-msg"></p>
        <button class="btn btn-dark" style="width:100%;margin-top:4px" onclick="saveNewName()">Save</button>
      </div>

      <div class="profile-row" onclick="toggleProfileSection('password')">
        <span>Reset Password</span><span class="profile-arrow">›</span>
      </div>
      <div class="profile-section" id="psec-password">
        <div class="form-group" style="margin-bottom:12px">
          <label>Current Password</label>
          <input id="cur-pw-input" type="password" placeholder="••••••••">
        </div>
        <div class="form-group" style="margin-bottom:12px">
          <label>New Password</label>
          <input id="new-pw-input" type="password" placeholder="At least 8 characters">
        </div>
        <p id="pw-msg" class="profile-msg"></p>
        <button class="btn btn-dark" style="width:100%;margin-top:4px" onclick="saveNewPassword()">Update Password</button>
      </div>

      <div class="profile-row" style="cursor:default">
        <span>Wallet</span>
        <span class="profile-value">${esc(String(wallet))} Credits</span>
      </div>

      <div class="profile-row" style="cursor:default">
        <span>Member Since</span>
        <span class="profile-value">${new Date().getFullYear()}</span>
      </div>

    </div>
  `;

  prof.style.display = 'block';
  modal.classList.add('open');
}

function toggleProfileSection(id) {
  const sec = document.getElementById('psec-' + id);
  if (!sec) return;
  const isOpen = sec.classList.contains('open');
  document.querySelectorAll('.profile-section').forEach(s => s.classList.remove('open'));
  if (!isOpen) sec.classList.add('open');
}

async function saveNewName() {
  const val = document.getElementById('new-name-input').value.trim();
  const msg = document.getElementById('name-msg');
  if (!val) { showProfileMsg(msg, 'Please enter a name.', false); return; }
  try {
    if (FIREBASE_READY) {
      const user = auth.currentUser;
      await user.updateProfile({ displayName: val });
      await db.collection('users').doc(user.uid).update({ name: val });
    } else {
      const users = lsGetUsers();
      const u = users.find(u => u.email === currentUser.email);
      if (u) { u.name = val; lsSaveUsers(users); }
    }
    currentUser.name = val;
    lsSaveUser(currentUser);
    updateNavAccount();
    showProfileMsg(msg, 'Name updated.', true);
    document.querySelector('.profile-name').textContent = val;
    document.querySelector('.profile-avatar').textContent = val.charAt(0).toUpperCase();
  } catch (e) {
    showProfileMsg(msg, 'Update failed. Please try again.', false);
  }
}

async function saveNewPassword() {
  const curPw = document.getElementById('cur-pw-input').value;
  const newPw = document.getElementById('new-pw-input').value;
  const msg   = document.getElementById('pw-msg');
  if (newPw.length < 8) { showProfileMsg(msg, 'New password must be at least 8 characters.', false); return; }
  try {
    if (FIREBASE_READY) {
      const user       = auth.currentUser;
      const credential = firebase.auth.EmailAuthProvider.credential(user.email, curPw);
      await user.reauthenticateWithCredential(credential);
      await user.updatePassword(newPw);
    } else {
      const users = lsGetUsers();
      const u = users.find(u => u.email === currentUser.email);
      if (!u || u.password !== curPw) { showProfileMsg(msg, 'Current password is incorrect.', false); return; }
      u.password = newPw;
      lsSaveUsers(users);
    }
    showProfileMsg(msg, 'Password updated.', true);
    document.getElementById('cur-pw-input').value = '';
    document.getElementById('new-pw-input').value = '';
  } catch (e) {
    const errMsg = (e.code === 'auth/wrong-password') ? 'Current password is incorrect.' : 'Update failed.';
    showProfileMsg(msg, errMsg, false);
  }
}

function showProfileMsg(el, text, success) {
  el.textContent  = text;
  el.style.color  = success ? 'var(--gold)' : '#c0392b';
  el.style.display = 'block';
  setTimeout(() => { el.style.display = 'none'; }, 3000);
}

async function logoutAccount() {
  if (FIREBASE_READY) await auth.signOut();
  currentUser = null;
  lsClearUser();
  updateNavAccount();
  closeAccount();
  switchTab('login');
}

function closeAccount() {
  document.getElementById('account-modal').classList.remove('open');
  const prof = document.getElementById('tab-profile');
  if (prof) prof.style.display = 'none';
  document.querySelector('.account-tabs').style.display = '';
}

function switchTab(tab) {
  document.getElementById('tab-login').style.display    = tab === 'login'    ? 'block' : 'none';
  document.getElementById('tab-register').style.display = tab === 'register' ? 'block' : 'none';
  document.getElementById('tab-btn-login').classList.toggle('active',    tab === 'login');
  document.getElementById('tab-btn-register').classList.toggle('active', tab === 'register');
  const prof = document.getElementById('tab-profile');
  if (prof) prof.style.display = 'none';
}

async function handleLogin(e) {
  e.preventDefault();
  const email    = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;

  if (FIREBASE_READY) {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      closeAccount();
    } catch (err) {
      showFormError('login-error', firebaseAuthMsg(err.code));
    }
  } else {
    const user = lsGetUsers().find(u => u.email === email && u.password === password);
    if (!user) { showFormError('login-error', 'Incorrect email or password.'); return; }
    currentUser = { name: user.name, email: user.email, wallet: user.wallet || 0 };
    lsSaveUser(currentUser);
    updateNavAccount();
    closeAccount();
  }
}

async function handleRegister(e) {
  e.preventDefault();
  const name     = document.getElementById('reg-name').value.trim();
  const email    = document.getElementById('reg-email').value.trim();
  const password = document.getElementById('reg-password').value;
  if (!name || !email || !password) { showFormError('reg-error', 'Please fill in all fields.'); return; }
  if (password.length < 8) { showFormError('reg-error', 'Password must be at least 8 characters.'); return; }

  if (FIREBASE_READY) {
    try {
      const cred = await auth.createUserWithEmailAndPassword(email, password);
      await cred.user.updateProfile({ displayName: name });
      // 寫入 Firestore（若規則尚未部署則靜默失敗，不影響帳號建立）
      try {
        await db.collection('users').doc(cred.user.uid).set({
          name, email, wallet: 0,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
      } catch (_) {}
      closeAccount();
    } catch (err) {
      showFormError('reg-error', firebaseAuthMsg(err.code));
    }
  } else {
    const users = lsGetUsers();
    if (users.find(u => u.email === email)) { showFormError('reg-error', 'This email is already registered.'); return; }
    users.push({ name, email, password, wallet: 0 });
    lsSaveUsers(users);
    currentUser = { name, email, wallet: 0 };
    lsSaveUser(currentUser);
    updateNavAccount();
    closeAccount();
  }
}

function firebaseAuthMsg(code) {
  const map = {
    'auth/invalid-api-key':        'Firebase not configured — fill in firebase-config.js.',
    'auth/configuration-not-found':'Firebase project not found — check firebase-config.js.',
    'auth/operation-not-allowed':  'Email/Password sign-in not enabled in Firebase Console.',
    'auth/email-already-in-use':   'This email is already registered.',
    'auth/invalid-email':          'Invalid email address.',
    'auth/weak-password':          'Password must be at least 8 characters.',
    'auth/user-not-found':         'Incorrect email or password.',
    'auth/wrong-password':         'Incorrect email or password.',
    'auth/invalid-credential':     'Incorrect email or password.',
    'auth/network-request-failed': 'Network error — check your internet connection.',
    'auth/too-many-requests':      'Too many attempts. Please wait and try again.',
  };
  return map[code] || `Sign-in error (${code})`;
}

function showFormError(id, msg) {
  let el = document.getElementById(id);
  if (!el) return;
  el.textContent = msg;
  el.style.display = 'block';
  setTimeout(() => { el.style.display = 'none'; }, 3500);
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
        <p class="cart-item-name">${esc(item.name)}</p>
        <p class="cart-item-price">${esc(item.price)}</p>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${i})" aria-label="Remove">✕</button>
    </div>
  `).join('');
}

function openCheckout() {
  const total = cart.reduce((s, i) => s + i.amount, 0);
  document.getElementById('modal-items').innerHTML =
    cart.map(i => `<div class="modal-item"><span>${esc(i.name)}</span><span>${esc(i.price)}</span></div>`).join('');
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
async function triggerDraw() {
  closeCheckout();
  cart = [];
  updateCartUI();

  cardFlipped = false;
  const card   = document.getElementById('card-3d');
  const screen = document.getElementById('draw-screen');

  card.classList.remove('flipped');
  screen.className = 'draw-screen open';
  document.getElementById('draw-result-msg').classList.remove('show');
  document.getElementById('draw-close').classList.remove('show');
  document.getElementById('draw-hint').classList.add('hidden');
  document.getElementById('draw-text').textContent = 'Drawing your fate…';

  let prize;
  try {
    if (FIREBASE_READY && currentUser?.uid) {
      const drawFn = functions.httpsCallable('cardDraw');
      const result = await drawFn({});
      prize = result.data;
    } else {
      prize = localDraw();
    }
  } catch (err) {
    prize = localDraw();
  }

  document.getElementById('result-icon').textContent      = prize.icon;
  document.getElementById('result-name').textContent      = prize.name;
  document.getElementById('result-sub').textContent       = prize.sub;
  document.getElementById('draw-result-msg').textContent  = prize.msg;
  card.dataset.prizeTier      = prize.tier;
  card.dataset.prizeParticles = JSON.stringify(prize.particles || null);

  document.getElementById('draw-text').textContent = 'Tap the card to reveal your fate';
  document.getElementById('draw-hint').classList.remove('hidden');
}

function localDraw() {
  const roll = Math.random() * 100;
  let cumulative = 0;
  let prize = prizes[prizes.length - 1];
  for (const p of prizes) {
    cumulative += p.chance;
    if (roll < cumulative) { prize = p; break; }
  }
  return prize;
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
   DEMO DRAW
══════════════════════════════════════ */
let demoFlipped = false;

function demoFlip() {
  if (demoFlipped) return;
  demoFlipped = true;

  document.getElementById('demo-card').classList.add('flipped');
  document.getElementById('demo-hint').classList.add('hidden');

  const roll = Math.random() * 100;
  let cum = 0, prize = prizes[prizes.length - 1];
  for (const p of prizes) { cum += p.chance; if (roll < cum) { prize = p; break; } }

  const iconEl = document.getElementById('demo-icon');
  iconEl.textContent = prize.icon;
  iconEl.style.color = ['♥','♦'].includes(prize.icon) ? '#b83232'
                      : ['♠','♣'].includes(prize.icon) ? '#0a0a0a' : '';

  document.getElementById('demo-name').textContent = prize.name;
  document.getElementById('demo-sub').textContent  = prize.sub;

  setTimeout(() => {
    document.getElementById('demo-msg').textContent = prize.msg;
    document.getElementById('demo-actions').style.display = 'flex';
  }, 1200);
}

function demoReset() {
  demoFlipped = false;
  document.getElementById('demo-card').classList.remove('flipped');
  document.getElementById('demo-hint').classList.remove('hidden');
  document.getElementById('demo-msg').textContent = '';
  document.getElementById('demo-actions').style.display = 'none';
  const iconEl = document.getElementById('demo-icon');
  iconEl.textContent = '';
  iconEl.style.color = '';
  document.getElementById('demo-name').textContent = '';
  document.getElementById('demo-sub').textContent  = '';
}


/* ══════════════════════════════════════
   CURSOR SPARKLE
══════════════════════════════════════ */
let lastSparkle = 0;

function spawnCursorSparkle(x, y) {
  const suits = ['♠', '♥', '♦', '♣'];
  const isRed  = (s) => s === '♥' || s === '♦';
  const suit   = suits[Math.floor(Math.random() * suits.length)];
  const size   = 11 + Math.random() * 8;
  const el     = document.createElement('div');
  el.className = 'cursor-sparkle';
  el.textContent = suit;
  el.style.cssText = `
    left:${x}px; top:${y}px;
    font-size:${size.toFixed(0)}px;
    margin-left:${-size / 2}px; margin-top:${-size / 2}px;
    color:${isRed(suit) ? '#c0392b' : '#c9a96e'};
    --dur:${(0.5 + Math.random() * 0.35).toFixed(2)}s;
  `;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 900);
}


/* ══════════════════════════════════════
   AUTH STATE INIT
══════════════════════════════════════ */
if (FIREBASE_READY) {
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      try {
        const snap = await db.collection('users').doc(user.uid).get();
        const data = snap.data();
        currentUser = {
          name:   data?.name   || user.displayName || 'Member',
          email:  user.email,
          uid:    user.uid,
          wallet: data?.wallet || 0
        };
      } catch {
        currentUser = { name: user.displayName || 'Member', email: user.email, uid: user.uid, wallet: 0 };
      }
    } else {
      currentUser = null;
    }
    updateNavAccount();
  });
} else {
  // localStorage mode: 從本機還原登入狀態
  currentUser = lsGetUser();
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

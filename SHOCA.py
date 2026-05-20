<!DOCTYPE html>
<html lang="zh-HK">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>SHOCA — Open the Unknown</title>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Helvetica+Neue:wght@300;400&display=swap" rel="stylesheet">
<style>
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --black: #111111;
    --white: #FFFFFF;
    --gray-100: #F7F7F7;
    --gray-200: #EEEEEE;
    --gray-400: #AAAAAA;
    --gray-600: #666666;
    --border: rgba(0,0,0,0.10);
    --font-serif: 'Cormorant Garamond', Georgia, serif;
    --font-sans: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  html { scroll-behavior: smooth; }

  body {
    font-family: var(--font-sans);
    background: var(--white);
    color: var(--black);
    font-weight: 300;
    -webkit-font-smoothing: antialiased;
  }

  /* ── NAV ── */
  nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    background: rgba(255,255,255,0.96);
    backdrop-filter: blur(8px);
    border-bottom: 0.5px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 48px; height: 56px;
  }
  .nav-links { display: flex; gap: 32px; }
  .nav-links a {
    font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--gray-600); text-decoration: none; transition: color 0.2s;
  }
  .nav-links a:hover, .nav-links a.active { color: var(--black); }
  .logo {
    font-family: var(--font-serif); font-size: 24px; font-weight: 300;
    letter-spacing: 0.3em; text-transform: uppercase;
    position: absolute; left: 50%; transform: translateX(-50%);
    cursor: pointer;
  }
  .nav-right { display: flex; align-items: center; gap: 20px; }
  .nav-icon {
    font-size: 10px; letter-spacing: 0.10em; text-transform: uppercase;
    color: var(--gray-600); cursor: pointer; transition: color 0.2s;
    background: none; border: none; font-family: var(--font-sans);
  }
  .nav-icon:hover { color: var(--black); }
  .cart-count {
    display: inline-flex; align-items: center; justify-content: center;
    width: 16px; height: 16px; background: var(--black); color: var(--white);
    font-size: 9px; border-radius: 50%; margin-left: 4px;
  }

  /* ── PAGES ── */
  .page { display: none; padding-top: 56px; min-height: 100vh; }
  .page.active { display: block; }

  /* ── BANNER ── */
  .banner {
    background: var(--black); color: var(--white);
    text-align: center; padding: 10px;
    font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase;
  }

  /* ── HERO ── */
  .hero {
    display: grid; grid-template-columns: 1fr 1fr;
    border-bottom: 0.5px solid var(--border); height: calc(100vh - 96px);
  }
  .hero-left {
    padding: 64px 56px; display: flex; flex-direction: column;
    justify-content: space-between; border-right: 0.5px solid var(--border);
  }
  .hero-eyebrow { font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--gray-400); margin-bottom: 16px; }
  .hero-title { font-family: var(--font-serif); font-size: clamp(56px, 7vw, 88px); font-weight: 300; line-height: 1.0; }
  .hero-title em { font-style: italic; }
  .hero-body { font-size: 12px; letter-spacing: 0.04em; line-height: 1.9; color: var(--gray-600); max-width: 300px; margin-top: 20px; }
  .hero-cta { display: flex; gap: 12px; margin-top: 40px; }
  .btn { font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; padding: 13px 32px; cursor: pointer; border: none; font-family: var(--font-sans); transition: all 0.2s; }
  .btn-dark { background: var(--black); color: var(--white); }
  .btn-dark:hover { background: #333; }
  .btn-outline { background: transparent; color: var(--black); border: 0.5px solid rgba(0,0,0,0.3); }
  .btn-outline:hover { background: var(--gray-100); }
  .hero-right { padding: 64px 56px; display: flex; flex-direction: column; gap: 16px; }
  .hero-img {
    flex: 1; background: var(--gray-100); display: flex; align-items: center;
    justify-content: center; position: relative; overflow: hidden;
  }
  .hero-img-label { position: absolute; bottom: 16px; left: 16px; font-size: 9px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--gray-400); }
  .hero-tags { display: flex; gap: 8px; flex-wrap: wrap; }
  .tag { font-size: 9px; letter-spacing: 0.12em; text-transform: uppercase; padding: 7px 14px; border: 0.5px solid var(--border); color: var(--gray-600); }

  /* ── SECTIONS ── */
  .section { padding: 72px 48px; border-bottom: 0.5px solid var(--border); }
  .section-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 40px; }
  .section-title { font-family: var(--font-serif); font-size: 36px; font-weight: 300; }
  .section-link { font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--gray-600); cursor: pointer; text-decoration: none; }
  .section-link:hover { color: var(--black); }

  /* ── PRODUCT GRID ── */
  .product-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: var(--border); }
  .product-card { background: var(--white); cursor: pointer; }
  .product-img { aspect-ratio: 3/4; background: var(--gray-100); display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; }
  .product-img svg { transition: transform 0.4s ease; }
  .product-card:hover .product-img svg { transform: scale(1.04); }
  .product-badge { position: absolute; top: 12px; left: 12px; font-size: 8px; letter-spacing: 0.14em; text-transform: uppercase; padding: 4px 9px; background: var(--black); color: var(--white); }
  .product-overlay { position: absolute; bottom: 0; left: 0; right: 0; background: rgba(255,255,255,0.95); padding: 14px; display: flex; align-items: center; justify-content: center; transform: translateY(100%); transition: transform 0.25s ease; }
  .product-card:hover .product-overlay { transform: translateY(0); }
  .overlay-btn { font-size: 9px; letter-spacing: 0.14em; text-transform: uppercase; background: none; border: none; cursor: pointer; font-family: var(--font-sans); }
  .product-info { padding: 14px 2px 18px; }
  .product-name { font-size: 12px; letter-spacing: 0.04em; margin-bottom: 5px; }
  .product-price { font-size: 11px; color: var(--gray-600); }
  .product-series { font-size: 9px; letter-spacing: 0.10em; text-transform: uppercase; color: var(--gray-400); margin-bottom: 4px; }

  /* ── BLIND BOX SECTION ── */
  .blind-split { display: grid; grid-template-columns: 1fr 1fr; border-bottom: 0.5px solid var(--border); }
  .blind-left { padding: 72px 56px; border-right: 0.5px solid var(--border); }
  .blind-right { padding: 72px 56px; background: var(--gray-100); }
  .blind-title { font-family: var(--font-serif); font-size: 52px; font-weight: 300; line-height: 1.1; margin-bottom: 20px; }
  .blind-desc { font-size: 12px; line-height: 1.9; color: var(--gray-600); max-width: 320px; margin-bottom: 36px; }
  .box-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 10px; }
  .box-item {
    aspect-ratio: 1; background: var(--white); border: 0.5px solid var(--border);
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: 6px; cursor: pointer; transition: all 0.2s;
  }
  .box-item:hover { border-color: var(--black); }
  .box-icon { font-size: 22px; }
  .box-label { font-size: 9px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--gray-600); }
  .box-price { font-size: 12px; }
  .box-item.coming { border: 0.5px dashed rgba(0,0,0,0.2); cursor: default; }

  /* ── CARD SECTION ── */
  .card-section { display: grid; grid-template-columns: 1fr 1fr; gap: 0; border-bottom: 0.5px solid var(--border); }
  .card-visual { background: var(--gray-100); display: flex; align-items: center; justify-content: center; min-height: 400px; border-right: 0.5px solid var(--border); }
  .card-content { padding: 72px 56px; }
  .card-eyebrow { font-size: 9px; letter-spacing: 0.20em; text-transform: uppercase; color: var(--gray-400); margin-bottom: 14px; }
  .card-title { font-family: var(--font-serif); font-size: 44px; font-weight: 300; line-height: 1.1; margin-bottom: 16px; }
  .card-desc { font-size: 12px; line-height: 1.9; color: var(--gray-600); margin-bottom: 8px; }
  .prob-list { margin: 24px 0; border-top: 0.5px solid var(--border); }
  .prob-item { display: flex; justify-content: space-between; align-items: center; padding: 11px 0; border-bottom: 0.5px solid var(--border); }
  .prob-reward { font-size: 12px; }
  .prob-pct { font-size: 11px; color: var(--gray-400); }

  /* ── RARE SECTION ── */
  .rare-hero { background: var(--black); color: var(--white); padding: 100px 56px; text-align: center; border-bottom: 0.5px solid rgba(255,255,255,0.1); }
  .rare-eyebrow { font-size: 9px; letter-spacing: 0.22em; text-transform: uppercase; color: rgba(255,255,255,0.4); margin-bottom: 20px; }
  .rare-title { font-family: var(--font-serif); font-size: 72px; font-weight: 300; letter-spacing: 0.06em; margin-bottom: 20px; }
  .rare-sub { font-size: 12px; line-height: 1.9; color: rgba(255,255,255,0.5); max-width: 400px; margin: 0 auto 40px; }
  .btn-light { background: var(--white); color: var(--black); font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; padding: 13px 32px; cursor: pointer; border: none; font-family: var(--font-sans); }
  .rare-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1px; background: rgba(255,255,255,0.1); background-color: var(--black); }
  .rare-card { background: #161616; cursor: pointer; transition: background 0.2s; }
  .rare-card:hover { background: #1e1e1e; }
  .rare-img { aspect-ratio: 3/4; display: flex; align-items: center; justify-content: center; border-bottom: 0.5px solid rgba(255,255,255,0.06); }
  .rare-info { padding: 16px 18px 22px; }
  .rare-name { font-size: 13px; color: rgba(255,255,255,0.85); margin-bottom: 6px; letter-spacing: 0.03em; }
  .rare-price { font-size: 11px; color: rgba(255,255,255,0.4); letter-spacing: 0.04em; }
  .rare-badge { font-size: 8px; letter-spacing: 0.14em; text-transform: uppercase; padding: 3px 8px; border: 0.5px solid rgba(255,255,255,0.15); color: rgba(255,255,255,0.4); display: inline-block; margin-bottom: 10px; }

  /* ── CHECKOUT MODAL ── */
  .modal-bg {
    position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 200;
    display: none; align-items: center; justify-content: center;
  }
  .modal-bg.open { display: flex; }
  .modal { background: var(--white); width: 480px; max-width: 95vw; padding: 48px; position: relative; }
  .modal-close { position: absolute; top: 16px; right: 20px; background: none; border: none; font-size: 18px; cursor: pointer; color: var(--gray-400); }
  .modal-title { font-family: var(--font-serif); font-size: 28px; font-weight: 300; margin-bottom: 8px; }
  .modal-sub { font-size: 11px; color: var(--gray-600); line-height: 1.8; margin-bottom: 32px; }
  .modal-item { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 0.5px solid var(--border); font-size: 12px; }
  .modal-total { display: flex; justify-content: space-between; padding: 16px 0; font-size: 13px; font-weight: 400; }
  .modal-btn { width: 100%; margin-top: 24px; }

  /* ── CARD DRAW ANIMATION ── */
  .draw-screen {
    position: fixed; inset: 0; background: var(--black); z-index: 300;
    display: none; flex-direction: column; align-items: center; justify-content: center;
  }
  .draw-screen.open { display: flex; }
  .draw-logo { font-family: var(--font-serif); font-size: 22px; font-weight: 300; letter-spacing: 0.3em; color: rgba(255,255,255,0.3); margin-bottom: 60px; }
  .draw-text { font-size: 10px; letter-spacing: 0.20em; text-transform: uppercase; color: rgba(255,255,255,0.3); margin-bottom: 40px; }
  .card-wrap { perspective: 1000px; }
  .card-3d {
    width: 200px; height: 310px; position: relative;
    transform-style: preserve-3d;
    transition: transform 1.2s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
  }
  .card-3d.flipped { transform: rotateY(180deg); }
  .card-face {
    position: absolute; inset: 0; backface-visibility: hidden;
    border-radius: 4px; display: flex; flex-direction: column;
    align-items: center; justify-content: center;
  }
  .card-back {
    background: #1a1a1a; border: 0.5px solid rgba(255,255,255,0.1);
  }
  .card-back-logo { font-family: var(--font-serif); font-size: 28px; letter-spacing: 0.3em; color: rgba(255,255,255,0.15); }
  .card-back-pattern { position: absolute; inset: 12px; border: 0.5px solid rgba(255,255,255,0.05); }
  .card-front { background: var(--white); transform: rotateY(180deg); }
  .card-front-top { font-size: 8px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--gray-400); margin-bottom: 12px; }
  .card-result-icon { font-size: 40px; margin-bottom: 12px; }
  .card-result-name { font-family: var(--font-serif); font-size: 18px; font-weight: 300; text-align: center; margin-bottom: 8px; line-height: 1.2; }
  .card-result-sub { font-size: 9px; letter-spacing: 0.10em; text-transform: uppercase; color: var(--gray-400); text-align: center; }
  .draw-hint { font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(255,255,255,0.2); margin-top: 40px; }
  .draw-hint.hidden { opacity: 0; }
  .draw-result-msg { font-family: var(--font-serif); font-size: 32px; font-weight: 300; color: var(--white); margin-top: 32px; text-align: center; opacity: 0; transition: opacity 0.6s; }
  .draw-result-msg.show { opacity: 1; }
  .draw-close { margin-top: 32px; font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(255,255,255,0.3); background: none; border: none; cursor: pointer; font-family: var(--font-sans); display: none; }
  .draw-close.show { display: block; }

  /* ── FOOTER ── */
  footer { background: var(--black); color: rgba(255,255,255,0.6); padding: 64px 48px 32px; }
  .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 40px; margin-bottom: 48px; }
  .footer-logo { font-family: var(--font-serif); font-size: 22px; font-weight: 300; letter-spacing: 0.3em; color: var(--white); margin-bottom: 14px; }
  .footer-desc { font-size: 11px; line-height: 1.9; color: rgba(255,255,255,0.4); }
  .footer-head { font-size: 9px; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(255,255,255,0.5); margin-bottom: 16px; }
  .footer-links { display: flex; flex-direction: column; gap: 10px; }
  .footer-link { font-size: 11px; color: rgba(255,255,255,0.35); cursor: pointer; text-decoration: none; transition: color 0.2s; }
  .footer-link:hover { color: rgba(255,255,255,0.8); }
  .footer-bottom { border-top: 0.5px solid rgba(255,255,255,0.08); padding-top: 24px; display: flex; justify-content: space-between; font-size: 10px; color: rgba(255,255,255,0.2); letter-spacing: 0.06em; }

  /* ── CART SIDEBAR ── */
  .cart-sidebar {
    position: fixed; right: 0; top: 0; bottom: 0; width: 380px;
    background: var(--white); border-left: 0.5px solid var(--border);
    z-index: 150; transform: translateX(100%); transition: transform 0.3s ease;
    display: flex; flex-direction: column;
  }
  .cart-sidebar.open { transform: translateX(0); }
  .cart-header { padding: 20px 28px; border-bottom: 0.5px solid var(--border); display: flex; justify-content: space-between; align-items: center; }
  .cart-header-title { font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; }
  .cart-items { flex: 1; overflow-y: auto; padding: 16px 28px; }
  .cart-item { display: flex; gap: 14px; padding: 16px 0; border-bottom: 0.5px solid var(--border); }
  .cart-item-img { width: 60px; height: 75px; background: var(--gray-100); flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
  .cart-item-info { flex: 1; }
  .cart-item-name { font-size: 12px; margin-bottom: 4px; }
  .cart-item-price { font-size: 11px; color: var(--gray-600); }
  .cart-footer { padding: 20px 28px; border-top: 0.5px solid var(--border); }
  .cart-total { display: flex; justify-content: space-between; margin-bottom: 16px; font-size: 12px; }
  .cart-empty { text-align: center; padding: 60px 0; font-size: 12px; color: var(--gray-400); }
  .overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.2); z-index: 140; display: none; }
  .overlay.open { display: block; }
</style>
</head>
<body>

<!-- NAV -->
<nav>
  <div class="nav-links">
    <a href="#" class="active" onclick="showPage('home',this)">盲盒系列</a>
    <a href="#" onclick="showPage('shop',this)">單品</a>
    <a href="#" onclick="showPage('rare',this)">RARE</a>
    <a href="#" onclick="showPage('draw-info',this)">抽卡說明</a>
  </div>
  <div class="logo" onclick="showPage('home',null)">SHOCA</div>
  <div class="nav-right">
    <button class="nav-icon">搜尋</button>
    <button class="nav-icon">帳號</button>
    <button class="nav-icon" onclick="toggleCart()">購物袋 <span class="cart-count" id="cart-count">0</span></button>
  </div>
</nav>

<!-- OVERLAY -->
<div class="overlay" id="overlay" onclick="toggleCart()"></div>

<!-- CART SIDEBAR -->
<div class="cart-sidebar" id="cart-sidebar">
  <div class="cart-header">
    <span class="cart-header-title">購物袋</span>
    <button class="nav-icon" onclick="toggleCart()">✕</button>
  </div>
  <div class="cart-items" id="cart-items">
    <div class="cart-empty">購物袋為空</div>
  </div>
  <div class="cart-footer" id="cart-footer" style="display:none;">
    <div class="cart-total"><span>小計</span><span id="cart-subtotal">HKD $0</span></div>
    <button class="btn btn-dark" style="width:100%;" onclick="openCheckout()">前往結帳</button>
  </div>
</div>

<!-- ═══════════════ HOME PAGE ═══════════════ -->
<div class="page active" id="page-home">
  <div class="banner">免費送貨 滿 HKD $500 · 每單抽卡一次 · 1% 機率贏得真鑽珠寶</div>

  <div class="hero">
    <div class="hero-left">
      <div>
        <p class="hero-eyebrow">2025 首季系列</p>
        <h1 class="hero-title">Open the<br><em>Unknown</em></h1>
        <p class="hero-body">盲盒飾品 × 抽卡驚喜。每一件都是命中注定，每次結帳都藏著改變的可能。</p>
      </div>
      <div class="hero-cta">
        <button class="btn btn-dark" onclick="scrollTo({top:400,behavior:'smooth'})">立即選盲盒</button>
        <button class="btn btn-outline" onclick="showPage('rare',null)">認識 RARE</button>
      </div>
    </div>
    <div class="hero-right">
      <div class="hero-img">
        <svg width="180" height="240" viewBox="0 0 180 240" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="60" y="14" width="60" height="60" rx="1" fill="none" stroke="#BBBBBB" stroke-width="0.6"/>
          <line x1="60" y1="44" x2="120" y2="44" stroke="#DDDDDD" stroke-width="0.5"/>
          <line x1="90" y1="14" x2="90" y2="74" stroke="#DDDDDD" stroke-width="0.5"/>
          <polygon points="90,84 68,118 112,118" fill="none" stroke="#999" stroke-width="0.6"/>
          <polygon points="90,84 112,118 134,100 112,68" fill="none" stroke="#BBBBBB" stroke-width="0.5"/>
          <polygon points="90,84 68,118 46,100 68,68" fill="none" stroke="#BBBBBB" stroke-width="0.5"/>
          <line x1="90" y1="118" x2="90" y2="150" stroke="#DDDDDD" stroke-width="0.5"/>
          <ellipse cx="90" cy="156" rx="28" ry="7" fill="none" stroke="#DDDDDD" stroke-width="0.5"/>
          <circle cx="90" cy="185" rx="20" ry="20" fill="none" stroke="#BBBBBB" stroke-width="0.6"/>
          <circle cx="90" cy="185" rx="11" fill="none" stroke="#DDDDDD" stroke-width="0.5"/>
          <line x1="70" y1="185" x2="110" y2="185" stroke="#DDDDDD" stroke-width="0.4"/>
          <line x1="90" y1="165" x2="90" y2="205" stroke="#DDDDDD" stroke-width="0.4"/>
          <line x1="76" y1="171" x2="104" y2="199" stroke="#DDDDDD" stroke-width="0.4"/>
          <line x1="104" y1="171" x2="76" y2="199" stroke="#DDDDDD" stroke-width="0.4"/>
          <circle cx="90" cy="225" r="4" fill="none" stroke="#CCCCCC" stroke-width="0.5"/>
        </svg>
        <span class="hero-img-label">Y2K Blind Box — SS25</span>
      </div>
      <div class="hero-tags">
        <span class="tag">Y2K</span>
        <span class="tag">療癒系</span>
        <span class="tag">設計師款</span>
        <span class="tag">RARE 珠寶</span>
      </div>
    </div>
  </div>

  <!-- PRODUCT SECTION -->
  <div class="section">
    <div class="section-header">
      <h2 class="section-title">本季盲盒</h2>
      <a href="#" class="section-link" onclick="showPage('shop',null)">查看全部 →</a>
    </div>
    <div class="product-grid">
      <div class="product-card">
        <div class="product-img">
          <svg width="90" height="120" viewBox="0 0 90 120" fill="none">
            <rect x="15" y="10" width="60" height="75" rx="1" fill="none" stroke="#CCCCCC" stroke-width="0.6"/>
            <rect x="25" y="20" width="40" height="40" rx="1" fill="#F5F5F5"/>
            <text x="45" y="47" text-anchor="middle" font-size="22" fill="#BBBBBB" font-family="Georgia">?</text>
            <text x="45" y="98" text-anchor="middle" font-size="9" fill="#BBBBBB" font-family="Helvetica Neue, sans-serif" letter-spacing="1">BLIND BOX</text>
          </svg>
          <span class="product-badge">盲盒</span>
          <div class="product-overlay"><button class="overlay-btn" onclick="addToCart('Y2K 金屬系列 Vol.1','HKD $288',288)">加入購物袋</button></div>
        </div>
        <div class="product-info">
          <p class="product-series">Y2K 系列</p>
          <p class="product-name">Y2K 金屬系列 Vol.1</p>
          <p class="product-price">HKD $288</p>
        </div>
      </div>
      <div class="product-card">
        <div class="product-img" style="background:#fafafa;">
          <svg width="90" height="120" viewBox="0 0 90 120" fill="none">
            <circle cx="45" cy="52" r="30" fill="none" stroke="#CCCCCC" stroke-width="0.6"/>
            <circle cx="45" cy="52" r="18" fill="none" stroke="#DDDDDD" stroke-width="0.5"/>
            <circle cx="45" cy="52" r="6" fill="#EEEEEE"/>
            <text x="45" y="98" text-anchor="middle" font-size="9" fill="#BBBBBB" font-family="Helvetica Neue, sans-serif" letter-spacing="1">BLIND BOX</text>
          </svg>
          <span class="product-badge">新品</span>
          <div class="product-overlay"><button class="overlay-btn" onclick="addToCart('療癒星球系列','HKD $198',198)">加入購物袋</button></div>
        </div>
        <div class="product-info">
          <p class="product-series">療癒系</p>
          <p class="product-name">療癒星球系列</p>
          <p class="product-price">HKD $198</p>
        </div>
      </div>
      <div class="product-card">
        <div class="product-img">
          <svg width="90" height="120" viewBox="0 0 90 120" fill="none">
            <polygon points="45,12 60,38 88,38 66,56 74,82 45,65 16,82 24,56 2,38 30,38" fill="none" stroke="#CCCCCC" stroke-width="0.6"/>
            <text x="45" y="105" text-anchor="middle" font-size="9" fill="#BBBBBB" font-family="Helvetica Neue, sans-serif" letter-spacing="1">BLIND BOX</text>
          </svg>
          <div class="product-overlay"><button class="overlay-btn" onclick="addToCart('設計師暗黑系列','HKD $388',388)">加入購物袋</button></div>
        </div>
        <div class="product-info">
          <p class="product-series">設計師款</p>
          <p class="product-name">設計師暗黑系列</p>
          <p class="product-price">HKD $388</p>
        </div>
      </div>
      <div class="product-card">
        <div class="product-img" style="background:#fafafa;">
          <svg width="90" height="120" viewBox="0 0 90 120" fill="none">
            <rect x="22" y="14" width="46" height="68" rx="23" fill="none" stroke="#CCCCCC" stroke-width="0.6"/>
            <rect x="30" y="22" width="30" height="52" rx="15" fill="none" stroke="#DDDDDD" stroke-width="0.5"/>
            <text x="45" y="100" text-anchor="middle" font-size="9" fill="#BBBBBB" font-family="Helvetica Neue, sans-serif" letter-spacing="1">BLIND BOX</text>
          </svg>
          <span class="product-badge">限量</span>
          <div class="product-overlay"><button class="overlay-btn" onclick="addToCart('夢幻泡泡系列','HKD $248',248)">加入購物袋</button></div>
        </div>
        <div class="product-info">
          <p class="product-series">療癒系</p>
          <p class="product-name">夢幻泡泡系列</p>
          <p class="product-price">HKD $248</p>
        </div>
      </div>
    </div>
  </div>

  <!-- BLIND BOX SPLIT -->
  <div class="blind-split">
    <div class="blind-left">
      <h2 class="blind-title">選你的<br><em style="font-family:var(--font-serif);font-style:italic;">驚喜盒</em></h2>
      <p class="blind-desc">每個盲盒都有主題風格，但裡面的飾品是命運安排的。三個價位，三種期待，每次都是全新驚喜。</p>
      <button class="btn btn-dark" onclick="showPage('shop',null)">全部盲盒系列</button>
    </div>
    <div class="blind-right">
      <div class="box-grid">
        <div class="box-item" onclick="addToCart('入門盲盒','HKD $198',198)">
          <span class="box-icon">🎁</span>
          <span class="box-label">入門盲盒</span>
          <span class="box-price">HKD $198</span>
        </div>
        <div class="box-item" onclick="addToCart('標準盲盒','HKD $288',288)">
          <span class="box-icon">💎</span>
          <span class="box-label">標準盲盒</span>
          <span class="box-price">HKD $288</span>
        </div>
        <div class="box-item" onclick="addToCart('豪華盲盒','HKD $488',488)">
          <span class="box-icon">👑</span>
          <span class="box-label">豪華盲盒</span>
          <span class="box-price">HKD $488</span>
        </div>
        <div class="box-item" onclick="addToCart('Y2K 限定盲盒','HKD $328',328)">
          <span class="box-icon">⭐</span>
          <span class="box-label">Y2K 限定</span>
          <span class="box-price">HKD $328</span>
        </div>
        <div class="box-item" onclick="addToCart('暗黑設計師盲盒','HKD $358',358)">
          <span class="box-icon">🌙</span>
          <span class="box-label">暗黑系列</span>
          <span class="box-price">HKD $358</span>
        </div>
        <div class="box-item coming">
          <span class="box-icon">＋</span>
          <span class="box-label">即將上架</span>
        </div>
      </div>
    </div>
  </div>

  <!-- CARD MECHANISM SECTION -->
  <div class="card-section">
    <div class="card-visual">
      <svg width="220" height="160" viewBox="0 0 220 160" fill="none">
        <rect x="20" y="10" width="85" height="130" rx="4" fill="white" stroke="#DDDDDD" stroke-width="0.6"/>
        <rect x="30" y="20" width="65" height="48" rx="2" fill="#F5F5F5"/>
        <text x="62" y="50" text-anchor="middle" font-size="24" fill="#CCCCCC" font-family="Georgia">♦</text>
        <text x="62" y="80" text-anchor="middle" font-size="8" fill="#AAAAAA" font-family="Helvetica Neue" letter-spacing="2">SHOCA</text>
        <text x="62" y="92" text-anchor="middle" font-size="7" fill="#CCCCCC" font-family="Helvetica Neue" letter-spacing="1">LUCKY CARD</text>
        <rect x="36" y="116" width="50" height="12" rx="1" fill="#F5F5F5"/>
        <rect x="115" y="26" width="85" height="130" rx="4" fill="#1a1a1a" stroke="#333" stroke-width="0.6"/>
        <rect x="123" y="34" width="69" height="50" rx="2" fill="#222"/>
        <text x="157" y="64" text-anchor="middle" font-size="24" fill="#555" font-family="Georgia">★</text>
        <text x="157" y="96" text-anchor="middle" font-size="8" fill="#555" font-family="Helvetica Neue" letter-spacing="2">SHOCA</text>
        <text x="157" y="108" text-anchor="middle" font-size="7" fill="#444" font-family="Helvetica Neue" letter-spacing="1">RARE CARD</text>
        <rect x="131" y="130" width="50" height="12" rx="1" fill="#222"/>
      </svg>
    </div>
    <div class="card-content">
      <p class="card-eyebrow">結帳抽卡機制</p>
      <h2 class="card-title">每一單都是<br><em style="font-family:var(--font-serif);font-style:italic;">一次機遇</em></h2>
      <p class="card-desc">完成結帳後自動觸發抽卡，有機率獲得 SHOCA RARE 系列真鑽、翡翠或紅寶石飾品。</p>
      <div class="prob-list">
        <div class="prob-item"><span class="prob-reward">💎 RARE 大獎 — 真鑽珠寶</span><span class="prob-pct">1%</span></div>
        <div class="prob-item"><span class="prob-reward">💍 次獎 — 半寶石設計師款</span><span class="prob-pct">5%</span></div>
        <div class="prob-item"><span class="prob-reward">🎁 加贈一個小盲盒</span><span class="prob-pct">15%</span></div>
        <div class="prob-item"><span class="prob-reward">✨ 下次購物九折優惠券</span><span class="prob-pct">30%</span></div>
        <div class="prob-item"><span class="prob-reward">🃏 精美感謝卡</span><span class="prob-pct">49%</span></div>
      </div>
      <button class="btn btn-dark" onclick="showPage('draw-info',null)">了解更多</button>
    </div>
  </div>

  <footer>
    <div class="footer-grid">
      <div>
        <div class="footer-logo">SHOCA</div>
        <p class="footer-desc">飾品盲盒 × 抽卡驚喜<br>每件都是命中注定<br><br>Open the Unknown</p>
      </div>
      <div>
        <p class="footer-head">購物</p>
        <div class="footer-links">
          <a href="#" class="footer-link" onclick="showPage('shop',null)">盲盒系列</a>
          <a href="#" class="footer-link">Y2K 單品</a>
          <a href="#" class="footer-link">療癒系</a>
          <a href="#" class="footer-link" onclick="showPage('rare',null)">RARE 珠寶</a>
        </div>
      </div>
      <div>
        <p class="footer-head">資訊</p>
        <div class="footer-links">
          <a href="#" class="footer-link" onclick="showPage('draw-info',null)">抽卡規則說明</a>
          <a href="#" class="footer-link">退換貨政策</a>
          <a href="#" class="footer-link">關於 SHOCA</a>
          <a href="#" class="footer-link">聯絡我們</a>
        </div>
      </div>
      <div>
        <p class="footer-head">追蹤我們</p>
        <div class="footer-links">
          <a href="#" class="footer-link">Instagram</a>
          <a href="#" class="footer-link">小紅書</a>
          <a href="#" class="footer-link">TikTok</a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2025 SHOCA. All rights reserved.</span>
      <span>Privacy · Terms · Cookies</span>
    </div>
  </footer>
</div>

<!-- ═══════════════ SHOP PAGE ═══════════════ -->
<div class="page" id="page-shop">
  <div class="section">
    <div class="section-header" style="margin-bottom:24px;">
      <h1 class="section-title" style="font-size:48px;">全部商品</h1>
    </div>
    <div style="display:flex;gap:8px;margin-bottom:40px;flex-wrap:wrap;">
      <button class="tag" style="cursor:pointer;background:#111;color:white;border-color:#111;">全部</button>
      <button class="tag" style="cursor:pointer;">盲盒</button>
      <button class="tag" style="cursor:pointer;">Y2K</button>
      <button class="tag" style="cursor:pointer;">療癒系</button>
      <button class="tag" style="cursor:pointer;">設計師款</button>
    </div>
    <div class="product-grid" style="grid-template-columns:repeat(4,1fr);">
      <div class="product-card">
        <div class="product-img"><svg width="90" height="120" viewBox="0 0 90 120" fill="none"><rect x="15" y="10" width="60" height="75" rx="1" fill="none" stroke="#CCC" stroke-width="0.6"/><rect x="25" y="20" width="40" height="40" rx="1" fill="#F5F5F5"/><text x="45" y="47" text-anchor="middle" font-size="22" fill="#BBBBBB" font-family="Georgia">?</text></svg><span class="product-badge">盲盒</span><div class="product-overlay"><button class="overlay-btn" onclick="addToCart('Y2K 金屬系列 Vol.1','HKD $288',288)">加入購物袋</button></div></div>
        <div class="product-info"><p class="product-series">Y2K 系列</p><p class="product-name">Y2K 金屬系列 Vol.1</p><p class="product-price">HKD $288</p></div>
      </div>
      <div class="product-card">
        <div class="product-img" style="background:#fafafa;"><svg width="90" height="120" viewBox="0 0 90 120" fill="none"><circle cx="45" cy="52" r="30" fill="none" stroke="#CCC" stroke-width="0.6"/><circle cx="45" cy="52" r="18" fill="none" stroke="#DDD" stroke-width="0.5"/><circle cx="45" cy="52" r="6" fill="#EEE"/></svg><span class="product-badge">新品</span><div class="product-overlay"><button class="overlay-btn" onclick="addToCart('療癒星球系列','HKD $198',198)">加入購物袋</button></div></div>
        <div class="product-info"><p class="product-series">療癒系</p><p class="product-name">療癒星球系列</p><p class="product-price">HKD $198</p></div>
      </div>
      <div class="product-card">
        <div class="product-img"><svg width="90" height="120" viewBox="0 0 90 120" fill="none"><polygon points="45,12 60,38 88,38 66,56 74,82 45,65 16,82 24,56 2,38 30,38" fill="none" stroke="#CCC" stroke-width="0.6"/></svg><div class="product-overlay"><button class="overlay-btn" onclick="addToCart('設計師暗黑系列','HKD $388',388)">加入購物袋</button></div></div>
        <div class="product-info"><p class="product-series">設計師款</p><p class="product-name">設計師暗黑系列</p><p class="product-price">HKD $388</p></div>
      </div>
      <div class="product-card">
        <div class="product-img" style="background:#fafafa;"><svg width="90" height="120" viewBox="0 0 90 120" fill="none"><rect x="22" y="14" width="46" height="68" rx="23" fill="none" stroke="#CCC" stroke-width="0.6"/><rect x="30" y="22" width="30" height="52" rx="15" fill="none" stroke="#DDD" stroke-width="0.5"/></svg><span class="product-badge">限量</span><div class="product-overlay"><button class="overlay-btn" onclick="addToCart('夢幻泡泡系列','HKD $248',248)">加入購物袋</button></div></div>
        <div class="product-info"><p class="product-series">療癒系</p><p class="product-name">夢幻泡泡系列</p><p class="product-price">HKD $248</p></div>
      </div>
      <div class="product-card">
        <div class="product-img"><svg width="90" height="120" viewBox="0 0 90 120" fill="none"><rect x="20" y="10" width="50" height="70" rx="2" fill="none" stroke="#CCC" stroke-width="0.6"/><line x1="20" y1="35" x2="70" y2="35" stroke="#DDD" stroke-width="0.4"/><line x1="45" y1="10" x2="45" y2="80" stroke="#DDD" stroke-width="0.4"/></svg><div class="product-overlay"><button class="overlay-btn" onclick="addToCart('暗黑設計師盲盒','HKD $358',358)">加入購物袋</button></div></div>
        <div class="product-info"><p class="product-series">設計師款</p><p class="product-name">暗黑設計師盲盒</p><p class="product-price">HKD $358</p></div>
      </div>
      <div class="product-card">
        <div class="product-img" style="background:#fafafa;"><svg width="90" height="120" viewBox="0 0 90 120" fill="none"><ellipse cx="45" cy="50" rx="28" ry="32" fill="none" stroke="#CCC" stroke-width="0.6"/><ellipse cx="45" cy="50" rx="18" ry="20" fill="none" stroke="#DDD" stroke-width="0.4"/></svg><span class="product-badge">豪華</span><div class="product-overlay"><button class="overlay-btn" onclick="addToCart('豪華盲盒','HKD $488',488)">加入購物袋</button></div></div>
        <div class="product-info"><p class="product-series">豪華系列</p><p class="product-name">豪華盲盒</p><p class="product-price">HKD $488</p></div>
      </div>
      <div class="product-card">
        <div class="product-img"><svg width="90" height="120" viewBox="0 0 90 120" fill="none"><rect x="25" y="12" width="40" height="56" rx="1" fill="none" stroke="#CCC" stroke-width="0.6"/><line x1="25" y1="30" x2="65" y2="30" stroke="#DDD" stroke-width="0.4"/><rect x="32" y="38" width="26" height="22" rx="1" fill="#F5F5F5"/></svg><span class="product-badge">Y2K</span><div class="product-overlay"><button class="overlay-btn" onclick="addToCart('Y2K 限定盲盒','HKD $328',328)">加入購物袋</button></div></div>
        <div class="product-info"><p class="product-series">Y2K 系列</p><p class="product-name">Y2K 限定盲盒</p><p class="product-price">HKD $328</p></div>
      </div>
      <div class="product-card">
        <div class="product-img" style="background:#fafafa;"><svg width="90" height="120" viewBox="0 0 90 120" fill="none"><path d="M45 20 C30 30, 20 45, 20 60 C20 78, 31 90, 45 90 C59 90, 70 78, 70 60 C70 45, 60 30, 45 20Z" fill="none" stroke="#CCC" stroke-width="0.6"/></svg><div class="product-overlay"><button class="overlay-btn" onclick="addToCart('入門盲盒','HKD $198',198)">加入購物袋</button></div></div>
        <div class="product-info"><p class="product-series">入門系列</p><p class="product-name">入門盲盒</p><p class="product-price">HKD $198</p></div>
      </div>
    </div>
  </div>
  <footer style="background:var(--black);color:rgba(255,255,255,0.6);padding:40px 48px;">
    <div class="footer-bottom" style="border:none;padding:0;"><span>© 2025 SHOCA. All rights reserved.</span></div>
  </footer>
</div>

<!-- ═══════════════ RARE PAGE ═══════════════ -->
<div class="page" id="page-rare">
  <div class="rare-hero">
    <p class="rare-eyebrow">SHOCA RARE Collection</p>
    <h1 class="rare-title" style="color:white;">RARE</h1>
    <p class="rare-sub">真鑽、翡翠、紅寶石。每一件都是值得珍藏的作品，也是每次抽卡可能降臨的奇蹟。</p>
    <button class="btn-light">探索全系列</button>
  </div>
  <div style="background:var(--black);padding:48px;">
    <div class="rare-grid">
      <div class="rare-card">
        <div class="rare-img">
          <svg width="100" height="140" viewBox="0 0 100 140" fill="none">
            <polygon points="50,20 70,55 95,55 75,75 82,105 50,88 18,105 25,75 5,55 30,55" fill="none" stroke="#444" stroke-width="0.8"/>
            <polygon points="50,20 70,55 50,50 30,55" fill="none" stroke="#555" stroke-width="0.5"/>
            <text x="50" y="128" text-anchor="middle" font-size="8" fill="#444" font-family="Helvetica Neue" letter-spacing="2">DIAMOND</text>
          </svg>
        </div>
        <div class="rare-info">
          <span class="rare-badge">真鑽</span>
          <p class="rare-name">Diamond Solitaire Ring</p>
          <p class="rare-price">HKD $8,800</p>
        </div>
      </div>
      <div class="rare-card">
        <div class="rare-img">
          <svg width="100" height="140" viewBox="0 0 100 140" fill="none">
            <ellipse cx="50" cy="65" rx="28" ry="32" fill="none" stroke="#444" stroke-width="0.8"/>
            <ellipse cx="50" cy="65" rx="18" ry="20" fill="none" stroke="#555" stroke-width="0.5"/>
            <ellipse cx="50" cy="65" rx="8" ry="9" fill="none" stroke="#444" stroke-width="0.4"/>
            <text x="50" y="115" text-anchor="middle" font-size="8" fill="#444" font-family="Helvetica Neue" letter-spacing="2">EMERALD</text>
          </svg>
        </div>
        <div class="rare-info">
          <span class="rare-badge">A 貨翡翠</span>
          <p class="rare-name">Jade Pendant Necklace</p>
          <p class="rare-price">HKD $12,500</p>
        </div>
      </div>
      <div class="rare-card">
        <div class="rare-img">
          <svg width="100" height="140" viewBox="0 0 100 140" fill="none">
            <rect x="30" y="30" width="40" height="50" rx="20" fill="none" stroke="#444" stroke-width="0.8"/>
            <rect x="38" y="38" width="24" height="34" rx="12" fill="none" stroke="#555" stroke-width="0.5"/>
            <line x1="50" y1="80" x2="50" y2="100" stroke="#444" stroke-width="0.6"/>
            <circle cx="50" cy="108" r="8" fill="none" stroke="#444" stroke-width="0.7"/>
            <text x="50" y="128" text-anchor="middle" font-size="8" fill="#444" font-family="Helvetica Neue" letter-spacing="2">RUBY</text>
          </svg>
        </div>
        <div class="rare-info">
          <span class="rare-badge">紅寶石</span>
          <p class="rare-name">Ruby Drop Earrings</p>
          <p class="rare-price">HKD $6,200</p>
        </div>
      </div>
    </div>
    <div style="text-align:center;padding:48px 0;border-top:0.5px solid rgba(255,255,255,0.06);margin-top:1px;">
      <p style="font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:rgba(255,255,255,0.25);margin-bottom:12px;">RARE 系列同時作為抽卡大獎獎池</p>
      <p style="font-family:var(--font-serif);font-size:28px;font-weight:300;color:rgba(255,255,255,0.5);">每次結帳，1% 機率即是奇蹟</p>
    </div>
  </div>
</div>

<!-- ═══════════════ DRAW INFO PAGE ═══════════════ -->
<div class="page" id="page-draw-info">
  <div class="section" style="max-width:700px;">
    <h1 style="font-family:var(--font-serif);font-size:56px;font-weight:300;margin-bottom:40px;">抽卡機制<br><em style="font-style:italic;">說明</em></h1>
    <p style="font-size:13px;line-height:1.9;color:var(--gray-600);margin-bottom:40px;">每筆訂單完成結帳後，系統將自動觸發一次 SHOCA 抽卡。抽卡結果即時顯示於結帳完成頁面，中獎飾品將隨訂單一同寄出。</p>
    <h2 style="font-size:20px;font-weight:400;margin-bottom:20px;">機率公示</h2>
    <table style="width:100%;border-collapse:collapse;margin-bottom:40px;">
      <thead><tr style="border-bottom:0.5px solid var(--border);">
        <th style="text-align:left;padding:12px 0;font-size:10px;letter-spacing:0.12em;text-transform:uppercase;font-weight:400;color:var(--gray-400);">獎項</th>
        <th style="text-align:left;padding:12px 0;font-size:10px;letter-spacing:0.12em;text-transform:uppercase;font-weight:400;color:var(--gray-400);">獎勵內容</th>
        <th style="text-align:right;padding:12px 0;font-size:10px;letter-spacing:0.12em;text-transform:uppercase;font-weight:400;color:var(--gray-400);">機率</th>
      </tr></thead>
      <tbody>
        <tr style="border-bottom:0.5px solid var(--border);"><td style="padding:14px 0;font-size:13px;">💎 SSR</td><td style="padding:14px 0;font-size:13px;">RARE 大獎 — 真鑽 / 翡翠珠寶</td><td style="text-align:right;padding:14px 0;font-size:13px;">1%</td></tr>
        <tr style="border-bottom:0.5px solid var(--border);"><td style="padding:14px 0;font-size:13px;">🏆 SR+</td><td style="padding:14px 0;font-size:13px;">RARE 次獎 — 半寶石設計師款</td><td style="text-align:right;padding:14px 0;font-size:13px;">5%</td></tr>
        <tr style="border-bottom:0.5px solid var(--border);"><td style="padding:14px 0;font-size:13px;">🎁 SR</td><td style="padding:14px 0;font-size:13px;">加贈一個隨機小盲盒</td><td style="text-align:right;padding:14px 0;font-size:13px;">15%</td></tr>
        <tr style="border-bottom:0.5px solid var(--border);"><td style="padding:14px 0;font-size:13px;">✨ R</td><td style="padding:14px 0;font-size:13px;">下次購物九折優惠券</td><td style="text-align:right;padding:14px 0;font-size:13px;">30%</td></tr>
        <tr><td style="padding:14px 0;font-size:13px;">🃏 N</td><td style="padding:14px 0;font-size:13px;">精美 SHOCA 感謝卡</td><td style="text-align:right;padding:14px 0;font-size:13px;">49%</td></tr>
      </tbody>
    </table>
    <h2 style="font-size:20px;font-weight:400;margin-bottom:16px;">規則細則</h2>
    <ul style="list-style:none;display:flex;flex-direction:column;gap:12px;margin-bottom:40px;">
      <li style="font-size:13px;line-height:1.7;color:var(--gray-600);padding-left:20px;position:relative;"><span style="position:absolute;left:0;">—</span>每筆有效訂單結帳完成後可抽卡一次，無消費門檻限制</li>
      <li style="font-size:13px;line-height:1.7;color:var(--gray-600);padding-left:20px;position:relative;"><span style="position:absolute;left:0;">—</span>RARE 大獎每月設定發出上限，達上限後自動降為次獎</li>
      <li style="font-size:13px;line-height:1.7;color:var(--gray-600);padding-left:20px;position:relative;"><span style="position:absolute;left:0;">—</span>中獎飾品隨訂單一同寄出，無需額外申請</li>
      <li style="font-size:13px;line-height:1.7;color:var(--gray-600);padding-left:20px;position:relative;"><span style="position:absolute;left:0;">—</span>所有抽卡結果均由系統隨機生成，公平公正</li>
      <li style="font-size:13px;line-height:1.7;color:var(--gray-600);padding-left:20px;position:relative;"><span style="position:absolute;left:0;">—</span>得獎名單每月在官網及社群媒體公開公告</li>
    </ul>
    <div style="background:var(--gray-100);padding:32px;border-left:2px solid var(--black);">
      <p style="font-family:var(--font-serif);font-size:24px;font-weight:300;margin-bottom:8px;">想試試你的運氣？</p>
      <p style="font-size:12px;color:var(--gray-600);margin-bottom:20px;">立即選購一個盲盒，結帳後即可抽卡。</p>
      <button class="btn btn-dark" onclick="showPage('shop',null)">前往購物</button>
    </div>
  </div>
</div>

<!-- ═══════════════ CHECKOUT MODAL ═══════════════ -->
<div class="modal-bg" id="checkout-modal">
  <div class="modal">
    <button class="modal-close" onclick="closeCheckout()">✕</button>
    <h2 class="modal-title">結帳</h2>
    <p class="modal-sub">完成結帳後，你將獲得一次抽卡機會。</p>
    <div id="modal-items"></div>
    <div class="modal-total"><span>合計</span><span id="modal-total">HKD $0</span></div>
    <button class="btn btn-dark modal-btn" onclick="triggerDraw()">確認付款 · 抽卡</button>
  </div>
</div>

<!-- ═══════════════ CARD DRAW SCREEN ═══════════════ -->
<div class="draw-screen" id="draw-screen">
  <div class="draw-logo">SHOCA</div>
  <p class="draw-text" id="draw-text">點擊卡片揭曉你的運氣</p>
  <div class="card-wrap">
    <div class="card-3d" id="card-3d" onclick="flipCard()">
      <div class="card-face card-back">
        <div class="card-back-pattern"></div>
        <div class="card-back-logo">S</div>
      </div>
      <div class="card-face card-front" id="card-front">
        <p class="card-front-top">SHOCA LUCKY CARD</p>
        <div class="card-result-icon" id="result-icon">🎁</div>
        <p class="card-result-name" id="result-name">感謝卡</p>
        <p class="card-result-sub" id="result-sub">感謝你的支持</p>
      </div>
    </div>
  </div>
  <p class="draw-hint" id="draw-hint">點擊卡片</p>
  <p class="draw-result-msg" id="draw-result-msg"></p>
  <button class="draw-close" id="draw-close" onclick="closeDraw()">繼續購物</button>
</div>

<script>
  let cart = [];
  let cardFlipped = false;

  const prizes = [
    { chance: 1,  icon: '💎', name: 'RARE 大獎', sub: '真鑽 / 翡翠珠寶', msg: '恭喜！你抽到了 RARE 大獎！' },
    { chance: 5,  icon: '🏆', name: 'RARE 次獎', sub: '半寶石設計師款', msg: '太幸運了！RARE 次獎是你的！' },
    { chance: 15, icon: '🎁', name: '加贈小盲盒', sub: '隨機飾品盲盒一個', msg: '加贈盲盒！驚喜繼續！' },
    { chance: 30, icon: '✨', name: '九折優惠券', sub: '下次購物使用', msg: '九折優惠券已發送至你的帳號！' },
    { chance: 49, icon: '🃏', name: '精美感謝卡', sub: 'SHOCA 限定設計', msg: '感謝你！期待下次再見！' }
  ];

  function showPage(id, el) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page-' + id).classList.add('active');
    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
    if (el) el.classList.add('active');
    window.scrollTo(0, 0);
  }

  function toggleCart() {
    document.getElementById('cart-sidebar').classList.toggle('open');
    document.getElementById('overlay').classList.toggle('open');
  }

  function addToCart(name, price, amount) {
    cart.push({ name, price, amount });
    updateCartUI();
    toggleCart();
  }

  function updateCartUI() {
    const count = cart.length;
    document.getElementById('cart-count').textContent = count;
    const itemsEl = document.getElementById('cart-items');
    const footerEl = document.getElementById('cart-footer');
    if (count === 0) {
      itemsEl.innerHTML = '<div class="cart-empty">購物袋為空</div>';
      footerEl.style.display = 'none';
      return;
    }
    footerEl.style.display = 'block';
    const total = cart.reduce((s, i) => s + i.amount, 0);
    document.getElementById('cart-subtotal').textContent = 'HKD $' + total.toLocaleString();
    itemsEl.innerHTML = cart.map((item, i) => `
      <div class="cart-item">
        <div class="cart-item-img"><svg width="30" height="38" viewBox="0 0 30 38" fill="none"><rect x="4" y="3" width="22" height="28" rx="1" fill="none" stroke="#DDD" stroke-width="0.6"/><text x="15" y="22" text-anchor="middle" font-size="10" fill="#CCC" font-family="Georgia">?</text></svg></div>
        <div class="cart-item-info">
          <p class="cart-item-name">${item.name}</p>
          <p class="cart-item-price">${item.price}</p>
        </div>
      </div>`).join('');
  }

  function openCheckout() {
    const total = cart.reduce((s, i) => s + i.amount, 0);
    document.getElementById('modal-items').innerHTML = cart.map(i => `<div class="modal-item"><span>${i.name}</span><span>${i.price}</span></div>`).join('');
    document.getElementById('modal-total').textContent = 'HKD $' + total.toLocaleString();
    document.getElementById('checkout-modal').classList.add('open');
    document.getElementById('cart-sidebar').classList.remove('open');
    document.getElementById('overlay').classList.remove('open');
  }

  function closeCheckout() {
    document.getElementById('checkout-modal').classList.remove('open');
  }

  function triggerDraw() {
    closeCheckout();
    cart = [];
    updateCartUI();
    cardFlipped = false;
    document.getElementById('card-3d').classList.remove('flipped');
    document.getElementById('draw-result-msg').classList.remove('show');
    document.getElementById('draw-close').classList.remove('show');
    document.getElementById('draw-hint').classList.remove('hidden');
    document.getElementById('draw-text').textContent = '點擊卡片揭曉你的運氣';

    // Pick prize
    const roll = Math.random() * 100;
    let cumulative = 0;
    let prize = prizes[prizes.length - 1];
    for (const p of prizes) {
      cumulative += p.chance;
      if (roll < cumulative) { prize = p; break; }
    }
    document.getElementById('result-icon').textContent = prize.icon;
    document.getElementById('result-name').textContent = prize.name;
    document.getElementById('result-sub').textContent = prize.sub;
    document.getElementById('draw-result-msg').textContent = prize.msg;

    document.getElementById('draw-screen').classList.add('open');
  }

  function flipCard() {
    if (cardFlipped) return;
    cardFlipped = true;
    document.getElementById('card-3d').classList.add('flipped');
    document.getElementById('draw-hint').classList.add('hidden');
    setTimeout(() => {
      document.getElementById('draw-result-msg').classList.add('show');
      document.getElementById('draw-close').classList.add('show');
    }, 1200);
  }

  function closeDraw() {
    document.getElementById('draw-screen').classList.remove('open');
    showPage('home', null);
  }
</script>
</body>
</html>
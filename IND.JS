/* ============================================================
   ALPHA GIRI STORE – script.js
   Vanilla JavaScript | SPA Router | Cart | Filters | Forms
   ============================================================ */

'use strict';

/* ══════════════════════════════════════
   PRODUCT DATA
══════════════════════════════════════ */
const PRODUCTS = [
  { id:1, name:'Royal Leather Wallet', category:'Accessories', price:59.99, original:89.99, emoji:'👜', badge:'Sale', rating:4.8, desc:'Hand-stitched genuine leather wallet with RFID protection. Slim profile with 8 card slots and a billfold section. Perfect everyday carry.', tags:['leather','wallet','accessories'] },
  { id:2, name:'Alpha Chronograph Watch', category:'Watches', price:249.99, original:null, emoji:'⌚', badge:'New', rating:4.9, desc:'Swiss-movement chronograph with sapphire crystal glass, stainless steel case, and genuine leather strap. Water-resistant to 50m.', tags:['watch','luxury','accessories'] },
  { id:3, name:'Premium Wireless Earbuds', category:'Electronics', price:129.99, original:179.99, emoji:'🎧', badge:'Hot', rating:4.7, desc:'Active noise-cancellation, 36-hour battery life, and IPX5 water resistance. Crystal-clear audio with deep bass.', tags:['audio','wireless','electronics'] },
  { id:4, name:'Silk Evening Scarf', category:'Clothing', price:79.99, original:null, emoji:'🧣', badge:null, rating:4.6, desc:'Pure mulberry silk scarf with hand-rolled edges. Luxuriously soft with a lustrous finish. Versatile for any occasion.', tags:['silk','scarf','clothing'] },
  { id:5, name:'Gold-Plated Cufflinks', category:'Accessories', price:45.99, original:70.00, emoji:'✨', badge:'Sale', rating:4.5, desc:'18K gold-plated cufflinks with mother-of-pearl inlay. Comes in a premium gift box. Perfect for formal occasions.', tags:['cufflinks','gold','accessories'] },
  { id:6, name:'Smart Fitness Band', category:'Electronics', price:89.99, original:null, emoji:'⌚', badge:'New', rating:4.8, desc:'Track heart rate, sleep, steps, and 20+ sports modes. 14-day battery life with AMOLED display. Waterproof design.', tags:['fitness','smart','electronics'] },
  { id:7, name:'Cashmere Blazer', category:'Clothing', price:299.99, original:450.00, emoji:'🧥', badge:'Sale', rating:4.9, desc:'100% pure Mongolian cashmere blazer. Tailored fit with notched lapels. Dry clean only. Available in charcoal and navy.', tags:['cashmere','blazer','clothing'] },
  { id:8, name:'Fragrance Gift Set', category:'Beauty', price:95.00, original:null, emoji:'🌸', badge:null, rating:4.7, desc:'Curated set of three designer-inspired fragrances. Includes 50ml EDP bottles with a premium storage box.', tags:['fragrance','gift','beauty'] },
  { id:9, name:'Titanium Sunglasses', category:'Accessories', price:185.00, original:220.00, emoji:'🕶️', badge:'Sale', rating:4.6, desc:'Ultra-lightweight titanium frame with polarized UV400 lenses. Scratch-resistant coating and flexible temple arms.', tags:['sunglasses','titanium','accessories'] },
  { id:10, name:'Organic Face Serum', category:'Beauty', price:65.00, original:null, emoji:'💧', badge:'New', rating:4.8, desc:'Cold-pressed vitamin C and retinol serum with hyaluronic acid. Clinically tested for visible results in 4 weeks.', tags:['skincare','organic','beauty'] },
  { id:11, name:'Leather Oxford Shoes', category:'Footwear', price:189.99, original:260.00, emoji:'👞', badge:'Sale', rating:4.7, desc:'Full-grain calf leather with Goodyear welt construction. Leather sole with rubber heel tip. True to size.', tags:['shoes','leather','footwear'] },
  { id:12, name:'Ceramic Desk Organizer', category:'Home', price:39.99, original:null, emoji:'🏺', badge:null, rating:4.4, desc:'Minimalist ceramic organizer with five compartments. Matte finish with a weighted base. Perfect for modern desks.', tags:['ceramic','home','organizer'] },
  { id:13, name:'Merino Wool Sweater', category:'Clothing', price:119.99, original:160.00, emoji:'🧶', badge:'Sale', rating:4.8, desc:'Superfine 18.5 micron merino wool crewneck. Machine washable, anti-pilling. Incredibly soft and temperature-regulating.', tags:['merino','sweater','clothing'] },
  { id:14, name:'Smart Backpack', category:'Accessories', price:149.99, original:null, emoji:'🎒', badge:'New', rating:4.9, desc:'Anti-theft design with USB charging port and hidden pockets. Waterproof 1680D nylon. Fits laptops up to 17 inches.', tags:['backpack','smart','accessories'] },
  { id:15, name:'Noise-Cancelling Headphones', category:'Electronics', price:349.99, original:429.99, emoji:'🎵', badge:'Hot', rating:4.9, desc:'Industry-leading 30-hour ANC performance. Hi-Res Audio certified with multipoint Bluetooth 5.2. Foldable design.', tags:['headphones','audio','electronics'] },
  { id:16, name:'Crystal Desk Lamp', category:'Home', price:75.00, original:null, emoji:'💡', badge:null, rating:4.5, desc:'Adjustable color temperature (2700K–6500K) and brightness. Touch dimmer, USB-C charging port on base. Energy-efficient LED.', tags:['lamp','home','lighting'] },
];

const CATEGORIES = [
  { name:'Accessories', icon:'💼' },
  { name:'Watches', icon:'⌚' },
  { name:'Electronics', icon:'📱' },
  { name:'Clothing', icon:'👗' },
  { name:'Beauty', icon:'💄' },
  { name:'Footwear', icon:'👟' },
  { name:'Home', icon:'🏠' },
];

/* ══════════════════════════════════════
   STATE
══════════════════════════════════════ */
let state = {
  currentPage: 'home',
  cart: [],
  filter: { category: 'All', maxPrice: 500, sort: 'default', search: '' },
  detailId: null,
  theme: 'dark',
};

/* ══════════════════════════════════════
   INIT
══════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  loadStateFromStorage();
  initLoader();
  initNavbar();
  initTheme();
  initSlider();
  initScrollTop();
  initRouter();
  updateCartCount();
  animateStats();
});

/* ══════════════════════════════════════
   LOADER
══════════════════════════════════════ */
function initLoader() {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('hidden');
    setTimeout(() => loader.remove(), 500);
  }, 1800);
}

/* ══════════════════════════════════════
   LOCAL STORAGE
══════════════════════════════════════ */
function saveStateToStorage() {
  localStorage.setItem('ags_cart', JSON.stringify(state.cart));
  localStorage.setItem('ags_theme', state.theme);
}

function loadStateFromStorage() {
  const cart = localStorage.getItem('ags_cart');
  const theme = localStorage.getItem('ags_theme');
  if (cart) state.cart = JSON.parse(cart);
  if (theme) state.theme = theme;
}

/* ══════════════════════════════════════
   THEME
══════════════════════════════════════ */
function initTheme() {
  document.documentElement.setAttribute('data-theme', state.theme);
  updateThemeIcon();
  document.getElementById('themeToggle').addEventListener('click', toggleTheme);
}

function toggleTheme() {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', state.theme);
  updateThemeIcon();
  saveStateToStorage();
}

function updateThemeIcon() {
  const icon = document.querySelector('.theme-icon');
  if (icon) icon.textContent = state.theme === 'dark' ? '☀' : '🌙';
}

/* ══════════════════════════════════════
   NAVBAR
══════════════════════════════════════ */
function initNavbar() {
  // Scroll effect
  window.addEventListener('scroll', () => {
    const nb = document.getElementById('navbar');
    nb.classList.toggle('scrolled', window.scrollY > 30);
    document.getElementById('scrollTop').classList.toggle('visible', window.scrollY > 300);
  });

  // Hamburger
  const ham = document.getElementById('hamburger');
  const links = document.getElementById('navLinks');
  ham.addEventListener('click', () => {
    links.classList.toggle('open');
    ham.classList.toggle('open');
  });

  // All nav links & buttons with data-page
  document.addEventListener('click', e => {
    const target = e.target.closest('[data-page]');
    if (target) {
      e.preventDefault();
      navigateTo(target.dataset.page);
      links.classList.remove('open');
      ham.classList.remove('open');
    }
  });
}

/* ══════════════════════════════════════
   ROUTER / SPA
══════════════════════════════════════ */
function initRouter() {
  navigateTo('home');
}

function navigateTo(page) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

  // Update nav links
  document.querySelectorAll('.nav-link').forEach(l => {
    l.classList.toggle('active', l.dataset.page === page);
  });

  state.currentPage = page;

  const el = document.getElementById(`page-${page}`);
  if (el) {
    el.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Render specific pages
  switch (page) {
    case 'home':      renderHome();     break;
    case 'products':  renderProducts(); break;
    case 'cart':      renderCart();     break;
    case 'checkout':  renderCheckout(); break;
    case 'about':                       break; // static
    case 'contact':   initContactForm();break;
    case 'detail':    renderDetail();   break;
    case 'success':                     break;
  }
}

/* ══════════════════════════════════════
   HOME PAGE
══════════════════════════════════════ */
function renderHome() {
  renderCategories();
  renderFeatured();
}

function renderCategories() {
  const grid = document.getElementById('categoryGrid');
  if (!grid) return;
  grid.innerHTML = CATEGORIES.map(c => `
    <div class="cat-card" data-cat="${c.name}">
      <div class="cat-icon">${c.icon}</div>
      <div class="cat-name">${c.name}</div>
    </div>
  `).join('');

  grid.querySelectorAll('.cat-card').forEach(card => {
    card.addEventListener('click', () => {
      state.filter.category = card.dataset.cat;
      navigateTo('products');
    });
  });
}

function renderFeatured() {
  const grid = document.getElementById('featuredGrid');
  if (!grid) return;
  const featured = PRODUCTS.filter(p => p.badge).slice(0, 8);
  grid.innerHTML = featured.map(p => productCardHTML(p)).join('');
  attachProductEvents(grid);
}

function productCardHTML(p) {
  return `
    <div class="product-card" data-id="${p.id}">
      ${p.badge ? `<div class="product-badge">${p.badge}</div>` : ''}
      <div class="product-img-wrap">${p.emoji}</div>
      <div class="product-body">
        <div class="product-cat">${p.category}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-footer">
          <div class="product-price">
            ${p.original ? `<span class="original">$${p.original.toFixed(2)}</span>` : ''}
            $${p.price.toFixed(2)}
          </div>
          <button class="add-to-cart-btn" data-add="${p.id}">+ Cart</button>
        </div>
      </div>
    </div>
  `;
}

function attachProductEvents(container) {
  // View detail on card click
  container.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', e => {
      if (e.target.closest('[data-add]')) return;
      state.detailId = parseInt(card.dataset.id);
      navigateTo('detail');
    });
  });

  // Add to cart
  container.querySelectorAll('[data-add]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      addToCart(parseInt(btn.dataset.add));
    });
  });
}

/* ══════════════════════════════════════
   STATS COUNTER ANIMATION
══════════════════════════════════════ */
function animateStats() {
  const stats = [
    { el: 'stat1', end: 500, suffix: '+' },
    { el: 'stat2', end: 50000, suffix: '+' },
    { el: 'stat3', end: 120, suffix: '+' },
    { el: 'stat4', end: 50, suffix: '+' },
  ];

  stats.forEach(s => {
    const el = document.getElementById(s.el);
    if (!el) return;
    let start = 0;
    const duration = 2000;
    const step = s.end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= s.end) {
        el.textContent = s.end.toLocaleString() + s.suffix;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(start).toLocaleString() + s.suffix;
      }
    }, 16);
  });
}

/* ══════════════════════════════════════
   HERO SLIDER
══════════════════════════════════════ */
function initSlider() {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  let current = 0;
  let timer;

  function goTo(idx) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function startAuto() {
    timer = setInterval(() => goTo(current + 1), 5000);
  }

  function resetAuto() {
    clearInterval(timer);
    startAuto();
  }

  document.getElementById('sliderPrev')?.addEventListener('click', () => { goTo(current - 1); resetAuto(); });
  document.getElementById('sliderNext')?.addEventListener('click', () => { goTo(current + 1); resetAuto(); });

  dots.forEach(dot => {
    dot.addEventListener('click', () => { goTo(parseInt(dot.dataset.idx)); resetAuto(); });
  });

  startAuto();
}

/* ══════════════════════════════════════
   SCROLL TO TOP
══════════════════════════════════════ */
function initScrollTop() {
  document.getElementById('scrollTop')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ══════════════════════════════════════
   PRODUCTS PAGE
══════════════════════════════════════ */
function renderProducts() {
  renderCategoryFilters();
  bindFilterControls();
  applyFilters();
}

function renderCategoryFilters() {
  const container = document.getElementById('categoryFilter');
  if (!container) return;
  const cats = ['All', ...CATEGORIES.map(c => c.name)];
  container.innerHTML = cats.map(cat => `
    <label class="filter-opt">
      <input type="radio" name="catFilter" value="${cat}" ${state.filter.category === cat ? 'checked' : ''} />
      ${cat}
    </label>
  `).join('');

  container.querySelectorAll('input[name="catFilter"]').forEach(r => {
    r.addEventListener('change', () => {
      state.filter.category = r.value;
      applyFilters();
    });
  });
}

function bindFilterControls() {
  const search = document.getElementById('searchInput');
  const price = document.getElementById('priceRange');
  const sort = document.getElementById('sortSelect');
  const clear = document.getElementById('clearFilter');

  if (search) {
    search.value = state.filter.search;
    search.addEventListener('input', () => {
      state.filter.search = search.value;
      applyFilters();
    });
  }

  if (price) {
    price.value = state.filter.maxPrice;
    document.getElementById('priceVal').textContent = state.filter.maxPrice;
    price.addEventListener('input', () => {
      state.filter.maxPrice = parseInt(price.value);
      document.getElementById('priceVal').textContent = price.value;
      applyFilters();
    });
  }

  if (sort) {
    sort.value = state.filter.sort;
    sort.addEventListener('change', () => {
      state.filter.sort = sort.value;
      applyFilters();
    });
  }

  if (clear) {
    clear.addEventListener('click', () => {
      state.filter = { category: 'All', maxPrice: 500, sort: 'default', search: '' };
      renderCategoryFilters();
      if (search) search.value = '';
      if (price) { price.value = 500; document.getElementById('priceVal').textContent = 500; }
      if (sort) sort.value = 'default';
      applyFilters();
    });
  }
}

function applyFilters() {
  let filtered = [...PRODUCTS];

  // Category
  if (state.filter.category !== 'All') {
    filtered = filtered.filter(p => p.category === state.filter.category);
  }

  // Price
  filtered = filtered.filter(p => p.price <= state.filter.maxPrice);

  // Search
  if (state.filter.search.trim()) {
    const q = state.filter.search.toLowerCase();
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      (p.tags && p.tags.some(t => t.includes(q)))
    );
  }

  // Sort
  switch (state.filter.sort) {
    case 'price-asc':  filtered.sort((a,b) => a.price - b.price); break;
    case 'price-desc': filtered.sort((a,b) => b.price - a.price); break;
    case 'name-asc':   filtered.sort((a,b) => a.name.localeCompare(b.name)); break;
  }

  renderProductsList(filtered);
}

function renderProductsList(products) {
  const grid = document.getElementById('productsGrid');
  const noResults = document.getElementById('noResults');
  const info = document.getElementById('resultsInfo');

  if (!grid) return;

  if (products.length === 0) {
    grid.innerHTML = '';
    noResults.style.display = 'block';
    info.textContent = '';
  } else {
    noResults.style.display = 'none';
    info.textContent = `Showing ${products.length} product${products.length !== 1 ? 's' : ''}`;
    grid.innerHTML = products.map(p => productCardHTML(p)).join('');
    attachProductEvents(grid);
  }
}

/* ══════════════════════════════════════
   PRODUCT DETAIL PAGE
══════════════════════════════════════ */
function renderDetail() {
  const product = PRODUCTS.find(p => p.id === state.detailId);
  if (!product) { navigateTo('products'); return; }

  document.getElementById('detailBreadcrumb').textContent = product.name;

  const stars = '★'.repeat(Math.round(product.rating)) + '☆'.repeat(5 - Math.round(product.rating));

  document.getElementById('detailLayout').innerHTML = `
    <div class="detail-img-wrap">${product.emoji}</div>
    <div class="detail-body">
      <div class="detail-cat">${product.category}</div>
      <h1 class="detail-name">${product.name}</h1>
      <div class="detail-rating">${stars} ${product.rating} / 5.0</div>
      <div class="detail-price">
        $${product.price.toFixed(2)}
        ${product.original ? `<span class="old-price">$${product.original.toFixed(2)}</span>` : ''}
      </div>
      <div class="detail-desc">${product.desc}</div>
      <div class="detail-qty">
        <label>Quantity:</label>
        <div class="qty-control">
          <button class="qty-btn" id="qtyMinus">−</button>
          <span class="qty-val" id="qtyVal">1</span>
          <button class="qty-btn" id="qtyPlus">+</button>
        </div>
      </div>
      <div class="detail-actions">
        <button class="btn-gold" id="detailAddCart">Add to Cart</button>
        <button class="btn-outline" data-page="products">← Back</button>
      </div>
    </div>
  `;

  // Quantity controls
  let qty = 1;
  document.getElementById('qtyMinus').addEventListener('click', () => {
    if (qty > 1) { qty--; document.getElementById('qtyVal').textContent = qty; }
  });
  document.getElementById('qtyPlus').addEventListener('click', () => {
    qty++;
    document.getElementById('qtyVal').textContent = qty;
  });

  document.getElementById('detailAddCart').addEventListener('click', () => {
    for (let i = 0; i < qty; i++) addToCart(product.id);
  });

  // Related products
  const related = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const relGrid = document.getElementById('relatedGrid');
  if (relGrid) {
    relGrid.innerHTML = related.map(p => productCardHTML(p)).join('');
    attachProductEvents(relGrid);
  }
}

/* ══════════════════════════════════════
   CART
══════════════════════════════════════ */
function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existing = state.cart.find(i => i.id === productId);
  if (existing) {
    existing.qty++;
  } else {
    state.cart.push({ id: productId, qty: 1 });
  }

  updateCartCount();
  saveStateToStorage();
  showToast(`"${product.name}" added to cart!`);
}

function removeFromCart(productId) {
  state.cart = state.cart.filter(i => i.id !== productId);
  updateCartCount();
  saveStateToStorage();
  renderCart();
}

function updateCartItemQty(productId, delta) {
  const item = state.cart.find(i => i.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(productId);
  else {
    updateCartCount();
    saveStateToStorage();
    renderCart();
  }
}

function updateCartCount() {
  const total = state.cart.reduce((s, i) => s + i.qty, 0);
  const el = document.getElementById('cartCount');
  if (el) {
    el.textContent = total;
    el.classList.add('bounce');
    setTimeout(() => el.classList.remove('bounce'), 300);
  }
}

function getCartTotal() {
  return state.cart.reduce((s, i) => {
    const p = PRODUCTS.find(p => p.id === i.id);
    return s + (p ? p.price * i.qty : 0);
  }, 0);
}

function renderCart() {
  const itemsEl = document.getElementById('cartItems');
  const summaryEl = document.getElementById('cartSummary');
  if (!itemsEl || !summaryEl) return;

  if (state.cart.length === 0) {
    itemsEl.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">🛒</div>
        <h3>Your cart is empty</h3>
        <p>Looks like you haven't added anything yet.</p>
        <button class="btn-gold" data-page="products">Start Shopping</button>
      </div>
    `;
    summaryEl.innerHTML = '';
    return;
  }

  itemsEl.innerHTML = state.cart.map(item => {
    const p = PRODUCTS.find(p => p.id === item.id);
    if (!p) return '';
    return `
      <div class="cart-item">
        <div class="ci-img">${p.emoji}</div>
        <div class="ci-info">
          <div class="ci-cat">${p.category}</div>
          <div class="ci-name">${p.name}</div>
          <div class="ci-price">$${(p.price * item.qty).toFixed(2)}</div>
        </div>
        <div class="ci-actions">
          <div class="qty-control">
            <button class="qty-btn" data-qty="${p.id}" data-delta="-1">−</button>
            <span class="qty-val">${item.qty}</span>
            <button class="qty-btn" data-qty="${p.id}" data-delta="1">+</button>
          </div>
          <button class="ci-remove" data-remove="${p.id}">✕ Remove</button>
        </div>
      </div>
    `;
  }).join('');

  // Bind qty and remove buttons
  itemsEl.querySelectorAll('[data-qty]').forEach(btn => {
    btn.addEventListener('click', () => updateCartItemQty(parseInt(btn.dataset.qty), parseInt(btn.dataset.delta)));
  });

  itemsEl.querySelectorAll('[data-remove]').forEach(btn => {
    btn.addEventListener('click', () => removeFromCart(parseInt(btn.dataset.remove)));
  });

  const subtotal = getCartTotal();
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  summaryEl.innerHTML = `
    <div class="cs-title">Order Summary</div>
    <div class="cs-row"><span>Subtotal</span><span>$${subtotal.toFixed(2)}</span></div>
    <div class="cs-row"><span>Shipping</span><span>${shipping === 0 ? '<em>FREE</em>' : '$' + shipping.toFixed(2)}</span></div>
    <div class="cs-row"><span>Tax (8%)</span><span>$${tax.toFixed(2)}</span></div>
    <div class="cs-row total"><span>Total</span><span>$${total.toFixed(2)}</span></div>
    <div class="coupon-row">
      <input type="text" id="couponInput" placeholder="Coupon code" />
      <button class="btn-outline" id="applyCoupon">Apply</button>
    </div>
    <div class="cs-actions">
      <button class="btn-gold btn-full" data-page="checkout">Proceed to Checkout</button>
      <button class="btn-outline btn-full" data-page="products">Continue Shopping</button>
    </div>
  `;

  document.getElementById('applyCoupon')?.addEventListener('click', () => {
    const val = document.getElementById('couponInput').value.trim().toUpperCase();
    showToast(val === 'ALPHA20' ? '🎉 20% discount applied!' : 'Invalid coupon code.');
  });
}

/* ══════════════════════════════════════
   CHECKOUT PAGE
══════════════════════════════════════ */
function renderCheckout() {
  // Render summary
  const sumEl = document.getElementById('checkoutSummary');
  if (!sumEl) return;

  const subtotal = getCartTotal();
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  sumEl.innerHTML = `
    <div class="cs-title">Order Summary</div>
    ${state.cart.map(item => {
      const p = PRODUCTS.find(p => p.id === item.id);
      return p ? `<div class="cs-row"><span>${p.emoji} ${p.name} ×${item.qty}</span><span>$${(p.price * item.qty).toFixed(2)}</span></div>` : '';
    }).join('')}
    <div class="cs-row"><span>Shipping</span><span>${shipping === 0 ? 'FREE' : '$' + shipping.toFixed(2)}</span></div>
    <div class="cs-row"><span>Tax</span><span>$${tax.toFixed(2)}</span></div>
    <div class="cs-row total"><span>Total</span><span>$${total.toFixed(2)}</span></div>
  `;

  // Payment radio toggle
  document.querySelectorAll('input[name="payment"]').forEach(r => {
    r.addEventListener('change', () => {
      const cardFields = document.getElementById('cardFields');
      if (cardFields) cardFields.style.display = r.value === 'card' ? 'block' : 'none';
    });
  });

  // Card number formatting
  const cardInput = document.getElementById('cfCard');
  if (cardInput) {
    cardInput.addEventListener('input', () => {
      let v = cardInput.value.replace(/\D/g, '').substring(0, 16);
      cardInput.value = v.replace(/(.{4})/g, '$1 ').trim();
    });
  }

  // Expiry formatting
  const expiryInput = document.getElementById('cfExpiry');
  if (expiryInput) {
    expiryInput.addEventListener('input', () => {
      let v = expiryInput.value.replace(/\D/g, '').substring(0, 4);
      if (v.length >= 2) v = v.slice(0, 2) + '/' + v.slice(2);
      expiryInput.value = v;
    });
  }

  // Form submission
  const form = document.getElementById('checkoutForm');
  if (form && !form._bound) {
    form._bound = true;
    form.addEventListener('submit', handleCheckout);
  }
}

function handleCheckout(e) {
  e.preventDefault();
  if (!validateCheckout()) return;

  // Simulate success
  state.cart = [];
  updateCartCount();
  saveStateToStorage();

  const orderId = 'AGS-' + Math.random().toString(36).substr(2, 8).toUpperCase();
  document.getElementById('orderId').textContent = `Order ID: ${orderId}`;
  navigateTo('success');
}

function validateCheckout() {
  let valid = true;

  const fields = [
    { id: 'cfFirstName', err: 'errFirstName', msg: 'First name is required', min: 2 },
    { id: 'cfLastName',  err: 'errLastName',  msg: 'Last name is required',  min: 2 },
    { id: 'cfEmail',     err: 'errEmail',     msg: 'Valid email is required', type: 'email' },
    { id: 'cfPhone',     err: 'errPhone',     msg: 'Phone number is required', min: 7 },
    { id: 'cfAddress',   err: 'errAddress',   msg: 'Address is required', min: 5 },
    { id: 'cfCity',      err: 'errCity',      msg: 'City is required', min: 2 },
    { id: 'cfZip',       err: 'errZip',       msg: 'ZIP code is required', min: 3 },
  ];

  fields.forEach(f => {
    const el = document.getElementById(f.id);
    const errEl = document.getElementById(f.err);
    if (!el || !errEl) return;
    const val = el.value.trim();

    let err = '';
    if (!val || val.length < (f.min || 1)) {
      err = f.msg;
    } else if (f.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      err = 'Please enter a valid email';
    }

    errEl.textContent = err;
    el.style.borderColor = err ? 'var(--danger)' : '';
    if (err) valid = false;
  });

  // Country
  const country = document.getElementById('cfCountry');
  const errCountry = document.getElementById('errCountry');
  if (country && errCountry) {
    if (!country.value) {
      errCountry.textContent = 'Please select a country';
      valid = false;
    } else {
      errCountry.textContent = '';
    }
  }

  // Card fields if card payment selected
  const payment = document.querySelector('input[name="payment"]:checked')?.value;
  if (payment === 'card') {
    const card = document.getElementById('cfCard');
    const errCard = document.getElementById('errCard');
    const expiry = document.getElementById('cfExpiry');
    const errExpiry = document.getElementById('errExpiry');
    const cvv = document.getElementById('cfCvv');
    const errCvv = document.getElementById('errCvv');

    if (card && errCard) {
      const rawCard = card.value.replace(/\s/g, '');
      if (rawCard.length < 16) { errCard.textContent = 'Enter a valid 16-digit card number'; valid = false; }
      else errCard.textContent = '';
    }
    if (expiry && errExpiry) {
      if (!/^\d{2}\/\d{2}$/.test(expiry.value)) { errExpiry.textContent = 'Use MM/YY format'; valid = false; }
      else errExpiry.textContent = '';
    }
    if (cvv && errCvv) {
      if (cvv.value.length < 3) { errCvv.textContent = 'CVV must be 3 digits'; valid = false; }
      else errCvv.textContent = '';
    }
  }

  return valid;
}

/* ══════════════════════════════════════
   CONTACT FORM
══════════════════════════════════════ */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form || form._bound) return;
  form._bound = true;

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!validateContact()) return;
    form.reset();
    showToast('✅ Message sent! We\'ll be in touch soon.');
  });
}

function validateContact() {
  let valid = true;

  const fields = [
    { id: 'ctName',    err: 'errCtName',    msg: 'Name is required', min: 2 },
    { id: 'ctEmail',   err: 'errCtEmail',   msg: 'Valid email is required', type: 'email' },
    { id: 'ctSubject', err: 'errCtSubject', msg: 'Subject is required', min: 3 },
    { id: 'ctMessage', err: 'errCtMsg',     msg: 'Message is required', min: 10 },
  ];

  fields.forEach(f => {
    const el = document.getElementById(f.id);
    const errEl = document.getElementById(f.err);
    if (!el || !errEl) return;
    const val = el.value.trim();

    let err = '';
    if (!val || val.length < (f.min || 1)) {
      err = f.msg;
    } else if (f.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      err = 'Please enter a valid email';
    }

    errEl.textContent = err;
    el.style.borderColor = err ? 'var(--danger)' : '';
    if (err) valid = false;
  });

  return valid;
}

/* ══════════════════════════════════════
   TOAST NOTIFICATION
══════════════════════════════════════ */
let toastTimer;
function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}
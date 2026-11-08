const CART_KEY = 'theSwampiesCart';

const config = window.siteConfig;

const state = {
  activeCategory: 'all',
  activeRule: config.rules[0]?.category || 'Algemeen'
};

document.addEventListener('DOMContentLoaded', () => {
  initBranding();
  initNavigation();
  renderCategoryButtons();
  renderProducts();
  renderCart();
  renderRules();
  renderTeam();
  refreshAllServers();
  bindCopyButtons();
  bindRefreshButtons();
  bindCartActions();
  bindRuleTabs();
});

function initBranding() {
  const subtitle = document.getElementById('brand-subtitle');
  if (subtitle) {
    subtitle.textContent = config.branding.subtitle;
  }
}

function initNavigation() {
  const navToggle = document.querySelector('.nav-toggle');
  const navShell = document.querySelector('.nav-shell');

  navToggle?.addEventListener('click', () => {
    const isOpen = navShell.classList.toggle('nav-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  document.querySelectorAll('.main-nav a').forEach((link) => {
    link.addEventListener('click', () => {
      navShell.classList.remove('nav-open');
      navToggle?.setAttribute('aria-expanded', 'false');
    });
  });
}

function renderCategoryButtons() {
  const container = document.getElementById('category-buttons');
  if (!container) return;

  container.innerHTML = config.shop.categories
    .map((category) => {
      const label = category === 'all' ? 'Alles' : config.shop.labels[category] || category;
      return `
        <button
          class="category-button ${state.activeCategory === category ? 'is-active' : ''}"
          type="button"
          data-category="${category}"
        >
          ${label}
        </button>
      `;
    })
    .join('');

  container.querySelectorAll('.category-button').forEach((button) => {
    button.addEventListener('click', () => {
      state.activeCategory = button.dataset.category;
      renderCategoryButtons();
      renderProducts();
    });
  });
}

function renderProducts() {
  const grid = document.getElementById('product-grid');
  if (!grid) return;

  const filteredProducts =
    state.activeCategory === 'all'
      ? config.shop.products
      : config.shop.products.filter((product) => product.category === state.activeCategory);

  grid.innerHTML = filteredProducts
    .map(
      (product) => `
        <article class="product-card ${['gold', 'diamond', 'emerald', 'netherite'].includes(product.id) ? 'product-card-rank-featured' : ''}">
          <img src="${product.image}" alt="${product.name}" loading="lazy" />
          <div class="product-card-body">
            <span class="product-tag">${product.badge}</span>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="product-meta">
              <span class="product-price">${formatPrice(product)}</span>
              <button class="add-cart" type="button" data-product-id="${product.id}">Toevoegen</button>
            </div>
          </div>
        </article>
      `
    )
    .join('');

  bindAddToCartButtons();
}

function bindAddToCartButtons() {
  document.querySelectorAll('.add-cart').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      addToCart(productId);
    });
  });
}

function addToCart(productId) {
  const cart = getCart();
  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cart.push({ id: productId, qty: 1 });
  }

  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  renderCart();
}

function renderCart() {
  const cartItemsContainer = document.getElementById('cart-items');
  const totalElement = document.getElementById('cart-total');

  const cart = getCart();

  if (!cartItemsContainer || !totalElement) return;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p class="empty-state">Je winkelmandje is nog leeg.</p>';
    totalElement.textContent = '€0,00';
    return;
  }

  const cartTotal = cart.reduce((sum, item) => {
    const product = findProductById(item.id);
    const price = Number(product?.price ?? 0);
    return sum + price * item.qty;
  }, 0);

  totalElement.textContent = formatCurrency(cartTotal);

  cartItemsContainer.innerHTML = cart
    .map((item) => {
      const product = findProductById(item.id);
      if (!product) return '';

      return `
        <div class="cart-item">
          <div class="cart-item-name">
            <strong>${product.name}</strong>
            <span>${formatPrice(product)}</span>
          </div>

          <div class="cart-actions">
            <button class="cart-step" type="button" data-action="decrease" data-product-id="${product.id}">-</button>
            <span>${item.qty}</span>
            <button class="cart-step" type="button" data-action="increase" data-product-id="${product.id}">+</button>
          </div>
        </div>
      `;
    })
    .join('');

  document.getElementById('clear-cart')?.addEventListener('click', clearCart);
  document.querySelectorAll('.cart-step').forEach((button) => {
    button.addEventListener('click', () => {
      const { action, productId } = button.dataset;
      updateCartItem(productId, action === 'increase' ? 1 : -1);
    });
  });
}

function bindCartActions() {
  document.getElementById('clear-cart')?.addEventListener('click', clearCart);
}

function updateCartItem(productId, change) {
  const cart = getCart();
  const item = cart.find((entry) => entry.id === productId);
  if (!item) return;

  item.qty += change;

  if (item.qty <= 0) {
    const filtered = cart.filter((entry) => entry.id !== productId);
    localStorage.setItem(CART_KEY, JSON.stringify(filtered));
    renderCart();
    return;
  }

  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  renderCart();
}

function clearCart() {
  localStorage.setItem(CART_KEY, JSON.stringify([]));
  renderCart();
}

function getCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    return [];
  }
}

function findProductById(productId) {
  return config.shop.products.find((product) => product.id === productId) || null;
}

function formatPrice(product) {
  if (product.price !== null && product.price !== undefined && Number(product.price) > 0) {
    return formatCurrency(Number(product.price));
  }

  return product.priceLabel || `${product.amount || 0} KikkerCoins`;
}

function formatCurrency(value) {
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR'
  }).format(value);
}

function renderRules() {
  const tabsContainer = document.getElementById('rules-tabs');
  const content = document.getElementById('rules-content');
  if (!tabsContainer || !content) return;

  tabsContainer.innerHTML = config.rules
    .map(
      (ruleGroup) => `
        <button
          class="rule-tab ${state.activeRule === ruleGroup.category ? 'is-active' : ''}"
          type="button"
          data-rule-category="${ruleGroup.category}"
        >
          ${ruleGroup.category}
        </button>
      `
    )
    .join('');

  const activeRule = config.rules.find((ruleGroup) => ruleGroup.category === state.activeRule) || config.rules[0];

  content.innerHTML = `
    <h3>${activeRule.category}</h3>
    <ul class="rules-list">
      ${activeRule.items.map((item) => `<li>${item}</li>`).join('')}
    </ul>
  `;

  tabsContainer.querySelectorAll('.rule-tab').forEach((button) => {
    button.addEventListener('click', () => {
      state.activeRule = button.dataset.ruleCategory;
      renderRules();
    });
  });
}

function bindRuleTabs() {
  document.querySelectorAll('.rule-tab').forEach((button) => {
    button.addEventListener('click', () => {
      state.activeRule = button.dataset.ruleCategory;
      renderRules();
    });
  });
}

function renderTeam() {
  const teamGrid = document.getElementById('team-grid');
  if (!teamGrid) return;

  teamGrid.innerHTML = config.team
    .map(
      (member) => `
        <article class="team-card">
          <div class="member-head">
            <img src="${member.image}" alt="${member.name}" loading="lazy" />
          </div>
          <div class="member-body">
            <span class="member-tag" style="border-color:${member.color}; color:${member.color};">${member.role}</span>
            <h3>${member.name}</h3>
            <p>${member.role}</p>
          </div>
        </article>
      `
    )
    .join('');
}

function bindCopyButtons() {
  document.querySelectorAll('.copy-btn').forEach((button) => {
    button.addEventListener('click', async () => {
      const target = button.dataset.copyTarget;
      const server = config.server[target];
      if (!server) return;

      const fullAddress = `${server.host}:${server.port}${target === 'bedrock' ? ' UDP' : ''}`;

      try {
        await navigator.clipboard.writeText(fullAddress);
        button.textContent = 'Gekopieerd';
        setTimeout(() => {
          button.textContent = server.label === 'Java' ? 'Kopieer IP' : 'Kopieer IP';
        }, 1200);
      } catch (error) {
        button.textContent = 'Niet beschikbaar';
      }
    });
  });
}

function bindRefreshButtons() {
  document.querySelectorAll('.refresh-btn').forEach((button) => {
    button.addEventListener('click', () => {
      refreshServer(button.dataset.refresh);
    });
  });
}

async function refreshAllServers() {
  await Promise.all([refreshServer('java'), refreshServer('bedrock')]);
}

async function refreshServer(serverKey) {
  const server = config.server[serverKey];
  const url = `https://api.mcsrvstat.us/2/${server.host}:${server.port}`;
  const card = document.querySelector(`[data-server="${serverKey}"]`);
  if (!card) return;

  const statusText = document.getElementById(`${serverKey}-status-text`);
  const players = document.getElementById(`${serverKey}-players`);
  const maxPlayers = document.getElementById(`${serverKey}-max`);
  const version = document.getElementById(`${serverKey}-version`);
  const heroStatus = document.getElementById(`hero-${serverKey}-status`);

  try {
    const response = await fetch(url);
    const data = await response.json();
    const online = Boolean(data.online);

    card.classList.toggle('offline', !online);

    statusText.textContent = online ? 'Online' : 'Offline';
    players.textContent = online ? data.players?.online ?? 0 : 0;
    maxPlayers.textContent = online ? data.players?.max ?? 0 : 0;
    version.textContent = online ? (data.version || 'Onbekend') : '-';
    heroStatus.textContent = online ? 'Online' : 'Offline';

    if (serverKey === 'java') {
      const hero = document.getElementById('hero-java-status');
      if (hero) hero.textContent = online ? 'Online' : 'Offline';
    }

    if (serverKey === 'bedrock') {
      const hero = document.getElementById('hero-bedrock-status');
      if (hero) hero.textContent = online ? 'Online' : 'Offline';
    }

    const lastUpdated = document.getElementById('status-last-updated');
    if (lastUpdated) {
      lastUpdated.textContent = `Laatste verversing: ${new Date().toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' })}`;
    }
  } catch (error) {
    card.classList.add('offline');
    statusText.textContent = 'Offline';
    players.textContent = '0';
    maxPlayers.textContent = '0';
    version.textContent = '-';
    heroStatus.textContent = 'Offline';
  }
}

setInterval(() => {
  refreshAllServers();
}, 300000);

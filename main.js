/* ═══════════════════════════════════════════════
   REALM — hash-routed portfolio + basket + Discord
   Views: #/home · #/projects · #/services · #/basket · #/contact
   ═══════════════════════════════════════════════ */

document.getElementById('yr').textContent = new Date().getFullYear();

const VIEW = document.getElementById('view');
const CART_KEY = 'realm_cart_v1';

/* ── SERVICES (single source of truth) ─────────────────────────────── */
const SERVICES = [
  { id: 's01', num: '01', title: 'Discord Server Setups',
    desc: 'I can help you set up your community server from scratch — channels, roles, permissions, community settings, expressions, and everything it needs to be a welcoming server.' },
  { id: 's02', num: '02', title: 'Minecraft Server Configuration & Management',
    desc: 'Setting up Minecraft servers: plugins, mods, lobbies, and managing community events for you.' },
  { id: 's03', num: '03', title: 'Discord Server Moderation & Management',
    desc: 'This includes: moderation, events, maintenance, ticket support, and reviewing.' },
  { id: 's04', num: '04', title: 'Minecraft Community Events',
    desc: 'Running community events end-to-end: planning, scheduling, announcements, moderation, and keeping players engaged.' },
  { id: 's05', num: '05', title: 'Plugin & Permission Setup (LuckPerms)',
    desc: 'LuckPerms groups, ranks, prefixes and inheritance — plus full plugin stack setup: protection, economy, Vault, EssentialsX, WorldEdit.' },
  { id: 's06', num: '06', title: 'Community Growth & Promotion',
    desc: 'Growing your server: promotion strategy, recruitment posts, social media presence, and keeping members active long-term.' },
  { id: 's07', num: '07', title: 'Ranks, Economy & Shop Setup',
    desc: 'Vault-based economy, in-server shops, and rank tiers (default / donor / staff) wired up with the right permissions.' },
  { id: 's08', num: '08', title: 'Ticket Support & Helpdesk Setup',
    desc: 'Ticket bot configuration, support channels, and reviewing workflows — so your players actually get help.' },
  { id: 's09', num: '09', title: 'Single-Page Websites',
    desc: 'Clean single-page sites like this portfolio — custom theme, hash-routed sections, deployed free on GitHub Pages.' },
  { id: 's10', num: '10', title: 'Server Maintenance & Upkeep',
    desc: 'Ongoing care: updates, backups, uptime checks, plugin fixes, and general server health so it stays playable.' },
  { id: 's11', num: '11', title: 'Discord Bot Setup',
    desc: 'Configuring the bots you need — moderation, tickets, levels, logging — with prefixes, channels and permissions dialed in. (Carl-bot, Ticket Tool, MEE6, Dyno & co.)' },
  { id: 's12', num: '12', title: 'Minecraft Event Planning',
    desc: 'Planning and running Minecraft events end-to-end: concept, scheduling, rules, announcements, moderation, and prizes.' }
];

/* ── DISCORD CONFIG — paste your app's Client ID here ───────────────
   Setup: https://discord.com/developers/applications
   → New Application → OAuth2 → add redirect URI:
     https://realmmix.github.io/
   → use the CLIENT ID (no secret needed — PKCE flow)
   Optional: paste an orders-channel webhook URL (from a #orders channel,
   https://discord.com/channels/… → Edit Channel → Integrations → Webhooks)
─────────────────────────────────────────────────────────────────── */
const DISCORD_CLIENT_ID = '';           // e.g. '1371234567890123456'
const ORDERS_WEBHOOK    = '';           // e.g. 'https://discord.com/api/webhooks/.../...'
const OWNER_DISCORD_ID  = '1487741893864456365';
const HQ_INVITE         = 'https://discord.gg/U6uX7jxcfC';
const REDIRECT_URI      = location.origin + '/';

/* ── CART STATE ─────────────────────────────────────────── */
function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY) || '[]'); }
  catch { return []; }
}
function setCart(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  updateBadge();
}
function addToCart(id) {
  if (!getCart().includes(id)) setCart([...getCart(), id]);
  else flash(`Already in basket`);
}
function removeFromCart(id) { setCart(getCart().filter(x => x !== id)); }
function clearCart() { setCart([]); }
function cartLines() { return getCart().map(id => SERVICES.find(s => s.id === id)).filter(Boolean); }
function updateBadge() {
  const b = document.getElementById('cart-count');
  if (b) b.textContent = getCart().length;
}
function flash(msg) {
  const b = document.getElementById('cart-flash');
  if (!b) return;
  b.textContent = msg;
  b.classList.add('show');
  setTimeout(() => b.classList.remove('show'), 2000);
}

/* ── DISCORD OAUTH (PKCE) ───────────────────────────────── */
function b64url(buf) {
  return btoa(String.fromCharCode(...new Uint8Array(buf)))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
async function pkcePair() {
  const verifierBytes = crypto.getRandomValues(new Uint8Array(64));
  const verifier = b64url(verifierBytes);
  const challenge = b64url(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(verifier)));
  return { verifier, challenge };
}
async function discordLogin() {
  if (!DISCORD_CLIENT_ID) { alert('Discord sign-in isn\'t configured yet — contact Realm on Discord: ' + OWNER_DISCORD_ID); return; }
  const { verifier, challenge } = await pkcePair();
  const state = b64url(crypto.getRandomValues(new Uint8Array(16)));
  sessionStorage.setItem('dc_verifier', verifier);
  sessionStorage.setItem('dc_state', state);
  const url = new URL('https://discord.com/api/oauth2/authorize');
  url.search = new URLSearchParams({
    client_id: DISCORD_CLIENT_ID, redirect_uri: REDIRECT_URI, response_type: 'code',
    scope: 'identify', state, code_challenge: challenge, code_challenge_method: 'S256'
  });
  location.assign(url.toString());
}
function discordLogout() { sessionStorage.removeItem('dc_user'); render(currentRoute(), false); }
function me() {
  try { return JSON.parse(sessionStorage.getItem('dc_user') || 'null'); } catch { return null; }
}
async function handleOAuthCallback() {
  const params = new URLSearchParams(location.search);
  const code = params.get('code'); const state = params.get('state');
  if (!code) return false;
  history.replaceState(null, '', location.pathname);
  if (!DISCORD_CLIENT_ID) return true;
  const savedState = sessionStorage.getItem('dc_state');
  if (state !== savedState) { alert('Discord sign-in failed: state mismatch.'); return true; }
  const verifier = sessionStorage.getItem('dc_verifier');
  try {
    const body = new URLSearchParams({
      client_id: DISCORD_CLIENT_ID, grant_type: 'authorization_code',
      code, redirect_uri: REDIRECT_URI, code_verifier: verifier
    });
    const r1 = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body
    });
    if (!r1.ok) throw new Error('token exchange failed');
    const tok = await r1.json();
    const r2 = await fetch('https://discord.com/api/users/@me', {
      headers: { Authorization: 'Bearer ' + tok.access_token }
    });
    if (!r2.ok) throw new Error('user fetch failed');
    const u = await r2.json();
    sessionStorage.setItem('dc_user', JSON.stringify({ id: u.id, username: u.username, global_name: u.global_name || u.username, avatar: u.avatar }));
  } catch (e) {
    alert('Discord sign-in could not complete. You can still check out — paste your order in Realm HQ manually.');
  }
  location.hash = '#/basket';
  return true;
}

/* ── ORDER BUILD ────────────────────────────────────────── */
function orderText() {
  const lines = cartLines().map(s => `• ${s.title}`).join('\n');
  const u = me();
  const who = u ? `${u.global_name} (Discord ID ${u.id})` : '(guest — see handle below)';
  return `New order for Realm HQ\nFrom: ${who}\nServices:\n${lines}\n\nSent from realmmix.github.io`;
}
async function checkout() {
  const lines = cartLines();
  if (!lines.length) { alert('Your basket is empty.'); return; }
  const u = me();
  if (!u && !DISCORD_CLIENT_ID) {
    // Guest path: ask for their handle once
    const h = prompt('Your Discord username (so Realm knows who this is):');
    if (!h) return;
    sessionStorage.setItem('dc_guest', h.trim());
  }
  const text = orderText();
  let posted = false;
  if (ORDERS_WEBHOOK) {
    try {
      const r = await fetch(ORDERS_WEBHOOK, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: 'Realm Orders',
          content: '**New order**',
          embeds: [{ title: 'Services requested', description: lines.map(s => `• ${s.title}`).join('\n'), color: 0x34d399, fields: [{ name: 'Client', value: u ? `${u.global_name} (${u.id})` : (sessionStorage.getItem('dc_guest') || 'guest') }] }]
        })
      });
      posted = r.ok;
    } catch { posted = false; }
  }
  try { await navigator.clipboard.writeText(text); } catch {}
  clearCart();
  render(currentRoute(), false);
  flash(posted ? 'Order posted to HQ + copied to clipboard!' : 'Order copied — paste it in Realm HQ or DM Realm!');
}

/* ── VIEWS ──────────────────────────────────────────────── */
const SERVICE_GRID = `<div class="service-grid">${SERVICES.map(s => `
        <article class="card service-card">
          <div class="service-num">${s.num}</div>
          <h3>${s.title}</h3>
          <p>${s.desc}</p>
          <button class="order" onclick="addToCart('${s.id}')">Add to Basket</button>
          <a class="order-link" href="#/contact">Order Now →</a>
        </article>`).join('')}
      </div>`;

const VIEWS = {
  home: {
    title: 'Realm — Server Developer',
    html: `
      <section class="home-wrap">
        <div class="eyebrow"><span class="dot"></span> Available for commissions</div>
        <h1 class="hero-title">Minecraft &amp; Discord<br><span class="accent">server developer.</span></h1>
        <p class="hero-text">Welcome to my portfolio! I&rsquo;m the developer behind a lot of great Minecraft servers — a professional server developer specializing in management, moderation, growth, promotion, etc. I can also manage events for both Discord &amp; Minecraft servers, configure and moderate them.</p>
        <div class="hero-ctas">
          <a class="btn btn-primary" href="#/services">Browse services</a>
          <a class="btn btn-secondary" href="#/basket">View basket</a>
          <a class="btn btn-secondary" href="${HQ_INVITE}" target="_blank" rel="noopener">Join the Realm HQ ↗</a>
        </div>
        <div class="hero-stats">
          <div class="stat"><span class="stat-n">${SERVICES.length}</span><span class="stat-l">services offered</span></div>
          <div class="stat"><span class="stat-n">6</span><span class="stat-l">projects built</span></div>
          <div class="stat"><span class="stat-n">1</span><span class="stat-l">Discord HQ to join</span></div>
        </div>
      </section>`
  },

  projects: {
    title: 'Realm — Projects',
    html: `
      <h2 class="section-title">Projects</h2>
      <div class="section-sub">What I&rsquo;ve built</div>
      <div class="project-grid">
        <article class="card project-card">
          <span class="proj-tag">Server Admin</span>
          <h3>Minecraft Server Administration</h3>
          <p>Running &amp; maintaining private Minecraft servers — permissions, plugins, server upkeep, backups and keeping the community alive day to day.</p>
          <p class="stack">Paper · LuckPerms · EssentialsX · Vault · WorldEdit</p>
          <span class="proj-link muted">Private networks</span>
        </article>
        <article class="card project-card">
          <span class="proj-tag">Permissions</span>
          <h3>LuckPerms Rank Systems</h3>
          <p>Full rank systems end to end: groups, prefixes &amp; suffixes, inheritance, weight sorting and context-based permissions — setup and troubleshooting.</p>
          <p class="stack">LuckPerms · Groups · Inheritance · Prefixes</p>
          <span class="proj-link muted">Private networks</span>
        </article>
        <article class="card project-card">
          <span class="proj-tag">Plugins</span>
          <h3>Plugin Stack Configuration</h3>
          <p>Complete plugin stack setup for survival &amp; community servers — protection, economy, shops, moderation tooling and admin utilities, wired together and tuned.</p>
          <p class="stack">Protection · Economy · Vault · EssentialsX</p>
          <span class="proj-link muted">Private networks</span>
        </article>
        <article class="card project-card">
          <span class="proj-tag">Configuration</span>
          <h3>Minecraft Server Configuration</h3>
          <p>Full environment tuning — paper.yml, spigot.yml, server.properties, JVM flags, view distance, anti-grief and performance optimization so servers run smooth.</p>
          <p class="stack">Paper · Config tuning · JVM · Performance</p>
          <span class="proj-link muted">Private networks</span>
        </article>
        <article class="card project-card">
          <span class="proj-tag">Development</span>
          <h3>Plugin Creation</h3>
          <p>Custom server plugins built for your specific needs — Java plugins to extend your server beyond what off-the-shelf plugins offer.</p>
          <p class="stack">Java · Plugin API · Custom features</p>
          <span class="proj-link muted">Available on request</span>
        </article>
        <article class="card project-card">
          <span class="proj-tag">Events</span>
          <h3>Minecraft Community Events</h3>
          <p>Planning &amp; running in-game events that keep players coming back — concept, rules, scheduling, announcements, moderation and prizes.</p>
          <p class="stack">Event planning · Coordination · Community</p>
          <span class="proj-link muted">Private networks</span>
        </article>
      </div>
      <div class="toolrow">
        <span class="toolchip">Paper</span><span class="toolchip">LuckPerms</span><span class="toolchip">EssentialsX</span><span class="toolchip">Vault</span><span class="toolchip">WorldEdit</span><span class="toolchip">GriefPrevention</span><span class="toolchip">DiscordSRV</span><span class="toolchip">Config tuning</span><span class="toolchip">Backups</span>
      </div>`
  },

  services: {
    title: 'Realm — Services',
    html: `
      <h2 class="section-title">Services</h2>
      <div class="section-sub">Add what you need to your basket — checkout with Discord</div>
      ${SERVICE_GRID}
      <h2 class="section-title" style="margin-top:56px">Roles I can be</h2>
      <div class="section-sub">What you can hire me for</div>
      <div class="titles-grid">
        <div class="title-tile"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg><span class="title-name">Developer</span><span class="title-cap">Tools &amp; sites</span></div>
        <div class="title-tile"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg><span class="title-name">Minecraft Developer</span><span class="title-cap">Servers &amp; plugins</span></div>
        <div class="title-tile"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg><span class="title-name">Event Manager</span><span class="title-cap">Community events</span></div>
        <div class="title-tile"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg><span class="title-name">Trusted Manager</span><span class="title-cap">Management &amp; oversight</span></div>
        <div class="title-tile"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M8.21 13 6 22l6-3 6 3-2.21-9"/><path d="M9.5 8l1.8 1.8L14.5 6.5"/></svg><span class="title-name">Trusted Staff</span><span class="title-cap">Staff &amp; moderation</span></div>
        <div class="title-tile"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 8.5-8.5 8.38 8.38 0 0 1 8.5 8.5z"/></svg><span class="title-name">Discord Developer</span><span class="title-cap">Setup &amp; management</span></div>
      </div>`
  },

  basket: {
    title: 'Realm — Basket',
    html: () => {
      const lines = cartLines();
      const u = me();
      const signed = u
        ? `<div class="signed-as"><span class="signed-dot"></span>Signed in as <strong>${u.global_name}</strong> <span class="dc-id">· ${u.id}</span> <button class="copy-id" onclick="discordLogout()">sign out</button></div>`
        : `<div class="signed-as guest">Not signed in — <button class="copy-id" onclick="discordLogin()">Sign in with Discord</button> to attach verified identity to your order.</div>`;
      if (!lines.length) {
        return `
      <h2 class="section-title">Basket</h2>
      <div class="section-sub">Your selected services</div>
      <div class="cart-empty">
        <div class="cart-empty-icon">🛒</div>
        <h3>Basket is empty</h3>
        <p>Browse services and add what you need.</p>
        <a class="btn btn-primary" href="#/services">Browse services</a>
      </div>`;
      }
      return `
      <h2 class="section-title">Basket</h2>
      <div class="section-sub">${lines.length} service${lines.length > 1 ? 's' : ''} selected</div>
      <div class="cart-wrap">
        <div class="cart-list">
          ${lines.map(s => `
          <div class="cart-row">
            <div class="cart-row-main">
              <div class="cart-row-title">${s.title}</div>
              <div class="cart-row-sub">Quote via Discord · starts with ${s.num}</div>
            </div>
            <button class="cart-remove" onclick="removeFromCart('${s.id}')" aria-label="Remove ${s.title}">✕</button>
          </div>`).join('')}
        </div>
        <div class="checkout-box">
          <div class="checkout-title">Checkout</div>
          ${signed}
          <p class="checkout-note">No prices on the site — final quote in Discord after checkout. Your order ${ORDERS_WEBHOOK ? 'is posted to the HQ orders channel' : 'is copied to your clipboard to paste in HQ or DM Realm'}.</p>
          <button class="btn btn-primary" style="width:100%" onclick="checkout()">Checkout ${ORDERS_WEBHOOK ? '→ Post to HQ' : '→ Copy order'}</button>
          <button class="btn btn-secondary" style="width:100%" onclick="clearCart(); render('basket', false)">Clear basket</button>
          <a class="order-link" style="text-align:center" href="${HQ_INVITE}" target="_blank" rel="noopener">${HQ_INVITE.replace('https://','')}</a>
        </div>
      </div>`;
    }
  },

  contact: {
    title: 'Realm — Contact',
    html: `
      <h2 class="section-title">Contact</h2>
      <div class="section-sub">Reach me directly</div>
      <div class="contact-wrap">
        <div class="card contact-card">
          <h3>Want to hire me or work together?</h3>
          <p class="contact-text">Fastest way to reach me is Discord:</p>
          <p class="contact-discord">Realm</p>
          <p class="contact-id">Discord ID: <span id="dc-id">${OWNER_DISCORD_ID}</span> <button class="copy-id" onclick="navigator.clipboard.writeText('${OWNER_DISCORD_ID}')" aria-label="Copy Discord ID">copy</button></p>
          <a class="btn btn-primary" href="${HQ_INVITE}" target="_blank" rel="noopener">Join Realm HQ ↗</a>
          <a class="btn btn-secondary" href="https://discord.com/users/${OWNER_DISCORD_ID}" target="_blank" rel="noopener">Open my Discord profile ↗</a>
          <p class="contact-text">Or add services to your <a class="inline-link" href="#/basket">basket</a> and check out — every order goes through Discord.</p>
          <a class="btn btn-secondary" href="#/services">Browse services</a>
        </div>
      </div>`
  }
};

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function currentRoute() {
  const raw = location.hash.replace(/^#\/?/, '').split('/')[0].toLowerCase();
  return VIEWS[raw] ? raw : 'home';
}
function setActiveRoute(name) {
  document.querySelectorAll('.route').forEach(a => {
    a.classList.toggle('active', a.dataset.route === name);
  });
}
function render(name, first) {
  const view = VIEWS[name];
  const html = typeof view.html === 'function' ? view.html() : view.html;
  const swap = () => {
    VIEW.innerHTML = html;
    document.title = view.title;
    setActiveRoute(name);
    VIEW.classList.remove('leaving');
    updateBadge();
    const heading = VIEW.querySelector('h1, h2');
    if (heading && !first) { heading.setAttribute('tabindex', '-1'); heading.focus({ preventScroll: true }); }
    if (!first) window.scrollTo(0, 0);
  };
  if (first || reducedMotion) { swap(); return; }
  VIEW.classList.add('leaving');
  setTimeout(swap, 160);
}
function route() { render(currentRoute(), false); }
window.addEventListener('hashchange', route);

// Init: complete Discord OAuth callback if present, else force HOME always.
(async function init() {
  const hadCallback = await handleOAuthCallback();
  if (!hadCallback) {
    if (location.hash && location.hash !== '#/home') {
      history.replaceState(null, '', location.pathname + location.search);
    }
    render('home', true);
  } else {
    render(currentRoute(), true);
  }
})();

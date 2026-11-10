/* ═══════════════════════════════════════════════
   REALM — hash-routed single page
   "Pages" like realmmix.github.io/#/projects
   ═══════════════════════════════════════════════ */

document.getElementById('yr').textContent = new Date().getFullYear();

const VIEW = document.getElementById('view');

const VIEWS = {
  home: {
    title: 'Realm — Server Developer',
    html: `
      <section class="home-wrap">
        <div class="hero-ornament">◆ &nbsp;Minecraft &amp; Discord&nbsp; ◆</div>
        <h1 class="hero-title">REALM</h1>
        <div class="hero-sub">Server Developer</div>
        <div class="hero-line"></div>
        <p class="hero-text">Welcome to my portfolio! I&rsquo;m the developer behind a lot of great Minecraft servers — a professional server developer specializing in management, moderation, growth, promotion, etc. I can also manage events for both Discord &amp; Minecraft servers, configure and moderate them.</p>
        <div class="hero-ctas">
          <a class="btn btn-gold" href="#/projects">See what I&rsquo;ve built</a>
          <a class="btn btn-ghost" href="#/services">View my services</a>
        </div>
        <div class="hero-stats">
          <div class="hero-stat"><div class="n">3</div><div class="l">Services offered</div></div>
          <div class="hero-stat"><div class="n">3</div><div class="l">Projects built</div></div>
          <div class="hero-stat"><div class="n">&infin;</div><div class="l">Events managed</div></div>
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
          <span class="proj-tag">Portfolio</span>
          <h3>Realm — this site</h3>
          <p>A hash-routed single-page portfolio built from scratch — ember particles on canvas, gold-on-obsidian theme, client-side views that feel like separate pages. Hosted free on GitHub Pages with HTTPS.</p>
          <p class="stack">HTML · CSS · JavaScript · GitHub Pages</p>
          <div class="proj-links">
            <a class="proj-link" href="https://realmmix.github.io/" target="_blank" rel="noopener">Visit site ↗</a>
            <a class="proj-link" href="https://github.com/Realmmix/realmmix.github.io" target="_blank" rel="noopener">Source ↗</a>
          </div>
        </article>

        <article class="card project-card">
          <span class="proj-tag">Security Tool</span>
          <h3>Account Vault — web &amp; desktop</h3>
          <p>Local defensive panel for your own accounts. Tracks password rotation (30-day stale alerts), 2FA status and breach exposure; checks passwords against HaveIBeenPwned via k-anonymity (the password never leaves your machine); one-click links to Microsoft&rsquo;s official password-reset / 2FA pages. Desktop in Tkinter, web in Flask — both fully local.</p>
          <p class="stack">Python · Flask · Tkinter · HaveIBeenPwned API</p>
          <span class="proj-link muted">Local / private tool</span>
        </article>

        <article class="card project-card">
          <span class="proj-tag">Server Admin</span>
          <h3>Minecraft server administration</h3>
          <p>Running and maintaining Minecraft communities — permission systems (LuckPerms groups, prefixes, suffixes, inheritance), plugin stack setup (protection, economy, Vault), maintenance and community events.</p>
          <p class="stack">Paper · LuckPerms · EssentialsX · Vault · WorldEdit</p>
          <span class="proj-link muted">Private networks</span>
        </article>

      </div>
      <div class="toolrow">
        <span class="toolchip">Python</span><span class="toolchip">Flask</span><span class="toolchip">Tkinter</span><span class="toolchip">HTML/CSS/JS</span><span class="toolchip">Git</span><span class="toolchip">GitHub Pages</span><span class="toolchip">LuckPerms</span><span class="toolchip">Paper</span><span class="toolchip">Discord</span>
      </div>`
  },

  services: {
    title: 'Realm — Services',
    html: `
      <h2 class="section-title">Services</h2>
      <div class="section-sub">What I offer</div>
      <div class="service-grid">

        <article class="card service-card">
          <div class="service-num">— 01 —</div>
          <h3>Discord Server Setups</h3>
          <p>I can help you set up your community server from scratch — channels, roles, permissions, community settings, expressions, and everything it needs to be a welcoming server.</p>
          <a class="order" href="#/contact">Order Now</a>
        </article>

        <article class="card service-card">
          <div class="service-num">— 02 —</div>
          <h3>Minecraft Server Configuration &amp; Management</h3>
          <p>Setting up Minecraft servers: plugins, mods, lobbies, and managing community events for you.</p>
          <a class="order" href="#/contact">Order Now</a>
        </article>

        <article class="card service-card">
          <div class="service-num">— 03 —</div>
          <h3>Discord Server Moderation &amp; Management</h3>
          <p>This includes: moderation, events, maintenance, ticket support, and reviewing.</p>
          <a class="order" href="#/contact">Order Now</a>
        </article>

      </div>`
  },

  contact: {
    title: 'Realm — Contact',
    html: `
      <h2 class="section-title">Contact</h2>
      <div class="section-sub">Reach me directly</div>
      <div class="contact-wrap">
        <div class="card contact-card">
          <div class="contact-rune">♛</div>
          <h3>Want to hire me or work together?</h3>
          <p class="contact-text">Reach me on Discord — it&rsquo;s always open:</p>
          <p class="contact-discord">n3v3rfr3v3r</p>
          <p class="contact-id">Discord ID: <span id="dc-id">1487741893864456365</span> <button class="copy-id" onclick="navigator.clipboard.writeText('1487741893864456365')" aria-label="Copy Discord ID">copy</button></p>
          <a class="btn btn-gold" href="https://discord.com/users/1487741893864456365" target="_blank" rel="noopener">Open my Discord profile ↗</a>
          <p class="contact-text">Or check out my services and hit <strong style="color:var(--gold)">Order Now</strong> — every order goes through Discord.</p>
          <a class="btn btn-ghost" href="#/services">Browse Services</a>
          <div class="contact-sigil">◆ &nbsp;Realm&nbsp; ◆</div>
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
  const swap = () => {
    VIEW.innerHTML = view.html;
    document.title = view.title;
    setActiveRoute(name);
    VIEW.classList.remove('leaving');
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

// Fresh opens ALWAYS land on home — strip any deep-link hash and render home.
// (In-page navigation still routes normally afterwards.)
if (location.hash && location.hash !== '#/home') {
  history.replaceState(null, '', location.pathname + location.search);
}
render('home', true);

/* ── EMBER CANVAS ─────────────────────────────────────── */
(function embers() {
  if (reducedMotion) return;
  const canvas = document.getElementById('fx');
  const ctx = canvas.getContext('2d');
  let W, H;
  const resize = () => { W = canvas.width = innerWidth; H = canvas.height = innerHeight; };
  resize();
  window.addEventListener('resize', resize);

  const EMBERS = 70;
  const embersArr = Array.from({ length: EMBERS }, () => spawn(true));

  function spawn(anywhere) {
    return {
      x: Math.random() * W,
      y: anywhere ? Math.random() * H : H + 10,
      r: Math.random() * 2.4 + 0.6,
      vy: -(Math.random() * 0.55 + 0.25),
      vx: (Math.random() - 0.5) * 0.35,
      life: Math.random() * 0.7 + 0.3,
      hue: Math.random() < 0.72 ? 42 + Math.random() * 14 : 8 + Math.random() * 14,
      flicker: Math.random() * Math.PI * 2,
      flickerSpeed: 0.02 + Math.random() * 0.03
    };
  }

  function tick() {
    ctx.clearRect(0, 0, W, H);
    for (const e of embersArr) {
      e.y += e.vy; e.x += e.vx + Math.sin(e.flicker) * 0.25; e.flicker += e.flickerSpeed;
      const alpha = (0.35 + 0.4 * (0.5 + 0.5 * Math.sin(e.flicker * 2))) * e.life;
      const g = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, e.r * 4);
      g.addColorStop(0, `hsla(${e.hue}, 95%, 65%, ${alpha})`);
      g.addColorStop(1, `hsla(${e.hue}, 95%, 55%, 0)`);
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(e.x, e.y, e.r * 4, 0, Math.PI * 2); ctx.fill();
      if (e.y < -12 || e.x < -12 || e.x > W + 12) Object.assign(e, spawn(false));
    }
    requestAnimationFrame(tick);
  }
  tick();
})();

/* ═══════════════════════════════════════════════
   REALM — hash-routed single page
   Views: #/home · #/projects · #/contact
   ═══════════════════════════════════════════════ */

document.getElementById('yr').textContent = new Date().getFullYear();

const VIEW = document.getElementById('view');

const VIEWS = {
  home: {
    title: 'Realm — Server Developer',
    html: `
      <section class="home-wrap">
        <div class="eyebrow"><span class="dot"></span> Available for commissions</div>
        <h1 class="hero-title">Minecraft &amp; Discord<br><span class="accent">server developer.</span></h1>
        <p class="hero-text">Welcome to my portfolio! I&rsquo;m the developer behind a lot of great Minecraft servers — a professional server developer specializing in management, moderation, growth, promotion, etc. I can also manage events for both Discord &amp; Minecraft servers, configure and moderate them.</p>
        <div class="hero-ctas">
          <a class="btn btn-primary" href="#/projects">See what I&rsquo;ve built</a>
        </div>
        <div class="hero-stats">
          <div class="stat"><span class="stat-n">6</span><span class="stat-l">projects built</span></div>
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
          <p>Running &amp; maintaining public Minecraft servers — permissions, plugins, server upkeep, backups and keeping the community alive day to day.</p>
          <p class="stack">Paper · LuckPerms · EssentialsX · Vault · WorldEdit</p>
          <span class="proj-link muted">Public networks</span>
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
          <p class="contact-id">Discord ID: <span id="dc-id">1487741893864456365</span> <button class="copy-id" onclick="navigator.clipboard.writeText('1487741893864456365')" aria-label="Copy Discord ID">copy</button></p>
          <a class="btn btn-secondary" href="https://discord.com/users/1487741893864456365" target="_blank" rel="noopener">Open my Discord profile ↗</a>
          <p class="contact-text">Message me on Discord — I’ll tell you straight whether I can help.</p>
          <a class="btn btn-secondary" href="#/projects">See my projects</a>
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

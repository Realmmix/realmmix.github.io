/* ═══════════════════════════════════════════════
   REALM — hash-routed single page
   Views: #/home · #/projects · #/services · #/contact
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
          <a class="btn btn-secondary" href="#/services">View my services</a>
          <a class="btn btn-secondary" href="https://discord.gg/U6uX7jxcfC" target="_blank" rel="noopener">Join the Realm HQ ↗</a>
        </div>
        <div class="hero-stats">
          <div class="stat"><span class="stat-n">12</span><span class="stat-l">services offered</span></div>
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
      <div class="section-sub">What I offer</div>
      <div class="service-grid">

        <article class="card service-card">
          <div class="service-num">01</div>
          <h3>Discord Server Setups</h3>
          <p>I can help you set up your community server from scratch — channels, roles, permissions, community settings, expressions, and everything it needs to be a welcoming server.</p>
        </article>

        <article class="card service-card">
          <div class="service-num">02</div>
          <h3>Minecraft Server Configuration &amp; Management</h3>
          <p>Setting up Minecraft servers: plugins, mods, lobbies, and managing community events for you.</p>
        </article>

        <article class="card service-card">
          <div class="service-num">03</div>
          <h3>Discord Server Moderation &amp; Management</h3>
          <p>This includes: moderation, events, maintenance, ticket support, and reviewing.</p>
        </article>

        <article class="card service-card">
          <div class="service-num">04</div>
          <h3>Minecraft Community Events</h3>
          <p>Running community events end-to-end: planning, scheduling, announcements, moderation, and keeping players engaged.</p>
        </article>

        <article class="card service-card">
          <div class="service-num">05</div>
          <h3>Plugin &amp; Permission Setup (LuckPerms)</h3>
          <p>LuckPerms groups, ranks, prefixes and inheritance — plus full plugin stack setup: protection, economy, Vault, EssentialsX, WorldEdit.</p>
        </article>

        <article class="card service-card">
          <div class="service-num">06</div>
          <h3>Ranks, Economy &amp; Shop Setup</h3>
          <p>Vault-based economy, in-server shops, and rank tiers (default / donor / staff) wired up with the right permissions.</p>
        </article>

        <article class="card service-card">
          <div class="service-num">07</div>
          <h3>Ticket Support &amp; Helpdesk Setup</h3>
          <p>Ticket bot configuration, support channels, and reviewing workflows — so your players actually get help.</p>
        </article>

        <article class="card service-card">
          <div class="service-num">08</div>
          <h3>Single-Page Websites</h3>
          <p>Clean single-page sites like this portfolio — custom theme, hash-routed sections, deployed free on GitHub Pages.</p>
        </article>

        <article class="card service-card">
          <div class="service-num">09</div>
          <h3>Server Maintenance &amp; Upkeep</h3>
          <p>Ongoing care: updates, backups, uptime checks, plugin fixes, and general server health so it stays playable.</p>
        </article>

        <article class="card service-card">
          <div class="service-num">10</div>
          <h3>Discord Bot Setup</h3>
          <p>Configuring the bots you need — moderation, tickets, levels, logging — with prefixes, channels and permissions dialed in. (Carl-bot, Ticket Tool, MEE6, Dyno &amp; co.)</p>
        </article>

        <article class="card service-card">
          <div class="service-num">11</div>
          <h3>Minecraft Event Planning</h3>
          <p>Planning and running Minecraft events end-to-end: concept, scheduling, rules, announcements, moderation, and prizes.</p>
        </article>

        <article class="card service-card">
          <div class="service-num">12</div>
          <h3>Resource Pack Creating &amp; Remaking</h3>
          <p>Custom resource packs — fresh textures for your server, rebuilding and remastering packs for newer Minecraft versions, and adapting looks to match your style.</p>
        </article>

      </div>

      <h2 class="section-title" style="margin-top:56px">Roles I can be</h2>
      <div class="section-sub">What you can hire me for</div>
      <div class="titles-grid">
            <div class="title-tile"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg><span class="title-name">Developer</span><span class="title-cap">Tools &amp; sites</span></div>
            <div class="title-tile"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg><span class="title-name">Minecraft Developer</span><span class="title-cap">Servers &amp; plugins</span></div>
            <div class="title-tile"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg><span class="title-name">Event Manager</span><span class="title-cap">Community events</span></div>
            <div class="title-tile"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg><span class="title-name">Trusted Manager</span><span class="title-cap">Management &amp; oversight</span></div>
            <div class="title-tile"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M8.21 13 6 22l6-3 6 3-2.21-9"/><path d="M9.5 8l1.8 1.8L14.5 6.5"/></svg><span class="title-name">Trusted Staff</span><span class="title-cap">Staff &amp; moderation</span></div>
            <div class="title-tile"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 8.5-8.5 8.38 8.38 0 0 1 8.5 8.5z"/></svg><span class="title-name">Discord Developer</span><span class="title-cap">Setup &amp; management</span></div>
          </div>
    `
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
          <a class="btn btn-primary" href="https://discord.gg/U6uX7jxcfC" target="_blank" rel="noopener">Join Realm HQ ↗</a>
          <a class="btn btn-secondary" href="https://discord.com/users/1487741893864456365" target="_blank" rel="noopener">Open my Discord profile ↗</a>
          <p class="contact-text">Check out my services above and message me on Discord about any of them.</p>
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

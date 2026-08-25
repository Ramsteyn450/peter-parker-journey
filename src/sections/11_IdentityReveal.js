/**
 * 11 — Identity Reveal
 * "EVERYONE KNOWS."
 */

export function initIdentityReveal() {
  const section = document.getElementById('section-identity');
  if (!section) return;

  const panels = [
    { tag: 'BREAKING NEWS', text: 'SPIDER-MAN IS PETER PARKER' },
    { tag: 'LIVE UPDATE',   text: 'Queens Teen Unmasked' },
    { tag: 'TRENDING',      text: '#PeterParker #SpiderMan' },
    { tag: 'STATEMENT',     text: 'Mysterio reveals identity' },
    { tag: 'ALERT',         text: 'Peter Parker — Midtown High' },
    { tag: 'REPORT',        text: 'His friends. His school. Exposed.' },
    { tag: 'WORLDWIDE',     text: 'The world knows his name.' },
    { tag: 'CHAOS',         text: 'Everything changed in seconds.' },
  ];

  section.innerHTML = `
    <!-- Ambient background glow -->
    <div style="position:absolute;inset:0;background:radial-gradient(ellipse at center, rgba(230,36,41,0.2) 0%, rgba(5,5,5,0.95) 100%);pointer-events:none;" aria-hidden="true"></div>

    <!-- Floating chaos panels -->
    <div class="identity-chaos" id="identity-chaos" aria-hidden="true">
      ${panels.map((p, i) => `
        <div class="identity-panel" style="${_panelStyle(i)}background:rgba(230,36,41,0.15);border:1px solid rgba(230,36,41,0.4);border-radius:8px;backdrop-filter:blur(8px);box-shadow:0 10px 30px rgba(0,0,0,0.8);">
          <p class="identity-panel-tag" style="color:var(--spider-red);font-weight:700;">${p.tag}</p>
          <p class="identity-panel-text" style="color:var(--white);font-size:14px;font-weight:600;">${p.text}</p>
        </div>
      `).join('')}
    </div>

    <!-- Central message -->
    <div class="identity-title-main" data-reveal style="position:relative;z-index:3;text-align:center;max-width:700px;margin:0 auto;">
      <p class="label label-red" style="margin-bottom:var(--space-md);letter-spacing:0.4em;">CHAPTER 11</p>
      <h2 class="identity-everyone-knows" style="font-family:var(--font-display);font-size:clamp(56px,10vw,130px);color:var(--spider-red);text-shadow:0 0 60px rgba(230,36,41,0.8);line-height:0.9;">EVERYONE<br/><span style="color:var(--white);text-shadow:0 0 40px rgba(255,255,255,0.4);">KNOWS.</span></h2>
      <p class="body-lg" style="
        margin-top:var(--space-lg);text-align:center;
        max-width:550px;margin-left:auto;margin-right:auto;
        color:rgba(245,245,245,0.9);font-size:clamp(16px,1.8vw,22px);line-height:1.6;
      ">
        One moment. One revelation. Peter Parker's life — as he knew it — was over.
      </p>
    </div>
  `;

  section.classList.add('section--full-vh');
  _animatePanels();
}

function _panelStyle(i) {
  const positions = [
    'top:12%;left:8%;',
    'top:8%;left:35%;',
    'top:15%;right:10%;',
    'top:40%;left:5%;',
    'top:65%;left:15%;',
    'top:75%;right:8%;',
    'top:45%;right:12%;',
    'bottom:12%;left:42%;',
  ];
  const durations = [18, 22, 26, 20, 24, 16, 28, 21];
  const p = positions[i] || 'top:50%;left:50%;';
  const d = durations[i] || 20;

  return `
    ${p}
    --dx1:${(Math.random()*20-10).toFixed(0)}px;
    --dy1:${(Math.random()*20-10).toFixed(0)}px;
    --dx2:${(Math.random()*20-10).toFixed(0)}px;
    --dy2:${(Math.random()*20-10).toFixed(0)}px;
    --dx3:${(Math.random()*20-10).toFixed(0)}px;
    --dy3:${(Math.random()*20-10).toFixed(0)}px;
    animation:identity-float ${d}s ease-in-out ${i*0.5}s infinite;
    opacity:0.9;
  `;
}

function _animatePanels() {
  const pref = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (pref) return;

  const container = document.getElementById('identity-chaos');
  if (!container) return;

  container.querySelectorAll('.identity-panel').forEach((panel, i) => {
    panel.style.opacity = '0.9';
  });
}

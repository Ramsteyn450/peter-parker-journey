/**
 * 08 — Infinity War: The Snap
 * "I don't want to go."
 * Uses peter3.webp (injured bloody Peter)
 */

export function initInfinityWar() {
  const section = document.getElementById('section-infinity-war');
  if (!section) return;

  section.innerHTML = `
    <div class="infinity-war-sticky" id="iw-sticky">
      <div class="iw-bg" id="iw-bg" style="background:radial-gradient(ellipse at center,#2d0610 0%,#0B0B0F 100%);"></div>

      <!-- Dust particles (created by JS) -->
      <div class="dust-container" id="dust-container" aria-hidden="true"></div>

      <div class="iw-content" id="iw-content" style="max-width:900px;margin:0 auto;text-align:center;padding:var(--space-lg);">
        <p class="label label-red" data-reveal style="margin-bottom:var(--space-md);letter-spacing:0.4em;">
          INFINITY WAR
        </p>
        <h2 class="chapter-title" data-reveal style="transition-delay:0.1s;color:var(--white);font-size:clamp(40px,6vw,80px);text-shadow:0 0 50px rgba(230,36,41,0.5);">
          EVERYTHING<br/>CHANGED AGAIN.
        </h2>

        <div style="margin-top:var(--space-xl);display:flex;align-items:center;justify-content:center;position:relative;">
          <div style="
            width:min(400px,85vw);aspect-ratio:4/3;border-radius:12px;overflow:hidden;
            box-shadow:0 20px 60px rgba(0,0,0,0.9), 0 0 40px rgba(230,36,41,0.3);
            border:1px solid rgba(230,36,41,0.3);
          " data-reveal>
            <img src="peter3.webp" alt="Titan Battle" style="width:100%;height:100%;object-fit:cover;" />
          </div>
        </div>

        <!-- The Snap -->
        <div id="snap-section" style="text-align:center;margin-top:var(--space-xl);opacity:1;">
          <p class="chapter-title" style="color:var(--spider-red);font-size:clamp(32px,5vw,64px);text-shadow:0 0 30px var(--spider-red);">THE SNAP.</p>
          <div style="margin-top:var(--space-lg);">
            <blockquote class="iw-quote" id="snap-quote" style="opacity:1;color:var(--white);font-family:var(--font-quote);font-style:italic;font-size:clamp(22px,3.5vw,36px);line-height:1.5;">
              "I don't feel so good..."
              <br/><br/>
              "I don't want to go."
              <footer class="iw-attribution" style="margin-top:var(--space-md);color:var(--spider-red);font-size:var(--fs-label);letter-spacing:0.3em;">— PETER PARKER</footer>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  `;

  section.style.minHeight = '120vh';
  _initSnapSequence(section);
}

function _initSnapSequence(section) {
  let triggered = false;

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !triggered) {
      triggered = true;
      _createDustParticles();
    }
  }, { threshold: 0.2 });

  observer.observe(section);
}

function _createDustParticles() {
  const container = document.getElementById('dust-container');
  if (!container) return;

  const count = 60;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'dust-particle';
    p.style.cssText = `
      left: ${40 + Math.random() * 20}%;
      top: ${30 + Math.random() * 40}%;
      --tx: ${(Math.random() - 0.5) * 200}px;
      --ty: ${(Math.random() - 0.5) * 200}px;
      animation: dust-particle ${1.5 + Math.random() * 2}s ease-out ${Math.random() * 2}s forwards;
      background: rgba(245,245,245,${0.3 + Math.random() * 0.4});
      width: ${2 + Math.random() * 3}px;
      height: ${2 + Math.random() * 3}px;
    `;
    container.appendChild(p);
  }
}

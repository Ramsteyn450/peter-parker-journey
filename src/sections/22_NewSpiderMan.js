/**
 * 22 — New Spider-Man
 * Hopeful but lonely. Peter puts on the suit and swings.
 * Uses: spidey sad.webp in the center (original 16:9 ratio)
 */

export function initNewSpiderMan() {
  const section = document.getElementById('section-new-spiderman');
  if (!section) return;

  section.innerHTML = `
    <div class="new-sm-sticky" style="position: relative; width: 100%; display: flex; align-items: center; justify-content: center; padding: var(--space-2xl) 0; height: auto;">
      <div class="new-sm-city-bg" aria-hidden="true" style="position: absolute; inset: 0; overflow: hidden; z-index: 1;">
        <!-- NYC night sky -->
        <div style="position: absolute; inset: 0; background: linear-gradient(180deg, #050510 0%, #07152E 50%, #050505 100%);"></div>
        <!-- Stars -->
        ${Array.from({length:30}, () => `
          <div style="
            position: absolute;
            left: ${Math.random()*100}%; top: ${Math.random()*60}%;
            width: ${1+Math.random()*2}px; height: ${1+Math.random()*2}px;
            border-radius: 50%;
            background: rgba(245, 245, 245, ${0.1+Math.random()*0.4});
            animation: loader-pulse ${2+Math.random()*3}s ease-in-out ${Math.random()*2}s infinite;
          " aria-hidden="true"></div>
        `).join('')}
        <!-- City lights strip at bottom -->
        <div style="position: absolute; bottom: 0; left: 0; right: 0; height: 120px; background: linear-gradient(180deg, transparent 0%, rgba(11,61,145,0.08) 60%, rgba(11,61,145,0.15) 100%);" aria-hidden="true"></div>
      </div>

      <div class="new-sm-figure" data-reveal style="position: relative; z-index: 10; display: flex; flex-direction: column; align-items: center; gap: 20px; max-width: 600px; padding: 0 var(--space-lg); width: 100%;">
        <!-- Centered spidey sad.webp in original 16:9 aspect ratio -->
        <div style="width: 100%; max-width: 500px; aspect-ratio: 16/9; border-radius: 12px; overflow: hidden; border: 1px solid rgba(11, 61, 145, 0.35); box-shadow: 0 20px 50px rgba(0,0,0,0.95), 0 0 30px rgba(11,61,145,0.18);">
          <img src="spidey sad.webp" alt="Lonely Spider-Man" style="width: 100%; height: 100%; object-fit: cover; display: block;" />
        </div>

        <h2 class="chapter-title" style="font-size: clamp(36px, 5vw, 72px); letter-spacing: 0.05em; text-align: center; text-transform: uppercase; margin-top: 15px; text-shadow: 0 0 30px rgba(11,61,145,0.45);">
          A NEW<br/>BEGINNING.
        </h2>

        <p class="body-lg" style="margin-top: var(--space-md); text-align: center; max-width: 450px; font-family: var(--font-quote); font-style: italic; color: #E0E0E0; line-height: 1.75;">
          No one to call him. No one waiting at home. Just a city that needed a hero. And a boy who could never say no.
        </p>
      </div>
    </div>
  `;

  section.style.minHeight = '100vh';
  section.style.display = 'flex';
  section.style.alignItems = 'center';
  section.style.background = '#050505';
  section.style.padding = 'var(--space-section) 0';
}

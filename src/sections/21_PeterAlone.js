/**
 * 21 — Peter Alone
 * "No One Remembers."
 * Uses: spidey iron.jpg (original 2:1 landscape ratio) on the left side
 */

export function initPeterAlone() {
  const section = document.getElementById('section-alone');
  if (!section) return;

  const namesLost = ['MJ', 'AUNT MAY', 'NED', 'TONY STARK', 'HAPPY HOGAN'];

  section.innerHTML = `
    <div class="alone-content container" style="display: grid; grid-template-columns: 1.2fr 1fr; gap: var(--space-xl); align-items: center; width: 100%; max-width: var(--container-width);">
      <!-- Left side: Spidey Iron image in its original 2:1 ratio -->
      <div class="alone-figure" data-reveal-left style="display: flex; justify-content: center; align-items: center; width: 100%; height: auto;">
        <div style="width: 100%; max-width: 550px; aspect-ratio: 2/1; border-radius: 12px; overflow: hidden; border: 1px solid rgba(255, 46, 54, 0.25); box-shadow: 0 20px 50px rgba(0,0,0,0.95), 0 0 30px rgba(255,46,54,0.15);">
          <img src="/spidey iron.jpg" alt="Peter and Tony Stark" style="width: 100%; height: 100%; object-fit: cover; display: block;" />
        </div>
      </div>

      <!-- Right side: Text details -->
      <div class="alone-negative-space" style="position: relative; z-index: 10; height: auto;">
        <div class="alone-text" data-reveal-right style="display: flex; flex-direction: column; justify-content: center; height: 100%;">
          <h2 class="chapter-title" style="color:var(--white); font-size: clamp(40px, 6vw, 80px); line-height: 1.0; text-transform: uppercase;">
            NO ONE<br/>REMEMBERS.
          </h2>
          <p class="body-lg" style="margin-top:var(--space-lg); max-width:480px; color:#A8A8A8; font-size: 16px; line-height: 1.75;">
            No Tony. No May. No MJ. No Ned.<br/><br/>
            Peter Parker. Completely alone. In a new apartment. With a new suit. And a responsibility that never ends.
          </p>

          <!-- Clean left-aligned lost memory list -->
          <div class="alone-names-lost" aria-label="People who no longer remember Peter" style="display: flex; flex-direction: column; gap: 14px; margin-top: 35px; align-items: flex-start;">
            ${namesLost.map(name => `
              <div style="display: flex; align-items: center; gap: 12px;">
                <span style="width: 6px; height: 6px; background-color: var(--spider-red); border-radius: 50%; display: inline-block; opacity: 0.7; filter: drop-shadow(0 0 4px var(--spider-red));"></span>
                <span class="alone-name" style="font-size: 12px; letter-spacing: 0.25em; color: rgba(255,255,255,0.5); text-transform: uppercase; font-weight: 700; text-decoration: line-through; text-decoration-color: var(--spider-red); display: inline-block;">
                  ${name}
                </span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;

  section.classList.add('section--full-vh');
  section.style.minHeight = '100vh';
  section.style.display = 'flex';
  section.style.alignItems = 'center';
  section.style.background = '#050505';
  section.style.padding = 'var(--space-section) 0';
}

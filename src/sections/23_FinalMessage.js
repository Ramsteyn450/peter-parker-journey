/**
 * 23 — Final Message
 * Line by line. The ultimate truth.
 */

import { ScrollManager } from '../components/ScrollManager.js';

export function initFinalMessage() {
  const section = document.getElementById('section-final');
  if (!section) return;

  section.innerHTML = `
    <div class="final-content" id="final-content">
      <p class="final-line" data-final-line>HE LOST HIS LOVE.</p>
      <p class="final-line" data-final-line style="transition-delay:0.8s">HE LOST HIS FAMILY.</p>
      <p class="final-line" data-final-line style="transition-delay:1.6s">HE LOST HIS OLD LIFE.</p>

      <div style="height:var(--space-xl)" aria-hidden="true"></div>

      <p class="final-line final-line--break" data-final-line style="transition-delay:2.6s">
        BUT HE NEVER LOST<br/>HIS RESPONSIBILITY.
      </p>

      <div style="height:var(--space-xl)" aria-hidden="true"></div>

      <h2 class="final-name" data-final-name style="color:var(--muted-white);">
        PETER PARKER
      </h2>
      <h2 class="final-name final-name--red" data-final-name style="transition-delay:0.6s">
        SPIDER&#8209;MAN
      </h2>
    </div>
  `;

  section.classList.add('section--full-vh');

  // Sequential reveal
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      section.querySelectorAll('[data-final-line], [data-final-name]').forEach(el => {
        el.classList.add('revealed');
      });
      observer.disconnect();
    }
  }, { threshold: 0.3 });

  observer.observe(section);
}

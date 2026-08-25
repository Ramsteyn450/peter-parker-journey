/**
 * 02 — Origin: The Beginning
 * Uses: peter1.webp (Tom Holland smiling) & peter intro.mp4
 * Theme: Pure Cinematic Red & Black
 */

export function initOrigin() {
  const section = document.getElementById('section-origin');
  if (!section) return;

  section.style.background = 'linear-gradient(135deg, #050505 0%, #0d0003 50%, #050505 100%)';
  section.style.padding = 'var(--space-section) 0';

  section.innerHTML = `
    <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 var(--space-lg);">
      <div class="origin-grid" style="display:grid;grid-template-columns:1.1fr 0.9fr;gap:var(--space-2xl);align-items:center;">
        
        <!-- Interactive Cinematic Memory Window -->
        <div class="origin-image-side" data-reveal-left style="width: 100%; display: flex; justify-content: center;">
          <div class="cinematic-memory-window" 
               data-video-src="/peter intro.mp4" 
               data-poster="/peter1.webp"
               data-title="Peter Parker: The Boy Behind the Mask"
               data-caption="A teenager with the mind of a scientist and the heart of a hero before everything changed."
               data-chapter="ORIGIN"
               style="width: 100%; max-width: 680px;">
          </div>
        </div>

        <!-- Content side -->
        <div class="origin-content-side">
          <p class="label label-red" data-reveal style="color:#FF2E36;font-size:13px;letter-spacing:0.4em;font-weight:700;margin-bottom:var(--space-xs);">CHAPTER 01</p>
          <h2 class="chapter-title" data-reveal style="color:#FFFFFF;font-size:clamp(44px,7vw,90px);line-height:0.95;text-shadow:0 0 30px rgba(255,46,54,0.45);text-transform:uppercase;">
            PETER <span style="color:#FF2E36;">PARKER</span>
          </h2>
          <p class="body-lg" data-reveal style="color:#E0E0E0;font-size:clamp(17px,1.6vw,22px);line-height:1.6;font-family:var(--font-quote);font-style:italic;margin-top: 10px;">
            "Before the mask, there was Peter. Before the hero, there was a kid."
          </p>
          <p class="body-lg" data-reveal style="margin-top:var(--space-md);color:#A8A8A8;font-size:16px;line-height:1.6;">
            A brilliant, lonely teenager from Queens raised by his Aunt May. Ordinary — except that he never was.
          </p>

          <div class="origin-facts" data-reveal style="margin-top:var(--space-xl);display:flex;flex-direction:column;gap:var(--space-md);">
            ${[
              ['QUEENS, NEW YORK', 'Peter Benjamin Parker grew up in Forest Hills, Midtown High School student.'],
              ['THE BOY BEHIND THE MASK', 'A kid who wanted to make a difference, struggling to balance normal life with destiny.'],
              ['RADIOACTIVE SPIDER', 'One bite. Everything changed.'],
            ].map(([title, desc]) => `
              <div class="origin-fact" style="display:flex;gap:16px;align-items:flex-start;padding:16px;background:rgba(255,46,54,0.04);border-left:3px solid #FF2E36;border-radius:0 8px 8px 0;backdrop-filter:blur(8px);border-top:1px solid rgba(255,255,255,0.02);border-right:1px solid rgba(255,255,255,0.02);">
                <div>
                  <p class="label label-red" style="margin-bottom:4px;color:#FF555A;font-weight:700;font-size:12px;letter-spacing:0.25em;">${title}</p>
                  <p style="font-size:15px;line-height:1.5;color:#E0E0E0;">${desc}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

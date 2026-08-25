/**
 * 19 — MJ Forgets Peter
 * Uses: peter1.webp (Peter's warm smile in coffee shop)
 * BRIGHT VIBRANT OVERHAUL
 */

import { ScrollManager } from '../components/ScrollManager.js';

export function initMJForgets() {
  const section = document.getElementById('section-mj-forgets');
  if (!section) return;

  section.style.background = 'linear-gradient(135deg, #1c0a0e 0%, #3d141d 50%, #1c0a0e 100%)';
  section.style.padding = 'var(--space-section) 0';

  section.innerHTML = `
    <div class="mj-forgets-layout" style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-2xl);align-items:center;max-width:1200px;margin:0 auto;padding:0 var(--space-lg);">
      <!-- Real image: peter1.webp -->
      <div class="mj-forgets-img-side" data-reveal-left style="position:relative;width:100%;aspect-ratio:4/5;border-radius:12px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,0.9), 0 0 40px rgba(255,46,54,0.25);border:2px solid rgba(255,255,255,0.2);">
        <img src="/peter1.webp" alt="Peter Parker — NWH coffee shop" class="mj-forgets-img" style="width:100%;height:100%;object-fit:cover;display:block;filter:brightness(1.15) contrast(1.05);" />
        <div class="mj-forgets-img-overlay" style="position:absolute;inset:0;background:linear-gradient(to top, rgba(28,10,14,0.6) 0%, transparent 60%);"></div>
      </div>

      <!-- Text side -->
      <div class="mj-forgets-text-side" data-reveal-right>
        <p class="label label-red" style="margin-bottom:var(--space-xl);color:#FF2E36;font-size:13px;letter-spacing:0.4em;font-weight:700;">THE HARDEST MOMENT</p>

        <p class="mj-forgets-line" data-mj-forgets-line style="font-family:var(--font-display);font-size:clamp(36px,5vw,70px);color:#FFFFFF;letter-spacing:0.04em;line-height:1;">SHE FORGOT HIM.</p>

        <div style="height:var(--space-md)" aria-hidden="true"></div>

        <p class="mj-forgets-line mj-forgets-line--climax" data-mj-forgets-line
           style="font-family:var(--font-display);font-size:clamp(36px,5vw,70px);color:#FF2E36;letter-spacing:0.04em;line-height:1;text-shadow:0 0 30px rgba(255,46,54,0.8);">
          HE REMEMBERED EVERYTHING.
        </p>

        <div style="height:var(--space-lg)" aria-hidden="true"></div>

        <p class="mj-forgets-line--pause" data-mj-forgets-line style="color:#FFFFFF;font-size:clamp(17px,1.6vw,22px);line-height:1.6;background:rgba(255,255,255,0.06);padding:20px;border-left:3px solid #FF2E36;border-radius:0 8px 8px 0;backdrop-filter:blur(8px);">
          He walked in. She smiled the way she always did — warm,
          curious, kind. But she didn't know him. She didn't remember
          him. And Peter Parker — who could lift buildings, who had
          faced gods and monsters — smiled back.
          And chose not to say a word.
        </p>

        <div style="height:var(--space-lg)" aria-hidden="true"></div>

        <p class="mj-forgets-line" data-mj-forgets-line style="font-family:var(--font-display);font-size:clamp(28px,4vw,50px);color:#FFD700;letter-spacing:0.1em;text-shadow:0 0 20px rgba(255,215,0,0.5);">
          THAT WAS HIS SACRIFICE.
        </p>
      </div>
    </div>
  `;

  ScrollManager.initSequentialReveal(section, '[data-mj-forgets-line]', 0.4);
}

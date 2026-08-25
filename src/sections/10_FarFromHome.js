/**
 * 10 — Far From Home
 * "He just wanted to be normal."
 */

import { FFH_SCENES } from '../assets.config.js';

export function initFarFromHome() {
  const section = document.getElementById('section-far-from-home');
  if (!section) return;

  section.innerHTML = `
    <div class="ffh-grid container" style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-2xl);align-items:center;padding:var(--space-section) 0;">
      <!-- Content left -->
      <div>
        <p class="label label-red" data-reveal style="letter-spacing:0.4em;">CHAPTER 10</p>
        <h2 class="chapter-title" data-reveal style="transition-delay:0.1s;color:var(--white);font-size:clamp(40px,6vw,80px);margin-top:var(--space-xs);">
          FAR FROM<br/>HOME
        </h2>
        <p class="body-lg" data-reveal style="transition-delay:0.2s;margin-top:var(--space-lg);color:rgba(245,245,245,0.85);font-size:clamp(16px,1.5vw,20px);line-height:1.6;">
          Peter wanted one thing: a normal summer. A chance to tell MJ
          how he felt. A trip to Europe without saving the world.
        </p>
        <p class="body-lg" data-reveal style="transition-delay:0.3s;margin-top:var(--space-md);color:var(--spider-red);font-weight:600;">
          The world had other plans.
        </p>

        <div class="ffh-scenes" data-reveal style="transition-delay:0.4s;margin-top:var(--space-xl);display:flex;flex-direction:column;gap:var(--space-sm);">
          ${FFH_SCENES.map(s => `<p class="ffh-scene-item" style="color:var(--white);font-size:15px;letter-spacing:0.15em;text-transform:uppercase;padding:8px 16px;background:rgba(255,255,255,0.05);border-left:2px solid var(--spider-blue);border-radius:0 6px 6px 0;">${s}</p>`).join('')}
        </div>
      </div>

      <!-- Visual right -->
      <div style="display:flex;flex-direction:column;gap:var(--space-md);">
        <div style="
          height:380px;border-radius:12px;overflow:hidden;
          position:relative;border:1px solid rgba(11,61,145,0.3);
          box-shadow:0 20px 60px rgba(0,0,0,0.8), 0 0 40px rgba(11,61,145,0.25);
        " data-reveal style="transition-delay:0.1s">
          <img src="/peter4.jpg" alt="Far From Home Europe" style="width:100%;height:100%;object-fit:cover;filter:brightness(0.9) contrast(1.1);" />
          <div style="position:absolute;inset:0;background:linear-gradient(to top, rgba(5,5,5,0.8) 0%, transparent 60%);" aria-hidden="true"></div>
        </div>

        <div style="
          padding:var(--space-lg);
          border:1px solid rgba(255,245,245,0.15);
          background:rgba(11,61,145,0.1);
          border-radius:12px;
          backdrop-filter:blur(8px);
        " data-reveal style="transition-delay:0.2s">
          <p class="label label-red" style="margin-bottom:8px;letter-spacing:0.3em;">MYSTERIO</p>
          <p class="cinematic-quote" style="font-size:clamp(18px,2.2vw,24px);color:var(--white);">
            "The world needs the next Iron Man."
          </p>
          <p class="label" style="margin-top:12px;color:rgba(245,245,245,0.5);letter-spacing:0.2em;">— BUT PETER WASN'T TONY.</p>
        </div>
      </div>
    </div>
  `;

  section.classList.add('section--full-vh');
}

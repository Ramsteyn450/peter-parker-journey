/**
 * 03 — Becoming Spider-Man
 * Uses: peter2.webp (Spider-Man sitting on rooftop)
 * BRIGHT VIBRANT OVERHAUL
 */

export function initBecomingSpiderMan() {
  const section = document.getElementById('section-becoming');
  if (!section) return;

  section.style.background = 'linear-gradient(135deg, #180509 0%, #360a13 50%, #0d1e40 100%)';

  section.innerHTML = `
    <!-- Full bleed image background -->
    <div class="becoming-bg-img" style="position:absolute;inset:0;overflow:hidden;">
      <img src="/peter2.webp" alt="Spider-Man" class="becoming-img-full" style="width:100%;height:100%;object-fit:cover;object-position:center;filter:brightness(1.1) contrast(1.1);" />
      <div class="becoming-img-overlay" style="position:absolute;inset:0;background:linear-gradient(to bottom, rgba(10,5,8,0.5) 0%, rgba(10,5,8,0.3) 50%, rgba(10,5,8,0.85) 100%);"></div>
    </div>

    <div class="becoming-content" style="position:relative;z-index:3;max-width:850px;margin:0 auto;text-align:center;padding:var(--space-lg);">
      <div class="becoming-title-stack" data-reveal>
        <p class="label" style="letter-spacing:0.5em;color:#FFD700;font-size:14px;font-weight:700;margin-bottom:var(--space-md);text-shadow:0 0 12px rgba(255,215,0,0.5);">
          PETER PARKER BECAME
        </p>
        <h2 class="becoming-name" style="font-family:var(--font-display);font-size:clamp(60px,10vw,130px);color:#FF2E36;letter-spacing:0.04em;text-shadow:0 0 50px rgba(255,46,54,0.9), 0 0 100px rgba(255,46,54,0.4);line-height:0.95;">SPIDER&#8209;MAN</h2>
        <p class="body-lg" style="margin-top:var(--space-lg);max-width:600px;margin-left:auto;margin-right:auto;text-align:center;color:#FFFFFF;font-size:clamp(18px,2vw,24px);line-height:1.6;text-shadow:0 2px 20px rgba(0,0,0,0.9);">
          One bite from a radioactive spider. One moment of hesitation.
          One uncle who didn't need to die. And a boy who swore he never
          would let anyone else pay that price.
        </p>
      </div>
    </div>
  `;
}

/**
 * 15 — Aunt May: Loss / Sacrifice
 * Uses: peter3.webp (Peter bloody face)
 * BRIGHT VIBRANT OVERHAUL
 */

export function initAuntMay() {
  const section = document.getElementById('section-aunt-may');
  if (!section) return;

  section.style.background = 'linear-gradient(135deg, #1f070b 0%, #3d0e16 50%, #0d1224 100%)';
  section.style.padding = 'var(--space-section) 0';

  section.innerHTML = `
    <div class="aunt-may-layout" style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-2xl);align-items:center;max-width:1200px;margin:0 auto;padding:0 var(--space-lg);">
      <!-- Image side — peter3.webp: battered Peter face -->
      <div class="aunt-may-img-side" data-reveal-left style="position:relative;width:100%;aspect-ratio:4/5;border-radius:12px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,0.9), 0 0 40px rgba(255,46,54,0.3);border:2px solid rgba(255,46,54,0.3);">
        <img src="peter3.webp" alt="Peter Parker — After the sacrifice" class="aunt-may-img" style="width:100%;height:100%;object-fit:cover;display:block;filter:brightness(1.1) contrast(1.1);" />
        <div class="aunt-may-img-overlay" style="position:absolute;inset:0;background:linear-gradient(to top, rgba(31,7,11,0.7) 0%, transparent 60%);"></div>
      </div>

      <!-- Text side -->
      <div class="aunt-may-text-side" data-reveal-right>
        <p class="label label-red" style="margin-bottom:var(--space-lg);color:#FF2E36;font-size:13px;letter-spacing:0.4em;font-weight:700;">CHAPTER 15 — LOSS</p>

        <blockquote class="aunt-may-quote-block">
          <p style="color:#FFD700;font-size:14px;letter-spacing:0.35em;font-weight:700;margin-bottom:var(--space-md);text-shadow:0 0 10px rgba(255,215,0,0.5);">
            WITH GREAT POWER...
          </p>
          <h2 class="chapter-title" style="color:#FFFFFF;font-size:clamp(40px,6.5vw,85px);line-height:0.95;text-shadow:0 0 40px rgba(255,46,54,0.6);">
            COMES GREAT<br/><span style="color:#FF2E36;">RESPONSIBILITY.</span>
          </h2>
          <footer style="margin-top:var(--space-lg);">
            <p class="label label-red" style="color:#FF2E36;font-size:14px;letter-spacing:0.3em;font-weight:700;">— AUNT MAY</p>
          </footer>
        </blockquote>

        <p class="body-lg" style="margin-top:var(--space-xl);border-top:1px solid rgba(255,255,255,0.15);padding-top:var(--space-lg);color:#FFFFFF;font-size:clamp(17px,1.6vw,22px);line-height:1.6;">
          She gave him the most important words he would ever carry.
          And then she was gone. And Peter Parker would never be the same.
        </p>
      </div>
    </div>
  `;
}

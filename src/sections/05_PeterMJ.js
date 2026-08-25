/**
 * 05 — Peter & MJ: Love Section
 * Uses: peter4.jpg (MJ hugging Spider-Man in NYC streets)
 * BRIGHT VIBRANT OVERHAUL
 */

export function initPeterMJ() {
  const section = document.getElementById('section-love');
  if (!section) return;

  section.style.background = 'linear-gradient(135deg, #1f070d 0%, #420f1a 50%, #1f070d 100%)';

  section.innerHTML = `
    <!-- Full bleed MJ + Peter image -->
    <div class="mj-full-bg" style="position:absolute;inset:0;overflow:hidden;">
      <img src="peter4.jpg" alt="MJ and Spider-Man — Far From Home" class="mj-full-img" style="width:100%;height:100%;object-fit:cover;object-position:center 20%;filter:brightness(1.1) contrast(1.1);" />
      <div class="mj-full-overlay" style="position:absolute;inset:0;background:linear-gradient(to bottom, rgba(15,5,8,0.4) 0%, rgba(15,5,8,0.2) 40%, rgba(15,5,8,0.85) 100%);"></div>
    </div>

    <div class="mj-hero-text" data-reveal style="position:relative;z-index:3;text-align:center;max-width:850px;margin:0 auto var(--space-2xl);padding:var(--space-lg);">
      <p class="label label-red" style="margin-bottom:var(--space-md);color:#FF2E36;font-size:14px;letter-spacing:0.4em;font-weight:700;">CHAPTER 05</p>
      <h2 class="chapter-title" style="font-size:clamp(56px,9vw,120px);color:#FFFFFF;text-shadow:0 0 50px rgba(255,46,54,0.6), 0 4px 30px rgba(0,0,0,0.95);line-height:0.95;">
        PETER <span style="color:#FF2E36;">&</span> MJ
      </h2>
      <p class="body-lg" style="
        margin-top:var(--space-lg);
        max-width:550px;
        margin-left:auto;margin-right:auto;
        text-align:center;
        color:#FFFFFF;
        font-size:clamp(18px,2vw,24px);
        line-height:1.6;
        text-shadow:0 2px 20px rgba(0,0,0,0.9);
      ">
        She called him "loser." She quoted Plath at decathlons.
        She rolled her eyes at everything. And Peter Parker
        fell completely, helplessly in love with her.
      </p>
    </div>

    <!-- Love progression bottom -->
    <div class="love-progression-bar" data-reveal style="position:relative;z-index:3;display:flex;align-items:center;justify-content:center;gap:var(--space-md);flex-wrap:wrap;max-width:900px;margin:0 auto;padding:16px;background:rgba(255,46,54,0.15);border:1px solid rgba(255,46,54,0.4);border-radius:30px;backdrop-filter:blur(8px);">
      ${['FIRST GLANCE','FRIENDSHIP','FALLING','LOVE','HAPPINESS'].map(step => `
        <div class="love-step-item" style="display:flex;align-items:center;gap:8px;">
          <div class="love-step-dot" style="width:8px;height:8px;border-radius:50%;background:#FF2E36;box-shadow:0 0 10px #FF2E36;"></div>
          <p class="love-step-text" style="font-size:12px;letter-spacing:0.25em;color:#FFFFFF;font-weight:700;text-transform:uppercase;">${step}</p>
        </div>
      `).join('<div class="love-step-line" style="width:25px;height:2px;background:rgba(255,255,255,0.4);"></div>')}
    </div>
  `;
}

/**
 * 09 — Endgame
 * "Five Years Later..."
 */

export function initEndgame() {
  const section = document.getElementById('section-endgame');
  if (!section) return;

  section.innerHTML = `
    <div class="endgame-content container" style="text-align:center;padding:var(--space-section) 0;">
      <p class="endgame-time-jump" data-reveal style="font-family:var(--font-display);font-size:clamp(48px,8vw,110px);color:var(--white);letter-spacing:0.05em;text-shadow:0 0 50px rgba(11,61,145,0.6);">
        <span style="color:var(--spider-blue);">FIVE YEARS</span> LATER...
      </p>

      <div style="
        width:min(700px,90vw);aspect-ratio:16/9;
        margin:var(--space-xl) auto;
        border-radius:12px;overflow:hidden;
        border:1px solid rgba(11,61,145,0.3);
        box-shadow:0 20px 60px rgba(0,0,0,0.9), 0 0 50px rgba(11,61,145,0.3);
        position:relative;
      " data-reveal style="transition-delay:0.2s">
        <img src="peter2.webp" alt="Endgame Return" style="width:100%;height:100%;object-fit:cover;filter:brightness(0.9) contrast(1.1);" />
        <div style="
          position:absolute;inset:0;
          background:radial-gradient(circle at center,rgba(11,61,145,0.2) 0%,rgba(5,5,5,0.7) 100%);
        " aria-hidden="true"></div>
      </div>

      <div style="text-align:center;max-width:650px;margin:0 auto;" data-reveal style="transition-delay:0.3s">
        <p class="body-lg" style="margin-bottom:var(--space-md);color:var(--white);font-size:clamp(18px,2vw,22px);line-height:1.6;">
          They came back. Peter came back. But Tony Stark didn't.
        </p>
        <p class="body-lg" style="color:rgba(245,245,245,0.8);font-size:clamp(16px,1.5vw,18px);line-height:1.6;">
          The man who made him Spider-Man paid the ultimate price.
          Peter was left to carry that weight into whatever came next.
        </p>
      </div>

      <div style="
        margin-top:var(--space-xl);
        padding:var(--space-lg);
        border-left:3px solid var(--spider-red);
        background:rgba(230,36,41,0.05);
        border-radius:0 12px 12px 0;
        max-width:600px;margin-left:auto;margin-right:auto;
        text-align:left;
        box-shadow:0 10px 40px rgba(0,0,0,0.5);
      " data-reveal style="transition-delay:0.4s">
        <p class="cinematic-quote" style="color:var(--white);font-size:clamp(20px,2.5vw,28px);">
          "If you're nothing without the suit,<br/>
          then you shouldn't have it."
        </p>
        <p class="label label-red" style="margin-top:var(--space-md);letter-spacing:0.3em;">
          TONY STARK — IN MEMORIAM
        </p>
      </div>
    </div>
  `;

  section.classList.add('section--full-vh');
}

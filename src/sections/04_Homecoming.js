/**
 * 04 — Homecoming: The Homemade Suit & Tony Stark
 * Peter Parker built his first suit from scratch.
 * Natural layout with small cinematic breathing room — zero giant empty voids.
 * Includes "PETER HAPPY" celebration memory windows.
 */

export function initHomecoming() {
  const section = document.getElementById('section-homecoming');
  if (!section) return;

  section.style.minHeight = 'auto';
  section.style.padding = 'var(--space-2xl) 0 var(--space-xl)';
  section.style.background = 'linear-gradient(180deg, #050505 0%, #0c0812 50%, #050505 100%)';
  section.style.position = 'relative';

  section.innerHTML = `
    <div class="container" style="max-width:1100px;margin:0 auto;padding:0 var(--space-lg);position:relative;z-index:2;">
      <!-- Section Header -->
      <div style="text-align:center;margin-bottom:var(--space-xl);" data-reveal>
        <p class="label label-red" style="letter-spacing:0.4em;margin-bottom:var(--space-xs);color:#FF2E36;font-weight:700;">
          HOMECOMING — CHAPTER 02
        </p>
        <h2 class="chapter-title" style="color:#FFFFFF;font-size:clamp(44px,7vw,90px);letter-spacing:0.04em;text-shadow:0 0 40px rgba(11,61,145,0.4);text-transform:uppercase;">
          THE HOMEMADE <span style="color:#FF2E36;">SUIT</span>
        </h2>
        <p class="body-lg" style="margin-top:var(--space-md);max-width:620px;margin-left:auto;margin-right:auto;color:#E0E0E0;font-size:clamp(17px,1.6vw,22px);line-height:1.6;">
          Parker built his first suit from scratch. A kid trying to be a hero in the streets of Queens.
        </p>
      </div>

      <!-- Suit Showcase Cards Grid -->
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:var(--space-lg);margin-bottom:var(--space-xl);">
        <!-- Suit Card 1: Homemade -->
        <div class="becoming-suit-placeholder" style="
          border-radius:12px;overflow:hidden;background:rgba(11,61,145,0.1);border:1px solid rgba(255,46,54,0.25);
          box-shadow:0 20px 50px rgba(0,0,0,0.8),0 0 30px rgba(11,61,145,0.15);padding:24px;text-align:center;backdrop-filter:blur(8px);
        " data-reveal>
          <div style="width:100%;aspect-ratio:4/3;border-radius:8px;overflow:hidden;margin-bottom:16px;">
            <img src="peter2.webp" alt="Homemade Suit" style="width:100%;height:100%;object-fit:cover;filter:brightness(1.1) contrast(1.1);" />
          </div>
          <p class="label label-red" style="font-weight:700;margin-bottom:6px;color:#FF2E36;">QUEENS VIGILANTE</p>
          <p style="color:#FFFFFF;font-size:15px;line-height:1.5;">Sweatpants, goggles, and homemade web-shooters.</p>
        </div>

        <!-- Suit Card 2: Tony Stark Mentorship -->
        <div class="becoming-suit-placeholder" style="
          border-radius:12px;overflow:hidden;background:rgba(255,46,54,0.06);border:1px solid rgba(255,46,54,0.3);
          box-shadow:0 20px 50px rgba(0,0,0,0.8),0 0 30px rgba(230,36,41,0.2);padding:24px;text-align:center;backdrop-filter:blur(8px);
        " data-reveal style="transition-delay:0.15s">
          <div style="width:100%;aspect-ratio:4/3;border-radius:8px;overflow:hidden;margin-bottom:16px;">
            <img src="peter.png" alt="Stark Suit" style="width:100%;height:100%;object-fit:cover;object-position:center 30%;filter:brightness(1.1) contrast(1.1);" />
          </div>
          <p class="label label-red" style="font-weight:700;margin-bottom:6px;color:#FF2E36;">STARK UPGRADE</p>
          <p style="color:#FFFFFF;font-size:15px;line-height:1.5;">Advanced optics, AI assistance, and high-tensile webbing.</p>
        </div>
      </div>

      <!-- Tony Stark Quote Block -->
      <div style="
        max-width:800px;margin:0 auto var(--space-2xl) auto;text-align:center;padding:var(--space-lg);
        background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.1);
        border-radius:12px;box-shadow:0 20px 60px rgba(0,0,0,0.8);backdrop-filter:blur(8px);
      " data-reveal style="transition-delay:0.25s">
        <blockquote style="quotes:none;margin:0;">
          <p style="color:#FFFFFF;font-family:var(--font-quote);font-style:italic;font-size:clamp(22px,3.2vw,36px);line-height:1.4;text-shadow:0 2px 20px rgba(0,0,0,0.95);">
            "If you're nothing without the suit, then you shouldn't have it."
          </p>
          <footer style="margin-top:var(--space-md);color:#FF2E36;font-size:var(--fs-label);letter-spacing:0.35em;font-weight:700;">
            — TONY STARK
          </footer>
        </blockquote>
      </div>

      <!-- ==========================================
           PETER HAPPY — CELEBRATION MEMORY SECTION
           ========================================== -->
      <div class="peter-happy-section" style="
        margin-top: var(--space-3xl);
        padding-top: var(--space-2xl);
        border-top: 1px solid rgba(255, 46, 54, 0.12);
        display: flex;
        flex-direction: column;
        align-items: center;
      ">
        <div style="text-align: center; margin-bottom: var(--space-xl);">
          <p class="label label-red" style="letter-spacing: 0.35em; color: #FF2E36; font-weight: 700; margin-bottom: var(--space-xs);">
            MEMORABLE CLIMAX
          </p>
          <blockquote style="quotes: none; margin: 0; font-family: var(--font-quote); font-style: italic; color: #FFF; font-size: clamp(20px, 3vw, 32px); line-height: 1.4; text-shadow: 0 0 20px rgba(255, 46, 54, 0.35);">
            "FOR A MOMENT, THE CITY DIDN’T SEE A KID IN A MASK.<br/>
            <span style="color: #FF2E36;">THEY SAW A HERO.</span>"
          </blockquote>
        </div>

        <!-- Double Memory Cards Layout -->
        <div style="display: flex; gap: var(--space-xl); justify-content: center; flex-wrap: wrap; width: 100%; max-width: 900px;">
          <!-- Primary Celebration Memory Video Card -->
          <div class="cinematic-memory-window" 
               data-video-src="peter happy.mp4"
               data-poster="peter happy.jpg"
               data-title="The World Sees a Hero"
               data-caption="Peter Parker is celebrated by the city he protects. A moment of true joy and recognition before the storm."
               data-chapter="HOMECOMING"
               style="width: 380px; max-width: 90%;">
          </div>

          <!-- Secondary alternate STILL memory image Card -->
          <div class="cinematic-memory-window" 
               data-is-photo
               data-poster="peter happy 2.jpg"
               data-title="A Hero Embraced"
               data-caption="Spider-Man surrounded by the people of Queens who believe in him."
               data-chapter="HOMECOMING"
               style="width: 380px; max-width: 90%;">
          </div>
        </div>
      </div>

    </div>
  `;
}

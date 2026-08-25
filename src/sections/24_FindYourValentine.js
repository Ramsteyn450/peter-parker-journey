/**
 * 24 — Find Your Valentine
 * Final CTA. Heartbeat. Glowing Red Heart. Smooth cinematic transition.
 */

import { VALENTINE_SITE_URL } from '../assets.config.js';
import { soundSynth } from '../components/SoundSynthesizer.js';
import { heartParticles } from '../components/HeartParticleSystem.js';

export function initFindYourValentine() {
  const section = document.getElementById('section-valentine');
  if (!section) return;

  section.innerHTML = `
    <!-- Ambient pulse -->
    <div class="valentine-bg-pulse" aria-hidden="true"></div>

    <!-- Glowing Heart SVG Symbol -->
    <div class="valentine-heart" id="valentine-heart" aria-hidden="true" style="cursor:pointer;filter:drop-shadow(0 0 25px var(--spider-red));">
      <svg viewBox="0 0 100 100" width="80" height="80">
        <path d="M 50 30 C 35 10, 10 25, 10 50 C 10 70, 50 95, 50 95 C 50 95, 90 70, 90 50 C 90 25, 65 10, 50 30 Z" fill="var(--spider-red)" />
      </svg>
    </div>

    <!-- Title -->
    <h2 class="valentine-title" id="valentine-title" style="color:var(--white);text-shadow:0 0 30px rgba(229,9,20,0.55);">
      FIND YOUR<br/><span style="color:var(--spider-red);">VALENTINE</span>
    </h2>

    <!-- Story lines -->
    <div class="valentine-story" id="valentine-story">
      <p id="v-line-1" style="color:var(--white);font-size:clamp(18px,2vw,24px);">PETER PARKER FOUND LOVE.</p>
      <p id="v-line-2" style="color:var(--muted-white);font-size:clamp(18px,2vw,24px);">HE LOST IT.</p>
      <p id="v-line-3" style="color:var(--spider-red);font-size:clamp(18px,2vw,24px);">BUT HE NEVER STOPPED LOVING.</p>
    </div>

    <!-- CTA label -->
    <p class="valentine-cta-label" id="valentine-cta-label" style="color:var(--white);letter-spacing:0.35em;font-weight:700;">YOUR STORY STARTS HERE.</p>

    <!-- CTA button -->
    <div class="valentine-btn-wrap" id="valentine-btn-wrap">
      <a
        href="${VALENTINE_SITE_URL}"
        id="valentine-btn"
        target="_blank"
        rel="noopener noreferrer"
        class="btn-cinematic btn-valentine"
        aria-label="Find Your Valentine — opens in new tab"
        style="
          background: #050505;
          border: 1px solid var(--dark-red);
          color: var(--white);
          box-shadow: 0 0 20px rgba(229, 9, 20, 0.35);
          font-weight: 700;
        "
      >
        FIND YOUR VALENTINE
      </a>
    </div>

    <!-- Fine print -->
    <p style="
      position:absolute;bottom:var(--space-md);
      font-size:11px;letter-spacing:0.25em;
      color:rgba(255,255,255,0.4);text-align:center;
      text-transform:uppercase;
    " aria-hidden="true">
      PETER & MJ — FOREVER IN OUR HEARTS
    </p>
  `;

  section.classList.add('section--full-vh');
  _initValentineReveal(section);
  _bindValentineInteraction();
}

function _initValentineReveal(section) {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      soundSynth.playHeartbeat();
      heartParticles.setMode('VALENTINE');

      const heart     = document.getElementById('valentine-heart');
      const title     = document.getElementById('valentine-title');
      const vLine1    = document.getElementById('v-line-1');
      const vLine2    = document.getElementById('v-line-2');
      const vLine3    = document.getElementById('v-line-3');
      const ctaLabel  = document.getElementById('valentine-cta-label');
      const btnWrap   = document.getElementById('valentine-btn-wrap');

      const reveal = (el, delay) => {
        if (!el) return;
        setTimeout(() => el.classList.add('revealed'), delay);
      };

      reveal(heart,    200);
      reveal(title,    600);
      reveal(vLine1,  1200);
      reveal(vLine2,  1800);
      reveal(vLine3,  2400);
      reveal(ctaLabel, 3000);
      reveal(btnWrap,  3600);

      observer.disconnect();
    }
  }, { threshold: 0.2 });

  observer.observe(section);
}

function _bindValentineInteraction() {
  const btn = document.getElementById('valentine-btn');
  const heart = document.getElementById('valentine-heart');

  heart?.addEventListener('click', () => {
    soundSynth.playHeartbeat();
    heart.style.transform = 'scale(1.35)';
    setTimeout(() => { heart.style.transform = 'scale(1)'; }, 300);
  });

  btn?.addEventListener('mouseenter', () => {
    soundSynth.playHeartbeat();
  });

  btn?.addEventListener('click', () => {
    soundSynth.playWebShoot();
  });
}

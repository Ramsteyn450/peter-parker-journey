/**
 * ScrollManager — Scroll-driven reveal utility
 * Peter Parker: The Journey
 *
 * Uses IntersectionObserver for smooth reveals.
 * Includes a safety fallback so elements are NEVER left stuck hidden.
 */

export class ScrollManager {
  constructor() {
    this.observers = [];
    this._initReveal();
    this._initParallax();
    this._init3DReveals();
  }

  // ─── REVEAL ON SCROLL ────────────────────────────────────
  _initReveal() {
    const revealEls = document.querySelectorAll(
      '[data-reveal], [data-reveal-left], [data-reveal-right]'
    );

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.01, rootMargin: '100px 0px 100px 0px' });

    revealEls.forEach(el => observer.observe(el));
    this.observers.push(observer);

    // Fallback: Reveal all elements in top viewport automatically
    setTimeout(() => {
      revealEls.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight + 200) {
          el.classList.add('revealed');
        }
      });
    }, 300);

    // Ultimate fallback: Reveal everything if still unrevealed after 2s
    setTimeout(() => {
      revealEls.forEach(el => el.classList.add('revealed'));
    }, 2000);
  }

  // ─── PARALLAX LAYERS ─────────────────────────────────────
  _initParallax() {
    const pref = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (pref) return;

    const parallaxEls = document.querySelectorAll('[data-parallax]');
    if (!parallaxEls.length) return;

    const onScroll = () => {
      const scrollY = window.scrollY;
      parallaxEls.forEach(el => {
        const speed  = parseFloat(el.dataset.parallax) || 0.3;
        const rect   = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2 - window.innerHeight / 2;
        el.style.transform = `translateY(${center * speed}px)`;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // ─── HORIZONTAL SCROLL PROGRESS ──────────────────────────
  static getStickyProgress(triggerEl) {
    const rect   = triggerEl.getBoundingClientRect();
    const total  = triggerEl.offsetHeight - window.innerHeight;
    if (total <= 0) return 0;
    return Math.max(0, Math.min(1, -rect.top / total));
  }

  // ─── LOVE STORY SCROLL SEQUENCE ──────────────────────────
  static initLoveScroll(sectionEl) {
    const scenes   = sectionEl.querySelectorAll('.love-scene');
    const total    = scenes.length;
    if (!scenes.length) return;

    const update = () => {
      const progress = ScrollManager.getStickyProgress(sectionEl);
      const sceneIdx = Math.min(Math.floor(progress * total), total - 1);

      scenes.forEach((scene, i) => {
        scene.classList.toggle('active', i === sceneIdx);
      });
    };

    window.addEventListener('scroll', update, { passive: true });
  }

  // ─── HOMECOMING HORIZONTAL SCROLL ────────────────────────
  static initHomecomingScroll(sectionEl) {
    const track = sectionEl.querySelector('.homecoming-track');
    if (!track) return;

    const scenes     = track.querySelectorAll('.homecoming-scene');
    const sceneCount = scenes.length;

    const update = () => {
      const progress   = ScrollManager.getStickyProgress(sectionEl);
      const translateX = -(progress * (sceneCount - 1) * 100);
      track.style.transform = `translateX(${translateX}vw)`;
    };

    window.addEventListener('scroll', update, { passive: true });
  }

  // ─── THREE SPIDER-MEN MERGE ──────────────────────────────
  static initThreeSpiderMen(sectionEl) {
    const world1     = sectionEl.querySelector('.world-1');
    const world2     = sectionEl.querySelector('.world-2');
    const world3     = sectionEl.querySelector('.world-3');
    const titleOverlay = sectionEl.querySelector('.three-sm-title-overlay');
    if (!world1) return;

    const update = () => {
      const progress = ScrollManager.getStickyProgress(sectionEl);
      const pref = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (!pref) {
        if (progress < 0.5) {
          const p = progress / 0.5;
          world1.style.transform = `translateX(${p * 25}%)`;
          world3.style.transform = `translateX(${-p * 25}%)`;
        }
        if (progress >= 0.5) {
          world1.style.transform = 'translateX(25%)';
          world3.style.transform = 'translateX(-25%)';
        }
      }

      if (titleOverlay) {
        titleOverlay.classList.toggle('visible', progress >= 0.6);
      }
    };

    window.addEventListener('scroll', update, { passive: true });
  }

  // ─── SEQUENTIAL TEXT REVEAL (staggered) ──────────────────
  static initSequentialReveal(containerEl, childSelector, threshold = 0.1) {
    const children = containerEl.querySelectorAll(childSelector);

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        children.forEach((el, i) => {
          setTimeout(() => el.classList.add('revealed'), i * 400);
        });
        observer.unobserve(containerEl);
      }
    }, { threshold, rootMargin: '100px 0px 100px 0px' });

    observer.observe(containerEl);

    // Fallback reveal
    setTimeout(() => {
      children.forEach(el => el.classList.add('revealed'));
    }, 2000);
  }

  // ─── DISINTEGRATION TRIGGER ──────────────────────────────
  static initDisintegration(sectionEl) {
    const photos = sectionEl.querySelectorAll('.disintegration-photo');
    let timeouts = [];

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        // Clear any existing timeouts to prevent animation queueing
        timeouts.forEach(t => clearTimeout(t));
        timeouts = [];

        photos.forEach((photo, i) => {
          const t = setTimeout(() => {
            photo.classList.add('fading');
          }, i * 600);
          timeouts.push(t);
        });
      } else {
        // Scroll away: Cancel pending timeouts and remove fading state (fades back in)
        timeouts.forEach(t => clearTimeout(t));
        timeouts = [];

        photos.forEach((photo) => {
          photo.classList.remove('fading');
        });
      }
    }, { threshold: 0.1 });

    observer.observe(sectionEl);
  }

  _init3DReveals() {
    const sections = document.querySelectorAll('section.section');
    
    sections.forEach(section => {
      // Find the main content wrapper of each section
      const contentEl = section.querySelector('.container, .bnd-container, .fc-container, .love-scene-content, .becoming-content, .second-love-content, .peter-happy-section, .identity-chaos, .final-content');
      if (!contentEl) return;
      
      contentEl.classList.add('three-d-reveal');
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            
            // Notify global 3D Engine to adjust atmosphere settings for active section
            if (window.threeDEngine && section.id) {
              window.threeDEngine.setSection(`#${section.id}`);
            }
          } else {
            // Recede back to depth when out of view (gives clean exit transition)
            entry.target.classList.remove('active');
          }
        });
      }, { threshold: 0.08, rootMargin: '-50px 0px -50px 0px' });
      
      observer.observe(contentEl);
      this.observers.push(observer);
    });
  }
}

/**
 * Navigation — Redesigned Fullscreen chapter menu + progress indicator
 * Peter Parker: The Journey
 */

import { musicController } from './MusicController.js';

export class Navigation {
  constructor() {
    this.navEl          = document.getElementById('main-nav');
    this.menuBtn        = document.getElementById('nav-menu-btn');
    this.menuOverlay    = document.getElementById('chapter-menu');
    this.menuClose      = document.getElementById('chapter-menu-close');
    this.progressEl     = document.getElementById('journey-progress');
    this.progressDots   = [];
    this.spideyHandle   = document.getElementById('spidey-progress-handle');
    this.chapterLinks   = document.querySelectorAll('.chapter-link');

    this.isMenuOpen     = false;
    this.currentChapter = 0;
    this.isHidden       = false;

    this.targets = [
      '#section-hero',
      '#section-origin',
      '#section-becoming',
      '#section-homecoming',
      '#section-love',
      '#section-love-scroll',
      '#section-infinity-war',
      '#section-sacrifice',
      '#section-new-spiderman',
      '#section-brand-new-day',
      '#section-valentine',
      '#section-fan-challenge'
    ];

    this._init();
  }

  _init() {
    // Menu toggle
    this.menuBtn?.addEventListener('click', () => this.openMenu());
    this.menuClose?.addEventListener('click', () => this.closeMenu());

    // Close menu on link click
    this.chapterLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        this.closeMenu();
        setTimeout(() => {
          const target = document.querySelector(href);
          target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 400);
      });
    });

    // Scroll progress indicator inside the chapter menu overlay
    const menuNav = this.menuOverlay?.querySelector('.chapter-menu-nav');
    const menuHandle = document.getElementById('menu-spidey-handle');
    const menuLine = this.menuOverlay?.querySelector('.menu-progress-line');

    if (menuNav && menuHandle && menuLine) {
      menuNav.addEventListener('scroll', () => {
        const scrollTop = menuNav.scrollTop;
        const scrollHeight = menuNav.scrollHeight - menuNav.clientHeight;
        const scrollPercent = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
        
        menuHandle.style.top = `${scrollPercent}%`;
        menuLine.style.height = `${scrollPercent}%`;

        // 3D bulging carousel layout calculation on scrolling the links list
        const navRect = menuNav.getBoundingClientRect();
        const navCenter = navRect.top + navRect.height / 2;

        this.chapterLinks.forEach(link => {
          const linkRect = link.getBoundingClientRect();
          const linkCenter = linkRect.top + linkRect.height / 2;
          const dist = Math.abs(linkCenter - navCenter);
          const maxDist = navRect.height / 2;
          
          const t = Math.min(dist / maxDist, 1);
          const scale = 1 - t * 0.15;
          const zOffset = -t * 80;
          const opacity = 1 - t * 0.55;

          link.style.transform = `translate3d(0, 0, ${zOffset}px) scale(${scale})`;
          link.style.opacity = `${opacity}`;
        });
      }, { passive: true });
    }

    // Close on backdrop click
    this.menuOverlay?.addEventListener('click', (e) => {
      if (e.target === this.menuOverlay) this.closeMenu();
    });

    // Keyboard escape close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isMenuOpen) this.closeMenu();
    });

    // Update progress handle position on scroll
    window.addEventListener('scroll', () => this.updateProgressHandle(), { passive: true });
    this.updateProgressHandle();

    this._observeSections();
  }

  openMenu() {
    this.menuOverlay?.removeAttribute('hidden');
    this.menuOverlay?.classList.add('active');
    this.menuBtn?.setAttribute('aria-expanded', 'true');
    this.isMenuOpen = true;
    document.body.style.overflow = 'hidden';

    // Animate web strands drawing in
    const leftWeb = this.menuOverlay.querySelector('.menu-web-corner.top-left path');
    const rightWeb = this.menuOverlay.querySelector('.menu-web-corner.bottom-right path');
    if (leftWeb) leftWeb.style.strokeDashoffset = '0';
    if (rightWeb) rightWeb.style.strokeDashoffset = '0';

    // Animate menu links sequentially and trigger initial Z-axis positioning
    requestAnimationFrame(() => {
      this.chapterLinks.forEach((link, idx) => {
        link.style.transitionDelay = `${idx * 45}ms`;
        link.style.opacity = '1';
        link.style.transform = 'translate3d(0, 0, 0)';
      });
      
      // Trigger initial bulge projection helper
      setTimeout(() => {
        const menuNav = this.menuOverlay?.querySelector('.chapter-menu-nav');
        if (menuNav) menuNav.dispatchEvent(new Event('scroll'));
      }, 500);
    });
  }

  closeMenu() {
    if (this.menuOverlay) {
      this.menuOverlay.classList.remove('active');
      
      // Retract web strands
      const leftWeb = this.menuOverlay.querySelector('.menu-web-corner.top-left path');
      const rightWeb = this.menuOverlay.querySelector('.menu-web-corner.bottom-right path');
      if (leftWeb) leftWeb.style.strokeDashoffset = '300';
      if (rightWeb) rightWeb.style.strokeDashoffset = '300';

      this.chapterLinks.forEach((link) => {
        link.style.transitionDelay = '';
        link.style.transform = 'translate3d(0, 15px, -80px)';
        link.style.opacity = '0';
      });

      setTimeout(() => {
        this.menuOverlay.setAttribute('hidden', '');
        this.menuBtn?.setAttribute('aria-expanded', 'false');
        this.isMenuOpen = false;
        document.body.style.overflow = '';
      }, 500);
    }
  }

  updateChapter(chapterIndex) {
    if (this.currentChapter === chapterIndex) return;
    this.currentChapter = chapterIndex;

    this.dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === chapterIndex);
    });

    this.chapterLinks.forEach(link => {
      link.classList.toggle('active',
        parseInt(link.dataset.chapter) === chapterIndex
      );
    });

    // Centralized music track determination on chapter change
    if (this.targets[chapterIndex]) {
      musicController.onSectionIntersect(this.targets[chapterIndex]);
    }
  }

  hide() {
    if (this.isHidden) return;
    this.isHidden = true;
    this.navEl?.classList.add('nav-hidden');
    this.progressEl?.classList.add('progress-hidden');
  }

  show() {
    this.isHidden = false;
    this.navEl?.classList.remove('nav-hidden');
    this.progressEl?.classList.remove('progress-hidden');
  }

  _observeSections() {
    // Observe all targets
    this.targets.forEach((selector, i) => {
      const section = document.querySelector(selector);
      if (!section) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.updateChapter(i);
          }
        });
      }, { threshold: 0.35 });

      observer.observe(section);
    });
  }

  updateProgressHandle() {
    if (!this.spideyHandle) return;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    
    // Constrain the handle within viewport limits (2% to 98%) to keep emblem fully visible
    const topVal = 2 + (scrollPercent / 100) * 96;
    this.spideyHandle.style.top = `${topVal}%`;

    // Tiny depth movement based on scrolling speed
    const zPulse = Math.sin(scrollTop * 0.008) * 2.5; // soft 2.5px Z fluctuation
    this.spideyHandle.style.transform = `translate(-50%, -50%) translate3d(0, 0, ${10 + zPulse}px)`;

    // Dynamic upper line: height of line equals handle position
    const lineEl = this.progressEl?.querySelector('.progress-line');
    if (lineEl) {
      lineEl.style.height = `${topVal}%`;
    }
  }
}

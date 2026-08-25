/**
 * main.js — Application Bootstrap
 * Peter Parker: The Journey
 *
 * FIXED: Populate DOM immediately so the page is never blank/black!
 */

import './styles/main.css';

// ─── COMPONENTS ──────────────────────────────────────────────
import { Loader }          from './components/Loader.js';
import { CustomCursor }    from './components/CustomCursor.js';
import { Navigation }      from './components/Navigation.js';
import { musicController } from './components/MusicController.js';
import { MemoryViewer }    from './components/MemoryWall.js';
import { ScrollManager }   from './components/ScrollManager.js';
import { CinematicEngine } from './components/CinematicEngine.js';
import { WebPhysics }      from './components/WebPhysics.js';
import { cinematicMemoryManager } from './components/CinematicMemoryManager.js';
import { ThreeDEngine }     from './components/ThreeDEngine.js';

// ─── SECTIONS ────────────────────────────────────────────────
import { initHero }                from './sections/01_Hero.js';
import { initOrigin }              from './sections/02_Origin.js';
import { initBecomingSpiderMan }   from './sections/03_BecomingSpiderMan.js';
import { initHomecoming }          from './sections/04_Homecoming.js';
import { initPeterMJ }             from './sections/05_PeterMJ.js';
import { initMJMemoryWall }        from './sections/06_MJMemoryWall.js';
import { initLoveStory }           from './sections/07_LoveStory.js';
import { initInfinityWar }         from './sections/08_InfinityWar.js';
import { initEndgame }             from './sections/09_Endgame.js';
import { initFarFromHome }         from './sections/10_FarFromHome.js';
import { initIdentityReveal }      from './sections/11_IdentityReveal.js';
import { initNoWayHome }           from './sections/12_NoWayHome.js';
import { initThreeSpiderMen }      from './sections/13_ThreeSpiderMen.js';
import { initSecondLove }          from './sections/14_SecondLove.js';
import { initAuntMay }             from './sections/15_AuntMay.js';
import { initPeterMindSection }    from './sections/16_PeterMind.js';
import { initTheChoice }           from './sections/17_TheChoice.js';
import { initSacrifice }           from './sections/18_Sacrifice.js';
import { initMJForgets }           from './sections/19_MJForgets.js';
import { initMemoryDisintegration} from './sections/20_MemoryDisintegration.js';
import { initPeterAlone }          from './sections/21_PeterAlone.js';
import { initNewSpiderMan }        from './sections/22_NewSpiderMan.js';
import { initFinalMessage }        from './sections/23_FinalMessage.js';
import { initFindYourValentine }   from './sections/24_FindYourValentine.js';
import { initBrandNewDaySection }  from './sections/25_BrandNewDay.js';
import { initFanChallengeSection } from './sections/26_FanChallenge.js';

let isAppInitialized = false;

function initApp() {
  if (isAppInitialized) return;
  isAppInitialized = true;

  // 1. Custom Cursor
  new CustomCursor();

  // 1.5 Global 3D Atmosphere, Parallax & Particles Engine
  window.threeDEngine = new ThreeDEngine();

  // 2. Navigation (chapter menu + progress bar + scroll detection)
  new Navigation();

  // 3. Memory Viewer (shared across sections)
  const memoryViewer = new MemoryViewer();

  // 4. Initialize all sections IMMEDIATELY so HTML/images are in DOM
  initHero();
  initOrigin();
  initBecomingSpiderMan();
  initHomecoming();
  initPeterMJ();
  initMJMemoryWall(memoryViewer);
  initLoveStory();
  initInfinityWar();
  initEndgame();
  initFarFromHome();
  initIdentityReveal();
  initNoWayHome();
  initThreeSpiderMen();
  initSecondLove();
  initAuntMay();
  initPeterMindSection();
  initTheChoice();
  initSacrifice();
  initMJForgets();
  initMemoryDisintegration();
  initPeterAlone();
  initNewSpiderMan();
  initFinalMessage();
  initFindYourValentine();
  initBrandNewDaySection();
  initFanChallengeSection();

  // 5. Global scroll reveal (after all sections are in DOM)
  new ScrollManager();

  // 6. Horizontal Scroll Integrations
  const homecomingEl = document.getElementById('section-homecoming');
  if (homecomingEl) ScrollManager.initHomecomingScroll(homecomingEl);

  const loveScrollEl = document.getElementById('section-love-scroll');
  if (loveScrollEl) ScrollManager.initLoveScroll(loveScrollEl);

  const threeSMElements = document.getElementById('section-three-spidermen');
  if (threeSMElements) ScrollManager.initThreeSpiderMen(threeSMElements);

  const disintegrationEl = document.getElementById('section-disintegration');
  if (disintegrationEl) ScrollManager.initDisintegration(disintegrationEl);

  // 7. Interactive Web Physics & Spring Tension
  new WebPhysics();

  // 8. Easter eggs
  _initEasterEggs();

  // 9. Restore music after sacrifice section
  _initMusicRestore();

  console.log('🕷 Peter Parker: The Journey — initialized DOM sections.');
}

// ─── IMMEDIATE INITIALIZATION ──────────────────────────────
function safeStart() {
  try {
    initApp();
  } catch (err) {
    console.error('[APP] Error during initApp:', err);
  }

  try {
    const loader = new Loader(() => {
      try {
        musicController.unlock();
      } catch (e) {}
    });
    loader.start();
  } catch (err) {
    console.error('[LOADER] Error starting loader:', err);
    document.getElementById('loader')?.remove();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', safeStart);
} else {
  safeStart();
}

// ─── EASTER EGGS ─────────────────────────────────────────────
function _initEasterEggs() {
  const overlay  = document.getElementById('easter-egg-overlay');
  const textEl   = overlay?.querySelector('.easter-egg-text');
  let eggShown   = false;

  const showEgg = (msg) => {
    if (!overlay || !textEl || eggShown) return;
    eggShown = true;
    textEl.textContent = msg;
    overlay.removeAttribute('hidden');
    overlay.classList.add('active');

    setTimeout(() => {
      overlay.style.animation = 'fade-out 0.4s ease forwards';
      setTimeout(() => {
        overlay.setAttribute('hidden', '');
        overlay.classList.remove('active');
        overlay.style.animation = '';
        eggShown = false;
      }, 400);
    }, 3000);
  };

  // Easter egg 1: Click nav logo 3 times
  let logoClicks = 0;
  document.querySelector('.nav-logo')?.addEventListener('click', (e) => {
    e.preventDefault();
    logoClicks++;
    if (logoClicks >= 3) {
      logoClicks = 0;
      showEgg('"ANYONE CAN WEAR THE MASK."');
    }
  });

  // Easter egg 2: Konami code variation (up up down down)
  let keySequence = [];
  const secret = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown'];
  document.addEventListener('keydown', (e) => {
    keySequence.push(e.key);
    if (keySequence.length > 4) keySequence.shift();
    if (JSON.stringify(keySequence) === JSON.stringify(secret)) {
      showEgg('"PETER PARKER."');
      keySequence = [];
    }
  });

  // Easter egg 3: Click the spider web in hero section 2x
  let webClicks = 0;
  const webEl = document.getElementById('hero-web');
  webEl?.addEventListener('click', () => {
    webClicks++;
    if (webClicks >= 2) {
      webClicks = 0;
      showEgg('"WITH GREAT POWER COMES GREAT RESPONSIBILITY."');
    }
  });
}

// ─── MUSIC RESTORE AFTER SACRIFICE ───────────────────────────
function _initMusicRestore() {
  const aloneSection = document.getElementById('section-alone');
  if (!aloneSection) return;

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      musicController.resume();
    }
  }, { threshold: 0.3 });

  observer.observe(aloneSection);
}

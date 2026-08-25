/**
 * 26 — Spider-Man Fan Challenge: How Big a Fan Are You?
 * Peter Parker: The Journey
 */

import { musicController } from '../components/MusicController.js';
import { soundSynth } from '../components/SoundSynthesizer.js';

export function initFanChallengeSection() {
  const section = document.getElementById('section-fan-challenge');
  if (!section) return;

  section.style.minHeight = '100vh';
  section.style.background = '#050505';
  section.style.position = 'relative';
  section.style.overflow = 'hidden';
  section.style.display = 'flex';
  section.style.alignItems = 'center';
  section.style.justifyContent = 'center';
  section.style.padding = 'var(--space-2xl) 0';

  // 30 UNIQUE QUESTIONS (10 Easy, 10 Medium, 10 Hard)
  const questionBank = {
    easy: [
      {
        id: 1,
        category: "Characters",
        question: "Who raised Peter Parker after his parents disappeared?",
        options: ["Aunt May & Uncle Ben", "Aunt Harriet & Uncle George", "Happy Hogan & Pepper Potts", "Professor Charles Xavier"],
        answer: 0,
        explanation: "Uncle Ben and Aunt May raised Peter in Forest Hills, Queens, as their own son."
      },
      {
        id: 2,
        category: "Locations",
        question: "Which New York City borough does Peter Parker grow up in?",
        options: ["Brooklyn", "Manhattan", "Queens", "The Bronx"],
        answer: 2,
        explanation: "Peter is famously the friendly neighborhood hero from Queens."
      },
      {
        id: 3,
        category: "Spider-Man History",
        question: "What specific event grants Peter Parker his arachnid powers?",
        options: ["A lightning strike", "A radioactive spider bite", "A genetic experiment by his father", "A lab chemical explosion"],
        answer: 1,
        explanation: "A radioactive spider bite during a science demonstration alters Peter's DNA."
      },
      {
        id: 4,
        category: "Characters",
        question: "Which newspaper does Peter sell photographs of Spider-Man to?",
        options: ["The Daily Bugle", "The Daily Planet", "The New York Times", "Gotham Gazette"],
        answer: 0,
        explanation: "J. Jonah Jameson hires Peter to snap photos for the Daily Bugle."
      },
      {
        id: 5,
        category: "Movies",
        question: "Who is Peter Parker's best friend in the MCU Spider-Man trilogy?",
        options: ["Harry Osborn", "Ned Leeds", "Flash Thompson", "Gwen Stacy"],
        answer: 1,
        explanation: "Ned Leeds is Peter's high-school best friend and his 'guy in the chair'."
      },
      {
        id: 6,
        category: "Movies",
        question: "What is MJ's full name in the MCU Spider-Man movies?",
        options: ["Mary Jane Watson", "Michelle Jones-Watson", "Madeline Joyce", "Martha Jameson"],
        answer: 1,
        explanation: "She is Michelle Jones-Watson, commonly called MJ by Peter and Ned."
      },
      {
        id: 7,
        category: "Movies",
        question: "Who directed the original Spider-Man film trilogy (2002-2007)?",
        options: ["Marc Webb", "Jon Watts", "Sam Raimi", "Christopher Nolan"],
        answer: 2,
        explanation: "Sam Raimi directed the legendary trilogy starring Tobey Maguire."
      },
      {
        id: 8,
        category: "Suits",
        question: "What color is the primary base of Spider-Man's classic suit?",
        options: ["Black & Yellow", "Red & Blue", "Green & Silver", "Purple & Orange"],
        answer: 1,
        explanation: "The iconic classic suit features red and blue colors with web patterns."
      },
      {
        id: 9,
        category: "Characters",
        question: "Who is Spider-Man's love interest who falls from a bridge in the comics?",
        options: ["Mary Jane Watson", "Gwen Stacy", "Felicia Hardy", "Betty Brant"],
        answer: 1,
        explanation: "Gwen Stacy tragically falls to her death in The Amazing Spider-Man #121."
      },
      {
        id: 10,
        category: "Iconic Moments",
        question: "Whose death directly inspires Peter's life of heroics?",
        options: ["Aunt May", "Uncle Ben", "Tony Stark", "Gwen Stacy"],
        answer: 1,
        explanation: "Uncle Ben's tragic murder makes Peter realize that with great power comes great responsibility."
      }
    ],
    medium: [
      {
        id: 11,
        category: "Villains",
        question: "Which villain is the father of Peter's friend Harry Osborn?",
        options: ["Doctor Octopus", "Green Goblin", "The Sandman", "Mysterio"],
        answer: 1,
        explanation: "Norman Osborn, Harry's father, is the villainous Green Goblin."
      },
      {
        id: 12,
        category: "Suits",
        question: "What is the high-tech suit built for Peter by Tony Stark in Avengers: Infinity War?",
        options: ["The Stealth Suit", "The Stark Suit", "The Iron Spider", "The Velocity Suit"],
        answer: 2,
        explanation: "Tony Stark designs the nano-tech Iron Spider suit to help Peter fight in space."
      },
      {
        id: 13,
        category: "Iconic Moments",
        question: "Where does Peter ring a giant bell to tear off the alien symbiote?",
        options: ["Empire State University lab", "A church bell tower", "The Daily Bugle roof", "Grand Central Station"],
        answer: 1,
        explanation: "The heavy sonic vibrations of the church bell help Peter strip off the symbiote suit."
      },
      {
        id: 14,
        category: "Movies",
        question: "Which actor plays Peter Parker in The Amazing Spider-Man duology?",
        options: ["Tobey Maguire", "Tom Holland", "Andrew Garfield", "Jake Gyllenhaal"],
        answer: 2,
        explanation: "Andrew Garfield plays Peter Parker in the 2012 and 2014 films."
      },
      {
        id: 15,
        category: "Villains",
        question: "What is the name of the scientist who becomes Doctor Octopus?",
        options: ["Otto Octavius", "Curt Connors", "Max Dillon", "Quentin Beck"],
        answer: 0,
        explanation: "Dr. Otto Octavius becomes the mechanical-armed villain Doc Ock."
      },
      {
        id: 16,
        category: "Movies",
        question: "Which song plays during Miles Morales' leap of faith in Into the Spider-Verse?",
        options: ["Elevate", "Sunflower", "Whats Up Danger", "Start a Riot"],
        answer: 2,
        explanation: "'What's Up Danger' by Blackway & Black Caviar scores this iconic scene."
      },
      {
        id: 17,
        category: "Villains",
        question: "Who is the deceptive villain in Spider-Man: Far From Home?",
        options: ["Vulture", "Electro", "Mysterio", "Green Goblin"],
        answer: 2,
        explanation: "Quentin Beck uses hologram technology to pose as Mysterio, a hero from another world."
      },
      {
        id: 18,
        category: "Villains",
        question: "Max Dillon gains electrical powers after falling into a tank of what?",
        options: ["Radioactive waste", "Electric eels", "Charged plasma", "Acidic compound"],
        answer: 1,
        explanation: "An accident involving Oscorp electric eels turns Max Dillon into Electro."
      },
      {
        id: 19,
        category: "Villains",
        question: "Who is the weapon creator Vulture in MCU Spider-Man: Homecoming?",
        options: ["Mac Gargan", "Herman Schultz", "Adrian Toomes", "Phineas Mason"],
        answer: 2,
        explanation: "Adrian Toomes leads a salvage crew and turns alien scrap metal into weaponry."
      },
      {
        id: 20,
        category: "Iconic Moments",
        question: "Finish the quote: 'With great power comes great...'",
        options: ["Destiny", "Responsibility", "Sacrifice", "Consequences"],
        answer: 1,
        explanation: "'With great power comes great responsibility' is the cornerstone of Spider-Man lore."
      }
    ],
    hard: [
      {
        id: 21,
        category: "Spider-Man History",
        question: "What universe designation number belongs to the main Marvel Comics Spider-Man?",
        options: ["Earth-1610", "Earth-616", "Earth-199999", "Earth-833"],
        answer: 1,
        explanation: "Earth-616 is the standard home universe for the classic Marvel comics continuity."
      },
      {
        id: 22,
        category: "Characters",
        question: "Who is the female spider-hero bitten by the same spider as Peter Parker?",
        options: ["Gwen Stacy", "Jessica Drew", "Cindy Moon", "Anya Corazon"],
        answer: 2,
        explanation: "Cindy Moon (Silk) was bitten by the same radioactive spider moments after Peter."
      },
      {
        id: 23,
        category: "Spider-Man History",
        question: "Who is the very first opponent Peter fights in his first comic appearance?",
        options: ["Burglar", "Crusher Hogan", "The Chameleon", "Green Goblin"],
        answer: 1,
        explanation: "Peter tests his new strength in a wrestling match against Crusher Hogan in Amazing Fantasy #15."
      },
      {
        id: 24,
        category: "Movies",
        question: "What is the name of the Midtown Science decathlon captain in Homecoming?",
        options: ["Liz Allan", "Sally Avril", "Cindy Moon", "Gwen Stacy"],
        answer: 0,
        explanation: "Liz Allan (Adrian Toomes' daughter) is the captain of the academic decathlon team."
      },
      {
        id: 25,
        category: "Locations",
        question: "Where is the lab where Peter gets bitten in the 2002 Sam Raimi movie?",
        options: ["Columbia University", "Empire State University", "Stark Industries", "Oscorp Headquarters"],
        answer: 0,
        explanation: "Peter is bitten in the genetics laboratory during a field trip to Columbia University."
      },
      {
        id: 26,
        category: "Movies",
        question: "In No Way Home, what is the official name of Doctor Strange's memory spell?",
        options: ["Runic Dispersal", "Spell of the Dark Dimension", "Runes of Kof-Kol", "Vapors of Valtorr"],
        answer: 2,
        explanation: "Doctor Strange casts the Runes of Kof-Kol spell to wipe memory of Peter Parker."
      },
      {
        id: 27,
        category: "Spider-Man History",
        question: "Who co-created Spider-Man alongside writer Stan Lee in 1962?",
        options: ["Jack Kirby", "Steve Ditko", "John Romita Sr.", "Bob Kane"],
        answer: 1,
        explanation: "Steve Ditko co-created and designed the look, suit, and gadgets of Spider-Man."
      },
      {
        id: 28,
        category: "Characters",
        question: "What is the name of Peter Parker's clone who became the Scarlet Spider?",
        options: ["Ben Reilly", "Kaine Parker", "Miles Warren", "Peter Clone"],
        answer: 0,
        explanation: "Ben Reilly, created by the Jackal, fights crime under the moniker Scarlet Spider."
      },
      {
        id: 29,
        category: "Characters",
        question: "What is the name of the multi-dimensional spider-hero force led by Miguel O'Hara?",
        options: ["Web Warriors", "The Spider-Society", "Spider-Alliance", "Tangled Web"],
        answer: 1,
        explanation: "The Spider-Society operates out of Nueva York in Earth-928 to fix universe anomalies."
      },
      {
        id: 30,
        category: "Movies",
        question: "In MCU Homecoming, what Lego set do Ned and Peter plan to build?",
        options: ["Lego Death Star", "Lego Millennium Falcon", "Lego Stark Tower", "Lego Avengers Quinjet"],
        answer: 0,
        explanation: "Ned Leeds drops and shatters their Lego Death Star when he discovers Peter is Spider-Man."
      }
    ]
  };

  // State Variables
  let currentQuestions = [];
  let currentQuestionIndex = 0;
  let score = 0;
  let timerInterval = null;
  let startTime = null;

  // Shuffler using Fisher-Yates
  function shuffleArray(array) {
    const list = [...array];
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }
    return list;
  }

  // Pick exactly 5 questions: 1 Easy, 2 Medium, 2 Hard
  function generateQuizSet() {
    const easyShuffled = shuffleArray(questionBank.easy);
    const mediumShuffled = shuffleArray(questionBank.medium);
    const hardShuffled = shuffleArray(questionBank.hard);

    const selection = [
      easyShuffled[0],
      mediumShuffled[0],
      mediumShuffled[1],
      hardShuffled[0],
      hardShuffled[1]
    ];

    // Shuffle the final set so easy/medium/hard questions are mixed up
    currentQuestions = shuffleArray(selection);
    currentQuestionIndex = 0;
    score = 0;
  }

  // Main UI Markup
  section.innerHTML = `
    <!-- Dynamic Canvas Web Net Particle Background -->
    <canvas id="fc-bg-canvas" style="
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
      pointer-events: none;
    "></canvas>

    <!-- Dark Atmospheric Ambient Lights -->
    <div style="
      position: absolute;
      top: 30%;
      left: 15%;
      width: 400px;
      height: 400px;
      background: radial-gradient(circle, rgba(229, 9, 20, 0.08) 0%, rgba(5, 5, 5, 0) 70%);
      filter: blur(60px);
      pointer-events: none;
      z-index: 1;
    "></div>
    <div style="
      position: absolute;
      bottom: 20%;
      right: 15%;
      width: 500px;
      height: 500px;
      background: radial-gradient(circle, rgba(229, 9, 20, 0.06) 0%, rgba(5, 5, 5, 0) 70%);
      filter: blur(80px);
      pointer-events: none;
      z-index: 1;
    "></div>

    <div class="fc-container" style="
      width: 90%;
      max-width: 850px;
      margin: 0 auto;
      position: relative;
      z-index: 2;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    ">
      <!-- 1. LANDING/START STATE -->
      <div id="fc-start-panel" style="display: flex; flex-direction: column; align-items: center; gap: var(--space-md); width: 100%;">
        <span style="
          font-family: var(--font-display);
          font-size: 13px;
          letter-spacing: 0.35em;
          color: var(--spider-red);
          text-transform: uppercase;
        ">The Ultimate Fan Test</span>

        <h2 style="
          font-family: var(--font-display);
          font-size: clamp(34px, 5.5vw, 68px);
          color: var(--white);
          margin: 0;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          line-height: 1.1;
        ">
          HOW BIG A<br>
          <span style="color: var(--spider-red); text-shadow: 0 0 25px rgba(229, 9, 20, 0.35);">SPIDER-MAN FAN</span><br>
          ARE YOU?
        </h2>

        <p style="
          font-family: var(--font-quote);
          font-style: italic;
          font-size: clamp(15px, 1.8vw, 20px);
          color: var(--muted-white);
          max-width: 520px;
          line-height: 1.6;
          margin-top: 5px;
        ">
          "Five questions. One result. Let's see how well you know the web."
        </p>

        <button id="fc-start-btn" class="btn-cinematic" style="
          margin-top: var(--space-lg);
          background: var(--dark-red);
          border-color: var(--spider-red);
          padding: 16px 48px;
          font-weight: 700;
        ">START THE CHALLENGE</button>
      </div>

      <!-- 2. GAME WORKSPACE -->
      <div id="fc-game-panel" style="display: none; flex-direction: column; width: 100%; text-align: left; gap: var(--space-md);">
        <!-- Top Status Bar -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-xs);">
          <span id="fc-question-counter" style="
            font-family: var(--font-display);
            font-size: 13px;
            letter-spacing: 0.2em;
            color: var(--muted-gray);
            text-transform: uppercase;
          ">QUESTION 01 / 05</span>
          
          <span id="fc-timer" style="
            font-family: var(--font-display);
            font-size: 12px;
            letter-spacing: 0.1em;
            color: var(--spider-red);
          ">TIME: 00:00</span>
        </div>

        <!-- Progress Track Web Nodes -->
        <div style="display:flex; align-items:center; width:100%; gap:4px; margin-bottom: 5px;">
          <div id="fc-progress-bar-fill" style="
            height: 2px;
            width: 0%;
            background: var(--spider-red);
            box-shadow: 0 0 8px var(--spider-red);
            transition: width 0.4s ease;
          "></div>
          <div style="flex: 1; height: 1px; background: rgba(255, 255, 255, 0.08);"></div>
        </div>

        <div id="fc-progress-nodes" style="display: flex; justify-content: space-between; width: 100%; margin-bottom: 25px;">
          <!-- Active nodes inserted dynamically: 🔴, ○ -->
        </div>

        <!-- Interactive Question Card (with dynamic perspective / 3D transform) -->
        <div class="fc-card" style="
          background: rgba(15, 15, 15, 0.75);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(229, 9, 20, 0.2);
          border-radius: 8px;
          padding: clamp(20px, var(--space-xl), var(--space-2xl));
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.95);
          width: 100%;
          min-height: 280px;
          display: flex;
          flex-direction: column;
          gap: var(--space-lg);
          transition: transform 0.4s cubic-bezier(0.19, 1, 0.22, 1), border-color 0.4s ease, box-shadow 0.4s ease, opacity 0.4s ease;
          transform-style: preserve-3d;
          perspective: 1000px;
        ">
          <div id="fc-question-category" style="
            font-family: var(--font-display);
            font-size: 11px;
            letter-spacing: 0.3em;
            color: var(--spider-red);
            text-transform: uppercase;
          ">CATEGORY: ---</div>

          <h3 id="fc-question-text" style="
            font-family: var(--font-display);
            font-size: clamp(20px, 3.2vw, 30px);
            color: var(--white);
            line-height: 1.35;
            margin: 0;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          ">QUESTION TEXT</h3>

          <!-- Selection Stack -->
          <div id="fc-options-stack" style="
            display: flex;
            flex-direction: column;
            gap: 12px;
          ">
            <!-- Selectable buttons inserted dynamically -->
          </div>

          <!-- Bottom Explanation / Next wrapper -->
          <div id="fc-feedback-area" style="
            display: none;
            flex-direction: column;
            gap: 16px;
            border-top: 1px dashed rgba(255, 255, 255, 0.1);
            padding-top: var(--space-md);
            margin-top: var(--space-xs);
          ">
            <p id="fc-feedback-status" style="
              font-family: var(--font-display);
              font-size: 14px;
              letter-spacing: 0.15em;
              margin: 0;
              text-transform: uppercase;
              font-weight: 700;
            ">CORRECT</p>
            
            <p id="fc-explanation-text" style="
              font-size: 14px;
              line-height: 1.6;
              color: var(--muted-white);
              margin: 0;
            ">Explanation detail</p>

            <button id="fc-next-btn" class="btn-cinematic" style="
              align-self: flex-end;
              padding: 10px 24px;
              font-size: 11px;
              background: var(--dark-red);
              border-color: var(--spider-red);
            ">NEXT QUESTION →</button>
          </div>
        </div>
      </div>

      <!-- 3. RESULT VIEW -->
      <div id="fc-result-panel" style="display: none; flex-direction: column; align-items: center; width: 100%; gap: var(--space-md);">
        <!-- Giant Glowing Vector Spider Emblem -->
        <svg viewBox="0 0 100 100" style="
          width: 90px;
          height: 90px;
          fill: var(--spider-red);
          filter: drop-shadow(0 0 15px rgba(229, 9, 20, 0.7));
          opacity: 0;
          transform: scale(0.7);
          transition: transform 1.2s cubic-bezier(0.19, 1, 0.22, 1), opacity 1.2s ease;
        " id="fc-result-spider">
          <path d="M 50 15 C 47 25, 45 35, 45 42 C 45 48, 47 50, 50 50 C 53 50, 55 48, 55 42 C 55 35, 53 25, 50 15 Z M 50 50 C 42 55, 38 65, 38 72 C 38 82, 45 85, 50 85 C 55 85, 62 82, 62 72 C 62 65, 58 55, 50 50 Z M 45 42 C 30 35, 20 20, 15 10 C 18 22, 30 35, 43 40 M 55 42 C 70 35, 80 20, 85 10 C 82 22, 70 35, 57 40 M 44 48 C 25 50, 15 52, 5 55 C 15 58, 30 55, 43 52 M 56 48 C 75 50, 85 52, 95 55 C 85 58, 70 55, 57 52 M 45 55 C 28 65, 18 78, 8 90 C 18 82, 32 72, 45 62 M 55 55 C 72 65, 82 78, 92 90 C 82 82, 68 72, 55 62"/>
        </svg>

        <span style="
          font-family: var(--font-display);
          font-size: 13px;
          letter-spacing: 0.3em;
          color: var(--muted-gray);
          text-transform: uppercase;
          margin-top: 10px;
        ">Your Challenge Score</span>

        <!-- Animated Score Count -->
        <h3 id="fc-result-score" style="
          font-family: var(--font-display);
          font-size: clamp(56px, 9vw, 90px);
          color: var(--white);
          margin: 0;
          letter-spacing: 0.05em;
          line-height: 1;
        ">0 / 5</h3>

        <h4 id="fc-result-level" style="
          font-family: var(--font-display);
          font-size: clamp(24px, 4vw, 38px);
          color: var(--spider-red);
          text-shadow: 0 0 20px rgba(229, 9, 20, 0.45);
          margin: 10px 0 5px 0;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          opacity: 0;
          transform: translateY(20px);
          transition: transform 0.8s ease 0.4s, opacity 0.8s ease 0.4s;
        ">ROOKIE</h4>

        <p id="fc-result-desc" style="
          font-size: 15px;
          line-height: 1.6;
          color: var(--muted-white);
          max-width: 480px;
          margin: 0 0 30px 0;
          opacity: 0;
          filter: blur(5px);
          transition: opacity 0.8s ease 0.7s, filter 0.8s ease 0.7s;
        ">Description goes here.</p>

        <!-- Result Control Row -->
        <div style="display: flex; gap: 16px; flex-wrap: wrap; justify-content: center;">
          <button id="fc-btn-retry" class="btn-cinematic" style="
            background: var(--dark-red);
            border-color: var(--spider-red);
            font-weight: 700;
          ">TRY AGAIN</button>

          <button id="fc-btn-share" class="btn-cinematic" style="
            border-color: rgba(255,255,255,0.12);
          ">SHARE RESULT 🔗</button>
          
          <button id="fc-btn-back" class="btn-cinematic" style="
            border-color: rgba(255,255,255,0.12);
          ">BACK TO JOURNEY</button>
        </div>
      </div>
    </div>
  `;

  // Initialize Particle Canvas
  initParticleCanvas();

  // Initialize Card 3D Tilt Hover
  setupCardTilt();

  // Bind Event Listeners
  const startPanel = section.querySelector('#fc-start-panel');
  const gamePanel = section.querySelector('#fc-game-panel');
  const resultPanel = section.querySelector('#fc-result-panel');

  const startBtn = section.querySelector('#fc-start-btn');
  const nextBtn = section.querySelector('#fc-next-btn');
  const retryBtn = section.querySelector('#fc-btn-retry');
  const shareBtn = section.querySelector('#fc-btn-share');
  const backBtn = section.querySelector('#fc-btn-back');

  startBtn?.addEventListener('click', () => {
    soundSynth.playWebShoot();
    startQuiz();
  });

  nextBtn?.addEventListener('click', () => {
    soundSynth.playShutter();
    advanceQuestion();
  });

  retryBtn?.addEventListener('click', () => {
    soundSynth.playWebShoot();
    startQuiz();
  });

  backBtn?.addEventListener('click', () => {
    soundSynth.playClose();
    const finalSection = document.getElementById('section-valentine');
    finalSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  shareBtn?.addEventListener('click', () => {
    shareScore();
  });

  // Start the Fan challenge
  function startQuiz() {
    generateQuizSet();

    startPanel.style.display = 'none';
    resultPanel.style.display = 'none';
    gamePanel.style.display = 'flex';

    // Duck global music volume slightly during active quiz to emphasize atmosphere
    musicController.duckVolume();

    // Start Timer
    startTime = performance.now();
    updateTimerText();
    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimerText, 1000);

    renderQuestion();
  }

  // Timer Tick Update
  function updateTimerText() {
    const elapsed = Math.floor((performance.now() - startTime) / 1000);
    const min = String(Math.floor(elapsed / 60)).padStart(2, '0');
    const sec = String(elapsed % 60).padStart(2, '0');
    const timerEl = section.querySelector('#fc-timer');
    if (timerEl) {
      timerEl.textContent = `TIME: ${min}:${sec}`;
    }
  }

  // Render current active question
  function renderQuestion() {
    const qData = currentQuestions[currentQuestionIndex];
    if (!qData) return;

    // Counter label
    const counterEl = section.querySelector('#fc-question-counter');
    if (counterEl) {
      counterEl.textContent = `QUESTION 0${currentQuestionIndex + 1} / 05`;
    }

    // Smooth horizontal progress fill
    const progressFill = section.querySelector('#fc-progress-bar-fill');
    if (progressFill) {
      const percentage = (currentQuestionIndex / 5) * 100;
      progressFill.style.width = `${percentage}%`;
    }

    // Progressive nodes
    const nodesContainer = section.querySelector('#fc-progress-nodes');
    if (nodesContainer) {
      nodesContainer.innerHTML = Array.from({ length: 5 }).map((_, i) => {
        let nodeIcon = '○';
        let nodeColor = 'rgba(255, 255, 255, 0.2)';
        if (i < currentQuestionIndex) {
          nodeIcon = '●';
          nodeColor = 'var(--spider-red)';
        } else if (i === currentQuestionIndex) {
          nodeIcon = '🔴';
          nodeColor = 'var(--bright-red)';
        }
        return `<span style="color:${nodeColor}; font-size:14px; transition:color 0.3s ease;">${nodeIcon}</span>`;
      }).join('<span style="color:rgba(255,255,255,0.08); flex:1; text-align:center; font-size:10px;">──</span>');
    }

    // Category and Text
    const categoryEl = section.querySelector('#fc-question-category');
    if (categoryEl) {
      categoryEl.textContent = `CATEGORY: ${qData.category} • DIFFICULTY: ${qData.difficulty}`;
    }

    const textEl = section.querySelector('#fc-question-text');
    if (textEl) {
      textEl.textContent = qData.question;
    }

    // Options Stack
    const stackEl = section.querySelector('#fc-options-stack');
    if (stackEl) {
      stackEl.innerHTML = qData.options.map((option, index) => `
        <button class="fc-option-btn" data-index="${index}" style="
          width: 100%;
          text-align: left;
          padding: 16px 20px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 6px;
          color: #FFF;
          font-family: var(--font-body);
          font-size: 15px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1);
          outline: none;
        ">
          ${option}
        </button>
      `).join('');

      // Add selectable listeners
      const buttons = stackEl.querySelectorAll('.fc-option-btn');
      buttons.forEach(btn => {
        btn.addEventListener('click', () => {
          selectAnswer(parseInt(btn.dataset.index), buttons);
        });

        // Hover scale micro-interactions
        btn.addEventListener('mouseenter', () => {
          if (!btn.disabled) {
            btn.style.transform = 'translateY(-2px)';
            btn.style.background = 'rgba(255, 46, 54, 0.03)';
            btn.style.borderColor = 'rgba(255, 46, 54, 0.35)';
          }
        });

        btn.style.transform = 'none';
        btn.addEventListener('mouseleave', () => {
          if (!btn.disabled && !btn.classList.contains('selected')) {
            btn.style.transform = 'none';
            btn.style.background = 'rgba(255, 255, 255, 0.02)';
            btn.style.borderColor = 'rgba(255, 255, 255, 0.08)';
          }
        });
      });
    }

    // Hide feedback panel
    const feedbackArea = section.querySelector('#fc-feedback-area');
    if (feedbackArea) feedbackArea.style.display = 'none';

    // Slide in effect on card content
    const cardEl = section.querySelector('.fc-card');
    if (cardEl) {
      cardEl.style.opacity = '0';
      cardEl.style.transform = 'translateX(25px)';
      requestAnimationFrame(() => {
        cardEl.style.transition = 'transform 0.4s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.4s ease';
        cardEl.style.opacity = '1';
        cardEl.style.transform = 'translateX(0)';
      });
    }
  }

  // Answer selected
  function selectAnswer(selectedIndex, buttons) {
    const qData = currentQuestions[currentQuestionIndex];
    const isCorrect = selectedIndex === qData.answer;

    if (isCorrect) {
      score++;
      soundSynth.playCorrect();
    } else {
      soundSynth.playIncorrect();
    }

    // Disable all options
    buttons.forEach((btn, idx) => {
      btn.disabled = true;
      btn.style.pointerEvents = 'none';

      if (idx === qData.answer) {
        // Correct feedback (subtle green border)
        btn.style.borderColor = '#00E676';
        btn.style.boxShadow = '0 0 15px rgba(0, 230, 118, 0.2)';
        btn.style.background = 'rgba(0, 230, 118, 0.04)';
      } else if (idx === selectedIndex) {
        // Wrong feedback (red border)
        btn.style.borderColor = '#FF1744';
        btn.style.boxShadow = '0 0 15px rgba(255, 23, 68, 0.2)';
        btn.style.background = 'rgba(255, 23, 68, 0.04)';
      } else {
        btn.style.opacity = '0.4';
      }
    });

    // Populate feedback and explanation
    const feedbackArea = section.querySelector('#fc-feedback-area');
    const statusEl = section.querySelector('#fc-feedback-status');
    const explanationEl = section.querySelector('#fc-explanation-text');

    if (feedbackArea && statusEl && explanationEl) {
      statusEl.textContent = isCorrect ? '✓ CORRECT' : '✗ INCORRECT';
      statusEl.style.color = isCorrect ? '#00E676' : '#FF1744';
      explanationEl.textContent = qData.explanation;
      feedbackArea.style.display = 'flex';
    }
  }

  // Proceed index
  function advanceQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < 5) {
      renderQuestion();
    } else {
      finishQuiz();
    }
  }

  // End of quiz
  function finishQuiz() {
    clearInterval(timerInterval);
    gamePanel.style.display = 'none';
    resultPanel.style.display = 'flex';

    // Restore music volume
    musicController.restoreVolume();

    // Trigger reveal transitions
    const spiderSvg = section.querySelector('#fc-result-spider');
    const resultScore = section.querySelector('#fc-result-score');
    const resultLevel = section.querySelector('#fc-result-level');
    const resultDesc = section.querySelector('#fc-result-desc');

    if (spiderSvg && resultScore && resultLevel && resultDesc) {
      // 1. Reset initial animation layouts
      spiderSvg.style.opacity = '0';
      spiderSvg.style.transform = 'scale(0.7)';
      resultScore.textContent = '0 / 5';
      
      resultLevel.style.opacity = '0';
      resultLevel.style.transform = 'translateY(20px)';
      
      resultDesc.style.opacity = '0';
      resultDesc.style.filter = 'blur(5px)';

      // 2. Determine fan rank and level parameters
      let levelTitle = '';
      let levelDesc = '';
      let ambientColor = '';
      let ambientGlowSize = '';

      if (score <= 1) {
        levelTitle = 'NEIGHBOURHOOD ROOKIE';
        levelDesc = 'Every hero starts somewhere. You\'re just getting started on the web.';
        ambientColor = 'rgba(229, 9, 20, 0.15)';
        ambientGlowSize = '40px';
      } else if (score === 2) {
        levelTitle = 'WEB-SLINGER IN TRAINING';
        levelDesc = 'You know the basics. The web is beginning to stick.';
        ambientColor = 'rgba(229, 9, 20, 0.25)';
        ambientGlowSize = '50px';
      } else if (score === 3) {
        levelTitle = 'FRIENDLY NEIGHBOURHOOD FAN';
        levelDesc = 'Not bad. You know Peter Parker, you know the mask.';
        ambientColor = 'rgba(229, 9, 20, 0.4)';
        ambientGlowSize = '60px';
      } else if (score === 4) {
        levelTitle = 'SPIDER-MAN SUPER FAN';
        levelDesc = 'With great knowledge comes great responsibility. You know the story.';
        ambientColor = 'rgba(229, 9, 20, 0.55)';
        ambientGlowSize = '70px';
      } else {
        levelTitle = 'ULTIMATE SPIDER-MAN FAN';
        levelDesc = 'You\'re officially one of the people who knows the story behind the mask.';
        ambientColor = 'rgba(229, 9, 20, 0.75)';
        ambientGlowSize = '90px';
      }

      resultLevel.textContent = levelTitle;
      resultDesc.textContent = levelDesc;

      // 3. Animate Spider Vector Symbol
      requestAnimationFrame(() => {
        spiderSvg.style.opacity = '1';
        spiderSvg.style.transform = 'scale(1)';
        spiderSvg.style.filter = `drop-shadow(0 0 ${ambientGlowSize} ${ambientColor})`;
      });

      // 4. Count up Score
      let count = 0;
      const countInterval = setInterval(() => {
        if (count < score) {
          count++;
          resultScore.textContent = `${count} / 5`;
        } else {
          clearInterval(countInterval);
          resultScore.textContent = `${score} / 5`;
        }
      }, 150);

      // 5. Reveal rank cards
      setTimeout(() => {
        resultLevel.style.opacity = '1';
        resultLevel.style.transform = 'translateY(0)';
      }, 500);

      setTimeout(() => {
        resultDesc.style.opacity = '1';
        resultDesc.style.filter = 'blur(0)';
      }, 800);
    }
  }

  // Web Share result
  function shareScore() {
    let levelTitle = 'Neighbourhood Rookie';
    if (score === 2) levelTitle = 'Web-Slinger in Training';
    if (score === 3) levelTitle = 'Friendly Neighbourhood Fan';
    if (score === 4) levelTitle = 'Spider-Man Super Fan';
    if (score === 5) levelTitle = 'Ultimate Spider-Man Fan';

    const shareText = `I scored ${score}/5 and got "${levelTitle}" on the Peter Parker Spider-Man Fan Challenge! Can you beat my score? 🕷️🔴`;
    const shareUrl = window.location.href;

    if (navigator.share) {
      navigator.share({
        title: 'Spider-Man Fan Challenge',
        text: shareText,
        url: shareUrl
      }).catch(() => {});
    } else {
      // Fallback copy to clipboard
      navigator.clipboard.writeText(`${shareText} ${shareUrl}`)
        .then(() => {
          alert('Copied score challenge text to clipboard! Paste it to share.');
        })
        .catch(() => {});
    }
  }

  // Background Web Particle Canvas Generator
  function initParticleCanvas() {
    const canvas = section.querySelector('#fc-bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let w = canvas.width = section.offsetWidth;
    let h = canvas.height = section.offsetHeight;

    window.addEventListener('resize', () => {
      w = canvas.width = section.offsetWidth;
      h = canvas.height = section.offsetHeight;
    });

    const particles = [];
    const maxParticles = 45;
    
    class Particle {
      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.r = Math.random() * 2 + 0.8;
      }
      update(mouse) {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = w;
        if (this.x > w) this.x = 0;
        if (this.y < 0) this.y = h;
        if (this.y > h) this.y = 0;

        // Subtle pull to mouse coordinates representing web tension
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 160) {
            this.x += dx * 0.006;
            this.y += dy * 0.006;
          }
        }
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 46, 54, 0.22)';
        ctx.fill();
      }
    }

    for (let i = 0; i < maxParticles; i++) {
      particles.push(new Particle());
    }

    const mouse = { x: null, y: null };
    section.addEventListener('mousemove', (e) => {
      const rect = section.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });
    section.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    let frameId;
    function animate() {
      ctx.clearRect(0, 0, w, h);

      // Draw lines between proximate points (Web matrix)
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.update(mouse);
        p1.draw();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < 115) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 46, 54, ${0.11 * (1 - dist / 115)})`;
            ctx.lineWidth = 0.45;
            ctx.stroke();
          }
        }
      }

      frameId = requestAnimationFrame(animate);
    }
    
    // Pause canvas ticks when out of viewport bounds to conserve CPU/power
    const viewportObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (!frameId) animate();
      } else {
        cancelAnimationFrame(frameId);
        frameId = null;
      }
    }, { threshold: 0.05 });
    viewportObserver.observe(section);
  }

  // Interactive Card 3D Perspective Tilt Hover
  function setupCardTilt() {
    const card = section.querySelector('.fc-card');
    if (!card) return;
    
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      
      const rotateX = -(y / (rect.height / 2)) * 4.5;
      const rotateY = (x / (rect.width / 2)) * 4.5;

      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.015)`;
      card.style.borderColor = 'rgba(255, 46, 54, 0.45)';
      card.style.boxShadow = '0 25px 60px rgba(0, 0, 0, 0.98), 0 0 35px rgba(255, 46, 54, 0.15)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'none';
      card.style.borderColor = 'rgba(229, 9, 20, 0.2)';
      card.style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.95)';
    });
  }

  // Viewport scroll event mapping
  const activeObserver = new IntersectionObserver((entries) => {
    const entry = entries[0];
    if (!entry.isIntersecting) {
      // Restore normal music volume when scrolling away
      musicController.restoreVolume();
    }
  }, { threshold: 0.1 });

  activeObserver.observe(section);
}

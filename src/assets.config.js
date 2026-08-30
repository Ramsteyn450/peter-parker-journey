/**
 * ============================================================
 * CENTRAL ASSET CONFIGURATION
 * Peter Parker — The Journey
 *
 * Programmatically builds asset URLs using Vite base URL.
 * Mapped to your real images in /public/
 * ============================================================
 */

const base = import.meta.env.BASE_URL || '/';

export const VALENTINE_SITE_URL = 'https://valentine-finder-beige.vercel.app/';

export const IMAGES = {
  // Hero
  peterSilhouette:    `${base}peter.png`,

  // Origin / Childhood
  origin01:           `${base}peter1.webp`,
  origin02:           `${base}peter1.webp`,
  auntMay01:          `${base}peter3.webp`,

  // Becoming Spider-Man
  suit01:             `${base}peter2.webp`,
  suit02:             `${base}peter2.webp`,
  suitNew:            `${base}peter2.webp`,
  spiderSilhouette:   `${base}peter2.webp`,

  // Homecoming
  homecoming01:       `${base}peter2.webp`,
  homecoming02:       `${base}peter2.webp`,
  tonyStark:          `${base}peter3.webp`,

  // MJ + Peter — Main
  mjPeter01:          `${base}peter4.jpg`,
  mjPeter02:          `${base}peter4.jpg`,
  mjPeter03:          `${base}peter.png`,

  // MJ Memory Wall (5 photos)
  mjMemory01:         `${base}peter4.jpg`,
  mjMemory02:         `${base}peter.png`,
  mjMemory03:         `${base}peter4.jpg`,
  mjMemory04:         `${base}peter1.webp`,
  mjMemory05:         `${base}peter4.jpg`,

  // Love Story Scroll (7 scenes)
  loveScene01:        `${base}peter4.jpg`,
  loveScene02:        `${base}peter.png`,
  loveScene03:        `${base}peter4.jpg`,
  loveScene04:        `${base}peter.png`,
  loveScene05:        `${base}peter4.jpg`,
  loveScene06:        `${base}peter.png`,
  loveScene07:        `${base}peter4.jpg`,

  // Infinity War
  titan:              `${base}peter3.webp`,
  snap:               `${base}peter3.webp`,

  // Endgame
  endgame01:          `${base}peter2.webp`,
  endgameReturn:      `${base}peter2.webp`,

  // Far From Home
  farFromHome01:      `${base}peter4.jpg`,
  europe:             `${base}peter4.jpg`,

  // No Way Home
  multiverse01:       `${base}peter2.webp`,
  drStrange:          `${base}peter3.webp`,

  // Three Spider-Men
  spider1Silhouette:  `${base}peter2.webp`,
  spider2Silhouette:  `${base}peter2.webp`,
  spider3Silhouette:  `${base}peter2.webp`,

  // Aunt May
  auntMayFinal:       `${base}peter3.webp`,

  // MJ Forgets Peter
  mjFinalMemory:      `${base}peter1.webp`,
  coffeeShop:         `${base}peter1.webp`,

  // Peter Alone
  peterAlone:         `${base}peter3.webp`,
  newApartment:       `${base}peter2.webp`,

  // Disintegration wall (6 photos)
  disintegration01:   `${base}peter.png`,
  disintegration02:   `${base}peter1.webp`,
  disintegration03:   `${base}peter2.webp`,
  disintegration04:   `${base}peter3.webp`,
  disintegration05:   `${base}peter4.jpg`,
  disintegration06:   `${base}peter.png`,
};

export const VIDEOS = {
  intro:            '',
  firstSwing:       '',
  mjMemory:         '',
  loss:             '',
  sacrifice:        '',
  mjFinalMemory:    '',
  newSpiderMan:     '',

  posters: {
    intro:          `${base}peter.png`,
    firstSwing:     `${base}peter2.webp`,
    mjMemory:       `${base}peter4.jpg`,
    loss:           `${base}peter3.webp`,
    mjFinalMemory:  `${base}peter1.webp`,
    newSpiderMan:   `${base}peter2.webp`,
  }
};

export const CINEMATIC_PLAYLIST = [
  {
    title: 'Dude Orchestral Suite',
    src: `${base}music/Dude Orchestral Suite - BestTamilan.mp3`,
  },
  {
    title: 'The Metro Proposal (Peter & MJ)',
    src: `${base}music/the_metro_proposal.mp3`,
  },
  {
    title: 'Dude Sad BGM (Heartbreak)',
    src: `${base}music/dude_sad_bgm.mp3`,
  },
  {
    title: 'Nalaru Po (Sacrifice)',
    src: `${base}music/nalaru_po.mp3`,
  },
  {
    title: 'Oorum Blood (Spider-Man)',
    src: `${base}music/oorum_blood.mp3`,
  },
  {
    title: 'Kannukulla Theme',
    src: `${base}music/kannukulla_bgm_dude.mp3`,
  },
  {
    title: 'Unplugged Orchestral (Peter Alone)',
    src: `${base}music/Nallaru Po X Oorum Blood Orchestral Unplugged - BestTamilan.mp3`,
  },
  {
    title: 'The Metro Proposal Suite (Finale)',
    src: `${base}music/The Metro Proposal - BestTamilan.mp3`,
  },
];

export const MUSIC = {
  intro:            `${base}music/Dude Orchestral Suite - BestTamilan.mp3`,
  spiderMan:        `${base}music/oorum_blood.mp3`,
  homecoming:       `${base}music/kannukulla_bgm_dude.mp3`,
  love:             `${base}music/the_metro_proposal.mp3`,
  heartbreak:       `${base}music/dude_sad_bgm.mp3`,
  sacrifice:        `${base}music/nalaru_po.mp3`,
  peterAlone:       `${base}music/Nallaru Po X Oorum Blood Orchestral Unplugged - BestTamilan.mp3`,
  final:            `${base}music/The Metro Proposal - BestTamilan.mp3`,
};

export const MUSIC_NAMES = {
  intro:      'Dude Orchestral Suite',
  spiderMan:  'Oorum Blood (Spider-Man)',
  homecoming: 'Kannukulla Theme',
  love:       'The Metro Proposal (Peter & MJ)',
  heartbreak: 'Dude Sad BGM (Heartbreak)',
  sacrifice:  'Nalaru Po (Sacrifice)',
  peterAlone: 'Unplugged Orchestral (Peter Alone)',
  final:      'The Metro Proposal Suite (Legacy)',
};

export const MEMORY_WALL = [
  {
    key:      'mjMemory01',
    src:      IMAGES.mjMemory01,
    caption:  'The Moments That Mattered',
    date:     'SOPHOMORE YEAR',
    style:    { top: '5%', left: '8%', width: '240px', height: '300px', rotate: '-3deg' }
  },
  {
    key:      'mjMemory02',
    src:      IMAGES.mjMemory02,
    caption:  'When Everything Felt Normal',
    date:     'EUROPE TRIP',
    style:    { top: '10%', left: '35%', width: '280px', height: '220px', rotate: '2deg' }
  },
  {
    key:      'mjMemory03',
    src:      IMAGES.mjMemory03,
    caption:  'Before Everything Changed',
    date:     'AFTER HOMECOMING',
    style:    { top: '5%', left: '62%', width: '220px', height: '280px', rotate: '-1deg' }
  },
  {
    key:      'mjMemory04',
    src:      IMAGES.mjMemory04,
    caption:  'The Last Normal Day',
    date:     'JUNIOR YEAR',
    style:    { top: '50%', left: '15%', width: '260px', height: '200px', rotate: '3deg' }
  },
  {
    key:      'mjMemory05',
    src:      IMAGES.mjMemory05,
    caption:  'Everything We Almost Had',
    date:     'FAR FROM HOME',
    style:    { top: '52%', left: '50%', width: '240px', height: '260px', rotate: '-2deg' }
  },
];

export const MIND_WORDS = [
  { word: 'MJ',             size: 48, color: '#FF2E36', memory: { title: 'MJ', body: 'She was the one person who truly saw Peter Parker.' } },
  { word: 'MAY',            size: 36, color: '#FFFFFF', memory: { title: 'Aunt May', body: '"With great power comes great responsibility." Her last words.' } },
  { word: 'TONY',           size: 40, color: '#FFD700', memory: { title: 'Tony Stark', body: 'His mentor. His father figure. The man who believed in him first.' } },
  { word: 'NED',            size: 30, color: '#E0E0E0', memory: { title: 'Ned Leeds', body: 'His best friend. His guy in the chair. Who no longer remembers him.' } },
  { word: 'LOVE',           size: 44, color: '#FF2E36', memory: { title: 'Love', body: 'The one thing Peter could not protect, even with all his power.' } },
  { word: 'LOSS',           size: 38, color: '#FF555A', memory: { title: 'Loss', body: 'He lost Tony. He lost May. He chose to lose MJ.' } },
  { word: 'FEAR',           size: 28, color: '#E0E0E0', memory: { title: 'Fear', body: 'The fear of losing those he loved drove every choice he made.' } },
  { word: 'RESPONSIBILITY', size: 22, color: '#FFFFFF', memory: { title: 'Responsibility', body: '"With great power comes great responsibility."' } },
  { word: 'FAILURE',        size: 26, color: '#FF555A', memory: { title: 'Failure', body: 'He blamed himself for everything. Every death. Every loss.' } },
  { word: 'SACRIFICE',      size: 34, color: '#FF2E36', memory: { title: 'Sacrifice', body: 'He asked Strange to make the world forget Peter Parker. Even MJ.' } },
];

export const LOVE_SCENES = [
  { text: 'Peter sees MJ for the first time.',           scene: 'FIRST SIGHT' },
  { text: 'They become something more than friends.',    scene: 'SOMETHING MORE' },
  { text: 'They laugh. For a moment, everything is fine.', scene: 'THE GOOD DAYS' },
  { text: 'He watches her. She watches him back.',       scene: 'FALLING' },
  { text: 'They become a couple.',                      scene: 'TOGETHER' },
  { text: 'Peter tries to keep her safe from his world.', scene: 'PROTECTION' },
  { text: 'Their world becomes complicated. But they hold on.', scene: 'HOLDING ON' },
];

export const HOMECOMING_SCENES = [
  { title: 'THE HOMEMADE SUIT', desc: 'Peter Parker built his first suit from scratch. A kid trying to be a hero.' },
  { title: 'TONY STARK',        desc: 'The man who changed everything. "Friendly neighborhood Spider-Man."' },
  { title: 'THE VULTURE',       desc: 'A villain who threatened everything Peter cared about.' },
  { title: 'TRAPPED UNDER RUBBLE', desc: 'Peter, alone, buried under concrete. He chose to get up.' },
  { title: 'THE DECISION',      desc: '"If you\'re nothing without the suit, then you shouldn\'t have it." — Tony Stark' },
];

export const NWH_VILLAINS = [
  'Green Goblin',
  'Doctor Octopus',
  'Electro',
  'Sandman',
  'Lizard',
];

export const FFH_SCENES = [
  'Peter wants a normal life',
  'Europe with his classmates',
  'MJ. Always MJ.',
  'Mysterio — a friend or a threat?',
  'EDITH and the weight of Tony\'s legacy',
  'Illusions and self-doubt',
  'Peter becomes his own Spider-Man',
];

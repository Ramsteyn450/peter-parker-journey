/**
 * MusicController — Shuffled Global Cinematic Audio Engine
 * Peter Parker: The Journey
 *
 * Features:
 * - Single HTMLAudioElement instance.
 * - Shuffled playlist generation per fresh visit (Fisher-Yates shuffle).
 * - Climax section overrides with smooth fade crossfades.
 * - Continuous playlist playback across standard sections without interruption.
 * - Audio volume ducking and restoring interfaces.
 */

export class MusicController {
  constructor() {
    this.audio = new Audio();
    this.audio.loop = false; // Playlist mode: advances naturally on ended
    this.audio.preload = 'auto';
    this.volume = 0.5;
    this.isPlaying = false;
    this.isMuted = false;
    this.userInteracted = false;
    
    // Global Playlist Tracks
    this.tracks = [
      { src: 'music/Dude Orchestral Suite - BestTamilan.mp3', title: 'Dude Orchestral Suite' },
      { src: 'music/the_metro_proposal.mp3', title: 'The Metro Proposal' },
      { src: 'music/dude_sad_bgm.mp3', title: 'Dude Sad BGM' },
      { src: 'music/nalaru_po.mp3', title: 'Nalaru Po (Sacrifice)' },
      { src: 'music/oorum_blood.mp3', title: 'Oorum Blood (Spider-Man)' },
      { src: 'music/kannukulla_bgm_dude.mp3', title: 'Kannukulla Theme' },
      { src: 'music/Nallaru Po X Oorum Blood Orchestral Unplugged - BestTamilan.mp3', title: 'Unplugged Orchestral' },
      { src: 'music/The Metro Proposal - BestTamilan.mp3', title: 'The Metro Proposal Suite' }
    ];

    this.shuffledPlaylist = [];
    this.playlistIndex = 0;

    // Special Climax Clashes Overrides
    this.specialOverrides = {
      '#section-sacrifice': { src: 'music/nalaru_po.mp3', title: 'Nalaru Po (Sacrifice)' },
      '#section-valentine': { src: 'music/The Metro Proposal - BestTamilan.mp3', title: 'The Metro Proposal Suite' }
    };
    
    this.activeOverrideSrc = null;
    this.savedShuffledTime = 0; // Remembers position of playlist track when override triggers
    this.fadePromise = Promise.resolve();

    // UI elements cache
    this.toggleBtn = null;
    this.trackNameEl = null;
    this.controllerEl = null;
    this.progressFillEl = null;

    this._initDOMReferences();
    this._bindAudioEvents();
  }

  _initDOMReferences() {
    this.toggleBtn = document.getElementById('music-toggle');
    this.trackNameEl = document.getElementById('music-track-name');
    this.controllerEl = document.getElementById('music-controller');
    this.progressFillEl = document.getElementById('music-progress-fill');

    if (this.toggleBtn) {
      this.toggleBtn.addEventListener('click', () => {
        this.userInteracted = true;
        this.togglePlayPause();
      });
    }
  }

  _bindAudioEvents() {
    // Playlist progression: play next track on ended
    this.audio.addEventListener('ended', () => {
      console.log(`[MUSIC] Track finished. Advancing playlist...`);
      this.playNextShuffledTrack();
    });

    this.audio.addEventListener('timeupdate', () => {
      if (this.audio.duration && this.progressFillEl) {
        const percent = (this.audio.currentTime / this.audio.duration) * 100;
        this.progressFillEl.style.width = `${percent}%`;
      }
    });

    this.audio.addEventListener('play', () => {
      this.isPlaying = true;
      this._updateUI();
    });

    this.audio.addEventListener('pause', () => {
      this.isPlaying = false;
      this._updateUI();
    });
  }

  // Shuffle generator (Fisher-Yates)
  generateShufflePlaylist() {
    const list = [...this.tracks];
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }

    // Prevent same track from playing consecutively on cycle reshuffle
    if (this.shuffledPlaylist.length > 0) {
      const lastSrc = this.shuffledPlaylist[this.shuffledPlaylist.length - 1].src;
      if (list[0].src === lastSrc && list.length > 1) {
        [list[0], list[1]] = [list[1], list[0]];
      }
    }

    this.shuffledPlaylist = list;
    this.playlistIndex = 0;
    console.log('[MUSIC] Fresh shuffled playlist generated:', this.shuffledPlaylist.map(t => t.title));
  }

  // Scroll intersect listener
  onSectionIntersect(selector) {
    if (!this.toggleBtn) this._initDOMReferences();

    const override = this.specialOverrides[selector];
    if (override) {
      this.playSpecialOverride(override.src, override.title);
    } else {
      this.clearSpecialOverride();
    }
  }

  // Climax overrides
  async playSpecialOverride(src, title) {
    if (this.activeOverrideSrc === src) return;

    // Save active shuffled progress time before switching
    if (!this.activeOverrideSrc && this.audio.src && !this.audio.paused) {
      this.savedShuffledTime = this.audio.currentTime;
    }

    this.activeOverrideSrc = src;
    await this._transitionToTrack(src, title);
  }

  async clearSpecialOverride() {
    if (!this.activeOverrideSrc) return;

    this.activeOverrideSrc = null;
    
    // Return to current shuffled track
    const activeShuffled = this.shuffledPlaylist[this.playlistIndex];
    if (activeShuffled) {
      await this._transitionToTrack(activeShuffled.src, activeShuffled.title, this.savedShuffledTime);
      this.savedShuffledTime = 0;
    }
  }

  // Sequential play next shuffled playlist track
  async playNextShuffledTrack() {
    if (this.activeOverrideSrc) return; // Special scene looping active

    this.playlistIndex++;
    if (this.playlistIndex >= this.shuffledPlaylist.length) {
      this.generateShufflePlaylist();
    }

    const nextTrack = this.shuffledPlaylist[this.playlistIndex];
    if (nextTrack) {
      await this._transitionToTrack(nextTrack.src, nextTrack.title);
    }
  }

  // Shared fade-crossfade worker
  async _transitionToTrack(src, title, startTime = 0) {
    // Resolve full path URIs to match local urls correctly
    const currentPath = new URL(this.audio.src || '', window.location.href).pathname;
    const targetPath = new URL(src, window.location.href).pathname;

    if (currentPath === targetPath) {
      return;
    }

    if (this.isPlaying && this.userInteracted) {
      this.fadePromise = this.fadePromise
        .then(() => this.fadeTo(0, 300))
        .then(() => {
          this.audio.src = src;
          this.audio.currentTime = startTime;
          this.audio.load();
          return this.audio.play();
        })
        .then(() => this.fadeTo(this.volume, 300))
        .catch(err => {
          console.warn('[MUSIC] Track fade transition interrupted:', err.message);
          this.audio.volume = this.isMuted ? 0 : this.volume;
        });
    } else {
      this.audio.src = src;
      this.audio.currentTime = startTime;
      this.audio.load();
    }

    this._updateUI();
  }

  fadeTo(targetVolume, duration = 300) {
    return new Promise((resolve) => {
      const startVolume = this.audio.volume;
      const difference = targetVolume - startVolume;
      const startTime = performance.now();

      const tick = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        if (!this.isMuted) {
          this.audio.volume = startVolume + difference * progress;
        }

        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          resolve();
        }
      };

      requestAnimationFrame(tick);
    });
  }

  // User click gesture unlock
  unlock() {
    this.userInteracted = true;
    this.generateShufflePlaylist();

    if (!this.isPlaying) {
      this.isPlaying = true;
      const startTrack = this.shuffledPlaylist[0];
      this._transitionToTrack(startTrack.src, startTrack.title)
        .then(() => {
          this.audio.play();
        })
        .catch(() => {});
    }
  }

  togglePlayPause() {
    if (this.isPlaying) {
      this.audio.pause();
    } else {
      if (!this.audio.src) {
        this.unlock();
      } else {
        this.audio.play()
          .then(() => {
            this.isPlaying = true;
            this._updateUI();
          })
          .catch(() => {});
      }
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    this.audio.volume = this.isMuted ? 0 : this.volume;
    this._updateUI();
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (!this.isMuted) {
      this.audio.volume = this.volume;
    }
  }

  duckVolume() {
    this.fadeTo(this.volume * 0.15, 300);
  }

  restoreVolume() {
    this.fadeTo(this.volume, 300);
  }

  silence() {
    this.duckVolume();
  }

  resume() {
    if (this.userInteracted) {
      this.restoreVolume();
      if (this.audio.paused && this.isPlaying) {
        this.audio.play().catch(() => {});
      }
    }
  }

  // Compatibility helpers
  hide() {}
  show() {}
  pause() {
    this.stop();
  }
  stop() {
    this.audio.pause();
    this.isPlaying = false;
    this._updateUI();
  }

  _updateUI() {
    this.controllerEl = this.controllerEl || document.getElementById('music-controller');
    this.trackNameEl = this.trackNameEl || document.getElementById('music-track-name');

    if (!this.controllerEl) return;

    if (!this.isPlaying || this.isMuted) {
      this.controllerEl.classList.add('music-controller-off');
    } else {
      this.controllerEl.classList.remove('music-controller-off');
    }

    if (this.trackNameEl) {
      // Find current playing title
      if (this.activeOverrideSrc) {
        const override = Object.values(this.specialOverrides).find(o => o.src === this.activeOverrideSrc);
        this.trackNameEl.textContent = override ? override.title : '—';
      } else {
        const activeShuffled = this.shuffledPlaylist[this.playlistIndex];
        this.trackNameEl.textContent = activeShuffled ? activeShuffled.title : '—';
      }
    }
  }
}

export const musicController = new MusicController();

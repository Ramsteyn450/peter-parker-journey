/**
 * CustomCursor — Spider-Man inspired cursor glow
 * Peter Parker: The Journey
 * Enhances mouse with subtle glow ring while keeping standard mouse pointer visible.
 */

export class CustomCursor {
  constructor() {
    this.cursorEl = document.getElementById('custom-cursor');
    this.dot      = this.cursorEl?.querySelector('.cursor-dot');
    this.ring     = this.cursorEl?.querySelector('.cursor-ring');

    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    if (!this.cursorEl || isTouch) return;

    this.mouseX = -100;
    this.mouseY = -100;
    this._init();
  }

  _init() {
    // Keep standard browser mouse visible!
    document.body.style.cursor = 'default';

    document.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      this._moveCursor(this.mouseX, this.mouseY);
    }, { passive: true });

    // Hover state on interactive elements
    const interactiveSelectors = 'a, button, [data-cursor-hover], input, textarea, select, label, .memory-photo, .mind-word';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(interactiveSelectors)) {
        document.body.classList.add('cursor-hover');
      }
    });
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(interactiveSelectors)) {
        document.body.classList.remove('cursor-hover');
      }
    });

    // Click state
    document.addEventListener('mousedown', () => {
      document.body.classList.add('cursor-clicking');
    });
    document.addEventListener('mouseup', () => {
      document.body.classList.remove('cursor-clicking');
    });
  }

  _moveCursor(x, y) {
    if (!this.cursorEl) return;
    this.cursorEl.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }
}

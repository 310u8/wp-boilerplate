// noScroll.on()
// noScroll.off()

export class NoScroll {
  constructor() {
    this.preventDefault = this.preventDefault.bind(this);
    this.on = this.on.bind(this);
    this.off = this.off.bind(this);
    this.$body = $('body');
  }

  preventDefault(e) {
    return e.preventDefault();
  }

  on() {
    this.$body.css({'overflow':'hidden'});
    return document.addEventListener('touchmove', this.preventDefault, {passive: false});
  }

  off() {
    this.$body.css({'overflow':'auto'});
    return document.removeEventListener('touchmove', this.preventDefault, {passive: false});
  }
}
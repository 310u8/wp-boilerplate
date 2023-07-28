// scrollManager.init()
//
// func = ->
//   console.log scrollManager.top
//
// scrollManager.on func
// scrollManager.off func

export class ScrollManager {
  constructor(wait) {
    this.init = this.init.bind(this);
    this.scroll = this.scroll.bind(this);
    this.on = this.on.bind(this);
    this.off = this.off.bind(this);
    this.funcs = [];
    this.top = $(window).scrollTop();
    this.wait = (wait != null) ? wait : 100;
  }

  init() {
    const throttle = _.throttle(this.scroll, this.wait);
    return $(window).on('scroll', throttle);
  }

  scroll() {
    if (this.funcs.length > 0) {
      this.top = $(window).scrollTop();

      return Array.from(this.funcs).map((func) =>
        func());
    }
  }

  on(func) {
    return this.funcs.push(func);
  }

  off(func) {
    return this.funcs.splice(func, 1);
  }
}

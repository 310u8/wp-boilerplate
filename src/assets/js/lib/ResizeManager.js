// resizeManager.init()
//
// func = ->
//   console.log resizeManager.width, resizeManager.height
//
// resizeManager.on func
// resizeManager.off func

export class ResizeManager {
  constructor() {
    this.init = this.init.bind(this);
    this.on = this.on.bind(this);
    this.off = this.off.bind(this);
    this.funcs = [];
    this.width = $(window).width();
    this.height = $(window).height();
  }

  init() {
    return $(window).on('resize', () => {
      if (this.funcs.length > 0) {
        this.width = $(window).width();
        this.height = $(window).height();

        return Array.from(this.funcs).map((func) =>
          func());
      }
    });
  }

  on(func) {
    return this.funcs.push(func);
  }

  off(func) {
    return this.funcs.splice(func, 1);
  }
}
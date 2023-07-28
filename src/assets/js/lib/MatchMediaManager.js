// matchMediaManager.init()
//
// func = ->
//   console.log matchMediaManager.device
//
// matchMediaManager.on 'pc', func
// matchMediaManager.off 'pc', func
//
// matchMediaManager.trigger()

export class MatchMediaManager {
  constructor() {
    this.init = this.init.bind(this);
    this.handle = this.handle.bind(this);
    this.on = this.on.bind(this);
    this.off = this.off.bind(this);
    this.trigger = this.trigger.bind(this);
    this.funcsPc = [];
    this.funcsSp = [];
    this.mql = window.matchMedia('(max-width: 768px)');
    this.device = !this.mql.matches ? 'pc' : 'sp';
  }

  init() {
    this.mql.addListener(this.handle);
    this.handle();

    $(window).on('breakpoint-pc', () => {
      if (this.funcsPc.length > 0) {
        return Array.from(this.funcsPc).map((func) =>
          func());
      }
    });

    return $(window).on('breakpoint-sp', () => {
      if (this.funcsSp.length > 0) {
        return Array.from(this.funcsSp).map((func) =>
          func());
      }
    });
  }

  handle() {
    if (!this.mql.matches) {
      return $(window).trigger('breakpoint-pc');
    } else {
      return $(window).trigger('breakpoint-sp');
    }
  }

  on(bp, func) {
    if (bp === 'pc') {
      return this.funcsPc.push(func);
    } else if (bp === 'sp') {
      return this.funcsSp.push(func);
    }
  }

  off(bp, func) {
    if (bp === 'pc') {
      return this.funcsPc.splice(func, 1);
    } else if (bp === 'sp') {
      return this.funcsSp.splice(func, 1);
    }
  }

  trigger() {
    return this.handle();
  }
}
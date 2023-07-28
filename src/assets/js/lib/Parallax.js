// $.each $('.js-parallax-trigger'), ->
//   $trigger = $(@)
//
//   $.each $(@).find('.js-parallax'), ->
//     parallax.set $trigger, $(@)

// .a.js-parallax-trigger
//   .a1.js-parallax(data-depth="50") a
//   .a2.js-parallax(data-depth="100") b
//   .a3.js-parallax(data-depth="150") c

export class Parallax {
  constructor(duration, ease) {
    this.set = this.set.bind(this);
    this.on = this.on.bind(this);
    this.off = this.off.bind(this);
    this.scroll = this.scroll.bind(this);
    this.funcs = [];
    this.duration = (duration != null) ? duration : 200;
    this.ease = (ease != null) ? ease : _ease.OutSine;
  }

  set($trigger, $target) {
    let endViewport, from, startViewport, to;
    const depth = $target.data('depth');
    const start = ($target.data('start') != null) ? $target.data('start') : 'bottom';
    const end = ($target.data('end') != null) ? $target.data('end') : 'top';
    if (($target.data('from') != null) && ($target.data('to') != null)) {
      from = $target.data('from');
      to = $target.data('to');
    } else if ($target.data('from') != null) {
      from = $target.data('from');
      to = from + depth;
    } else if ($target.data('to') != null) {
      from = -depth;
      to = $target.data('to');
    } else {
      from = -depth;
      to = depth;
    }

    const triggerHeight = $trigger.innerHeight();
    const triggerTop = $trigger.offset().top;
    const triggerBottom = $trigger.offset().top + triggerHeight;

    $target.css({
      'transform':`translate3d(0,${from}px,0)`,
      'transition':`transform ${this.duration}ms ${this.ease}`,
      'will-change':'transform'
    });

    if (start === 'top') {
      startViewport = 0;
    }
    if (start === 'bottom') {
      startViewport = 1;
    }

    if (end === 'top') {
      endViewport = 1;
    }
    if (end === 'bottom') {
      endViewport = -1;
    }

    return this.funcs.push(() => {
      if (((scrollManager.top + resizeManager.height) >= triggerTop) && (scrollManager.top <= triggerBottom)) {
        const time = ((scrollManager.top + (resizeManager.height * startViewport)) - triggerTop) / (triggerHeight + (resizeManager.height * endViewport));
        const position = ~~(((to - from) * time) + from);
        return $target.css({'transform':`translate3d(0,${position}px,0)`});
      }
    });
  }

  on() {
    scrollManager.on(this.scroll);
    return this.scroll();
  }

  off() {
    return scrollManager.off(this.scroll, 1);
  }

  scroll() {
    if (this.funcs.length > 0) {
      return Array.from(this.funcs).map((func) =>
        func());
    }
  }
}
// imgs = preload.search $('body *')
//
// preload.divide imgs
//
// preload.load imgs,
//   'loaded': (img) =>
//     preload.set img
//   'complete':=>
//     console.log 'complete'

export class Preload {
  constructor() {
    this.search = this.search.bind(this);
    this.divide = this.divide.bind(this);
    this.load = this.load.bind(this);
    this.set = this.set.bind(this);
  }

  search($img) {
    const imgs = [];

    $img.each(function() {
      const isImg = $(this).is('img');
      const isBg = ($(this).css('background-image') !== 'none') && !$(this).css('background-image').match(/linear-gradient/);

      if (isImg || isBg) {
        const img = [];
        img['$'] = $(this);

        if (isImg) {
          if ($(this).attr('data-src') != null) {
            img['src'] = $(this).attr('data-src');
          } else if ($(this).attr('src') != null) {
            img['src'] = $(this).attr('src');
          }
        } else if (isBg) {
          img['src'] = $(this).css('background-image').replace(/(url\(|\)|")/g, '');
        }

        return imgs.push(img);
      }
    });

    return imgs;
  }

  divide(imgs) {
    const device = _ua.pc ? 'pc' : 'sp';

    return Array.from(imgs).map((val) =>
      (val.src = val.src.replace('device', device)));
  }

  load(imgs, func) {
    const p = [];
    const d = new $.Deferred;
    let isComp = false;
    const {
      length
    } = imgs;
    let prog = 0;

    for (var i in imgs) {
      var val = imgs[i];
      (function(val) {
        const d2 = new $.Deferred;
        const img = new Image();

        img.onload = function() {
          d2.resolve();
          return func.loaded(val, ++prog/length);
        };

        img.onerror = () => d2.reject();

        img.src = val.src;
        return p.push(d2.promise());
      })(val);
    }

    $.when.apply(null, p).done(function() {
      if (!isComp) {
        isComp = true;
        return d.resolve();
      }
    });

    $.when.apply(null, p).fail(function() {
      if (!isComp) {
        isComp = true;
        return d.resolve();
      }
    });

    //timeout
    const timerId = $.timeout(10000)
      .then(() => {
        if (!isComp) {
          isComp = true;
          return d.resolve();
        }
    });

    d.done(() => func.complete());

    return d.fail(() => func.complete());
  }

  set(img) {
    if (img.$.attr('data-src') != null) { return img.$.attr('src', img.src); }
  }
}
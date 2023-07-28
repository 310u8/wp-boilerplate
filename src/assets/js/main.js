import jQuery from 'jquery';
window.$ = window.jQuery = jQuery;

import { UserAgent } from './lib/UserAgent.js';
import { MatchMediaManager } from './lib/MatchMediaManager.js';
import { Ease } from './lib/Ease.js';
import { Deferred } from './lib/Deferred.js';
import { ResizeManager } from './lib/ResizeManager.js';
import { ScrollManager } from './lib/ScrollManager.js';
// import { Preload } from './lib/Preload.js';
// import { NoScroll } from './lib/NoScroll.js';
// import { Parallax } from './lib/Parallax.js';

window._ua = new UserAgent;
window.matchMediaManager = new MatchMediaManager;
window._ease = new Ease;
window.deferred = new Deferred;
window.resizeManager = new ResizeManager;
window.scrollManager = new ScrollManager;

class Init {
  constructor() {
    console.log('Hello world.');
  }
}

$(() => new Init);
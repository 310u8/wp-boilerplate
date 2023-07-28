// _ua.browser
// _ua.device
// _ua.pc
// _ua.sp
// _ua.ie

export class UserAgent {
  constructor() {
    this.getBrowser = this.getBrowser.bind(this);
    this.getDevice = this.getDevice.bind(this);
    this.isPc = this.isPc.bind(this);
    this.isSp = this.isSp.bind(this);
    this.isIe = this.isIe.bind(this);
    this.vars = {};
    this.ua = window.navigator.userAgent.toLowerCase();
    this.ver = window.navigator.appVersion.toLowerCase();

    this.getBrowser();
    this.getDevice();
    this.isPc();
    this.isSp();

    return this.vars;
  }

  getBrowser() {
    return this.vars.browser = (() => {
      if (this.ua.indexOf('edge') !== -1) {
        return 'edge';
      } else if (this.ua.indexOf('trident/7') !== -1) {
        return 'ie11';
      } else if ((this.ua.indexOf('msie') !== -1) && (this.ua.indexOf('opera') === -1)) {
        if (this.ua.indexOf('msie 9.') !== -1) {
          return 'ie9';
        } else if (this.ua.indexOf('msie 10.') !== -1) {
          return 'ie10';
        }
      } else if ((this.ua.indexOf('chrome') !== -1) && (this.ua.indexOf('edge') === -1)) {
        return 'chrome';
      } else if ((this.ua.indexOf('safari') !== -1) && (this.ua.indexOf('chrome') === -1)) {
        return 'safari';
      } else if (this.ua.indexOf('firefox') !== -1) {
        return 'firefox';
      } else if (this.ua.indexOf('opera') !== -1) {
        return 'opera';
      } else {
        return '';
      }
    })();
  }

  getDevice() {
    return this.vars.device = (() => {
      if ((this.ua.indexOf('iphone') !== -1)　|| (this.ua.indexOf('ipod') !== -1)) {
        return 'iphone';
      } else if (this.ua.indexOf('ipad') !== -1) {
        return 'ipad';
      } else if (this.ua.indexOf('android') !== -1) {
        return 'android';
      } else {
        return '';
      }
    })();
  }

  isPc() {
    return this.vars.pc = (() => {
      if ((this.vars.device !== 'iphone') && (this.vars.device !== 'android')) {
        return true;
      } else {
        return false;
      }
    })();
  }

  isSp() {
    return this.vars.sp = (() => {
      if ((this.vars.device === 'iphone') || (this.vars.device === 'android')) {
        return true;
      } else {
        return false;
      }
    })();
  }

  isIe() {
    return this.vars.ie = (() => {
      if ((this.vars.browser === 'edge') || (this.vars.browser === 'ie11') || (this.vars.browser === 'ie10') || (this.vars.browser === 'ie9')) {
        return true;
      } else {
        return false;
      }
    })();
  }
}
// $.timeout 1000
//   .then =>
//     console.log '1000'
//     return $.timeout 1000
//   .done =>
//     console.log '2000'
//
// $.interval 1000
//   .progress =>
//     console.log '1000'

export class Deferred {
  constructor() {
    this.timeout = this.timeout.bind(this);
    this.interval = this.interval.bind(this);
    this.timeout();
    this.interval();
  }

  timeout() {
    return $.timeout = msec => {
      const d = new $.Deferred;
      const p = d.promise();

      const timerId = setTimeout(() => {
        return d.resolve();
      }
      ,msec);

      p.clear = function() {
        clearTimeout(timerId);
        return d.rejectWith();
      };

      return p;
    };
  }

  interval() {
    return $.interval = msec => {
      const d = new $.Deferred;
      const p = d.promise();

      const timerId = setInterval(() => {
        return d.notifyWith();
      }
      ,msec);

      p.clear = () => {
        clearInterval(timerId);
        return d.rejectWith();
      };

      return p;
    };
  }
}
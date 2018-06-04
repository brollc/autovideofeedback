var Timer = function(element) {
    this.element = element;
    this.startTime = null;
    this.stopped = false;

    var self = this;
    var tick = function() {
        setTimeout(function() {
            if (self.startTime) {
              self.refresh();
            }
            tick();
        }, 100);
    };

    tick();
};

Timer.prototype.set = function(time) {
  this.totalTime = time;
  this.remainingTime = time;

  this.startTime = Date.now()/1000;
};

Timer.prototype.refresh = function() {
    var currentTime = Date.now()/1000;
    this.remainingTime = this.totalTime - Math.floor(currentTime - this.startTime);

    if (this.remainingTime >= 0) {
        this.element.innerHTML = this.remainingTime;
    } else {
        this.element.innerHTML = '';
    }
};

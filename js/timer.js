var Timer = function(element, time) {
    this.element = element;
    this.totalTime = time;
    this.remainingTime = time;
    this.startTime = null;
};

Timer.prototype.start = function() {
    var self = this;
    this.startTime = Date.now()/1000;

    var tick = function() {
        setTimeout(function() {
            self.refresh();
            if (self.remainingTime > 0) {
                tick();
            }
        }, 250);
    };

    tick();
};

Timer.prototype.refresh = function() {
    var currentTime = Date.now()/1000;
    this.remainingTime = this.totalTime - Math.floor(currentTime - this.startTime);
    this.element.innerHTML = this.remainingTime;
};

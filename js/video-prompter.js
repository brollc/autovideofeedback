var VideoPrompter = function(element, opts) {
    this.element = element;
    this.element.classList.add('video-prompter');
    this.promptCount = 0;
    this.configure(opts);
    this.initialize();
};

VideoPrompter.prototype.configure = function (opts) {
    var DEFAULTS = {
        START_MESSAGE: 'Click anywhere to Start',
        END_MESSAGE: 'Feedback Complete. Thank you for your time!',
        PROMPT_TITLES: [
          'How were you feeling at this point? ',
          'What was going through your mind at this point?',
        ],
        PROMPT_DESCRIPTIONS: [
          'Please state out loud which of the following emotions you were feeling at this point in the interaction:\n' +
          '- Angry\n- Sad\n- Happy\n- Fearful',
          'Please state what you were thinking at this point? Respond out loud. Press "Next Clip" when finished',
        ],
        PROMPT_DURATIONS: [
          10,
          5
        ],  // max amount of time to wait for response to the prompt. <= 0 means unlimited
        INITIAL_DELAY: 2,  // The delay (in seconds) before starting the prompts
        PROMPT_INTERVAL: 1,  // the delay between prompts
        PROMPT_COUNT: 2,  // number of prompts to show. -1 for unlimited
        SPEAK_SECTIONS: true,  // say the current section (via the speakers)

        START_TIME: 2,  // The time at which to start the video
        END_TIME: 6,  // The time at which to end the video
        VIDEO_URL: 'content/video.mp4',  // The file to use for the video
    };

    opts = opts || {};
    this.opts = {};
    Object.keys(DEFAULTS).forEach(setting => {
        this.opts[setting] = opts[setting] || DEFAULTS[setting];
    });
};

VideoPrompter.prototype.initialize = function () {
    // Build the HTML for the video prompter
    this.video = document.createElement('video');
    this.startMsg = document.createElement('div');
    this.usrPrompt = document.createElement('div');
    this.promptTitle = document.createElement('h1');
    this.promptBody = document.createElement('p');
    this.timerElement = document.createElement('p');
    this.btn = document.createElement('button');

    this.startMsg.setAttribute('class', 'startEndMsg');
    this.usrPrompt.setAttribute('class', 'prompt');
    this.promptTitle.setAttribute('class', 'prompt-title');
    this.promptBody.setAttribute('class', 'prompt-body');
    this.timerElement.setAttribute('class', 'timer');
    this.btn.setAttribute('class', 'btn');
    this.btn.innerHTML = 'Next Clip';

    this.element.appendChild(this.video);
    this.element.appendChild(this.startMsg);
    this.element.appendChild(this.usrPrompt);
    this.usrPrompt.appendChild(this.promptTitle);
    this.usrPrompt.appendChild(this.promptBody);
    this.usrPrompt.appendChild(this.timerElement);
    this.usrPrompt.appendChild(this.btn);

    this.video.setAttribute('src', this.opts.VIDEO_URL);
    this.video.setAttribute('type', 'video/mp4');

    this.video.currentTime = this.opts.START_TIME;
    this.opts.END_TIME = this.opts.END_TIME || this.video.duration;
    this.video.onclick = () => {
        if (this.video.paused && this.video.currentTime === this.opts.START_TIME) {
            this.hide(this.startMsg);  // Hide the initial message
            this.video.play();
            setTimeout(() => this.checkPause(), this.opts.INITIAL_DELAY * 1000);
        }
    };

    this.btn.onclick = () => this.playNext();

    this.currentPromptIndex = -1;
    this.timer = new Timer(this.timerElement);
    this.hide(this.usrPrompt);
    this.startMsg.innerHTML = this.opts.START_MESSAGE;
    this.handlers = {};
    this.handlers.onend = this.handlers.onprompt = () => {};
};

VideoPrompter.prototype.on = function (event, handler) {
    var fnName = 'on' + event;
    this.handlers[fnName] = handler;
};

VideoPrompter.prototype.hide = function (element) {
    element.style = 'display:none';
};

VideoPrompter.prototype.show = function (element) {
    element.style = 'display:block';
};

VideoPrompter.prototype.playVideo = function () {
  if (this.video.paused && !this.isVideoAtEnd()) {
    this.video.play();
  }

  this.hide(this.usrPrompt.style = 'display:none');
  if (this.hasRemainingPrompts()) {
      setTimeout(() => this.checkPause(), this.opts.PROMPT_INTERVAL * 1000);
  } else if (this.isVideoAtEnd()) {
    this.onVideoComplete();
  } else {
    var remainingDuration = this.opts.END_TIME - this.video.currentTime;
    setTimeout(() => this.onVideoComplete(), remainingDuration * 1000);
  }
};

VideoPrompter.prototype.hasRemainingPrompts = function() {
    return this.promptCount < this.opts.PROMPT_COUNT;
};

VideoPrompter.prototype.displayPrompt = function (index=0) {
    if (index === 0 && this.opts.SPEAK_SECTIONS) {
        this.announceSection();
    }
    this.video.pause();
    this.show(this.usrPrompt);

    // Set the correct prompt text and description from the settings
    var title = this.opts.PROMPT_TITLES[index];
    var desc = this.opts.PROMPT_DESCRIPTIONS[index] || '';
    this.promptTitle.innerHTML = title;
    this.promptBody.innerHTML = desc.replace(/\n/g, '<br/>');
    this.currentPromptIndex = index;

    var maxPromptWait = this.opts.PROMPT_DURATIONS[index];
    if (maxPromptWait > 0) {
        var currentTime = this.video.currentTime;
        this.timer.set(maxPromptWait);
        setTimeout(() => {
            var isStillPaused = this.video.paused &&
                this.video.currentTime === currentTime && this.currentPromptIndex === index;

            if (isStillPaused) {
              this.playNext();
            }
        }, maxPromptWait*1000);
    }
}

VideoPrompter.prototype.playNext = function () {
    var nextIndex = this.currentPromptIndex + 1;
    if (nextIndex < this.opts.PROMPT_TITLES.length) {  // if there is another prompt to show
        this.displayPrompt(nextIndex);
    } else {
        this.currentPromptIndex = -1;
        this.playVideo();

    }
};

VideoPrompter.prototype.checkPause = function () {
    if (!this.video.paused && this.hasRemainingPrompts()) {
        this.promptCount++;
        this.displayPrompt();
        this.handlers.onprompt(this.promptCount);
    } else if (this.isVideoAtEnd()) {
        this.onVideoComplete();
    }
};

VideoPrompter.prototype.onVideoComplete = function () {
    this.show(this.startMsg);
    this.startMsg.innerHTML = this.opts.END_MESSAGE;
    this.video.pause();
    this.handlers.onend();
};

VideoPrompter.prototype.isVideoAtEnd = function () {
    return this.video.currentTime >= this.opts.END_TIME;
};

VideoPrompter.NumberFor = [
    'zero',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'ten',
    'eleven',
    'twelve',
    'thirteen',
];

VideoPrompter.prototype.announceSection = function () {
  var synth = window.speechSynthesis;
  var msg = `Section ${VideoPrompter.NumberFor[this.promptCount]}`;
  var utterThis = new SpeechSynthesisUtterance(msg);
  utterThis.voice = synth.getVoices().find(voice => voice.lang === 'en-GB');
  synth.speak(utterThis);
};

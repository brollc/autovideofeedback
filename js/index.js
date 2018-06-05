var video = document.getElementById("myVideo");
var startMsg = document.getElementById("startEndMsg");
var usrPrompt = document.getElementById("prompt");
var promptTitle = document.getElementById("prompt-title");
var promptBody = document.getElementById("prompt-body");

var promptCount = 0;
function playVideo() {
  if (video.paused) {
    video.play();
  }
  usrPrompt.style = 'display:none';  // hide the button
  if (promptCount < SETTINGS.PROMPT_COUNT+1) {
      setTimeout(checkPause, SETTINGS.PROMPT_INTERVAL * 1000);
  }
}

var timerElement = document.getElementById('timer');
var currentPromptIndex = -1;
var timer = new Timer(timerElement);
function displayPrompt(index=0) {
    if (index === 0 && SETTINGS.SPEAK_SECTIONS) {
        announceSection();
    }
    console.log('displaying prompt at ' + video.currentTime);
    video.pause();
    usrPrompt.style = 'display:block';  // show the button

    // Set the correct prompt text and description from the settings
    var title = SETTINGS.PROMPT_TITLES[index];
    var desc = SETTINGS.PROMPT_DESCRIPTIONS[index] || '';
    promptTitle.innerHTML = title;
    promptBody.innerHTML = desc;
    currentPromptIndex = index;

    var maxPromptWait = SETTINGS.PROMPT_DURATIONS[index];
    if (maxPromptWait > 0) {
        var currentTime = video.currentTime;
        timer.set(maxPromptWait);
        setTimeout(function() {
            if (video.paused && video.currentTime === currentTime && currentPromptIndex === index) {
              playNext();
            }
        }, maxPromptWait*1000);
    }
}

function playNext() {
    var nextIndex = currentPromptIndex + 1;
    if (nextIndex < SETTINGS.PROMPT_TITLES.length) {  // if there is another prompt to show
        displayPrompt(nextIndex);
    } else {  // finished all the prompts, resume the video
        currentPromptIndex = -1;
        playVideo();
    }
}

video.currentTime = SETTINGS.START_TIME;
SETTINGS.END_TIME = SETTINGS.END_TIME || video.duration;
video.onclick = function() {
    if (video.paused && video.currentTime === SETTINGS.START_TIME) {
        startMsg.style = 'display:none';  // Hide the initial message
        video.play();
        setTimeout(checkPause, SETTINGS.INITIAL_DELAY * 1000);
    }
};

function checkPause() {
    if (!video.paused) {
        promptCount++;
        displayPrompt();
    }
    if (video.currentTime >= SETTINGS.END_TIME) {
        console.log('stopped!');
        // Display finished message
        //usrPrompt.style = 'display:block';  // show the button
        startMsg.style = 'display:block';  // Hide the initial message
        startMsg.innerHTML = SETTINGS.END_MESSAGE;
    }
}

function shouldStopAtTime(time) {
    return time > 0;
}

var synth = window.speechSynthesis;
var NumberFor = [
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

function announceSection() {
  var msg = `Section ${NumberFor[promptCount]}`;
  var utterThis = new SpeechSynthesisUtterance(msg);
  utterThis.voice = synth.getVoices().find(voice => voice.lang === 'en-GB');
  synth.speak(utterThis);
}

// Position the start message
startMsg.innerHTML = SETTINGS.START_MESSAGE;

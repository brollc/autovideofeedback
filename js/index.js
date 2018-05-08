var video = document.getElementById("myVideo");
var usrPrompt = document.getElementById("prompt");
var promptTitle = document.getElementById("prompt-title");
var promptBody = document.getElementById("prompt-body");

function playVideo() {
  if (video.paused) {
    video.play();
  }
  usrPrompt.style = 'display:none';  // hide the button
  SETTINGS.PROMPT_COUNT--;
  if (SETTINGS.PROMPT_COUNT > 0) {
      setTimeout(checkPause, SETTINGS.PROMPT_INTERVAL * 1000);
  }
}

function displayPrompt() {
    console.log('displaying prompt at ' + video.currentTime);
    video.pause();
    usrPrompt.style = 'display:block';  // show the button
    if (SETTINGS.MAX_PROMPT_WAIT > 0) {
        var currentTime = video.currentTime;
        setTimeout(function() {
            if (video.paused && video.currentTime === currentTime) {
                playVideo();
            }
        }, SETTINGS.MAX_PROMPT_WAIT*1000);
    }
}

video.onclick = function() {
    if (video.paused && video.currentTime === 0) {
        video.play();
        setTimeout(checkPause, SETTINGS.INITIAL_DELAY * 1000);
    }
};

function checkPause() {
    if (!video.paused) {
        displayPrompt();
    }
    if (video.currentTime === video.duration) {
        // Display finished message
        usrPrompt.style = 'display:block';  // show the button
    }
}

function shouldStopAtTime(time) {
    return time > 0;
}

// Use the same settings as with the actual video but change a couple things for the example...
SETTINGS.VIDEO_URL = 'content/example.mp4'
SETTINGS.END_TIME = 7.5;
SETTINGS.INITIAL_DELAY = 7.5;
SETTINGS.START_TIME = 0;
SETTINGS.PROMPT_COUNT = 1;

const player = new VideoPrompter(document.getElementById('replayer'), SETTINGS);

const tour = new Shepherd.Tour({
  defaults: { 
    classes: 'shepherd-theme-arrows',
    scrollTo: true
  }
});

tour.addStep('intro', {
    text: 'You will now view portions of the interaction you completed earlier. ' + 
        'The video will play for 30 seconds at a time. <br/>You will be asked to ' + 
        'report what you were feeling during that portion of the interaction and what you were thinking at that time. <br/>These questions will appear at the bottom of your screen after each section of video.<br/><br/>Please respond to the questions by speaking out loud. Before you begin, you will be shown a practice video clip.',
    buttons: [
        {
            text: 'Next',
            action: tour.next
        }
    ]
});

tour.addStep('background-click', {
    text: 'Prompts will be shown here.',
    attachTo: '.startEndMsg top',
    buttons: [
        {
            text: 'Next',
            action: tour.hide
        }
    ]
});

tour.addStep('prompt-dirs', {
    text: 'Directions will appear here. Please answer each prompt out loud, speaking clearly.',
    attachTo: '.prompt-title top',
    buttons: [
        {
            text: 'Next',
            action: tour.next
        }
    ]
});

tour.addStep('prompt-timer', {
    text: 'This timer will indicate how much time you have left to answer before the next section.',
    attachTo: '.timer left',
    buttons: [
        {
            text: 'Next',
            action: tour.next
        }
    ]
});

tour.addStep('prompt-next', {
    text: 'Click here if you have answered the prompt and wish to continue on to the next prompt.',
    attachTo: '.btn top',
    buttons: [
        {
            text: 'Next',
            action: tour.hide
        }
    ]
});

tour.addStep('more-prompts', {
    text: 'After completing the prompts, the next clip will play.',
    attachTo: '.btn top',
    buttons: [
        {
            text: 'Next',
            action: tour.hide
        }
    ]
});

// Show an initial explanation of clicking on the video
tour.addStep('finished', {
    text: 'This concludes the example video. The video of your interaction will now begin.' +
        '<br/>If you have any remaining questions, please notify your interviewer. If not, press "Continue" to begin.',
    buttons: [
        {
            text: 'Continue',
            action: function() {
                window.location.href = window.location.href.replace('/example.html', '/index.html');
            }
        }
    ]
});

tour.start();

player.on('end', function() {
    player.hide(player.startMsg);
    tour.next();
});

player.on('prompt', function() {
    tour.next();
});

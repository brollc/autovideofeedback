// Use the same settings as with the actual video but change a couple things for the example...
SETTINGS.VIDEO_URL = 'content/example.mp4'
SETTINGS.END_TIME = 20;
SETTINGS.PROMPT_INTERVAL = 11;
SETTINGS.INITIAL_DELAY = 7.5;
const player = new VideoPrompter(document.getElementById('replayer'), SETTINGS);
const initTour = new Shepherd.Tour({
  defaults: { 
    classes: 'shepherd-theme-arrows',
    scrollTo: true
  }
});

initTour.addStep('intro', {
    text: 'Hello and welcome to the video replayer thing!',
        //'Before we start with your video, we will introduce the ',
    buttons: [
        {
            text: 'Next',
            action: initTour.next
        }
    ]
});

initTour.addStep('background-click', {
    text: 'Click anywhere on the video to start',
        //'Before we start with your video, we will introduce the ',
    buttons: [
        {
            text: 'Next',
            action: initTour.next
        }
    ]
});

//initTour.addStep('background-click', {
    //text: 'After the video starts, you will view',
        ////'Before we start with your video, we will introduce the ',
    //buttons: [
        //{
            //text: 'Next',
            //action: initTour.next
        //}
    //]
//});


initTour.start();
// Show an initial explanation of clicking on the video
// TODO

player.on('end', function() {
    console.log('DONE!');
    // Show the final message explaining that the video is now complete.
    // Link to the actual video.
    // TODO
});

player.on('prompt', function(count) {
    //tour.start();
    console.log('prompt #', count);
    // Explain the prompts
    // TODO
});

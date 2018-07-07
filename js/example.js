// Use the same settings as with the actual video but change a couple things for the example...
SETTINGS.VIDEO_URL = 'content/example.mp4'
SETTINGS.END_TIME = 20;
SETTINGS.PROMPT_INTERVAL = 11;
SETTINGS.INITIAL_DELAY = 7.5;
var player = new VideoPrompter(document.getElementById('replayer'), SETTINGS);

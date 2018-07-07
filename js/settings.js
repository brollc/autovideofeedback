var SETTINGS = {
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

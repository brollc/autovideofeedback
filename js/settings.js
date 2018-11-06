const minutes = 60;
const SETTINGS = {
    START_MESSAGE: 'Click on the video to start',
    END_MESSAGE: 'You have now completed this portion of the study. An interviewer will be in shortly.',
    PROMPT_TITLES: [
      'What was going through your mind at this point?',
      'How were you feeling at this point? ',
    ],
    PROMPT_DESCRIPTIONS: [
      'Please state what you were thinking at this point? Respond out loud. Press "Next Clip" when finished',
      'Please state out loud which of the following emotions you were feeling at this point in the interaction:\n' +
      '- Angry\n- Sad\n- Happy\n- Fearful\n- Surprised\n- Disgusted\n',
    ],
    PROMPT_DURATIONS: [
      20,
      10,
    ],  // max amount of time to wait for response to the prompt. <= 0 means unlimited
    INITIAL_DELAY: 30,  // The delay (in seconds) before starting the prompts
    PROMPT_INTERVAL: 30,  // the delay between prompts
    PROMPT_COUNT: 8,  // number of prompts to show. -1 for unlimited
    SPEAK_SECTIONS: true,  // say the current section (via the speakers)

    START_TIME: 3*minutes,  // The time at which to start the video
    END_TIME: 7*minutes,  // The time at which to end the video
    VIDEO_URL: 'content/video.mp4',  // The file to use for the video
};

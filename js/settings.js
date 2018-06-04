var SETTINGS = {
    //START_TIME: 1,  // add a start time, not done yet
    PROMPT_COUNT: 3,  // number of prompts to show. -1 for unlimited
    PROMPT_TITLES: [
      'How were you feeling at this point? ',
      'What was going through your mind at this point?',
    ],
    PROMPT_DESCRIPTIONS: [
      'Please state out loud which of the following emotions you were feeling at this point in the interaction:\n Angry Sad Happy Fearful ',
      'Please state what you were thinking at this point? Respond out loud. Press "Resume" when finished',
    ],
    INITIAL_DELAY: 2,  // The delay (in seconds) before starting the prompts
    PROMPT_INTERVAL: 1,  // the delay between prompts
    PROMPT_DURATIONS: [
      10,
      5
    ],  // max amount of time to wait for response to the prompt. <= 0 means unlimited
    START_MESSAGE: 'Click anywhere to Start',
};

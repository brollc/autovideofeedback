try {
    var PROMPTS = [
        {
            time: 1,
            prompt: 'How did you feel at this point?',
            description: 'Please respond into your audio recorder. Press "Resume" when finished'
        },
    ];
} catch (e) {
    console.error('Could not understand prompts (probably a typo):' + e.message);
}

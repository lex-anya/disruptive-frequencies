document.addEventListener('DOMContentLoaded', () => {
    const playSoundsBtn1 = document.getElementById('playSoundsBtn1');
    const playSoundsBtn2 = document.getElementById('playSoundsBtn2');
    const screen1 = document.getElementById('screen1');
    const screen2 = document.getElementById('screen2');
    const screen3a = document.getElementById('screen3a');
    const screen3b = document.getElementById('screen3b');
    const screen4 = document.getElementById('screen4');
    const word1 = document.getElementById('word1');
    const word2 = document.getElementById('word2');
    const word3 = document.getElementById('word3');
    const word4 = document.getElementById('word4');
    const errorMessage = document.getElementById('errorMessage');
    const glitchVideo = document.getElementById('glitchVideo');

    playSoundsBtn1.addEventListener('click', () => {
        screen1.style.display = 'none';
        screen2.style.display = 'block';
    });

    playSoundsBtn2.addEventListener('click', () => {
        const inputWords = [
            word1.value.trim().toLowerCase(),
            word2.value.trim().toLowerCase(),
            word3.value.trim().toLowerCase(),
            word4.value.trim().toLowerCase()
        ];
        const correctWords = ['cycle', 'drift', 'failure', 'imminent'];

        if (JSON.stringify(inputWords) === JSON.stringify(correctWords)) {
            screen2.style.display = 'none';
            screen3a.style.display = 'block';
            errorMessage.style.display = 'none';

            // Play the initial audio
            const initialAudio = new Audio('voiceover.mp3');
            initialAudio.play();

            initialAudio.addEventListener('ended', () => {
                screen3a.style.display = 'none';
                screen3b.style.display = 'block';
                // After initial audio ends, show video effect
                const glitchAudio = new Audio('glitchAudio.mp3');
                glitchAudio.play();

                glitchVideo.play();

                glitchAudio.addEventListener('ended', () => {
                    // Pause for 0.1 seconds before transitioning to screen 4
                    setTimeout(() => {
                        screen3b.style.display = 'none';
                        screen4.style.display = 'block';
                    }, 100);
                });
            });
        } else {
            errorMessage.style.display = 'block';
        }
    });
});

function playSound(index) {
    const sound = document.getElementById(`sound${index}`);
    const wave = document.getElementById(`wave${index}`);
    const bars = wave.querySelectorAll('.bar');
    if (sound) {
        wave.style.display = 'flex'; // Show the sound wave
        sound.play();
        bars.forEach(bar => {
            bar.style.animationPlayState = 'running';
        });
        sound.addEventListener('ended', () => {
            bars.forEach(bar => {
                bar.style.animationPlayState = 'paused';
            });
            wave.style.display = 'none'; // Hide the sound wave when sound ends
        });
    } else {
        console.error(`Sound ${index} not found`);
    }
}

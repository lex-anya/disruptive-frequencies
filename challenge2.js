document.addEventListener('DOMContentLoaded', () => {
    const playSoundsBtn1 = document.getElementById('playSoundsBtn1');
    const playSoundsBtn2 = document.getElementById('playSoundsBtn2');
    const screen1 = document.getElementById('screen1');
    const screen2 = document.getElementById('screen2');
    const screen3 = document.getElementById('screen3');
    const screen4 = document.getElementById('screen4');
    const word1 = document.getElementById('word1');
    const word2 = document.getElementById('word2');
    const word3 = document.getElementById('word3');
    const word4 = document.getElementById('word4');
    const errorMessage = document.getElementById('errorMessage');

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
            screen3.style.display = 'block';
            errorMessage.style.display = 'none';

            // Play the initial audio
            const initialAudio = new Audio('voiceover.mp3');
            initialAudio.play();

            initialAudio.addEventListener('ended', () => {
                // After initial audio ends, show glitch effect
                const glitchAudio = new Audio('glitchAudio.mp3');
                glitchAudio.play();

                // Create multiple glitch lines
                const glitchContainer = document.querySelector('.glitch-container');
                if (glitchContainer) {
                    console.log('Glitch container found');
                    for (let i = 0; i < 100; i++) {
                        const glitchLine = document.createElement('div');
                        glitchLine.classList.add('glitch-line');
                        glitchLine.style.top = `${Math.random() * 100}%`;
                        glitchLine.style.height = `${Math.random() * 3 + 1}px`; // Vary line thickness
                        glitchLine.style.animationDuration = `${Math.random() * 0.5 + 0.1}s`;
                        glitchLine.style.animationDelay = `${Math.random() * 0.5}s`;

                        // Randomly assign colors to the glitch lines
                        const randomColor = Math.random();
                        if (randomColor < 0.80) {
                            glitchLine.style.backgroundColor = '#00ff00'; // Green (80% chance)
                        } else if (randomColor < 0.90) {
                            glitchLine.style.backgroundColor = '#ff0000'; // Red (10% chance)
                        } else {
                            glitchLine.style.backgroundColor = '#ffffff'; // White (10% chance)
                        }

                        // Add horizontal shifts
                        glitchLine.style.transform = `translateX(${Math.random() * 20 - 10}px)`;

                        // Introduce flickering
                        if (Math.random() < 0.2) {
                            glitchLine.style.animationName = 'glitch-flicker';
                        }

                        glitchContainer.appendChild(glitchLine);
                        console.log(`Glitch line ${i} created with color ${glitchLine.style.backgroundColor}`);
                    }
                } else {
                    console.error('Glitch container not found');
                }

                glitchAudio.addEventListener('ended', () => {
                    screen3.style.display = 'none';
                    screen4.style.display = 'block';
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

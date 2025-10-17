// --- Breathing Animation Logic (Unchanged) ---
const instructions = document.getElementById('instructions');
const circle = document.querySelector('.circle');
const startStopBtn = document.getElementById('start-stop-btn');
let isPaused = false;

const totalTime = 8000;
const breatheTime = 3500;
const holdTime = 1000;

function runBreathingAnimation() {
    instructions.innerText = 'Breathe In...';
    setTimeout(() => { instructions.innerText = 'Hold'; }, breatheTime);
    setTimeout(() => { instructions.innerText = 'Breathe Out...'; }, breatheTime + holdTime);
}

let textInterval = setInterval(runBreathingAnimation, totalTime);
runBreathingAnimation();

startStopBtn.addEventListener('click', () => {
    isPaused = !isPaused;
    if (isPaused) {
        circle.style.animationPlayState = 'paused';
        clearInterval(textInterval);
        startStopBtn.textContent = 'Resume';
    } else {
        circle.style.animationPlayState = 'running';
        textInterval = setInterval(runBreathingAnimation, totalTime);
        runBreathingAnimation();
        startStopBtn.textContent = 'Pause';
    }
});

// --- NEW Custom Audio Player Logic ---
const audioControls = document.querySelectorAll('.audio-control');

audioControls.forEach(control => {
    const audio = control.previousElementSibling; // Gets the <audio> tag right before the button
    const icon = control.querySelector('i');

    control.addEventListener('click', () => {
        if (audio.paused) {
            // Pause all other audio before playing a new one
            document.querySelectorAll('audio').forEach(el => el.pause());
            document.querySelectorAll('.audio-control i').forEach(i => i.className = 'fas fa-play');

            // Play the clicked audio
            audio.play();
            icon.className = 'fas fa-pause';
        } else {
            audio.pause();
            icon.className = 'fas fa-play';
        }
    });

    // When an audio finishes, reset its button icon
    audio.addEventListener('ended', () => {
        icon.className = 'fas fa-play';
    });
});


// --- Positive Affirmations Logic (Unchanged) ---
const affirmationText = document.getElementById('affirmation-text');
const newAffirmationBtn = document.getElementById('new-affirmation-btn');

const affirmations = [
    "You are capable of handling any challenge.",
    "Today, you will be calm and focused.",
    "You are worthy of peace and happiness.",
    "Every breath you take brings you more tranquility.",
    "You are in control of your thoughts.",
    "It's okay to take a break.",
    "You are strong and resilient.",
    "You are doing your best, and that is enough."
];

newAffirmationBtn.addEventListener('click', () => {
    const randomIndex = Math.floor(Math.random() * affirmations.length);
    affirmationText.textContent = affirmations[randomIndex];
});
// --- Breathing Animation Logic ---
const instructions = document.getElementById('instructions');
const circle = document.querySelector('.circle');
const backgroundGlow = document.querySelector('.breathing-container');
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

// Controls the animation text loop
let textInterval = setInterval(runBreathingAnimation, totalTime);
runBreathingAnimation(); // Start immediately

// Event listener for the new Start/Pause button
startStopBtn.addEventListener('click', () => {
    isPaused = !isPaused; // Toggle the state
    if (isPaused) {
        // Pause everything
        circle.style.animationPlayState = 'paused';
        backgroundGlow.style.setProperty('--animation-state', 'paused'); // Custom property for pseudo-element
        clearInterval(textInterval);
        startStopBtn.textContent = 'Resume';
    } else {
        // Resume everything
        circle.style.animationPlayState = 'running';
        backgroundGlow.style.setProperty('--animation-state', 'running');
        textInterval = setInterval(runBreathingAnimation, totalTime);
        runBreathingAnimation(); // Run once immediately to sync
        startStopBtn.textContent = 'Pause';
    }
});


// --- Positive Affirmations Logic ---
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
    // Pick a random affirmation from the array
    const randomIndex = Math.floor(Math.random() * affirmations.length);
    affirmationText.textContent = affirmations[randomIndex];
});
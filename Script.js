// Get elements
const questionPage = document.getElementById('questionPage');
const messagePage = document.getElementById('messagePage');
const puzzlePage = document.getElementById('puzzlePage');

const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const puzzleBtn = document.getElementById('puzzleBtn');
const backToQuestion = document.getElementById('backToQuestion');
const backToMessage = document.getElementById('backToMessage');

let noBtnIsMoving = false;
let originalNoBtnPosition = { x: 0, y: 0 };

// Function to get random position within the specified rectangle relative to original position
function getRandomPosition() {
    // Rectangle boundaries relative to original position (0,0):
    // X: from -500px to +500px
    // Y: from -300px to +300px
    
    const minOffsetX = -200;
    const maxOffsetX = 200;
    const minOffsetY = -100;
    const maxOffsetY = 100;
    
    // Generate random offset within the rectangle
    const randomOffsetX = Math.random() * (maxOffsetX - minOffsetX) + minOffsetX;
    const randomOffsetY = Math.random() * (maxOffsetY - minOffsetY) + minOffsetY;
    
    // Calculate new position based on original position + random offset
    let newX = originalNoBtnPosition.x + randomOffsetX;
    let newY = originalNoBtnPosition.y + randomOffsetY;
    
    // Make sure position stays within viewport bounds
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;
    
    // Clamp to viewport if needed
    newX = Math.max(10, Math.min(newX, viewportWidth - btnWidth - 10));
    newY = Math.max(10, Math.min(newY, viewportHeight - btnHeight - 10));
    
    return { x: newX, y: newY };
}

// Move No button to random position
function moveNoButton() {
    // Store original position only once, before first move
    if (!noBtnIsMoving) {
        const rect = noBtn.getBoundingClientRect();
        originalNoBtnPosition = {
            x: rect.left,
            y: rect.top
        };
        noBtnIsMoving = true;
        noBtn.classList.add('moving');
    }
    
    const pos = getRandomPosition();
    
    // Set position to fixed so it can move anywhere on screen
    noBtn.style.position = 'fixed';
    noBtn.style.left = pos.x + 'px';
    noBtn.style.top = pos.y + 'px';
}

// Event Listeners for No button
noBtn.addEventListener('mouseenter', moveNoButton);
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    moveNoButton();
});

// For touch devices
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveNoButton();
});

// Yes button click - show message page
yesBtn.addEventListener('click', () => {
    questionPage.classList.remove('active');
    messagePage.classList.add('active');
    
    // Reset no button position
    resetNoButton();
    
    // Add confetti effect
    createConfetti();
});

// Puzzle button click - show puzzle page
puzzleBtn.addEventListener('click', () => {
    messagePage.classList.remove('active');
    puzzlePage.classList.add('active');
});

// Back button navigation
backToQuestion.addEventListener('click', () => {
    messagePage.classList.remove('active');
    questionPage.classList.add('active');
    
    // Reset no button position
    resetNoButton();
});

backToMessage.addEventListener('click', () => {
    puzzlePage.classList.remove('active');
    messagePage.classList.add('active');
});

// Reset no button to original position
function resetNoButton() {
    noBtnIsMoving = false;
    noBtn.classList.remove('moving');
    noBtn.style.position = 'relative';
    noBtn.style.left = '';
    noBtn.style.top = '';
    // Don't recalculate original position - keep the very first one
}

// Confetti effect function - yogurt themed
function createConfetti() {
    const colors = ['#ff69b4', '#ffb6c1', '#ff1493', '#ffc8d4', '#dda0dd', '#fff9fb', '#ffe8f0'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.opacity = '1';
        confetti.style.borderRadius = '50%';
        confetti.style.zIndex = '9999';
        confetti.style.pointerEvents = 'none';
        
        document.body.appendChild(confetti);
        
        // Animate confetti
        const duration = Math.random() * 3 + 2;
        const xMovement = (Math.random() - 0.5) * 200;
        
        confetti.animate([
            { 
                transform: 'translateY(0px) translateX(0px) rotate(0deg)',
                opacity: 1
            },
            { 
                transform: `translateY(${window.innerHeight}px) translateX(${xMovement}px) rotate(${Math.random() * 720}deg)`,
                opacity: 0
            }
        ], {
            duration: duration * 1000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });
        
        // Remove confetti after animation
        setTimeout(() => {
            confetti.remove();
        }, duration * 1000);
    }
}

// Add extra floating yogurt-themed elements animation
function createFloatingElements() {
    const elements = ['🥛', '🥛', '🥛', '🥛', '🥛', '🥛', '🥛'];
    const container = document.querySelector('.floating-hearts');
    
    setInterval(() => {
        const element = document.createElement('span');
        element.className = 'heart';
        element.textContent = elements[Math.floor(Math.random() * elements.length)];
        element.style.left = Math.random() * 100 + '%';
        element.style.fontSize = (Math.random() * 20 + 20) + 'px';
        element.style.animationDuration = (Math.random() * 5 + 8) + 's';
        
        container.appendChild(element);
        
        // Remove after animation
        setTimeout(() => {
            element.remove();
        }, 13000);
    }, 3000);
}

// Initialize
createFloatingElements();

// Prevent right-click to avoid cheating with No button
document.addEventListener('contextmenu', (e) => {
    if (e.target === noBtn) {
        e.preventDefault();
    }
});
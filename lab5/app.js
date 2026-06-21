const menuArea = document.getElementById("menuArea");
const gameArea = document.getElementById("gameArea");
const difficultySelect = document.getElementById("difficultySelect");
const colorSelect = document.getElementById("colorSelect");
const startBtn = document.getElementById("startBtn");

const scoreDisplay = document.getElementById("scoreDisplay");
const timeDisplay = document.getElementById("timeDisplay");
const targetBox = document.getElementById("targetBox");

let score = 0;
let maxTime = 0;
let timeLeft = 0;
let gameTimerId = null;

startBtn.addEventListener("click", function() {
    const selectedDifficulty = difficultySelect.value;
    const selectedColor = colorSelect.value;

    if (selectedDifficulty === "" || selectedColor === "") {
        alert("Будь ласка, оберіть складність та колір перед початком!");
        return;
    }

    maxTime = parseInt(selectedDifficulty); 
    targetBox.style.backgroundColor = selectedColor;

    menuArea.style.display = "none";
    gameArea.style.display = "block";
    targetBox.style.display = "block";

    score = 0;
    updateScore();

    spawnTarget();
});

targetBox.addEventListener("click", function() {
    score++;
    updateScore();
    spawnTarget();
});

function updateScore() {
    scoreDisplay.textContent = `score: ${score}`;
}

function spawnTarget() {
    clearInterval(gameTimerId);

    const maxX = window.innerWidth - 50; 
    const maxY = window.innerHeight - 50;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * (maxY - 80)) + 80; 

    targetBox.style.left = randomX + "px";
    targetBox.style.top = randomY + "px";

    timeLeft = maxTime;

    gameTimerId = setInterval(function() {
        timeLeft -= 10;
        
        timeDisplay.textContent = `time left for click: ${(timeLeft / 1000).toFixed(2)}`;

        if (timeLeft <= 0) {
            clearInterval(gameTimerId);
            gameOver();
        }
    }, 10);
}

function gameOver() {
    targetBox.style.display = "none";
    
    // Символ \n робить перенесення тексту на новий рядок у вікні alert.
    alert(`Game over! Your score is ${score}, congratulations!\nPlease, reload the page to start a new game.`);
}

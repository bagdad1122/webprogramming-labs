const boardElement = document.getElementById('board');
const levelSelect = document.getElementById('levelSelect');
const loadBtn = document.getElementById('loadBtn');
const stepsCountElement = document.getElementById('stepsCount');
const minStepsCountElement = document.getElementById('minStepsCount');

let gridData = [];
let currentSteps = 0;
let isGameActive = false;

async function loadLevel() {
    const selectedLevel = levelSelect.value;

    try {
        const response = await fetch('data/levels.json');
        
        if (!response.ok) {
            throw new Error('Помилка мережі при завантаженні levels.json');
        }

        const data = await response.json();
        const levelData = data[selectedLevel];
      
        gridData = JSON.parse(JSON.stringify(levelData.grid)); 
        currentSteps = 0;
        isGameActive = true;

        stepsCountElement.textContent = currentSteps;
        minStepsCountElement.textContent = levelData.minSteps;
        
        renderBoard();

    } catch (error) {
        console.error('Сталася помилка:', error);
        alert('Не вдалося завантажити рівень.');
    }
}

function renderBoard() {
    boardElement.innerHTML = '';

    for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            
            if (gridData[row][col] === 1) {
                cell.classList.add('on');
            }

            cell.dataset.row = row;
            cell.dataset.col = col;

            cell.addEventListener('click', handleCellClick);

            boardElement.appendChild(cell);
        }
    }
}

function handleCellClick(event) {
    if (!isGameActive) return;

    const row = parseInt(event.target.dataset.row);
    const col = parseInt(event.target.dataset.col);
  
    toggleLight(row, col);
    toggleLight(row - 1, col);
    toggleLight(row + 1, col);
    toggleLight(row, col - 1);
    toggleLight(row, col + 1);

    currentSteps++;
    stepsCountElement.textContent = currentSteps;

    renderBoard();

    checkWinCondition();
}

function toggleLight(row, col) {
    if (row >= 0 && row < 5 && col >= 0 && col < 5) {
        gridData[row][col] = gridData[row][col] === 1 ? 0 : 1;
    }
}

function checkWinCondition() {
    let allLightsOff = true;

    for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
            if (gridData[row][col] === 1) {
                allLightsOff = false;
                break;
            }
        }
    }

    if (allLightsOff) {
        isGameActive = false;
        
        setTimeout(() => {
            alert(`Вітаємо! Ви виграли!\nКроків витрачено: ${currentSteps}`);
        }, 100);
    }
}

loadBtn.addEventListener('click', loadLevel);

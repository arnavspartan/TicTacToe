/* window.addEventListener("load", initEvents);

function initEvents() {
    loadButton();
}

winningCombinations = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7]
]

function loadButton() {
    var table = document.querySelector("#gameBoard");
    for(var i=0; i<3; i++) {
        var tr = table.insertRow();
    }
}

function userMove() {
    if (gameOver) return;

    this.innerHtml = "X";
    this.style.backgroundColor = "red";

    this.setAttribute("disabled", "true");

    checkWinner();
}

function checkWinner() {
    btns = document.querySelector(".btn");
    for (let combo of winningCombinations) {
        [a, b, c] = combo;
        if (btns[a].innerHtml &&
            btns[a].innerHtml === btns[b].innerHtml
            && btns[a].innerHtml === btns[c].innerHtml)
            alert(btns[a].innerHtml = btns[c].innerHtml);
    }
} */

document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const statusText = document.querySelector('#status');
    const restartButton = document.querySelector('#restartButton');
    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let gameActive = true;

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleCellClick(event) {
        const cellIndex = event.target.getAttribute('data-index');

        if (board[cellIndex] !== '' || !gameActive) {
            return;
        }

        updateCell(event.target, cellIndex);
        checkResult();
        if (gameActive) {
            setTimeout(computerTurn, 500);
        }
    }

    function updateCell(cell, index) {
        board[index] = currentPlayer;
        cell.textContent = currentPlayer;
    }

    function switchPlayer() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    function checkResult() {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const condition = winningConditions[i];
            const a = board[condition[0]];
            const b = board[condition[1]];
            const c = board[condition[2]];

            if (a === '' || b === '' || c === '') {
                continue;
            }

            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            statusText.textContent = `${currentPlayer} wins!`;
            gameActive = false;
            return;
        }

        if (!board.includes('')) {
            statusText.textContent = 'Draw!';
            gameActive = false;
            return;
        }

        switchPlayer();
    }

    function computerTurn() {
        if (!gameActive) {
            return;
        }

        let emptyCells = [];
        board.forEach((cell, index) => {
            if (cell === '') {
                emptyCells.push(index);
            }
        });

        const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        const cell = document.querySelector(`.cell[data-index='${randomIndex}']`);
        updateCell(cell, randomIndex);
        checkResult();
    }

    function restartGame() {
        currentPlayer = 'X';
        board = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        cells.forEach(cell => {
            cell.textContent = '';
        });
        statusText.textContent = 'Player X\'s turn';
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', restartGame);
});

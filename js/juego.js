const cells = document.querySelectorAll("[data-cell]");
const winnerMessageElement = document.getElementById("winnerMessage");
const winnerElement = document.getElementById("winner");
const restartButton = document.getElementById("restartButton");

let isXTurn = true;
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

startGame();

restartButton.addEventListener("click", startGame);

function startGame() {
    isXTurn = true;
    cells.forEach(cell => {
        cell.classList.remove("x");
        cell.classList.remove("o");
        cell.textContent = "";  // Limpiar el contenido del texto
        cell.removeEventListener("click", handleClick);
        cell.addEventListener("click", handleClick, { once: true });
    });
    winnerMessageElement.classList.remove("active");
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = isXTurn ? "x" : "o";
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
    }
}

function placeMark(cell, currentClass) {
    cell.textContent = currentClass.toUpperCase();  // Muestra X o O en la celda
}

function swapTurns() {
    isXTurn = !isXTurn;
}

function checkWin(currentClass) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].textContent === currentClass.toUpperCase();
        });
    });
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.textContent === "X" || cell.textContent === "O";
    });
}

function endGame(draw) {
    if (draw) {
        winnerElement.innerText = "Empate";
    } else {
        winnerElement.innerText = isXTurn ? "X" : "O";
    }
    winnerMessageElement.classList.add("active");
}

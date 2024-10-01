const cells = document.querySelectorAll("[data-cell]");
const tablero = document.querySelector(".tablero");
const ganadorMensaje = document.getElementById("ganadorMensaje");
const ganadorElemento = document.getElementById("ganador");
const reiniciar = document.getElementById("reiniciarBoton");

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
    cell.classList.add(currentClass);
}

function swapTurns() {
    isXTurn = !isXTurn;
}

function checkWin(currentClass) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains("x") || cell.classList.contains("o");
    });
}

function endGame(draw) {
    if (draw) {
        ganadorElemento.innerText = "Empate";
    } else {
        ganadorElemento.innerText = isXTurn ? "X" : "O";
    }
    ganadorMensaje.classList.add("active");
}

const celdas = document.querySelectorAll("[data-cell]");
const mensajeGanadorElemento = document.getElementById("ganadorMensaje");
const ganadorElemento = document.getElementById("ganador");
const botonReiniciar = document.getElementById("reiniciarBoton");

let turnoDeX = true; //indica si es turno del jugador x (true) o del jugador o (false)
const combinacionesGanadoras = [ //array con combinaciones posibles ganadoras (vertical, horizontal y diagonal)
    [0, 1, 2], //fila superior
    [3, 4, 5], //fila central
    [6, 7, 8], // fila inferior

    [0, 3, 6], // columna izquierda
    [1, 4, 7], // columna central 
    [2, 5, 8], // columna derecha

    [0, 4, 8], // diagonal principal
    [2, 4, 6] // diagonal inversa
];

iniciarJuego(); 
//se llama al principio del código para iniciar el juego. También se ejecuta cuando se hace clic en el botón de reinici

botonReiniciar.addEventListener("click", iniciarJuego);
/* añade un evento al botón de reinicio. 
Cuando se hace clic, se vuelve a ejecutar la función iniciarJuego para empezar una nueva partida */

function iniciarJuego() {
    turnoDeX = true; // se asegura de que el jugador x empiece el juego 
    celdas.forEach(celda => {
        celda.classList.remove("x"); //remueve las clases x y o
        celda.classList.remove("o");
        celda.textContent = "";  //limpia el contenido de la celda
        celda.removeEventListener("click", manejarClick); //quita cualquier evento anterior
        celda.addEventListener("click", manejarClick, { once: true }); //añade un nuevo evento click para que se pueda marcar la celda solo una vez
    });
    mensajeGanadorElemento.classList.remove("active"); //oculta el mensaje de ganador al iniciar una partida
}

function manejarClick(e) {
    const celda = e.target; //obtiene la celda en la que el jugador hizo click
    const claseActual = turnoDeX ? "x" : "o"; //depende de si es el turno de x o o, se asigna la clase correspondiente
    colocarMarca(celda, claseActual); //coloca una x o o en donde se hizo click
    if (verificarGanador(claseActual)) { //verfica si el jugador actual ha ganado despues de colocar su marca
        finalizarJuego(false); //si el jugador ha ganado, se termina el juego
    } else if (esEmpate()) {
        finalizarJuego(true); //si es empate (todas las celdas ocupadas sin que haya un ganador), se termina el juego
    } else {
        cambiarTurno(); //si no hay ganador ni empate, cambia de turno
    }
}

function colocarMarca(celda, claseActual) {
    celda.textContent = claseActual.toUpperCase();  //muestra X o O en la celda
}

function cambiarTurno() {
    turnoDeX = !turnoDeX; //invierte el turno entre el jugador x y el jugador o
}

function verificarGanador(claseActual) {
    return combinacionesGanadoras.some(combinacion => {
        return combinacion.every(indice => {
            return celdas[indice].textContent === claseActual.toUpperCase();
        });
    });//recorre todas las cominaciones ganadoras posbles y verifica si alguna combinacion se cumple
}

function esEmpate() {
    return [...celdas].every(celda => {
        return celda.textContent === "X" || celda.textContent === "O";
    });
} //verifica si todas las celdas estan ocupadas y no hay ganador, significa que es un empate

function finalizarJuego(empate) {
    if (empate) {
        ganadorElemento.innerText = "Empate"; //muestra empate en el mensaje
    } else {
        ganadorElemento.innerText = turnoDeX ? "X ganaste!" : "O ganaste!"; //si hay un ganador, se muestra que el jugador ganó
    }
    mensajeGanadorElemento.classList.add("active"); //muestra el mensaje de ganador en la pantalla
}

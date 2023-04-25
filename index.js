//variable para tablero vacio
const tablero = ['', '', '', '', '', '', '', '', ''];



//funcion para verificar ganador
function verificarGanador(player) {
  const combosGanadores = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
  ];
  return combosGanadores.some(combo => combo.every(index => tablero[index] === player));
};


//funcion minimax
function minimax (jugadas, player) {
  if (verificarGanador('O')) return 10 - jugadas;
  if (verificarGanador('X')) return jugadas - 10;
  if (tablero.every(casilla => casilla !== '')) return 0;

  const puntajes = [];

  for (let i = 0; i < tablero.length; i++) {
    if (tablero[i] === '') {
      tablero[i] = player;
      puntajes.push(minimax(jugadas + 1, player === 'O' ? 'X' : 'O'));
      tablero[i] = '';
    }
  }

  return player === 'O' ? Math.max(...puntajes) : Math.min(...puntajes);
};



//funcion para determinar el mejor movimiento
function mejorMovimiento(){
  let mejorValor = -Infinity;
  let mejorMov;

  for (let i = 0; i < tablero.length; i++) {
    if (tablero[i] === '') {
      tablero[i] = 'O';
      const puntaje = minimax(0, 'X');
      tablero[i] = '';

      if (puntaje > mejorValor) {
        mejorValor = puntaje;
        mejorMov = i;
      }
    }
  }

  return mejorMov;
};

//funcion para seleccionar casilla
function casillaClick(event){
  const casilla = event.target;

  if (casilla.innerHTML === '') {
    casilla.innerHTML = 'X';
    tablero[casilla.id] = 'X';

    if (verificarGanador('X')) {
      alert('¡Ganaste esta ronda "X"!');
      return;
    }

    const aiMov = mejorMovimiento();
    tablero[aiMov] = 'O';
    document.getElementById(aiMov).innerHTML = 'O';

    if (verificarGanador('O')) {
      alert('Ganaste esta ronda "O"!');
      return;
    }
  }
};

//funcion para reiniciar
function resetGame(){
    tablero.fill('');
    document.querySelectorAll('.casilla').forEach(square => {
      square.innerHTML = '';
    });
  };

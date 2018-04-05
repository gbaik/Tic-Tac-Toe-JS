let state = {
  winCondition: false,
  winner: null,
  turn: 'X',
  boardPlacement: [
  null, null, null, 
  null, null, null, 
  null, null, null
  ]
};

const updateMessage = () => {
  let message = document.getElementById('turn');

  if (state.winCondition) {
    message.innerHTML = `Congratulations ${state.winner} you won!`;
  } else {
    message.innerHTML = `Your move ${state.turn}`;
  }
}

const updateBoard = (event) => {
  const { turn, boardPlacement } = state;
  let id = event.toElement.id;

  if (boardPlacement[id]) {
    alert('Already clicked, select something');
  } else if (state.winCondition) {
    alert('You won, please reset board');
  } else {
    boardPlacement[id] = turn;
    state.turn = turn === 'X' ? 'O' : 'X';

    document.getElementById(id).innerHTML = turn;
    
    checkWin();
    updateMessage();
  }
}

const checkHorizontal = (row) => {
  let placement = state.boardPlacement;
  if ((placement[row] === 'X' || placement[row] ==='O') && (placement[row] === placement[row + 1]) && (placement[row + 1] === placement[row + 2])) {
    state.winner = placement[row];
    state.winCondition = true;
  }
}

const checkVertical = (column) => {
  let placement = state.boardPlacement;
  if ((placement[column] === 'X' || placement[column] ==='O') && (placement[column] === placement[column + 3]) && (placement[column + 3] === placement[column + 6])) {
    state.winner = placement[column];
    state.winCondition = true;
  }
}

const checkMajorDiagonal = () => {
  let placement = state.boardPlacement;
  if ((placement[0] === 'X' || placement[0] ==='O') && (placement[0] === placement[4]) && (placement[4] === placement[8])) {
    state.winner = placement[0];
    state.winCondition = true;
  }
}

const checkMinorDiagonal = () => {
  let placement = state.boardPlacement;
  if ((placement[2] === 'X' || placement[2] ==='O') && (placement[2] === placement[4]) && (placement[4] === placement[6])) {
    state.winner = placement[2];
    state.winCondition = true;
  }
}

const checkWin = () => {
  for (let i = 0; i < 3; i++) {
    checkHorizontal(i * 3);
    checkVertical(i);
  }

  checkMajorDiagonal();
  checkMinorDiagonal();
}

const reset = () => {
  state = {
    winCondition: false,
    winner: null,
    turn: 'X',
    boardPlacement: [
    null, null, null, 
    null, null, null, 
    null, null, null
    ]
  };

  let tableRows = document.getElementsByTagName("td");

  for (var i = 0; i < tableRows.length; i++) {
    tableRows[i].innerHTML = '';
  }

  updateMessage();  
}

document.getElementsByClassName("board")[0].addEventListener("click", updateBoard);
document.getElementById("reset").addEventListener("click", reset);
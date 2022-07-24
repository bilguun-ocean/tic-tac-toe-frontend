const createPlayer = (name, mark) => {
  return {name, mark}
}


const gameBoard = (() => {

  let _board = ['','','',
               '','','',
               '','','']

  const player1 = createPlayer("Player1", "X")
  const player2 = createPlayer("Player2", "O")
  let currentPlayer = player1

  const gameBoardBoxes = document.querySelectorAll('.box');

  const renderBoard = ()=> {
    for (let index = 0; index < _board.length; index++) {
      gameBoardBoxes[index].textContent = _board[index]
    }
  }

  const swapCurrentPlayer = ()=> {
    currentPlayer = (currentPlayer == player1) ? player2 : player1 
  }

  const _addMarks = (index) => {
    let mark = "test"
    if (_board[index] === '')
    _board[index] = currentPlayer.mark
  }

  const gameBoardBoxListener = () => {
    for(const box of gameBoardBoxes) {
      const index = box.dataset.index
      box.addEventListener("click", () => {
        _addMarks(index)
        renderBoard()
        swapCurrentPlayer()
      })
    }
  }

  return {gameBoardBoxListener}
})();

const displayController = (() => {
  //Public functions 
})();
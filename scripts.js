const gameBoard = (() => {
  let board = [
    ['','O','X'],
    ['X','O','O'],
    ['X','X','O']
  ]

  const renderBoard = ()=> {
    const gameBoardBoxes = document.querySelectorAll('.box');
    for (let row = 0, index = 0; row < board.length; row++) {
      for (let column = 0; column < board[row].length; column++, index++) {
        gameBoardBoxes[index].textContent = board[row][column]
      }
    }
  }

  const addMarks = (mark, row, column) => {
    if (board[row][column] === '')
      board[row][column] = mark
  }

  return {renderBoard, addMarks}
})();

const displayController = (() => {

})();

const createPlayer = (name) => {
  
}

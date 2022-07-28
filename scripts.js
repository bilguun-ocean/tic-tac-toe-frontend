const createPlayer = (name, mark) => {
  return {name, mark}
}


const gameBoard = (() => {

  let _board = ['','','',
               '','','',
               '','',''];

  let latestMark = {
    mark : '',
    index : ''
  }

  const player1 = createPlayer("Player1", "X")
  const player2 = createPlayer("Player2", "O")
  let currentPlayer = player1

  const gameBoardBoxes = document.querySelectorAll('.box');

  const renderBoard = ()=> {
    for (let index = 0; index < _board.length; index++) {
      gameBoardBoxes[index].textContent = _board[index]
    }
  }

  const checkForWin = ()=> {
    const possibleWins = [ [0, 4 ,8], [6, 4, 2],
                           [0, 3, 6], [1, 4, 7],
                           [2, 5, 8], [0, 1, 2], 
                           [3, 4, 5], [6, 7, 8] ]
    
    for (const posWin of possibleWins) {
      let _found = true
      for (let element of posWin) {
        if (_board[element] != latestMark.mark) {
          _found = false
          break
        }
      }
      if (_found) {
        return true
      }
    }
  }

  const checkForTie = ()=> {
    let _tie = true
    _board.forEach((box) => {
      if (box == '')
        _tie = false
    })
    if (_tie && !checkForWin)
      return true
    else
      return false
  }

  const swapCurrentPlayer = ()=> {
    currentPlayer = (currentPlayer == player1) ? player2 : player1 
  }

  const _addMarks = (index) => {
    if (_board[index] === '')
      _board[index] = currentPlayer.mark

    // Keep track of latest mark and its index for checking game Won
    latestMark.mark = currentPlayer.mark
    latestMark.index = index
  }

  const addBoxListeners = () => {
    for(const box of gameBoardBoxes) {
      const index = box.dataset.index
      box.addEventListener("click", () => {
        _addMarks(index)
        renderBoard()
        if (checkForWin()){
          console.log(`Game won! Winner is ${currentPlayer.mark}`)
          disableBoxListeners()
        }
        if (checkForTie()){
          console.log("Game tied!")
          disableBoxListeners()
        }
        swapCurrentPlayer()
      })
    }
  }

  const disableBoxListeners = () => {
    for( const box of gameBoardBoxes) {
      let newBox = box.cloneNode(true)
      box.parentNode.replaceChild(newBox, box)
    }
  }

  return {addBoxListeners, latestMark, checkForWin, checkForTie, disableBoxListeners}
})();

const displayController = (() => {
  //Public functions 
})();
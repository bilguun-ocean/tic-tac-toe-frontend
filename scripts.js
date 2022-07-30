const createPlayer = (name, mark) => {
  return {name, mark}
}


const gameBoard = (() => {

  let _board = ['','','',
               '','','',
               '','',''];


  const player1 = createPlayer("Player1", "X")
  const player2 = createPlayer("Player2", "O")
  let currentPlayer = player1

  const gameBoardBoxes = document.querySelectorAll('.box');

  const renderBoard = ()=> {
    for (let index = 0; index < _board.length; index++) {
      gameBoardBoxes[index].textContent = _board[index]
    }
  }

  const _checkForWin = ()=> {
    const possibleWins = [ [0, 4 ,8], [6, 4, 2],
                           [0, 3, 6], [1, 4, 7],
                           [2, 5, 8], [0, 1, 2], 
                           [3, 4, 5], [6, 7, 8] ]
    // When win is found highlight the background of the 3 in row box
    for (const posWin of possibleWins) {
      let _found = true
      for (let element of posWin) {
        if (_board[element] != currentPlayer.mark) {
          _found = false
          break
        }
      }
      if (_found) {
        return true
      }
    }
    return false
  }

  // Make sure it handles tie

  const _checkForTie = ()=> {
    let _tie = true
    _board.forEach((box) => {
      if (box == ''){
        _tie = false
        return
      }
    })
    if (_tie && !_checkForWin())
      return true
    else
      return false
  }

  const swapCurrentPlayer = ()=> {
    currentPlayer = (currentPlayer == player1) ? player2 : player1 
  }

  const _addMarks = (box) => {
    const index = box.dataset.index
    if (_board[index] != '')
      return
    
    _board[index] = currentPlayer.mark
    // Displaying the added mark
    box.textContent = _board[index]
    // Adding Styling
    if (currentPlayer.mark === "X")
    box.classList.add("x")
    else  
    box.classList.add("o")
  }

  const addBoxListeners = () => {
    for(const box of gameBoardBoxes) {
      box.addEventListener("click", () => {
        _addMarks(box)
        if (_checkForWin()){
          console.log(`Game won! Winner is ${currentPlayer.mark}`)
          _disableBoxListeners()
          return
        }
        if (_checkForTie()){
          console.log("Game tied!")
          _disableBoxListeners()
          return
        }
        swapCurrentPlayer()
      })
    }
  }

  const _disableBoxListeners = () => {
    for( const box of gameBoardBoxes) {
      let newBox = box.cloneNode(true)
      box.parentNode.replaceChild(newBox, box)
    }
  }

  return {addBoxListeners}
})();

const displayController = (() => {
  //Public functions 
})();
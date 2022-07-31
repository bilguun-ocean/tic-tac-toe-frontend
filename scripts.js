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

  const _swapCurrentPlayer = ()=> {
    currentPlayer = (currentPlayer == player1) ? player2 : player1 
  }

  const _displayReplayButton = ()=> {
    const replayButton = document.querySelector('#replay-button')
    replayButton.style.visibility = "visible"
    replayButton.addEventListener("click", ()=> {
      _resetMatch()
    })
  }

  const _resetClasses = () => {
    const gameBoardBoxes = document.querySelectorAll('.box');
    const gameContext = document.querySelector("#context")
    for (const box of gameBoardBoxes){
      box.classList.remove("o")
      box.classList.remove("x")
    }
    gameContext.classList.remove("game-won-x")
    gameContext.classList.remove("game-won-o")
  }


  const _clearBoard = () => {
    const gameBoardBoxes = document.querySelectorAll('.box');
    for (const box of gameBoardBoxes){
      box.textContent = "\u00A0"
    }
    for (let index = 0; index < 9; index++)
      _board[index] = ""
  }

  const _resetMatch = () => {
    _clearBoard()
    _resetClasses()
    if (currentPlayer.mark === "O")
      _swapCurrentPlayer()
    // Disabling replay button
    const replayButton = document.querySelector("#replay-button")
    replayButton.style.visibility = "hidden"
    //
    startGame()
  }

  const _displayPlayerTurn = ()=> {
    const contextDiv = document.querySelector('#context')
    if (currentPlayer.mark === "X")
      contextDiv.textContent = "Player X's turn"
    else
      contextDiv.textContent = "Player O's turn"
  }

  const _addMarks = (box, index) => {
    _board[index] = currentPlayer.mark
    // Displaying the added mark
    box.textContent = _board[index]
    // Adding Styling
    if (currentPlayer.mark === "X")
    box.classList.add("x")
    else  
    box.classList.add("o")
  }

  const _displayContext = () => {
    const contextDiv = document.querySelector('#context')
    if (_checkForTie())
      contextDiv.textContent = "Game Is Tied!"
    else{
      contextDiv.textContent = " has won the game!"
      if (currentPlayer.mark === "X") {
        contextDiv.classList.add("game-won-x")
      } else {
        contextDiv.classList.add("game-won-o")
      }
    }

  }

  const endCurrentMatch = () => {
    _displayContext()
    _disableBoxListeners()
    _displayReplayButton()
  }

  // Refactor what happens when won or tie
  const startGame = () => {
    _displayPlayerTurn()
    const gameBoardBoxes = document.querySelectorAll('.box');
    for(const box of gameBoardBoxes) {
      box.addEventListener("click", () => {
        const index = box.dataset.index

        // Do not proceed if this box is marked
        if (_board[index] != ''){
          return
        }
        _addMarks(box, index)
        if (_checkForWin()){
          endCurrentMatch()
          return
        }
        if (_checkForTie()){
          endCurrentMatch()
          return
        }
        _swapCurrentPlayer()
        _displayPlayerTurn()
      })
    }
  }


  const _disableBoxListeners = () => {
    const gameBoardBoxes = document.querySelectorAll('.box');
    for( const box of gameBoardBoxes) {
      let newBox = box.cloneNode(true)
      box.parentNode.replaceChild(newBox, box)
    }
  }

  return {startGame}
})();

const displayController = (() => {
  //Public functions 
})();

// 
gameBoard.startGame()

// Make the replay button work 

// check out the ergonomic laptop stand and keyboard && mouse
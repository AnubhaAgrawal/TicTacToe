const ticTacToeGame = new TicTacToeGame();
ticTacToeGame.start();

function TicTacToeGame() {
  const board = new Board();
  const humanPlayer = new HumanPlayer(board);
  const computerPlayer = new ComputerPlayer(board);
  let turn = 0;

  this.start = function() {
    const config = { childList: true };
    const observer = new MutationObserver(() => takeTurn());
    board.positions.forEach((el) => observer.observe(el, config));
    takeTurn();
  }

  function takeTurn() {
     // console.log("Somthing changed");
    if (board.checkForWinner()) {
      return;
    }

    if (turn % 2 === 0) {
      humanPlayer.takeTurn();
    } else {
      computerPlayer.takeTurn();
    }

    turn++;
  }
}

function Board() {
  this.positions = Array.from(document.querySelectorAll('.col'));
  //console.log(this.positions);

  this.checkForWinner = function() {
    let winner = false;

    const Com = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,4,8],
        [2,4,6],
        [0,3,6],
        [1,4,7],
        [2,5,8]
    ];

    const positions = this.positions;
      Com.forEach((winCombo) => {
      const pos0InnerText = positions[winCombo[0]].innerText;
      const pos1InnerText = positions[winCombo[1]].innerText;
      const pos2InnerText = positions[winCombo[2]].innerText;
      const isWinningCombo = pos0InnerText !== '' &&
        pos0InnerText === pos1InnerText && pos1InnerText === pos2InnerText;
      if (isWinningCombo) {
          winner = true;
          winCombo.forEach((index) => {
            positions[index].className += ' winner';
          })
      }
    });

    return winner;
  }
}

function ComputerPlayer(board) {
  this.takeTurn = function() {
    let availablePos = board.positions.filter((p) => p.innerText === '');
    const move = Math.floor(Math.random() * availablePos.length);
    availablePos[move].innerText = 'O';
  }
}

function HumanPlayer(board) {
  this.takeTurn = function() {
    board.positions.forEach(el =>
      el.addEventListener('click', handleTurnTaken));
  }

  function handleTurnTaken(event) {
    console.log("click on box");
    event.target.innerText = 'X';
    board.positions
      .forEach(el => el.removeEventListener('click', handleTurnTaken));
  }
}
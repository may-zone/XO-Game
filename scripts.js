function gameBoard (){
    let board = ["" , "", "","", "", "", "", "", ""];
    const getBoard = () => board;
    const setMark = (index,marker) =>{
        if(board[index]===""){
            board[index] = marker;
            return true;
        }
        return false;
    }
    const resetBoard =() => {
        for (let i=0 ; i< board.length ; i++){
            board[i] = "";
        };
    };
    return { getBoard, setMark, resetBoard};
}

function player (name,marker){
    const getName = () => name;
    const getMarker = () => marker;

return {getName , getMarker };
}
const newPlayer = player('dashaq', 'X');

const game = (() => {
  const boardAPI = gameBoard();

  const player1 = player("dashaq", "X");
  const player2 = player("rival",  "O");

  let currentPlayer = player1;
  let gameOver = false;

  const WIN_LINES = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  const checkWinner = (board) =>
    WIN_LINES.some(([a,b,c]) => {
      const m = board[a];
      return m !== "" && m === board[b] && m === board[c];
    });

  const switchPlayer = () => {
    currentPlayer = (currentPlayer === player1) ? player2 : player1;
  };

  const playRound = (index) => {
    if (gameOver) return false;

    const placed = boardAPI.setMark(index, currentPlayer.getMarker());
    if (!placed) return false; 
    const board = boardAPI.getBoard();

    if (checkWinner(board)) {
      gameOver = true;
      console.log(`${currentPlayer.getName()} wins the battle!`);
      return "win";
    }

    if (board.every(cell => cell !== "")) {
      gameOver = true;
      console.log("Tie");
      return "tie";
    }

    switchPlayer();
    return "continue";
  };

  const getCurrentPlayer = () => currentPlayer;
  const getBoard = () => boardAPI.getBoard();
  const resetGame = () => {
    boardAPI.resetBoard();
    currentPlayer = player1;
    gameOver = false;
  };

  return { playRound, getCurrentPlayer, resetGame, getBoard };
})();

document.addEventListener("DOMContentLoaded", () => {
  const squares = document.querySelectorAll(".square");
  const resultEl = document.querySelector(".result");
  const resetBtn = document.querySelector(".btn");

  const render = () => {
    
    const board = game.getBoard();
    squares.forEach((sq) => {
      const idx = Number(sq.id) - 1; // چون id ها 1..9 هستن
      sq.textContent = board[idx];   // X / O یا خالی
    });

    // پیام وضعیت
    // اگر بازی ادامه دارد، نوبت فعلی را نشان بده
    resultEl.textContent = `Turn: ${game.getCurrentPlayer().getName()} (${game.getCurrentPlayer().getMarker()})`;
  };

  squares.forEach((sq) => {
    sq.addEventListener("click", () => {
      const idx = Number(sq.id) - 1;
      const outcome = game.playRound(idx);

      // اگر حرکت نامعتبر بود (خانه پر یا بازی تمام) فقط رندر کن
      if (outcome === false) {
        render();
        return;
      }

      render();

      if (outcome === "win") {
        resultEl.textContent = `${game.getCurrentPlayer().getName()} (${game.getCurrentPlayer().getMarker()}) wins!`;
      } else if (outcome === "tie") {
        resultEl.textContent = "Tie game!";
      }
    });
  });

  resetBtn.addEventListener("click", () => {
    game.resetGame();
    render();
  });

  // شروع
  render();
});
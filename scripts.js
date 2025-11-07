function gameBoard() {
  let board = ["", "", "", "", "", "", "", "", ""];
  const getBoard = () => board;
  const setMark = (index, marker) => {
    if (board[index] === "") {
      board[index] = marker;
      return true;
    }
    return false;
  };
  const resetBoard = () => {
    for (let i = 0; i < board.length; i++) board[i] = "";
  };
  return { getBoard, setMark, resetBoard };
}

function player(name, marker) {
  const getName = () => name;
  const getMarker = () => marker;
  return { getName, getMarker };
}

const game = (() => {
  const boardAPI = gameBoard();

  let player1 = player("dashaq", "X");
  let player2 = player("rival", "O");

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
      return "win";
    }

    if (board.every(cell => cell !== "")) {
      gameOver = true;
      return "tie";
    }

    switchPlayer();
    return "continue";
  };

  const getCurrentPlayer = () => currentPlayer;
  const getBoard = () => boardAPI.getBoard();
  const resetGame = () => {
    boardAPI.resetBoard();
    currentPlayer = (player1.getMarker() === "X") ? player1 : player2;
    gameOver = false;
  };

  const setPlayers = (name1, marker1, name2) => {
    marker1 = String(marker1).toUpperCase() === "O" ? "O" : "X";
    const marker2 = marker1 === "X" ? "O" : "X";

    player1 = player(name1 || "Player 1", marker1);
    player2 = player(name2 || "Player 2", marker2);

    currentPlayer = (player1.getMarker() === "X") ? player1 : player2;

    boardAPI.resetBoard();
    gameOver = false;
  };

  return { playRound, getCurrentPlayer, resetGame, getBoard, setPlayers };
})();

document.addEventListener("DOMContentLoaded", () => {
  const squares  = document.querySelectorAll(".square");
  const resultEl = document.querySelector(".result");
  const resetBtn = document.querySelector(".btn");

const render = () => {
  const board = game.getBoard();

  squares.forEach((sq) => {
    const idx  = Number(sq.id) - 1;
    const mark = board[idx] || "";   // ← تعریف mark

    sq.textContent = mark;

    // استایل نئونی برای X / O
    sq.classList.remove("x", "o");
    if (mark === "X") sq.classList.add("x");
    else if (mark === "O") sq.classList.add("o");
  });

  resultEl.textContent =
    `Turn: ${game.getCurrentPlayer().getName()} (${game.getCurrentPlayer().getMarker()})`;
};

  squares.forEach((sq) => {
    sq.addEventListener("click", () => {
      const idx = Number(sq.id) - 1;
      const outcome = game.playRound(idx);

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

  const modal        = document.getElementById("startModal");
  const form         = document.getElementById("startForm");
  const p1NameInput  = document.getElementById("p1Name");
  const p2NameInput  = document.getElementById("p2Name");

  if (modal) {
    modal.style.display = "flex"; 
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name1  = (p1NameInput?.value || "Player 1").trim() || "Player 1";
      const name2  = (p2NameInput?.value || "Player 2").trim() || "Player 2";
      const marker1 = document.querySelector('input[name="p1Marker"]:checked')?.value || "X";

      if (name1.toLowerCase() === name2.toLowerCase()) {
        alert("Player names should be different.");
        return;
      }

      game.setPlayers(name1, marker1, name2);

      if (modal) modal.style.display = "none";
      game.resetGame();
      render();
    });
  } else {
    game.resetGame();
    render();
  }
});

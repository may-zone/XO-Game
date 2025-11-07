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
console.log("gameBoard is Working !")

function player (name,marker){
    const getName = () => name;
    const getMarker = () => marker;

return {getName , getMarker };
}
const newPlayer = player('dashaq', 'x');
console.log(`Hi im ${newPlayer.getName()} and my marker is ${newPlayer.getMarker()}`);

const playRound = (index) => {
        if(gameOver) return;
        const board = gameBoard.gameBoard();

        if(board[index] !=="") return;
        gameBoard.updateBoard(index,currentPlayer.marker);
        
        if(checkWinner(board)){
            gameOver = true;
            console.log(`${currentPlayer} Wins the battle !`);
            return
        }
        if (board.forEach(square =>square !=="" {
            gameOver = true;
            console.log("Tie");
            return ;
            switchPlayer ();
        }));
        const switchPlayer =() => {
            currentPlayer = currentPlayer === player1 ?player2:player1;
        } 
        const checkWinner = (board) =>{ 
        const winlines = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6] 
      ];
      return winlines.some(combo =>
        combo.every(i => board[i] === currentPlayer.marker );
      );
    };
    const getcurrentPlayer = () => currentPlayer;

    const resetGame = () => {
        gameBoard.resetBoard();
        currentPlayer = player1;
        gameOver=false;
      }
      return { playRound ,getcurrentPlayer ,resetGame}
    }

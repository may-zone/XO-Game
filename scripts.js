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

function gameController = () => {
    const player1 = player('player 1' ,'X');
    const player2 = player('player 2' ,'O');
    let currentPlayer = player1;
    let gameOver = false;

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
        
    }
}
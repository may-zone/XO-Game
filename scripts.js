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
const player1 = player('dashaq', 'x');
console.log(`Hi im ${player1.getName()} and my marker is ${player1.getMarker()}`);

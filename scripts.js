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
console.log("Hi")
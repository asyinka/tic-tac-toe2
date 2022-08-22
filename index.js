let cells = document.querySelectorAll(".cell");
let statusText = document.getElementById("statusText");
let restartButton = document.getElementById("resetBtn");

let playerChoice = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;
let winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

playGame();

function playGame(){
    
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    running = true;
    
}

function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");

    if (playerChoice[cellIndex] != "" || running != true) {
        return;
    }
    placeHolder(this, cellIndex);
    
    checkWinner();  
}

function changePlayer(){

    if(currentPlayer == "X"){
        currentPlayer = "O"
    } 
    else if(currentPlayer == "O") {
        currentPlayer = "X"
    }

    // let nextPlayer = (currentPlayer == "X") ? "O" : "X";
    // currentPlayer = nextPlayer;

    statusText.innerText = `${currentPlayer}'s turn`;

}

function placeHolder(cell, index){
    
    //playerChoice[index] == cellIndex
    playerChoice[index] = currentPlayer; //this causes currentPlayer to hold the index of playerChoice on click
    cell.textContent = currentPlayer; //this shows currentPlayer on cell
    //this function is to hold the index of player choice and assign currentPlayer to the cell display
}

function checkWinner(){
    let gameWon = false;
    
for (i = 0; i < winConditions.length; i++) {
    const condition = winConditions[i]; //this loop stores all our win conditions from index 0 to 8 in condition
    const choiceA = playerChoice[condition[0]]; //condition[] returns a number value at the stated index 0 - 2;
    const choiceB = playerChoice[condition[1]]; //choiceA - C stores playerChoice index when clicked the index stores 
    const choiceC = playerChoice[condition[2]]; //currentPlayer value on the index
    
    if (choiceA == "" || choiceB == "" || choiceC == "") {
        continue;
    }
    if(choiceA == choiceB && choiceB == choiceC){
        gameWon = true;
        break;
    }
}
if(gameWon){
    statusText.innerText = `${currentPlayer} wins`;
    running = false;
}
else if(!playerChoice.includes("")) {
    statusText.innerText = `DRAW!`;
}
else{
    changePlayer();
}

}

function reset(cell){
    currentPlayer = "X";
    playerChoice = ["", "", "", "", "", "", "", "", ""]
    cells.forEach(cell => cell.textContent = "")
    statusText.innerText = `${currentPlayer}'s turn`;
    running = true;
}
restartButton.addEventListener("click", reset)
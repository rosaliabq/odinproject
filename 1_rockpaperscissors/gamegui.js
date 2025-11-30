
let humanScore = 0;
let computerScore = 0;
let round = 0;

function getComputerChoice(){
    return Math.floor(Math.random()*3);
}

function gameResult(playerChoice, computerChoice){
    if (playerChoice==computerChoice){
        return 'draw'
    }
    if ((playerChoice==0 && computerChoice==2) ||
        (playerChoice==1 && computerChoice==0) ||
        (playerChoice==2 && computerChoice==1)
    ){
        humanScore++;
        return 'win'
    }else{
        computerScore++;
        return 'lost'
    }
}

function resetGame(){
    round=0;
    humanScore=0;
    computerScore=0;
    updateHtmlScores();
    const computerResult = document.querySelector("#computerResult");
    computerResult.style.color="grey";
    computerResult.textContent="(empty)";
    document.querySelector("#roundResult").textContent="-";
}

function updateHtmlScores(){
    //Update scores
    document.querySelector("#round").textContent=round;
    document.querySelector("#playerScore").textContent=humanScore;
    document.querySelector("#pcScore").textContent=computerScore;
}

function playRound(playerChoice){
    round++;
    computerChoice = getComputerChoice();
    let result = gameResult(playerChoice, computerChoice);
    const computerResult = document.querySelector("#computerResult");
    computerResult.style.color="black";
    computerResult.textContent=choices.get(computerChoice);
    updateHtmlScores();
    document.querySelector("#roundResult").textContent=result;
    if (humanScore==5){
        alert("You won!");
        resetGame();
    }
    if (computerScore==5){
        alert("You lost!");
        resetGame();
    }
    return;
}

const choices = new Map([
    [0, 'Rock'],
    [1, 'Paper'],
    [2, 'Scissors']
])

// the JavaScript file
const btnRock = document.querySelector("#rock");
btnRock.addEventListener("click", () => {
  playRound(0)
});

const btnPaper = document.querySelector("#paper");
btnPaper.addEventListener("click", () => {
  playRound(1)
});

const btnScissors = document.querySelector("#scissors");
btnScissors.addEventListener("click", () => {
  playRound(2)
});

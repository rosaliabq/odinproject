function getComputerChoice(){
    return Math.floor(Math.random()*3);
}

function requestPlayerChoice(){
    let playerChoice=prompt("Choose ROCK[0],PAPER[1],SCISSORS[2]").toUpperCase();
    if (playerChoice=='ROCK' || playerChoice=='0') {
        return 0;
    } else if (playerChoice=='PAPER' || playerChoice=='1'){
        return 1;
    } else if (playerChoice=='SCISSORS' || playerChoice=='2'){
        return 2;
    }
    return 0;
}

function gameResult(playerChoice, computerChoice){
    if (playerChoice==computerChoice){
        return 'draw'
    }
    if ((playerChoice==0 && computerChoice==2) ||
        (playerChoice==1 && computerChoice==0) ||
        (playerChoice==2 && computerChoice==1)
    ){
        return 'win'
    }else{
        return 'lost'
    }
}

const choices = new Map([
    [0, 'ROCK'],
    [1, 'PAPER'],
    [2, 'SCISSORS']
])

let humanScore = 0;
let computerScore = 0;
console.log("==========================")
console.log("  ROCK,PAPER,SCISSORS game")
console.log("==========================")


for (var i=0;i<5;i++){
    let playerChoice = requestPlayerChoice();
    let computerChoice = getComputerChoice();
    let result = gameResult(playerChoice,computerChoice)
    if (result=='win') humanScore++
    else if (result=='lost') computerScore++;
    console.log(`[Round ${i+1}] You ${result}. Computer chose ${choices.get(computerChoice)}`)
}

console.log(`[Results] Human: ${humanScore} PC: ${computerScore}`)



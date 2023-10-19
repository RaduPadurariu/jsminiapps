// Selectors
const gameMenuElem = document.querySelector('.gameMenu-container');
const rpsGameElem = document.querySelector('.rpsGame-container');
const btnSinglePlayerElem = document.getElementById ("btnSingle");
const btnMultiPlayerElem = document.getElementById ("btnMulti");

// Events
btnSinglePlayerElem.addEventListener('click', singlePlayerGame);
btnMultiPlayerElem.addEventListener('click', savePlayersNames);

// Global variables
let rpsPlayers;
let rpsChoices;
let singleModeFlag = false;

// Functions
// Single player
function singlePlayerGame () {
    singleModeFlag = true;
    gameMenuElem.classList.add('hide');
    rpsGameElem.innerText = "";
    let players = ["You", "Computer"];
    rpsChoices = [];
    let computerChoice = getRandomChoice();
    rpsChoices.push(computerChoice);
    createParticipantsHeader(players);
    createChooseOptions(players, rpsChoices);  
}

// Multi player
function savePlayersNames () {
    gameMenuElem.classList.add('hide');
    rpsGameElem.innerText = "";
    // create players name container
    const playersNameElem = document.createElement('div');
    rpsGameElem.appendChild(playersNameElem);
    playersNameElem.classList.add ('players-names');

    // Player 1
    const player1ContainerElem = document.createElement('div');
    player1ContainerElem.classList.add('flex');
    const player1TitleElem = document.createElement('span');
    player1ContainerElem.appendChild(player1TitleElem);
    player1TitleElem.style.color = "darkblue";
    player1TitleElem.classList.add ('players');
    player1TitleElem.innerText = "Player 1: ";
    const player1InputElem = document.createElement('input');
    player1InputElem.maxLength = "12";
    player1InputElem.classList.add('players-input');
    player1ContainerElem.appendChild(player1InputElem);
    playersNameElem.appendChild(player1ContainerElem);

    // Player 2
    const player2ContainerElem = document.createElement('div');
    player2ContainerElem.classList.add('flex');
    const player2TitleElem = document.createElement('span');
    player2ContainerElem.appendChild(player2TitleElem);
    player2TitleElem.style.color = "darkred";
    player2TitleElem.classList.add ('players');
    player2TitleElem.innerText = "Player 2: "
    const player2InputElem = document.createElement('input');
    player2InputElem.maxLength = "12";
    player2InputElem.classList.add('players-input');
    player2ContainerElem.appendChild(player2InputElem);
    playersNameElem.appendChild(player2ContainerElem);

    // Error name container
    const errorNameElem = document.createElement('div');
    errorNameElem.classList.add('errorName');
    errorNameElem.innerText = ""
    playersNameElem.appendChild(errorNameElem);

    // save button
    const saveBtnPlayerNames = document.createElement('button');
    saveBtnPlayerNames.classList.add ('rps-btns');
    rpsGameElem.appendChild(saveBtnPlayerNames);
    saveBtnPlayerNames.innerText = "Save";
    saveBtnPlayerNames.addEventListener('click', () => {
        if ((player1InputElem.value === "" || player1InputElem.value === " ") || (player2InputElem.value === "" || player2InputElem.value === " ")) {
            errorNameElem.innerText = "Please enter a valid name";
        }
        else {
            errorNameElem.innerText = "";
            rpsPlayers = [player1InputElem.value, player2InputElem.value];
            rpsChoices = [];
            multiPlayerGame (rpsPlayers, rpsChoices);
        }
        
    });

    backBtn ();
}

function multiPlayerGame (players, choices) {
    rpsGameElem.innerText = "";
    createParticipantsHeader(players);
    createChooseOptions(players, choices);    
}

// Render functions 
    // Render participants names
function createParticipantsHeader(players) {
    // create participants container
    const participantsNameElem = document.createElement('div');
    rpsGameElem.appendChild(participantsNameElem);
    participantsNameElem.classList.add ('participants-names')

    // player 1
    const player1NameElem = document.createElement('span');
    player1NameElem.innerText = players[0];
    player1NameElem.style.color = "darkblue";
    player1NameElem.classList.add ('players');
    participantsNameElem.appendChild(player1NameElem);

    // vs
    const vsElem = document.createElement('span');
    vsElem.innerText = " VS ";
    vsElem.classList.add('vs');
    participantsNameElem.appendChild(vsElem);


    // player 2
    const player2NameElem = document.createElement('span');
    player2NameElem.innerText = players[1];
    player2NameElem.style.color = "darkred";
    player2NameElem.classList.add ('players');
    participantsNameElem.appendChild(player2NameElem);
}

    // Render choice options
function createChooseOptions(players, choices) {
    // option main container
    const optionsMainContainerElem = document.createElement('div');
    optionsMainContainerElem.classList.add('optionMainContainer');
    rpsGameElem.appendChild(optionsMainContainerElem);

    // options choices container
    const choicesContainerElem = document.createElement ('div');
    choicesContainerElem.classList.add('choices-container')
    optionsMainContainerElem.appendChild(choicesContainerElem);

    // create Choose text
    const chooseTextElem = document.createElement('div');
    chooseTextElem.innerText = players[0] + " choose: ";
    choicesContainerElem.appendChild(chooseTextElem);
    
    // options buttons containers
    const optionsButtonsContainerElem = document.createElement ('div');
    optionsButtonsContainerElem.classList.add('optBtns-container')
    choicesContainerElem.appendChild(optionsButtonsContainerElem);

    // 3 x Options
    // rock button
    const rockContainerElem = document.createElement('button');
    rockContainerElem.classList.add('btnChoices');
    optionsButtonsContainerElem.appendChild(rockContainerElem);
    createChoice(rockContainerElem, "Rock");

    rockContainerElem.addEventListener('click', function () {
        let playerChoice = "Rock";
        choices.push(playerChoice);
        if (choices.length === 2) {
            if(singleModeFlag) {
                createShakingAnimation (optionsMainContainerElem, choices, players);          
            }
            else {
                createShakingAnimation (optionsMainContainerElem, choices.reverse(), players);  
            }
            
        }  
        chooseTextElem.innerText = players[1] + " choose: ";
    })

    // paper button
    const paperContainerElem = document.createElement('button');
    paperContainerElem.classList.add('btnChoices');
    optionsButtonsContainerElem.appendChild(paperContainerElem);
    createChoice(paperContainerElem, "Paper");

    paperContainerElem.addEventListener('click', function () {
        let playerChoice = "Paper";
        choices.push(playerChoice);
        chooseTextElem.innerText = players[1] + " choose: ";
        if (choices.length === 2) {
            if(singleModeFlag) {
                createShakingAnimation (optionsMainContainerElem, choices, players);          
            }
            else {
                createShakingAnimation (optionsMainContainerElem, choices.reverse(), players);  
            }
        }   
    })

    // scissors button
    const scissorsContainerElem = document.createElement('button');
    scissorsContainerElem.classList.add('btnChoices');
    optionsButtonsContainerElem.appendChild(scissorsContainerElem);
    createChoice(scissorsContainerElem, "Scissors");

    scissorsContainerElem.addEventListener('click', function () {
        let playerChoice = "Scissors";
        choices.push(playerChoice);
        chooseTextElem.innerText = players[1] + " choose: ";
        if (choices.length === 2) {
            if(singleModeFlag) {
                createShakingAnimation (optionsMainContainerElem, choices, players);          
            }
            else {
                createShakingAnimation (optionsMainContainerElem, choices.reverse(), players);  
            }
        } 
    })
}

// Render player choice
function createChoice (parent, value) {
    const rockContainerElem = document.createElement('div');
    rockContainerElem.classList.add('choice-container');
    parent.appendChild(rockContainerElem);
    const rockImgElem = document.createElement('img');
    rockImgElem.classList.add ('choicesImg');
    rockContainerElem.appendChild(rockImgElem);
    rockImgElem.src = "./imgs/"+ value + ".png";
    const rockTextElem = document.createElement('span');
    rockTextElem.classList.add('text-choice');
    rockTextElem.innerText = value;
    rockContainerElem.appendChild(rockTextElem);
}

// Render choice result
function createResultsHTML (parent, choices) {
    // results container
    parent.innerText = "";
    const resultsContainerElem = document.createElement('div');
    resultsContainerElem.classList.add('optBtns-container');
    parent.appendChild(resultsContainerElem);
    createChoice (resultsContainerElem, choices[1]);
    createChoice (resultsContainerElem, choices[0]);
}

// Render display winner
function displayWinner (result, players) {
    const winnerContainerElem = document.createElement('div');
    winnerContainerElem.innerText = result;
    winnerContainerElem.classList.add ('display-result');
    if (result === players[0] + " Won!") {
        winnerContainerElem.classList.add ('darkblue');
    }
    if (result === players[1] + " Won!") {
        winnerContainerElem.classList.add ('darkred');
    } 
    rpsGameElem.appendChild(winnerContainerElem);
}


// Render Play Again button
function playAgainBtn () {
    const btnPlayAgainElem = document.createElement('button');
    btnPlayAgainElem.addEventListener ('click', playAgain);
    btnPlayAgainElem.classList.add ('rps-btns');
    rpsGameElem.appendChild(btnPlayAgainElem);
    btnPlayAgainElem.innerText = "Play Again";
}

// Render Go Back button
function backBtn () {
    // back button container
    const backBtnContainerElem = document.createElement('div');
    backBtnContainerElem.classList.add ('backBtn-container');
    rpsGameElem.appendChild(backBtnContainerElem);
   
    const btnBackElem = document.createElement('button');
    btnBackElem.addEventListener ('click', goBack);
    backBtnContainerElem.appendChild(btnBackElem);
    
    btnBackElem.innerText = "Go Back";
    btnBackElem.classList.add ('rps-btns');
}

// Play Again function
function playAgain () {
    rpsChoices = [];
    if (singleModeFlag === true) {
        singlePlayerGame();
    }
    else {
        multiPlayerGame(rpsPlayers, rpsChoices);
    }
}

// Go Back function
function goBack () {
    rpsChoices = [];
    rpsPlayers = [];
    gameMenuElem.classList.remove('hide');
    rpsGameElem.innerText = "";
    singleModeFlag = false;
}

// Shaking animation and execute main functions
function createShakingAnimation (parent, choices, players) {
    
    // shaking hands container
    parent.innerText = "";
    const shakeContainerElem = document.createElement('div');
    shakeContainerElem.classList.add('optBtns-container');
    shakeContainerElem.classList.add('shake');
    const handPlayer1Elem = document.createElement('img');
    handPlayer1Elem.src = "./imgs/hand1.png";
    handPlayer1Elem.classList.add ('choicesImg');
    shakeContainerElem.appendChild(handPlayer1Elem);

    const handPlayer2Elem = document.createElement('img');
    handPlayer2Elem.src = "./imgs/hand2.png";
    handPlayer2Elem.classList.add ('choicesImg');
    shakeContainerElem.appendChild(handPlayer2Elem);
    parent.appendChild(shakeContainerElem);

    setTimeout(() => {
        console.log(choices)
        createResultsHTML(parent, choices);
        let result = playGame(choices, players);
        displayWinner(result, players);
        playAgainBtn (choices);
        backBtn(); 
    }
    , 1500); 

}

// Get the winner
function getWinner (choices, players) {
    switch (choices[1]) {
        case "Rock":
            switch (choices[0]) {
                case "Rock":
                    return "Draw";
                case "Paper" :
                    return players[1] + " Won!";
                case "Scissors" :
                    return players[0] + " Won!";
                default: console.log('Error');
            }
            break;
        case "Paper": 
            switch (choices[0]) {
                case "Rock":
                    return players[0] + " Won!";
                case "Paper": 
                    return "Draw";
                case "Scissors": 
                    return players[1] + " Won!";
                default: console.log('Error');
    }
            break;
        case "Scissors":
            switch (choices[0]) {
                case "Rock":
                    return players[1] + " Won!";
                case "Paper":
                    return players[0] + " Won!";
                case "Scissors":
                    return "Draw";
                default: console.log('Error');
            }
            break;
}}

// Computer random choice
function getRandomChoice () {
    let choice = ["Rock", "Paper", "Scissors"];
    let indexRandom = Math.floor(Math.random()*3);
    let computerChoice = choice[indexRandom];
    return computerChoice;
}

// Play Game function
function playGame (choices, players) {
    let result = getWinner(choices, players);
    return result;
}
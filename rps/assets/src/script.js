var result         = document.querySelector('#result');
var resultColor    = document.querySelector('.resultColor');
var playerChoice   = document.querySelector('#playerChoice');
var computerChoice = document.querySelector('#computerChoice');
var throwCountText = document.querySelector('#throwCount');
var throwCount     = 0;
var winCountText   = document.querySelector('#wins');
var winCount       = 0;
var lossCountText  = document.querySelector('#losses');
var lossCount      = 0;
var drawCountText  = document.querySelector('#draws');
var drawCount      = 0;
var resetGame      = document.querySelector(".resetGame");

function playerChoose(choice){
    playerChoice.innerText = choice;

    computerChoose();

    calculateResult();

    throwCount = throwCount + 1;

    throwCountText.innerText = throwCount;
}

function computerChoose(){
    var randomThrowByPC = [
        'ROCK', 
        'PAPER', 
        'SCISSORS'
    ][Math.floor(Math.random() * 3)];

    computerChoice.innerText = randomThrowByPC;
}

function randomEmoji(random){
    return random[
        Math.floor(Math.random() * random.length)
    ];
}

function calculateResult(){
    switch (playerChoice.innerText) {
        case 'ROCK':
            switch (computerChoice.innerText) {
                case 'SCISSORS':
                    resultColor.classList.add('text-primary');
                    resultColor.classList.remove('text-success');
                    resultColor.classList.remove('text-danger');

                    result.innerHTML = '<b>WIN <b/>' + randomEmoji(['😁', '😅', '😎']);
                    winCount = winCount + 1;
                    winCountText.innerText = winCount;

                    break;
                case 'PAPER':
                    resultColor.classList.add('text-success');
                    resultColor.classList.remove('text-primary');
                    resultColor.classList.remove('text-danger');

                    result.innerHTML = '<b>LOSS <b/>' + randomEmoji(['😩', '😭', '🤨']);
                    lossCount = lossCount + 1;
                    lossCountText.innerText = lossCount;

                    break;
                case 'ROCK':
                    resultColor.classList.add('text-danger');
                    resultColor.classList.remove('text-primary');
                    resultColor.classList.remove('text-success');

                    result.innerHTML = '<b>DRAW <b/>' + randomEmoji(['😱', '🧐', '🙃']);
                    drawCount = drawCount + 1;
                    drawCountText.innerText = drawCount;

                    break;
            }

            break;
        case 'PAPER':
            switch (computerChoice.innerText) {
                case 'ROCK':
                    resultColor.classList.add('text-primary');
                    resultColor.classList.remove('text-success');
                    resultColor.classList.remove('text-danger');

                    result.innerHTML = '<b>WIN <b/>' + randomEmoji(['😁', '😅', '😎']);
                    winCount = winCount + 1;
                    winCountText.innerText = winCount;

                    break;
                case 'SCISSORS':
                    resultColor.classList.add('text-success');
                    resultColor.classList.remove('text-primary');
                    resultColor.classList.remove('text-danger');

                    result.innerHTML = '<b>LOSS <b/>' + randomEmoji(['😩', '😭', '🤨']);
                    lossCount = lossCount + 1;
                    lossCountText.innerText = lossCount;

                    break;
                case 'PAPER':
                    resultColor.classList.add('text-danger');
                    resultColor.classList.remove('text-primary');
                    resultColor.classList.remove('text-success');

                    result.innerHTML = '<b>DRAW <b/>' + randomEmoji(['😱', '🧐', '🙃']);
                    drawCount = drawCount + 1;
                    drawCountText.innerText = drawCount;

                    break;
            }

            break;
        case 'SCISSORS':
            switch (computerChoice.innerText) {
                case 'PAPER':
                    resultColor.classList.add('text-primary');
                    resultColor.classList.remove('text-success');
                    resultColor.classList.remove('text-danger');

                    result.innerHTML = '<b>WIN <b/>' + randomEmoji(['😁', '😅', '😎']);
                    winCount = winCount + 1;
                    winCountText.innerText = winCount;

                    break;
                case 'ROCK':
                    resultColor.classList.add('text-success');
                    resultColor.classList.remove('text-primary');
                    resultColor.classList.remove('text-danger');

                    result.innerHTML = '<b>LOSS <b/>' + randomEmoji(['😩', '😭', '🤨']);
                    lossCount = lossCount + 1;
                    lossCountText.innerText = lossCount;

                    break;
                case 'SCISSORS':
                    resultColor.classList.add('text-danger');
                    resultColor.classList.remove('text-primary');
                    resultColor.classList.remove('text-success');

                    result.innerHTML = '<b>DRAW <b/>' + randomEmoji(['😱', '🧐', '🙃']);
                    drawCount = drawCount + 1;
                    drawCountText.innerText = drawCount;

                    break;
            }

            break;
    }
}

function resetScore(){
    result.classList.remove('text-primary');
    result.classList.remove('text-success');
    result.classList.remove('text-danger');
    result.innerText         = 'No games played yet!';
    playerChoice.innerText   = 'N/A';
    computerChoice.innerText = 'N/A';
    throwCountText.innerText = 0;
    throwCount               = 0;
    winCountText.innerText   = 0;
    winCount                 = 0;
    lossCountText.innerText  = 0;
    lossCount                = 0;
    drawCountText.innerText  = 0;
    drawCount                = 0;

    resetGame.classList.add('dance-animation');

    setTimeout(() => {
        resetGame.classList.remove('dance-animation');
    }, 1000);
}
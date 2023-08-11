let index = 0;
let score = 0;
let letters = ['A', 'B', 'C', 'D', 'E', 'F'];
let randomCombination = 
    letters[Math.floor(Math.random() * 6)] + 
    letters[Math.floor(Math.random() * 6)] + 
    letters[Math.floor(Math.random() * 6)] + 
    letters[Math.floor(Math.random() * 6)];

// let randomCombination = 'AABB';

let currentCom = '0000';
let gameStatus = false;
let timer = null;
let time = 60;

// console.log(randomCombination);

// add image on click
document.querySelectorAll('.options img').forEach(element => {
    element.addEventListener('click', function(){
        if (gameStatus === true) {
            return;
        }

        let imageIndex = Array.from(element.parentNode.children).indexOf(element);
        currentCom = currentCom.split('');

        for(let i = 0; i <= 3; i++){
            if(currentCom[i] == '0'){
                currentCom[i] = letters[imageIndex];
                break;
            }
        }

        generateSymbol();
    });
});

// delete image on click
document.querySelectorAll('.combination').forEach(function(parent) {
    Array.from(parent.querySelectorAll('.combination div')).forEach(function(child) {
        child.addEventListener('click', function() {
            var parentRowIndex = Array.from(parent.parentElement.children).indexOf(parent);
            var imageIndex = Array.from(parent.children).indexOf(child);

            if (parentRowIndex == index) {
                currentCom = currentCom.split('');
                currentCom[imageIndex] = '0';        

                generateSymbol();
            }
        });
    });
});

// check combinations
document.querySelector('#confirm').addEventListener('click', function() {
    if(index < 6){
        for(let i = 0; i <= 3; i++){
            if(currentCom[i] == '0') {
                return;
            }
        }

        generateSolution();
    }
});

document.querySelector('#newgame').addEventListener('click', function() {
    location.href = "index.html";
});
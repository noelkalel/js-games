let letters = ['а','б','в','г','д','ђ','е','ж','з','и','ј','к','л','љ','м','н','њ','о','п','р','с','т','ћ','у','ф','х','ц','ч','џ','ш'];
let timeForLetter = null;
let gameStatus = false;
let letterIndex = 0;
let randomShuffledWord;
let newWordsArray = [];
let timer = null;
let score = 0;
let time  = 60;
let clickedLetters = [];

// Get the random word from words array and pick word > 10 and < 12 chars
WORDS.forEach((element, index) => {
    if(element.length >= 10){
        newWordsArray.push(index);
    }
});

let randomWord = WORDS[
    newWordsArray[
        Math.floor(Math.random() * newWordsArray.length)
    ]
]; 
console.log(randomWord);

// Split the random word into single letter eg: apple = ['a', 'p', 'p', 'l', 'e']
let splitRandomWord = randomWord.split(''); 
// console.log(splitRandomWord);

// get chosen word and shuffle letters into array: apple = ['p', 'a', 'l', 'p', 'e']
function getRandomShuffledWord() {
    return splitRandomWord.sort(() => Math.random() - 0.5);
}

// get random letter inside button
function getRandomLetter() {
    let randomLetter = letters[
        Math.floor(Math.random() * letters.length)
    ];

    // document.querySelector(`.word:nth-child(${letterIndex + 1})`).innerText = randomLetter;       
    document.querySelectorAll('.word')[letterIndex].innerText = randomLetter;
};

randomShuffledWord = getRandomShuffledWord();
// console.log(randomShuffledWord);

// spin random letter initialy inside button
timeForLetter = setInterval(getRandomLetter, 100);

// if chosen word >= 10 <= 12 add 2 more random letters
if (randomShuffledWord.length == 10 || randomShuffledWord.length == 11) {
    for (let i = 0; i < 2; i++) {
        randomShuffledWord.push(letters[Math.floor(Math.random() * 30)]);
    }
}

// EVENT METHODS 
document.querySelector('#stop').addEventListener('click', function(){
    if(letterIndex < 12){
        clearInterval(timeForLetter);

        // document.querySelector(`.word:nth-child(${letterIndex + 1})`).innerText = randomShuffledWord[letterIndex];
        document.querySelectorAll('.word')[letterIndex].innerText = randomShuffledWord[letterIndex];

        letterIndex++;

        if(letterIndex < 12){
            timeForLetter = setInterval(getRandomLetter, 100);
        } else {
            timer = setInterval(timeStarted, 1000);

            gameStatus = true; 

            document.querySelector('#stop').style.display = 'none';
            document.querySelector('#confirm').style.display = 'block';
            document.querySelector('#check').style.display = 'block';                      
        }
    }
});

document.querySelectorAll('.word').forEach((word, index) => {
    word.addEventListener('click', () => {
        if (word.classList.contains('disabled')) {
            word.classList.remove('disabled');

            // const letterToRemove = word.textContent;
            const indexToRemove = clickedLetters.indexOf(index); 

            if (indexToRemove !== -1) {
                clickedLetters.splice(indexToRemove, 1);
            }            
        } else {
            word.classList.add('disabled');

            clickedLetters.push(index);
        }

        // const lettersClicked = clickedLetters.map(x => words[x].textContent);
        const lettersClicked = clickedLetters.map(function(x){
            return document.querySelectorAll('.word')[x].textContent;
        });

        document.getElementById('my-word').textContent = lettersClicked.join('');
    });
});

document.querySelector('#check').addEventListener('click', function(){
    if(gameStatus){
        document.querySelector('#correct').style.display = 'none';
        document.querySelector('#incorrect').style.display = 'none';

        let typedWord = document.querySelector('#my-word').innerText;
        let found = false;

        if(typedWord.length == 0) return;

        WORDS.forEach((word) => {
            // if(word.slice(0) == typedWord.toLowerCase()){              
            if(word == typedWord.toLowerCase()){              
                document.querySelector('#correct').style.display = 'block';

                found = true;
            }
        });

        if(!found) {
            document.querySelector('#incorrect').style.display = 'block';
        }    
    }
});

document.querySelector('#confirm').addEventListener('click', function(){
    if(gameStatus){
        document.querySelector('#correct').style.display = 'none';
        document.querySelector('#incorrect').style.display = 'none';

        let typedWord = document.querySelector('#my-word').innerText;

        if(typedWord.length == 0) return;

        if (!WORDS.includes(typedWord.toLowerCase())) {
            return;
        }
        
        score = typedWord.length;

        if(typedWord.length == randomWord.length){
            // console.log('rec iste duzine kao pc', score, randomWord);            

            score += 5;
        } else if(typedWord.length > randomWord.length){
            // console.log('duza rec od pc-a', score, randomWord);
            score += 10;
        }

        bonusScore();

        clearInterval(timer);

        document.querySelector('.score').innerText = score;
        document.querySelector('.solution div').innerHTML = randomWord.toUpperCase();
        document.querySelector('#newgame').style.display = 'block';
        // document.querySelector('#delete').style.display = 'none';
        document.querySelector('#confirm').style.display = 'none';
        document.querySelector('#check').style.display = 'none';
        document.querySelector('#score').style.display = 'block';
        document.querySelector('#score').innerText = 'Your Score: ' + score;

        confetti({
            particleCount: 500,
            startVelocity: 20,
            spread: 360,
            origin: {
                x: Math.random(),
                y: Math.random() - 0.2
            }
        });

        gameStatus = false;
    }
});

document.querySelector('#newgame').addEventListener('click', function() {
    location.href = "index.html";
});
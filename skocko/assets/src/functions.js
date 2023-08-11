function generateSolution(){
    const randomCombinationArray = [];
    const currentComArray = [];
    let exists = 0;    
    let onPlace = 0;
    
    for (let i = 0; i < 4; i++) {
        if (currentCom[i] == randomCombination[i]) {
            onPlace++;
        } else {
            currentComArray.push(currentCom[i]);
            randomCombinationArray.push(randomCombination[i]);
        }
    }  

    for (let i = 0; i < currentComArray.length; i++) {
        const field = currentComArray[i];

        if (randomCombinationArray.includes(currentComArray[i])) {
            // const indexToRemove = randomCombinationArray.findIndex((value) => value == field);
            const indexToRemove = randomCombinationArray.findIndex(function(value) {
                return value == field;
            });
            randomCombinationArray.splice(indexToRemove, 1);
            exists++;
        }
    }

    // console.log({ 
    //     exists: exists, 
    //     onPlace: onPlace
    // });

    for (let i = 0; i < 4; i++) {
        var redYellowCircle = document.querySelectorAll('.result')[index].querySelectorAll('.circle')[i];

        if (i < onPlace) {
            redYellowCircle.style.background = "red";
            // onPlace--;
        } else {
            if (exists > 0) {
                redYellowCircle.style.background = "yellow";
                exists--;
            }
        }
    }  

    // if 4 symbols are correct show bonus score, random combination and stop the timer
    if(onPlace == 4){
        gameStatus = true;

        normalScore();

        bonusScore();

        for (let i = 0; i <= 3; i++) {
            var solution = document.querySelectorAll('.solution div');

            if(currentCom[i] !== '0') {
                solution[i].innerHTML = '<img src="' + 'assets/images/' + currentCom.split('')[i] + '.png">';
            }
        }

        document.querySelector('#confirm').style.display = 'none';
        document.querySelector('#newgame').style.display = 'block';
        document.querySelector('.score').innerText = score;
        
        document.querySelectorAll('.combination div').forEach(item => {
            item.classList.add('disabled');
        });         

        clearInterval(timer);
        
        confetti({
            particleCount: 500,
            startVelocity: 20,
            spread: 360,
            origin: {
                x: Math.random(),
                y: Math.random() - 0.2
            }
        });
    } else {
        currentCom = '0000';
        index++;

        // if combination after 6th attempt is wrong show random combination and stop the timer
        if(index == 6){
            for (let i = 0; i <= 3; i++) {
                var solution = document.querySelectorAll('.solution div');

                solution[i].innerHTML = '<img src="' + 'assets/images/' + randomCombination.split('')[i] + '.png">';
            }
            
            document.querySelector('#confirm').style.display = 'none';
            document.querySelector('#newgame').style.display = 'block';

            clearInterval(timer);

            gameStatus = true;
        }
    }
}

function generateSymbol(){
    for(let i = 0; i <= 3; i++){
        document.querySelectorAll('.combination')[index].querySelectorAll('div')[i].innerHTML = '';

        if (currentCom[i] !== '0') {
            document.querySelectorAll('.combination')[index].querySelectorAll('div')[i].innerHTML = '<img src="' + 'assets/images/' + currentCom[i] + '.png">';
        }            
    }
    
    currentCom = currentCom.join('');
}

function timeStarted() {
    // timer not to go bellow 0
    if(time > -1){
        let timeLeft = 60 - time;

        document.querySelector('.start-timer').innerText = time;

        if (window.innerWidth > 991) {
            document.querySelector('.full-timer').style.height = (timeLeft * 100 / 60) + "%";
            document.querySelector('.full-timer').style.width = '';
        } else {
            document.querySelector('.full-timer').style.width = (timeLeft * 100 / 60) + "%";
            document.querySelector('.full-timer').style.height = '';
        }
        
        time--;
    } else{
        var solution = document.querySelectorAll('.solution div');

        // if timer is up show random combination
        for (var i = 0; i < solution.length; i++) {
            solution[i].innerHTML = '<img src="' + 'assets/images/' + randomCombination.split('')[i] + '.png">';
        }

        document.querySelector('#confirm').style.display = 'none';
        document.querySelector('#timeup').style.display = 'block';
        document.querySelector('#newgame').style.display = 'block';
        
        clearInterval(timer);

        gameStatus = true;
    }
}

timer = setInterval(timeStarted, 1000);

function normalScore(){
    switch (true) {
        case index == 0 || index == 1:
            score += 20;

            break;
        case index == 2 || index == 3:
            score += 15;

            break;
        case index == 4 || index == 5:
            score += 10;

            break;
        default:
            break;
    }
}

function bonusScore(){
    switch (true) {
        case time >= 50:
            score += 15;

            break;
        case time >= 40:
            score += 10;

            break;
        case time >= 30:
            score += 5;

            break;
        default:
            break
    }
}
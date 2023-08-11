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

function timeStarted() {
    // timer to lower until 0 sec
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
    } else {
        document.querySelector('.solution div').innerHTML = randomWord.toUpperCase();
        document.querySelector('#confirm').style.display = 'none';
        document.querySelector('#check').style.display = 'none';
        document.querySelector('#newgame').style.display = 'block';
        document.querySelector('#timeup').style.display = 'block';
    }
}
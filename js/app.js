const board = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
const overlay = document.querySelector('#overlay');
const startButton = document.querySelector('.btn__reset');
const gameButtons = document.querySelectorAll('button');
const ul = phrase.firstElementChild;
const phrases = [
    'I LIKE TURTLES',
    'HELLO WORLD',
    'WHERE THERE IS A WILL THERE IS A WAY',
    'WHEN IN ROME',
    'A BIRD IN THE HAND IS WORTH TWO IN THE BUSH'
];
const scoreboard = document.querySelector('#scoreboard');
const hearts = scoreboard.getElementsByClassName('tries');
let missed = 0;
let endGame = false;

function getRandomPhraseAsArray(arr) {
    const random = Math.ceil(Math.random() * arr.length) - 1;
    const randomPhrase = arr[random];
    const newPhraseArray = randomPhrase.split("");
    return newPhraseArray;
}

function addPhraseToDisplay(arr) {
    const letter = /[A-Z]/;
    for (let i = 0; i < arr.length; i++) {
        const li = document.createElement('li');
        if (letter.test(arr[i])) {
            li.className = 'letter';
        }
        else {
            li.className = 'space';
        }
        li.textContent = arr[i];
        li.style.marginTop = '2px';
        ul.appendChild(li);
    }
}

const letterCollection = document.getElementsByClassName('letter');

function checkLetter(btn) {
    const letterCollection = document.getElementsByClassName('letter');
    let letterFound = null;
    for (let i = 0; i < letterCollection.length; i++) {
        let letter = letterCollection[i].textContent.toLowerCase();
        if (btn.textContent === letter) {

            letterCollection[i].classList.add('show');
            letterCollection[i].style.transform = 'rotateY(360deg)';
            letterCollection[i].style.transition = '1s';
            overlay.style.zIndex = '1';
            letterFound = true;
        }
    }
    return letterFound;
}

function checkWin() {
    let letterClass = 0;
    let showClass = 0;
    let title = overlay.firstElementChild;
    let letterList = ul.children;

    for (let item of letterList) {
        if (item.classList.contains('letter')) {
            letterClass++;
        }
        if (item.classList.contains('show')) {
            showClass++;
        }
    }

    if (missed === hearts.length) {
        overlay.className = 'lose';
        overlay.style.display = '';
        title.textContent = `Game Over`;
        startButton.textContent = 'Try Again'
        endGame = true;
    }
    else if (letterClass === showClass) {
        overlay.className = 'win';
        overlay.style.display = '';
        title.textContent = `You Win!`;
        startButton.textContent = 'Play Again'
        endGame = true;
    }
}

function resetGame() {
    const oldPhrase = ul.children;
    const usedLetters = document.getElementsByClassName('chosen');
    for (let i = oldPhrase.length - 1; i >= 0; i--) {
        oldPhrase[i].remove();
    }
    for (let i = usedLetters.length - 1; i >= 0; i--) {
        usedLetters[i].removeAttribute('disabled');
        usedLetters[i].className = '';
    }
    missed = 0;
    for (let heart of hearts) {
        heart.firstChild.setAttribute('src', '../images/liveheart.png');
    }
}

board.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        const button = event.target;
        button.className = 'chosen';
        button.disabled = 'true';

        if (!checkLetter(button)) {
            missed++;
            for (let i = 0; i < hearts.length; i++) {
                hearts[missed - 1].firstChild.setAttribute('src', '../images/lostHeart.png');
            }
        }
    }
    checkWin();
});

// document.addEventListener('click', (e) => {
//     console.log(e);

// });

startButton.addEventListener('click', () => {
    if (endGame) {
        resetGame();
    }
    overlay.style.display = 'none';
    const lettersArray = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(lettersArray);
});
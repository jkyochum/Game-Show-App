const board = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
const startScreen = document.querySelector('#overlay');
const startButton = document.querySelector('.btn__reset');
const gameButton = document.querySelectorAll('button');
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

function checkLetter(btn) {
    const letterCollection = document.getElementsByClassName('letter');
    let letterFound = null;
    for (let i = 0; i < letterCollection.length; i++) {
        let letter = letterCollection[i].textContent.toLowerCase();
        if (btn.textContent === letter) {
            letterCollection[i].classList.add('show');
            letterFound = true;

        }
    }
    return letterFound;
}
let liClass = ul.children;

function checkWin() {
    let letterClass = 0;
    let showClass = 0;
    let liClass = document.querySelector('li').className;

    if (liClass = 'letter') {
        letterClass++;
    }
    else if (liClass = 'show') {
        showClass++;
    }

    if (missed === hearts.length) {
        startScreen.className = 'lose';
        startScreen.style.display = '';
    }
    else if (letterClass === showClass) {
        startScreen.className = 'win';
        startScreen.style.display = '';
    }
}

board.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        const button = event.target;
        button.className = 'chosen';
        button.disabled = 'true';

        if (!checkLetter(button)) {
            missed++;
            console.log(missed);
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





const lettersArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(lettersArray);

startButton.addEventListener('click', () => {
    startScreen.style.display = 'none';
});
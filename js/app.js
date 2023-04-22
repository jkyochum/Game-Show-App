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
        // li.style.marginTop = '2px';
        ul.appendChild(li);
    }
}

function checkLetter(btn) {
    // console.log(btn.textContent);
    const letterCollection = document.getElementsByClassName('letter');
    for (let i = 0; i < letterCollection.length; i++) {
        let letter = letterCollection[i].textContent.toLowerCase();
        // console.log(letter)
        if (btn.textContent === letter) {
            // letter.className = 'show';
            console.log(letter);
        }
        else {
            return null;
        }
    }
}

const letterCollection = document.getElementsByClassName('letter');


board.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        const button = event.target;
        checkLetter(button);
    }
});

// document.addEventListener('click', (e) => {
//     console.log(e);

// });





const lettersArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(lettersArray);

startButton.addEventListener('click', () => {
    startScreen.style.display = 'none';
});
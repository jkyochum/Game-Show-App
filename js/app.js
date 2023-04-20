const board = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
const startScreen = document.querySelector('#overlay');
const startButton = document.querySelector('.btn__reset');
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
    const letterCollection = document.getElementsByClassName('letter');
    for (let letter of letterCollection) {

    }
}

const lettersArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(lettersArray);

startButton.addEventListener('click', () => {
    startScreen.style.display = 'none';
});
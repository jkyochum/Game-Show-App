const board = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
const startScreen = document.querySelector('#overlay');
const startButton = document.querySelector('.btn__reset');
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
    let newPhraseArray = [];
    for (let phrase in arr) {

        newPhraseArray = phrase.split();
    }
    for (let item in newPhraseArray) {
        console.log(item);
    }
    return newPhraseArray;
}

getRandomPhraseAsArray(phrases);

startButton.addEventListener('click', () => {
    startScreen.style.display = 'none';
});
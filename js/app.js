const board = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
const startScreen = document.querySelector('#overlay');
const startButton = document.querySelector('.btn__reset');
let missed = 0;


startButton.addEventListener('click', () => {
    startScreen.style.display = 'none';

});
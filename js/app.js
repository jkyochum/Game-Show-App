const board = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
const startScreen = document.querySelector('#overlay');
const startButton = document.querySelector('.btn__reset');
const phrases = [
    'I LIKE TURTLES',
    'HELLO WORLD',
    'ALLS WELL THAT ENDS WELL',
    'WHEN IN ROME',
    'A BIRD IN THE HAND IS WORTH TWO IN THE BUSH'
];
let missed = 0;


startButton.addEventListener('click', () => {
    startScreen.style.display = 'none';

});
const board = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
const overlay = document.querySelector('#overlay');
const startButton = document.querySelector('.btn__reset');
const gameButtons = document.querySelectorAll('button');
const ul = phrase.firstElementChild;
const phrases = [
    'BETTER LATE THAN NEVER',
    'HELLO WORLD',
    'A PENNY SAVED IS A PENNY EARNED',
    'WHEN IN ROME',
    'A BIRD IN THE HAND IS WORTH TWO IN THE BUSH',
];
const scoreboard = document.querySelector('#scoreboard');
const hearts = scoreboard.getElementsByClassName('tries');
let missed = 0;
let endGame = false;
let incorrectPuzzle = false;
const usedPhraseArray = [];
let lastPhraseUsed = '';


//take the phrase array and generate a random phrase from the array
//each phrase will be different than the last until each phrase in the array is used
//save the last phrase used for a lost game

function getRandomPhraseAsArray(arr) {
    let random = Math.ceil(Math.random() * arr.length) - 1;
    let randomPhrase = arr[random];

    if (usedPhraseArray.length > 0) {
        if (usedPhraseArray.length === arr.length) {
            usedPhraseArray.length = 0;
        }
        else {
            while (usedPhraseArray.includes(randomPhrase)) {
                random = Math.ceil(Math.random() * arr.length) - 1;
                randomPhrase = arr[random];
            }
        }
    }
    if (randomPhrase === lastPhraseUsed) {
        while (randomPhrase === lastPhraseUsed) {
            random = Math.ceil(Math.random() * arr.length) - 1;
            randomPhrase = arr[random];
        }
    }

    lastPhraseUsed = randomPhrase;
    usedPhraseArray.push(randomPhrase);
    return randomPhrase;
}


//checking the passed array for letters and spaces
//add appropriate class to letters while looping
//append the letters to the list to create the board

function addPhraseToDisplay(arr) {
    const letter = /[A-Z]/;
    const newPhraseArray = arr.split(" ");  //split into words

    for (let i = 0; i < newPhraseArray.length; i++) {
        const listItemHolder = document.createElement('li');
        const newSplitArray = newPhraseArray[i].split(""); //split the words into letters

        for (let j = 0; j < newSplitArray.length; j++) {
            const div = document.createElement('div');
            const span = document.createElement('span');
            if (letter.test(newSplitArray[j])) {
                div.className = 'letter';
            }
            div.textContent = newSplitArray[j];
            if (i !== newPhraseArray.length - 1 && j === newSplitArray.length - 1) {
                listItemHolder.appendChild(div);
                listItemHolder.appendChild(span); //append a span to the li after the last letter
            }
            else {
                listItemHolder.appendChild(div); //append the new div to the new li inside the ul
            }
            div.style.marginTop = '2px';
            div.style.display = 'inline-block';
            span.style.display = 'inline-block';
            span.className = 'space';
        }

        ul.appendChild(listItemHolder); //append the li wrapping the div's
        ul.style.userSelect = 'none';
        ul.style.display = 'flex'; //flex the parent container
        ul.style.flexWrap = 'wrap'; //flex-wrap
        ul.style.justifyContent = 'center'; //center the words
        ul.style.gap = '4px';
    }
}


//if the letter was found, show it on the board
//create a transform to spice up the letter reveal
//if no letter is found, return null and move on

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


//check each letter based on its class and compare the results against the displayed letters' class to see if the game was won
//check the missed counter and compare the sum to the number of hearts to see if the user lost

function checkWin() {
    let letterClass = 0;
    let showClass = 0;
    const title = overlay.firstElementChild;
    const wordList = ul.children;
    let childList;
    const letterList = [];

    for (let i = 0; i < wordList.length; i++) { //loop through the div list inside ul
        childList = wordList[i].children;
        for (let j = 0; j < childList.length; j++) { //loop through the li list inside each div

            if (childList[j].classList.contains('letter')) {
                letterList.push(childList[j]); //if the class is letter then push to main list item array
            }
        }
    }

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
        incorrectPuzzle = true;
    }
    else if (letterClass === showClass) {
        overlay.className = 'win';
        overlay.style.display = '';
        title.textContent = `You Win!`;
        startButton.textContent = 'Play Again'
        endGame = true;
        incorrectPuzzle = false;
    }
}


//reset the game to default settings

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
        heart.firstChild.setAttribute('src', 'images/liveHeart.png');
    }
}


startButton.addEventListener('mouseover', (e) => {
    startButton.style.cursor = 'pointer';
});


//clicking the keyboard will trigger an event to check if the letter clicked is in the hidden phrase
//disable the button once clicked and change its style

board.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        const button = event.target;
        button.className = 'chosen';
        button.disabled = 'true';

        if (!checkLetter(button)) {
            missed++;
            for (let i = 0; i < hearts.length; i++) {
                hearts[missed - 1].firstChild.setAttribute('src', 'images/lostHeart.png');
            }
        }
    }
    checkWin();
});


//if the game is over then reset the game
//if the previous phrase was not guessed then start over with the same phrase, otherwise run the game as normal

startButton.addEventListener('click', () => {
    if (endGame) {
        resetGame();
    }
    overlay.style.display = 'none';
    if (incorrectPuzzle) {
        addPhraseToDisplay(lastPhraseUsed);
    }
    else {
        const lettersArray = getRandomPhraseAsArray(phrases);
        addPhraseToDisplay(lettersArray);
    }
});
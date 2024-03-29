

const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const button = document.getElementsByTagName('BUTTON');

let missed = 0;

const phrases = [
    'easy does it',
    'wild goose chase',
    'break a leg',
    'missed the boat',
    'on the ball',
];


//Event listener to hide start screen on click

document.addEventListener('click', (e) => {
    if (e.target.className === 'btn__reset') {
        const overlay = document.querySelector('#overlay');
        overlay.style.display = 'none';
    }
});

//function to randomly pick a phrase from the array, and creates a new split array of that phrase
//funtion will take an array of phrases as a parameter

function getRandomPhrasesArray(phrases) {
         const randomPhraseIndex = Math.floor(Math.random() * phrases.length);
         const randomPhrase = phrases[randomPhraseIndex];
         const splitPhrase = randomPhrase.split('');
         return splitPhrase;
}

let phraseArray = getRandomPhrasesArray(phrases);


//function to split the random phrase into characters and spaces.
//Letters and spaces appended as list items to ul

function addPhraseToDisplay(phraseArray) {
    for (let i = 0; i < phraseArray.length; i++) {
        const ul = document.querySelector('#phrase ul');
        let character = phraseArray[i];
        const li = document.createElement('li');
        li.textContent = character;
            if (li.textContent === ' ') {
                li.className = 'space';
            } else {
                li.className = 'letter';
            }
        ul.appendChild(li);
     }
}

//function used to remove all phrase letters when a player resets the game

function removePhraseFromDisplay() {
        const ul = document.querySelector('#phrase ul');
        while (ul.hasChildNodes()) {
            ul.removeChild(ul.firstChild);
     }
}

addPhraseToDisplay(phraseArray);

let totalLetters = document.querySelectorAll('.letter');

//function to check if the letter clicked is within the random phrase

function checkLetter(clickedButton) {
    
    const letters = document.getElementsByTagName('LI');
    let matchFound = null;

    for (let i = 0; i < letters.length; i++) {
        
        let letter = '';
        letter = letters[i].textContent;
        if (letter === clickedButton) {
            letters[i].className = "show";
            matchFound = letter;
        }
    }  return matchFound;
};

//function used to reset keyboard buttons to a blank class.

function resetKeys() {
    const keys = document.getElementsByTagName('BUTTON');

    for (let i = 0; i < keys.length; i++) {
        keys[i].classList.remove('chosen');
    }
}

//function used within restart button to reset hearts

function resetHearts() {
    const heartReset = document.getElementsByClassName('tries');

    for (let i = 0; i < heartReset.length; i++) {
        heartReset[i].innerHTML =`<img src="images/liveHeart.png" height="35px" width="30px">`;
    }
}

function checkWin() {
    
    const overlay = document.querySelector('#overlay');
    const totalShow = document.querySelectorAll('.show');

    if (totalLetters.length === totalShow.length) {
        console.log('yiippppeee');
        overlay.className = 'win';
        overlay.style.display = 'flex';
        phrase.style.display = 'none';
        overlay.querySelector('.title').innerHTML = 'Congrats on the win!';
        overlay.querySelector('.btn__reset').innerHTML = 'Restart';

    } else if ( missed >= 5 ) {
        overlay.className = 'lose';
        overlay.style.display = 'flex';
        phrase.style.display = 'none';
        overlay.querySelector('.title').innerHTML = `Bummer! You've run out of hearts.`;
        overlay.querySelector('.btn__reset').innerHTML = 'Restart';
    }
}

qwerty.addEventListener('click', (e) => {
    if (e.target === button || e.target.className !== 'chosen' && e.target.className !== 'keyrow' && e.target.className !== 'section') {

        let chosenButton = e.target;
        chosenButton.className = 'chosen';
        let buttonLetter = chosenButton.textContent;
        let letterGuess = checkLetter(buttonLetter);

        const heartBox = document.querySelector('ol');
        const heart = document.createElement('li');
        const removeHeart = document.querySelector('ol').lastElementChild;
        heart.className = 'tries';
        heart.innerHTML = `<img src="images/lostHeart.png" height="35px" width="30px">`;

            if (letterGuess === null) {
                heartBox.prepend(heart);
                removeHeart.remove();
                missed++;
            }
            
            checkWin();           
    }
});

//Restart Button click event to reset the game //
//clears the keyboard, removes the previous phrase, generates another random phrase
//adds the new phrase to display, and resets hearts

document.addEventListener('click', (e) => {
    if (e.target.className === 'btn__reset' && e.target.innerHTML === 'Restart') {
        const overlay = document.querySelector('#overlay');
        overlay.style.display = 'none';
        phrase.style.display = 'initial';

        resetKeys();

        removePhraseFromDisplay();

        let restartArray = getRandomPhrasesArray(phrases);

        addPhraseToDisplay(restartArray);

        totalLetters = document.querySelectorAll('.letter');

        resetHearts();

        missed = 0;

        console.log('Here we go again');
    }
});




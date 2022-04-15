

const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const button = document.getElementsByTagName('BUTTON');

let missed = 0;

const phrases = [
    'bite the bullet',
    'better late than never',
    'a blessing in disguise',
    'go back to the drawing board',
    'random phrase',
];


//Event listener to hide start screen on click

document.addEventListener('click', (e) => {
    if (e.target.className === 'btn__reset') {
        const hideStart = document.querySelector('#overlay');
        hideStart.style.display = 'none';
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

console.log(phraseArray); //DELETE CONSOLE LOG LATER

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

addPhraseToDisplay(phraseArray);

const totalLetters = document.querySelectorAll('.letter');


//funtion to return a letter if in phrase
//Or return a null value if not in phrase

function checkLetter(clickedButton) {
    
    const letters = document.getElementsByTagName('LI');
    let matchFound = null;

    for (let i = 0; i < letters.length; i++) {
        
        let letter = '';
        letter = letters[i].textContent;
        //console.log((letter)); DELETE LATER
        if (letter === clickedButton) {
            //console.log('yippee'); DELETE LATER
            letters[i].className = "show";
            matchFound = letter;
            //console.log(matchFound); DELETE LATER
        }
    }  return matchFound;
};


qwerty.addEventListener('click', (e) => {
    if (e.target === button || e.target.className !== 'chosen') {

        let chosenButton = e.target;
        chosenButton.className = 'chosen'
        let buttonLetter = chosenButton.textContent;
        //console.log(buttonLetter); DELETE LATER
        let letterGuess = checkLetter(buttonLetter);
        //console.log(letterGuess); DELETE LATER

        const heartbox = document.querySelector('ol');
        const heart = document.createElement('li');
        const removeHeart = document.querySelector('ol').lastElementChild;
        heart.className = 'tires';
        heart.innerHTML = `<img src="images/lostHeart.png" height="35px" width="30px">`;


            if (letterGuess === null) {
                heartbox.prepend(heart);
                removeHeart.remove();
                missed++;
                console.log(missed); // DELETE LATER
            }
    }
});



function checkwin() {
    
    const winOverlay = document.querySelector('#overlay');
    const totalShow = document.querySelectorAll('.show');

    if (totalLetters.length === totalShow.length) {
        console.log('yiippppeee');
        winOverlay.className = 'win'
    }
}

checkwin();

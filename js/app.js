

const keyboard = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const button = document.getElementsByTagName('BUTTON');

let missed = 0;

const phrases = [
    'Bite the bullet',
    'Better late than never',
    'A blessing in disguise',
    'Go back to the drawing board',
    'Random phrase',
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
console.log(phraseArray);

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
        //console.log(li); //REMOVE CONSOLE LOG LATER
        ul.appendChild(li);
     }
}

addPhraseToDisplay(phraseArray);

document.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        let randomValue = document.getElementsByTagName('BUTTON');
        console.log(`you're clicking me`);
        
    }
});




const letters = document.querySelectorAll('.letter'); //correctly gets nodelist [li.letter]


function checkLetter(booty) {
    for (i = 0; i < letters.length; i++) {
        
        let matchFound = null; //correctly returns null
        let letter = letters[i].textContent; //letter now stores letter in element array

        if (letter === booty) {
            letters[i].className = "show";
            matchFound = booty.textContent;
            console.log('yippe');
        }
        return matchFound;
    }
};



// const letters = document.querySelectorAll('.letter');
//     let letter = letters.textContent;
//     console.log(letters); //logging <li class='letter'>G</li>
//     console.log(letter);

checkLetter('A');


    
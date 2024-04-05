//============cg openning page============

const startBtn = document.querySelector('.start-button');
const videoWrapper = document.querySelector('.video-wrapper');
const levelSelection = document.querySelector('.level-selection');

startBtn.addEventListener('click', function () {
    videoWrapper.style.display = 'none';
    levelSelection.style.display = 'block';
});


//============level selection page============

const agilityBtn = document.querySelector('.agility');
const matchingGame = document.querySelector('.matching-game');

agilityBtn.addEventListener('click', function () {
    levelSelection.style.display = 'none';
    matchingGame.style.display = 'block';
});


//============card page============



let cards = document.querySelectorAll(".card");

//  Fisher–Yates shuffle, randomize the order of cards
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

let cardElements = Array.from(document.querySelectorAll('.card'));
shuffleArray(cardElements);
cardElements.forEach(card => {
    document.querySelector('.cards-wrapper').appendChild(card);
});



//  Matching two cards
let lockBoard = false;
let flippedCard = false;
let firstCard, secondCard;
let turnNumber = 10;
let matchNumber = 0;



function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');

    if (!flippedCard) {
        flippedCard = true;
        firstCard = this;
    } else {
        secondCard = this;
        checkForMatch(); // Check for match will handle the turn count
    }
}



function checkForMatch() {
    let isMatch = firstCard.dataset.cardId === secondCard.dataset.cardId;
    if (isMatch) {
        matchNumber++;
        disableCards();
        updateMatches();
        updateTurns(); 
    } else {
        turnNumber--;
        unflipCards();
        updateTurns(); // Update turns since we are sure it's not a match
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 500);
}

function resetBoard() {
    [flippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function unflipFirstCard() {
    if (firstCard) {
        firstCard.classList.remove('flipped');
        firstCard = null;
        flippedCard = false;
    }
}


const victoryModal = document.getElementById('victoryModal');
const failureModal = document.getElementById('failureModal');

function showVictoryModal() {
    victoryModal.style.display = 'block';
}

function showLoseModal() {
    failureModal.style.display = 'block';
}



function updateTurns() {
    document.getElementById('turns').innerHTML = 'Turn<br>' + turnNumber;
    if (matchNumber === 6) {
        showVictoryModal();
        disableAllCards(); 
        return; 
    }

    if (turnNumber <= 0) {
        showLoseModal();
        disableAllCards();
    }
}

function disableAllCards() {
    cards.forEach(card => {
        card.removeEventListener('click', flipCard);
    });
}


function updateMatches() {
    document.getElementById('matches').innerHTML = `Match <br>${matchNumber}`;
}

cards.forEach(card => card.addEventListener('click', flipCard));

setTimeout(unflipFirstCard, 500);




// ========= Game Over ======================


const playAgainBtn = document.getElementById('playAgain');
const tryAgainBtn = document.getElementById('tryAgain');
const exitGameBtn = document.getElementById('exitGame');
const giveUpBtn = document.getElementById('giveUp');
const exitGameTop = document.getElementById('exitGameTop');


playAgainBtn.addEventListener('click', function () {
    victoryModal.style.display = 'none';
    failureModal.style.display = 'none';
    resetGame();
});


tryAgainBtn.addEventListener('click', function () {
    failureModal.style.display = 'none';
    victoryModal.style.display = 'none';
    resetGame();
});


exitGameBtn.addEventListener('click', function () {
    victoryModal.style.display = 'none';
    matchingGame.style.display = 'none';
    levelSelection.style.display = 'block';
    resetGame();
});

exitGameTop.addEventListener('click', function () {
    victoryModal.style.display = 'none';
    matchingGame.style.display = 'none';
    levelSelection.style.display = 'block';
    resetGame();
});

giveUpBtn.addEventListener('click', function () {
    failureModal.style.display = 'none';
    matchingGame.style.display = 'none';
    videoWrapper.style.display = 'block';
    resetGame();
});




function resetGame() {
    // reset UI
    matchNumber = 0;
    turnNumber = 10
    updateTurns();
    updateMatches();

    shuffleArray(cardElements);

    // Clear the current cards in the DOM
    const cardsWrapper = document.querySelector('.cards-wrapper');
    cardsWrapper.innerHTML = '';  // Remove existing cards from the DOM

    // Append the shuffled cards to the DOM
    cardElements.forEach(card => {
        cardsWrapper.appendChild(card); 
        card.classList.remove('flipped');
        card.addEventListener('click', flipCard);
    });

    lockBoard = false;
    flippedCard = false;
    victoryModal.style.display = 'none';
    failureModal.style.display = 'none';
}





// ========== Comparing Game==================================



const strengthBtn = document.querySelector('.strength');
const comparingGame = document.querySelector('.comparing-game');

strengthBtn.addEventListener('click', function () {
    levelSelection.style.display = 'none';
    comparingGame.style.display = 'block';
});



const suits = ["Spades", "Hearts", "Diamonds", "Clubs"];
const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

//generate poker
function getDeck() {
    let deck = [];
    for (let i = 0; i < suits.length; i++) {
        for (let j = 0; j < ranks.length; j++) {
            let card = { Rank: ranks[j], Suit: suits[i] };
            deck.push(card);
        }
    }
    return deck;
}

"use strict";

// Selecting elements
const totalScorePlayerZero = document.getElementById(`score--0`);
const totalScorePlayerOne = document.getElementById(`score--1`);
const bgPlayer0 = document.querySelector(".player--0");
const bgPlayer1 = document.querySelector(".player--1");
const dice = document.querySelector(".dice");
const rollDiceBtn = document.querySelector(".btn--roll");
const holdBtn = document.querySelector(".btn--hold");
const newGameBtn = document.querySelector(".btn--new");

// Variables
let currentScore;
let activePlayer;
let playing;
let scores;

const initGame = function () {
    bgPlayer0.classList.remove("player--winner");
    bgPlayer0.classList.add("player--active");
    bgPlayer1.classList.remove("player--winner");
    bgPlayer1.classList.remove("player--active");
    document.getElementById(`current--0`).textContent = 0;
    document.getElementById(`current--1`).textContent = 0;

    totalScorePlayerZero.textContent = 0;
    totalScorePlayerOne.textContent = 0;
    dice.classList.add("hidden");
    currentScore = 0;
    activePlayer = 0; // Player1 start the game
    playing = true;
    scores = [0, 0];
};

// helper function
const switchActivePlayer = function () {
    activePlayer = activePlayer == 0 ? 1 : 0;
    currentScore = 0;
    bgPlayer0.classList.toggle("player--active");
    bgPlayer1.classList.toggle("player--active");
};

// Start the game
initGame();

// Rolling dice functionality
rollDiceBtn.addEventListener("click", function () {
    if (playing) {
        const randomDiceNumber = Math.trunc(Math.random() * 6 + 1);

        // display dice side
        dice.classList.remove("hidden");
        dice.src = `dice-${randomDiceNumber}.png`;

        // check if we lose or not
        if (randomDiceNumber !== 1) {
            currentScore += randomDiceNumber;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            document.getElementById(`current--${activePlayer}`).textContent = 0;
            currentScore = 0;
            switchActivePlayer();
        }
    }
});

holdBtn.addEventListener("click", function () {
    if (playing) {
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        document.getElementById(`current--${activePlayer}`).textContent = 0;

        if (scores[activePlayer] >= 100) {
            playing = false;
            dice.classList.add("hidden");
            document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
            document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
        } else {
            switchActivePlayer();
        }
    }
});

newGameBtn.addEventListener("click", initGame);

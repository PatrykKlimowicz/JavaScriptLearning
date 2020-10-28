"use strict";

const displayMessage = function (message) {
    document.querySelector(".message").textContent = message;
};

const setScore = function (score) {
    document.querySelector(".score").value = score;
};

const getRandom = function () {
    return Math.trunc(Math.random() * 20 + 1);
};

const calcHighScore = function (currScore) {
    let currHighScore = Number(document.querySelector(".highscore").textContent);
    if (currScore > currHighScore) {
        document.querySelector(".highscore").textContent = score;
    }
};

let secretNumber = getRandom();

let score = 20;

// react to user action
document.querySelector(".check").addEventListener("click", function () {
    const guess = Number(document.querySelector(".guess").value);

    if (!guess) {
        document.querySelector(".message").textContent = "No number :(";
    } else if (guess === secretNumber) {
        displayMessage("CORRECT!");
        setScore(score);
        calcHighScore(score);

        document.querySelector(".number").textContent = String(secretNumber);
        document.querySelector(".number").style.width = "30rem";
        document.querySelector("body").style.backgroundColor = "#60b347";
    } else {
        if (score > 1) {
            displayMessage(guess > secretNumber ? "Too big...!" : "Too small...!");
            setScore((score -= 1));
        } else {
            displayMessage("YOU LOSE THE GAME!");
            setScore(0);
        }
    }
});

document.querySelector(".again").addEventListener("click", function () {
    score = 20;
    secretNumber = getRandom();
    setScore(score);
    displayMessage("Start guessing...");
    document.querySelector(".guess").value = "";
    document.querySelector("body").style.backgroundColor = "#222";
    document.querySelector(".number").style.width = "15rem";
    document.querySelector(".number").textContent = "?";
});

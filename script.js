'use strict';
const player0 = document.querySelector('.player--0'); //player 1 element
const player1 = document.querySelector('.player--1'); //player  2 element
let activePlayer = 0; //player currently playing
let currentScore = 0; //current score of playing player
const winner = document.querySelector(`.winner`); // winner element
let scores = [0, 0]; // total scores of both players
const dice = document.querySelector('.dice'); // dice image element
const buttonNew = document.querySelector('.btn--new'); // New game button
const buttonRoll = document.querySelector('.btn--roll'); // roll dice button
const buttonHold = document.querySelector('.btn--hold'); // hold button
const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0; //active player current score =0
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active');
  activePlayer = activePlayer === 0 ? 1 : 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
}; // change player
const checkWinner = function () {
  if (scores[0] >= 100) {
    return 0;
  } else if (scores[1] >= 100) {
    return 1;
  } else {
    return 2;
  }
}; // to check if any player has reached to 100 points
const displayWinner = function (pl) {
  let rpl = pl - 1;
  winner.textContent = `Player ${pl} Wins🏆`;
  winner.classList.remove(`hidden`);
  dice.classList.add('hidden');
  document.querySelector(`.player--${rpl}`).classList.remove('player--active');
  document.querySelector(`.player--${rpl}`).classList.add('player--winner');
}; // display winner

dice.classList.add('hidden'); // hide dice image initially
buttonRoll.addEventListener('click', function () {
  if (checkWinner() === 2) {
    let rolledNum = 0;
    rolledNum = Math.trunc(Math.random() * 6) + 1;
    //displaying dice
    dice.classList.remove('hidden');
    console.log(rolledNum);
    dice.src = `dice-${rolledNum}.png`;
    //switch player if rolled 1
    if (rolledNum === 1) {
      switchPlayer();
    } else {
      currentScore += rolledNum;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
  }
});

buttonHold.addEventListener('click', function () {
  if (checkWinner() === 2) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    switchPlayer();
    if (checkWinner() === 1) {
      displayWinner(2);
    } else if (checkWinner() === 0) {
      displayWinner(1);
    }
  }
});
buttonNew.addEventListener('click', function () {
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  dice.classList.add('hidden');
  scores = [0, 0];
  activePlayer = 0;
  currentScore = 0;
  document.getElementById(`score--0`).textContent = 0;
  document.getElementById(`score--1`).textContent = 0;
  winner.classList.add(`hidden`);
  document.getElementById(`current--0`).textContent = 0;
  document.getElementById(`current--1`).textContent = 0;
});

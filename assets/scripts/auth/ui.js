'use strict';

const app = require('../app.js');
const api = require('./api.js');

const getGameSuccess = (data) => {
  if(data){
    $("#totalGames").html(data.games.length);
} else {

}
};

const success = (data) => {
  if(data){
    console.log(data);
} else {

}
};

const failure = (error) => {
  console.error(error);
};

const signInSuccess = (data) => {
  app.user = data.user;
};

const signOutSuccess = function (){
  app.user = null;

};

const createGameSuccess = function (data) {
  console.log(data);
  console.log(data.game);
  app.game = data.game;

};

const updateGame = function (data) {
  app.game = data.game;

};

const endGame = function() {
  $('#gameOver').modal('show');
};

// check for tie
let checkTie = function(boardState) {
  for (let key in boardState) {
    if (boardState[key] === '') {
      return false;
    }
  }
  return true;
};

let checkBoardGame = function(boardState, winner) {

  //row 1
  if ('' !== boardState['0'] &&
    boardState['0'] === boardState['1'] &&
    boardState['1'] === boardState['2'] &&
    boardState['2'] === boardState['0']) {

    if (boardState['0'] === 'x') {
      winner = 'x';
      return winner;
    } else {
      winner = 'o';
      return winner;
    }
  }
  //row 2
  else if ('' !== boardState['3'] &&
    boardState['3'] === boardState['4'] &&
    boardState['4'] === boardState['5'] &&
    boardState['5'] === boardState['3']) {

    if (boardState['3'] === 'x') {
      winner = 'x';
      return;
    } else {
      winner = 'o';
      return winner;
    }
  }
  //row 3
  else if ('' !== boardState['6'] &&
    boardState['6'] === boardState['7'] &&
    boardState['7'] === boardState['8'] &&
    boardState['8'] === boardState['6']) {

    if (boardState['6'] === 'x') {
      winner = 'x';
      return winner;
    } else {
      winner = 'o';
      return winner;
    }
  }
  //col 1
  else if ('' !== boardState['0'] &&
    boardState['0'] === boardState['3'] &&
    boardState['3'] === boardState['6'] &&
    boardState['0'] === boardState['6']) {

    if (boardState['0'] === 'x') {
      winner = 'x';
      return winner;
    } else {
      winner = 'o';
      return winner;
    }
  }
  //col 2
  else if ('' !== boardState['1'] &&
    boardState['1'] === boardState['4'] &&
    boardState['4'] === boardState['7'] &&
    boardState['1'] === boardState['7']) {

    if (boardState['1'] === 'x') {
      winner = 'x';
      return winner;
    } else {
      winner = 'o';
      return winner;
    }
  }
  //col 3
  else if ('' !== boardState['2'] &&
    boardState['2'] === boardState['5'] &&
    boardState['5'] === boardState['8'] &&
    boardState['2'] === boardState['8']) {

    if (boardState['2'] === 'x') {
      winner = 'x';
      return winner;
    } else {
      winner = 'o';
      return winner;
    }
  }
  //diagonal 1
  else if ('' !== boardState['0'] &&
    boardState['0'] === boardState['4'] &&
    boardState['4'] === boardState['8'] &&
    boardState['8'] === boardState['0']) {

    if (boardState['0'] === 'x') {
      winner = 'x';
      return winner;
    } else {
      winner = 'o';
      return winner;
    }
  }
  //diagonal 2
  else if ('' !== boardState['2'] &&
    boardState['2'] === boardState['4'] &&
    boardState['4'] === boardState['6'] &&
    boardState['6'] === boardState['2']) {

    if (boardState['2'] === 'x') {
      winner = 'x';
      return winner;
    } else {
      winner = 'o';
      return winner;
    }
  } else if (checkTie(boardState) === true) {
    $('#gameWinner').html('The game is a tie');
    api.onEndGame()
      .done(endGame)
      .fail(failure);
      winner = null;
      return winner;

  }

};


module.exports = {
  failure,
  success,
  signInSuccess,
  signOutSuccess,
  createGameSuccess,
  updateGame,
  endGame,
  getGameSuccess,
  checkBoardGame
};

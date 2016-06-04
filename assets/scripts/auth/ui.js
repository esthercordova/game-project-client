'use strict';

const app = require('../app.js');

let totalGamesWonByX = 0;
let totalGamesWonByO = 0;
let totalTies = 0;
let totalGames = 0;

const success = (data) => {
  if(data){
    console.log(data);
} else {

}
};

const changePasswordSuccess = () => {
  $('#changePasswordMessage').html('You successfully changed your password.');
  $('#signUpMessage').html('');
  $('#signOutMessage').html('');
  $('#signInMessage').html('');
};

const signUpSuccess = (data) => {
  if(data){
    $('#signUpMessage').html('You made an account. Please sign in to start playing.');
    $('#signInMessage').html('');
    $('#signOutMessage').html('');
    $('#changePasswordMessage').html('');
} else{

}
};

const failure = (error) => {
  console.error(error);
};

const signInSuccess = (data) => {
  app.user = data.user;
  $('#signInMessage').html('You successfully logged in!');
  $('#signUpMessage').html('');
  $('#signOutMessage').html('');
  $('#changePasswordMessage').html('');
};

const signOutSuccess = function (){
  app.user = null;
  $('#signInMessage').html('');
  $('#signOutMessage').html("It's sad to see you leave... Come back soon.");
  $('#signUpMessage').html('');
  $('#changePasswordMessage').html('');
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

let checkBoardGame = function(boardState) {
  var winner;
  //row 1
  if ('' !== boardState['0'] &&
    boardState['0'] === boardState['1'] &&
    boardState['1'] === boardState['2'] &&
    boardState['2'] === boardState['0']) {

    if (boardState['0'] === 'x') {
      winner = 'x';
      return winner;
    } else if(boardState['0'] === 'o') {
      winner = 'o';
      return winner;
    }
    else {
      return null;
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
    } else if(boardState['6'] === 'o') {
      winner = 'o';
      return winner;
    }
    else {
      return null;
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
    } else if(boardState['0'] === 'o') {
      winner = 'o';
      return winner;
    }
    else {
      return null;
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
    } else if(boardState['1'] === 'o') {
      winner = 'o';
      return winner;
    }
    else {
      return null;
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
    } else if(boardState['2'] === 'o') {
      winner = 'o';
      return winner;
    }
    else {
      return null;
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
    } else if(boardState['0'] === 'o') {
      winner = 'o';
      return winner;
    }
    else {
      return null;
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
    } else if(boardState['2'] === 'o') {
      winner = 'o';
      return winner;
    }
    else {
      return null;
    }
  } else if (checkTie(boardState) === true) {
      return 'tie';

  } else{
    return null;
  }

};

const upDateScoreOnUI = (winnerOfGame) => {

  if (winnerOfGame === 'x'){
    totalGamesWonByX += 1;
    totalGames += 1;
  }
  else if (winnerOfGame === 'o'){
    totalGamesWonByO += 1;
    totalGames += 1;
  }
  else if (winnerOfGame === 'tie'){
    totalTies += 1;
    totalGames += 1;
  }

$("#totalGames").html(" Total Games Played : " + totalGames);
$("#playero").html(" Player o : " + totalGamesWonByO);
$("#playerx").html(" Player x : " + totalGamesWonByX);
$("#numberOfTies").html(" Ties : " + totalTies);

};

const getGameSuccess = (data) => {
  if(data){
    totalGamesWonByX = 0;
    totalGamesWonByO = 0;
    totalTies = 0;
    totalGames = 0;

    // console.log(data.games);
    for (var i = 0; i < data.games.length; i++) {
      var simpleArrayFromServer = data.games[i].cells;

      var associatedArrayForBoardState = {};
      for (var j = 0; j < simpleArrayFromServer.length; j++) {
        associatedArrayForBoardState[j.toString()] = simpleArrayFromServer[j];
      }

      var winnerOfServerGame = checkBoardGame(associatedArrayForBoardState);
      upDateScoreOnUI(winnerOfServerGame);

    }

} else {

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
  checkBoardGame,
  upDateScoreOnUI,
  signUpSuccess,
  changePasswordSuccess
};

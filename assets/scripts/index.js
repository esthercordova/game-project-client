'use strict';

const authEvents = require('./auth/events.js');
const api = require('./auth/api.js');
const ui = require('./auth/ui.js');

// On document ready
$(() => {
  authEvents.addHandlers();
});

  let boardState;
  let simpleArray = ['', '', '', '', '', '', '', '', ''];
  let activeGame = false;
  let playerMove = 'x';
  let winner;
  let scoreO = 0;
  let scoreX = 0;

  let newGameBegin = function() {
    $('#gameWinner').html('');
    activeGame = true;
    boardState = {
      '0': '', '1': '', '2': '', '3': '','4': '', '5': '',
      '6': '', '7': '','8': '',
      };

      $(".square").css('background-color', 'white');
  };

  newGameBegin();

  $('#showPlayersTurn').html(playerMove);

  let checkTie = function() {
    for (let key in boardState) {
      if (boardState[key] === '') {
        return false;
      }
    }
    return true;
  };

  let endGame = function() {
    if (winner === 'o' || winner === 'x') {
      if (winner === 'o') {
        scoreO += 1;
      } else {
        scoreX += 1;
      }
      activeGame = false;
      api.onEndGame()
        .done(ui.endGame)
        .fail(ui.failure);

      if (winner === 'o') {
        $('#playero').html('Player o : ' + scoreO);
      } else if (winner === 'x') {
        $('#playerx').html('Player x : ' + scoreX);
      }
      $('#gameWinner').html('The winner is: ' + winner);
      winner = null;
    }
  };

  let checkBoardGame = function() {
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

      if (boardState['0'] === 'x') {
        winner = 'x';
        return winner;
      } else {
        winner = 'o';
        return winner;
      }
    } else if (checkTie() === true) {
      $('#gameWinner').html('The game is a tie');
    }

  };

  // make moves and color the square accordningly
  $(".square").click(function() {
    let index = $(this).data('id');
    let player = playerMove;
    let over = false;
    if (activeGame === true && boardState[this.id] === '') {

      if (playerMove === 'o') {
        $(this).css('background-color', '#e6e6e6');
        boardState[this.id] = 'o';
        simpleArray.splice(parseInt(this.id), 1, playerMove);


        playerMove = 'x';
      } else {
        $(this).css('background-color', '#80ffd4');
        boardState[this.id] = 'x';
        simpleArray.splice(parseInt(this.id), 1, playerMove);


        playerMove = 'o';
      }
      checkBoardGame();
    }

    api.onUpdateGame(index, player, over)
      .done(ui.updateGame)
      .fail(ui.failure);


    $('#showPlayersTurn').html(playerMove);

    endGame();
  });

  // click handlers
  $("#newGame").click(function() {
    newGameBegin();
  });

  $('#sign-in').on('submit', function() {
  });

  $('#playAgain').on('click', function() {
    $('#gameOver').modal('toggle');
  });

  // $('#signIn').on('shown.bs.modal', function () {
  //   $('#myInput').focus();
  // });
  //
  //
  // $('#signUp').on('shown.bs.modal', function () {
  //   $('#myInput').focus();
  // });

'use strict';

const authEvents = require('./auth/events.js');
const api = require('./auth/api.js');
const ui = require('./auth/ui.js');

// On document ready
$(() => {
  authEvents.addHandlers();
});

  let scoreO = 0;
  let scoreX = 0;

  let boardState;
  let simpleArray = ['', '', '', '', '', '', '', '', ''];
  let activeGame = false;
  let playerMove = 'x';

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

  let winner; //grey is x pink is o

  let endGame = function() {
    if (winner === 'o' || winner === 'x') {
      if (winner === 'o') {
        scoreO += 1;
      } else {
        scoreX += 1;
      }

      if (winner === 'o') {
        $('#playero').html('Player o : ' + scoreO);
        $('#gameWinner').html('The winner is: ' + winner);
      } else if (winner === 'x') {
        $('#playerx').html('Player x : ' + scoreX);
        $('#gameWinner').html('The winner is: ' + winner);
      }
      else if (winner === 'tie'){
        $('#gameWinner').html('The game is a tie');
      }
      api.onEndGame()
        .done(ui.endGame)
        .fail(ui.failure);
      winner = null;
      activeGame = false;
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

      winner = ui.checkBoardGame(boardState);
    }

    api.onUpdateGame(index, player, over)
      .done(ui.updateGame)
      .fail(ui.failure);


    $('#showPlayersTurn').html(playerMove);

    endGame();
  });

  $("#newGame").click(function() {
    newGameBegin();
  });

  $('#sign-in').on('submit', function() {

  });

  $('#playAgain').on('click', function() {
    $('#gameOver').modal('toggle');
    newGameBegin();
  });



  // $('#signIn').on('shown.bs.modal', function () {
  //   $('#myInput').focus();
  // });
  //
  //
  // $('#signUp').on('shown.bs.modal', function () {
  //   $('#myInput').focus();
  // });

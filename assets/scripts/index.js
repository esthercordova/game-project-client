'use strict';

const authEvents = require('./auth/events.js');

// On document ready
$(() => {
  authEvents.addHandlers();
});



$( document ).ready(function() {

  let boardState;
  let simpleArray = [];

  let activeGame = false;

  let newGameBegin = function(){
    $('#gameWinner').html('');
      activeGame = true;
      boardState = {
        'top-left': 'unclicked',
        'top-center': 'unclicked',
        'top-right': 'unclicked',
        'middle-left': 'unclicked',
        'middle-center': 'unclicked',
        'middle-right': 'unclicked',
        'bottom-left': 'unclicked',
        'bottom-center': 'unclicked',
        'bottom-right': 'unclicked',
      };

      $(".square").css('background-color', 'white');
  };

  newGameBegin();

  let playerMove = 'x';

  $('#showPlayersTurn').html(playerMove);

  let winner; //grey is x pink is o

  let scoreO = 0;
  let scoreX = 0;

  // check for tie
  let checkTie = function () {
  for (let key in boardState) {
    if (boardState[key] === 'unclicked') {
      return false;
    }
  }
  return true;
  };

  let endGame = function(){
    if (winner === 'o' || winner === 'x') {
      if(winner === 'o'){
        scoreO += 1;
    } else {
        scoreX += 1;
    }
    activeGame = false;
    // console.log("score o is: "+ scoreO +" and score x is " + scoreX);
    if(winner === 'o') {
      $('#playero').html('Player o : ' + scoreO);
    } else if (winner === 'x') {
      $('#playerx').html('Player x : ' + scoreX);
    }
    $('#gameWinner').html('The winner is: ' + winner);
    winner = null;
  }};

  let checkBoardGame = function  (){
    console.log(boardState);

    //row 1
    if('unclicked'!== boardState['top-left'] &&
     boardState['top-left'] === boardState['top-center'] &&
     boardState['top-center'] === boardState['top-right'] &&
     boardState['top-right'] === boardState['top-left']){

      if(boardState['top-left'] === 'x'){
        winner = 'x';
        return winner;
      }
      else{
        winner = 'o';
        return winner;
      }
    }
    //row 2
    else if('unclicked'!== boardState['middle-left'] &&
     boardState['middle-left'] === boardState['middle-center'] &&
     boardState['middle-center'] === boardState['middle-right'] &&
     boardState['middle-right'] === boardState['middle-left']){

      if(boardState['middle-left'] === 'x'){
        winner = 'x';
        return;
      }
      else{
        winner = 'o';
        return winner;
      }
    }
    //row 3
    else if( 'unclicked'!== boardState['bottom-left'] &&
     boardState['bottom-left'] === boardState['bottom-center'] &&
     boardState['bottom-center'] === boardState['bottom-right'] &&
     boardState['bottom-right'] === boardState['bottom-left']){

      if(boardState['bottom-left'] === 'x'){
        winner = 'x';
        return winner;
      }
      else{
        winner = 'o';
        return winner;
      }
    }
    //col 1
    else if( 'unclicked'!== boardState['top-left'] &&
     boardState['top-left'] === boardState['middle-left'] &&
     boardState['middle-left'] === boardState['bottom-left'] &&
     boardState['top-left'] === boardState['bottom-left']){

      if(boardState['top-left'] === 'x'){
        winner = 'x';
        return winner;
      }
      else{
        winner = 'o';
        return winner;
      }
    }
    //col 2
    else if( 'unclicked'!== boardState['top-center'] &&
     boardState['top-center'] === boardState['middle-center'] &&
     boardState['middle-center'] === boardState['bottom-center'] &&
     boardState['top-center'] === boardState['bottom-center']){

      if(boardState['top-center'] === 'x'){
        winner = 'x';
        return winner;
      }
      else{
        winner = 'o';
        return winner;
      }
    }
    //col 3
    else if( 'unclicked'!== boardState['top-right'] &&
     boardState['top-right'] === boardState['middle-right'] &&
     boardState['middle-right'] === boardState['bottom-right'] &&
     boardState['top-right'] === boardState['bottom-right']){

      if(boardState['top-right'] === 'x'){
        winner = 'x';
        return winner;
      }
      else{
        winner = 'o';
        return winner;
      }
    }
    //diagonal 1
    else if( 'unclicked'!== boardState['top-left'] &&
     boardState['top-left'] === boardState['middle-center'] &&
     boardState['middle-center'] === boardState['bottom-right'] &&
     boardState['bottom-right'] === boardState['top-left']){

      if(boardState['top-left'] === 'x'){
        winner = 'x';
        return winner;
      }
      else{
        winner = 'o';
        return winner;
      }
    }
    //diagonal 2
    else if( 'unclicked'!== boardState['top-right'] &&
     boardState['top-right'] === boardState['middle-center'] &&
     boardState['middle-center'] === boardState['bottom-left'] &&
     boardState['bottom-left'] === boardState['top-right']){

      if(boardState['top-left'] === 'x'){
        winner = 'x';
        return winner;
      }
      else{
        winner = 'o';
        return winner;
      }
    }
    else if (checkTie()===true) {
      $('#gameWinner').html('The game is a tie');
    }

  };



  // make moves and color the square accordningly
  $(".square").click(function () {
    if (activeGame === true) {
        if(boardState[this.id] === 'unclicked') {

          if(playerMove === 'o') {

              $(this).css('background-color','#e6e6e6');
              boardState[this.id] = 'o';
              playerMove = 'x';
            }

          else{
              $(this).css('background-color','#80ffd4');
              boardState[this.id] = 'x';
              playerMove = 'o';
            }
          }

            checkBoardGame();
          // console.log('Its this players turn ' + playerMove);
          // console.log(boardState);
           $('#showPlayersTurn').html(playerMove);
           endGame();
          }

  });

    $("#newGame").click(function() {
      newGameBegin();
    });

$('#sign-in').on('submit', function(){
  console.log("form was submitted");

});



// $('#signIn').on('shown.bs.modal', function () {
//   $('#myInput').focus();
// });
//
//
// $('#signUp').on('shown.bs.modal', function () {
//   $('#myInput').focus();
// });

  });

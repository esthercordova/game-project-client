'use strict';

const authEvents = require('./auth/events.js');

// On document ready
$(() => {
  authEvents.addHandlers();
});



$( document ).ready(function() {

  let boardState;
  let simpleArray = ['','','','','','','','',''];

  let activeGame = false;

  let newGameBegin = function(){
    $('#gameWinner').html('');
      activeGame = true;
      boardState = {
        '0': '',
        '1': '',
        '2': '',
        '3': '',
        '4': '',
        '5': '',
        '6': '',
        '7': '',
        '8': '',
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
    if (boardState[key] === '') {
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

    //row 1
    if(''!== boardState['0'] &&
     boardState['0'] === boardState['1'] &&
     boardState['1'] === boardState['2'] &&
     boardState['2'] === boardState['0']){

      if(boardState['0'] === 'x'){
        winner = 'x';
        return winner;
      }
      else{
        winner = 'o';
        return winner;
      }
    }
    //row 2
    else if(''!== boardState['3'] &&
     boardState['3'] === boardState['4'] &&
     boardState['4'] === boardState['5'] &&
     boardState['5'] === boardState['3']){

      if(boardState['3'] === 'x'){
        winner = 'x';
        return;
      }
      else{
        winner = 'o';
        return winner;
      }
    }
    //row 3
    else if( ''!== boardState['6'] &&
     boardState['6'] === boardState['7'] &&
     boardState['7'] === boardState['8'] &&
     boardState['8'] === boardState['6']){

      if(boardState['6'] === 'x'){
        winner = 'x';
        return winner;
      }
      else{
        winner = 'o';
        return winner;
      }
    }
    //col 1
    else if( ''!== boardState['0'] &&
     boardState['0'] === boardState['3'] &&
     boardState['3'] === boardState['6'] &&
     boardState['0'] === boardState['6']){

      if(boardState['0'] === 'x'){
        winner = 'x';
        return winner;
      }
      else{
        winner = 'o';
        return winner;
      }
    }
    //col 2
    else if( ''!== boardState['1'] &&
     boardState['1'] === boardState['4'] &&
     boardState['4'] === boardState['7'] &&
     boardState['1'] === boardState['7']){

      if(boardState['1'] === 'x'){
        winner = 'x';
        return winner;
      }
      else{
        winner = 'o';
        return winner;
      }
    }
    //col 3
    else if( ''!== boardState['2'] &&
     boardState['2'] === boardState['5'] &&
     boardState['5'] === boardState['8'] &&
     boardState['2'] === boardState['8']){

      if(boardState['2'] === 'x'){
        winner = 'x';
        return winner;
      }
      else{
        winner = 'o';
        return winner;
      }
    }
    //diagonal 1
    else if( ''!== boardState['0'] &&
     boardState['0'] === boardState['4'] &&
     boardState['4'] === boardState['8'] &&
     boardState['8'] === boardState['0']){

      if(boardState['0'] === 'x'){
        winner = 'x';
        return winner;
      }
      else{
        winner = 'o';
        return winner;
      }
    }
    //diagonal 2
    else if( ''!== boardState['2'] &&
     boardState['2'] === boardState['4'] &&
     boardState['4'] === boardState['6'] &&
     boardState['6'] === boardState['2']){

      if(boardState['0'] === 'x'){
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
        if(boardState[this.id] === '') {

          if(playerMove === 'o') {

              $(this).css('background-color','#e6e6e6');
              boardState[this.id] = 'o';
              simpleArray.splice(parseInt(this.id), 1, playerMove);
              console.log(simpleArray);
              playerMove = 'x';
            }

          else{
              $(this).css('background-color','#80ffd4');
              boardState[this.id] = 'x';
              simpleArray.splice(parseInt(this.id), 1, playerMove);
              console.log(simpleArray);
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

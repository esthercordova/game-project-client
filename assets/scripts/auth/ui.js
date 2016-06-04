'use strict';

const app = require('../app.js');


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
  console.log('in ui data');
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


module.exports = {
  failure,
  success,
  signInSuccess,
  signOutSuccess,
  createGameSuccess,
  updateGame,
  endGame,
  getGameSuccess
};

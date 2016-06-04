'use strict';

const getFormFields = require('../../../lib/get-form-fields');

const api  = require('./api');
const ui = require('./ui');
const logic = require('../index.js');
// const app = require('../app');
let turn = 0;
let move = '';

const onSignUp = function(event){
  event.preventDefault();
  let data = getFormFields(event.target);
  api.signUp(data)
  .done(ui.success)
  .fail(ui.failure);
};

const onSignIn = function(event){
  event.preventDefault();
  let data = getFormFields(event.target);
  api.signIn(data)
  .done(ui.signInSuccess)
  .fail(ui.failure);
};

const onSignOut = function(event){
  event.preventDefault();
  api.signOut()
  .done(ui.signOutSuccess)
  .fail(ui.failure);
};

const onChangePassword = function(event){
  event.preventDefault();
  let data = getFormFields(event.target);
  api.changePassword(data)
  .done(ui.success)
  .fail(ui.failure);
};

const onCreateNewGame = function(event){
  event.preventDefault();
  api.createNewGame()
  .done(ui.createGameSuccess)
  .fail(ui.failure);
};

const onGetGame = function(event) {
  event.preventDefault();
  let id = $('#game-id').val();
  api.getGameByID(id)
  .done(ui.getGameSuccess)
  .fail(ui.failure);
};

const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp);
  $('#sign-in').on('submit', onSignIn);
  $('#sign-out').on('submit', onSignOut);
  $('#change-password').on('submit', onChangePassword);
  $('#newGame').click(onCreateNewGame);
  $('#getGame').on('submit', onGetGame);
  $('#playAgain').on('click', onCreateNewGame);
  // $('.square').click(onUpdateGame);

};

module.exports = {
  addHandlers,
  onCreateNewGame,
};

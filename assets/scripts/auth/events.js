'use strict';

const getFormFields = require('../../../lib/get-form-fields');

const api  = require('./api');
const ui = require('./ui');

const onSignUp = function(event){
  event.preventDefault();
  let data = getFormFields(event.target);
  api.signUp(data)
  .done(ui.signUpSuccess)
  .fail(ui.failure);
};

const eventsSignInSuccess = function(data){
  ui.signInSuccess(data);

  api.getGameByID("")
  .done(ui.getGameSuccess)
  .fail(ui.failure);

  api.createNewGame()
  .done(ui.createGameSuccess)
  .fail(ui.failure);
};

const onSignIn = function(event){
  event.preventDefault();
  let data = getFormFields(event.target);
  api.signIn(data)
  .done(eventsSignInSuccess)
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
  .done(ui.changePasswordSuccess)
  .fail(ui.failure);
};

const onCreateNewGame = function(event){
  event.preventDefault();
  api.createNewGame()
  .done(ui.createGameSuccess)
  .fail(ui.failure);
};

const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp);
  $('#sign-in').on('submit', onSignIn);
  $('#sign-out').on('submit', onSignOut);
  $('#change-password').on('submit', onChangePassword);
  $('#newGame').click(onCreateNewGame);
  $('#playAgain').on('click', onCreateNewGame);

};

module.exports = {
  addHandlers,
  onCreateNewGame,
};

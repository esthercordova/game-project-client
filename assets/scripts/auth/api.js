'use strict';

const app = require('../app.js');

const signUp = (data) => {
  return $.ajax(
    {
    url: app.host + '/sign-up/',
    method: 'POST',
    data: data
  });
};

const signIn = (data) => {
  return $.ajax(
    {
      url: app.host + '/sign-in/',
      method: 'POST',
      data
    });
};

const signOut = function() {
  return $.ajax(
    {
      url: app.host + '/sign-out/' + app.user.id,
      method: 'DELETE',
      headers: {
        Authorization: 'Token token=' + app.user.token,
      },
    });
};

const changePassword = function (data) {
  return $.ajax(
    {
      url: app.host + '/change-password/' + app.user.id,
      method: 'PATCH',
      headers: {
        Authorization: 'Token token=' + app.user.token,
      },
      data: data
    });
  };

  const createNewGame = function () {
    return $.ajax(
      {
        url: app.host + '/games/',
        method: 'POST' ,
        headers: {
          Authorization: 'Token token=' + app.user.token,
        }
      });
  };

  const getGameByID = function(id){
    return $.ajax(
      {
        url: app.host + '/games/' + id,
        method: 'GET' ,
        headers: {
          Authorization: 'Token token=' + app.user.token,
        }
      });
    };

const onUpdateGame = function(index, player){
      return $.ajax({
        url: app.host + '/games/' + app.game.id,
        method: 'PATCH',
        headers: {
          Authorization: 'Token token=' + app.user.token,
        },
        data: {
          "game": {
            "cell": {
              "index": index,
              "value": player,
            },
            "over": false,
          }
        }
      });
    };

const onEndGame = function() {
  return $.ajax({
    url: app.host + '/games/' + app.game.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
    data: {
      "game": {
        "over": true,
      }
    }
  });
};


module.exports = {
  signUp,
  signIn,
  signOut,
  changePassword,
  createNewGame,
  getGameByID,
  onUpdateGame,
  onEndGame,
};

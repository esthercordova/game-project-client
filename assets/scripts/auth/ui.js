'use strict';

const app = require('../app.js');

const success = (data) => {
  if(data){
  console.log(data);
} else {
  console.log("success");
}
};

const failure = (error) => {
  console.error(error);
};

const signInSuccess = (data) => {
  app.user = data.user;
  // console.log(app.user);

};

const signOutSuccess = function (){
  app.user = null;
  console.log(app);
  console.log("You signed out successfully");
};


module.exports = {
  failure,
  success,
  signInSuccess,
  signOutSuccess,

};

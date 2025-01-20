const express = require("express");

const Router  = express.Router();


const { handleUserSignup ,handleUserLogin} = require("../Controller/user");


Router.post("/",handleUserSignup)
Router.post("/login", handleUserLogin);

module.exports = Router;
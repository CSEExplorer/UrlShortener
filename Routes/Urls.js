const Url = require("../Model/Urls");
const express = require("express");

const Router = express.Router();

const {handleCreateShortUrl,handleGetRedirectUrl,handleGetVisitCount} = require("../Controller/Url")


Router.post("/", handleCreateShortUrl);


Router.get("/:shortUrl",handleGetRedirectUrl );

Router.get("/visitCount/:shortUrl",handleGetVisitCount)

module.exports = Router;

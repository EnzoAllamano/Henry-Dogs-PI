const appTemperaments = require("express").Router();
const axios = require("axios");
const { query } = require("express");
const { API_KEY } = process.env;



appTemperaments.get("/", (req, res) => {

})

module.exports = {appTemperaments}
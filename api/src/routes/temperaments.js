const appTemperaments = require("express").Router();
const {Temperament} = require('../db')

appTemperaments.get("/", async (req, res) => {
    let temperaments = await Temperament.findAll()
    res.send(temperaments)
})

module.exports = {appTemperaments}
const { Router } = require("express");
const { appDogs, getAPIDogs } = require("./allDogs");
const { appTemperaments } = require("./temperaments");
const { Temperament, conn } = require("../db.js");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

async function getTemperaments() {
  let result = await getAPIDogs();
  result = result.data
  if (result.length > 0) {
    let temperaments = [];
    result.forEach((d) => {
      if (d.temperament)
        d.temperament.split(", ").forEach((t) => temperaments.push(t));
    });
    temperaments = temperaments.filter(
      (t, index) => temperaments.indexOf(t) === index
    );
    temperaments = temperaments.map(t => {return {name: t}})
    console.log(temperaments.length + " temperaments loaded")
    return temperaments;
  } else {
    console.log("Error loading temperaments " + result);
    return [];
  }
}
(async function loadTemperaments() {
  temperaments = await getTemperaments();
  Temperament.bulkCreate(temperaments)
})()

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/dogs", appDogs);
router.use("/temperaments", appTemperaments);

module.exports = router;

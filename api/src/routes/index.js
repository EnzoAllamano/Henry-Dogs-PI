const { Router } = require("express");
const { appDogs, getDogs } = require("./allDogs");
const { appTemperaments } = require("./temperaments");
const { Temperament, conn } = require("../db.js");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

async function getTemperaments() {
  let dogs = []
  let result = await getDogs({}, dogs);
  if (result === true) {
    let temperaments = [];
    dogs.forEach((d) => {
      if (d.temperament)
        d.temperament.split(", ").forEach((t) => temperaments.push(t));
    });
    temperaments = temperaments.filter(
      (t, index) => temperaments.indexOf(t) === index
    );
    return temperaments;
  } else {
    console.log("Error loading temperaments");
    return []
  }
}

async function loadTemperaments() {
  let id = 0,
    temperaments = await getTemperaments();
  temperaments.forEach((t) =>
    Temperament.create({
      id: ++id,
      name: t,
    })
  );
}
// loadTemperaments();
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/dogs", appDogs);
router.use("/temperaments", appTemperaments);

module.exports = router;
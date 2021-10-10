const { Router } = require("express");
const { appDogs, getDogs } = require("./allDogs");
const { appTemperaments } = require("./temperaments");
const { Temperament, conn } = require("../db.js");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

async function getTemperaments() {
  let dogs = [];
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
    return [];
  }
}

async function loadTemperaments() {
  temperaments = await getTemperaments();
  for (let i = 0; i < temperaments.length; i++) {
    await Temperament.create({
      name: temperaments[i],
    });
  }
}
loadTemperaments();
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/dogs", appDogs);
router.use("/temperaments", appTemperaments);

module.exports = router;

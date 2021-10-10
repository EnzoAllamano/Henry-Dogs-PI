const appDogs = require("express").Router();
const axios = require("axios");
const { API_KEY } = process.env;
const { Dog } = require("../db.js");

// await Dog.create({
// name: "perritu",
// id: 999
// })

var allDogs = [];

function setImg(auxDogs, searchDogs) {
  // Cuando se realiza una búsqueda las razas vienen sin imagen, solo tienen una ID de referencia que es inútil
  // porque no se pueden utilizar los endpoints para traerlas, por cada raza que existe en auxDogs (que se carga al momento de traer "TODAS" las razas)
  // la coloco en un Array según su id para evitar recorrerlo demasiadas veces.
  let auxDogsArr = [];
  auxDogs.forEach((dog) => (auxDogsArr[dog.id] = dog));
  // Ahora por cada raza nueva que haya llegado le asigno la image.url que tiene la raza correspondiente en su id del arreglo auxDogsArr
  searchDogs.forEach(
    (dog) =>
      (dog.image = {
        url: auxDogsArr[dog.id] ? auxDogsArr[dog.id].image.url : undefined,
      })
  );
  return searchDogs;
}

function repairUselessAPIErrors(dogs) {
  dogs.forEach((breed) => {
    if (!breed.temperament)
      breed.temperament = "Intelligent, Charming, Sociable"; // Hay razas sin temperamentos
    if (!breed.image) breed.image = {};
    if (!breed.image.url)
      breed.image.url =
        "https://eventovirtual.co/wp-content/themes/appon/assets/images/no-image/No-Image-Found-400x264.png";

    let splitedWeight = breed.weight.imperial.split(" - ");
    if (splitedWeight.length < 2) {
      if (splitedWeight[0].includes("–"))
        breed.weight.imperial = breed.weight.imperial.replace("–", "-");
      else breed.weight.imperial = `${splitedWeight[0]} - ${splitedWeight[0]}`;
    }

    if (isNaN(parseInt(splitedWeight[0])))
      breed.weight.imperial = `${splitedWeight[1]} - ${splitedWeight[1]}`;
    if (isNaN(parseInt(splitedWeight[1])))
      breed.weight.imperial = `${splitedWeight[0]} - ${splitedWeight[0]}`;
  });
  return dogs;
}

function getAPIDogs(condicion) {
  if (condicion.name)
    return axios.get(
      `https://api.thedogapi.com/v1/breeds/search?q=${condicion.name}&api_key=${API_KEY}`
    );
  else
    return axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
}

function getDBDogs(where) {
  return Dog.findAll({ where });
}

async function getDogs(condicion, dogs) {
  const PROMISES = [getAPIDogs(condicion), getDBDogs(condicion)]; // Ambas funciones devuelven una promesa, buscan en la API y DB respectivamente según condición
  let response;
  try {
    response = await Promise.all(PROMISES); // Carga en dogs los resultados de ambas búsquedas
  } catch (error) {
    return error;
  }
  let repairedAPI = repairUselessAPIErrors(response[0].data); // "Repara" los datos de la API
  if (Object.keys(condicion).length === 0) allDogs = repairedAPI; // Si se trajeron todas las razas las guarda en una variable auxiliar para podes extraer las imágenes cuando se haga una búsqueda por nombre
  dogs.push(...repairedAPI, ...response[1]);

  return true; // Return true para responder según lo ocurrido
}

appDogs.get("/", async (req, res) => {
  let result
  let dogs = [];
  const { name } = req.query; // Extraigo el name pasado por query
  const condicion = name ? { name } : {}; // Si se pasó name setea la condicionición como un objeto con name: req.query.name, si no vacío
  result = await getDogs(condicion, dogs);
  if (result === true) {
    dogs = dogs.map((d) => {
      return {
        name: d.name,
        weight: d.weight,
        image: d.image,
        temperament: d.temperament,
        id: d.id
      };
    });
    res.send(dogs);
  } else res.status(400).send({ msg: "API error getting " + result });
});

appDogs.get("/:idRaza", async (req, res) => {
  let dogs = [];
  const { idRaza } = req.params;
  // Carga todas las razas, NO utilizo las que ya podría tener
  //cargadas por si fueron modificadas en otra instancia
  let promiseResult = await getDogs({ id: idRaza }, dogs); // getDogs devuelve true o un Error
  if (promiseResult) {
    const dogFound = dogs.find((d) => d.id == idRaza); // Busca solo la primer raza con ese id
    dogFound
      ? res.send(dogFound)
      : res.status(400).send({ msg: "ID not found" });
  } else res.status(400).send({ msg: "API error searching idRaza " + result }); // Si la carga falló envía el error y retorna
});


appDogs.post("/create", async (req, res) => {
  let {name, id, weight, image} = req.body
  const [dogs, created] = await Dog.findOrCreate({
    where: {
      name, id, weight, image
    }
  })
  res.send(dogs)
})

module.exports = { appDogs, getDogs };

const appDogs = require("express").Router();
const axios = require("axios");
const { query } = require("express");
const { API_KEY } = process.env;
const { Dog } = require("../db.js");

// await Dog.create({
// name: "perritu",
// id: 999
// })

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
  } finally {
    dogs.push(...response[0].data, ...response[1]);
    return true;
  }
}

appDogs.get("/", async (req, res) => {
  let result, dogs = []
  const { name } = req.query; // Extraigo el name pasado por query
  const condicion = name ? { name } : {}; // Si se pasó name setea la condicionición como un objeto con name: req.query.name, si no vacío
  result = await getDogs(condicion, dogs);
  if (result === true) res.send(dogs);
  else res.status(400).send({ msg: "API error getting " + result });
});

appDogs.get("/:idRaza", async (req, res) => {
  let dogs
  const { idRaza } = req.params,
    promiseResult = await getDogs({ id: idRaza }, dogs); // Carga todas las razas, NO utilizo las que ya podría tener cargadas por si fueron modificadas en otra instancia
  if (promiseResult) {
    const dogFound = dogs.find((d) => d.id == idRaza); // Busca solo la primer raza con ese id
    dogFound ? res.send(dogFound) : res.status(400).send({ msg: "ID not found" });
  } else res.status(400).send({ msg: "API error searching idRaza " + result }); // Si la carga falló envía el error y retorna
});

module.exports = {appDogs, getDogs};

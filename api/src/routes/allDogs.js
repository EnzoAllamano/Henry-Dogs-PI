const appDogs = require("express").Router();
const axios = require("axios");
const { API_KEY } = process.env;
const { Dog, Temperament } = require("../db.js");
const { Sequelize } = require("sequelize");
const { Op } = require("sequelize")

function repairAPIBugs(dogs) {
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

function getAPIDogs(name) {
  return name
    ? axios.get(
        `https://api.thedogapi.com/v1/breeds/search?q=${name}&api_key=${API_KEY}`
      )
    : axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
}

function getDBDogDetails(id){
  return Dog.findAll({
    where: {id},
    include: [{ model: Temperament, attributes: ["name"] }],
    through: {
      attributes: [],
    },
  });
}

function getDBDogs(name) {
  let where = name !== undefined ? {name:
    {[Op.like]: `%${name}%`}
  } : {}
  return Dog.findAll({
    where,
    attributes: ["id", "name", "weight", "height", "image"],
    include: [{ model: Temperament, attributes: ["name"] }],
    through: {
      attributes: [],
    },
  });
}

async function getDogs(name) {
  try {
    let APIDogs = await getAPIDogs(name);
    APIDogs = APIDogs.data;
    APIDogs = repairAPIBugs(APIDogs);
    APIDogs = APIDogs.map((d) => {
      return {
        name: d.name,
        weight: d.weight,
        image: d.image,
        temperament: d.temperament,
        id: d.id,
      };
    });
    let DBDogs = await getDBDogs(name);
    let result = { APIDogs, DBDogs };
    return result;
  } catch (e) {
    console.log(e);
    return;
  }
}

appDogs.get("/", async (req, res) => {
  const { name } = req.query; // Extraigo el name pasado por query
  let result = await getDogs(name);
  result ? res.status(200).json(result) : res.status(400);
});

appDogs.get("/:idRaza", async (req, res) => {
  const { idRaza } = req.params;
  let DBDogs
  try {
    if(idRaza.length > 4) DBDogs = await getDBDogDetails( idRaza );
    if (DBDogs && DBDogs.length)  return res.send(DBDogs[0]);
    else {
      let APIDogs = await getAPIDogs(undefined);
      APIDogs = APIDogs.data
      const dogFound = APIDogs.find((d) => d.id == idRaza);
      dogFound ? res.send(dogFound) : res.status(405);
    }
  } catch (e) {
    console.log(e);
  }
});

function capitalize(name){
  return name ? name[0].toUpperCase() + name.slice(1, name.length) : ""
}

appDogs.post("/create", async (req, res) => {
  let { breed, minW, maxW, minH, maxH, minL, maxL, temps, url, bredF, origin,  } = req.body;
  let name = capitalize(breed),
  life_span = `${minL} - ${maxL}`,
    weight = { imperial: `${minW} - ${maxW}` },
    height = { imperial: `${minH} - ${maxH}` },
    image = { url },
    bred_for = bredF
  try {
    const [dogs, created] = await Dog.findOrCreate({
      where: {
        name,
        weight,
        height,
        life_span,
        image,
        bred_for,
        origin
      },
    });
    let temperamentsIDs = temps.map((t) => parseInt(t.id));
    dogs.addTemperaments(temperamentsIDs);
    res.send({msg: "Breed correctly created"})
  } catch (error) {
    res.send({msg: "Error during creation " + error});
  }
});

module.exports = { appDogs, getAPIDogs };
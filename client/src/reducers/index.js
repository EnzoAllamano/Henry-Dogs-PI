const initialState = {
  dogs: [], // Todos las razas
  auxDogs: [], // Necesario para no perder las razas originales y no tener que hacer un fetch nuevamente a breeds
  dogDetail: {}, // Details dog por id
  dogsActualPage: [], // subArray de dogs, los mostrados en la página actual
  actualPage: 1,
  darkMode: true,
};

var dogsPerPage = 8;

// if (breed.weight.metric.split(" - ").length === 1)
//   // Hay razas que tienen solo el peso mínimo
//   breed.weight.metric = `${breed.weight.metric.split(", ")[0]} - ${
//     breed.weight.metric.split(", ")[0]
//   }`;
//   let splitedWeightMetric = breed.weight.metric.split(" - ")
// if (
//   !breed.weight.metric || // Hay razas que directamente no tienen peso
//   breed.weight.metric === "NaN" || // Hay razas cuyo peso es "NaN"
//   splitedWeightMetric[0] === "NaN" // Hay razas cuyo peso mínimo es "NaN" pero si tienen peso máximo
// ) {
//   let [imperialMin, imperialMax] = breed.weight.imperial.split(" – ");
//   let imperialMinNumber = parseInt(imperialMin);
//   let imperialMaxNumber = parseInt(imperialMax);
//   console.log("Raza " + breed.name + "imperialmin, max " + imperialMinNumber, imperialMaxNumber)
//   if (typeof imperialMinNumber !== "number") // Hay razas que además de tener mal el metric TAMBIÉN TIENEN MAL EL IMPERIAL
//     imperialMinNumber = imperialMaxNumber - 1; // En ese caso coloco el peso mínimo igual al máximo - 2
//   breed.weight.metric = `${Math.floor(
//     imperialMinNumber / 2.205
//   )} - ${Math.floor(imperialMaxNumber / 2.205)}`;
// }
// if(splitedWeightMetric[1] === "NaN") breed.weight.metric = `${splitedWeightMetric[0]} - ${Math.floor(parseInt(breed.weight.imperial.split(' - ')[1]) / 2.205)}`

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

function sliceArray(page, dogs) {
  if (page * dogsPerPage > dogs.length)
    return dogs.slice((page - 1) * dogsPerPage, dogs.length);
  return dogs.slice((page - 1) * dogsPerPage, page * dogsPerPage);
}

function sortDogsName(sortDirection, dogs) {
  return dogs.sort((a, b) => {
    if (a.name < b.name) return -1 * sortDirection;
    if (a.name > b.name) return 1 * sortDirection;
    if (a.name === b.name) return 0;
  });
}

function sortDogsWeight(sortDirection, dogs) {
  return dogs.sort((dogA, dogB) => {
    let [promA, promB] = [dogA, dogB]
      .map((e) => e.weight.imperial.split(" - ")) // Mapeo [Dog1, Dog2] -> Dog: { Weight: { Imperial:  "pesoMin - pesoMax" }} Y me da [[minA, maxA], [minB, maxB]]
      .map((e) => (parseInt(e[0]) + parseInt(e[1])) / 2); // Ahora mapeo [[minA, maxA], [minB, maxB]] -> [promA, promB]
    return sortDirection * promA <= promB ? -1 : 1; // Sort direction invierte el ordenamiento cuando es -1
  });
}

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_ALL_DOGS": {
      let repairedArray = repairUselessAPIErrors(action.payload);
      return {
        ...state,
        dogs: repairedArray,
        auxDogs: repairedArray,
        dogsActualPage: sliceArray(state.actualPage, repairedArray),
      };
    }
    case "SEARCH_DOGS": {
      let repairedAndImgSettedArray = repairUselessAPIErrors(
        setImg(state.auxDogs, action.payload)
      );
      return {
        ...state,
        actualPage: 1,
        dogs: repairedAndImgSettedArray,
        dogsActualPage: sliceArray(state.actualPage, repairedAndImgSettedArray),
      };
    }
    case "GET_DOG_DETAIL": {
      return {
        ...state,
        dogDetail: action.payload,
      };
    }
    case "CHANGE_PAGE": {
      return {
        ...state,
        actualPage: action.payload,
        dogsActualPage: sliceArray(action.payload, state.dogs),
      };
    }
    case "SWITCH_DARK": {
      return {
        ...state,
        darkMode: !state.darkMode,
      };
    }
    case "DELETE_DOG_DETAIL": {
      return {
        ...state,
        dogDetail: {},
      };
    }
    case "LAST_PAGE": {
      let calculatedPage = Math.ceil(state.dogs.length / dogsPerPage);
      return {
        ...state,
        actualPage: calculatedPage,
        dogsActualPage: sliceArray(calculatedPage, state.dogs),
      };
    }
    case "SORT_DOGS": {
      let { sortParam, sortDirection } = action.payload,
        sortedDogs;
      if (sortParam === "name")
        sortedDogs = sortDogsName(sortDirection, state.dogs);
      if (sortParam === "weight")
        sortedDogs = sortDogsWeight(sortDirection, state.dogs);
      return {
        ...state,
        dogs: sortedDogs,
        dogsActualPage: sliceArray(state.actualPage, sortedDogs),
      };
    }

    default: {
      return state;
    }
  }
}

export default rootReducer;

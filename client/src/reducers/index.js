const initialState = {
  dogs: [], // Todos las razas
  auxDogs: [], // Necesario para no perder las razas originales y no tener que hacer un fetch nuevamente a breeds
  dogDetail: {}, // Details dog por id
  dogsActualPage: [], // subArray de dogs, los mostrados en la página actual
  actualPage: 1,
  darkMode: false,
};

export var dogsPerPage = 40;

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

function setImg(auxDogs, searchDogs) {
  // Cuando se realiza una búsqueda las razas vienen sin imagen, solo tienen una ID de referencia que es inútil
  // porque no se pueden utilizar los endpoints para traerlas, por cada raza que existe en auxDogs (que se carga al momento de traer "TODAS" las razas)
  // la coloco en un Array según su id para evitar recorrerlo demasiadas veces.
  let auxDogsArr = [];
  auxDogs.forEach((dog) => (auxDogsArr[dog.id] = dog));
  // Ahora por cada raza nueva que haya llegado le asigno la image.url que tiene la raza correspondiente en su id del arreglo auxDogsArr
  searchDogs.forEach(
    (dog) =>{
      if(dog.image && dog.image.url && dog.image.url.match(/(png$)|(jpg$)|(jpeg$)/))
    dog.image = {
        url: auxDogsArr[dog.id] ? auxDogsArr[dog.id].image.url : "https://eventovirtual.co/wp-content/themes/appon/assets/images/no-image/No-Image-Found-400x264.png",
      }}
  );
  return searchDogs;
}

function formatSingleDog(dog) {
  let obj = {
    ...dog,
    temperament: dog.temperaments.map((t) => t.name).join(", "),
  };
  delete obj.temperaments;
  return obj;
}

function formatDBDogs(dogs) {
  return dogs.map((d) => {
    return formatSingleDog(d);
  });
}

function arrayDogs(payload) {
  return [...payload.APIDogs, ...formatDBDogs(payload.DBDogs)];
}

function filterDogs(dogs, filterDBOnly) {
  return filterDBOnly
    ? dogs.filter((d) => d.id.length > 4)
    : dogs.filter((d) => d.id.toString().length <= 4);
}

function filterByTemperaments(dogs, temps) {
  let tempsString = temps.map((t) => t.name),
    res
  return dogs.filter((d) => {
    res = true
    tempsString.forEach((temp) => {
      res = res && d.temperament.includes(temp);
    });
    return res;
  });
}

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_DOG_DETAIL": {
      let payload;
      if (action.payload.id.toString().length > 4)
        payload = formatSingleDog(action.payload);
      else if(action.payload.id.toString().length <= 4) payload = action.payload;
      return {
        ...state,
        dogDetail: payload,
      };
    }
    case "GET_ALL_DOGS": {
      let payload = arrayDogs(action.payload);
      return {
        ...state,
        dogs: payload,
        auxDogs: [].concat(payload),
        dogsActualPage: sliceArray(state.actualPage, payload),
      };
    }
    case "SEARCH_DOGS": {
      let payload = arrayDogs(action.payload);
      payload = setImg(state.auxDogs, payload);
      return {
        ...state,
        actualPage: 1,
        dogs: payload,
        dogsActualPage: sliceArray(state.actualPage, payload),
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
        dogsActualPage: sliceArray(1, sortedDogs),
        actualPage: 1
      };
    }
    case "FILTER_DOGS": {
      let filteredDogs = filterDogs(state.dogs, action.payload);
      return {
        ...state,
        dogs: filteredDogs,
        dogsActualPage: sliceArray(1, filteredDogs),
        actualPage: 1,
      };
    }
    case "CLEAR_FILTERS": {
      return {
        ...state,
        dogs: [...state.auxDogs],
        dogsActualPage: sliceArray(1, state.auxDogs),
        actualPage: 1,
      };
    }
    case "FILTER_BY_TEMPERAMENTS": {
      let filteredDogs = filterByTemperaments([...state.dogs], action.payload);
      return {
        ...state,
        dogs: filteredDogs,
        actualPage: 1,
        dogsActualPage: sliceArray(1, filteredDogs),
      };
    }
    default: {
      return state;
    }
  }
}

export default rootReducer;

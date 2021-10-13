export function getAllDogs() {
  return async function (dispatch) {
    let data = await fetch("/dogs");
    let dataJ = await data.json();
    dispatch({ type: "GET_ALL_DOGS", payload: dataJ });
  };
}

export function searchDogs(name) {
  return async function (dispatch) {
    let data = await fetch(`/dogs?name=${name}`);
    data = await data.json();
    dispatch({ type: "SEARCH_DOGS", payload: data });
  };
}

export function getDogDetail(idDog) {
  return async function (dispatch) {
    let data = await fetch(`/dogs/${idDog}`);
    data = await data.json();
    dispatch({ type: "GET_DOG_DETAIL", payload: data });
  };
}


export function deleteDogDetail() {
  return {
    type: "DELETE_DOG_DETAIL",
  };
}

export function changePage(page) {
  return {
    type: "CHANGE_PAGE",
    payload: page,
  };
}

export function lastPage() {
  return {
    type: "LAST_PAGE",
  };
}
export function firstPage() {
  return {
    type: "CHANGE_PAGE",
    payload: 1,
  };
}
export function sortDogs({ sortParam, sortDirection }) {
  return {
    type: "SORT_DOGS",
    payload: {
      sortParam,
      sortDirection,
    },
  };
}


export function switchDark() {
  return {
    type: "SWITCH_DARK",
  };
}

export function filterDogs(DBOnly){
  return{
    type: "FILTER_DOGS",
    payload: DBOnly
  }
}

export function clearFilters(){
  return{
    type: "CLEAR_FILTERS"
  }
}

export function filterByTemperaments(temps){
  return  {
    type: "FILTER_BY_TEMPERAMENTS",
    payload: temps
  }
}
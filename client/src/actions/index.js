const axios = require('axios').default;

const local = "localhost:3000";

const GET_ALL_DOGS = "GET_ALL_DOGS",
  GET_DOG_DETAIL = "GET_DOG_DETAIL",
  NEXT_PAGE = "NEXT_PAGE",
  PREV_PAGE = "PREV_PAGE",
  SWITCH_DARK = "SWITCH_DARK";

export function getAllDogs() {
  return async function (dispatch) {
      let data = await fetch("/dogs")
      let dataJ = await data.json()
      dispatch({ type: GET_ALL_DOGS, payload: dataJ })
  };
}

export function getDogDetail(idDog) {
  return async function (dispatch) {
    let data = await fetch(`/dogs/${idDog}`)
    data = await data.json()
    dispatch({ type: GET_DOG_DETAIL, payload: data})
  };
}

export function nextPage() {
  return {
    type: NEXT_PAGE,
  };
}

export function prevPage() {
  return {
    type: PREV_PAGE,
  };
}

export function switchDark() {
  return {
    type: SWITCH_DARK,
  };
}

export default {
  GET_ALL_DOGS,
  GET_DOG_DETAIL,
  NEXT_PAGE,
  PREV_PAGE,
  SWITCH_DARK,
};

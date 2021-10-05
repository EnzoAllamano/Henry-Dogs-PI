const GET_ALL_DOGS = "GET_ALL_DOGS",
  GET_DOG_DETAIL = "GET_DOG_DETAIL",
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

export function deleteDogDetail(){
  return {
    type: "DELETE_DOG_DETAIL"
  }
}

export function changePage(page) {
  return {
    type: "CHANGE_PAGE",
    payload: page
  };
}

export function switchDark() {
  return {
    type: SWITCH_DARK,
  };
}

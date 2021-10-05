const initialState = {
    dogs : [],
    dogDetail: {},
    actualPage: 1,
    darkMode : false,
    dogsActualPage: []
}

var dogsPerPage = 8

function rootReducer(state = initialState, action) {
    switch(action.type) {
        case "GET_ALL_DOGS": {
            return {
                ...state,
                dogs: [...action.payload],
                dogsActualPage: action.payload.slice((state.actualPage - 1) * dogsPerPage , dogsPerPage)
            }
        }
        case "GET_DOG_DETAIL": {
            return {
                ...state,
                dogDetail: action.payload
            }
        }
        case "CHANGE_PAGE": {
            return {
                ...state,
                actualPage: action.payload,
                dogsActualPage: state.dogs.slice((action.payload - 1) * dogsPerPage , action.payload * dogsPerPage) // Toma los dogs desde (PAG - 1) * 8 [Porque pag empieza en 1]
            }
        }
        case "SWITCH_DARK": {
            return {
                ...state,
                darkMode : !state.darkMode
            }
        }
        case "DELETE_DOG_DETAIL":{
            return {
                ...state,
                dogDetail: {}
            }
        }
        default: {
            return state
        }
    }
}

export default rootReducer
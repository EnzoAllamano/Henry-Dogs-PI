const initialState = {
    dogs : [{name: "Affenpinscher"}],
    dogDetail: {},
    actualPage: 1,
    darkMode : false,
    actPage: []
}

function rootReducer(state = initialState, action) {
    switch(action.type) {
        case "GET_ALL_DOGS": {
            return {
                ...state,
                dogs: [...action.payload],
                actPage: action.payload.slice(0, 8)
            }
        }
        case "GET_DOG_DETAIL": {
            return {
                ...state,
                dogDetail: action.payload
            }
        }
        case "NEXT_PAGE": {
            return {
                ...state,
                actualPage:  state.actualPage + 1
            }
        }
        case "PREV_PAGE": {
            return {
                ...state,
                actualPage: state.actualPage - 1
            }
        }
        case "SWITCH_DARK": {
            return {
                ...state,
                darkMode : !state.darkMode
            }
        }
        default: {
            return state
        }
    }
}

export default rootReducer
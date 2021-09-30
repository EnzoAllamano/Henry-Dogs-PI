const {  GET_ALL_DOGS,
    GET_DOG_DETAIL,
    NEXT_PAGE,
    PREV_PAGE,
    SWITCH_DARK,} = require('../actions/index.js')

const initialState = {
    dogs : [{name: "Affenpinscher"}],
    dogDetail: {},
    actualPage: 1,
    darkMode : false,
}

function rootReducer(state = initialState, action) {
    switch(action.type) {
        case GET_ALL_DOGS: {
            return {
                ...state,
                dogs: action.payload
            }
        }
        case GET_DOG_DETAIL: {
            return {
                ...state,
                dogDetail: action.payload
            }
        }
        case NEXT_PAGE: {
            return {
                ...state,
                actualPage:  state.actualPage + 1
            }
        }
        case PREV_PAGE: {
            return {
                ...state,
                actualPage: state.actualPage - 1
            }
        }
        case SWITCH_DARK: {
            return {
                ...state,
                darkMode : !state.darkMode
            }
        }
    }
}

export default rootReducer
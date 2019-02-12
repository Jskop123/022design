import * as actionTypes from '../actions/actionTypes'

const initialState = {
    loading: true,
    carouselItems: []
}
const reducer = ( state = initialState, action ) => {
    switch( action.type ) {
        case actionTypes.SET_HOME_ITEMS: return { loading: false, carouselItems: action.items }
        default: return state
    }
}
export default reducer
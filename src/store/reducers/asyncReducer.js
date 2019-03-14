import * as actionTypes from '../actions/actionTypes'

const initialState = {
    siteData: null,
    loading: true,
    carouselItems: [],
}
const reducer = ( state = initialState, action ) => {
    switch( action.type ) {
        case actionTypes.SET_SITE_DATA: return { ...state, siteData: action.data }
        case actionTypes.SET_HOME_ITEMS: return { ...state, loading: false, carouselItems: action.items }
        default: return state
    }
}
export default reducer
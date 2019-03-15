import * as actionTypes from '../actions/actionTypes'

const initialState = {
    siteData: null,
    loading: true,
    carouselItems: [],
    portfolioItems: []
}
const reducer = ( state = initialState, action ) => {
    switch( action.type ) {
        case actionTypes.LOADING:           return { ...state, loading: true }
        case actionTypes.SITE_DATA:         return { ...state, siteData: action.siteData }
        case actionTypes.HOME_ITEMS:        return { ...state, loading: false, carouselItems: action.items }
        case actionTypes.PORTFOLIO_ITEMS:   return { ...state, loading: false, portfolioItems: action.portfolioItems }
        default: return state
    }
}
export default reducer
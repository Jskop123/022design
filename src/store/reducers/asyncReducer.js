import * as actionTypes from '../actions/actionTypes'

const initialState = {
    siteData: null,
    carouselItems: [],
    portfolioItems: [],
    currentProject: {}
}
const reducer = ( state = initialState, action ) => {
    switch( action.type ) {
        case actionTypes.SITE_DATA:         return { ...state, siteData: action.siteData }
        case actionTypes.HOME_ITEMS:        return { ...state, carouselItems: action.items }
        case actionTypes.PORTFOLIO_ITEMS:   return { ...state, portfolioItems: action.portfolioItems }
        case actionTypes.PROJECT:           return { ...state, currentProject: action.project }
        case actionTypes.CLEAR_PROJECT:     return { ...state, currentProject: {} }
        default: return state
    }
}
export default reducer
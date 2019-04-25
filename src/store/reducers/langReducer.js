import * as actionTypes from '../actions/actionTypes'

import languages from '../../languages.json'

const initialState = {
    lang: localStorage.lang ? localStorage.lang : 'Pl',
    text: languages[ localStorage.lang ? localStorage.lang : 'Pl' ]
}
const reducer = ( state = initialState, action ) => 
    action.type === actionTypes.CHANGE_LANGUAGE 
        ? ({ lang: action.lang, text: languages[ action.lang ] })
        : state
export default reducer
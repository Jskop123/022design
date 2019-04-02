import * as actionTypes from '../actions/actionTypes'

import languages from '../../languages.json'

const initialState = {
    lang: localStorage.lang,
    text: languages[ localStorage.lang ]
}
const reducer = ( state = initialState, action ) => 
    action.type === actionTypes.CHANGE_LANGUAGE ? 
                                                ({ lang: action.lang, text: languages[ action.lang ] })
                                                : state
export default reducer
import * as actionTypes from './actionTypes'

export const changeLang = lang => {
    if( lang === 'Pl' ) return { type: actionTypes.CHANGE_LANGUAGE, lang: 'Eng' }
    else                return { type: actionTypes.CHANGE_LANGUAGE, lang: 'Pl' }
}
import * as actionTypes from './actionTypes'

export const changeLang = lang => {
    if( lang === 'Pl' ){
        localStorage.lang = 'Eng'
        return { type: actionTypes.CHANGE_LANGUAGE, lang: 'Eng' }
    }
    else{
        localStorage.lang = 'Pl'
        return { type: actionTypes.CHANGE_LANGUAGE, lang: 'Pl' }
    }
}
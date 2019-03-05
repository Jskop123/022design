import * as actionTypes from './actionTypes'

import axios from '../../axios'

const setHomeItems = items => ({
    type: actionTypes.SET_HOME_ITEMS,
    items
})
const setSideData = response => ({
    type: actionTypes.SET_SITE_DATA,
    data: response
})
export const getSiteData = () => dispatch => {
    axios.get('/karuzela')
        .then( response => {
            dispatch( setSideData( response.data ))
            let counter = 0
            const images = []
            const homeItemsQuery = response.data //response.data.filter( el => el.acf.homePage )
            homeItemsQuery.forEach(( el, i ) => {
                images[i] = new Image()
                images[i].onload = () => {
                    counter++
                    if ( counter === homeItemsQuery.length -1 ) {
                        const homeItems = homeItemsQuery.map(( item, i ) => ({
                            titlePl: item.acf.titlePl,
                            titleEn: item.acf.titleEn,
                            link: item.acf.id,
                            image: images[i]
                        }))
                        dispatch( setHomeItems( homeItems ))
                    }
                }
                images[i].src = el.acf.photo
            })
        })
}
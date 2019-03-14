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
    axios.get('/Projekty?_embed')
        .then( response => {
            const siteData = response.data.map( el => ({ id: el.id, ...el.acf, titlePl: el.acf.titPl }))
            dispatch( setSideData( siteData ))
            let counter = 0
            const images = []
            const homeItemsQuery = siteData.filter( el => el.homepage === true ? el : null )
            homeItemsQuery.forEach(( el, i ) => {
                images[i] = new Image()
                images[i].onload = () => {
                    counter++
                    if ( counter === homeItemsQuery.length -1 ) {
                        const homeItems = homeItemsQuery.map(( item, i ) => ({
                            titlePl: item.titPl,
                            titleEng: item.titleEng,
                            link: item.titleEng.split(' ').join(''),
                            image: images[i]
                        }))
                        dispatch( setHomeItems( homeItems ))
                    }
                }
                images[i].src = el.photo
            })
        })
}
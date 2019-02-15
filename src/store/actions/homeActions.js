import * as actionTypes from './actionTypes'

import axios from '../../axios'

const setHomeItems = items => ({
    type: actionTypes.SET_HOME_ITEMS,
    items
})
export const getHomeItems = () => dispatch => {
    axios.get('/karuzela')
        .then( response => {
            let counter = 0
            const images = []
            response.data.forEach(( el, i ) => {
                images[i] = new Image()
                images[i].onload = () => {
                    counter++
                    if ( counter === response.data.length -1 ) {
                        const homeItems = response.data.map(( item, i ) => ({
                            titlePl: item.acf.titlePl,
                            titleEn: item.acf.titleEn,
                            link: item.acf.id,
                            image: images[i]
                        }))
                        dispatch( setHomeItems( homeItems ))
                        console.log(homeItems)
                    }
                }
                images[i].src = el.acf.photo
            })
        })
}
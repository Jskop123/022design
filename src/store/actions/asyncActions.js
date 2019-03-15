import * as actionTypes from './actionTypes'

import axios from '../../axios'

const setLoading = () => ({
    type: actionTypes.LOADING
})
const setSideData = siteData => ({
    type: actionTypes.SITE_DATA,
    siteData
})
const setHomeItems = items => ({
    type: actionTypes.HOME_ITEMS,
    items
})
const setPortfolioItems = portfolioItems => ({
    type: actionTypes.PORTFOLIO_ITEMS,
    portfolioItems
})
const loadImages = ( data, page, quantity = data.length ) => dispatch => {
    let counter = 0
    const images = []
    data.forEach(( el, i ) => {
        if( i >= quantity ) {
            images[i] = { src: data[i].mainPhoto.url }
        }
        else {
            images[i] = new Image()
            images[i].onload = () => {
                counter++
                if ( counter === quantity ) {
                    const items = data.map(( item, i ) => ({
                        ...item,
                        mainPhoto: { src: images[i].src, alt: item.mainPhoto.alt },
                    }))
                    if( page === 'home' ) dispatch( setHomeItems( items ) )
                    if( page === 'portfolio' ) dispatch( setPortfolioItems( items ) )
                }
            }
            images[i].src = el.mainPhoto.url
        }
    })
}
export const getSiteData = page => ( dispatch, getState ) => {
    dispatch( setLoading() )
    const sourcePageHandler = ( page, data ) => {
        if( page === 'home' ){
            const homeItems = data.filter( el => el.homepage === true ? el : null )
            dispatch( loadImages( homeItems, page ) )
        }
        else if ( page === 'portfolio' ) {
            dispatch( loadImages( data, page, 6 ) )
        }
    }
    if( getState().home.siteData ) {
        sourcePageHandler( page, getState().home.siteData )
    }
    else {
        axios.get('/Projekty?_embed')
            .then( response => {
                const siteData = response.data.map( el => ({ id: el.id, ...el.acf, titlePl: el.acf.titPl }))
                siteData.forEach( el => delete el.titPl)

                dispatch( setSideData( siteData ) )
                sourcePageHandler( page, siteData )
            })
    }
}
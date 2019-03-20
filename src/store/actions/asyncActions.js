import * as actionTypes from './actionTypes'

import axios from 'axios'

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
const setCurrentProject = project => ({
    type: actionTypes.PROJECT,
    project
})
const loadImages = ( data, page, quantity ) => dispatch => {
    let counter = 0
    const images = []
    const elements = page !== 'project' ? data : data.images
    if( !quantity ) quantity = elements.length
    if( quantity === 0 )  dispatch( setCurrentProject( data ) )
    elements.forEach(( el, i ) => {
        if( i >= quantity ) {
            images[i] = { src: data[i].mainPhoto.url, alt: data[i].mainPhoto.alt }
        }
        else {
            images[i] = new Image()
            images[i].onload = () => {
                counter++
                if ( counter === quantity ) {
                    if( page === 'portfolio' || page === 'home' ) {
                        const items = data.map(( item, i ) => ({
                            ...item,
                            mainPhoto: { src: images[i].src, alt: item.mainPhoto.alt },
                        }))
                        if( page === 'home' ) dispatch( setHomeItems( items ) )
                        if( page === 'portfolio' ) dispatch( setPortfolioItems( items ) )
                    }
                    else if( page === 'project' ) {
                        const project = {
                            ...data,
                            images: [...data.images.map(( img, i ) => ({
                                ...data.images[i], src: images[i].src
                            }))]
                        }
                        console.log(project)
                        dispatch( setCurrentProject( project ) )
                    }
                }
            }
            images[i].src = page !== 'project' ? el.mainPhoto.url : el.url 
        }
    })
}
export const getSiteData = ( page, id ) => ( dispatch, getState ) => {
    dispatch( setLoading() )
    const sourcePageHandler = ( page, data ) => {
        if( page === 'home' ){
            const homeItems = data.filter( el => el.homepage === true ? el : null )
            dispatch( loadImages( homeItems, page ) )
        }
        else if ( page === 'portfolio' ) {
            dispatch( loadImages( data, page, 6 ) )
        }
        else if ( page === 'project' ) {
            const currentProject = data.find( el => el.id === id )
            const keys = Object.keys( currentProject )
            const imageKeys = keys.filter( key => key.startsWith('photo') )
            const imagesToLoad = imageKeys.filter( key => currentProject[ key ] !== false )
            const images = imagesToLoad.map( key => currentProject[ key ] )
            imageKeys.forEach( el => delete currentProject[ el ])
            currentProject.images = images
            dispatch( loadImages( currentProject, page ) )
        }
    }
    const siteData = getState().async.siteData
    if( siteData ) {
        sourcePageHandler( page, siteData )
    }
    else {
        axios.get('http://022design.com/wordpress/wp-json/wp/v2/Projekty?_embed')
            .then( response => {
                const siteData = response.data.map( el => ({ 
                                                            id: el.id, 
                                                            ...el.acf, 
                                                            titlePl: el.acf.titPl, 
                                                            link: el.acf.titleEng.replace(/\b\w/g, l => l.toUpperCase()).split(' ').join('') 
                                                        }))
                siteData.forEach( el => delete el.titPl)
                
                dispatch( setSideData( siteData ) )
                sourcePageHandler( page, siteData )
            })
    }
}
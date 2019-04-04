import * as actionTypes from './actionTypes'

//  LANG_ACTION
export const changeLang = lang => ({ type: actionTypes.CHANGE_LANGUAGE, lang })
//  ASYNC_ACTIONS
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
export const clearCurrentProject = () => ({
    type: actionTypes.CLEAR_PROJECT
})
const loadImages = ( data, page, quantity = data.length || data.images.length ) => dispatch => {
    if( quantity === 0 ) { dispatch( setCurrentProject( data ) ); return }
    let elements = data
    if( page === 'project' ) elements = data.images
    let counter = 0
    const images = []
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
                                                                mainPhoto: { ...item.mainPhoto, img: images[i] } }))
                        if( page === 'home' ) dispatch( setHomeItems( items ) )
                        if( page === 'portfolio' ) dispatch( setPortfolioItems( items ) )
                    }
                    else if( page === 'project' ) {
                        const project = {
                            ...data,
                            images: data.images.map(( img, i ) => ({ ...img, img: images[i] }))
                        }
                        dispatch( setCurrentProject( project ) )
                    }
                }
            }
            images[i].src = page !== 'project' ? el.mainPhoto.url : el.url 
        }
    })
}
export const getSiteData = ( page, id ) => ( dispatch, getState ) => {
    const sourcePageHandler = ( data ) => {
        switch( page ) {
            case 'portfolio': 
                dispatch( loadImages( data, page, 6 ) ) 
                break
            case 'project':
                const project = data.find( project => project.id === id )
                dispatch( loadImages( project, page ) )
                break
            default:
                const homeItems = data.filter( el => el.homepage )
                dispatch( loadImages( homeItems, page ) )
        }
    }
    const siteData = getState().async.siteData
    if( siteData ) sourcePageHandler( siteData )
    else {
        fetch('http://022design.com/wordpress/wp-json/wp/v2/Projekty?_embed.per_page=100')
            .then(response => response.json())
            .then( response => {
                const data = response.map( ({ id, acf }) => {
                    const imageKeys = Object.keys( acf ).filter( key => key.startsWith('photo') )
                    const images = imageKeys.map( key => acf[ key ] !== false ? acf[ key ] : null ).filter( _=>_ )

                    const descriptions = { Pl: [], Eng: [] }
                    const descKeys = Object.keys( acf ).filter( desc => desc.includes('Desc')  )
                    descKeys.forEach( key => key.startsWith('pl') ? descriptions.Pl.push( acf[ key ] ) : descriptions.Eng.push( acf[ key ] ) )
                    return { 
                        id, 
                        titleEng: acf.titleEng,
                        titlePl: acf.titPl,
                        mainPhoto: acf.mainPhoto,
                        type: acf.type,
                        homepage: acf.homepage,
                        img360: acf.ph360,
                        link: acf.titleEng.replace(/\b\w/g, l => l.toUpperCase()).split(' ').join(''),
                        images,
                        descriptions
                    }
                })
                dispatch( setSideData( data ) )
                sourcePageHandler( data )
            })
    }
}
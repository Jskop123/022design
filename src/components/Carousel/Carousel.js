import React, { Component } from 'react'
import Swipe from 'react-easy-swipe'

import Spinner from '../Spinner/Spinner'

import styles from './Carousel.module.css'

class Carousel extends Component {
    state = {
        firstLoad: true,
        imagesLoaded: 0,
        currentProject: 0
    }
    scrollInterval = null
    prevTimeStamp = 0
    currentProjectHandler = ( event ) => {
        let current = this.state.currentProject
        if( typeof event === 'object' ){
            const treshold = 50
            const delta = event.timeStamp - this.prevTimeStamp

            this.prevTimeStamp = event.timeStamp
            
            if( delta < treshold )    return
            if( this.scrollInterval ) return
            if( event.deltaY === 0 )  return
            if( event.deltaY > 0 )    current++
            if( event.deltaY < 0 )    current--
        }
        else if ( typeof event === 'string' ) {
            if( event === '+' )      current++
            else if( event === '-' ) current--
        }
        if( current >= this.props.items.length ) current = 0
        if( current < 0 ) current = this.props.items.length - 1

        this.setState({ currentProject: current })
        if (this.props.description) this.projectInfoWinkHandler()
        this.scrollInterval = setTimeout(() => {
            this.scrollInterval = null
        }, 500 )
        return true
    }
    projectInfoWinkHandler = () => {
        this.refs.info.classList.add( styles.wink )
        setTimeout(() => this.refs.info.classList.remove( styles.wink ), 300)
    }
    imagesLoaded = () => {
        this.setState({ imagesLoaded: this.state.imagesLoaded + 1 })
        if( this.state.imagesLoaded === this.props.items.length - 1 ) {
            this.setState({ firstLoad: false })
            this.refs.carousel.classList.remove(styles.hide)
        }
    }
    render(){
        return (
        <>
            <div className={`${styles.hide} ${styles.carousel}`} ref='carousel' onWheel={ this.currentProjectHandler }>
                <Swipe 
                onSwipeUp={() => this.currentProjectHandler( '+' )}
                onSwipeDown={() => this.currentProjectHandler( '-' )} 
                onSwipeLeft={() => this.currentProjectHandler( '+' )}
                onSwipeRight={() => this.currentProjectHandler( '-' )}
                >
                    { this.props.items.map(( el, i ) => {
                        const current = this.state.currentProject
                        const size = this.props.items.length
                        let selector = styles.hide
                        if ( i === current )                            selector = styles.current
                        if ( i === current -1 )                         selector = styles.previous
                        if ( i > current && i < current +4 )            selector = styles[`next${i - current}`]
                        if ( i === size -1 && current === 0 )           selector = styles.previous
                        if ( current >= 3 && size - current + i <= 3 )  selector = styles[`next${size - current + i}`]
            
                        return <div key={ i } 
                                className={ `${styles.tile} ${selector}` } 
                                style={ this.state.firstLoad && selector !== styles.previous ? { zIndex: -i , left: '5%', top: 0 } : null}
                                onClick={ 
                                    selector === styles.next1 || selector === styles.current ? 
                                    () => this.currentProjectHandler( '+' ) : null }
                                >
                                    <img    src={ el.acf.Zdjecie.url }
                                            onLoad={this.imagesLoaded}
                                            alt='jakiś tam alt'/>
                                </div>
                        })
                    }
                    { this.props.description ? 
                        <div className={ styles.projectInfo } ref='info'>
                            <h2>{ this.props.items[ this.state.currentProject ].acf.Tytuł }</h2>
                            <p>{ this.props.items[ this.state.currentProject ].acf.Opis }</p>
                        </div>
                        : null
                    }
                </Swipe>
            </div>
        { this.state.firstLoad ? <Spinner/> : null }
        </>
        )
    }
}
export default Carousel
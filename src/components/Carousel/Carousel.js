import React, { Component } from 'react'
import Swipe from 'react-easy-swipe'

import styles from './Carousel.module.css'

class Carousel extends Component {
    state = {
        firstLoad: true,
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
    render(){
        return (
            <div className={styles.carousel} 
                onWheel={ this.currentProjectHandler }
                onClick={() => this.currentProjectHandler( '+' )} 
                onLoad={() => this.setState({ firstLoad: false }) }
                >
                <Swipe 
                    onSwipeUp={() => this.currentProjectHandler( '+' )}
                    onSwipeDown={() => this.currentProjectHandler( '-' )} 
                    onSwipeLeft={() => this.currentProjectHandler( '+' )}
                    onSwipeRight={() => this.currentProjectHandler( '-' )}
                    >{  this.props.items.map(( el, i ) => {
                            const current = this.state.currentProject
                            const size = this.props.items.length
                            let selector = styles.hide
                            if ( i === current )                            selector = styles.current
                            if ( i === current -1 )                         selector = styles.previous
                            if ( i > current && i < current +4 )            selector = styles[`next${i - current}`]
                            if ( i === size -1 && current === 0 )           selector = styles.previous
                            if ( current >= 3 && size - current + i <= 3 )  selector = styles[`next${size - current + i}`]
                
                            return  <div key={ i } 
                                        className={ `${styles.tile} ${selector}` } 
                                        style={ this.state.firstLoad && selector !== styles.previous ? 
                                                { zIndex: -i , transform: 'translate(-25%, -10%)' } : null 
                                        }>
                                        <img src={ el.image.src } alt='jakiś tam alt' />
                                    </div>
                            })
                    }
                    { this.props.description ? 
                        <div className={ styles.projectInfo } ref='info'>
                            <h2>{ this.props.items[ this.state.currentProject ].title }</h2>
                            <p>{ this.props.items[ this.state.currentProject ].desc }</p>
                        </div>
                        : null
                    }
                </Swipe>
            </div>
        )
    }
}
export default Carousel
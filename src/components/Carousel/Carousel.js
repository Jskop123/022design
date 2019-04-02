import React, { PureComponent } from 'react'
import Swipe from 'react-easy-swipe'

import { debounce } from 'lodash'

import styles from './Carousel.module.css'

export default class Carousel extends PureComponent {
    state = {
        currentProject: 0,
        firstLoad:      true,
    }
    currentProjectHandler = event => {
        let current = this.state.currentProject
        if( event === '+' || event > 0 )    current++
        else                                current--

        if( current >= this.props.items.length ) current = 0
        else if( current < 0 ) current = this.props.items.length - 1
        
        this.setState({ currentProject: current }, 
            this.props.onChange ? () => this.props.onChange( this.state.currentProject ) : null )
    }
    debouncedCurrentProjectHandler = debounce( this.currentProjectHandler, 100, { leading: true, trailing: false } )
    render = () => (
        <Swipe  className={ this.props.animation ? styles.carousel : `${styles.carousel} ${styles.noTransition}`}
                onLoad={() => this.setState({ firstLoad: false }) }
                onClick={() => this.currentProjectHandler( '+' ) } 
                onWheel={ this.props.animation ? ( e ) => this.debouncedCurrentProjectHandler( e.deltaY ) : null }
                onSwipeLeft={() => this.currentProjectHandler( '+' )}
                onSwipeRight={() => this.currentProjectHandler( '-' )} >
            { this.props.items.map(( el, i ) => {
                const current = this.state.currentProject
                const size = this.props.items.length
                let selectors = [ styles.tile ]
                    if( i === current )                                        selectors.push( styles.current )
                    if( i > current && i <= current +3 )                       selectors.push( styles[`next${i - current}`] )

                if( this.props.animation ) {
                    if( current >= 3 && size - current + i <= 3 )              selectors.push( styles[`next${size - current + i}`] )
                    if( i === current -1 || (i === size -1 && current === 0))  selectors.push( styles.previous )
                }
                else {
                    if( size - current + i <= 3 )                              selectors.push( styles[`next${size - current + i}`] )
                }
                return  <div key={ i } 
                            className={ selectors.join(' ') } 
                            style={ this.state.firstLoad && selectors.join(' ') !== `${styles.tile} ${styles.previous}` ? 
                                    { zIndex: -i, transform: 'translate(-25%, -10%)' } : null }>
                            <img src={ el.img.src }
                                    alt={ el.alt } />
                        </div>
            })}
        </Swipe>
    )
}
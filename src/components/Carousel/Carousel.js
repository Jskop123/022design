import React, { Component } from 'react'
import Swipe from 'react-easy-swipe'

import './Carousel.css'

class Carousel extends Component {
    state = { 
        projects: [
            <div className='project red'>1</div>,
            <div className='project blue'>2</div>,
            <div className='project green'>3</div>,
            <div className='project violet'>4</div>,
            <div className='project lime'>5</div>,
            <div className='project yellow'>6</div>,
            <div className='project orange'>7</div>,
            <div className='project white'>8</div>,
            <div className='project black'>9</div>,
            <div className='project brown'>10</div>
        ], 
        currentProject: 0,
        isCapturing: false
    }
    componentDidUpdate( _, prevState ) {
        if( this.state.currentProject !== prevState.currentProject ){
            this.refs.info.classList.add('wink')
            setTimeout(() => this.refs.info.classList.remove('wink'), 300)
        }
    }
    scrollInterval = null
    prevTimeStamp = 0
    currentProjectHandler = ( event, action ) => {
        let current = this.state.currentProject

        if( event ){
            const treshold = 42
            const delta = event.timeStamp - this.prevTimeStamp

            this.prevTimeStamp = event.timeStamp
            
            if( delta < treshold )    return
            if( this.scrollInterval ) return
            if( event.deltaY > 0 )    current++
            if( event.deltaY < 0 )    current--
        }
        else if ( action ) {
            if( action === '+' )      current++
            else if( action === '-' ) current--
        }
        if( current >= this.state.projects.length ) current=0
        if( current < 0 ) current = this.state.projects.length-1
        if( !this.state.isCapturing ) {
            this.setState({ isCapturing: true }, () => {
              this.setState( state => ({ currentProject: current }));
            })
          }
      
        this.scrollInterval = setTimeout(() => {
            this.setState({ isCapturing: false })
            this.scrollInterval = null
        }, 500 )
    }
    render(){
        return (
            <Swipe 
            onSwipeUp={() => this.currentProjectHandler( undefined, '+' )}
            onSwipeLeft={() => this.currentProjectHandler( undefined, '+' )}
            onSwipeRight={() => this.currentProjectHandler( undefined, '-' )}
            onSwipeDown={() => this.currentProjectHandler( undefined, '-' )} >
                <div className='carousel' onWheel={ e => this.currentProjectHandler(e) }>
                    {   this.state.projects.map(( el, i ) => {
                        const current = this.state.currentProject
                        const size = this.state.projects.length
                        let style='hide'
                        if ( i === current )                            style = 'current'
                        if ( i === current -1 )                         style = 'previous'
                        if ( i > current && i < current +4 )            style = `next${ i - current }`
                        if ( i === size -1 && current === 0 )           style = 'previous'
                        if ( current >= 3 && size - current + i <= 3 )  style = `next${ size - current + i }`
            
                        return <div key={ i } className={ `tile ${ style }` } 
                                onClick={ style === 'next1' ? () => this.currentProjectHandler( undefined, '+' ) : null }
                                >{ el }</div>
                        })
                    }
                    <div className='projectInfo' ref='info'>
                        <h2>Tytuł projektu</h2>
                        <p>Dodadkowy opis projektu</p>
                    </div>
                    <div className='scroll'></div>
                </div>
            </Swipe>
        )
    }
} 
export default Carousel
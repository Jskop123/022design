import React, { Component } from 'react'

import Carousel from '../../components/Carousel/Carousel'

class Home extends Component {
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
        ]
    }
    render() {
        return (
            <div className='page'>
                <Carousel items={ this.state.projects } description={ true }/>
            </div>
        ) 
    }
} 
export default Home
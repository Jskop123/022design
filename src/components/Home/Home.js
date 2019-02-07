import React, { Component } from 'react'

import styles from './Home.module.css'

import Carousel from '../UI/Carousel/Carousel'

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
    projectInfoWinkHandler = () => {
        this.refs.info.classList.add( styles.wink )
        setTimeout(() => this.refs.info.classList.remove( styles.wink ), 300)
    }
    render() {
        return(
            <>
                <Carousel items={ this.state.projects } changeItem={ this.projectInfoWinkHandler }/>
                <div className={ styles.projectInfo } ref='info'>
                    <h2>Tytuł projektu</h2>
                    <p>Dodadkowy opis projektu</p>
                </div>
            </>
        )
    }
} 
export default Home
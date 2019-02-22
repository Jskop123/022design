import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import styles from './Offert.module.css'

import room from '../../assets/room.jpg'
import project from '../../assets/project.jpg'
import camera from '../../assets/camera.jpg'

class Offert extends Component {
    render(){
        return(
            <div className={`page ${styles.offer}`}>
                <div className={styles.item}>
                    <div className={styles.graph}>
                        <img src={project} alt='project icon'/>
                    </div>
                    <div className={styles.text}>
                        <h2>{ this.props.text[0].heading }</h2>
                        <p>{ this.props.text[0].content }</p>
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.text}>
                        <h2>{ this.props.text[1].heading }</h2>
                        <p>{ this.props.text[1].content }</p>
                    </div>
                    <div className={styles.graph}>
                        <img src={room} alt='room 3D icon'/>
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.graph}>
                        <img src={camera} alt='camera icon'/>
                    </div>
                    <div className={styles.text}>
                        <h2> { this.props.text[2].heading } </h2>
                        <p>{ this.props.text[2].content }</p>
                    </div>
                </div>
                <Link to='/kontakt'>{ this.props.contactLink }<i className='icon-right-big'/></Link>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    text: state.language.text.offert,
    contactLink: state.language.text.menu[1]
})
export default connect( mapStateToProps )( Offert )
import React, { Component } from 'react'

import styles from './Backdrop.module.css'

class Backdrop extends Component {
    componentDidMount = () => setTimeout(() => this.refs.backdrop.classList.remove( styles.trans ), 50 )
    render(){
        return(
            <div className={ `${styles.backdrop} ${styles.trans}` } ref='backdrop' onClick={ this.props.click }></div>
        )
    }
}
export default Backdrop
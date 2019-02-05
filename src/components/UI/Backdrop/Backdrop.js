import React, { Component } from 'react'

import './Backdrop.css'

class Backdrop extends Component {
    componentDidMount = () => setTimeout(() => this.refs.backdrop.classList.remove('trans'), 50)
    render(){
        return(
            <div className='backdrop trans' ref='backdrop' onClick={ this.props.click }></div>
        )
    }
}
export default Backdrop
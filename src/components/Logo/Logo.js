import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import styles from './Logo.module.css'

class Logo extends Component {
  state = {
    animation: ''
  }
  componentDidMount = () => {
    this.animateLogo()
    if( this.props.spinner ) {
      this.animationInterval = setInterval(() => {
        this.animateLogo()
      }, 1400)
    } 
  }
  componentWillUnmount = () => clearInterval( this.animationInterval )

  componentDidUpdate = prevProps => this.props.location.id !== prevProps.location.id ? this.animateLogo() : null

  animateLogo = () => {
    this.setState({ animation: '' })
    setTimeout(() => {
      this.setState({ animation: styles.active })
    }, 100);
  }
  render = () => (
    <div className={`${styles.logoOuter} ${ this.props.spinner ? styles.spinner : ''} ${this.state.animation}`} >
      <div className={`${styles.logoInner} ${this.state.animation}`} >
        <h1 className={`${styles.logo1t} ${this.state.animation}`} >0</h1>
        <h1 className={`${styles.logo2t} ${this.state.animation}`} >2</h1>
        <h1 className={`${styles.logo3t} ${this.state.animation}`} >2</h1>
        <h1 className={`${styles.logo4t} ${this.state.animation}`} >.</h1>
      </div>
    </div>
  )
}
export default withRouter( Logo )

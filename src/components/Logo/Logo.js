import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import styles from './Logo.module.css'

class Logo extends Component {
  state = { animation: '' }
  componentDidMount = () => {
    this.animateLogo()
    if( this.props.spinner ) {
      this.animationInterval = setInterval(() => {
        this.animateLogo()
      }, 2900 )
    } 
  }
  componentDidUpdate = prevProps => this.props.location.id !== prevProps.location.id ? this.animateLogo() : null
  
  componentWillUnmount = () => {
    clearInterval( this.animationInterval )
    clearTimeout( this.animationTimeout )
  }
  animateLogo = () => {
    this.setState({ animation: '' })
    this.animationTimeout = setTimeout(() => {
      this.setState({ animation: styles.active })
      if( this.props.spinner ) {
        this.animationTimeout = setTimeout(()=> {
          this.setState({ animation: styles.reverse })
        }, 1400)
      }
    }, 100);
  }
  render = () => (
    <div className={`${styles.outer} ${this.state.animation} ${ this.props.spinner ? styles.spinner : ''}`}>
      <div className={styles.inner}>
        <h1 className={styles.logo1t}>0</h1>
        <h1 className={styles.logo2t}>2</h1>
        <h1 className={styles.logo3t}>2</h1>
        <h1 className={styles.logo4t}>.</h1>
      </div>
    </div>
  )
}
export default withRouter( Logo )

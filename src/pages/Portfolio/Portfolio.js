import React, { Component } from 'react'

import styles from './Portfolio.module.css'

class Portfolio extends Component {
    state = {
        filter: null
    }
    render(){
        let navStyle = styles.potrfolioNav
        if( this.state.filter === 'projects' ) navStyle = `${styles.potrfolioNav} ${styles.left}`
        else if( this.state.filter === 'wizualizations' ) navStyle = `${styles.potrfolioNav} ${styles.right}`
        return (
            <div className='page'>
                <nav className={navStyle}>
                    <h2 onClick={() => this.setState({ filter: 'projects' }) }>Realizacje</h2>
                    <h2 onClick={() => this.setState({ filter: 'wizualizations' }) }>Wizualizacje</h2>
                </nav>
            </div>
        )
    }
}
export default Portfolio
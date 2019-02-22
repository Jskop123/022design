import React, { Component } from 'react'
import { connect } from 'react-redux'

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
                    <h2 onClick={() => this.setState({ filter: 'projects' }) }>{ this.props.text[0] }</h2>
                    <h2 onClick={() => this.setState({ filter: 'wizualizations' }) }>{ this.props.text[1] }</h2>
                </nav>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    text: state.language.text.portfolio
})
export default connect( mapStateToProps )( Portfolio )
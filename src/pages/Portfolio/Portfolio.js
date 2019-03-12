import React, { Component } from 'react'
import { connect } from 'react-redux'

import Spinner from '../../components/Spinner/Spinner'

import { getSiteData } from '../../store/actions/initialActions'

import styles from './Portfolio.module.css'

class Portfolio extends Component {
    state = {
        filter: null
    }
    render(){
        if( !this.props.allProjects ) this.props.getSiteData()
        if( this.props.allProjects )         console.log(this.props.allProjects[0].acf['title'+this.props.lang])

        let navStyle = styles.potrfolioNav
        if( this.state.filter === 'projects' ) navStyle = `${styles.potrfolioNav} ${styles.left}`
        else if( this.state.filter === 'vizualizations' ) navStyle = `${styles.potrfolioNav} ${styles.right}`
        return (
            <div className={`page ${styles.portfolio}`}>
                <nav className={navStyle}>
                    <h2 onClick={() => this.setState({ filter: 'projects' }) }>{ this.props.text[0] }</h2>
                    <h2 onClick={() => this.setState({ filter: 'vizualizations' }) }>{ this.props.text[1] }</h2>
                </nav>
                { this.props.allProjects ? 
                    this.props.allProjects.filter( el => { 
                        if( this.state.filter === 'vizualizations' )
                            return el.acf.rel_viz === 'realizacja' ? el : null
                        else if( this.state.filter === 'projects' )
                            return el.acf.rel_viz === 'wizualizacja' ? el : null
                        return el
                        }).map(( el, i ) => {
                        return (
                            <div className={styles.project} key={ el.id }>
                                <img src={ el.acf.photo } alt='jakiś alt'/>
                                <h3>{ el.acf['title'+ this.props.lang ] }</h3>
                            </div>
                        )
                    })  :
                    <Spinner/>
                }
            </div>
        )
    }
}
const mapStateToProps = state => ({
    lang: state.language.lang,
    text: state.language.text.portfolio,
    allProjects: state.home.siteData
})
const mapDispatchToProps = dispatch => ({
    getSiteData: () => dispatch( getSiteData() )
})
export default connect( mapStateToProps, mapDispatchToProps )( Portfolio )
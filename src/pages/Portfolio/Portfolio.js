import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import Spinner from '../../components/Spinner/Spinner'

import { getSiteData } from '../../store/actions/asyncActions'

import styles from './Portfolio.module.css'

class Portfolio extends Component {
    state = {
        filter: null
    }
    componentDidMount() {
        if( !this.props.allProjects ) this.props.getSiteData()
    }
    render(){
        let navStyle = styles.potrfolioNav
        if( this.state.filter === 'rel' ) navStyle = `${styles.potrfolioNav} ${styles.left}`
        else if( this.state.filter === 'viz' ) navStyle = `${styles.potrfolioNav} ${styles.right}`
        return (
            <div className={`page ${styles.portfolio}`}>
                <nav className={navStyle}>
                    <h2 onClick={() => this.setState({ filter: 'rel' }) }>{ this.props.text[0] }</h2>
                    <h2 onClick={() => this.setState({ filter: 'viz' }) }>{ this.props.text[1] }</h2>
                </nav>
                { this.props.allProjects ? 
                    this.props.allProjects.filter( el => { 
                        if( this.state.filter ) return el.type === this.state.filter ? el : null
                        else return el
                        }).map( el => {
                        return (
                            <div className={styles.project} key={ el.id }>
                                <Link to={'/portfolio/projekt/' + el.titleEng.split(' ').join('')}>
                                        <div className={styles.projectImage}>
                                            <img src={ el.mainPhoto } alt='jakiś alt'/>
                                        </div>
                                        <div className={styles.projectBackground}/>
                                        <h3>{ el['title'+ this.props.lang ] }</h3>
                                </Link>
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
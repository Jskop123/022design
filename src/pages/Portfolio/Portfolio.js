import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import Logo from '../../components/Logo/Logo'
import ContactData from '../../components/ContactData/ContactData'

import { getSiteData } from '../../store/actions/actions'

import styles from './Portfolio.module.css'

class Portfolio extends Component {
    state = { 
        typeFilter: null,
        vizFilter: null
    }
    componentDidMount = () => {
        if( !this.props.portfolioItems.length ) this.props.getSiteData('portfolio')
    }
    changeFilter = ( filter, tier ) => {
        this.refs.portfolio.classList.add(styles.hide)
        setTimeout(() => this.setState( tier === 'main' ?
            { typeFilter: filter, vizFilter: null } : { vizFilter: filter },
            () => {
                this.refs.portfolio.scrollTop = 0
                this.refs.portfolio.classList.remove(styles.hide)})
        , 200)
    }
    render = () => {
        let mainNav = styles.mainNav
        if( this.state.typeFilter === 'rel' ) mainNav = `${styles.mainNav} ${styles.left}`
        else if( this.state.typeFilter === 'viz' ) mainNav = `${styles.mainNav} ${styles.right}`
        let subNav = styles.subNav
        if( this.state.vizFilter === '2d' ) subNav = `${styles.subNav} ${styles.left}`
        else if( this.state.vizFilter === '3d' ) subNav = `${styles.subNav} ${styles.right}`
        return (<>
            <div className={styles.filters}>
                <nav className={mainNav}>
                    <h2 onClick={() => this.changeFilter('rel', 'main') }>{ this.props.text[0] }</h2>
                    <h2 onClick={() => this.changeFilter('viz', 'main') }>{ this.props.text[1] }</h2>
                </nav>
                { this.state.typeFilter === 'viz' ?
                    <nav className={subNav}>
                        <h2 onClick={() => this.changeFilter('2d', 'sub') }>{ this.props.text[2] }</h2>
                        <h2 onClick={() => this.changeFilter('3d', 'sub') }>360</h2>
                    </nav>
                    : null
                }
            </div>
            <div className={`page ${styles.portfolio}`} ref='portfolio'>
                { this.props.portfolioItems.length ? <>
                    {this.props.portfolioItems
                    .filter( el => { 
                        if( this.state.typeFilter ) return el.type === this.state.typeFilter ? el : null
                        else return el
                    }).filter( el => {
                        if( this.state.vizFilter === '3d' ) return el.img360 ? el : null
                        else if( this.state.vizFilter === '2d' ) return !el.img360 ? el : null
                        else return el
                    }).map( el => {
                        return (
                            <div className={styles.project} key={ el.id }>
                                <Link to={{
                                    pathname:`/portfolio/${this.props.lang === 'Pl' ? 'projekt/' : 'project/'}${el.link}`,
                                    id: el.id }}>
                                        <div className={styles.projectImage}>
                                            <img src={ el.mainPhoto.img.src } alt={ el.mainPhoto.alt }/>
                                        </div>
                                        <div className={styles.projectBackground}/>
                                        <h3>{ el['title'+ this.props.lang ] }</h3>
                                </Link>
                            </div>
                        )
                    })}</>
                    :
                    <Logo spinner/>
                }
            </div>
        </>)
    }
}
const mapStateToProps = state => ({
    lang: state.language.lang,
    text: state.language.text.portfolio,
    portfolioItems: state.async.portfolioItems
})
const mapDispatchToProps = {
    getSiteData: () => getSiteData('portfolio')
}
export default connect( mapStateToProps, mapDispatchToProps )( Portfolio )
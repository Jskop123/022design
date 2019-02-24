import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'

import styles from './Menu.module.css'

import { changeLang } from '../../../store/actions/langAction'

class Menu extends Component {
    componentDidUpdate(prevProps) {
        if( this.props.lang !== prevProps.lang ){
            this.props.history.push({
                pathname: this.props.routes[ this.props.history.location.id ],
                id: this.props.history.location.id
            })
        }
    }
    render(){
        return(
            <nav className={ this.props.active ? `${styles.menu} ${styles.showMenu}` : styles.menu }>
                <ul>
                    <li>
                        <NavLink to='/' exact onClick={() => this.props.showMenu( 'close' )}> Home </NavLink>
                    </li>
                    <li>
                        <NavLink to={{
                                pathname: this.props.routes.services,
                                id: 'services'
                            }} 
                        onClick={() => this.props.showMenu( 'close' )}>{ this.props.text[0] }</NavLink>
                    </li>
                    <li>
                        <NavLink to='/portfolio' onClick={() => this.props.showMenu( 'close' )}> Portfolio </NavLink>
                    </li>
                    <li>
                        <NavLink to={{
                                pathname: this.props.routes.contact,
                                id: 'contact'
                            }}  
                        onClick={() => this.props.showMenu( 'close' )}>{ this.props.text[1] }</NavLink>
                    </li>
                    <li className={ this.props.lang === 'Pl' ? styles.lang : `${styles.lang} ${styles.langToggle}` }
                        onClick={() => this.props.changeLang( this.props.lang )}
                    >PL &nbsp;/&nbsp; EN</li>
                </ul>
            </nav>
        )
    }
}
const mapStateToProps = state => ({
    lang: state.language.lang,
    text: state.language.text.menu,
    routes: state.language.text.routes
})
const mapDispatchToProps = dispatch => ({
    changeLang: lang => dispatch( changeLang( lang ))
})
export default withRouter( connect( mapStateToProps, mapDispatchToProps )( Menu ))
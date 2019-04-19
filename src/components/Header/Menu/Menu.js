import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'

import styles from './Menu.module.css'

import { changeLang } from '../../../store/actions/actions'

class Menu extends PureComponent {
    componentDidUpdate = ( prevProps ) => {
        if( this.props.lang !== prevProps.lang ){
            this.props.history.replace({
                pathname: this.props.routes[ this.props.history.location.id ],
                id: this.props.history.location.id
            })
        }
    }
    render = () => (
        <nav className={ this.props.active ? `${styles.menu} ${styles.showMenu}` : styles.menu }>
            <ul>
                { Object.values( this.props.routes ).map(( route, i ) => (
                    <li key={ route }>
                        <NavLink to={{
                                pathname: route,
                                id: Object.keys( this.props.routes )[ i ]
                            }}
                            onClick={ this.props.closeMenu }
                            exact
                        >{ route === '/' ? 'home' : route.slice(1) }</NavLink>
                    </li>
                ))}
                <li className={ this.props.lang === 'Pl' ? styles.lang : `${styles.lang} ${styles.langToggle}` }
                    onClick={() => this.props.changeLang( this.props.lang === 'Pl' ? 'Eng' : 'Pl' )}
                >PL &nbsp;/&nbsp; EN</li>
            </ul>
        </nav>
    )
}
const mapStateToProps = state => ({
    lang: state.language.lang,
    routes: state.language.text.routes
})
const mapDispatchToProps = {
    changeLang: lang => changeLang( lang )
}
export default withRouter( connect( mapStateToProps, mapDispatchToProps )( Menu ))
import React from 'react'

import styles from './Header.module.css'

import Menu from './Menu/Menu'
import Backdrop from '../Backdrop/Backdrop'

const Header = ( props ) => (
    <>
        <header>
            <div className={styles.logo}>022design</div>
            <div onClick={() => props.burger( 'toggle' )} 
                className={ props.active ? `${styles.burgerIcon} ${styles.active}` : `${styles.burgerIcon}` }>
                    <div className={styles.bar}></div>
                    <div className={styles.bar}></div>
                    <div className={styles.bar}></div>
            </div>
            <Menu active={ props.active } showMenu={ props.burger }/>
        </header>
        { props.active ? <Backdrop click={ props.burger } /> : null }
    </>
)
export default Header
import React from 'react';

import styles from './Header.module.css'

import Menu from './Menu/Menu'

const Header = ( props ) => (
    <header>
        <div className={styles.logo}>022design</div>
        <div className={ props.active ? `${styles.burgerIcon} ${styles.active}` : `${styles.burgerIcon}` } onClick={ props.showMenu }>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
        </div>
        <Menu active={ props.active }/>
    </header>
)
export default Header
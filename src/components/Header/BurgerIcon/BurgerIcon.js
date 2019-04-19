import React from 'react'

import styles from './BurgerIcon.module.css'

const BurgerIcon = props => (
    <div onClick={ props.click } 
    className={ props.showMenu ? `${styles.burgerIcon} ${styles.active}` : `${styles.burgerIcon}` }>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
    </div>
)
export default BurgerIcon
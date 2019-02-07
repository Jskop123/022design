import React from 'react'

import styles from './Backdrop.module.css'

const Backdrop = props => (
    <div 
        className={ props.active ? `${styles.backdrop}` : `${styles.backdrop} ${styles.trans}` } 
        onClick={ props.click }>
    </div>
)
export default Backdrop
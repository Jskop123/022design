import React from 'react'

import styles from './Backdrop.module.css'

const Backdrop = props => (
    <div 
        className={ props.active ? `${styles.backdrop}` : `${styles.backdrop} ${styles.exit}` } 
        onClick={ props.click }>
    </div>
)
export default Backdrop
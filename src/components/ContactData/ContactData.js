import React from 'react'

import styles from './ContactData.module.css'

const ContactData = props => {
    return (
        <div className={ props.fullSize ? styles.data : `${styles.data} ${styles.simpleData}` }>
                <a className={ props.fullSize ? styles.mail_phone : null } href='tel:321654876'>
                    <i className={`icon-phone`}/>
                    { props.fullSize || window.innerWidth >= 800 ? <span>+48&nbsp; 737 427 188</span> : null }
                </a>
                <a className={ props.fullSize ? styles.mail_phone : null } href='mailto:biuro@022design.com'>
                    <i className={`icon-mail`}/>
                    { props.fullSize || window.innerWidth >= 800 ? <span>biuro@022design.com</span> : null }
                </a>
                <a href='https://www.instagram.com/022design/' target='_blank' rel="noopener noreferrer">
                    <i className='icon-instagram'/>
                    { props.fullSize ? <span className={styles.location}>Instagram</span> : null }
                </a>
                <a href='https://www.facebook.com/' target='_blank' rel="noopener noreferrer">
                    <i className="icon-facebook-official"/>
                    { props.fullSize ? <span className={styles.location}>Facebook</span> : null }
                </a>
                { props.fullSize ?
                <div>
                    <i className='icon-location'/>
                     <span className={styles.location}>{ props.lang === 'Pl' ? 'Warszawa' : 'Warsaw' }</span>
                </div>
                : null }
        </div>
        )
    }
export default ContactData
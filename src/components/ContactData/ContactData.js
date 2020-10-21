import React from 'react'

import styles from './ContactData.module.css'

const ContactData = props => (
    <div className={ props.fullSize ? styles.data : `${styles.data} ${styles.simpleData}` }>
            <a className={ props.fullSize ? styles.mail_phone : null } href='tel:+48737427188'>
                <i className={`icon-call`}/>
                { props.fullSize || window.innerWidth >= 768 ? <span>+48&nbsp;&nbsp;737&nbsp;427&nbsp;188</span> : null }
            </a>
            <a className={ props.fullSize ? styles.mail_phone : null } href='mailto:biuro@022design.com'>
                <i className={`icon-email`}/>
                { props.fullSize || window.innerWidth >= 768 ? <span>biuro@022design.com</span> : null }
            </a>
            <a href='https://www.instagram.com/022design/' target='_blank' rel="noopener noreferrer">
                <i className='icon-instagram-filled'/>
                { props.fullSize ? <span className={styles.location}>Instagram</span> : null }
            </a>
            <a href='https://www.facebook.com/022-design-109127377164560' target='_blank' rel="noopener noreferrer">
                <i className="icon-facebook"/>
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
export default ContactData
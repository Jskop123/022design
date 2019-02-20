import React from 'react'

import styles from './Contact.module.css'

const Contact = () => {
    return (
        <div className={`page ${styles.contact}`}>
            <div className={styles.data}>
                <h2>Dane kontaktowe</h2>
                <a className={styles.mail_phone} href='tel:321654876'>
                    <i className={`icon-phone`}/>
                    +48&nbsp; 737 427 188
                </a>
                <a className={styles.mail_phone} href='mailto:biuro@022design.com'>
                    <i className={`icon-mail`}/>
                    biuro@022design.com
                </a>
                <a href='https://www.instagram.com/022design/' target='_blank' rel="noopener noreferrer">
                    <i className='icon-instagram'/>
                    <span className={styles.location}>Instagram</span>
                </a>
                <a href='https://www.facebook.com/' target='_blank' rel="noopener noreferrer">
                    <i className="icon-facebook-official"/>
                    <span className={styles.location}>Facebook</span>
                </a>
                <div>
                    <i className='icon-location'/>
                    <span className={styles.location}>Warszawa</span>
                </div>
            </div>
            <form className={styles.form}>
                <h2>Formularz kontaktowy</h2>
                <label htmlFor='name'>Twoje Imie i Nazwisko</label>
                <input type='text' id='name' placeholder='np. Jan Kowalski'></input>
                <label htmlFor='email'>Twój adres email</label>
                <input type='email' id='email' placeholder='np. example@example.com' ></input>
                <label htmlFor='telephone'>Twój numer telefonu</label>
                <input type='number' id='telephone' placeholder='np. 510532011'></input>
                <label htmlFor='service'>Usługa</label>
                <select id='service' defaultValue='init'>
                    <option value="init" disabled>Wybierz rodzaj usługi</option>
                    <option value='Pełny projekt'>Pełny projekt</option>
                    <option value='Wizualizacja'>Wizualizacja</option>
                    <option value='Zdjęcia'>Zdjęcia</option>
                    <option value='Inne'>Inne</option>
                </select>
                <label htmlFor='comment'>Komentarz</label>
                <textarea id='comment' placeholder='Dodatkowe informacje'></textarea>
                <input type='submit'/>
            </form>
        </div>
    )
}
export default Contact
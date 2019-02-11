import React from 'react'

import styles from './Contact.module.css'

const Contact = () => {
    return (
        <div className={`page ${styles.contact}`}>
            <div className={styles.form}>
                <form>
                <label htmlFor='name'>Twoje Imie i Nazwisko</label>
                <input type='text' id='name' placeholder='np. Jan Kowalski'></input>
                <label htmlFor='email'>Twój adres email</label>
                <input type='email' id='email' placeholder='np. example@example.com' ></input>
                <label htmlFor='telephone'>Twój numer telefonu</label>
                <input type='number' id='telephone' placeholder='np. 510532011'></input>
                <label htmlFor='service'>Usługa</label>
                <select id='service' value='Pełny projekt'>
                    <option value='Pełny projekt'>Pełny projekt</option>
                    <option value='Wizualizacja'>Wizualizacja</option>
                    <option value='Zdjęcia'>Zdjęcia</option>
                    <option value='Inne'>Inne</option>
                </select>

                <label htmlFor='surface'>Powierzchnia</label>
                <input type='surface' placeholder='np. 10m x 10m'></input>
                <label htmlFor='comment'>Komentarz</label>
                <textarea id='comment' placeholder='Dodatkowe informacje'></textarea>
                <input type='submit'/>
                </form>
            </div>
            <div className={styles.data}>data</div>
        </div>
    )
}
export default Contact
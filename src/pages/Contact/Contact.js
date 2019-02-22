import React, { Component } from 'react'
import { connect } from 'react-redux'

import styles from './Contact.module.css'

class Contact extends Component {
    render(){
        return (
            <div className={`page ${styles.contact}`}>
                <div className={styles.data}>
                    <h2>{ this.props.text.contactData[0] }</h2>
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
                        <span className={styles.location}>{ this.props.text.contactData[1] }</span>
                    </div>
                </div>
                <form className={styles.form}>
                    <h2>{ this.props.text.form[0] }</h2>
                    <label htmlFor='name'>{ this.props.text.form[1] }</label>
                    <input type='text' id='name' placeholder='Jan Kowalski'></input>
                    <label htmlFor='email'>{ this.props.text.form[2] }</label>
                    <input type='email' id='email' placeholder='example@example.com' ></input>
                    <label htmlFor='telephone'>{ this.props.text.form[3] }</label>
                    <input type='number' id='telephone' placeholder='510532011'></input>
                    <label htmlFor='service'>{ this.props.text.form[4] }</label>
                    <select id='service' defaultValue='init'>
                        <option value="init" disabled>{ this.props.text.form[5][0] }</option>
                        <option value='fullProject'>{ this.props.text.form[5][1] }</option>
                        <option value='visualization'>{ this.props.text.form[5][2] }</option>
                        <option value='photos'>{ this.props.text.form[5][3] }</option>
                        <option value='others'>{ this.props.text.form[5][4] }</option>
                    </select>
                    <label htmlFor='comment'>{ this.props.text.form[6][0] }</label>
                    <textarea id='comment' placeholder={ this.props.text.form[6][1] }></textarea>
                    <button className={styles.submit}>{ this.props.text.form[7] }</button>
                </form>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    text: state.language.text.contact
})
export default connect( mapStateToProps )( Contact )
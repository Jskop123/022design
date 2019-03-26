import React, { Component } from 'react'
import { connect } from 'react-redux'

import ContactData from '../../components/ContactData/ContactData'

import styles from './Contact.module.css'

class Contact extends Component {
    render(){
        return (
            <div className={`page ${styles.contact}`}>
                <ContactData lang={this.props.lang} fullSize/>
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
                        <option value='partProject'>{ this.props.text.form[5][2] }</option>
                        <option value='visualization'>{ this.props.text.form[5][3] }</option>
                        <option value='photos'>{ this.props.text.form[5][4] }</option>
                        <option value='others'>{ this.props.text.form[5][5] }</option>
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
    text: state.language.text.contact,
    lang: state.language.lang
})
export default connect( mapStateToProps )( Contact )
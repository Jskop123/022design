import React, { Component } from 'react'
import { connect } from 'react-redux'
import { debounce } from 'lodash'

import ContactData from '../../components/ContactData/ContactData'

import styles from './Contact.module.css'

class Contact extends Component {
    state = {
        name: '',
        email: '',
        tel: '',
        service: 'init',
        comment: ''
    }
    handleChange = ( event ) => {
        this.setState({ [event.target.id]: event.target.value })
        this.validate(event.target.id)
    }
    validate = debounce( ( id ) => {
        switch( id ) {
            case 'name': 
                this.state[id].length > 3 ? console.log('NAME_VALID') : console.log('NAME_ERR')
                break
            case 'email': 
                let regMail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
                regMail.test(this.state[id].toLowerCase()) ? console.log('EMAIL_VALID') : console.log('EMAIL_ERR')
                break
            case 'tel':
                this.state[id].length >= 9 ? console.log('TEL VALID') : console.log('TEL_ERR')
                break
            case 'service': 
                this.state[id] !== 'init' ? console.log('SERVICE VALID') : console.log('SERVICE_ERR')
                break
            default:
        }
    },  600,    { leading: false, trailing: true } )
    postFormHandler = (e) => {
        fetch("https://022design.com/mail/index.php", {
            method: "post",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify( this.state )
        })
        .then(res => res.json())
    }
    render = () => (
        <div className={`page ${styles.contact}`}>
            <ContactData lang={this.props.lang} fullSize/>
            <form className={styles.form}>
                <h2>{ this.props.text.form[0] }</h2>

                <label htmlFor='name'>{ this.props.text.form[1] }</label>
                <input type='text' id='name' onChange={ e => this.handleChange( e, 'name' )} placeholder='Jan Kowalski'></input>

                <label htmlFor='email'>{ this.props.text.form[2] }</label>
                <input type='email' id='email' onChange={ e => this.handleChange( e, 'email' )} placeholder='example@example.com' ></input>

                <label htmlFor='tel'>{ this.props.text.form[3] }</label>
                <input type='number' id='tel' onChange={ e => this.handleChange( e, 'tel' )} placeholder='737 427 188'></input>

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
                <textarea id='comment' onChange={ e => this.handleChange( e, 'comment' )} placeholder={ this.props.text.form[6][1] }></textarea>

                <button className={styles.submit} onClick={ this.postFormHandler } >{ this.props.text.form[7] }</button>
            </form>
        </div>
    )
}
const mapStateToProps = state => ({
    text: state.language.text.contact,
    lang: state.language.lang
})
export default connect( mapStateToProps )( Contact )
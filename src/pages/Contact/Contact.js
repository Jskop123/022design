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
        comment: '',
        errors: Array(6).fill(),
        description: ''
    }
    handleChange = event => {
        this.setState({ [event.target.id]: event.target.value })
        this.debouncedValidate(event.target.id)
    }
    validate =  id => {
        const errors = this.state.errors
        switch( id ) {
            case 'name': 
                errors[0] = this.state[id].length < 3
                break
            case 'email': 
                let regMail = /^\w.+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
                errors[1] = !regMail.test(this.state[id].toLowerCase())
                break
            case 'tel':
                errors[2] = this.state[id].length < 9
                break
            case 'service': 
                errors[3] = this.state[id] === 'init'
                break
            default:
        }
        this.setState({ errors })
    }
    debouncedValidate = debounce( this.validate,  600,    { leading: false, trailing: true } )
    postFormHandler = () => {
        let { errors, ...message } = this.state
        Object.keys( message ).forEach( key => this.validate(key))
        if( errors.every( el => el === false )){
            fetch("https://022design.com/mail/index.php", {
                method: "post",
                headers: { 
                    "Accept": "application/json, text/plain, */*",
                    "Content-type": "application/json; charset=UTF-8" },
                body: JSON.stringify( message )
            })
            .then(res => res.json())
            .then(()=>{
                this.setState({
                    name: '',
                    email: '',
                    tel: '',
                    service: 'init',
                    comment: '',
                    errors: Array(6).fill().map((_, i) => i === 4 )
                })
            })
            .catch(() => {
                this.setState({ errors: Array(6).fill().map((_, i) => i === 5 )})
            })
        }
    }
    componentDidMount(){
        fetch("https://022design.com/wordpress/wp-json/wp/v2/kontakt")
        .then(res => res.json())
        .then(data => this.setState({
            description: data[0].acf
        }))
    }
    
    render = () => {    
        const data = this.state.description
        return (
        <div className={`page ${styles.contact}`}>
            <div className={styles.aboutMe}>
                <img src={data.zdjecie_kontakt} alt="avatar" />
                {this.props.lang === 'Pl' ? 
                    <div className={styles.aboutMe_desc}>
                        <p>{data.akapit_1_pl}</p>
                        <p>{data.akapit_2_pl}</p>
                        <p>{data.akapit_3_pl}</p>
                        <p>{data.akapit_4_pl}</p>
                        <p>{data.akapit_5_pl}</p>
                    </div>
                :
                    <div className={styles.aboutMe_desc}>
                        <p>{data.akapit_1_eng}</p>
                        <p>{data.akapit_2_eng}</p>
                        <p>{data.akapit_3_eng}</p>
                        <p>{data.akapit_4_eng}</p>
                        <p>{data.akapit_5_eng}</p>
                    </div>
                }
                    
            </div>
            
            
            <div className={styles.aboutMe_contactData}>
                <ContactData lang={this.props.lang} />
            </div>
        </div>
    )}
}
const mapStateToProps = state => ({
    text: state.language.text.contact,
    lang: state.language.lang
})
export default connect( mapStateToProps )( Contact )

/*
    <form className={styles.form}>
                <h2>{ this.props.text.form[0] }</h2>

                <label htmlFor='name'>{ this.props.text.form[1] }</label>
                <input type='text' id='name' value={this.state.name} onChange={ e => this.handleChange( e )} placeholder='Jan Kowalski'/>

                <label htmlFor='email'>{ this.props.text.form[2] }</label>
                <input type='email' id='email' value={this.state.email} onChange={ e => this.handleChange( e )} placeholder='example@example.com' />

                <label htmlFor='tel'>{ this.props.text.form[3] }</label>
                <input type='number' id='tel' value={this.state.tel} onChange={ e => this.handleChange( e )} placeholder='737 427 188'/>

                <label htmlFor='service'>{ this.props.text.form[4] }</label>
                <select id='service' value={this.state.service} onChange={ e => this.handleChange( e )}>
                    <option value="init" disabled>{ this.props.text.form[5][0] }</option>
                    <option value='fullProject'>{ this.props.text.form[5][1] }</option>
                    <option value='partProject'>{ this.props.text.form[5][2] }</option>
                    <option value='visualization'>{ this.props.text.form[5][3] }</option>
                    <option value='photos'>{ this.props.text.form[5][4] }</option>
                    <option value='others'>{ this.props.text.form[5][5] }</option>
                </select>
                
                <label htmlFor='comment'>{ this.props.text.form[6][0] }</label>
                <textarea id='comment' value={this.state.comment} onChange={ e => this.handleChange( e )} placeholder={ this.props.text.form[6][1] }/>

                <input type='submit' 
                        className={styles.submit} 
                        value={ this.props.text.form[7] }
                        onClick={ e => {
                            e.preventDefault()
                            this.postFormHandler()
                        }}/>
                <ul className={styles.errorList}>
                    { this.props.text.errors.map((err, i) => 
                        this.state.errors[i] 
                        ? <li key={i} className={ i === 4 ? styles.success : null }>{err}</li> 
                        : null ) }
                </ul>
            </form>
*/
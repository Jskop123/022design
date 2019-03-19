import React, { Component } from 'react'
import { connect } from 'react-redux'

import styles from './Project.module.css'

class Project extends Component {
    state = { ...this.props.siteData.find( el => el.id === this.props.location.id )}
    render(){
        console.log(this.state )
        return(
            <div className='page'>
                 <img src={ this.state.mainPhoto.url } alt={ this.state.mainPhoto.alt } className={styles.mainPhoto}/>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    siteData: state.async.siteData
})
const mapDispatchToProps = dispatch => ({
    
})
export default connect( mapStateToProps, mapDispatchToProps )( Project )
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getSiteData } from '../../store/actions/asyncActions'

import Spinner from '../../components/Spinner/Spinner'
import ContacData from '../../components/ContactData/ContactData'

import styles from './Project.module.css'

class Project extends Component {
    state = { ...this.props.currentProject }
    componentDidMount = () => {
        if( this.props.location.id !== this.state.id )  this.props.getSiteData( this.props.location.id )
        else if( !this.props.location.id )              this.props.history.goBack()
    }
    componentDidUpdate = ( prevProps ) => {
        if( prevProps.currentProject.id !== this.props.currentProject.id ) this.setState({ ...this.props.currentProject })
    }
    render(){
        return(
            <div className={`page ${styles.project}`}>
                { this.state.id && !this.props.loading ? 
                    <>
                        <img className={styles.mainPhoto} src={ this.state.mainPhoto.url } alt={ this.state.mainPhoto.alt } />
                        { this.state.images.map( image => <img key={image.title} className={styles.mainPhoto} src={ image.img.src } alt={ image.alt }/> )}
                    </>
                    :
                    <Spinner/>
                }
                <ContacData/>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    loading: state.async.loading,
    currentProject: state.async.currentProject
})
const mapDispatchToProps = dispatch => ({
    getSiteData: ( id ) => dispatch( getSiteData( 'project', id ) )
})
export default connect( mapStateToProps, mapDispatchToProps )( Project )
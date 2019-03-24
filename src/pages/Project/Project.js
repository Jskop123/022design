import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getSiteData } from '../../store/actions/asyncActions'

import Carousel from '../../components/Carousel/Carousel'
import Spinner from '../../components/Spinner/Spinner'
import ContacData from '../../components/ContactData/ContactData'

import styles from './Project.module.css'

class Project extends Component {
    state = {}
    componentDidMount = () => {
        if( this.props.location.id !== this.state.id )  this.props.getSiteData( this.props.location.id )
        else if( !this.props.location.id )              this.props.history.goBack()
    }
    componentDidUpdate = ( prevProps ) => {
        if( prevProps.currentProject.id !== this.props.currentProject.id ){
            const groupImages = { horizontal: [], vertical: [] }
            this.props.currentProject.images.forEach( image => image.img.width > image.img.height ? 
                groupImages.horizontal.push( image ) : groupImages.vertical.push( image ) )
            this.setState({ ...this.props.currentProject, images: groupImages })
        }
    }
    render(){
        return(
            <div className={`page ${styles.project}`}>
                { this.state.id && !this.props.loading ? 
                    <>
                        <div className={styles.mainPhoto}>
                            <img src={ this.state.mainPhoto.url } alt={ this.state.mainPhoto.alt } />
                        </div>
                        <p className={styles.paragraph}>{this.state.descriptions[this.props.lang][0]}</p>
                        <div className={styles.verticalCarousel}>
                            <Carousel items={ this.state.images.vertical }/>
                        </div>
                        <ContacData/>
                    </>
                    :
                    <Spinner/>
                }
            </div>
        )
    }
}
const mapStateToProps = state => ({
    loading: state.async.loading,
    currentProject: state.async.currentProject,
    lang: state.language.lang
})
const mapDispatchToProps = dispatch => ({
    getSiteData: ( id ) => dispatch( getSiteData( 'project', id ) )
})
export default connect( mapStateToProps, mapDispatchToProps )( Project )
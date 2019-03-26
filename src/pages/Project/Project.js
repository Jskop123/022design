import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getSiteData, clearCurrentProject } from '../../store/actions/asyncActions'

import Carousel from '../../components/Carousel/Carousel'
import Spinner from '../../components/Spinner/Spinner'
import ContacData from '../../components/ContactData/ContactData'

import styles from './Project.module.css'

class Project extends Component {
    state = {
        loading: true
    }
    componentDidMount = () => {
        if( this.props.location.id ) this.props.getSiteData( this.props.location.id )
        else                         this.props.history.goBack()
    }
    componentDidUpdate = ( prevProps ) => {
        if( prevProps.currentProject.id !== this.props.currentProject.id ){
            const groupImages = { horizontal: [], vertical: [] }
            this.props.currentProject.images.forEach( image => image.img.width > image.img.height ? 
                groupImages.horizontal.push( image ) : groupImages.vertical.push( image ) )
            this.setState({ loading: false, ...this.props.currentProject, images: groupImages })
        }
    }
    componentWillUnmount = () => {
        this.props.clearCurrentProject()
    }
    render = () => {
        return(
            <div className={`page ${styles.project}`}>
                { !this.state.loading ? 
                    <>
                        <div className={styles.w100}>
                            <img src={ this.state.mainPhoto.url } alt={ this.state.mainPhoto.alt } />
                            <div className={styles.title}>{ this.state[ 'title' + this.props.lang ] }</div>
                        </div>
                        <p className={styles.paragraph}>{this.state.descriptions[this.props.lang][0]}</p>
                        { this.state.images.vertical.length ?
                            ( this.state.images.vertical.length > 1 ? 
                                <div className={styles.verticalCarousel}>
                                    <Carousel items={ this.state.images.vertical }/>
                                </div>
                                :
                                <div className={styles.h100}>
                                    <img src={ this.state.images.vertical[0].url } alt={ this.state.images.vertical[0].alt } />
                                </div> )
                            :null
                        }
                        { this.state.descriptions[ this.props.lang ][1] ?
                            <p className={styles.paragraph}>{this.state.descriptions[this.props.lang][1]}</p>
                            : null
                        }
                        { this.state.images.horizontal.length ?
                            ( this.state.images.horizontal.length > 1 ? 
                                <div className={styles.horizontalCarousel}>
                                    <Carousel items={ this.state.images.horizontal }/>
                                </div>
                                :
                                <div className={styles.w100}>
                                    <img src={ this.state.images.horizontal[0].url } alt={ this.state.images.horizontal[0].alt } />
                                </div> )
                            :null
                        }
                        { this.state.descriptions[ this.props.lang ][2] ?
                            <p className={styles.paragraph}>{this.state.descriptions[this.props.lang][2]}</p>
                            : null
                        }
                        { this.state.img360 ? 
                            <div>{ this.state.img360 }</div> 
                            : null
                        }
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
    currentProject: state.async.currentProject,
    lang: state.language.lang
})
const mapDispatchToProps = dispatch => ({
    getSiteData: ( id ) => dispatch( getSiteData( 'project', id ) ),
    clearCurrentProject: () => dispatch( clearCurrentProject() )
})
export default connect( mapStateToProps, mapDispatchToProps )( Project )
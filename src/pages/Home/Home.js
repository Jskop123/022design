import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getSiteData } from '../../store/actions/asyncActions'

import Carousel from '../../components/Carousel/Carousel'
import Spinner from '../../components/Spinner/Spinner'

import styles from './Home.module.css'

class Home extends PureComponent {
    state = { }
    setInitialState = () => {
        this.setState({
            currentProject: 0,
            title:          this.props.items[ 0 ][ 'title' + this.props.lang ],
            link:           this.props.items[ 0 ].link,
            projectId:      this.props.items[ 0 ].id
        })
    }
    componentDidMount = () => {
        if( !this.props.items.length ) this.props.getSiteData()
        else this.setInitialState()
    }
    componentDidUpdate = ({ lang, items }) => {
        if ( this.props.lang !== lang ) this.setState({ title: this.props.items[ this.state.currentProject ][ 'title' + this.props.lang ] })
        if( this.props.items !== items ) this.setInitialState()
    }
    componentWillUnmount = () => {
        clearTimeout( this.winkTimeout )
    }
    carouselHandler = currentProject => {
        clearTimeout( this.winkTimeout )
        this.refs.info.classList.add( styles.wink )
        this.winkTimeout = setTimeout(() => {
            this.setState(() => ({
                currentProject,
                title: this.props.items[ currentProject ][ 'title'+this.props.lang ], 
                link: this.props.items[ currentProject ].link,
                projectId: this.props.items[ currentProject ].id
            }), () => this.refs.info.classList.remove( styles.wink ))
        }, 650 )
    }
    render = () => (
        <div className='page'>
            { this.props.items.length ? 
                <>
                    <Carousel 
                        items={ this.props.items.map( el => el.mainPhoto ) } 
                        onChange={ this.carouselHandler }  animation />
                    <Link to={{
                        pathname:`/portfolio/${this.props.lang === 'Pl' ? 'projekt/' : 'project/'}${this.state.link}`,
                        id: this.state.projectId }}>
                        <div className={ styles.projectInfo } ref='info'>
                            <h2>{ this.state.title }</h2>
                            <p>{ this.props.lang === 'Pl' ? 'Zobacz więcej' : 'See more' } <i className='icon-right-small'/></p>
                        </div>
                    </Link>
                </>
                :
                <Spinner/> 
            }
        </div>
    ) 
}
const mapStateToProps = state => ({
    loading: state.async.loading,
    items: state.async.carouselItems,
    lang: state.language.lang
})
const mapDispatchToProps = dispatch => ({
    getSiteData: () => dispatch( getSiteData('home') )
})
export default connect( mapStateToProps, mapDispatchToProps )( Home )
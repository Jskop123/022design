import React, { Component } from 'react'

import { connect } from 'react-redux'
import { getSiteData } from '../../store/actions/asyncActions'

import Carousel from '../../components/Carousel/Carousel'
import Spinner from '../../components/Spinner/Spinner'

class Home extends Component {
    componentDidMount(){
        if( this.props.loading ) this.props.getSiteData()
    }
    render() {
        return (
            <div className='page'>
                { this.props.loading ? 
                    <Spinner/> :
                    <Carousel items={ this.props.items } description/>
                }
            </div>
        ) 
    }
}
const mapStateToProps = state => ({
    loading: state.home.loading,
    items: state.home.carouselItems
})
const mapDispatchToProps = dispatch => ({
    getSiteData: () => dispatch( getSiteData('home') )
})
export default connect( mapStateToProps, mapDispatchToProps )( Home )
import React, { Component } from 'react'

import { connect } from 'react-redux'
import { getHomeItems } from '../../store/actions/homeActions'

import Carousel from '../../components/Carousel/Carousel'
import Spinner from '../../components/Spinner/Spinner'

class Home extends Component {
    componentDidMount(){
        if( this.props.loading ) this.props.getHomeItems()
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
    getHomeItems: () => dispatch( getHomeItems() )
})
export default connect( mapStateToProps, mapDispatchToProps )( Home )
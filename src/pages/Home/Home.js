import React, { PureComponent } from 'react'

import { connect } from 'react-redux'
import { getSiteData } from '../../store/actions/asyncActions'

import Carousel from '../../components/Carousel/Carousel'
import Spinner from '../../components/Spinner/Spinner'

class Home extends PureComponent {
    componentWillMount = () => {
        if( !this.props.items.length ) this.props.getSiteData()
    }
    render = () => (
        <div className='page'>
            { !this.props.items.length ? 
                <Spinner/> 
                :
                <Carousel items={ this.props.items } description/>
            }
        </div>
    ) 
}
const mapStateToProps = state => ({
    loading: state.async.loading,
    items: state.async.carouselItems
})
const mapDispatchToProps = dispatch => ({
    getSiteData: () => dispatch( getSiteData('home') )
})
export default connect( mapStateToProps, mapDispatchToProps )( Home )
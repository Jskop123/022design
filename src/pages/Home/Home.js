import React, { Component } from 'react'

import Carousel from '../../components/Carousel/Carousel'
import Spinner from '../../components/Spinner/Spinner';
import axios from '../../axios';



class Home extends Component {
    state = { 
        loading: true,
        projects: []
    }
    componentDidMount(){
        axios.get('/karuzela')
            .then( response => {
                this.setState({ projects: response.data, loading: false })
            })
    }
    render() {
        return (
            <div className='page'>
                { this.state.loading ? 
                    <Spinner/> :
                    <Carousel items={ this.state.projects } description/>
                }
            </div>
        ) 
    }
} 
export default Home
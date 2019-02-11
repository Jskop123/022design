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
                console.log(response.data)
                this.setState({ loading: false, projects: response.data })
            }).catch( error => {
                console.log(error)
            })
    }
    render() {
        return (
            <div className='page'>
                { this.state.loading ? 
                    <Spinner/> :
                    <Carousel items={ this.state.projects } description={ true }/>
                }
            </div>
        ) 
    }
} 
export default Home
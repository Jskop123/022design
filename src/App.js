import React, { Component } from 'react'
import './App.css'

class App extends Component {
  state = { 
    projects: [
      <div className='tile red'>1</div>,
      <div className='tile blue'>2</div>,
      <div className='tile green'>3</div>,
      <div className='tile violet'>4</div>,
      <div className='tile lime'>5</div>,
      <div className='tile yellow'>6</div>,
      <div className='tile orange'>7</div>,
      <div className='tile white'>8</div>,
      <div className='tile black'>9</div>,
      <div className='tile brown'>10</div>
    ], 
    currentProject: 0
  }
  render() {
    return (
      <div className="App">
        <header>LOGO/MENU</header>
        <div className='carosel'>
          {
            this.state.projects.map(( el, i ) => {
              const current = this.state.currentProject
              const size = this.state.projects.length
              let style='hide'
              if ( current < 0 )                    this.setState({currentProject: 9})
              if ( current > size -1 )              this.setState({currentProject: 0})
              if ( i === current )                  style = 'current'
              if ( i === current -1 )               style = 'previous'
              if ( i > current )                    style = `next${i-this.state.currentProject}`
              if ( i === size -1 && current === 0 ) style = 'previous'
              if ( current > 4 && i < 4 )           style = `next${size - current + i}`

              return <div className={ style }>{ el }</div>
            })
          }
        </div>
        
        <button className='Button' 
          onClick={()=> { this.setState({ currentProject: this.state.currentProject - 1 })}}
        >prev</button>

        <button className='Button' 
          onClick={()=> { this.setState({ currentProject: this.state.currentProject + 1 })}}
        >next</button>
      </div>
    )
  }
}
export default App;

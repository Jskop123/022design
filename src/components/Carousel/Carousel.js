import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Swipe from 'react-easy-swipe'

import { debounce } from 'lodash'

import styles from './Carousel.module.css'

class Carousel extends PureComponent {
    state = {
        currentProject: 0,
        firstLoad:      true,
        title:          this.props.items[ 0 ][ 'title' + this.props.lang ],
        link:           this.props.items[ 0 ].link,
        projectId:      this.props.items[ 0 ].id
    }
    componentDidUpdate = ({ lang }) => {
        if ( this.props.lang !== lang ) {
            if( this.props.lang === 'Pl' )  this.setState({ title: this.props.items[ this.state.currentProject ].titlePl })
            else                            this.setState({ title: this.props.items[ this.state.currentProject ].titleEng })
        }
    }
    componentWillUnmount = () => {
        clearTimeout( this.winkTimeout )
    }
    currentProjectHandler = event => {
        let current = this.state.currentProject
        if( event === '+' || event > 0 )    current++
        else                                current--

        if( current >= this.props.items.length ) current = 0
        else if( current < 0 ) current = this.props.items.length - 1
        
        this.setState({ currentProject: current })

        if( this.props.description ) (() => {
            this.refs.info.classList.add( styles.wink )
            this.winkTimeout = setTimeout(() => {
                this.setState(() => ({ 
                    title: this.props.items[ this.state.currentProject ][ 'title'+this.props.lang ], 
                    link: this.props.items[ this.state.currentProject ].link,
                    projectId: this.props.items[ this.state.currentProject ].id
                }), () => this.refs.info.classList.remove( styles.wink ))
        }, 650 )})()
    }
    debouncedCurrentProjectHandler = debounce( this.currentProjectHandler, 100, { leading: true, trailing: false } )
    render = () => (
        <Swipe  className={styles.carousel}
                onLoad={() => this.setState({ firstLoad: false }) }
                onClick={() => this.currentProjectHandler( '+' ) } 
                onWheel={( e ) => this.debouncedCurrentProjectHandler( e.deltaY ) }
                onSwipeUp={() => this.currentProjectHandler( '+' )}
                onSwipeDown={() => this.currentProjectHandler( '-' )} 
                onSwipeLeft={() => this.currentProjectHandler( '+' )}
                onSwipeRight={() => this.currentProjectHandler( '-' )}
                onSwipeMove={() => true } >
            { this.props.items.map(( el, i ) => {
                const current = this.state.currentProject
                const size = this.props.items.length
                let selector = styles.tile + ' '
                if( this.props.animation ) {
                    if ( i === current )                                        selector += styles.current
                    if ( i > current && i <= current +3 )                       selector += styles[`next${i - current}`]
                    if ( current >= 3 && size - current + i <= 3 )              selector += styles[`next${size - current + i}`]
                    if ( i === current -1 || (i === size -1 && current === 0))  selector += styles.previous
                }
                return  <div key={ i } 
                            className={selector} 
                            style={ this.state.firstLoad && selector !== `${styles.tile} ${styles.previous}` ? 
                                    { zIndex: -i, transform: 'translate(-25%, -10%)' } : null }>
                            <img src={ el.mainPhoto.img.src }
                                    alt={ el.mainPhoto.alt } />
                        </div>
            })}
            { this.props.description ? 
                <Link to={{
                    pathname:`/portfolio/${this.props.lang === 'Pl' ? 'projekt/' : 'project/'}${this.state.link}`,
                    id: this.state.projectId }}>
                    <div className={ styles.projectInfo } ref='info'>
                        <h2>{ this.state.title }</h2>
                        <p>{ this.props.lang === 'Pl' ? 'Zobacz więcej' : 'See more' } <i className='icon-right-big'/></p>
                    </div>
                </Link>
                : null
            }
        </Swipe>
    )
}
const mapStateToProps = state => ({
    lang: state.language.lang,
})
export default connect( mapStateToProps )( Carousel )
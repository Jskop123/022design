import React from 'react';

import './Header.css'

import Menu from '../Menu/Menu'

const Header = (props) => (
    <header>
        <div className='logo'>022design</div>

        <div className={props.active ? 'burgerIcon active' : 'burgerIcon'} onClick={props.showMenu}>
            <div className='bar'></div>
            <div className='bar'></div>
            <div className='bar'></div>
        </div>
       <Menu active={ props.active }/>
    </header>
)
export default Header
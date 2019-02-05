import React from 'react';

import './Header.css'

const Header = (props) => (
    <header>
        <div className='logo'>022design</div>

        <div className={props.active ? 'burgerIcon active' : 'burgerIcon'} onClick={props.showMenu}>
            <div className='bar'></div>
            <div className='bar'></div>
            <div className='bar'></div>
        </div>
    </header>
)
export default Header
import React from 'react'

import './Menu.css'

const Menu = (props) => (
    <div className={ props.active ? 'menu showMenu' : 'menu' }>
        <ul>
            <li>Home</li>
            <li>Druga zakładka</li>
            <li>Trzecia zakładka</li>
            <li>Czwarta zakładka</li>
            <li>Piąta zakładka</li>
        </ul>
    </div>
)
export default Menu
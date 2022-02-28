import React, { Component } from 'react';
import { Button } from '../Button';
import { MenuItems } from './MenuItems';

class NavBar extends Component {
    state = { clicked: false }



    render() {
        return(
            <nav className='NavBarItems'>
                <h1 className='navbar-logo'>Spector</h1>

                
                {/* <div className='menu-icon' onClick={this.handleClick}>
                    <i className={this.
                </div> */}

                <ul className='nav-menu'>
                    {MenuItems.map((item, index) => {
                        return(
                            <li key={index}>
                                <a className={item.cName} href={item.url}>
                                {item.title}
                                </a>
                            </li>
                        )
                    })}
                </ul>

                <Button>Profile</Button>

            </nav>
        )
    }
}

export default NavBar;
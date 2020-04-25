import React from 'react'
import { Component } from 'react';
import NavLinks from './NavLinks/NavLinks'
import classes from './NavBar.module.css'
import Logo from '../UI/Logo/Logo'
import Drawertoggle from '../UI/Sidedrawer/Drawertoggle/Drawertoggle'
class NavBar extends Component {

    render() {

        return (
            <header className={classes.NavBar}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <div className={classes.Navlink}>
                    <NavLinks place="navbar" exact link='/'>Home </NavLinks>
                    <NavLinks place="navbar" link='/Faq'>Faq</NavLinks>
                    <NavLinks place="navbar" link='/helpfulLink'>HelpFul links</NavLinks>
                </div>
                <Drawertoggle click={this.props.togglehandle} />
            </header>
        )
    }
}

export default NavBar;
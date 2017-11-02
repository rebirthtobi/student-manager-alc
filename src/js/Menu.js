import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types';
import './../css/menu.css';

class Menu extends Component {
	render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <NavLink to={'/'} exact className="navbar-brand" activeClassName="active">{ this.props.head }</NavLink>
                    </div>
                    <ul className="nav navbar-nav navbar-right">
                        <li><NavLink to={'/'} exact activeClassName="active">Home</NavLink></li>
                        <li><NavLink to={'/students'} exact activeClassName="active">All Students</NavLink></li>
                        <li><NavLink to={'/student/add'} exact activeClassName="active">Add Student</NavLink></li>
                        <li><NavLink to={'/logout'} exact activeClassName="active">Logout</NavLink></li>
                    </ul>
                </div>
            </nav>
        );
    }
}

Menu.propTypes = {
    head: PropTypes.string
}

export default Menu;

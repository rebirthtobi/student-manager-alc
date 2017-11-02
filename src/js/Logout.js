import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import history from './../history';

class Logout extends Component {
    constructor(props) {
        super(props);
		this.logout();
        this.check();
    }
	
	check = () => {
	    let login = JSON.parse(sessionStorage.getItem('login'));
	    if(!login){
            <Redirect push to="/" />
        }
    }
	
	logout = () => {
		sessionStorage.removeItem('message');
		sessionStorage.removeItem('login');
		
		const location = {
		  pathname: '/'
		};
		
		history.push(location);
		window.location.reload();
	}
	
	render() { 
	   return false; 
	}
}

export default Logout;

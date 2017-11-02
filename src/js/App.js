import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import './../css/App.css';
import Menu from './Menu';
import Login from './Login';
import history from './../history';
import Home from './Home';
import All from './All';
import Update from './Update';
import Nomatch from './Update';
import Add from './Add';
import Logout from './Logout';

class App extends Component {
	constructor() {
		super();
		this.state = {
			head: "Student API Consumer",
            username: "Andela",
            password: "AndelaALC",
		};
		this.check();
	}

	setHead = (newHead) => {
		this.setState(
			{
				head: newHead
			}
		);
	}

	check = () => {
	    if (!JSON.parse(sessionStorage.getItem('login'))) {
            sessionStorage.setItem('login', JSON.stringify(false));
        }
        else{
            sessionStorage.setItem('login', JSON.stringify(true));
        }
    }

	access = (loginUsername, loginPassword) => {
        if (loginUsername.trim() === this.state.username) {
            if (loginPassword.trim() === this.state.password) {
                sessionStorage.setItem('login', JSON.stringify(true));
                sessionStorage.removeItem('message');
            } else {
                sessionStorage.setItem('message', JSON.stringify('Username or Password incorrect'));
            }
        } else {
            sessionStorage.setItem('message', JSON.stringify('Username or Password incorrect'));
        }

        history.go('/');
	}
	
	render () {
		let next = null;
		let message = JSON.parse(sessionStorage.getItem('message'));
        const supportsHistory = 'pushState' in window.history;
		if (JSON.parse(sessionStorage.getItem('login'))) {
			next =  <div>
                        <Menu head={this.state.head}/>
                        <div className='col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2'>
                            <Switch>
                                <Route exact path='/' render={({ match }) => <Home match={match} setHead={this.setHead}/>}/>
                                <Route path='/students' render={({ match }) => <All match={match} setHead={this.setHead}/>} login={this.state.login}/>
                                <Route path='/student/add' render={({ match }) => <Add match={match} setHead={this.setHead}/>} login={this.state.login}/>
                                <Route path='/student/update' render={({ match }) => <Update match={match} setHead={this.setHead}/>} login={this.state.login}/>
                                <Route path='/logout' render={({ match }) => <Logout match={match} login={this.state.login}/>}/>
                                <Route component={Nomatch}/>
                            </Switch>
                        </div>
                    </div>;
		} else {
			next = <div className='col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 text-center'>
                        <h3 className="head">
                            {this.state.head}
                        </h3>
                        <span className='error'> { message } </span>
                        <Login access={ this.access } setHead={ this.setHead }/>
                        <code>Username: Andela</code><br />
                        <code>Password: AndelaALC</code>
                    </div>;
		}
		return (
            <BrowserRouter forceRefresh={!supportsHistory}>
                <div className="row" id='box'>
                    { next }
                </div>
            </BrowserRouter>
		);
	}
}

export default App;

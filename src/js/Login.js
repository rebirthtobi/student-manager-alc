import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './../css/login.css';

class Login extends Component {
    constructor(props){
        super(props);
        this.changeHead();
    }

    changeHead = () => {
        this.props.setHead('Login');
    }

    login = (e) => {
        e.preventDefault();
        let username = this.refs.username.value;
        let password = this.refs.password.value;
        this.props.access(username, password);
    }

    render() {
        return (
                <form onSubmit={this.login} className='form-horizontal' id='login'>
                    <div className="form-group">
                        <label htmlFor='username' className='control-label col-sm-3'>Username</label>
                        <div className="col-sm-9">
                            <input ref='username' className="form-control" type="text"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor='password' className='control-label col-sm-3'>Password</label>
                        <div className="col-sm-9">
                            <input ref='password' className="form-control" type="password"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-info btn-xs">Login </button>
                    </div>
                </form>
        );
    }
}

Login.propTypes = {
    access: PropTypes.func,
    setHead: PropTypes.func,
}

export default Login;

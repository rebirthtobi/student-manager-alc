import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Nomatch extends Component {
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

    render() {
        return (
            <div>
                <code><h3>406</h3></code>
                <p>
                    Page not found
                </p>
            </div>
        );
    }
}

export default Nomatch;

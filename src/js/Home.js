import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import './../css/home.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.check();
        this.changeHead();
    }

    check = () => {
        let login = JSON.parse(sessionStorage.getItem('login'));
        if(!login){
            <Redirect push to="/" />
        }
    }

    changeHead = () => {
        this.props.setHead('Update Student');
    }

    render() {
        return (
            <div>
                <h3 id='title'>
                    Welcome to Student Api
                </h3>
                <p>
                    This is the consumer for the api which was build to serve as the student resources project.
                </p>
                <h5>Table of Content</h5>
                <ul>
                    <li><code>1.</code> Navigation</li>
                    <li><code>2.</code> Resources</li>
                    <li><code>3.</code> Actions</li>
                </ul>
                <hr />
                <code>>>>>Navigation</code>
                <blockquote>
                    <p id='#navigation'>
                        You can use the Menu on the Top right corner to move from one page to the other
                    </p>
                </blockquote>
                <code>>>>>Resources</code>
                <blockquote>
                    <p id='#resources'>
                        The student resource only have the <code>First Name</code>, <code>Last Name</code>, <code>Date of Birth</code>,
                        <code>Class</code>
                    </p>
                </blockquote>
                <code>>>>>Actions</code>
                <blockquote>
                    <p id='#actions'>
                        You can add new student, update a student, delete a student, view all student
                    </p>
                </blockquote>
            </div>
        );
    }
}


Home.propTypes = {
    setHead: PropTypes.func,
};

export default Home;

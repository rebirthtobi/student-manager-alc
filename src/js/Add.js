import React, { Component } from 'react';
import PropTypes from 'prop-types';
import history from './../history';
import axios from 'axios';
import running from './../img/running.gif';
import { Redirect } from 'react-router-dom';

class Add extends Component {
	constructor(props) {
        super(props);
        this.check();
        this.changeHead();
		this.state = {
			status: null
		};
    }

    componentDidMount() {
        document.getElementById('runner').style.display = 'none';
    }

    check = () => {
        let login = global.localStorage.getItem('login');
        if(!login){
            <Redirect push to="/" />;
        }
    }
	
	addStudent = (e) => {
		e.preventDefault();
        document.getElementById('runner').style.display = 'inline';
		let firstName = this.refs.first_name.value;
        let lastName = this.refs.last_name.value;
        let dob = this.refs.dob.value;
        let studentClass = this.refs.class.value;
		let url = 'https://student-api-alc.herokuapp.com/student/create';
		
		axios.put(url, {
            firstName: firstName,
            lastName: lastName,
            studentClass: studentClass,
            dob: dob,
        }).then((response) => {
			const location = {
			  pathname: '/students'
			};
			
			history.push(location);
			window.location.reload();
        }).catch((error) => {
            this.setState ({
				status: 'There is an error creating new student'
			});
            document.getElementById('runner').style.display = 'none';
        });
	}
    
	changeHead = () => {
        this.props.setHead('Add Student');
    }
    
	render() {
		let status = '';
        if (this.state.status) {
            status = <div className="alert alert-info alert-dismissible" role="alert">
                <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <strong>Info!</strong> {this.state.status}
            </div>;
        }
        return (
            <div className='text-center'>				
				{ status }
                <form className='form-horizontal' id='update' onSubmit={(e) => this.addStudent(e)}>
                    <div className="form-group">
                        <label htmlFor='first_name' className='control-label col-sm-3'>First Name</label>
                        <div className="col-sm-9">
                            <input ref='first_name' className="form-control" type="text"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor='last_name' className='control-label col-sm-3'>Last Name</label>
                        <div className="col-sm-9">
                            <input ref='last_name' className="form-control" type="text"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor='dob' className='control-label col-sm-3'>Date of Birth</label>
                        <div className="col-sm-9">
                            <input ref='dob' className="form-control" type="date"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor='class' className='control-label col-sm-3'>Class</label>
                        <div className="col-sm-9">
                            <input ref='class' className="form-control" type="text"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-sm btn-info">Add <img id="runner" src={running}/></button>
                    </div>
                </form>
            </div>
        );
    }
}

Add.propTypes = {
    setHead: PropTypes.func,
};

export default Add;

import React, { Component } from 'react';
import axios from 'axios';
import history from './../history';
import { Redirect } from 'react-router-dom';
import './../css/update.css';
import running from './../img/running.gif';

class Update extends Component {
	constructor(props) {
        super(props);
        this.check();
        this.setData();
    }

    componentDidMount() {
	    document.getElementById('runner').style.display = 'none';
    }

    setData = () => {
	    if (this.props.location.state) {
            this.state = {
                first_name: this.props.location.state.firstName,
                last_name: this.props.location.state.lastName,
                studentClass: this.props.location.state.class,
                dob: this.props.location.state.dob,
                id: this.props.location.state.id,
                status: null
            }
        } else {
            this.state = {
                first_name: '',
                last_name: '',
                studentClass: '',
                dob: '',
                id: '',
                status: null
            }
        }
    }

    check = () => {
	    let login = JSON.parse(sessionStorage.getItem('login'));
	    if(!login){
            <Redirect push to="/" />
        }
    }

    getDate = (dob) => {
	    let d = new Date(dob);
        let year = d.getFullYear();
        let month = this.addZero((d.getMonth()+1));
        let day = this.addZero(d.getDate());
        let dateToFill = year+'-'+month+'-'+day;

        return dateToFill;
    }

    updateStudent = (e) => {
        document.getElementById('runner').style.display = 'inline';
		e.preventDefault();
	    let firstName = this.refs.first_name.value;
        let lastName = this.refs.last_name.value;
        let dob = this.refs.dob.value;
        let studentClass = this.refs.class.value;
		let url = 'https://student-api-alc.herokuapp.com/student/update';

        axios.patch(url, {
			identifier: this.refs.id.value,
			firstName: firstName,
			lastName: lastName,
			studentClass: studentClass,
			dob: dob
		}).then((response) => {
            const location = {
			  pathname: '/students'
			};
			
			history.push(location);
			window.location.reload();
        }).catch((error) => {
            this.setState ({
                status: 'There is an error with the api or data supplied is wrong'
            });
            document.getElementById('runner').style.display = 'inline';
        });
    }

    addZero = (value) => {
        if(value<10){
            value ='0'+value;
            return value;
        }
        else{
            return value;
        }
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
                <form className='form-horizontal' id='update' onSubmit={(e) => this.updateStudent(e)}>
                    <input ref='id' type="hidden" value={this.state.id}/>
                    <div className="form-group">
                        <label htmlFor='first_name' className='control-label col-sm-3'>First Name</label>
                        <div className="col-sm-9">
                            <input ref='first_name' className="form-control" type="text" defaultValue={this.state.first_name}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor='last_name' className='control-label col-sm-3'>Last Name</label>
                        <div className="col-sm-9">
                            <input ref='last_name' className="form-control" type="text" defaultValue={this.state.last_name}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor='dob' className='control-label col-sm-3'>Date of Birth</label>
                        <div className="col-sm-9">
                            <input ref='dob' className="form-control" type="date" defaultValue={this.getDate(this.state.dob)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor='class' className='control-label col-sm-3'>Class</label>
                        <div className="col-sm-9">
                            <input ref='class' className="form-control" type="text" defaultValue={this.state.studentClass}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-sm btn-info">Update <img id="runner" src={running}/> </button>
                    </div>
                </form>           
            </div>
        );
    }
}

export default Update;

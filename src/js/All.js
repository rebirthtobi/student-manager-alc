import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import history from './../history';
import { Redirect, Link }  from 'react-router-dom';
import running from './../img/running.gif';
import './../css/all.css';
import loader from './../img/loading.gif';

class All extends Component {
    constructor(props) {
        super(props);
        this.check();
        this.changeHead();
        this.state = {
            data: null,
            status: null,
            message: '<img src="'+ loader +'" alt="Loading......" class="loader"/>'
        };
    }

    componentDidMount(){
        let url = 'https://student-api-alc.herokuapp.com/student';
        axios.get(url).then((response) => {
            if (response.status !== 200) {
                throw Error(response);
            }
            this.setState ({
                data: response.data.students
            });
        }).catch((err) => {
            let info = '<div class="error"><code> There is an error getting data from the api <br/> Please Contact the administrator</code></div>';
            this.setState ({
                message: info
            });
        });
        document.getElementById('runner').style.display = 'none';
    }

    check = () => {
        let login = JSON.parse(sessionStorage.getItem('login'));
        if(!login){
            history.go('/students');
        }
    }

    changeHead = () => {
        this.props.setHead('All Student');
    }

    deleteStudent = (id) => {
        document.getElementById('runner').style.display = 'inline';
        let url = 'https://student-api-alc.herokuapp.com/student/remove';
        axios.post(url, {
            id: id
        }).then((response) => {
            this.setState ({
                status: 'Student Record Deleted Successfully'
            });
			window.location.reload();
        }).catch((error) => {
            this.setState ({
                status: 'There is an error with the api or data supplied is wrong'
            });
            document.getElementById('runner').style.display = 'none';
        });
    }

    render() {
        let status = '';
        if (this.state.status) {
            status = <div className="alert alert-info alert-dismissible" role="alert">
                <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <strong>Info!</strong> {this.state.status}
            </div>;
        }
        if (this.state.data) {
            return (
                <div>
                    { status }
                    { this.state.data.map((item, index) => {
                        let d = new Date(item.dob);
                        let dString = d.toDateString();
                        return <div key={index} ><blockquote className="col-sm-10">
                            Name: {item.firstName}  {item.lastName}<br/>
                            Date of Birth: {dString}<br/>
                            Class: {item.class}
                            </blockquote>
                            <span className="col-sm-1 right">
                                <Link className="btn btn-info btn-xs edit" to={{
                                    pathname: '/update',
                                    state: {
                                        firstName: item.firstName,
                                        lastName: item.lastName,
                                        dob: item.dob,
                                        class: item.class,
                                        id: item._id
                                    }
                                }}>Edit</Link>
                            </span>
                            <span className="col-sm-1 right">
                                <button type='button' onClick={() => this.deleteStudent(item._id)} className='btn btn-danger btn-xs delete'>Delete <img id="runner" src={running}/></button>
                            </span>
                        </div>;
                    })}
                </div>
            );
        } else {
            return (
                <div className="text-center">
                    <div dangerouslySetInnerHTML={{ __html: this.state.message }} />
                    <img id="runner" src={running}/>
                </div>
            );
        }
    }
}

All.propTypes = {
    setHead: PropTypes.func,
};

export default All;

import React from 'react';
import axios from 'axios';
import moment from 'moment';
import Footer from '../Footer/Footer';
import { connect } from 'react-redux';
import { FullPage, Slide } from 'react-full-page';
import { Link } from 'react-router-dom';
import 'whatwg-fetch';
import { pagination } from 'paginationjs';
import Fingerprint from 'fingerprintjs';
import Calendar from 'rc-calendar';
import API from '../../utils/API';
var _ = require('lodash');

class Settings extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            _user: {}
        };
        this.handleSubmitArticle = this.handleSubmitArticle.bind(this);
        this.handleSubmitClassroom = this.handleSubmitArticle.bind(this);
        this.handleSubmitCourse = this.handleSubmitArticle.bind(this);
        this.handleSubmitExam = this.handleSubmitArticle.bind(this);
        this.handleSubmitHomework = this.handleSubmitArticle.bind(this);
        this.handleSubmitLetter = this.handleSubmitArticle.bind(this);
        this.handleSubmitReport = this.handleSubmitArticle.bind(this);
        this.handleSubmitSchool = this.handleSubmitArticle.bind(this);
        this.handleSubmitStudent = this.handleSubmitArticle.bind(this);
        this.handleSubmitSubject = this.handleSubmitArticle.bind(this);
        this.handleChangeField = this.handleChangeField.bind(this);
        this.get_user = this.get_user.bind(this);
    }
    componentDidMount() {
        this.get_user();
        this._handleTap();
        $('.nav_link').click((event) => {
            let _li_parent = $(event.target).parent().parent();
            $(_li_parent).addClass('active');
            $("._content li").not(_li_parent).removeClass('active');
        });
    }
    async get_user() {
        const self = this;
        try {
            const { data } = await API.get_user(localStorage.getItem('email'));
            self.setState({
                _user: data.user
            });
        } catch (error) {
            console.error(error);
        }
    }

    handleSubmitArticle(){
        const { onSubmit, classroomToEdit, onEdit } = this.props;
        const { _code, _name, _grade, _section, _school, _teacher, _subjects, _students } = this.state;
        const self = this;
        if(!classroomToEdit) {
            return axios.post('http://localhost:8000/api/classrooms', {
                _code,
                _name,
                _grade,
                _section,
                _school,
                _teacher,
                _subjects,
                _students,
            })
                .then((res) => onSubmit(res.data))
                .then(function() {
                    self.setState({ 
                        _code: '',
                        _name: '',
                        _grade: '',
                        _section: '',
                        _school: {},
                        _teacher: {},
                        _subjects: [],
                        _students: [],
                    })
                });
        } else {
            return axios.patch(`http://localhost:8000/api/classrooms/${classroomToEdit._id}`, {
                _code,
                _name,
                _grade,
                _section,
                _school,
                _teacher,
                _subjects,
                _students,
            })
                .then((res) => onEdit(res.data))
                .then(function() {
                    self.setState({ 
                        _code: '',
                        _name: '',
                        _grade: '',
                        _section: '',
                        _school: {},
                        _teacher: {},
                        _subjects: [],
                        _students: [],
                    })
                });
        }
    }
    handleSubmitClassroom(){
        const { onSubmit, classroomToEdit, onEdit } = this.props;
        const { _code, _name, _grade, _section, _school, _teacher, _subjects, _students } = this.state;
        const self = this;
        if(!classroomToEdit) {
            return axios.post('http://localhost:8000/api/classrooms', {
                _code,
                _name,
                _grade,
                _section,
                _school,
                _teacher,
                _subjects,
                _students,
            })
                .then((res) => onSubmit(res.data))
                .then(function() {
                    self.setState({ 
                        _code: '',
                        _name: '',
                        _grade: '',
                        _section: '',
                        _school: {},
                        _teacher: {},
                        _subjects: [],
                        _students: [],
                    })
                });
        } else {
            return axios.patch(`http://localhost:8000/api/classrooms/${classroomToEdit._id}`, {
                _code,
                _name,
                _grade,
                _section,
                _school,
                _teacher,
                _subjects,
                _students,
            })
                .then((res) => onEdit(res.data))
                .then(function() {
                    self.setState({ 
                        _code: '',
                        _name: '',
                        _grade: '',
                        _section: '',
                        _school: {},
                        _teacher: {},
                        _subjects: [],
                        _students: [],
                    })
                });
        }
    }
    handleSubmitCourse(){
        const { onSubmit, classroomToEdit, onEdit } = this.props;
        const { _code, _name, _grade, _section, _school, _teacher, _subjects, _students } = this.state;
        const self = this;
        if(!classroomToEdit) {
            return axios.post('http://localhost:8000/api/classrooms', {
                _code,
                _name,
                _grade,
                _section,
                _school,
                _teacher,
                _subjects,
                _students,
            })
                .then((res) => onSubmit(res.data))
                .then(function() {
                    self.setState({ 
                        _code: '',
                        _name: '',
                        _grade: '',
                        _section: '',
                        _school: {},
                        _teacher: {},
                        _subjects: [],
                        _students: [],
                    })
                });
        } else {
            return axios.patch(`http://localhost:8000/api/classrooms/${classroomToEdit._id}`, {
                _code,
                _name,
                _grade,
                _section,
                _school,
                _teacher,
                _subjects,
                _students,
            })
                .then((res) => onEdit(res.data))
                .then(function() {
                    self.setState({ 
                        _code: '',
                        _name: '',
                        _grade: '',
                        _section: '',
                        _school: {},
                        _teacher: {},
                        _subjects: [],
                        _students: [],
                    })
                });
        }
    }
    handleSubmitExam(){
        const { onSubmit, classroomToEdit, onEdit } = this.props;
        const { _code, _name, _grade, _section, _school, _teacher, _subjects, _students } = this.state;
        const self = this;
        if(!classroomToEdit) {
            return axios.post('http://localhost:8000/api/classrooms', {
                _code,
                _name,
                _grade,
                _section,
                _school,
                _teacher,
                _subjects,
                _students,
            })
                .then((res) => onSubmit(res.data))
                .then(function() {
                    self.setState({ 
                        _code: '',
                        _name: '',
                        _grade: '',
                        _section: '',
                        _school: {},
                        _teacher: {},
                        _subjects: [],
                        _students: [],
                    })
                });
        } else {
            return axios.patch(`http://localhost:8000/api/classrooms/${classroomToEdit._id}`, {
                _code,
                _name,
                _grade,
                _section,
                _school,
                _teacher,
                _subjects,
                _students,
            })
                .then((res) => onEdit(res.data))
                .then(function() {
                    self.setState({ 
                        _code: '',
                        _name: '',
                        _grade: '',
                        _section: '',
                        _school: {},
                        _teacher: {},
                        _subjects: [],
                        _students: [],
                    })
                });
        }
    }
    handleSubmitHomework(){
        const { onSubmit, classroomToEdit, onEdit } = this.props;
        const { _code, _name, _grade, _section, _school, _teacher, _subjects, _students } = this.state;
        const self = this;
        if(!classroomToEdit) {
            return axios.post('http://localhost:8000/api/classrooms', {
                _code,
                _name,
                _grade,
                _section,
                _school,
                _teacher,
                _subjects,
                _students,
            })
                .then((res) => onSubmit(res.data))
                .then(function() {
                    self.setState({ 
                        _code: '',
                        _name: '',
                        _grade: '',
                        _section: '',
                        _school: {},
                        _teacher: {},
                        _subjects: [],
                        _students: [],
                    })
                });
        } else {
            return axios.patch(`http://localhost:8000/api/classrooms/${classroomToEdit._id}`, {
                _code,
                _name,
                _grade,
                _section,
                _school,
                _teacher,
                _subjects,
                _students,
            })
                .then((res) => onEdit(res.data))
                .then(function() {
                    self.setState({ 
                        _code: '',
                        _name: '',
                        _grade: '',
                        _section: '',
                        _school: {},
                        _teacher: {},
                        _subjects: [],
                        _students: [],
                    })
                });
        }
    }
    handleSubmitLetter(){
        const { onSubmit, classroomToEdit, onEdit } = this.props;
        const { _code, _name, _grade, _section, _school, _teacher, _subjects, _students } = this.state;
        const self = this;
        if(!classroomToEdit) {
            return axios.post('http://localhost:8000/api/classrooms', {
                _code,
                _name,
                _grade,
                _section,
                _school,
                _teacher,
                _subjects,
                _students,
            })
                .then((res) => onSubmit(res.data))
                .then(function() {
                    self.setState({ 
                        _code: '',
                        _name: '',
                        _grade: '',
                        _section: '',
                        _school: {},
                        _teacher: {},
                        _subjects: [],
                        _students: [],
                    })
                });
        } else {
            return axios.patch(`http://localhost:8000/api/classrooms/${classroomToEdit._id}`, {
                _code,
                _name,
                _grade,
                _section,
                _school,
                _teacher,
                _subjects,
                _students,
            })
                .then((res) => onEdit(res.data))
                .then(function() {
                    self.setState({ 
                        _code: '',
                        _name: '',
                        _grade: '',
                        _section: '',
                        _school: {},
                        _teacher: {},
                        _subjects: [],
                        _students: [],
                    })
                });
        }
    }
    handleSubmitReport(){
        const { onSubmit, classroomToEdit, onEdit } = this.props;
        const { _code, _name, _grade, _section, _school, _teacher, _subjects, _students } = this.state;
        const self = this;
        if(!classroomToEdit) {
            return axios.post('http://localhost:8000/api/classrooms', {
                _code,
                _name,
                _grade,
                _section,
                _school,
                _teacher,
                _subjects,
                _students,
            })
                .then((res) => onSubmit(res.data))
                .then(function() {
                    self.setState({ 
                        _code: '',
                        _name: '',
                        _grade: '',
                        _section: '',
                        _school: {},
                        _teacher: {},
                        _subjects: [],
                        _students: [],
                    })
                });
        } else {
            return axios.patch(`http://localhost:8000/api/classrooms/${classroomToEdit._id}`, {
                _code,
                _name,
                _grade,
                _section,
                _school,
                _teacher,
                _subjects,
                _students,
            })
                .then((res) => onEdit(res.data))
                .then(function() {
                    self.setState({ 
                        _code: '',
                        _name: '',
                        _grade: '',
                        _section: '',
                        _school: {},
                        _teacher: {},
                        _subjects: [],
                        _students: [],
                    })
                });
        }
    }
    handleSubmitSchool(){
        const { onSubmit, classroomToEdit, onEdit } = this.props;
        const { _code, _name, _grade, _section, _school, _teacher, _subjects, _students } = this.state;
        const self = this;
        if(!classroomToEdit) {
            return axios.post('http://localhost:8000/api/classrooms', {
                _code,
                _name,
                _grade,
                _section,
                _school,
                _teacher,
                _subjects,
                _students,
            })
                .then((res) => onSubmit(res.data))
                .then(function() {
                    self.setState({ 
                        _code: '',
                        _name: '',
                        _grade: '',
                        _section: '',
                        _school: {},
                        _teacher: {},
                        _subjects: [],
                        _students: [],
                    })
                });
        } else {
            return axios.patch(`http://localhost:8000/api/classrooms/${classroomToEdit._id}`, {
                _code,
                _name,
                _grade,
                _section,
                _school,
                _teacher,
                _subjects,
                _students,
            })
                .then((res) => onEdit(res.data))
                .then(function() {
                    self.setState({ 
                        _code: '',
                        _name: '',
                        _grade: '',
                        _section: '',
                        _school: {},
                        _teacher: {},
                        _subjects: [],
                        _students: [],
                    })
                });
        }
    }
    handleSubmitStudent(){
        const { onSubmit, classroomToEdit, onEdit } = this.props;
        const { _code, _name, _grade, _section, _school, _teacher, _subjects, _students } = this.state;
        const self = this;
        if(!classroomToEdit) {
            return axios.post('http://localhost:8000/api/classrooms', {
                _code,
                _name,
                _grade,
                _section,
                _school,
                _teacher,
                _subjects,
                _students,
            })
                .then((res) => onSubmit(res.data))
                .then(function() {
                    self.setState({ 
                        _code: '',
                        _name: '',
                        _grade: '',
                        _section: '',
                        _school: {},
                        _teacher: {},
                        _subjects: [],
                        _students: [],
                    })
                });
        } else {
            return axios.patch(`http://localhost:8000/api/classrooms/${classroomToEdit._id}`, {
                _code,
                _name,
                _grade,
                _section,
                _school,
                _teacher,
                _subjects,
                _students,
            })
                .then((res) => onEdit(res.data))
                .then(function() {
                    self.setState({ 
                        _code: '',
                        _name: '',
                        _grade: '',
                        _section: '',
                        _school: {},
                        _teacher: {},
                        _subjects: [],
                        _students: [],
                    })
                });
        }
    }
    handleSubmitSubject(){
        const { onSubmit, classroomToEdit, onEdit } = this.props;
        const { _code, _name, _grade, _section, _school, _teacher, _subjects, _students } = this.state;
        const self = this;
        if(!classroomToEdit) {
            return axios.post('http://localhost:8000/api/classrooms', {
                _code,
                _name,
                _grade,
                _section,
                _school,
                _teacher,
                _subjects,
                _students,
            })
                .then((res) => onSubmit(res.data))
                .then(function() {
                    self.setState({ 
                        _code: '',
                        _name: '',
                        _grade: '',
                        _section: '',
                        _school: {},
                        _teacher: {},
                        _subjects: [],
                        _students: [],
                    })
                });
        } else {
            return axios.patch(`http://localhost:8000/api/classrooms/${classroomToEdit._id}`, {
                _code,
                _name,
                _grade,
                _section,
                _school,
                _teacher,
                _subjects,
                _students,
            })
                .then((res) => onEdit(res.data))
                .then(function() {
                    self.setState({ 
                        _code: '',
                        _name: '',
                        _grade: '',
                        _section: '',
                        _school: {},
                        _teacher: {},
                        _subjects: [],
                        _students: [],
                    })
                });
        }
    }
    handleSubmitUser(){
        const { onSubmit, classroomToEdit, onEdit } = this.props;
        const { _code, _name, _grade, _section, _school, _teacher, _subjects, _students } = this.state;
        const self = this;
        if(!classroomToEdit) {
            return axios.post('http://localhost:8000/api/classrooms', {
                _code,
                _name,
                _grade,
                _section,
                _school,
                _teacher,
                _subjects,
                _students,
            })
                .then((res) => onSubmit(res.data))
                .then(function() {
                    self.setState({ 
                        _code: '',
                        _name: '',
                        _grade: '',
                        _section: '',
                        _school: {},
                        _teacher: {},
                        _subjects: [],
                        _students: [],
                    })
                });
        } else {
            return axios.patch(`http://localhost:8000/api/classrooms/${classroomToEdit._id}`, {
                _code,
                _name,
                _grade,
                _section,
                _school,
                _teacher,
                _subjects,
                _students,
            })
                .then((res) => onEdit(res.data))
                .then(function() {
                    self.setState({ 
                        _code: '',
                        _name: '',
                        _grade: '',
                        _section: '',
                        _school: {},
                        _teacher: {},
                        _subjects: [],
                        _students: [],
                    })
                });
        }
    }

    handleChangeField(key, event) {
        const _val = event.target.value;
        if(key === "username" || key === "firstname" || key === "lastname"){
            if(key === "username") {
                this.setState(prevState => ({
                    _user: {                   // object that we want to update
                        ...prevState._user,    // keep all other key-value pairs
                        username: _val       // update the value of specific key
                    }
                }));
            }
            if(key === "firstname") {
                this.setState(prevState => ({
                    _user: {                   // object that we want to update
                        ...prevState._user,    // keep all other key-value pairs
                        firstname: _val       // update the value of specific key
                    }
                }));
            }
            if(key === "lastname") {
                this.setState(prevState => ({
                    _user: {                   // object that we want to update
                        ...prevState._user,    // keep all other key-value pairs
                        lastname: _val       // update the value of specific key
                    }
                }));
            }
        } else {
            this.setState({
                [key]: event.target.value,
            });
        }
    }
    _handleTap() {
        let searchWrapper_name = document.querySelector('.search-wrapper-name'),
            searchInput_name = document.querySelector('.search-input-name'),
            searchIcon_name = document.querySelector('.search-name'),
            searchActivated_name = false;

        $('.search-name').click(() => {
            if (!searchActivated_name) {
                searchWrapper_name.classList.add('focused');
                searchIcon_name.classList.add('active');
                searchInput_name.focus();
                searchActivated_name = !searchActivated_name;
            } else {
                searchWrapper_name.classList.remove('focused');
                searchIcon_name.classList.remove('active');
                searchActivated_name = !searchActivated_name;
            }
        });
    }
    render() {
        const { articles, classrooms, courses, exams, homeworks, letters, reports, schools, students, subjects, user } = this.props;
        const { _user } = this.state;
        return(
            <FullPage scrollMode={'normal'}>
				<Slide>
					<section className="first_section_settings">
                        <div className="wrapper_full">
                            <div className="bs-example bs-example-modal" data-example-id="static-modal">
                                <div className="modal" role="dialog" tabIndex="-1">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-body">
                                                <a title="Close" className="modal-close" data-dismiss="modal">Close</a>
                                                
                                                <div className="_content">
                                                    <ul className="nav nav-tabs flex-column">
                                                        <li className="active">
                                                            <i className="fas fa-user-cog"></i>
                                                            <span className="item"><a href="#1a" className="nav_link" data-toggle="tab">  Personal Data </a></span>
                                                        </li>
                                                        <li>
                                                            <i className="fas fa-at"></i>
                                                            <span className="item"><a href="#2a" className="nav_link" data-toggle="tab">  Change Email Address </a></span>
                                                        </li>
                                                        <li>
                                                            <i className="fas fa-key"></i>
                                                            <span className="item"><a href="#3a" className="nav_link" data-toggle="tab">  Change Password </a></span>
                                                        </li>
                                                    </ul>

                                                    <div className="tab-content clearfix">
                                                        <div className="personalData_pane tab-pane active" id="1a">
                                                            Personal Data
                                                            <div className="modal-content_user">

                                                                <fieldset className="input-field form-group">
                                                                    <input
                                                                    onChange={(ev) => this.handleChangeField('username', ev)}
                                                                    value={_user.username}
                                                                    className="validate form-group-input username" 
                                                                    id="username"
                                                                    type="text" 
                                                                    name="username" 
                                                                    required="required"
                                                                    />
                                                                    <label htmlFor='username'>@username</label>
                                                                    <div className="form-group-line"></div>
                                                                </fieldset>

                                                                <fieldset className="input-field form-group">
                                                                    <input
                                                                    onChange={(ev) => this.handleChangeField('firstname', ev)}
                                                                    value={_user.firstname}
                                                                    className="validate form-group-input firstname" 
                                                                    id="firstname"
                                                                    type="text" 
                                                                    name="firstname" 
                                                                    required="required"
                                                                    />
                                                                    <label htmlFor='firstname'>firstname</label>
                                                                    <div className="form-group-line"></div>
                                                                </fieldset>

                                                                <fieldset className="input-field form-group">
                                                                    <input
                                                                    onChange={(ev) => this.handleChangeField('lastname', ev)}
                                                                    value={_user.lastname}
                                                                    className="validate form-group-input lastname" 
                                                                    id="lastname"
                                                                    type="text" 
                                                                    name="lastname" 
                                                                    required="required"
                                                                    />
                                                                    <label htmlFor='lastname'>lastname</label>
                                                                    <div className="form-group-line"></div>
                                                                </fieldset>

                                                                <button onClick={this.handleSubmitUser} className="btn btn-primary float-right">Submit</button>
                                                            </div>
                                                        </div>
                                                        <div className="changeEmailAddress_pane tab-pane" id="2a">
                                                            Change Email Address
                                                            <div className="modal-content_user">

                                                                <fieldset className="input-field form-group">
                                                                    <input
                                                                    onChange={(ev) => this.handleChangeField('email', ev)}
                                                                    value={_user.email}
                                                                    className="validate form-group-input email" 
                                                                    id="email"
                                                                    type="text" 
                                                                    name="email" 
                                                                    required="required"
                                                                    />
                                                                    <label htmlFor='email'>@email</label>
                                                                    <div className="form-group-line"></div>
                                                                </fieldset>

                                                                <button onClick={this.handleSubmitUser} className="btn btn-primary float-right">Submit</button>
                                                            </div>
                                                        </div>
                                                        <div className="changePassword_pane tab-pane" id="3a">
                                                            Change Password
                                                            <div className="modal-content_user">

                                                                <fieldset className="input-field form-group">
                                                                    <input
                                                                    onChange={(ev) => this.handleChangeField('password', ev)}
                                                                    value={_user.password}
                                                                    className="validate form-group-input password" 
                                                                    id="password"
                                                                    type="text" 
                                                                    name="password" 
                                                                    required="required"
                                                                    />
                                                                    <label htmlFor='empasswordail'>password</label>
                                                                    <div className="form-group-line"></div>
                                                                </fieldset>

                                                                <button onClick={this.handleSubmitUser} className="btn btn-primary float-right">Submit</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
				</Slide>
				<Slide>
					<Footer/>
				</Slide>
            </FullPage>
        )
    }
}

const mapStateToProps = state => ({
    articles: state.home.articles,
    classrooms: state.home.classrooms,
    courses: state.home.courses,
    exams: state.home.exams,
    homeworks: state.home.homeworks,
    letters: state.home.letters,
    reports: state.home.reports,
    schools: state.home.schools,
    students: state.home.students,
    subjects: state.home.subjects,
    user: state.home.user,
});

const mapDispatchToProps = dispatch => ({
    onLoad: data => dispatch({ type: 'DASHBOARD_PAGE_LOADED', data }),
});
  
export default connect(mapStateToProps, mapDispatchToProps)(Settings)
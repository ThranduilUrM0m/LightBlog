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

class Dashboard extends React.Component {
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
            $(".dashboard_menu li").not(_li_parent).removeClass('active');
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

    handleChangeField(key, event) {
        this.setState({
            [key]: event.target.value,
        });
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
					<section className="first_section_dashboard">
                        <div className="wrapper_full">

                            <div className="dashboard_menu">
                                <ul className="nav nav-tabs flex-column">
                                    <li className="active">
                                        <i className="fas fa-th-large"></i>
                                        <span className="item"><a href="#1a" className="nav_link" data-toggle="tab">  Dashboards </a></span>
                                    </li>
                                    <li>
                                        <i className="fas fa-inbox"></i>
                                        <span className="item"><a href="#2a" className="nav_link" data-toggle="tab">  Inbox </a></span>
                                    </li>
                                    <li>
                                        <i className="far fa-bell"></i>
                                        <span className="item"><a href="#3a" className="nav_link" data-toggle="tab">  Notifications </a></span>
                                    </li>
                                    <li>
                                        <i className="fas fa-user-graduate"></i>
                                        <span className="item"><a href="#4a" className="nav_link" data-toggle="tab">  Students </a></span>
                                    </li>
                                    <li>
                                        <i className="fas fa-chalkboard"></i>
                                        <span className="item"><a href="#5a" className="nav_link" data-toggle="tab">  Classrooms </a></span>
                                    </li>
                                    <li>
                                        <i className="fas fa-book"></i>
                                        <span className="item"><a href="#6a" className="nav_link" data-toggle="tab">  Subjects </a></span>
                                    </li>
                                    <li>
                                        <i className="far fa-bookmark"></i>
                                        <span className="item"><a href="#7a" className="nav_link" data-toggle="tab">  Courses </a></span>
                                    </li>
                                    <li>
                                        <i className="far fa-copy"></i>
                                        <span className="item"><a href="#8a" className="nav_link" data-toggle="tab">  Homeworks </a></span>
                                    </li>
                                    <li>
                                        <i className="far fa-file-alt"></i>
                                        <span className="item"><a href="#9a" className="nav_link" data-toggle="tab">  Reports </a></span>
                                    </li>
                                    <li>
                                        <i className="fas fa-graduation-cap"></i>
                                        <span className="item"><a href="#10a" className="nav_link" data-toggle="tab">  Exams </a></span>
                                    </li>
                                    <li>
                                        <i className="far fa-newspaper"></i>
                                        <span className="item"><a href="#11a" className="nav_link" data-toggle="tab">  Blog </a></span>
                                    </li>
                                </ul>
                            </div>

                            <div className="tab-content clearfix">
                                <div className="dashboard_pane tab-pane active" id="1a">
                                    <ul className="cards">
                                        <li className="cards__item">
                                            <div className="card">
                                                <div className="card__content">
                                                    <div className="card__title"></div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="cards__item">
                                            <div className="card">
                                                <div className="card__content">
                                                    <div className="card__title">Dashboards</div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="cards__item">
                                            <div className="card">
                                                <div className="card__content">
                                                    <div className="card__title">Dashboards</div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="cards__item">
                                            <div className="card">
                                                <div className="card__content">
                                                    <div className="card__title">Dashboards</div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="inbox_pane tab-pane" id="2a">
                                
                                </div>
                                <div className="notifications_pane tab-pane" id="3a">
                                
                                </div>
                                <div className="students_pane tab-pane" id="4a">
                                    {/* <div className="_students_header">
                                        <div className="_search_form">
                                            <div className="search-wrapper-name">
                                                <input className="search-input-name" type="text" placeholder="Search"/>
                                                <span></span>
                                                <div className='search-name'></div>
                                            </div>
                                        </div>

                                        <button className="_filter">Filter</button>
                                        <button className="_add_student">Add Student</button>
                                    </div>
                                    <div className="_students_content">

                                        <div className="_student_data">
                                            <table className="students_list">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Name</th>
                                                        <th>Classroom</th>
                                                        <th>Grade</th>
                                                        <th>Gender</th>
                                                        <th>Birthdate</th>
                                                        <th>Registration</th>
                                                        <th>Attendance</th>
                                                        <th>Parent #1</th>
                                                        <th>Parent #2</th>
                                                        <th>Guardian</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    _.orderBy(students, ['_dateofbirth'], ['desc']).map((student, index) => {
                                                        return (
                                                            <tr>
                                                                <td>{student._registration_number}</td>
                                                                <td>{student._last_name} {student._first_name}</td>
                                                                <td>{student._classroom._name}</td>
                                                                <td>{student._classroom._grade}</td>
                                                                <td>{student._gender}</td>
                                                                <td>{student._dateofbirth}</td>
                                                                <td>{student._registration_date}</td>
                                                                <td>?</td>
                                                                <td>{student._first_parent._first_name} {student._first_parent._last_name}</td>
                                                                <td>{student._second_parent._first_name} {student._second_parent._last_name}</td>
                                                                <td>{student._guardian._first_name} {student._guardian._last_name}</td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                                </tbody>
                                            </table>
                                        </div>
                                        <div id="_student_data_indexes"></div>

                                    </div> */}
                                </div>
                                <div className="classrooms_pane tab-pane" id="5a">
                                    {/* <div className="_classrooms_header">
                                        <div className="_search_form">
                                            <div className="search-wrapper-name">
                                                <input className="search-input-name" type="text" placeholder="Search"/>
                                                <span></span>
                                                <div className='search-name'></div>
                                            </div>
                                        </div>

                                        <button className="_filter">Filter</button>
                                        <button className="_add_classroom" data-toggle="modal" data-target="#_classroom_modal">Add Classroom</button>
                                    </div>
                                    <div className="_classrooms_content">

                                        <div className="_classrooms_data">
                                            <table className="classrooms_list">
                                                <thead>
                                                    <tr>
                                                        <th>_code</th>
                                                        <th>_name</th>
                                                        <th>_grade</th>
                                                        <th>_section</th>
                                                        <th>_school</th>
                                                        <th>_teacher</th>
                                                        <th>_subjects</th>
                                                        <th>_students</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    _.orderBy(classrooms, ['createdAt'], ['desc']).map((classroom, index) => {
                                                        return (
                                                            <tr>
                                                                <td>{classroom._code}</td>
                                                                <td>{classroom._name}</td>
                                                                <td>{classroom._grade}</td>
                                                                <td>{classroom._section}</td>
                                                                <td>{classroom._school}</td>
                                                                <td>{classroom._teacher}</td>
                                                                <td>{_.size(classroom._subjects)}</td>
                                                                <td>{_.size(classroom._students)}</td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                                </tbody>
                                            </table>
                                        </div>
                                        <div id="_classrooms_data_indexes"></div>

                                    </div>
                                    <div className="_classroom_modal modal fade" id="_classroom_modal" tabIndex="-1" role="dialog" aria-labelledby="_classroom_modalLabel" aria-hidden="true">
                                        <div className="modal-dialog" role="document">
                                            <div className="modal-content">
                                                <div className="modal-body">
                                                    <a title="Close" className="modal-close" data-dismiss="modal">Close</a>
                                                    <h5 className="modal-title" id="_classroom_modalLabel">Voilà!</h5>
                                                    
                                                    <div className="wrapper_form_classroom">

                                                        <input
                                                        onChange={(ev) => this.handleChangeField('_code', ev)}
                                                        value={_code}
                                                        className="form-control my-3 _code_classroom"
                                                        placeholder="_code"
                                                        />

                                                        <input
                                                        onChange={(ev) => this.handleChangeField('_name', ev)}
                                                        value={_name}
                                                        className="form-control my-3 _name_classroom"
                                                        placeholder="_name"
                                                        />

                                                        <input
                                                        onChange={(ev) => this.handleChangeField('_grade', ev)}
                                                        value={_grade}
                                                        className="form-control my-3 _grade_classroom"
                                                        placeholder="_grade"
                                                        />

                                                        <input
                                                        onChange={(ev) => this.handleChangeField('_section', ev)}
                                                        value={_section}
                                                        className="form-control my-3 _section_classroom"
                                                        placeholder="_section"
                                                        />

                                                        <button onClick={this.handleSubmitClassroom} className="btn btn-primary float-right">Submit</button>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                                <div className="subjects_pane tab-pane" id="6a">
                                
                                </div>
                                <div className="courses_pane tab-pane" id="7a">
                                
                                </div>
                                <div className="homeworks_pane tab-pane" id="8a">
                                
                                </div>
                                <div className="reports_pane tab-pane" id="9a">
                                
                                </div>
                                <div className="exams_pane tab-pane" id="10a">
                                
                                </div>
                                <div className="blog_pane tab-pane" id="11a">
                                    
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
    onLoad: data => dispatch({ type: 'USER_PAGE_LOADED', data }),
	onSubmit: data => dispatch({ type: 'SUBMIT_CLASSROOM', data }),
});
  
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard) 
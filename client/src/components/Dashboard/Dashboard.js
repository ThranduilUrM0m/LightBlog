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
import API from '../../utils/API';
var _ = require('lodash');

class Dashboard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            _user: {},
            _classroom: {}
        };
        this.handleChangeField = this.handleChangeField.bind(this);
        this.handleSubmitArticle = this.handleSubmitArticle.bind(this);
        this.handleSubmitClassroom = this.handleSubmitClassroom.bind(this);
        this.handleSubmitCourse = this.handleSubmitCourse.bind(this);
        this.handleSubmitExam = this.handleSubmitExam.bind(this);
        this.handleSubmitHomework = this.handleSubmitHomework.bind(this);
        this.handleSubmitLetter = this.handleSubmitLetter.bind(this);
        this.handleSubmitReport = this.handleSubmitReport.bind(this);
        this.handleSubmitSchool = this.handleSubmitSchool.bind(this);
        this.handleSubmitStudent = this.handleSubmitStudent.bind(this);
        this.handleSubmitSubject = this.handleSubmitSubject.bind(this);
        this.get_user = this.get_user.bind(this);
    }
    componentDidMount() {
        this.get_user();
        this._handleTap();
        const {onLoadClassroom} = this.props;
        const self = this;
        axios('http://localhost:8000/api/classrooms')
        .then(function (response) {
            // handle success
            onLoadClassroom(response.data);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
        $('.nav_link').click((event) => {
            let _li_parent = $(event.target).parent().parent();
            let _li_target = $($(event.target).attr('href'));
            let _link_target = $(event.target);

            $(_li_parent).addClass('active');
            $(_li_target).addClass('active');
            $(_li_target).addClass('show');
            $(_link_target).addClass('active');
            $(_link_target).addClass('show');
            $(".nav li").not(_li_parent).removeClass('active');
            $('.tab-pane').not(_li_target).removeClass('active');
            $('.tab-pane').not(_li_target).removeClass('show');
            $(".nav_link").not(_link_target).removeClass('active');
            $('.nav_link').not(_link_target).removeClass('show');
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
        const { onSubmitClassroom, classroomToEdit } = this.props;
        const { _user } = this.state;
        const self = this;
        if(!classroomToEdit) {
            self.setState(prevState => ({
                _classroom: {                   // object that we want to update
                    ...prevState._classroom,    // keep all other key-value pairs
                    _school: _user.school,       // update the value of specific key
                    _teacher: _user._id,
                },
            }), () => {
                const { _code, _name, _grade, _section, _school, _teacher, _subjects, _students } = this.state._classroom;
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
                    .then((res) => onSubmitClassroom(res.data))
                    .then((res) => {
                        self.setState({ 
                            _classroom: {}
                        });
                        $('#_classroom_modal').modal('toggle');
                    });
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
                .then((res) => {
                    self.setState({ 
                        _classroom: {}
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
        const _val = event.target.value;
        const _target = event.target;
        if(key === "_code" || key === "_name" || key === "_grade" || key === "_section"){
            if(key === "_code") {
                this.setState(prevState => ({
                    _classroom: {                   // object that we want to update
                        ...prevState._classroom,    // keep all other key-value pairs
                        _code: _val       // update the value of specific key
                    }
                }));
            }
            if(key === "_name") {
                this.setState(prevState => ({
                    _classroom: {                   // object that we want to update
                        ...prevState._classroom,    // keep all other key-value pairs
                        _name: _val       // update the value of specific key
                    }
                }));
            }
            if(key === "_grade") {
                this.setState(prevState => ({
                    _classroom: {                   // object that we want to update
                        ...prevState._classroom,    // keep all other key-value pairs
                        _grade: _val       // update the value of specific key
                    }
                }));
            }
            if(key === "_section") {
                this.setState(prevState => ({
                    _classroom: {                   // object that we want to update
                        ...prevState._classroom,    // keep all other key-value pairs
                        _section: _val       // update the value of specific key
                    }
                }));
            }
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
        const { _classroom } = this.state;
        return(
            <FullPage scrollMode={'normal'}>
				<Slide>
					<section className="first_section_dashboard">
                        <div className="wrapper_full">
                            <ul className="nav nav-pills flex-column">
                                <li>
                                    <span className="_icon"><i className="fas fa-th-large"></i></span>
                                    <span className="item"><a href="#1a" className="nav_link active" data-toggle="tab">  Dashboards </a></span>
                                </li>
                                <li>
                                    <span className="_icon"><i className="fas fa-inbox"></i></span>
                                    <span className="item"><a href="#2a" className="nav_link" data-toggle="tab">  Inbox </a></span>
                                </li>
                                <li>
                                    <span className="_icon"><i className="fas fa-users"></i></span>
                                    <span className="item"><a href="#3a" className="nav_link" data-toggle="tab">  Students </a></span>
                                </li>
                                <li>
                                    <span className="_icon"><i className="fas fa-chalkboard"></i></span>
                                    <span className="item"><a href="#4a" className="nav_link" data-toggle="tab">  Classrooms </a></span>
                                </li>
                                <li>
                                    <span className="_icon"><i className="fas fa-book"></i></span>
                                    <span className="item"><a href="#5a" className="nav_link" data-toggle="tab">  Subjects </a></span>
                                </li>
                                <li>
                                    <span className="_icon"><i className="far fa-bookmark"></i></span>
                                    <span className="item"><a href="#6a" className="nav_link" data-toggle="tab">  Courses </a></span>
                                </li>
                                <li>
                                    <span className="_icon"><i className="far fa-copy"></i></span>
                                    <span className="item"><a href="#7a" className="nav_link" data-toggle="tab">  Homeworks </a></span>
                                </li>
                                <li>
                                    <span className="_icon"><i className="far fa-file-alt"></i></span>
                                    <span className="item"><a href="#8a" className="nav_link" data-toggle="tab">  Reports </a></span>
                                </li>
                                <li>
                                    <span className="_icon"><i className="fas fa-graduation-cap"></i></span>
                                    <span className="item"><a href="#9a" className="nav_link" data-toggle="tab">  Exams </a></span>
                                </li>
                            </ul>
                            <div className="tab-content clearfix">
                                <div className="dashboard_pane tab-pane active" id="1a">
                                    {/* <ul className="cards">
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
                                    </ul> */}
                                </div>
                                <div className="inbox_pane tab-pane" id="2a">
                                
                                </div>
                                <div className="students_pane tab-pane" id="3a">
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
                                <div className="classrooms_pane tab-pane" id="4a">
                                    <div className="_classroms_pane">
                                        <div className="_classrooms_header">
                                            <div className="_search_form">
                                                <div className="search-wrapper-name">
                                                    <input className="search-input-name" type="text" placeholder="Search"/>
                                                    <span></span>
                                                    <div className='search-name'></div>
                                                </div>
                                            </div>
                                            <div className="_filter_form">
                                                <button className="_filter btn-primary"><i className="fas fa-filter"></i>Filter</button>
                                                <button className="_add_classroom btn-primary" data-toggle="modal" data-target="#_classroom_modal"><i className="fas fa-plus"></i>Add Classroom</button>
                                            </div>
                                        </div>
                                        <div className="_classrooms_content">
                                            <div className="_classrooms_data">
                                                <table className="classrooms_list">
                                                    <thead>
                                                        <tr>
                                                            <th>Code</th>
                                                            <th>Name</th>
                                                            <th>Grade</th>
                                                            <th>Section</th>
                                                            <th>School</th>
                                                            <th>Teacher</th>
                                                            <th>Subjects</th>
                                                            <th>Students</th>
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
                                                                    <td>{classroom._school._name}</td>
                                                                    <td>{classroom._teacher.username}</td>
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
                                    </div>
                                    <div className="_classroom_modal modal fade" id="_classroom_modal" tabIndex="-1" role="dialog" aria-labelledby="_classroom_modalLabel" aria-hidden="true">
                                        <div className="modal-dialog" role="document">
                                            <div className="modal-content">
                                                <div className="modal-body">
                                                    <a title="Close" className="modal-close" data-dismiss="modal">Close</a>
                                                    <h5 className="modal-title" id="_classroom_modalLabel">OKAY!</h5>
                                                    <div className="wrapper_form_classroom">
                                                        <span>Classroom Information : </span>
                                                        <div className="modal-content_classroom">
                                                            <fieldset className="input-field form-group">
                                                                <input
                                                                onChange={(ev) => this.handleChangeField('_code', ev)}
                                                                value={_classroom._code}
                                                                className="validate form-group-input _code" 
                                                                id="_code"
                                                                type="text" 
                                                                name="_code" 
                                                                required="required"
                                                                />
                                                                <label htmlFor='_code' className={_classroom._code ? 'active' : ''}>Classroom Code</label>
                                                                <div className="form-group-line"></div>
                                                            </fieldset>
                                                            <fieldset className="input-field form-group">
                                                                <input
                                                                onChange={(ev) => this.handleChangeField('_name', ev)}
                                                                value={_classroom._name}
                                                                className="validate form-group-input _name" 
                                                                id="_name"
                                                                type="text" 
                                                                name="_name" 
                                                                required="required"
                                                                />
                                                                <label htmlFor='_name' className={_classroom._name ? 'active' : ''}>Classroom Name</label>
                                                                <div className="form-group-line"></div>
                                                            </fieldset>
                                                            <fieldset className="input-field form-group">
                                                                <input
                                                                onChange={(ev) => this.handleChangeField('_grade', ev)}
                                                                value={_classroom._grade}
                                                                className="validate form-group-input _grade" 
                                                                id="_grade"
                                                                type="text" 
                                                                name="_grade" 
                                                                required="required"
                                                                />
                                                                <label htmlFor='_grade' className={_classroom._grade ? 'active' : ''}>Grade</label>
                                                                <div className="form-group-line"></div>
                                                            </fieldset>
                                                            <fieldset className="input-field form-group">
                                                                <input
                                                                onChange={(ev) => this.handleChangeField('_section', ev)}
                                                                value={_classroom._section}
                                                                className="validate form-group-input _section" 
                                                                id="_section"
                                                                type="text" 
                                                                name="_section" 
                                                                required="required"
                                                                />
                                                                <label htmlFor='_section' className={_classroom._section ? 'active' : ''}>Section</label>
                                                                <div className="form-group-line"></div>
                                                            </fieldset>
                                                        </div>

                                                        <button onClick={this.handleSubmitClassroom} className="btn btn-primary float-right">Submit</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="subjects_pane tab-pane" id="5a">
                                
                                </div>
                                <div className="courses_pane tab-pane" id="6a">
                                
                                </div>
                                <div className="homeworks_pane tab-pane" id="7a">
                                
                                </div>
                                <div className="reports_pane tab-pane" id="8a">
                                
                                </div>
                                <div className="exams_pane tab-pane" id="9a">
                                
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
    classrooms: state.home.classrooms,
});

const mapDispatchToProps = dispatch => ({
    onLoadClassroom: data => dispatch({ type: 'CLASSROOM_PAGE_LOADED', data }),
    onSubmitClassroom: data => dispatch({ type: 'SUBMIT_CLASSROOM', data }),
});
  
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard) 
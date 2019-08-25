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
            _classroom: {},
            _student: {},
            _first_parent: {},
            _second_parent: {},
            _guardian: {},
            _school: {},
        };
        this.handleChangeField = this.handleChangeField.bind(this);

        /* CLASSROOM */
        this.handleSubmitClassroom = this.handleSubmitClassroom.bind(this);
        this.handleDeleteClassroom = this.handleDeleteClassroom.bind(this);
        this.handleEditClassroom = this.handleEditClassroom.bind(this);

        /* STUDENT */
        this.handleSubmitStudent = this.handleSubmitStudent.bind(this);
        this.handleDeleteStudent = this.handleDeleteStudent.bind(this);
        this.handleEditStudent = this.handleEditStudent.bind(this);
        
        this.get_user = this.get_user.bind(this);
    }
    componentDidMount() {
        const {onLoadClassroom, onLoadStudent} = this.props;
        const self = this;
        this.get_user();

        axios('http://localhost:8000/api/classrooms')
        .then((res) => onLoadClassroom(res.data))
        .then((res) => {
            $(function(){
                function createDemo(name){
                    var container = $('#pagination_' + name);
                    var options = {
                        dataSource: res.data.classrooms,
                        pageSize: 10,
                        autoHidePrevious: true,
                        autoHideNext: true,
                    };
                    container.pagination(options);
                      return container;
                }
                createDemo('classrooms');
            });
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });

        axios('http://localhost:8000/api/students')
        .then((res) => onLoadStudent(res.data))
        .then((res) => {
            $(function(){
                function createDemo(name){
                    var container = $('#pagination_' + name);
                    var options = {
                        dataSource: res.data.students,
                        pageSize: 10,
                        autoHidePrevious: true,
                        autoHideNext: true,
                    };
                    container.pagination(options);
                      return container;
                }
                createDemo('students');
            });
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });

        this._handleTap('_students');
        this._handleTap('_classrooms');
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

        this._handleSort('classrooms_list');
        this._handleSort('students_list');
        this._handleFilter()
        this._handleSteps('_student_box');

        $('input.datepicker').datepicker({
            dateFormat: 'yy-mm-dd',
            showButtonPanel: true,
            changeMonth: true,
            changeYear: true,
            defaultDate: +0,
            showAnim: "fold",
            onSelect: function(dateText) {
                if(($(this)[0].$el)[0].id === "_dateofbirth"){
                    self.setState(prevState => ({
                        _student: {                   // object that we want to update
                            ...prevState._student,    // keep all other key-value pairs
                            _dateofbirth: moment(dateText).format('MMM DD, YYYY')       // update the value of specific key
                        }
                    }));
                }
                if(($(this)[0].$el)[0].id === "_registration_date"){
                    self.setState(prevState => ({
                        _student: {                   // object that we want to update
                            ...prevState._student,    // keep all other key-value pairs
                            _registration_date: moment(dateText).format('MMM DD, YYYY')       // update the value of specific key
                        }
                    }));
                }
            },
        });
    
        $('.datepicker.sample').datepicker({
            dateFormat: 'yy-mm-dd',
            showButtonPanel: true,
            changeMonth: true,
            changeYear: true,
            defaultDate: +0,
            showAnim: "fold"
        });
    }
    _handleSteps(_class) {
        $('.next-button').click(function(){
            var current = $(this).parent();
            var next = $(this).parent().next();
            $(".progress li").eq($("."+_class+"").index(next)).addClass("active");
            current.hide();
            next.show();
        });
        $('.prev-button').click(function(){
            var current = $(this).parent();
            var prev = $(this).parent().prev()
            $(".progress li").eq($("."+_class+"").index(current)).removeClass("active");
            current.hide();
            prev.show();
        });
    }
    _handleFilter() {
        (function(document) {
            'use strict';
            var LightTableFilter = (function(Arr) {
                var _input;
                function _onInputEvent(e) {
                    _input = e.target;
                    var tables = document.getElementsByClassName(_input.getAttribute('data-table'));
                    Arr.forEach.call(tables, function(table) {
                        Arr.forEach.call(table.tBodies, function(tbody) {
                            Arr.forEach.call(tbody.rows, _filter);
                        });
                    });
                }
        
                function _filter(row) {
                    var text = row.textContent.toLowerCase(), val = _input.value.toLowerCase();
                    row.style.display = text.indexOf(val) === -1 ? 'none' : 'table-row';
                }
        
                return {
                    init: function() {
                        var inputs = document.getElementsByClassName('light-table-filter');
                        Arr.forEach.call(inputs, function(input) {
                            input.oninput = _onInputEvent;
                        });
                    }
                };
            })(Array.prototype);
            document.addEventListener('readystatechange', function() {
                if (document.readyState === 'complete') {
                    LightTableFilter.init();
                }
            });
        })(document);
    }
    _handleSort(_class) {
        // sort start
        function sortTable(f, n, i, _class) {
            $('._arrow').remove();
            $(i).append('<div class="_arrow"></div>');

            var rows = $("."+_class+" tbody tr").get();
            rows.sort(function(a, b) {
                var A = getVal(a);
                var B = getVal(b);
                if (A < B) {
                    return -1 * f;
                }
                if (A > B) {
                    return 1 * f;
                }
                return 0;
            });
            function getVal(elm) {
                var v = $(elm).children("td").eq(n).text().toUpperCase();
                if ($.isNumeric(v)) {
                    v = parseInt(v, 10);
                }
                return v;
            }
            $.each(rows, function(index, row) {
                $("."+_class+"").children("tbody").append(row);
            });

            if(getVal(_.first(rows)) < getVal(_.last(rows))){
                $('._arrow').html('<i class="fas fa-caret-down"></i>');
            }else {
                $('._arrow').html('<i class="fas fa-caret-up"></i>');
            }
        }
        var f_thisTh = 1;
        $("."+_class+" th:not(._empty)", this.id).click(function(event) {
            if(_.startsWith(event.target.className, 'fas')){
                f_thisTh *= -1;
                var n = $(this).parent().parent().prevAll().length;
                var i = event.target.parentNode.parentNode;
                sortTable(f_thisTh, n, i, _class);
            }
            else {
                f_thisTh *= -1;
                var n = $(this).prevAll().length;
                var i = event.target;
                sortTable(f_thisTh, n, i, _class);
            }
        });
        $('.'+_class+' th:not(._empty)').append('<div class="_arrow"></div>');
        $('._arrow').html('<i class="fas fa-sort"></i>');
        // sort end 
    }
    async get_user() {
        const self = this;
        try {
            const { data } = await API.get_user(localStorage.getItem('email'));
            self.setState( prevState => ({
                _user: data.user
            }), () => {
                axios(`http://localhost:8000/api/schools/${data.user.school}`)
                .then(function (response) {
                    // handle success
                    self.setState({
                        _school: response.data.school,
                    })
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                });
            });
        } catch (error) {
            console.error(error);
        }
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.classroomToEdit) {
            this.setState({
                _classroom: nextProps.classroomToEdit,
            })
        }
        if(nextProps.studentToEdit) {
            this.setState({
                _student: nextProps.studentToEdit,
            })
        }
    }

    /* CLASSROOM */
    handleSubmitClassroom(){
        const { _user } = this.state;
        this.setState(prevState => ({
            _classroom: {
                ...prevState._classroom,
                _school: _user.school,
                _teacher: _user._id,
            },
        }), () => {
            const { onSubmitClassroom, classroomToEdit, onEditClassroom } = this.props;
            const { _code, _name, _grade, _section, _school, _teacher, _subjects, _students } = this.state._classroom;
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
                    .then((res) => onSubmitClassroom(res.data))
                    .then(function() {
                        self.setState({ 
                            _classroom: {}
                        });
                        $('#_classroom_modal').modal('toggle');
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
                    .then((res) => onEditClassroom(res.data))
                    .then(function() {
                        self.setState({ 
                            _classroom: {}
                        });
                        $('#_classroom_modal').modal('toggle');
                    });
            }
        });
    }
    handleDeleteClassroom(id) {
        const { onDeleteClassroom } = this.props;
        return axios.delete(`http://localhost:8000/api/classrooms/${id}`)
            .then(() => onDeleteClassroom(id));
    }
    handleEditClassroom(classroom) {
        const { setEditClassroom } = this.props;
        setEditClassroom(classroom);
    }
    
    /* STUDENT */
    handleSubmitStudent(){
        const { _first_parent, _second_parent, _guardian } = this.state;
        this.setState(prevState => ({
            _student: {
                ...prevState._student,
                _first_parent: _first_parent,
                _second_parent: _second_parent,
                _guardian: _guardian,
            }
        }), () => {
            const { _user } = this.state;
            const { onSubmitStudent, studentToEdit, onEditStudent } = this.props;
            const { _registration_number, _first_name, _last_name, _classroom, _gender, _dateofbirth, _registration_date, _attendance, _first_parent, _second_parent, _guardian} = this.state._student;
            const self = this;
            if(!studentToEdit) {
                return axios.post('http://localhost:8000/api/students', {
                    _registration_number,
                    _first_name,
                    _last_name,
                    _classroom,
                    _gender,
                    _dateofbirth,
                    _registration_date,
                    _attendance,
                    _first_parent,
                    _second_parent,
                    _guardian,
                })
                    .then((res) => onSubmitStudent(res.data))
                    .then(function() {
                        self.setState({ 
                            _student: {}
                        });
                        $('#_student_modal').modal('toggle');
                    });
            } else {
                return axios.patch(`http://localhost:8000/api/students/${studentToEdit._id}`, {
                    _registration_number,
                    _first_name,
                    _last_name,
                    _classroom,
                    _gender,
                    _dateofbirth,
                    _registration_date,
                    _attendance,
                    _first_parent,
                    _second_parent,
                    _guardian,
                })
                    .then((res) => onEditStudent(res.data))
                    .then(function() {
                        self.setState({ 
                            _student: {}
                        });
                        $('#_student_modal').modal('toggle');
                    });
            }
        });
    }
    handleDeleteStudent(id) {
        const { onDeleteStudent } = this.props;
        return axios.delete(`http://localhost:8000/api/students/${id}`)
            .then(() => onDeleteStudent(id));
    }
    handleEditStudent(student) {
        const { setEditStudent } = this.props;
        setEditStudent(student);
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
        if(key === "_registration_number" || key === "_first_name" || key === "_last_name" || key === "_classroom" || key === "_gender" || key === "_dateofbirth" || key === "_registration_date" || _.endsWith(key, "_first_parent") || _.endsWith(key, "_second_parent") || _.endsWith(key, "_guardian")) {
            if(key === "_registration_number"){
                this.setState(prevState => ({
                    _student: {                   // object that we want to update
                        ...prevState._student,    // keep all other key-value pairs
                        _registration_number: _val       // update the value of specific key
                    }
                }));
            }
            if(key === "_first_name"){
                this.setState(prevState => ({
                    _student: {                   // object that we want to update
                        ...prevState._student,    // keep all other key-value pairs
                        _first_name: _val       // update the value of specific key
                    }
                }));
            }
            if(key === "_last_name"){
                this.setState(prevState => ({
                    _student: {                   // object that we want to update
                        ...prevState._student,    // keep all other key-value pairs
                        _last_name: _val       // update the value of specific key
                    }
                }));
            }
            if(key === "_gender"){
                this.setState(prevState => ({
                    _student: {                   // object that we want to update
                        ...prevState._student,    // keep all other key-value pairs
                        _gender: _val       // update the value of specific key
                    }
                }));
            }
            
            if(key === "_classroom") {
                this.setState(prevState => ({
                    _student: {                   // object that we want to update
                        ...prevState._student,    // keep all other key-value pairs
                        _classroom: _val       // update the value of specific key
                    }
                }));
            }

            if(key === "_full_name_first_parent"){
                this.setState(prevState => ({
                    _first_parent: {                   // object that we want to update
                        ...prevState._first_parent,    // keep all other key-value pairs
                        _full_name_first_parent: _val       // update the value of specific key
                    }
                }));
            }
            if(key === "_gender_first_parent"){
                this.setState(prevState => ({
                    _first_parent: {                   // object that we want to update
                        ...prevState._first_parent,    // keep all other key-value pairs
                        _gender_first_parent: _val       // update the value of specific key
                    }
                }));
            }
            if(key === "_adresse_first_parent"){
                this.setState(prevState => ({
                    _first_parent: {                   // object that we want to update
                        ...prevState._first_parent,    // keep all other key-value pairs
                        _adresse_first_parent: _val       // update the value of specific key
                    }
                }));
            }
            if(key === "_phone_first_parent"){
                this.setState(prevState => ({
                    _first_parent: {                   // object that we want to update
                        ...prevState._first_parent,    // keep all other key-value pairs
                        _phone_first_parent: _val       // update the value of specific key
                    }
                }));
            }

            if(key === "_full_name_second_parent"){
                this.setState(prevState => ({
                    _second_parent: {                   // object that we want to update
                        ...prevState._second_parent,    // keep all other key-value pairs
                        _full_name_second_parent: _val       // update the value of specific key
                    }
                }));
            }
            if(key === "_gender_second_parent"){
                this.setState(prevState => ({
                    _second_parent: {                   // object that we want to update
                        ...prevState._second_parent,    // keep all other key-value pairs
                        _gender_second_parent: _val       // update the value of specific key
                    }
                }));
            }
            if(key === "_adresse_second_parent"){
                this.setState(prevState => ({
                    _second_parent: {                   // object that we want to update
                        ...prevState._second_parent,    // keep all other key-value pairs
                        _adresse_second_parent: _val       // update the value of specific key
                    }
                }));
            }
            if(key === "_phone_second_parent"){
                this.setState(prevState => ({
                    _second_parent: {                   // object that we want to update
                        ...prevState._second_parent,    // keep all other key-value pairs
                        _phone_second_parent: _val       // update the value of specific key
                    }
                }));
            }

            if(key === "_full_name_guardian"){
                this.setState(prevState => ({
                    _guardian: {                   // object that we want to update
                        ...prevState._guardian,    // keep all other key-value pairs
                        _full_name_guardian: _val       // update the value of specific key
                    }
                }));
            }
            if(key === "_gender_guardian"){
                this.setState(prevState => ({
                    _guardian: {                   // object that we want to update
                        ...prevState._guardian,    // keep all other key-value pairs
                        _gender_guardian: _val       // update the value of specific key
                    }
                }));
            }
            if(key === "_adresse_guardian"){
                this.setState(prevState => ({
                    _guardian: {                   // object that we want to update
                        ...prevState._guardian,    // keep all other key-value pairs
                        _adresse_guardian: _val       // update the value of specific key
                    }
                }));
            }
            if(key === "_phone_guardian"){
                this.setState(prevState => ({
                    _guardian: {                   // object that we want to update
                        ...prevState._guardian,    // keep all other key-value pairs
                        _phone_guardian: _val       // update the value of specific key
                    }
                }));
            }
        }
    }
    _handleTap(_class) {
        let searchWrapper_name = document.querySelector('.search-wrapper-name'+_class),
            searchInput_name = document.querySelector('.search-input-name'+_class),
            searchIcon_name = document.querySelector('.search-name'+_class),
            searchActivated_name = false;

        $('.search-name'+_class).click(() => {
            if (!searchActivated_name) {
                $('._search_form'+_class).addClass('_opened');
                searchWrapper_name.classList.add('focused');
                searchIcon_name.classList.add('active');
                searchInput_name.focus();
                searchActivated_name = !searchActivated_name;
            } else {
                $('._search_form'+_class).removeClass('_opened');
                searchWrapper_name.classList.remove('focused');
                searchIcon_name.classList.remove('active');
                searchActivated_name = !searchActivated_name;
            }
        });
    }
    render() {
        const { articles, classrooms, classroomToEdit, courses, exams, homeworks, letters, reports, schools, students, studentToEdit, subjects, user } = this.props;
        const { _classroom, _user, _school, _student, _first_parent, _second_parent, _guardian } = this.state;
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
                                    <div className="_students_pane">
                                        <div className="_students_header">
                                            <div className="_search_form_students">
                                                <div className="search-wrapper-name_students">
                                                    <input className="search-input-name_students light-table-filter" type="search" data-table="students_list" placeholder="Search"/>
                                                    <span></span>
                                                    <div className='search-name_students'></div>
                                                </div>
                                            </div>
                                            <div className="_filter_form">
                                                <button className="_add_student btn-primary" data-toggle="modal" data-target="#_student_modal"><i className="fas fa-plus"></i>Add Student</button>
                                            </div>
                                        </div>
                                        <div className="_students_content">
                                            <div className="_students_data">
                                                <table className="students_list table table-striped">
                                                    <thead>
                                                        <tr className="students_list_header">
                                                            <th>Reg Number</th>
                                                            <th>Reg Date</th>
                                                            <th>Classroom</th>
                                                            <th>Full Name</th>
                                                            <th>Birthday</th>
                                                            <th>Gender</th>
                                                            <th>Attendance</th>
                                                            <th>First Parent</th>
                                                            <th>Second Parent</th>
                                                            <th>Guardian</th>
                                                            <th className="_empty"></th>
                                                            <th className="_empty"></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="data-container">
                                                    {
                                                        _.orderBy(students, ['createdAt'], ['desc']).map((student, index) => {
                                                            return (
                                                                <tr>
                                                                    <td>{student._registration_number}</td>
                                                                    <td>{moment(student._registration_date).format('MMM DD, YYYY')}</td>
                                                                    <td>{_.get(_.find(classrooms, {'_id': student._classroom}), '_code')}</td>
                                                                    <td>{student._first_name} {student._last_name}</td>
                                                                    <td>{moment(student._dateofbirth).format('MMM DD, YYYY')}</td>
                                                                    <td>{student._gender}</td>
                                                                    <td>{/* student._attendance */}</td>
                                                                    <td>{student._first_parent._full_name_first_parent}</td>
                                                                    <td>{student._second_parent._full_name_second_parent}</td>
                                                                    <td>{student._guardian._full_name_guardian}</td>
                                                                    <td className="dropdown">
                                                                        <span className="dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                            <i className="fas fa-ellipsis-h"></i>
                                                                        </span>
                                                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                            <a className="dropdown-item" href="" data-toggle="modal" data-target="#_student_modal" onClick={() => this.handleEditStudent(student)}>Edit Student {student._code}</a>
                                                                            <a className="dropdown-item" href="" onClick={() => this.handleDeleteStudent(student._id)}>Delete Student {student._code}</a>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                    </tbody>
                                                    <tfoot id="pagination_students"></tfoot>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="_student_modal modal fade" id="_student_modal" tabIndex="-1" role="dialog" aria-labelledby="_student_modalLabel" aria-hidden="true">
                                        <div className="modal-dialog" role="document">
                                            <div className="modal-content">
                                                <div className="modal-body">
                                                    <div className="_top_shelf">
                                                        <ul className='progress'>
                                                            <li className="active"></li>
                                                            <li></li>
                                                            <li></li>
                                                            <li></li>
                                                            <li></li>
                                                        </ul>
                                                        <a title="Close" className="modal-close" data-dismiss="modal">Close</a>
                                                    </div>
                                                    <h5 className="modal-title" id="_student_modalLabel">OKAY!</h5>
                                                    <div className="wrapper_form_student">
                                                        <div className="_student_box modal-body-step-1 is-showing">
                                                            <span>Student Registration Information : </span>
                                                            <div className="modal-content_student">
                                                                <fieldset className="input-field form-group">
                                                                    <input
                                                                    onChange={(ev) => this.handleChangeField('_registration_number', ev)}
                                                                    value={_student._registration_number}
                                                                    className="validate form-group-input _registration_number" 
                                                                    id="_registration_number"
                                                                    type="text" 
                                                                    name="_registration_number" 
                                                                    required="required"
                                                                    />
                                                                    <label htmlFor='_registration_number' className={_student._registration_number ? 'active' : ''}>Student _registration_number</label>
                                                                    <div className="form-group-line"></div>
                                                                </fieldset>
                                                                <fieldset className="input-field form-group">
                                                                    <input
                                                                    onChange={(ev) => this.handleChangeField('_registration_date', ev)}
                                                                    value={_student._registration_date}
                                                                    className="validate datepicker form-group-input _registration_date" 
                                                                    id="_registration_date"
                                                                    type="text" 
                                                                    name="_registration_date" 
                                                                    required="required"
                                                                    />
                                                                    <label htmlFor='_registration_date' className={_student._registration_date ? 'active' : ''}>Student _registration_date</label>
                                                                    <div className="form-group-line"></div>
                                                                    <div className="datepicker sample"></div>
                                                                </fieldset>
                                                                <fieldset className="input-field form-group">
                                                                    <select 
                                                                    onChange={(ev) => this.handleChangeField('_classroom', ev)}
                                                                    value={_student._classroom}
                                                                    className="validate form-group-input _classroom" 
                                                                    id="_classroom"
                                                                    name="_classroom" 
                                                                    required="required"
                                                                    >
                                                                        <option hidden disabled selected value></option>
                                                                        {
                                                                            _.orderBy(classrooms, ['createdAt'], ['desc']).map((classroom, index) => {
                                                                                return (
                                                                                    <option value={classroom._id}>{classroom._code}</option>
                                                                                )
                                                                            })
                                                                        }
                                                                    </select>
                                                                    <label htmlFor='_classroom' className={_student._classroom ? 'active' : ''}>_classroom</label>
                                                                    <div className="form-group-line"></div>
                                                                </fieldset>
                                                            </div>
                                                            <input type='button' name='next' className='next-button custom-button' value="Next"></input>
                                                        </div>

                                                        <div className="_student_box modal-body-step-2">
                                                            <span>Student Personal Information</span>
                                                            <div className="modal-content_student">
                                                                <fieldset className="input-field form-group">
                                                                    <input
                                                                    onChange={(ev) => this.handleChangeField('_first_name', ev)}
                                                                    value={_student._first_name}
                                                                    className="validate form-group-input _first_name" 
                                                                    id="_first_name"
                                                                    type="text" 
                                                                    name="_first_name" 
                                                                    required="required"
                                                                    />
                                                                    <label htmlFor='_first_name' className={_student._first_name ? 'active' : ''}>_first_name</label>
                                                                    <div className="form-group-line"></div>
                                                                </fieldset>
                                                                <fieldset className="input-field form-group">
                                                                    <input
                                                                    onChange={(ev) => this.handleChangeField('_last_name', ev)}
                                                                    value={_student._last_name}
                                                                    className="validate form-group-input _last_name" 
                                                                    id="_last_name"
                                                                    type="text" 
                                                                    name="_last_name" 
                                                                    required="required"
                                                                    />
                                                                    <label htmlFor='_last_name' className={_student._last_name ? 'active' : ''}>_last_name</label>
                                                                    <div className="form-group-line"></div>
                                                                </fieldset>
                                                                <fieldset className="input-field form-group">
                                                                    <input
                                                                    onChange={(ev) => this.handleChangeField('_dateofbirth', ev)}
                                                                    value={_student._dateofbirth}
                                                                    className="validate datepicker form-group-input _dateofbirth" 
                                                                    id="_dateofbirth"
                                                                    type="text" 
                                                                    name="_dateofbirth" 
                                                                    required="required"
                                                                    />
                                                                    <label htmlFor='_dateofbirth' className={_student._dateofbirth ? 'active' : ''}>_dateofbirth</label>
                                                                    <div className="form-group-line"></div>
                                                                </fieldset>
                                                                <fieldset className="input-field form-group">
                                                                    <select 
                                                                    onChange={(ev) => this.handleChangeField('_gender', ev)}
                                                                    value={_student._gender}
                                                                    className="validate form-group-input _gender" 
                                                                    id="_gender"
                                                                    name="_gender" 
                                                                    required="required"
                                                                    >
                                                                        <option hidden disabled selected value></option>
                                                                        {
                                                                            ['Mr.', 'Mrs.', 'Ms.', 'Other'].map((g, index) => {
                                                                                return (
                                                                                    <option value={g}>{g}</option>
                                                                                )
                                                                            })
                                                                        }
                                                                    </select>
                                                                    <label htmlFor='_gender' className={_student._gender ? 'active' : ''}>_gender</label>
                                                                    <div className="form-group-line"></div>
                                                                </fieldset>
                                                            </div>
                                                            <input type='button' name='next' className='next-button custom-button' value="Next"></input>
                                                            <input type='button' name='previous' className='prev-button custom-button' value="Back"></input>
                                                        </div>

                                                        <div className="_student_box modal-body-step-3">
                                                            <span>First Parent Information : </span>
                                                            <div className="modal-content_student">
                                                                <fieldset className="input-field form-group">
                                                                    <input
                                                                    onChange={(ev) => this.handleChangeField('_full_name_first_parent', ev)}
                                                                    value={_first_parent._full_name_first_parent}
                                                                    className="validate form-group-input _full_name_first_parent" 
                                                                    id="_full_name_first_parent"
                                                                    type="text" 
                                                                    name="_full_name_first_parent" 
                                                                    required="required"
                                                                    />
                                                                    <label htmlFor='_full_name_first_parent' className={_first_parent._full_name_first_parent ? 'active' : ''}>_full_name_first_parent</label>
                                                                    <div className="form-group-line"></div>
                                                                </fieldset>
                                                                <fieldset className="input-field form-group">
                                                                    <select 
                                                                    onChange={(ev) => this.handleChangeField('_gender_first_parent', ev)}
                                                                    value={_first_parent._gender_first_parent}
                                                                    className="validate form-group-input _gender_first_parent" 
                                                                    id="_gender_first_parent"
                                                                    name="_gender_first_parent" 
                                                                    required="required"
                                                                    >
                                                                        <option hidden disabled selected value></option>
                                                                        {
                                                                            ['Mr.', 'Mrs.', 'Ms.', 'Other'].map((g, index) => {
                                                                                return (
                                                                                    <option value={g}>{g}</option>
                                                                                )
                                                                            })
                                                                        }
                                                                    </select>
                                                                    <label htmlFor='_gender_first_parent' className={_first_parent._gender_first_parent ? 'active' : ''}>_gender_first_parent</label>
                                                                    <div className="form-group-line"></div>
                                                                </fieldset>
                                                                <fieldset className="input-field form-group">
                                                                    <input
                                                                    onChange={(ev) => this.handleChangeField('_adresse_first_parent', ev)}
                                                                    value={_first_parent._adresse_first_parent}
                                                                    className="validate form-group-input _adresse_first_parent" 
                                                                    id="_adresse_first_parent"
                                                                    type="text" 
                                                                    name="_adresse_first_parent" 
                                                                    required="required"
                                                                    />
                                                                    <label htmlFor='_adresse_first_parent' className={_first_parent._adresse_first_parent ? 'active' : ''}>_adresse_first_parent</label>
                                                                    <div className="form-group-line"></div>
                                                                </fieldset>
                                                                <fieldset className="input-field form-group">
                                                                    <input
                                                                    onChange={(ev) => this.handleChangeField('_phone_first_parent', ev)}
                                                                    value={_first_parent._phone_first_parent}
                                                                    className="validate form-group-input _phone_first_parent" 
                                                                    id="_phone_first_parent"
                                                                    type="text" 
                                                                    name="_phone_first_parent" 
                                                                    required="required"
                                                                    />
                                                                    <label htmlFor='_phone_first_parent' className={_first_parent._phone_first_parent ? 'active' : ''}>_phone_first_parent</label>
                                                                    <div className="form-group-line"></div>
                                                                </fieldset>
                                                            </div>
                                                            <input type='button' name='next' className='next-button custom-button' value="Next"></input>
                                                            <input type='button' name='previous' className='prev-button custom-button' value="Back"></input>
                                                        </div>

                                                        <div className="_student_box modal-body-step-4">
                                                            <span>Second Parent Information : </span>
                                                            <div className="modal-content_student">
                                                                <fieldset className="input-field form-group">
                                                                    <input
                                                                    onChange={(ev) => this.handleChangeField('_full_name_second_parent', ev)}
                                                                    value={_second_parent._full_name_second_parent}
                                                                    className="validate form-group-input _full_name_second_parent" 
                                                                    id="_full_name_second_parent"
                                                                    type="text" 
                                                                    name="_full_name_second_parent" 
                                                                    required="required"
                                                                    />
                                                                    <label htmlFor='_full_name_second_parent' className={_second_parent._full_name_second_parent ? 'active' : ''}>_full_name_second_parent</label>
                                                                    <div className="form-group-line"></div>
                                                                </fieldset>
                                                                <fieldset className="input-field form-group">
                                                                    <select 
                                                                    onChange={(ev) => this.handleChangeField('_gender_second_parent', ev)}
                                                                    value={_second_parent._gender_second_parent}
                                                                    className="validate form-group-input _gender_second_parent" 
                                                                    id="_gender_second_parent"
                                                                    name="_gender_second_parent" 
                                                                    required="required"
                                                                    >
                                                                        <option hidden disabled selected value></option>
                                                                        {
                                                                            ['Mr.', 'Mrs.', 'Ms.', 'Other'].map((g, index) => {
                                                                                return (
                                                                                    <option value={g}>{g}</option>
                                                                                )
                                                                            })
                                                                        }
                                                                    </select>
                                                                    <label htmlFor='_gender_second_parent' className={_second_parent._gender_second_parent ? 'active' : ''}>_gender_second_parent</label>
                                                                    <div className="form-group-line"></div>
                                                                </fieldset>
                                                                <fieldset className="input-field form-group">
                                                                    <input
                                                                    onChange={(ev) => this.handleChangeField('_adresse_second_parent', ev)}
                                                                    value={_second_parent._adresse_second_parent}
                                                                    className="validate form-group-input _adresse_second_parent" 
                                                                    id="_adresse_second_parent"
                                                                    type="text" 
                                                                    name="_adresse_second_parent" 
                                                                    required="required"
                                                                    />
                                                                    <label htmlFor='_adresse_second_parent' className={_second_parent._adresse_second_parent ? 'active' : ''}>_adresse_second_parent</label>
                                                                    <div className="form-group-line"></div>
                                                                </fieldset>
                                                                <fieldset className="input-field form-group">
                                                                    <input
                                                                    onChange={(ev) => this.handleChangeField('_phone_second_parent', ev)}
                                                                    value={_second_parent._phone_second_parent}
                                                                    className="validate form-group-input _phone_second_parent" 
                                                                    id="_phone_second_parent"
                                                                    type="text" 
                                                                    name="_phone_second_parent" 
                                                                    required="required"
                                                                    />
                                                                    <label htmlFor='_phone_second_parent' className={_second_parent._phone_second_parent ? 'active' : ''}>_phone_second_parent</label>
                                                                    <div className="form-group-line"></div>
                                                                </fieldset>
                                                            </div>
                                                            <input type='button' name='next' className='next-button custom-button' value="Next"></input>
                                                            <input type='button' name='previous' className='prev-button custom-button' value="Back"></input>
                                                        </div>

                                                        <div className="_student_box modal-body-step-5">
                                                            <span>Guardian Information : </span>
                                                            <div className="modal-content_student">
                                                                <fieldset className="input-field form-group">
                                                                    <input
                                                                    onChange={(ev) => this.handleChangeField('_full_name_guardian', ev)}
                                                                    value={_guardian._full_name_guardian}
                                                                    className="validate form-group-input _full_name_guardian" 
                                                                    id="_full_name_guardian"
                                                                    type="text" 
                                                                    name="_full_name_guardian" 
                                                                    required="required"
                                                                    />
                                                                    <label htmlFor='_full_name_guardian' className={_guardian._full_name_guardian ? 'active' : ''}>_full_name_guardian</label>
                                                                    <div className="form-group-line"></div>
                                                                </fieldset>
                                                                <fieldset className="input-field form-group">
                                                                    <select 
                                                                    onChange={(ev) => this.handleChangeField('_gender_guardian', ev)}
                                                                    value={_guardian._gender_guardian}
                                                                    className="validate form-group-input _gender_guardian" 
                                                                    id="_gender_guardian"
                                                                    name="_gender_guardian" 
                                                                    required="required"
                                                                    >
                                                                        <option hidden disabled selected value></option>
                                                                        {
                                                                            ['Mr.', 'Mrs.', 'Ms.', 'Other'].map((g, index) => {
                                                                                return (
                                                                                    <option value={g}>{g}</option>
                                                                                )
                                                                            })
                                                                        }
                                                                    </select>
                                                                    <label htmlFor='_gender_guardian' className={_guardian._gender_guardian ? 'active' : ''}>_gender_guardian</label>
                                                                    <div className="form-group-line"></div>
                                                                </fieldset>
                                                                <fieldset className="input-field form-group">
                                                                    <input
                                                                    onChange={(ev) => this.handleChangeField('_adresse_guardian', ev)}
                                                                    value={_guardian._adresse_guardian}
                                                                    className="validate form-group-input _adresse_guardian" 
                                                                    id="_adresse_guardian"
                                                                    type="text" 
                                                                    name="_adresse_guardian" 
                                                                    required="required"
                                                                    />
                                                                    <label htmlFor='_adresse_guardian' className={_guardian._adresse_guardian ? 'active' : ''}>_adresse_guardian</label>
                                                                    <div className="form-group-line"></div>
                                                                </fieldset>
                                                                <fieldset className="input-field form-group">
                                                                    <input
                                                                    onChange={(ev) => this.handleChangeField('_phone_guardian', ev)}
                                                                    value={_guardian._phone_guardian}
                                                                    className="validate form-group-input _phone_guardian" 
                                                                    id="_phone_guardian"
                                                                    type="text" 
                                                                    name="_phone_guardian" 
                                                                    required="required"
                                                                    />
                                                                    <label htmlFor='_phone_guardian' className={_guardian._phone_guardian ? 'active' : ''}>_phone_guardian</label>
                                                                    <div className="form-group-line"></div>
                                                                </fieldset>
                                                            </div>
                                                            <button onClick={this.handleSubmitStudent} className="btn btn-primary float-right">{studentToEdit ? 'Update' : 'Submit'}</button>
                                                            <input type='button' name='previous' className='prev-button custom-button' value="Back"></input>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="classrooms_pane tab-pane" id="4a">
                                    <div className="_classrooms_pane">
                                        <div className="_classrooms_header">
                                            <div className="_search_form_classrooms">
                                                <div className="search-wrapper-name_classrooms">
                                                    <input className="search-input-name_classrooms light-table-filter" type="search" data-table="classrooms_list" placeholder="Search"/>
                                                    <span></span>
                                                    <div className='search-name_classrooms'></div>
                                                </div>
                                            </div>
                                            <div className="_filter_form">
                                                <button className="_add_classroom btn-primary" data-toggle="modal" data-target="#_classroom_modal"><i className="fas fa-plus"></i>Add Classroom</button>
                                            </div>
                                        </div>
                                        <div className="_classrooms_content">
                                            <div className="_classrooms_data">
                                                <table className="classrooms_list table table-striped">
                                                    <thead>
                                                        <tr className="classrooms_list_header">
                                                            <th>Code</th>
                                                            <th>Name</th>
                                                            <th>Grade</th>
                                                            <th>Section</th>
                                                            <th>School</th>
                                                            <th>Teacher</th>
                                                            <th>Subjects</th>
                                                            <th>Students</th>
                                                            <th className="_empty"></th>
                                                            <th className="_empty"></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="data-container">
                                                    {
                                                        _.orderBy(classrooms, ['createdAt'], ['desc']).map((classroom, index) => {
                                                            return (
                                                                <tr>
                                                                    <td>{classroom._code}</td>
                                                                    <td>{classroom._name}</td>
                                                                    <td>{classroom._grade}</td>
                                                                    <td>{classroom._section}</td>
                                                                    <td>{_school._name}</td>
                                                                    <td>{classroom._teacher === _user._id ? _user.firstname+' '+_user.lastname : ''}</td>
                                                                    <td>{_.size(classroom._subjects)}</td>
                                                                    <td>{_.size(classroom._students)}</td>
                                                                    <td className="dropdown">
                                                                        <span className="dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                            <i className="fas fa-ellipsis-h"></i>
                                                                        </span>
                                                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                            <a className="dropdown-item" href="" data-toggle="modal" data-target="#_classroom_modal" onClick={() => this.handleEditClassroom(classroom)}>Edit Classroom {classroom._code}</a>
                                                                            <a className="dropdown-item" href="" onClick={() => this.handleDeleteClassroom(classroom._id)}>Delete Classroom {classroom._code}</a>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                    </tbody>
                                                    <tfoot id="pagination_classrooms"></tfoot>
                                                </table>
                                            </div>
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
                                                        <button onClick={this.handleSubmitClassroom} className="btn btn-primary float-right">{classroomToEdit ? 'Update' : 'Submit'}</button>
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
    classroomToEdit: state.home.classroomToEdit,

    students: state.home.students,
    studentToEdit: state.home.studentToEdit,
});

const mapDispatchToProps = dispatch => ({
    onLoadClassroom: data => dispatch({ type: 'CLASSROOM_PAGE_LOADED', data }),
    onSubmitClassroom: data => dispatch({ type: 'SUBMIT_CLASSROOM', data }),
    onEditClassroom: data => dispatch({ type: 'EDIT_CLASSROOM', data }),
    onDeleteClassroom: id => dispatch({ type : 'DELETE_CLASSROOM', id }),
    setEditClassroom: classroom => dispatch({ type: 'SET_EDIT_CLASSROOM', classroom }),

    onLoadStudent: data => dispatch({ type: 'STUDENT_PAGE_LOADED', data }),
    onSubmitStudent: data => dispatch({ type: 'SUBMIT_STUDENT', data }),
    onEditStudent: data => dispatch({ type: 'EDIT_STUDENT', data }),
    onDeleteStudent: id => dispatch({ type : 'DELETE_STUDENT', id }),
    setEditStudent: student => dispatch({ type: 'SET_EDIT_STUDENT', student }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard) 
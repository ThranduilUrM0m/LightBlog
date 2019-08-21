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
const passwordHash = require('password-hash');
var _ = require('lodash');

class Settings extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            _user: {},
            _new_password: '',
            _old_email: '',
        };
        this.handleChangeField = this.handleChangeField.bind(this);

        this.get_user = this.get_user.bind(this);
        this.send_user = this.send_user.bind(this);

        this._handleTap = this._handleTap.bind(this);
        this._progress = this._progress.bind(this);
    }
    componentDidMount() {
        this.get_user();

        this._handleTap();
        document.getElementById('settings_blog').parentElement.style.height = 'initial';
        $('.nav_link').click((event) => {
            let _li_parent = $(event.target).parent().parent();
            let _li_target = $($(event.target).attr('href'));

            $(_li_parent).addClass('active');
            $(_li_target).addClass('active');
            $(_li_target).addClass('show');
            $("._content li").not(_li_parent).removeClass('active');
            $('.tab-pane').not(_li_target).removeClass('active');
            $('.tab-pane').not(_li_target).removeClass('show');
        });
    }
    
    async get_user() {
        const self = this;
        try {
            const { data } = await API.get_user(localStorage.getItem('email'));
            self.setState({
                _user: data.user,
                _old_email: data.user.email
            });
        } catch (error) {
            console.error(error);
        }
    }
    async send_user() {
        const { onEdit } = this.props;
        const { _user, _new_password, _old_email } = this.state;
        const self = this;
        if (!_user.username || _user.username.length === 0) return;
        if (!_user.email || _user.email.length === 0) return;
        if (!_user.password || _user.password.length === 0) return;
        try {
            const { data } = await API.update({ _user, _new_password, _old_email });
            location.reload();
        } catch (error) {
            console.error(error);
        }
    }

    handleChangeField(key, event) {
        const _val = event.target.value;
        if(key === "email" || key === "username" || key === "_new_password" || key === "firstname" || key === "lastname" || key === "whoami"){
            if(key === "email") {
                this.setState(prevState => ({
                    _user: {                   // object that we want to update
                        ...prevState._user,    // keep all other key-value pairs
                        email: _val       // update the value of specific key
                    }
                }));
            }
            if(key === "username") {
                this.setState(prevState => ({
                    _user: {                   // object that we want to update
                        ...prevState._user,    // keep all other key-value pairs
                        username: _val       // update the value of specific key
                    }
                }));
            }
            if(key === "_new_password") {
                this.setState(prevState => ({
                    _user: {                   // object that we want to update
                        ...prevState._user,    // keep all other key-value pairs
                        password: _val       // update the value of specific key
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
            if(key === "whoami") {
                this.setState(prevState => ({
                    _user: {                   // object that we want to update
                        ...prevState._user,    // keep all other key-value pairs
                        whoami: _val       // update the value of specific key
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
    _progress(user) {
        function percentage(partialValue, totalValue) {
            return (100 * partialValue) / totalValue;
        }

        var count = 0;
        let total = 0;
        Object.keys(user).forEach(function(key,index) {
            if(key !== '_id' && key !== 'activated' && key !== 'messages' && key !== 'createdAt' && key !== 'updatedAt' && key !== '__v'){
                total += 1;
                count += (!user[key] ? 0 : 1);
            }
        });

        $('.bar').width(_.ceil(percentage(count, total), 0)+'%');
        return _.ceil(percentage(count, total), 0);
    }
    _progress_total(user) {
        var count = 0;
        Object.keys(user).forEach(function(key,index) {
            if(key !== '_id' && key !== 'activated' && key !== 'messages' && key !== 'createdAt' && key !== 'updatedAt' && key !== '__v')
                count += 1;
        });
        return _.ceil(count, 0);
    }
    render() {
        const { articles, classrooms, courses, exams, homeworks, letters, reports, schools, students, subjects, user } = this.props;
        const { _user, _new_password } = this.state;
        return(
            <FullPage scrollMode={'normal'}>
				<Slide>
					<section id='settings_blog' className="first_section_settings">
                        <div className="wrapper_full">
                            <div className="bs-example bs-example-modal" data-example-id="static-modal">
                                <div className="modal" role="dialog" tabIndex="-1">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-body">
                                                <div className="_header">
                                                    <nav aria-label="breadcrumb">
                                                        <ol className="breadcrumb">
                                                            <li className="breadcrumb-item"><a href="/dashboard">Profil</a></li>
                                                            <li className="breadcrumb-item active" aria-current="page">{!_user.firstname ? _user.username : _user.firstname+' '+_user.lastname}</li>
                                                        </ol>
                                                    </nav>
                                                    <span>Edit your name, username, email, ...</span>
                                                </div>
                                                <div className="_content">
                                                    <ul className="nav nav-tabs flex-column">
                                                        <li className="active">
                                                            <i className="fas fa-user-cog"></i>
                                                            <span className="item"><a href="#1a" className="nav_link" data-toggle="tab">  Personal Information </a></span>
                                                        </li>
                                                        <li>
                                                            <i className="fas fa-users-cog"></i>
                                                            <span className="item"><a href="#2a" className="nav_link" data-toggle="tab">  {_user.whoami != "teacher" || _user.whoami != "principal" ? 'Are you Staff' : 'Change status'} </a></span>
                                                        </li>
                                                    </ul>
                                                    <div className="tab-content clearfix">
                                                        <div className="personalData_pane tab-pane active" id="1a">
                                                            <span>Personal Information : </span>
                                                            <div className="modal-content_user">

                                                                <fieldset className="input-field form-group">
                                                                    <input
                                                                    onChange={(ev) => this.handleChangeField('username', ev)}
                                                                    value={_user.username}
                                                                    className="validate form-group-input username" 
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

                                                            </div>
                                                            <span>Contact Information : </span>
                                                            <div className="modal-content_user">

                                                                <fieldset className="input-field form-group">
                                                                    <input
                                                                    onChange={(ev) => this.handleChangeField('email', ev)}
                                                                    value={_user.email}
                                                                    className="validate form-group-input email" 
                                                                    id="email"
                                                                    type="email" 
                                                                    name="email" 
                                                                    required="required"
                                                                    />
                                                                    <label htmlFor='email'>@email</label>
                                                                    <div className="form-group-line"></div>
                                                                </fieldset>

                                                            </div>
                                                            <span>Password Management : </span>
                                                            <div className="modal-content_user">

                                                                <fieldset className="input-field form-group">
                                                                    <input
                                                                    onChange={(ev) => this.handleChangeField('_new_password', ev)}
                                                                    value={_new_password}
                                                                    className="validate form-group-input _new_password" 
                                                                    id="_new_password"
                                                                    type="password" 
                                                                    name="_new_password" 
                                                                    required="required"
                                                                    />
                                                                    <label htmlFor='_new_password'>new password</label>
                                                                    <div className="form-group-line"></div>
                                                                </fieldset>

                                                            </div>
                                                            <button onClick={this.send_user} className="btn btn-primary float-right">Submit</button>
                                                        </div>
                                                        <div className="changeStaff_pane tab-pane" id="2a">
                                                            Are you a staff member
                                                            <div className="modal-content_user">

                                                                <fieldset className="input-field form-group">
                                                                    <input
                                                                    onChange={(ev) => this.handleChangeField('whoami', ev)}
                                                                    value={_user.whoami}
                                                                    className="validate form-group-input whoami" 
                                                                    id="whoami"
                                                                    type="text" 
                                                                    name="whoami" 
                                                                    required="required"
                                                                    />
                                                                    <label htmlFor='whoami'>whoami</label>
                                                                    <div className="form-group-line"></div>
                                                                </fieldset>

                                                            </div>
                                                            <button onClick={this.handleSubmitUser} className="btn btn-primary float-right">Submit</button>
                                                        </div>
                                                    </div>
                                                    <div className="side_face">
                                                        <span className="_title">Progress : </span>
                                                        <div className="_progress">
                                                            <i className="fas fa-info"></i>
                                                            <span className="_percentage">
                                                                <span className="_percentage_number">{this._progress(_user)}</span>
                                                                <span className="_percentage_icon">%</span>
                                                                <span>|</span>
                                                                <span>{this._progress_total(_user)} field</span>
                                                            </span>
                                                            <div className="_progress_bar">
                                                                <div className="bar"></div>
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
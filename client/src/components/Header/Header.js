import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../resources/media/logo.svg';
import API from '../../utils/API';
const _ = require('lodash');

class AccountForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login_email : "",
            login_password: "",
            signup_email: "",
            signup_password: "",
            confirm_signup_password: ""
        }
        this._handleClickEvents = this._handleClickEvents.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.send_login = this.send_login.bind(this);
        this.send_signup = this.send_signup.bind(this);
    }
    componentDidMount() {
        this._handleClickEvents();
        $(".login").hide();
        const loginBtn =  document.querySelector('#login_toggle');
        const signupBtn = document.querySelector('#signup_toggle');
        function slideUp(){
            if(this.id == 'signup_toggle'){
                const parent = this.parentElement;
                const sibling = parent.nextElementSibling;
                parent.classList.remove('slide-up');
                sibling.classList.add('slide-up');
            } else {
                const parent = this.parentElement;
                const sibling = parent.previousElementSibling;
                parent.classList.remove('slide-up');
                sibling.classList.add('slide-up');
            }
        }
        loginBtn.addEventListener('click', slideUp);
        signupBtn.addEventListener('click', slideUp);
    }
    _handleClickEvents() {
        /* login */
        $(".togglebtn").click(function(){
            $(".login").toggle(400);
            $('.overlay_menu').toggleClass('overlay_menu--is-closed');
        });
    }
    send_login(event) {
        if(this.state.email.length === 0){
            return;
        }
        if(this.state.password.length === 0){
            return;
        }
        API.login(this.state.email, this.state.password).then(function(data){
            localStorage.setItem('token', data.data.token);
            localStorage.setItem('email', data.data.email);
        },function(error){
            console.log(error);
            return;
        })
    }
    send_signup(event) {
        if(this.state.signup_email.length === 0){
            return;
        }
        if(this.state.signup_password.length === 0 || this.state.signup_password !== this.state.confirm_signup_password){
            return;
        }
        var _send = {
            signup_email: this.state.signup_email,
            signup_password: this.state.signup_password
        }
        API.signup(_send).then(function(data){
            localStorage.setItem('token', data.data.token);
            localStorage.setItem('email', data.data.email);
        },function(error){
            console.log(error);
            return;
        })
    }
    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value
        });
    }
    render() {
        return (
            <div href="#" className="icon-button accountFormHolder">
                <i className="far fa-user togglebtn"></i>
                <span className="hover_effect"></span>
                <div className="login form-structor">
                    <div className="signup_form slide-up">

                        <div className="form-title" id="signup_toggle">
                            <a className="question_signup" href="#" title="">Don't have an account yet?</a>
                            <a className="title_signup" href="#" title="">Sign Up</a>
                        </div>

                        <div className="form-holder">

                            <div className='row'>
                                <div className='input-field col s12'>
                                    <input 
                                    className='validate form-group-input' 
                                    type='email' 
                                    name='email' 
                                    id='signup_email' 
                                    required="required"
                                    value={this.state.email_signup} 
                                    onChange={this.handleChange}
                                    />
                                    <label htmlFor='signup_email'>@email</label>
                                    <div className="form-group-line"></div>
                                </div>
                            </div>
                            
                            <div className='row'>
                                <div className='input-field col s12'>
                                    <input 
                                    className='validate form-group-input' 
                                    type='password' 
                                    name='password' 
                                    id='signup_password' 
                                    required="required" 
                                    value={this.state.password_signup} 
                                    onChange={this.handleChange}
                                    />
                                    <label htmlFor='signup_password'>Password</label>
                                    <div className="form-group-line"></div>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='input-field col s12'>
                                    <input 
                                    className='validate form-group-input' 
                                    type='password' 
                                    name='confirm_password' 
                                    id='confirm_signup_password' 
                                    required="required" 
                                    value={this.state.confirm_password_signup} 
                                    onChange={this.handleChange}
                                    />
                                    <label htmlFor='confirm_signup_password'>Confirm Password</label>
                                    <div className="form-group-line"></div>
                                </div>
                            </div>

                            <section className="center">
                                <div className='row'>
                                    <button 
                                    type='submit' 
                                    name='btn_login' 
                                    className='col s12 btn btn-large waves-effect login'
                                    onClick={this.send_signup}
                                    >
                                        Signup
                                    </button>
                                </div>
                            </section>

                        </div>
                    </div>
                    <div className="login_form">
                        <div className="form-title" id="login_toggle">
                            <a className="title_login" href="#" title="">Log in</a>
                            <a className="question_login" href="#" title="">Already have an account?</a>
                        </div>
                        <div className="form-holder">
                            
                            <div className='row'>
                                <div className='input-field col s12'>
                                    <input 
                                    className='validate form-group-input' 
                                    type='email' 
                                    name='email' 
                                    id='login_email' 
                                    required="required"
                                    value={this.state.email} 
                                    onChange={this.handleChange}
                                    />
                                    <label htmlFor='login_email'>@email</label>
                                    <div className="form-group-line"></div>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='input-field col s12'>
                                    <input 
                                    className='validate form-group-input' 
                                    type='password' 
                                    name='password' 
                                    id='login_password' 
                                    required="required" 
                                    value={this.state.password} 
                                    onChange={this.handleChange}
                                    />
                                    <label htmlFor='login_password'>Password</label>
                                    <div className="form-group-line"></div>
                                </div>
                            </div>

                            <label>
                                <input type="checkbox"/>Remember me
                            </label>

                            <section className="center">
                                <div className='row'>
                                    <button 
                                    type='submit' 
                                    name='btn_login' 
                                    className='col s12 btn btn-large waves-effect login'
                                    onClick={this.send_login}
                                    >
                                        Login
                                    </button>
                                </div>
                            </section>

                            <a href="#" title="">Forgot your password?</a>
                        
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
class AccountProfil extends React.Component {
    constructor(props) {
        super(props);
        this.disconnect = this.disconnect.bind(this);
    }
    componentDidMount() {
        var menuButton = document.querySelector(".menu_button");

        menuButton.addEventListener("click", function(event) {
            event.preventDefault();
            var parent = document.querySelector(".accountProfilHolder");
            if (parent.classList.contains("open")) {
                parent.classList.remove("open");
            } else {
                parent.classList.add("open");
            }
        });
    }
    disconnect() {
        API.logout();
    }
    render() {
        return (
            <div href="#" className="icon-button accountProfilHolder">
                <div className='menu_button'>
                    <span className="hover_effect"></span>
                    <i className="far fa-user togglebtn"></i>
                    <span className="title">Henry Smith</span>
                </div>
                <div className="menu-dropdown">
                    <div className="content">
                        <ul>
                            <li>{ localStorage.getItem('email') }</li>
                            <li><a href=""><i className="far fa-envelope"></i>Messages</a></li>
                            <li><a href=""><i className="far fa-user"></i>Account</a></li>
                            <li><a href=""><i className="fas fa-cog"></i>Settings</a></li>
                            <li><a href="" onClick={this.disconnect}><i className="fas fa-sign-out-alt"></i>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

class Header extends React.Component {
    constructor(props) {
        super(props);
        this._handleClickEvents = this._handleClickEvents.bind(this);
        this._handleTap = this._handleTap.bind(this);
        this._handleScroll = this._handleScroll.bind(this);
    }
    componentDidMount() {
        this._handleClickEvents();
        this._handleTap();
        this._handleScroll();
    }
    _handleClickEvents() {
        /* menu */
        $('.navToggle').click(function(event) {
            $('.navToggle').toggleClass('active');
            $('.menu').toggleClass('menu--is-closed');
            $('.overlay_menu').toggleClass('overlay_menu--is-closed');
        });
        
        /* menu active */
        $('.nav-link').click(function(){
            $('.navToggle').toggleClass('active');
            $('.menu').toggleClass('menu--is-closed');
            $('.overlay_menu').toggleClass('overlay_menu--is-closed');
            $(this).addClass('active');
            $('.nav-link').not(this).removeClass('active');
        });

        /* outside the login or menu */
        $('.overlay_menu').click(function(){
            if($(".login").css('display') == 'none'){
                $('.menu').toggleClass('menu--is-closed');
                $('.navToggle').toggleClass('active');
                $('.overlay_menu').toggleClass('overlay_menu--is-closed');
            }else{
                $(".login").toggle(400);
                $('.overlay_menu').toggleClass('overlay_menu--is-closed');
            }
        });

        document.querySelectorAll(".js-fr").forEach(trigger => {
            // pull trigger
            trigger.onclick = () => {
              // langTrigger
              trigger.parentNode.querySelectorAll(".js-fr").forEach(el => {
                el.classList.add("is-active");
              });
              trigger.parentNode.querySelectorAll(".js-en").forEach(el => {
                el.classList.remove("is-active");
              });
            };
        });
        document.querySelectorAll(".js-en").forEach(trigger => {
        // pull trigger
        trigger.onclick = () => {
            // langTorigger
            trigger.parentNode.querySelectorAll(".js-fr").forEach(el => {
            el.classList.remove("is-active");
            });
            trigger.parentNode.querySelectorAll(".js-en").forEach(el => {
            el.classList.add("is-active");
            });
        };
        });
    }
    _handleTap() {
        let searchWrapper = document.querySelector('.search-wrapper'),
            searchInput = document.querySelector('.search-input'),
            searchIcon = document.querySelector('.search'),
            searchActivated = false;

        $('.search').click(() => {
            if (!searchActivated) {
                searchWrapper.classList.add('focused');
                searchIcon.classList.add('active');
                searchInput.focus();
                searchActivated = !searchActivated;
                $('.overlay_menu').toggleClass('overlay_menu--is-closed');
            } else {
                searchWrapper.classList.remove('focused');
                searchIcon.classList.remove('active');
                searchActivated = !searchActivated;
                $('.overlay_menu').toggleClass('overlay_menu--is-closed');
            }
        });
    }
    _handleScroll(){
        $(window).scroll(function() {
            if ($(this).scrollTop() > 0){
                $('.fixedHeaderContainer').addClass('scrolled');
            }
            else{
                $('.fixedHeaderContainer').removeClass('scrolled');
            }
        });
    }
    render() {
        return (
            <>
                <div className="overlay_menu overlay_menu--is-closed"></div>
                <div className="fixedHeaderContainer">
                    <div className="headerWrapper wrapper">
                        <header>
                            <span className="navToggle menu-toggle">
                                <svg className="hamburger"  width="300" height="300" version="1.1" id="Layer_1" viewBox="-50 -50 100 100" preserveAspectRatio="none">
                                    <g strokeWidth="2" strokeLinecap="round" strokeMiterlimit="10">
                                        <line className="one" x1="0" y1="20" x2="50" y2="20"></line>
                                        <line className="three" x1="0" y1="30" x2="50" y2="30"></line>
                                    </g>
                                </svg>
                            </span>
                            <a className="logoHolder" href="#">
                                <img className="logo img-fluid" src={logo} alt="Risala"/>
                            </a>
                            <div className="js-lang u-mb-15">
                                <span className="js-fr">fr</span>
                                <span className="js-en is-active">en</span>
                            </div>
                            <form>
                                <div className="search-wrapper">
                                    <input className="search-input" type="text" placeholder="Search"/>
                                    <span></span>
                                    <div className='search'></div>
                                </div>
                            </form>
                            {
                                localStorage.getItem('token') ? <AccountProfil/> : <AccountForm/>
                            }
                        </header>
                    </div>
                </div>
                <ul className="menu menu--is-closed">
                    <li><span className="item item-0"></span></li>
                    <li><span className="item item-1"><Link to='/' className="nav-link active"> Home </Link></span></li>
                    <li><span className="item item-2"><Link to='/blog' className="nav-link"> Blog </Link></span></li>
                    <li><span className="item item-3"><Link to='/letters' className="nav-link"> Letters </Link></span></li>
                    <li><span className="item item-3"><Link to='/projects' className="nav-link"> Projects </Link></span></li>
                    <li><span className="item item-4"><Link to='/coffee' className="nav-link"> Coffee </Link></span></li>
                    <li><span className="item item-5"><Link to='/pencil' className="nav-link"> Education </Link></span></li>
                    <li><span className="item item-6"><Link to='/faq' className="nav-link"> Ask Us </Link></span></li>
                </ul>
            </>
        );
    }
}

export default Header;
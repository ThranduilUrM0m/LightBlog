import React from 'react';
import logo from '../../../resources/media/logo.svg';
import { Accueil } from '../../components/Article';
import { Blog } from '../../components/Article';
import { Letters } from '../../components/Article';
import { Projects } from '../../components/Article';
import { Coffee } from '../../components/Article';
import { Pencil } from '../../components/Article';
import { FAQ } from '../../components/Article';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
const _ = require('lodash');

class Main extends React.Component {
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

        /* login */
        $(".togglebtn").click(function(){
            $(".login").toggle(400);
            $('.overlay_menu').toggleClass('overlay_menu--is-closed');
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
            } else {
                searchWrapper.classList.remove('focused');
                searchIcon.classList.remove('active');
                searchActivated = !searchActivated;
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
            <Router>
                <div className="container-fluid">
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
                                <div href="#" className="icon-button accountHolder">
                                    <i className="far fa-user togglebtn"></i>
                                    <span className="hover_effect"></span>
                                    <div className="login form-structor">
                                        <div className="signup_form slide-up">

                                            <div className="form-title" id="signup_toggle">
                                                <a className="question_signup" href="#" title="">Don't have an account yet?</a>
                                                <a className="title_signup" href="#" title="">Sign Up</a>
                                            </div>

                                            <form className="form-holder">

                                                <div className='row'>
                                                    <div className='input-field col s12'>
                                                        <input className='validate form-group-input' type='text' name='name' id='signup_name' required="required"/>
                                                        <label htmlFor='signup_name'>Joe Doe</label>
                                                        <div className="form-group-line"></div>
                                                    </div>
                                                </div>

                                                <div className='row'>
                                                    <div className='input-field col s12'>
                                                        <input className='validate form-group-input' type='email' name='email' id='signup_email' required="required"/>
                                                        <label htmlFor='signup_email'>@email</label>
                                                        <div className="form-group-line"></div>
                                                    </div>
                                                </div>
                                                
                                                <div className='row'>
                                                    <div className='input-field col s12'>
                                                        <input className='validate form-group-input' type='password' name='password' id='signup_password' required="required" />
                                                        <label htmlFor='signup_password'>Password</label>
                                                        <div className="form-group-line"></div>
                                                    </div>
                                                </div>

                                                <section className="center">
                                                    <div className='row'>
                                                        <button type='submit' name='btn_login' className='col s12 btn btn-large waves-effect login'>Signup</button>
                                                    </div>
                                                </section>

                                            </form>
                                        </div>
                                        <div className="login_form">
                                            <div className="form-title" id="login_toggle">
                                                <a className="title_login" href="#" title="">Log in</a>
                                                <a className="question_login" href="#" title="">Already have an account?</a>
                                            </div>
                                            <form className="form-holder">
                                                
                                                <div className='row'>
                                                    <div className='input-field col s12'>
                                                        <input className='validate form-group-input' type='email' name='email' id='login_email' required="required" />
                                                        <label htmlFor='login_email'>@email</label>
                                                        <div className="form-group-line"></div>
                                                    </div>
                                                </div>

                                                <div className='row'>
                                                    <div className='input-field col s12'>
                                                        <input className='validate form-group-input' type='password' name='password' id='login_password' required="required" />
                                                        <label htmlFor='login_password'>Password</label>
                                                        <div className="form-group-line"></div>
                                                    </div>
                                                </div>

                                                <label>
                                                    <input type="checkbox"/>Remember me
                                                </label>

                                                <section className="center">
                                                    <div className='row'>
                                                        <button type='submit' name='btn_login' className='col s12 btn btn-large waves-effect login'>Login</button>
                                                    </div>
                                                </section>

                                                <a href="#" title="">Forgot your password?</a>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </header>
                        </div>
                    </div>
                    <ul className="menu menu--is-closed">
                        <li><span className="item item-0"></span></li>
                        <li><span className="item item-1"><Link to={'/'} className="nav-link active"> <i className="fas fa-home"></i> </Link></span></li>
                        <li><span className="item item-2"><Link to={'/blog'} className="nav-link"> <i className="far fa-newspaper"></i> </Link></span></li>
                        <li><span className="item item-3"><Link to={'/letters'} className="nav-link"> <i className="far fa-envelope-open"></i> </Link></span></li>
                        <li><span className="item item-3"><Link to={'/projects'} className="nav-link"> <i className="fas fa-tasks"></i> </Link></span></li>
                        <li><span className="item item-4"><Link to={'/coffee'} className="nav-link"> <i className="fa fa-coffee"></i> </Link></span></li>
                        <li><span className="item item-5"><Link to={'/pencil'} className="nav-link"> <i className="fas fa-pencil-alt"></i> </Link></span></li>
                        <li><span className="item item-6"><Link to={'/faq'} className="nav-link"> <i className="fas fa-question"></i> </Link></span></li>
                    </ul>
                    <Switch>
                        <Route exact path="/" component={Accueil} />
                        <Route path='/blog' component={Blog} />
                        <Route path='/letters' component={Letters} />
                        <Route path='/projects' component={Projects} />
                        <Route path='/coffee' component={Coffee} />
                        <Route path='/pencil' component={Pencil} />
                        <Route path='/faq' component={FAQ} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default Main;
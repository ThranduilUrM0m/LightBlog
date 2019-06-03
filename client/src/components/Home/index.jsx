import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { connect } from 'react-redux';
import logo from '../../../resources/media/logo.svg';
import favicon from '../../../resources/media/favicon.ico';

import  { Form } from '../../components/Article';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this._handleDelete = this._handleDelete.bind(this);
        this._handleEdit = this._handleEdit.bind(this);
        this._handleClick = this._handleClick.bind(this);
        this._handleTap = this._handleTap.bind(this);
        this._handleSlider = this._handleSlider.bind(this);
    }
    componentDidMount() {
        const {onLoad} = this.props;
        const self = this;
        axios('http://localhost:8000/api/articles')
        .then(function (response) {
            // handle success
            onLoad(response.data);
            function runAfterElementExists(jquery_selector, callback){
                var checker = window.setInterval(function() {
                 //if one or more elements have been yielded by jquery
                 //using this selector
                 if ($(jquery_selector).length) {
                    //stop checking for the existence of this element
                    clearInterval(checker);
                    //call the passed in function via the parameter above
                    callback();
                    }}, 200); //I usually check 5 times per second
            }
            
            //this is an example place in your code where you would like to
            //start checking whether the target element exists
            //I have used a class below, but you can use any jQuery selector
            runAfterElementExists(".card_"+(response.data.articles.length-1), function() {
                self._handleSlider();
            });
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
            self._handleClick();
            self._handleTap();

            $(".login").hide();
            $(".togglebtn").click(function(){
                $(".login").toggle(420);
            });
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
        });
    }
    _handleDelete(id) {
        const { onDelete } = this.props;
        return axios.delete(`http://localhost:8000/api/articles/${id}`).then(() => onDelete(id));
    }
    _handleEdit(article) {
        const { setEdit } = this.props;
        setEdit(article);
    }
    _handleClick() {
        $('.navToggle').click(function() {
            $('.navToggle').toggleClass('active');
            $('.menu').toggleClass('menu--is-closed');
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
    _handleSlider() {
        (function($) {
            $.fn.jooSlider = function(options) {
                var opt = {
                    auto: true,
                    speed: 2000
                };
                if (options) {
                    $.extend(opt, options);
                }
                var container = $(this);
                var Slider = function() {
                    //===========
                    // Variables
                    //===========
                    var block = false; // Empêcher le clique multiple
                    var height = container.find('.card').height(); // Hauteur des images
                    container.find('.card').wrap('<div class="img-wrap"></div>');
                    this.imgs = container.find('.img-wrap');
                    this.imgCount = (this.imgs.length) - 1;
                    /* Caption */
                    this.imgs.each(function(){
                        var caption = $(this).find('.card').data('index');
                        $(this).append('<p class="index_card">'+caption+'</p>');
                    });
                    this.captions = container.find('.img-wrap').find('p');
                    /* Controls */
                    container.append('<span id="controls"><a href="#" id="prev"><span id="prev_"></span>prev.</a><a href="#" id="next">next.<span id="next_"></span></a></span>');
                    this.navNext = $('#next');
                    this.navPrev = $('#prev');
                    /* Navigation */
                    container.after('<ol class="nav carousel-indicators"></ol>');
                    var nav = $(".nav");
                    this.imgs.each(function(){
                        var caption = $(this).find('img').attr('title');
                        nav.append('<li href="#">'+ caption +'</li>');
                    });
                    this.bullets = nav.find("li");
                    //==========
                    // Méthodes
                    //==========
                    /*
                     *   Méthode qui retourne l'index de la div.current
                     */
                    this.getCurrentIndex = function() {
                        return this.imgs.filter('.current').index();
                    };
                    /*
                     *   Méthode qui anime le slide de haut en bas ou de bas en haut
                     */
                    this.goNext = function(index) {
                        /* Images */
                        this.imgs.filter(".current").stop().animate({ // Monte l'image current
                            "top": -height + "px"
                        }, function() {
                            $(this).hide();
                        });
                        this.imgs.removeClass("current"); // Supprime classe current
                        this.imgs.eq(index).css({ // Monte la suivante et attribut la classe current
                            "top": height + "px"
                        }).show().stop().animate({
                            "top": "0px"
                        }, function() {
                            block = false;
                        }).addClass("current");
                        /* Bullets */
                        this.bullets.removeClass("current").eq(index).addClass("current");
                    }; //////////////////////// END GO NEXT
                    this.goPrev = function(index) {
                        /* Images */
                        this.imgs.filter(".current").stop().animate({
                            "top": height + "px"
                        }, function() {
                            $(this).hide();
                            block = false;
                        });
                        this.imgs.removeClass("current");
                        this.imgs.eq(index).css({
                            "top": -height + "px"
                        }).show().stop().animate({
                            "top": "0px"
                        }, function() {
                        }).addClass("current");
                        /* Bullets */
                        this.bullets.removeClass("current").eq(index).addClass("current");
                    }; //////////////////////// END GO PREV
                    this.next = function() {
                        var index = this.getCurrentIndex();
                        if (index < this.imgCount) {
                            if (block !== true) {
                                this.goNext(index + 1); // Go next 
                            }
                        } else {
                            if (block !== true) {
                                this.goNext(0); // If last go first 
                            }
                        }
                        block = true;
                    }; //////////////////////// END NEXT
                    this.prev = function() {
                        var index = this.getCurrentIndex();
                        if (index > 0) {
                            if (block !== true) {
                                this.goPrev(index - 1); // Go previous 
                            }
                        } else {
                            if (block !== true) {
                                this.goPrev(this.imgCount); // If first go last     
                            }
                        }
                        block = true;
                    }; //////////////////////// END PREV
                    /*
                     *   Méthode qui initialise l'objet
                     */
                    this.init = function() {
                        this.imgs.hide().first().addClass('current').show();
                        this.bullets.first().addClass("current");
                    };
                }; // End Slider Object
                var slider = new Slider();
                slider.init();
                //==========
                //  EVENTS
                //==========
                /* Click */
                slider.navNext.click(function(e) { // Click next button
                    e.preventDefault();
                    clearInterval(interval);
                    interval = setInterval(timer, opt.speed);
                    slider.next();
                });
                slider.navPrev.click(function(e) { // Click previous button
                    e.preventDefault();
                    slider.prev();
                    clearInterval(interval);
                    interval = setInterval(timer, opt.speed);
                });
                slider.bullets.click(function(e) { // Click numbered bullet
                    e.preventDefault();
                    var imgIndex = slider.getCurrentIndex();
                    var bulletIndex = $(this).index();
                    if (imgIndex < bulletIndex) {
                        slider.goNext(bulletIndex);
                    } else {
                        slider.goPrev(bulletIndex);
                    }
                    clearInterval(interval);
                    interval = setInterval(timer, opt.speed);
                });
                /* Interval */
                var interval = setInterval(timer, opt.speed);
                if (opt.auto === true) {
                    var timer = function() {
                        slider.next();
                    };
                }
                container.hover(function() {
                    clearInterval(interval);
                }, function() {
                    clearInterval(interval);
                    interval = setInterval(timer, opt.speed);
                });
                return this;
            };
        })(jQuery);
        $("#slider").jooSlider({
            auto: false,
            speed: 4000
        });
    }
    render() {
        const { articles } = this.props;
        return (
            <div className="container-fluid">
                <div className="fixedHeaderContainer">
                    <div className="headerWrapper wrapper">
                        <header>
                            <span className="navToggle menu-toggle" onClick={this._handleClick}>
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
                                <span className="js-fr is-active">fr</span>
                                <span className="js-en">en</span>
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
                                                    <input className='validate form-group-input' type='text' name='name' id='name' required="required" />
                                                    <label htmlFor='name'>Joe Doe</label>
                                                    <div className="form-group-line"></div>
                                                </div>
                                            </div>

                                            <div className='row'>
                                                <div className='input-field col s12'>
                                                    <input className='validate form-group-input' type='email' name='email' id='email_signup' required="required" />
                                                    <label htmlFor='email'>@email</label>
                                                    <div className="form-group-line"></div>
                                                </div>
                                            </div>
                                            
                                            <div className='row'>
                                                <div className='input-field col s12'>
                                                    <input className='validate form-group-input' type='password' name='password' id='password_signup' required="required" />
                                                    <label htmlFor='password'>Password</label>
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
                                                    <input className='validate form-group-input' type='email' name='email' id='email_login' required="required" />
                                                    <label htmlFor='email'>@email</label>
                                                    <div className="form-group-line"></div>
                                                </div>
                                            </div>

                                            <div className='row'>
                                                <div className='input-field col s12'>
                                                    <input className='validate form-group-input' type='password' name='password' id='password_login' required="required" />
                                                    <label htmlFor='password'>Password</label>
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
                    <li><a className="item item-0"></a></li>
                    <li><a className="item item-1"><i className="fa fa-car"></i></a></li>
                    <li><a className="item item-2"><i className="fa fa-heart"></i></a></li>
                    <li><a className="item item-3"><i className="fa fa-cloud"></i></a></li>
                    <li><a className="item item-4"><i className="fa fa-coffee"></i></a></li>
                    <li><a className="item item-5"><i className="fa fa-dribbble"></i></a></li>
                    <li><a className="item item-6"><i className="fa fa-book"></i></a></li>
                </ul>
                <section className="first_section">
                    <div className="wrapper left_part">
                        <div id="slider">
                            {
                                articles.map((article, index) => {
                                    return (
                                        <div className={"card card_" + index} data-title={article.title} data-index={index+1}>
                                            <div className="card-body">
                                                <h2>{article.title}</h2>
                                                <h6 className="body">{article.body}</h6>
                                                <p className="text-muted author">by <b>{article.author}</b>, {moment(new Date(article.createdAt)).fromNow()}</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="wrapper right_part">
                        <div id="image">
                            <div id="social_media">
                                <a href="#" className="icon-button instagram"><i className="fab fa-instagram"></i><span></span></a>
                                <a href="#" className="icon-button facebook"><i className="icon-facebook"></i><span></span></a>
                            </div>
                        </div>
                    </div>
                </section>
                <button type="button" className="btn btn-dark motivation">Égayer la journée d'un étudiant</button>
                <section className="second_section">
                    <div className="wrapper left_part">
                        <div className="some_text">
                            <h1 className="display-4">Hello, world!</h1>
                            <p>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
                            <hr className="my-4"></hr>
                        </div>
                    </div>
                    <div className="wrapper right_part">
                        <div className="grid-layout">
                            <div className="grid-item grid-item-1">
                                <i className="fas fa-bolt"></i>
                            </div>
                            <div className="grid-item grid-item-2">
                                <i className="fas fa-bolt"></i>
                            </div>
                            <div className="grid-item span-3 grid-item-3">
                                <i className="fas fa-bolt"></i>
                            </div>
                            <div className="grid-item grid-item-4">
                                <i className="fas fa-bolt"></i>
                            </div>
                            <div className="grid-item span-2 grid-item-5">
                                <i className="fas fa-bolt"></i>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="third_section">
                    <div className="wrapper_full">
                        <div className="card direct_card">
                            <div className="card-body direct_card_body">

                                <div className="left_side">
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="card-title">Card title</h5>
                                            <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                            <a href="#" className="card-link">Card link</a>
                                            <a href="#" className="card-link">Another link</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="right_side">
                                    <div className="card">
                                        <div className="card-body">
                                            <i className="fas fa-bolt"></i>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="card-body">
                                            <i className="fas fa-bolt"></i>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="card-body">
                                            <i className="fas fa-bolt"></i>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="card-body">
                                            <i className="fas fa-bolt"></i>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
                <footer className="footer">
                    <div className="container">
                        <span className="push-left">
                            <div className="profile-picture"></div>
                            <span className="name">Zakariae.</span>
                        </span>
                        <span className="push-middle">
                            <div className="phone">
                                <span className="title">Phone</span>
                                <span className="body">(212)6 54 52 84 92</span>
                            </div>
                            <div className="adresse">
                                <span className="title">Adresse</span>
                                <span className="body">1305 Mississipi St. Unit A<br></br>San Fransisco, CA 94110</span>
                            </div>
                        </span>
                        <span className="push-right">
                            <i className="far fa-copyright"></i>
                            <span>{moment().format('YYYY')}</span>
                            all rights reserved
                        </span>
                    </div>
                </footer>
                {/*<div className="row pt-5">
                    <div className="col-12 col-lg-6 offset-lg-3">
                        <h1 className="text-center">LightBlog</h1>
                    </div>
                    <Form />
                </div>*/}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    articles: state.home.articles,
});

const mapDispatchToProps = dispatch => ({
    onLoad: data => dispatch({ type: 'HOME_PAGE_LOADED', data }),
    onDelete: id => dispatch({ type: 'DELETE_ARTICLE', id }),
    setEdit: article => dispatch({ type: 'SET_EDIT', article}),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
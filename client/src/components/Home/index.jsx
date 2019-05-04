import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { connect } from 'react-redux';
import logo from '../../../resources/media/logo.svg';

import  { Form } from '../../components/Article';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this._handleClick = this._handleClick.bind(this);
        this._handleTap = this._handleTap.bind(this);
    }
    componentDidMount() {
        this._handleClick();
        this._handleTap();
        const {onLoad} = this.props;
        axios('http://localhost:8000/api/articles').then((res) => onLoad(res.data));
    }
    handleDelete(id) {
        const { onDelete } = this.props;
        return axios.delete(`http://localhost:8000/api/articles/${id}`).then(() => onDelete(id));
    }
    handleEdit(article) {
        const { setEdit } = this.props;
        setEdit(article);
    }
    _handleClick() {
        $('.navToggle').click(function() {
            $('.navToggle').toggleClass('active');
        });
    }
    _handleTap() {
        let searchWrapper = document.querySelector('.search-wrapper'),
            searchInput = document.querySelector('.search-input'),
            searchIcon = document.querySelector('.search'),
            searchActivated = false;

        document.addEventListener('click', e => {
            if (~e.target.className.indexOf('search') && !searchActivated) {
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
    render() {
        const { articles } = this.props;
        return (
            <div className="container-fluid">
                <div className="fixedHeaderContainer">
                    <div className="headerWrapper wrapper">
                        <header>
                            <span className="navToggle" onClick={this._handleClick}>
                                <svg className="hamburger" viewBox="0 0 28 28">
                                    <g strokeWidth="2" strokeLinecap="round" strokeMiterlimit="10">
                                        <line className="one" x1="0" y1="10" x2="30" y2="10"></line>
                                        <line className="three" x1="0" y1="20" x2="30" y2="20"></line>
                                    </g>
                                </svg>
                            </span>
                            <a className="logoHolder" href="#">
                                <img className="logo" src={logo} alt="Risala"/>
                            </a>
                            <form>
                                <div className="search-wrapper">
                                    <input className="search-input" type="text" placeholder="Search"/>
                                    <div className='search'></div>
                                </div>
                            </form>
                        </header>
                    </div>
                </div>
                {/* <div className="row pt-5">
                    <div className="col-12 col-lg-6 offset-lg-3">
                        <h1 className="text-center">LightBlog</h1>
                    </div>
                    <Form />
                </div>
                <div className="row pt-5">
                    <div className="col-12 col-lg-6 offset-lg-3">
                        {articles.map((article) => {
                            return (
                                <div className="card my-3">
                                    <div className="card-header">
                                        {article.title}
                                    </div>
                                    <div className="card-body">
                                        {article.body}
                                        <p className="mt-5 text-muted"><b>{article.author}</b> {moment(new Date(article.createdAt)).fromNow()}</p>
                                    </div>
                                    <div className="card-footer">
                                        <div className="row">
                                            <button onClick={() => this.handleEdit(article)} className="btn btn-primary mx-3">
                                                Edit
                                            </button>
                                            <button onClick={() => this.handleDelete(article._id)} className="btn btn-danger">
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div> */}
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
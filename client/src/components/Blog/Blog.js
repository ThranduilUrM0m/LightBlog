import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { connect } from 'react-redux';
import { FullPage, Slide } from 'react-full-page';
import 'whatwg-fetch';
import { Form } from '../Article';
import Footer from '../Footer/Footer';

var _ = require('lodash');

class Blog extends React.Component {
	constructor(props) {
		super(props);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
		this.handleJSONTOHTML = this.handleJSONTOHTML.bind(this);
	}
	componentDidMount() {
        const {onLoad} = this.props;
		axios('http://localhost:8000/api/articles')
      		.then((res) => onLoad(res.data));
	}
	handleDelete(id) {
		const { onDelete } = this.props;
		return axios.delete(`http://localhost:8000/api/articles/${id}`)
			.then(() => onDelete(id));
	}
	handleEdit(article) {
		const { setEdit } = this.props;
		setEdit(article);
	}
	handleJSONTOHTML(inputDelta) {
		function runAfterElementExists(jquery_selector, callback){
			var checker = window.setInterval(function() {
			if (jquery_selector) {
				clearInterval(checker);
				callback();
			}}, 200);
		}
		runAfterElementExists(inputDelta, function() {
			const html = JSON.parse(inputDelta);
			var image;
			$('h6.body_article').html(html);
			$('h6.body_article').children('p').filter(':not(:first-of-type):not(:nth-child(2)):not(:nth-child(3))').hide();
		});
	}
	render() {
		const { articles } = this.props;
		return (
			<FullPage>
				<Slide>
					<section className="active first_section_blog">
						<div className="wrapper_full">
							<div id="box">
								<h2>{_.get(_.head(_.orderBy(articles, ['createdAt'], ['asc'])), 'title')}</h2>
								<p className="text-muted author">by <b>{_.get(_.head(_.orderBy(articles, ['createdAt'], ['asc'])), 'author')}</b>, {moment(new Date(_.get(_.head(_.orderBy(articles, ['createdAt'], ['desc'])), 'createdAt'))).fromNow()}</p>
								<h6 className="text-muted body body_article">
									{
										this.handleJSONTOHTML((_.get(_.head(_.orderBy(articles, ['createdAt'], ['asc'])), 'body')))
									}
								</h6>
								<div className="readmore">
									<button data-am-linearrow="tooltip tooltip-bottom" display-name="Read More">
										<div className="line line-1"></div>
										<div className="line line-2"></div>
									</button>
								</div>
							</div>
							<div id="social_media">
								<a href="#" className="icon-button instagram"><i className="fab fa-instagram"></i><span></span></a>
								<a href="#" className="icon-button facebook"><i className="icon-facebook"></i><span></span></a>
								<a href="#" className="icon-button scroll">
									<span className="scroll-icon">
										<span className="scroll-icon__wheel-outer">
											<span className="scroll-icon__wheel-inner"></span>
										</span>
									</span>
								</a>
							</div>
						</div>
					</section>
				</Slide>
				<Slide>
					<section className="second_section_blog">
						{/* <Form /> */}
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
});

const mapDispatchToProps = dispatch => ({
	onLoad: data => dispatch({ type: 'HOME_PAGE_LOADED', data }),
	onDelete: id => dispatch({ type: 'DELETE_ARTICLE', id }),
	setEdit: article => dispatch({ type: 'SET_EDIT', article }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Blog);
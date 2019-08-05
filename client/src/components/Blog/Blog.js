import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { connect } from 'react-redux';
import { FullPage, Slide } from 'react-full-page';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import 'whatwg-fetch';
import Footer from '../Footer/Footer';

var _ = require('lodash');
import { pagination } from 'paginationjs';

class ReadMoreLink extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<Link to={this.props.readmore_link}>
				<button>
					<span>
						<span>
							<span data-attr-span="Read More About it">Read More About it</span>
						</span>
					</span>
				</button>
			</Link>
		)
	}
}
class ArticleCard extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<li className="article_card row">
				<div className={"col card card_" + this.props.single_article.index} data-title={_.snakeCase(this.props.single_article.title)} data-index={_.add(this.props.single_article.index,1)}>
					<div className="shadow_title">{_.head(_.words(this.props.single_article.title))}</div>
					<div className="shadow_letter">{_.head(_.head(_.words(this.props.single_article.title)))}</div>
					<div className="card-body">
						<h2>{this.props.single_article.title}</h2>
						<p className="text-muted author">by <b>{this.props.single_article.author}</b>, {moment(new Date(this.props.single_article.createdAt)).fromNow()}</p>
						<ReadMoreLink readmore_link={`${this.props.url}/${this.props.single_article._id}`}/>
						<br/>
						<div className="comments_up_down">
							<p className="text-muted comments"><b>{_.size(this.props.single_article.comment)}</b> <i className="fas fa-comment-alt"></i></p>
							<p className="text-muted upvotes"><b>{this.props.single_article.upvotes}</b> <i className="fas fa-thumbs-up"></i></p>
							<p className="text-muted downvotes"><b>{this.props.single_article.downvotes}</b> <i className="fas fa-thumbs-down"></i></p>
						</div>
						<ul className="text-muted tags">
							{
								this.props.single_article.tag.map((t, i) => {
									return (
										<li class="tag_item">{t}</li>
									)
								})
							}
						</ul>
					</div>
				</div>
				<div className="col card">
					<div className="body_to_preview">
						<img src={$($(JSON.parse(this.props.single_article.body)).find('img')[0]).attr('src')}/>
						<span className="index_article">{this.props.FormatNumberLengthIndex}.</span>
					</div>
				</div>
			</li>
		)
	}
}
class ArticleCards extends React.Component {
	constructor(props) {
		super(props);
		this._FormatNumberLength = this._FormatNumberLength.bind(this);
	}
	_FormatNumberLength(num, length) {
		var r = "" + num;
		while (r.length < length) {
			r = "0" + r;
		}
		return r;
	}
	render () {
		return (
			<div className="data-container">
				<ul>
					{
						_.orderBy(this.props.articles_props, ['createdAt'], ['desc']).map((article, index) => {
							return (
								<ArticleCard url={this.props.url} single_article={article} FormatNumberLengthIndex={this._FormatNumberLength(index+1, 2)}/>
							)
						})
					}
				</ul>
			</div>
		)
	}
}

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
			.then((res) => onLoad(res.data))
			.then((res) => {
				$(function(){
					function createDemo(name){
						var container = $('#pagination-' + name);
						var options = {
							dataSource: res.data.articles,
							pageSize: 5,
							autoHidePrevious: true,
							autoHideNext: true,
						};
						container.pagination(options);
					  	return container;
					}
					createDemo('demo1');
				});
			});
		document.getElementById('articles_blog').parentElement.style.height = 'initial';
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
		function randomIntFromInterval(min, max) { // min and max included 
			return Math.floor(Math.random() * (max - min + 1) + min);
		}
		function runAfterElementExists(jquery_selector, callback){
			var checker = window.setInterval(function() {
			if (jquery_selector) {
				clearInterval(checker);
				callback();
			}}, 200);
		}
		runAfterElementExists(inputDelta, function() {
			const html = JSON.parse(inputDelta);
			$('h6.body_article').html(html);
			$('h6.body_article').children('p').filter(':not(:first-of-type):not(:nth-child(2)):not(:nth-child(3))').hide();
			$('.shadow_letter').map(function() {
				$(this).css({
					"left": randomIntFromInterval(-15, 200)+"%",
					"top": randomIntFromInterval(-50, 50)+"%"
				});;
			});
		});
	}
	render() {
		const { articles } = this.props;
		const { match } = this.props;
		return (
			<FullPage scrollMode={'normal'}>
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
								<div className="comments_up_down">
									<p className="text-muted comments"><b>{_.size(_.get(_.head(_.orderBy(articles, ['createdAt'], ['asc'])), 'comment'))}</b><i className="fas fa-comment-alt"></i></p>
									<p className="text-muted upvotes"><b>{_.get(_.head(_.orderBy(articles, ['createdAt'], ['asc'])), 'upvotes')}</b><i className="fas fa-thumbs-up"></i></p>
									<p className="text-muted downvotes"><b>{_.get(_.head(_.orderBy(articles, ['createdAt'], ['asc'])), 'downvotes')}</b><i className="fas fa-thumbs-down"></i></p>
								</div>

								<Link to={`${match.url}/${_.get(_.head(_.orderBy(articles, ['createdAt'], ['asc'])), '_id')}`}>
									<div className="readmore">
										<button data-am-linearrow="tooltip tooltip-bottom" display-name="Read More">
											<div className="line line-1"></div>
											<div className="line line-2"></div>
										</button>
									</div>
								</Link>

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
					<section id='articles_blog' className="second_section_blog">
        				<ArticleCards url={match.url} articles_props={articles}/>
						<div id="pagination-demo1"></div>
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
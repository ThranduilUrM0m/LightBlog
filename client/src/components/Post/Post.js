import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { connect } from 'react-redux';
import { FullPage, Slide } from 'react-full-page';
import { Link } from 'react-router-dom';
import 'whatwg-fetch';
import { pagination } from 'paginationjs';
import Footer from '../Footer/Footer';

var _ = require('lodash');

class Comments extends React.Component {
	render() {
		return(
			this.props.comment.map((comment, index) => {
				return (
					<div className={"card card_" + index} data-index={index+1}>
						<div className="shadow_title">{_.head(_.words(comment.body))}</div>
						<div className="card-body">
							<h5>{comment.body}</h5>
							<p className="text-muted author">by <b>{comment.author}</b>, {moment(new Date(comment.date)).fromNow()}</p>
						</div>
					</div>
				)
			})
		)
	}
}

class Post extends React.Component {
    constructor(props) {
		super(props);

		this.state = {
			_id: '',
            title: '',
            body: '',
            author: '',
            tag: [],
            tagInput: '',
			comment: [],
			comment_author: '',
			comment_body: '',
			comment_changed: false,
			upvotes: 0,
			upvotes_changed: false,
			downvotes: 0,
			downvotes_changed: false,
		}
		
		this.handleDelete = this.handleDelete.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
		
		this.handleChangeField = this.handleChangeField.bind(this);
		this.handleSubmitComment = this.handleSubmitComment.bind(this);
		this.handleSubmitupvotes = this.handleSubmitupvotes.bind(this);
		this.handleSubmitdownvotes = this.handleSubmitdownvotes.bind(this);
		
		this.handleJSONTOHTML = this.handleJSONTOHTML.bind(this);
		this._FormatNumberLength = this._FormatNumberLength.bind(this);
        this._handleMouseMove = this._handleMouseMove.bind(this);
	}

	componentDidMount() {
        const { onLoad } = this.props;
		const { match } = this.props;
		
		axios('http://localhost:8000/api/articles')
			.then((res) => onLoad(res.data))
			.then((res) => {
				this.handleEdit(_.find(res.data.articles, {'_id': match.params.postId}));
				this.setState(state => ({
					_id: match.params.postId
				}));
			});
		document.getElementById('articles_post').parentElement.style.height = 'initial';
        this._handleMouseMove();
	}

	componentWillReceiveProps(nextProps) {
        if(nextProps.articleToEdit) {
            this.setState({
                title: nextProps.articleToEdit.title,
                body: nextProps.articleToEdit.body,
                author: nextProps.articleToEdit.author,
                tag: nextProps.articleToEdit.tag,
                tagInput: nextProps.articleToEdit.tagInput,
				comment: nextProps.articleToEdit.comment,
				comment_author: nextProps.articleToEdit.comment_author,
				comment_body: nextProps.articleToEdit.comment_body,
                upvotes: nextProps.articleToEdit.upvotes,
                downvotes: nextProps.articleToEdit.downvotes,
            });
        }
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
	
	componentDidUpdate () {
		const { onEdit } = this.props;
		const { _id, title, body, author, tag, comment, upvotes, downvotes } = this.state;
		const self = this;
		
		if(this.state.comment_changed || this.state.upvotes_changed || this.state.downvotes_changed){
			return axios.patch(`http://localhost:8000/api/articles/${_id}`, {
				title,
				body,
				author,
				tag,
				comment,
				upvotes,
				downvotes,
			})
				.then((res) => onEdit(res.data))
				.then(function() {
                    self.setState({ 
						comment_changed: false,
						upvotes_changed: false,
						downvotes_changed: false,
                    })
                });
		}
	}
	
	handleSubmitComment() {
        const { comment_author, comment_body } = this.state;
		this.setState(state => ({
			comment: [...state.comment, {author: comment_author, body: comment_body, date: moment().format()}],
			comment_author: '',
			comment_body: '',
			comment_changed: true,
		}));
	}

	handleSubmitupvotes() {
		this.setState(state => ({
			upvotes: state.upvotes+1,
			upvotes_changed: true,
		}));
	}

	handleSubmitdownvotes() {
		this.setState(state => ({
			downvotes: state.downvotes+1,
			downvotes_changed: true,
		}));
	}

	handleChangeField(key, event) {	
		const val = event.target.value;
		this.setState(state => ({
			[key]: val,
		}));
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
			$('.shadow_letter').map(function() {
				$(this).css({
					"left": randomIntFromInterval(0, 100)+"%"
				});;
			});
		});
	}

	_FormatNumberLength(num, length) {
		var r = "" + num;
		while (r.length < length) {
			r = "0" + r;
		}
		return r;
	}

	_handleMouseMove() {
        $('.first_section_post').mousemove(function(e){
            var width = $(this).width() / 2;
            var height = $(this).height() / 2;
            var amountMovedX = ((width - e.pageX) * 1 / 16);
            
            $('.first_section_post .shadow_letter').css('right', amountMovedX);
        });
	}
	
    render() {
		const { articles, articleToEdit } = this.props;
        const { match } = this.props;
		const { title, body, author, tag, comment, comment_author, comment_body, upvotes, downvotes } = this.state;
		
		return (
            <FullPage scrollMode={'normal'}>
				<Slide>
					<section id='articles_post' className="active first_section_post">
						<div className="wrapper_full">
							<div className="shadow_title">{_.head(_.words(_.get(_.find(articles, {'_id': match.params.postId}), 'title')))}.</div>
							<div className="shadow_letter">{this._FormatNumberLength(_.indexOf(_.orderBy(articles, ['createdAt'], ['asc']), _.find(articles, {'_id': match.params.postId}))+1, 2)}.</div>
							<div id="box">
								<h1>{_.get(_.find(articles, {'_id': match.params.postId}), 'title')}</h1>
								<p className="text-muted author">by <b>{_.get(_.find(articles, {'_id': match.params.postId}), 'author')}</b>, {moment(new Date(_.get(_.find(articles, {'_id': match.params.postId}), 'createdAt'))).fromNow()}</p>
								<h6 className="text-muted body body_article">
									{
										this.handleJSONTOHTML(_.get(_.find(articles, {'_id': match.params.postId}), 'body'))
									}
								</h6>
								<div className="comments_up_down">
									<p className="text-muted comments"><b>{_.size(_.get(_.find(articles, {'_id': match.params.postId}), 'comment'))}</b> <a href="#comments-modal"><i className="fas fa-comment-alt"></i></a> </p>
									<p className="text-muted upvotes"><b>{_.get(_.find(articles, {'_id': match.params.postId}), 'upvotes')}</b> <button onClick={this.handleSubmitupvotes}><i className="fas fa-thumbs-up"></i></button> </p>
									<p className="text-muted downvotes"><b>{_.get(_.find(articles, {'_id': match.params.postId}), 'downvotes')}</b> <button onClick={this.handleSubmitdownvotes}><i className="fas fa-thumbs-down"></i></button> </p>
								</div>
							</div>
							<div className="comment-modal">
								<div className="modal-inner">
									<div className="modal-content">
									
										<fieldset className="input-field form-group">
											<textarea 
												onChange={(ev) => this.handleChangeField('comment_body', ev)}
												value={comment_body}
												className="validate form-group-input materialize-textarea comment_body" 
												id="comment_body" 
												name="comment_body"
												required="required"
											/>
											<label htmlFor='comment_body'>What do you think ?</label>
											<div className="form-group-line textarea_line"></div>
										</fieldset>
										
										<fieldset className="input-field form-group">
											<input 
												onChange={(ev) => this.handleChangeField('comment_author', ev)}
												value={comment_author}
												className="validate form-group-input comment_author" 
												id="comment_author" 
												type="text" 
												name="comment_author"
												required="required"
											/>
											<label htmlFor='comment_author'>@username</label>
											<div className="form-group-line"></div>
										</fieldset>

										<button onClick={this.handleSubmitComment} className="btn btn-primary pull-right" type="submit">Leave a Comment</button>
									
									</div>
								</div>
							</div>
							<div id="comments-modal" className="comments-modal">
								<div className="modal-inner">
									<div className="modal-content">
									{
										_.isEmpty(_.get(_.find(articles, {'_id': match.params.postId}), 'comment')) ? null : <Comments comment={_.get(_.find(articles, {'_id': match.params.postId}), 'comment')}/>
									}
									</div>
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
					<Footer/>
				</Slide>
            </FullPage>
        )
    }
}


const mapStateToProps = state => ({
	articles: state.home.articles,
	articleToEdit: state.home.articleToEdit,
});

const mapDispatchToProps = dispatch => ({
	onSubmit: data => dispatch({ type: 'SUBMIT_ARTICLE', data }),
	onLoad: data => dispatch({ type: 'HOME_PAGE_LOADED', data }),
	onDelete: id => dispatch({ type: 'DELETE_ARTICLE', id }),
	onEdit: data => dispatch({ type: 'EDIT_ARTICLE', data }),
	setEdit: article => dispatch({ type: 'SET_EDIT', article }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
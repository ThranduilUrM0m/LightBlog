import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { connect } from 'react-redux';
import { FullPage, Slide } from 'react-full-page';
import 'whatwg-fetch';
import { pagination } from 'paginationjs';
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
		function FormatNumberLength(num, length) {
            var r = "" + num;
            while (r.length < length) {
                r = "0" + r;
            }
            return r;
		}
		
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
							callback: function(response, pagination){
								var dataHtml = '<ul>';
								$.each(_.orderBy(response, ['upvotes'], ['asc']), function(index, article){
									var image = $(JSON.parse(article.body)).find('img')[0];
									var tags = "";
									$.each(article.tag, (i, t) => {
										tags += '<li class="tag_item">'+t+'</li>';
									});
									dataHtml += '<li class="article_card"><div class="card card_'+ index +'" data-title='+ _.snakeCase(article.title) +' data-index='+ index+1 +'><div class="shadow_title">'+_.head(_.words(article.title))+'</div><div class="shadow_letter">'+_.head(_.head(_.words(article.title)))+'</div><div class="card-body"><h2>'+article.title+'</h2><p class="text-muted author">by <b>'+article.author+'</b>, '+moment(new Date(article.createdAt)).fromNow()+'</p><button><span><span><span data-attr-span="Read More About it">Read More About it</span></span></span></button><br/><div class="comments_up_down"><p class="text-muted comments"><b>'+_.size(article.comment)+'</b> <i class="fas fa-comment-alt"></i></p><p class="text-muted upvotes"><b>'+article.upvotes+'</b> <i class="fas fa-thumbs-up"></i></p><p class="text-muted downvotes"><b>'+article.downvotes+'</b> <i class="fas fa-thumbs-down"></i></p></div><ul class="text-muted tags">'+tags+'</ul></div></div><div class="body_to_preview"><img src="'+$(image).attr('src')+'"/><span class="index_article">'+FormatNumberLength(index+1,2)+'.</span></div></li>';
								});
								dataHtml += '</ul>';
								container.prev().html(dataHtml);
							}
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
					<section id='articles_blog' className="second_section_blog">
						{/* <Form /> */}
						<div className="data-container"></div>
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
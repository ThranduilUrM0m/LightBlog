import React from 'react';
import axios from 'axios';
import moment from 'moment';
import Footer from '../Footer/Footer';
import { connect } from 'react-redux';
import { FullPage, Slide } from 'react-full-page';
import 'whatwg-fetch';
import { Form } from '../Article';

var _ = require('lodash');

class Blog extends React.Component {
	constructor(props) {
		super(props);
		this.handleDelete = this.handleDelete.bind(this);
    	this.handleEdit = this.handleEdit.bind(this);
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
	render() {
		const { articles } = this.props;
		return (
			<FullPage>
				<Slide>
					<section className="active first_section_blog">
						<div className="wrapper_full">
							<div id="box">
								<h2>{_.get(_.head(_.orderBy(articles, ['createdAt'], ['desc'])), 'title')}</h2>
								<p className="text-muted author">by <b>{_.get(_.head(_.orderBy(articles, ['createdAt'], ['desc'])), 'author')}</b>, {moment(new Date(_.get(_.head(_.orderBy(articles, ['createdAt'], ['desc'])), 'createdAt'))).fromNow()}</p>
								<h6 className="text-muted body">{_.get(_.head(_.orderBy(articles, ['createdAt'], ['desc'])), 'body')}</h6>
								<a href="#" className="readmore">Read More</a>
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
						<Form />
					</section>
				</Slide>
				<Slide>
					<section className="third_section">
						<div className="wrapper_full">
							<div className="top_side">
								<div className="card some_text">
									<div className="card-body">
										<h1 className="display-2">Doodles</h1>
									</div>
								</div>
								<div className="card">
									<div className="card-body">
										<div className="some_text">
											<h4>Schools</h4>
											<p>This is a place where you get to motivate your students, <br/> bring out their creative part, <br/> where you don't need to worry about organizing or statistics again.</p>
										</div>
										<div className="overlay__content">
											<div className="overlay__content-inner">
												<button className="cta-btn">Learn How +</button>
											</div>
										</div>
									</div>
								</div>
								<div className="card">
									<div className="card-body">
										<div className="some_text">
											<h4>The people</h4>
											<p>This is a simple plateform, <br/> where you connect with who we may call the younger version of you, <br/> tell him what you want the younger version of you to hear.</p>
										</div>
										<div className="overlay__content">
											<div className="overlay__content-inner">
												<button className="cta-btn">Learn How +</button>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="bottom_side">
								<div className="card">
									<div className="card-body">
										
										<blockquote className="blockquote text-right some_text">
											<h5>Our Moto!</h5>
											<p className="mb-0">“No one is born hating another person because of the color of his skin, or his background, or his religion. People must learn to hate, and if they can learn to hate, they can be taught to love, for love comes more naturally to the human heart than its opposite.”</p>
											<footer className="blockquote-footer">Nelson Mandela, Long Walk to Freedom</footer>
										</blockquote>

										<div className="overlay__content">
											<div className="overlay__content-inner">
												{
													_.split('H-A-R-D-W-O-R-K-K-I-N-D-N-E-S-S-C-R-E-A-T-I-V-I-T-Y', '-', 26).map((letter, index) => {
														return (
															<p className={index < 8 ? "letter_hardwork" : index < 16 ? "letter_kindness" : "letter_creativity"}>{letter}</p>
														)
														
													})
												}
											</div>
										</div>
									</div>
								</div>
								<div className="card">
									<div className="card-body">

										<blockquote className="blockquote text-right some_text">
											<h5>Projects</h5>
											<p className="mb-0">We not only connect kids around the world and from far, far away rural schools, we also help them build their legacy for the generations to follow</p>
										</blockquote>

										<div className="overlay__content">
											<div className="overlay__content-inner">
												<fieldset className="tasks-list">
													<h5>Our Master to do List</h5>
													<label className="tasks-list-item">
														<input type="checkbox" name="task_1" value="1" className="tasks-list-cb" defaultChecked/>
														<span className="tasks-list-desc">Build The plateform</span>
														<span className="tasks-list-mark"></span>
													</label>
													<label className="tasks-list-item">
														<input type="checkbox" name="task_2" value="1" className="tasks-list-cb" defaultChecked/>
														<span className="tasks-list-desc">Reach a school in a rural harsh zone</span>
														<span className="tasks-list-mark"></span>
													</label>
													<label className="tasks-list-item">
														<input type="checkbox" name="task_3" value="1" className="tasks-list-cb"/>
														<span className="tasks-list-desc">Reach a 100 school in just as harsh a zone</span>
														<span className="tasks-list-mark"></span>
													</label>
													<label className="tasks-list-item">
														<input type="checkbox" name="task_3" value="1" className="tasks-list-cb"/>
														<span className="tasks-list-desc">Change the World</span>
														<span className="tasks-list-mark"></span>
													</label>
												</fieldset>
											</div>
										</div>

									</div>
								</div>
								<div className="card">
									<div className="card-body">
										
										<div className="overlay__content">
											<div className="overlay__content-inner">
												<blockquote className="blockquote text-right some_text">
													<h5>Stories</h5>
													<p className="mb-0">“WHEN GIVEN THE CHOICE BETWEEN BEING RIGHT OR BEING KIND, CHOOSE KIND.”</p>
													<footer className="blockquote-footer">R.J. Palacio, Wonder</footer>
												</blockquote>
											</div>
										</div>

									</div>
								</div>
								<div className="card">
									<div className="card-body">
										
										<blockquote className="blockquote text-right some_text">
											<h6>Great Speakers This Week!</h6>
											<ul>
												{
													articles.map((article, index) => {
														return (
															<li>
																<span>{article.title}</span>
																<p className="text-muted author">by <b>{article.author}</b>, {moment(new Date(article.createdAt)).fromNow()}</p>
															</li>
														)
													})
												}
											</ul>
										</blockquote>
										<div className="overlay__content">
											<div className="overlay__content-inner">
												{/* put an image */}
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
});

const mapDispatchToProps = dispatch => ({
	onLoad: data => dispatch({ type: 'HOME_PAGE_LOADED', data }),
	onDelete: id => dispatch({ type: 'DELETE_ARTICLE', id }),
	setEdit: article => dispatch({ type: 'SET_EDIT', article }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Blog);
import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { connect } from 'react-redux';
import { FullPage, Slide } from 'react-full-page';
import { Link } from 'react-router-dom';
import 'whatwg-fetch';
import { pagination } from 'paginationjs';
import Fingerprint from 'fingerprintjs';
import Footer from '../Footer/Footer';

class Letters extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            _from: [],
            _from_adresse: '',
            _from_city: '',
            _from_country: '',
            _to: [],
            _to_student: '',
            _to_school: '',
            _to_grade: '',
            _to_city: '',
            _to_country: '',
            _body: '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeField = this.handleChangeField.bind(this);
    }
    componentDidMount() {
        const {onLoad} = this.props;
        axios('http://localhost:8000/api/letters')
        .then(function (response) {
            // handle success
            onLoad(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.letterToEdit) {
            this.setState({
                _from: nextProps.letterToEdit._from,
                _to: nextProps.letterToEdit._to,
                _body: nextProps.letterToEdit._body,
            });
        }
    }
    handleSubmit(){
        this.setState(state => ({
            _from: {author: localStorage.getItem('email'), adresse: this.state._from_adresse, city: this.state._from_city, country: this.state._from_country},
            _to: {student: this.state._to_student, school: this.state._to_school, grade: this.state._to_grade, city: this.state._to_city, country: this.state._to_country}
        }), () => {
            const { onSubmit, letterToEdit, onEdit } = this.props;
            const { _from, _to, _body } = this.state;
            const self = this;
            if(!letterToEdit) {
                return axios.post('http://localhost:8000/api/letters', {
                    _from,
                    _to,
                    _body,
                })
                    .then((res) => onSubmit(res.data))
                    .then(function() {
                        self.setState({ 
                            _from: [],
                            _from_adresse: '',
                            _from_city: '',
                            _from_country: '',
                            _to: [],
                            _to_student: '',
                            _to_school: '',
                            _to_grade: '',
                            _to_city: '',
                            _to_country: '',
                            _body: '',
                        })
                    });
            } else {
                return axios.patch(`http://localhost:8000/api/letters/${letterToEdit._id}`, {
                    _from,
                    _to,
                    _body,
                })
                    .then((res) => onEdit(res.data))
                    .then(function() {
                        self.setState({ 
                            _from: [],
                            _from_adresse: '',
                            _from_city: '',
                            _from_country: '',
                            _to: [],
                            _to_student: '',
                            _to_school: '',
                            _to_grade: '',
                            _to_city: '',
                            _to_country: '',
                            _body: '',
                        })
                    });
            }
        });
    }
    handleChangeField(key, event) {
        this.setState({
            [key]: event.target.value,
        });
    }
    render() {
        const { letters } = this.props;
        const { _from_adresse, _from_city, _from_country, _to_student, _to_school, _to_grade, _to_city, _to_country, _body } = this.state;
        return(
            <FullPage scrollMode={'normal'}>
				<Slide>
					<section className="first_section_letters">
                        {
                            _.orderBy(letters, ['createdAt'], ['desc']).map((letter, index) => {
                                return (
                                    <div className={"card card_" + index} data-title={_.head(_.words(letter._body))} data-index={index+1}>
                                        <div className="shadow_title">{_.head(_.words(letter._body))}</div>
                                        <div className="card-body">
                                            <h2>{letter._from.author}</h2>
                                            <p className="text-muted author">by <b>{letter._from.author}</b>, {moment(new Date(letter.createdAt)).fromNow()}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        {/* <div className="wrapper_form">
                            <input
                            onChange={(ev) => this.handleChangeField('_from_adresse', ev)}
                            value={_from_adresse}
                            className="form-control my-3 _from_adresse_letter"
                            placeholder="_from_adresse"
                            />
                            <input
                            onChange={(ev) => this.handleChangeField('_from_city', ev)}
                            value={_from_city}
                            className="form-control my-3 _from_city_letter"
                            placeholder="_from_city"
                            />
                            <input
                            onChange={(ev) => this.handleChangeField('_from_country', ev)}
                            value={_from_country}
                            className="form-control my-3 _from_country_letter"
                            placeholder="_from_country"
                            />
                            <input
                            onChange={(ev) => this.handleChangeField('_to_student', ev)}
                            value={_to_student}
                            className="form-control my-3 _to_student_letter"
                            placeholder="_to_student"
                            />
                            <input
                            onChange={(ev) => this.handleChangeField('_to_school', ev)}
                            value={_to_school}
                            className="form-control my-3 _to_school_letter"
                            placeholder="_to_school"
                            />
                            <input
                            onChange={(ev) => this.handleChangeField('_to_grade', ev)}
                            value={_to_grade}
                            className="form-control my-3 _to_grade_letter"
                            placeholder="_to_grade"
                            />
                            <input
                            onChange={(ev) => this.handleChangeField('_to_city', ev)}
                            value={_to_city}
                            className="form-control my-3 _to_city_letter"
                            placeholder="_to_city"
                            />
                            <input
                            onChange={(ev) => this.handleChangeField('_to_country', ev)}
                            value={_to_country}
                            className="form-control my-3 _to_country_letter"
                            placeholder="_to_country"
                            />
                            <input
                            onChange={(ev) => this.handleChangeField('_body', ev)}
                            value={_body}
                            className="form-control my-3 _body_letter"
                            placeholder="_body"
                            />
                            <button onClick={this.handleSubmit} className="btn btn-primary float-right submit_letter">{letterToEdit ? 'Update' : 'Submit'}</button>
                        </div> */}
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
    letters: state.home.letters,
});

const mapDispatchToProps = dispatch => ({
    onLoad: data => dispatch({ type: 'LETTER_PAGE_LOADED', data }),
    onSubmit: data => dispatch({ type: 'SUBMIT_LETTER', data }),
});
  
export default connect(mapStateToProps, mapDispatchToProps)(Letters) 
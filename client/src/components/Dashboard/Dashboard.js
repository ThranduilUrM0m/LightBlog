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

class Dashboard extends React.Component {
    constructor(props){
        super(props);
    }
    componentDidMount() {
        const {onLoad} = this.props;
    }
    render() {
        return(
            <FullPage scrollMode={'normal'}>
				<Slide>
					<section className="first_section_dashboard">
                        <div className="wrapper_full">

                            <div className="dashboard_menu">

                            </div>

                            <ul className="cards">
                                <li className="cards__item">
                                    <div className="card">
                                        <div className="card__content">
                                            <div className="card__title">Students</div>
                                        </div>
                                    </div>
                                </li>
                                <li className="cards__item">
                                    <div className="card">
                                        <div className="card__content">
                                            <div className="card__title">SECOND</div>
                                        </div>
                                    </div>
                                </li>
                                <li className="cards__item">
                                    <div className="card">
                                        <div className="card__content">
                                            <div className="card__title">THIRD</div>
                                        </div>
                                    </div>
                                </li>
                                <li className="cards__item">
                                    <div className="card">
                                        <div className="card__content">
                                            <div className="card__title">FOURTH</div>
                                        </div>
                                    </div>
                                </li>
                            </ul>

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
    letters: state.home.letters,
});

const mapDispatchToProps = dispatch => ({
    onLoad: data => dispatch({ type: 'LETTER_PAGE_LOADED', data }),
    onSubmit: data => dispatch({ type: 'SUBMIT_LETTER', data }),
});
  
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard) 
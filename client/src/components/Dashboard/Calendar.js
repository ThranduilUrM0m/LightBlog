import React from "react";
import axios from 'axios';
import moment from 'moment';
import { connect } from 'react-redux';
var _ = require('lodash');

class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentMonth: new Date(),
            selectedDate: new Date()
        };
        this.renderHeader = this.renderHeader.bind(this);
        this.renderDays = this.renderDays.bind(this);
        this.renderCells = this.renderCells.bind(this);
        this.onDateClick = this.onDateClick.bind(this);
        this.nextMonth = this.nextMonth.bind(this);
        this.prevMonth = this.prevMonth.bind(this);
    }
    componentDidMount() {
        /* const { onLoadStudent, onLoadEvent } = this.props;
        const self = this;

        axios('http://localhost:8000/api/students')
        .then((res) => onLoadStudent(res.data))
        .then((res) => {
            
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        }); */
    }
    renderHeader() {
        return (
            <div className="header row flex-middle">
                <div className="col col-start">
                    <div className="calendar_icon_div">
                        <p className="calendar_icon"><span className='a'>{ moment(this.state.currentMonth).format('ddd') }</span> <span className='b'>{ moment(this.state.currentMonth).format('D') }</span></p>
                    </div> 
                    <span className='p'>
                        { moment(this.state.currentMonth).format('MMMM YYYY') }
                    </span>
                </div>
                <div className="col col-center" onClick={this.prevMonth}>
                    <div className="icon">chevron_left</div>
                </div>
                <div className="col col-end" onClick={this.nextMonth}>
                    <div className="icon">chevron_right</div>
                </div>
            </div>
        );
    }
    renderDays() {
        const days = [];
        let startDate = moment(this.state.currentMonth).startOf('week');
        
        for (let i = 0; i < 7; i++) {
            days.push(
                <div className="col col-center" key={i}>
                    { moment(moment(startDate).add(i, 'days')).format('ddd') }
                </div>
            );
        }

        return <div className="days row">{days}</div>;
    }
    renderCells() {
        const { currentMonth, selectedDate } = this.state;
        const monthStart = moment(currentMonth).startOf('M');
        const monthEnd = moment(monthStart).endOf('M');
        const startDate = moment(monthStart).startOf('week');
        const endDate = moment(monthEnd).endOf('week');
        
        const rows = [];

        let days = [];
        let day = startDate;
        let formattedDate = "";

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = moment(day).format('D');
                const cloneDay = day;
                days.push(
                    <div
                    className={`col cell ${
                        !moment(day).isSame(monthStart, 'month')
                        ? "disabled"
                        : moment(day).isSame(selectedDate, 'day')
                        ? "selected"
                        : moment(day).isSame()
                        ? "birthday"
                        : ""
                    }`}
                    key={day}
                    onClick={() => this.onDateClick( moment(cloneDay) )}
                    >
                        <span className="number">{formattedDate}</span>
                        <span className="bg">{formattedDate}</span>
                    </div>
                );
                day = moment(day).add(1, 'days');
            }
            rows.push(
                <div className="row" key={day}>
                    {days}
                </div>
            );
            days = [];
        }

        return <div className="body">{rows}</div>;
    }
    onDateClick(day) {
        this.setState({
            selectedDate: day
        });
    }
    nextMonth() {
        this.setState({
            currentMonth: moment(this.state.currentMonth).add(1, 'M').format('MMMM YYYY')
        });
    }
    prevMonth() {
        this.setState({
            currentMonth: moment(this.state.currentMonth).subtract(1, 'M').format('MMMM YYYY')
        });
    }
    render() {
        return (
            <div className="calendar">
                {this.renderHeader()}
                {this.renderDays()}
                {this.renderCells()}
            </div>
        )
    }
}

export default Calendar;
import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class Letters extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillReceiveProps(nextProps) {
        
    }
    render() {
        return (
            <div className="col-12 col-lg-6 offset-lg-3">
                <h1>Letters</h1>
            </div>
        )
    }
}
  
export default Letters;
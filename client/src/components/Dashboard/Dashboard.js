import React from 'react';
import API from '../../utils/API';

class Dashboard extends React.Component {
    constructor(props){
        super(props);
        this.disconnect = this.disconnect.bind(this);
    }
    disconnect(event) {
        API.logout();
        window.location = "/";
    }
    render() {
        return(
            <div className="Dashboard">
                <h1>Dashboard</h1>
                <button 
                type='submit' 
                name='btn_login' 
                className='col s12 btn btn-large waves-effect login'
                onClick={this.disconnect}
                >
                    Logout
                </button>
            </div>
        )
    }
}

export default Dashboard;
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

import App from './components/App/App';
import NotFound from './components/App/NotFound';
import Home from './components/Home/Home';
import Blog from './components/Blog/Blog';
import Post from './components/Post/Post';
import Dashboard from './components/Dashboard/Dashboard';
import PrivateRoute from './components/PrivateRoute';

import '../resources/scss/style.scss';

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/blog" component={Blog}/>
				  <Route path={`/blog/:postId`} component={Post}/>
          <PrivateRoute path='/dashboard' component={Dashboard} />
          <Route component={NotFound}/>
        </Switch>
      </App>
    </Provider>
  </Router>,
  document.getElementById('root'),
);
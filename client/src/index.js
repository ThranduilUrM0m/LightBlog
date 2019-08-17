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
import Letters from './components/Letters/Letters';
import Projects from './components/Projects/Projects';
import Coffee from './components/Coffee/Coffee';
import Education from './components/Education/Education';
import FAQ from './components/FAQ/FAQ';
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
          <Route exact path='/letters' component={Letters} />
          <Route exact path='/projects' component={Projects} />
          <Route exact path='/coffee' component={Coffee} />
          <Route exact path='/education' component={Education} />
          <Route exact path='/faq' component={FAQ} />
          <PrivateRoute path='/dashboard' component={Dashboard} />
          <Route component={NotFound}/>
        </Switch>
      </App>
    </Provider>
  </Router>,
  document.getElementById('root'),
);
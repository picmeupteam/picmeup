import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  Router,
  Route,
  browserHistory,
  IndexRedirect
  } from 'react-router';
import store from './store';
import {
  Main,
  Login,
  Signup,
  UserHome
} from './components';

import Recorder from './components/Recorder';
import VideoList from './components/VideoList';
import { me } from './reducer/user';

// const whoAmI = store.dispatch(me());

// const requireLogin = (nextRouterState, replace, next) =>
//   whoAmI
//     .then(() => {
//       const { user } = store.getState();
//       if (!user.id) replace('/login');
//       next();
//     })
//     .catch(err => console.log(err));


ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Main}>
        <IndexRedirect to="/home" />
        <Route path="home" component={UserHome} />
        <Route path="signup" component={Signup} />
        <Route path="record" component={Recorder} />
        <Route path="videos" component={VideoList} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);

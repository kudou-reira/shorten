import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import createHistory from 'history/createBrowserHistory';
// import { withRouter} from 'react-router-dom'
import { Router, Route, browserHistory } from 'react-router';
// import { PropTypes } from 'react';

import Signup from '../components/signup';
import Links from '../components/links';
import NotFound from '../components/notFound';
import Login from '../components/login';

const unauthPages = ['/', '/signup'];
const authPages = ['/links'];

//locks page if logged in
const onEnterPublicPage = () => {
	if(Meteor.userId()){
		browserHistory.replace('/links');
	}
};

const onEnterPrivatePage = () => {
	if(!Meteor.userId()){
		browserHistory.replace('/');
	}
};

export const onAuthChange = (isAuth) => {
	const pathname = location.pathname;

  	//returns booleans
  	const isUnauthPage = unauthPages.includes(pathname);
  	const isAuthPage = authPages.includes(pathname);

  	if(isUnauthPage && isAuth){
  		browserHistory.replace('/links');
  	}

  	if(!isAuth && isAuthPage){
  		browserHistory.replace('/');
  	}
}

// const history = createHistory();  

export const routes = (
	<Router history={browserHistory}>
		<Route path="/" component={Login} onEnter={onEnterPublicPage} />
		<Route path="/signup" component={Signup} onEnter={onEnterPublicPage} />
		<Route path="/links" component={Links} onEnter={onEnterPrivatePage} />
		<Route path="*" component={NotFound}/>
	</Router>
);
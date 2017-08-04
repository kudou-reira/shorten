import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

import '../imports/startup/simpleSchemaConfig.js';
import { routes, onAuthChange } from '../imports/routes/routes'


Tracker.autorun(() => {
	// tracker autorun responds to reactive
  	// use double !! to switch a type into a boolean
  	const isAuth = !!Meteor.userId();
  	onAuthChange(isAuth);
});

Meteor.startup(() => {
	Session.set('showVisible', true);
  	ReactDOM.render(routes, document.getElementById('app'));
}); 

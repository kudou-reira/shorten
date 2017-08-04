import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';

import '../imports/api/users';
import { LinksCollection } from '../imports/api/linksCollection';
import '../imports/startup/simpleSchemaConfig.js';

Meteor.startup(() => {

	WebApp.connectHandlers.use((req, res, next) => {
		//the link is under _id
		//grab url from /links/sssewqoijdioq
		const _id = req.url.slice(1);

		//either undefined or actual object
		const linkHold = LinksCollection.findOne({ _id: _id });

		if(linkHold){
			res.statusCode = 302;
			res.setHeader('Location', linkHold.url);
			res.end();
			Meteor.call('Links.trackVisit', _id);
			next();
		}

		else{
			next();
		}

	});

	// WebApp.connectHandlers.use((req, res, next) => {
	// 	console.log('this is from custom middleware');
	// 	console.log(req.url, req.method, req.headers, req.query);

	// 	// res.statusCode = 400
	// 	next();
	// });
});

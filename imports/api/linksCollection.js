import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';

export const LinksCollection = new Mongo.Collection('links');

// only run meteor publish if it's on the server
if(Meteor.isServer){
	Meteor.publish('linksSend', function() {
		return LinksCollection.find({ userId: this.userId });
	});
}

Meteor.methods({
	'Links.insert': function(url) {

		if(!this.userId){
			throw new Meteor.Error('not-authorized');
		}

		var urlSchema = new SimpleSchema({
			url: {
				type: String,
				label: 'Your link',
				regEx: SimpleSchema.RegEx.Url
			}
		});

		urlSchema.validate({url});

		LinksCollection.insert({
			_id: shortid.generate(),
			url,
			userId: this.userId,
			visible: true,
			visitedCount: 0,
			lastVisitedAt: null
		})

	},
	'Links.setVisibility': function(_id, visible) {
		if(!this.userId){
			throw new Meteor.Error('not-authorized');
		}

		var visibleSchema = new SimpleSchema({
			_id: {
				type: String,
				min: 1
			},
			visible: {
				type: Boolean
			}
		});

		visibleSchema.validate({_id: _id, visible: visible});

		LinksCollection.update({
			_id: _id,
			userId: this.userId
		}, {
			$set: {
				visible: visible
			}
		});
	},
	'Links.trackVisit': function(_id) {
		var trackSchema = new SimpleSchema({
			_id: {
				type: String,
				min: 1
			}
		});

		trackSchema.validate({_id: _id});

		LinksCollection.update({
			_id: _id
		}, {
			$set: {
				lastVisitedAt: new Date().getTime()
			},
			$inc: {
				visitedCount: 1
			}
		});
	},
	'Links.delete': function(_id) {
		var deleteSchema = new SimpleSchema({
			_id: {
				type: String,
				min: 1
			}
		});

		deleteSchema.validate({_id: _id});

		LinksCollection.remove({_id: _id});
	}
});
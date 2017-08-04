import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import FlipMove from 'react-flip-move';

import { LinksCollection } from '../api/linksCollection';
import LinksListItem from './linksListItem';

class LinksList extends Component {

	constructor(props){
		super(props);
		this.state = {
			links: []
		};
	}

	componentDidMount() {
		this.linksTracker = Tracker.autorun(() => {
			Meteor.subscribe('linksSend');
			const linkHold = LinksCollection.find({
				visible: Session.get('showVisible')
			}).fetch();
			this.setState({links: linkHold});
		})
	}

	componentWillUnmount(){
		console.log('component will unmount Links');
		this.linksTracker.stop();
	}

	renderLinksListItems(){
		if(this.state.links.length === 0){
			return(
				<div className="item">
					<p className="item__status-message">No links found!</p>
				</div>
			);
		}

		const tempList = this.state.links.map((linkItem) => {
			const shortUrl = Meteor.absoluteUrl(linkItem._id);
			return(
				<LinksListItem key={linkItem._id} shortUrl={shortUrl} {...linkItem} />
			);
		})

		return tempList;
	}

	render() {
		return(
			<div>
				<FlipMove maintainContainerHeight={true}>
					{this.renderLinksListItems()}
				</FlipMove>
			</div>
		);
	}
};

export default LinksList;
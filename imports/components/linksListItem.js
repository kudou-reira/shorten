import React, { Component } from 'react';
import Clipboard from 'clipboard';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';


class LinksListItem extends Component {

	constructor(props){
		super(props);

		this.state = {
			copied: false
		}
	}

	componentDidMount() {
		this.clipboard = new Clipboard(this.refs.copy);
		
		this.clipboard.on('success',() => {
			this.setState({copied: true});
			setTimeout(()=> {
				this.setState({copied: false})
			}, 1500);

		}).on('error', () => {
			alert('unable to copy. please manually copy');
		});
	}

	componentWillUnmount() {
		this.clipboard.destroy();
	}

	renderButtonText() {
		if(this.state.copied === true){
			return 'Copied'
		}

		else if(this.state.copied === false){
			return 'Copy'
		}
	}

	renderStats(){
		let visitMessage='';
		let visitedMessage = null;

		if(this.props.visitedCount === 1){
			visitMessage = 'visit';
		}
		else if(this.props.visitedCount > 1 || this.props.visitedCount === 0){
			visitMessage = 'visits';
		}

		if(typeof this.props.lastVisitedAt === 'number'){
			visitedMessage = `(visited ${moment(this.props.lastVisitedAt).fromNow()})`
		}

		return(
			<p className="item__message">{this.props.visitedCount} {visitMessage} {visitedMessage}</p>
		);
	}

	render(){
		return(
			<div className="item">
				<h2>{this.props.url}</h2>
				<p className="item_message">{this.props.shortUrl}</p>
				{this.renderStats()}
				<a href={this.props.shortUrl} target="_blank" className="button button--borders button--link">
					Visit
				</a>
				<button className="button button--borders" ref="copy" data-clipboard-text={this.props.shortUrl}>{this.renderButtonText()}</button>
				<button className="button button--borders" onClick={() => {
					Meteor.call('Links.setVisibility', this.props._id, !this.props.visible);
				}}>
					{this.props.visible ? "Hide" : "Unhide"}
				</button>
			</div>
		);
	}
}

export default LinksListItem;
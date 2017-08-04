import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import Modal from 'react-modal';

class AddLink extends Component{
	
	constructor(props){
		super(props);
		this.state  = {
			url: '',
			isOpen: false,
			error: ''
		}
	}

	onSubmit = (e) => {
		const url = this.state.url;

		e.preventDefault();

		Meteor.call('Links.insert', this.state.url, (err, res) => {
			if(!err){
				this.setState({url: '', isOpen: false, error: ''});
			}

			else{
				this.setState({error: err.reason});
			}
		});
	
	};

	onChange = (e) => {
		this.setState({
			url: e.target.value.trim()
		});
	}

	onAddLink = () => {
		this.setState({isOpen: true});
	}

	onCloseModal = () => {
		this.setState({isOpen: false, url: '', error: ''});
	}

	renderError = () => {
		if(this.state.error){
			return(
				<p>{this.state.error}</p>
			);
		}

	}

	render(){
		return(
			<div>
				<button className="button" onClick={this.onAddLink.bind(this)}>
					+ Add Link
				</button>
				<Modal 
					isOpen={this.state.isOpen}
					contentLabel="Add Link"
					onRequestClose={this.onCloseModal.bind(this)}
					onAfterOpen={() => this.refs.url.focus()}
					className="boxed-view__box"
					overlayClassName="boxed-view boxed-view--modal"
				>
					<h1>Add Link</h1>
					{this.renderError()}
					<form onSubmit={this.onSubmit.bind(this)} className="boxed-view__form">
						<input 
							type="text" 
							ref="url" 
							placeholder="Enter URL here" 
							value={this.state.url}
							onChange={this.onChange.bind(this)}
						 />
						<button className="button">
							Add Link
						</button>
						<button type="button" className="button button--close" onClick={this.onCloseModal.bind(this)}>
							Close
						</button>
					</form>
					
				</Modal>
			</div>
		);
	}
}

export default AddLink;
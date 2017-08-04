import React, { Component } from 'react';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';

class LinkListFilter extends Component {

	constructor(props){
		super(props);
		this.state = {
			showVisible: true
		}
	}

	componentDidMount(){
		this.visibleTracker = Tracker.autorun(() => {
			var logic = Session.get('showVisible');
			this.setState({showVisible: logic});
		})
	}

	componentWillUnmount(){
		this.visibleTracker.stop();
	}

	render() {
		return(
			<div>
				<label className="checkbox">
					<input className="checkbox__box" type="checkbox" checked={!this.state.showVisible} onChange={(e) =>  {
						Session.set('showVisible', !e.target.checked);
					}}/>
					show hidden links
				</label>
			</div>
		);
	}
}

export default LinkListFilter;
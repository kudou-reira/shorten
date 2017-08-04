import React from 'react';
import { Accounts } from 'meteor/accounts-base';

const PrivateHeader = (props) => {

	const onLinkClick = () => {
		Accounts.logout();
	}

	return(
		<div className="header">
			<div className="header__content">
				<h1 className="header__title">{props.title}</h1>
				<button className="button button--text" onClick={onLinkClick} >
					Logout
				</button>
			</div>
		</div>
	);
}

export default PrivateHeader;
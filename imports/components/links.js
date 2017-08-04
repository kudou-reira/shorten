import React from 'react';

import LinksList from './linksList';
import AddLink from './addLink';
import PrivateHeader from './privateHeader';
import LinkListFilter from './linkListFilter';

const Links = () => {
	return(
		<div>
			<PrivateHeader title="List of Links" />
			<div className="page-content">
				<LinkListFilter />
				<AddLink />
				<LinksList />
			</div>
		</div>
	);
};

export default Links;
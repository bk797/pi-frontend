//@flow
import React from 'react';

import NavItem from './navItem';

import {Box} from 'grommet';

const Navigation = () => {
	
	return (
		<Box
			alignSelf="end"
			margin={{"top":"medium","right":"large"}}
			gap="small"
			direction="row"
		>
			<NavItem to="/" label="Home"/>
			<NavItem to="/about" label="About"/>
			<NavItem to="/sample" label="Sample" navState={{"type":"sample"}}/>
		</Box>
	);
}

export default Navigation;
import React from 'react';
import {Link} from 'react-router-dom';

import './navItem.css';

const NavItem = (props) =>{
	const {to,label,navState} = props;

	return(
		<Link to={{pathname:to,state:navState}}>{label}</Link>
	);
}

export default NavItem;
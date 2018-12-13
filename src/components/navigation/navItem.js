//@flow
import React from 'react';
import {Link} from 'react-router-dom';

import './navItem.css';

type Props = {
	to:string,
	label:string,
	navState?:{} //fix this
};

const NavItem = (props:Props) =>{
	const {to,label,navState} = props;

	return(
		<Link to={{pathname:to,state:navState}}>{label}</Link>
	);
}

export default NavItem;
import React from 'react';

import {Heading} from 'grommet';

const Banner = ({label}) => {
	return (	
		<Heading 
			level="1"
			color="dark-2"
			alignSelf="center"
		>
			{label}
		</Heading>
	)
}

export default Banner;
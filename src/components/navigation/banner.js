//@flow
import React from 'react';

import {Heading} from 'grommet';

type Props = {
	label:string
};

const Banner = ({label}:Props) => {
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
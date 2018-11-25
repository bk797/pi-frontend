import React from 'react';

import {Markdown} from 'grommet';

const info = `
[How to download your facebook data](https://www.facebook.com/help/1701730696756992?helpref=hc_global_nav)
[Information on personality insights](https://console.bluemix.net/docs/services/personality-insights/models.html#models)
`;

const About = () =>{

	return(
		<Markdown>{info}</Markdown>
	);

}

export default About;
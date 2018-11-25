import React from 'react';

import Radar from './radar';

import {map} from 'ramda';

import {Tabs, Tab} from 'grommet'


const Infographic = ({radarGraphs}) => {
	const {keys,index} = radarGraphs;
	const toRadar = ({title,data}) => <Tab key={title} title={title}><Radar radarData={{keys,index,data}}/></Tab>
	return (
		<Tabs>
			{map(toRadar,radarGraphs.data)}
		</Tabs>
		);

};

export default Infographic;
//@flow
import React from 'react';

import Radar from './radar';

import {map} from 'ramda';

import {Tabs, Tab} from 'grommet'

type RadarTrait = {
	trait:string,	
	[name:string]:number
}

type RadarNode = {
	title:string,
	data:RadarTrait
}

type RadarData = {
	keys:Array<string>,
	index:string,
	data:Array<RadarNode>
}

type Props = {
	radarGraphs:RadarData
}

const Infographic = (props:Props) => {
	const {radarGraphs} = props;
	const {keys,index} = radarGraphs;
	const toRadar = ({title,data}) => <Tab key={title} title={title}><Radar radarData={{keys,index,data}}/></Tab>
	return (
		<Tabs>
			{map(toRadar,radarGraphs.data)}
		</Tabs>
		);

};

export default Infographic;
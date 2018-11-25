import React from 'react';

import InputFB from './input-types/input-fb';
import InputText from './input-types/input-text';

import {Box,Tabs,Tab} from 'grommet';
import {Redirect} from 'react-router-dom';
import {curry} from 'ramda';

const initialState = {redirect:false,data:{}};

class Input extends React.Component {

	constructor(props){
		super(props);
		this.state = initialState;
	}

	transitionState = curry((type,data) => this.setState({redirect:true,data:{type,data}}));

	sendFb = this.transitionState('fb');

	sendText = this.transitionState('txt');

	render(){
		const {redirect, data} = this.state;
		return (
			<>
			  	<Box 
			  		background="#654B93" 
			  		align="center" 
			  		justify="between"
			  		fill="vertical"
			  		// width="80%"
			  		elevation="small"
			  		pad="xsmall"
			  	>
		  			{
		  				redirect ? 
		  				<Redirect to={{pathname:"/insight",state:data}}/>
			  			:
				  		<Tabs fill={true}>
					  		<Tab title="text">
					  			<InputText onSubmit={this.sendText}/>
					  		</Tab>
					  		<Tab title="facebook chat">
					  			<InputFB onSubmit={this.sendFb}/>
							</Tab>
				 		</Tabs>
			 		}
			 	</Box>
			</>
		);
	}

}

export default Input;
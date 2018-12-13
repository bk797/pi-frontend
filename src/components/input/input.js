//@flow
import React from 'react';

import InputFB from './input-types/input-fb';
import InputText from './input-types/input-text';

import FormInput from '../../class/form-input';

import {Box,Tabs,Tab} from 'grommet';
import {Redirect} from 'react-router-dom';

type Props = {}

type State = {
	redirect: boolean,
	data:FormInput
}

const initialState = {redirect:false,data:{}};

class Input extends React.Component<Props,State> {

	constructor(props:Props){
		super(props);
		this.state = initialState;
	}

	// transitionState = curry((type:string,data:FormInput):void => this.setState({redirect:true,data:{type,data}}));

	transitionState = (type:string):(FormInput=> void) => {
		const component = this;
		return (data:FormInput):void => component.setState({redirect:true,data:{type,data}});
	}

	sendFb:(FormInput=>void) = this.transitionState('fb');

	sendText:(FormInput=>void) = this.transitionState('txt');

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
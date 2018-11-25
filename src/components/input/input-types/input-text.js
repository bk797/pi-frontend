import React from 'react';

import {TextArea, TextInput, Button,Text} from 'grommet';
import {curry} from 'ramda';

const initialState = {text:'',name:''};

class InputText extends React.Component {

	constructor(props){
		super(props);
		this.state = initialState;
	}

	//updates the a state k-v pair
	updateValue = curry((key,event)=>this.setState({[key]:event.target.value}));
	updateText = this.updateValue('text');
	updateName = this.updateValue('name');

	//submits data to parent
	onSubmit = () => this.props.onSubmit({txt:this.state.text,name:this.state.name});

	//count the number of words in a string (groups of characters separated by whitespace)
	wordCount = string => string.trim() === "" ? 0 : string.trim().split(/\s+/).length;

	render(){
		const {text,name} = this.state;
		const words = this.wordCount(text);
		const disable = words < 100 || name.trim().length === 0;
		return (
			<>
				<TextInput onChange={this.updateName} placeholder="author (required)" />
				<TextArea onChange={this.updateText} placeholder="enter text here (>100 words)" rows="10"/>
				<Button 
		 			margin={{"bottom":"xsmall","right":"xsmall"}}
		 			color="#FFEDC0"
		 			active={true}
		 			disabled={disable}
		 			label="Submit"
		 			alignSelf="end"
		 			onClick={this.onSubmit}
		 		/>
				{words < 600 ? <Text level={5} textAlign="center">Minimum 100 words (>600 recommended) <br/></Text> : undefined }
		 		<Text>{`${words} words`}</Text>
	 		</>
		);
	}
}

export default InputText;
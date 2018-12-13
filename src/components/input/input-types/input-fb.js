//@flow
import React from 'react';

import SelectCheck from './select-check';

import FormInput from '../../../class/form-input';

import Dropzone from 'react-dropzone';
import {Box,Markdown,Text} from 'grommet';

type Props = {
	onSubmit: (FormInput) => void,
};

type State = {
	invalid: boolean,
	file?: File,
	names?: Array<string>,
	length?: number
};

type Name = {
	name:string
};

type Message = {
	sender_name:string,
	timestamp_ms:number,
	content?:string,
	type:string
};

type Content = {
	participants: Array<Name>,
	messages: Array<Message>
};

const initialState = {invalid:false};

const WARNING = `
##### KEEP IN MIND BEFORE USE
+ Please do not input any sensitive information
    - I do not recommend using this program unless you know who made this page
`;

class InputFB extends React.Component<Props,State> {
	fileReader: FileReader;

	constructor(props:Props){
		super(props);
		this.state = initialState;
	}

	componentDidMount(){
		this.fileReader = new FileReader();
		this.fileReader.onload = event => {
			const fbMsg = JSON.parse(event.target.result);
			this.setState({names:fbMsg.participants.map(elem => elem.name),length:fbMsg.messages.length});
		}
	}

	onDrop = (newFile:Array<File>) => {
		if(newFile.length === 0){
			//send message on file type 
		} else{
			this.fileReader.readAsText(newFile[0]);
			this.setState({file:newFile[0]});
		}
	}

	validate = (content:Content) => content.participants && content.messages;

	onSubmit = (names:Array<string>) => this.props.onSubmit({file:this.state.file,names});

	reset = () => this.setState(initialState);

	render(){
		const {names,length} = this.state;
		return (
		 	<Box
		 		fill={true}
		 		direction="column"
		 		justify="between"
		 		align="center"
		 	>
		 		{
		 			names ? 
			 			<SelectCheck 
			 				items={names} 
			 				onBack={this.reset} 
			 				onSubmit={this.onSubmit}
			 				header="Choose participants to analyze"
			 			/> : 
					 	<Dropzone 
					 		style={{
					 			"marginTop":"10px",
					 			"background":"#2B0770",
					 			"padding":"5px 6px",
					 			"borderRadius":"30px",
					 			"boxShadow":"0px 1px 10px 1px #2E0B73"
					 		}}
					 		accept='application/json'
						 	onDrop={this.onDrop} 
						 	multiple={false}
					 	>
						 	<div style={{"textAlign":"center"}}>
						 		<Text>Upload a file (.json)</Text>
						 	</div>
					 	</Dropzone>
			 	}
			 	{length ? <Text>{`${length} messages`}</Text> : undefined}
			 	<Markdown>{WARNING}</Markdown>
	 		</Box>
		)
	}
}

export default InputFB;
import React from 'react';

import SelectCheck from './select-check';

import Dropzone from 'react-dropzone';
import {Box,Markdown,Text} from 'grommet';

const initialState = {file:undefined,names:undefined,invalid:false,length:undefined};

const WARNING = `
##### KEEP IN MIND BEFORE USE
+ any data you upload is not private anymore
    - I won't look but I am not smart enough to keep this stuff truly private
+ the contents of any media (images, videos) are not uploaded
`;

class InputFB extends React.Component {

	constructor(props){
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

	onDrop = (newFile) => {
		if(newFile.length === 0){
			//send message on file type 
		} else{
			this.fileReader.readAsText(newFile[0]);
			this.setState({file:newFile[0]});
		}
	}

	validate = content => content.participants && content.messages;

	onSubmit = names => this.props.onSubmit({file:this.state.file,names});

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
		 			names ? <SelectCheck items={names} onBack={this.reset} onSubmit={this.onSubmit}/> : 
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
import React from 'react';

import {CheckBox,Button,Heading,Box} from 'grommet';
import {map} from 'ramda';

class SelectCheck extends React.Component {

	componentDidMount(){
		this.buildInitialState(this.props);
	}

	//set each box to checked by default
	buildInitialState = ({items}) => this.setState(items.reduce((acc,item) => Object.assign(acc,{[item]:true}),{}));

	//check/uncheck target person
	onClick = event => this.setState({[event.target.name]:event.target.checked});

	formCheckBox = item => <CheckBox key={item} label={item} name={item} checked={this.state[item]} onChange={this.onClick}/>

	getCheckBoxItems = items => items ? map(this.formCheckBox,items) : <div/>

	//only submit checked values
	onSubmit = () => this.props.onSubmit(Object.entries(this.state).filter(e => e[1]).map(e=>e[0]));

	render(){
		const {onBack} = this.props;
		const items = this.state ? Object.keys(this.state) : undefined;
		return(
			<>
				<Heading level={3}>choose participants to analyze</Heading>
				{this.getCheckBoxItems(items)}
				<Box
					direction="row"
					alignSelf="end"
				>
					<Button
			 			margin={{"bottom":"xsmall","right":"xsmall"}}
			 			color="#FFEDC0"
			 			active={true}
			 			label="Back"
			 			onClick={onBack}		
					/>
			 		<Button 
			 			margin={{"bottom":"xsmall","right":"xsmall"}}
			 			color="#FFEDC0"
			 			active={true}
			 			label="Submit"
			 			onClick={this.onSubmit}
				 	/>
			 	</Box>
		 	</>
		)
	}
}

export default SelectCheck;
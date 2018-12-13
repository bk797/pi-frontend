//@flow
import React from 'react';

import {CheckBox,Button,Heading,Box} from 'grommet';
import {map} from 'ramda';

type Props = {
	items:Array<string>,
	onBack:()=>void,
	onSubmit:(Array<string>)=>void,
	header:string
};

type State = {
	[name:string]:boolean
};

class SelectCheck extends React.Component<Props,State> {

	componentDidMount(){
		this.buildInitialState(this.props);
	}

	//set each box to checked by default
	buildInitialState = ({items}:Props) => this.setState(items.reduce((acc,item) => Object.assign(acc,{[item]:true}),{}));

	//check/uncheck target person
	onClick = ({currentTarget}:SyntheticEvent<HTMLInputElement>) => this.setState({[currentTarget.name]:currentTarget.checked});

	formCheckBox = (item:string): any => <CheckBox key={item} label={item} name={item} checked={this.state[item]} onChange={this.onClick}/>;

	getCheckBoxItems = (items:Array<string>): Array<any> => map(this.formCheckBox,items);

	//only submit checked values
	onSubmit = () => this.props.onSubmit(Object.keys(this.state).filter(e => this.state[e]));

	render(){
		const {onBack,header} = this.props;
		const items = this.state ? Object.keys(this.state) : undefined;
		return(
			<>
				<Heading level={3}>{header}</Heading>
				{items ? this.getCheckBoxItems(items) : <div/>}
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
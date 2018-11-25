import React from 'react';

import {ScaleLoader} from 'react-spinners';
import {Text} from 'grommet';

import makeCancelable from '../../helper/cancelablePromise';

import './loading.css'

const WARNING_MESSAGE = "This is taking longer than expected.  Try refreshing or checking your internet connection";

const initialState = {warning:false,color:'neutral-1'};

class Loading extends React.Component{
	constructor(props){
		super(props);
		this.state = initialState;
	}

	componentDidMount(){
		const {warnTime} = this.props;
		this.warning = this.timeout(warnTime)
		this.warning.promise.then(this.warn).catch(()=>{});
	}

	componentWillUnmount() {
		this.warning.cancel();
	}

	timeout = warnTime => makeCancelable(new Promise(r => setTimeout(r,warnTime)));

	warn = () => this.setState({warning:true});

	render(){
		const {msg} = this.props;
		const {warning,color} = this.state;
		return(
			<div className="centerChild">
				 <ScaleLoader color="#3D138D"/>
				 <Text color={color}>{warning? WARNING_MESSAGE : msg}</Text>
			</div>
		);
	}

}

// const Loading = (props) => {
// 	let {msg} = props;
// 	return(
// 		<div class="centerChild">
// 			 <ScaleLoader style={{alignSelf:'center'}}/>
// 			 <Text>{msg}</Text>
// 		</div>
// 	);
// }

export default Loading;
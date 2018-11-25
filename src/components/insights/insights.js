import React from 'react';

import {get,post} from '../../helper/json-request';
import makeCancelable from '../../helper/cancelablePromise';
import Infographic from './infographic';
import Loading from '../control/loading';
import ErrorMsg from '../control/error';

import {curry} from 'ramda';


const initialState = {hasLoaded:false,data:undefined,error:undefined};

class Insights extends React.Component {

	constructor(props){
		super(props);
		this.state = initialState;
	}

	//sends the request for data in the server
	componentDidMount() {
		this.getInsights();
	}

	//triggers when switching from insight to sample.  May want to create separate pages for them?
	componentDidUpdate(prevProps){
		if(prevProps.location.state.type !== this.props.location.state.type){
			this.setState(initialState);
			this.getInsights();
		}
	}

	//gets the data based on the props
	getInsights = () => {
		const{type,data} = this.props.location.state;
		this.req = this.buildRequest(type,data);
		this.req.promise.then(this.load).catch(this.error);		
	}

	buildRequest = (type,data) => {
		switch(type){
			case 'sample':
				return makeCancelable(get('/sample'));
			case 'txt':
				return makeCancelable(this.sendText(data));
			case 'fb':
				return makeCancelable(this.sendFile(data));
			default:
				return null;
		}
	}

	componentWillUnmount() {
		this.req.cancel();
	}

	//make a post request with entries of data in the body
	postReq = curry((url,data) => {
		const entries = Object.entries(data);
		const body = new FormData();
		entries.forEach(e => body.append(e[0],e[1]));
		return post(url,body);
	});

	sendFile = this.postReq('/upload/fb');

	sendText = this.postReq('/upload/txt');

	//tells component that data has loaded
	load = data => this.setState({hasLoaded:true,data});

	//creates error message
	error = ({message}) => this.setState({error:message});

	render(){
		const {hasLoaded,data,error} = this.state;
		return(
			error 
			? <ErrorMsg msg={error} />
			: hasLoaded ? <Infographic radarGraphs={data} /> : <Loading msg="fetching data" warnTime={3000}/>
		);
	}

}

export default Insights;
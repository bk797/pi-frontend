import React, { Component, Suspense, lazy } from 'react';
import './App.css';

import Navigation from './components/navigation/navigation';
import Loading from './components/control/loading';
// import Input from './components/input';
// import Banner from './components/banner';
// import Infographic from './components/infographic';

import {Grommet} from 'grommet';
import { BrowserRouter as Router, Route,Switch} from 'react-router-dom';



/*TO DO nEXT TIME
 EXPAND THE RADAR DATA TO A LIST OR KEY VALUE PAIRS
 HAVE INFINITE SCROLL FOR ALL OF THE RADAR DATA THAT WILL BE PASSED DOWN

*/

const STATE = {fileinput:0,showData:1};
Object.freeze(STATE);

const style = {
	display:"flex",
	flexFlow:"column",
	alignItems:"center",
	justifyContent:"between",
	backgroundColor:"#FFF6E1",
}

const initialState = {state:STATE.fileinput};

const Insights = lazy(() => import('./components/insights/insights'));
const About = lazy(()=> import('./components/about/about'));
const Input = lazy(()=> import('./components/input/input'));

class App extends Component {

	constructor(props){
		super(props);
		this.state=initialState;
	}

	transition = (newState,data) => {
		this.setState({state:STATE[newState],data});
	}

	 render() {
		return(
			<Router>
				<Grommet 
					full={true}
					style={style}
				>
					<Navigation/>
					<Suspense fallback={<Loading msg="loading page" warnTime={5000}/>}>
						<Switch>
							<Route path="/" exact component={Input} />
							<Route path="/about" component={About}/>
							<Route path="/sample" component={Insights} />
							<Route path="/insight" component={Insights} />
						</Switch>
					</Suspense>
				</Grommet>
		 	</Router>
		);
	}
}



export default App;
import React from 'react';
import './css/NavBar.css';
import {Link} from 'react-router-dom';
import Button from "@material-ui/core/Button";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

class NavBar extends React.Component
{
	constructor(props){
		super(props);
		this.state = {
			loggedin: props.loggedin,
			user: props.user }
		};

		goBack = () =>
		{
			this.props.history.go(-1);
		}
		
		goShop = () =>
		{
			this.props.history.push('/home');
		}

		render(){
			return (
				    <nav className="NavBar z-depth-0" >
				         <button id="navArrow">
							{ < ArrowBackIosIcon className="BackArrow" onClick={this.goBack}/>}
						</button>
						<a onClick={this.goShop} className="brandLogo">HigherPlace</a>
				    </nav>
				)};
			
}

export default (NavBar);

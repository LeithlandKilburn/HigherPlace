import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import {Redirect} from 'react-router';
import './css/Profile.css';
import firebase from 'firebase';
import { retryStripe } from '../../store/actions/authActions';

class Profile extends Component{
	constructor(props){
		super(props);
		this.state = { redirect: false, goHome: false };
	}

	logout = async () =>
	{
		firebase.auth().signOut().then( () => {
			this.setState(
				{
					...this.state,
					goHome: true,
				}
			)
		});
	}

	retryStripe = () =>
	{
		this.props.retryStripe(firebase.auth().currentUser, this.props.profile.stripeID);
	}

	render()
	{

		if (!this.props.auth.uid)
		{
			return <Redirect to='/login'/>
		}
		const { auth } = this.props;
		console.log(this.props.profile.stripeID);

		let homeFlow = this.state.goHome ? <Redirect to='/home'/> : <div></div>

		return(
			<div align = "center" className = "logout">
			<Button onClick = {this.logout}> Logout</Button>
			<Button onClick = {this.retryStripe}> LOCAL STRIPE ONBOARD! </Button>
			{homeFlow}
			</div> );
	
	}
}

const mapDispatchToProps = (dispatch) =>
{
	return {
		retryStripe: (newUser, stripeID) => dispatch(retryStripe(newUser, stripeID)),
	}
}

const mapStateToProps = (state) => 
{
  console.log(state);
	return {
		authError: state.auth.authError,
		auth: state.firebase.auth,
		profile: state.firebase.profile,
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (Profile);

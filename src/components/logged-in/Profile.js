import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import {Redirect} from 'react-router';
import './css/Profile.css';
import { signOut } from '../../store/actions/authActions';

class Profile extends Component{
	constructor(props){
		super(props);
		this.state={ redirect: false };
	}

	logout = () =>
	{
		this.props.signOut();
		this.props.history.push('/');
	}

	render()
	{

		const { auth } = this.props;
		if (!auth.uid) return <Redirect to='/login'/>

		console.log(("a"< "b"));

		return(
			<div align = "center" className = "logout">
			<Button onClick = {this.logout}> Logout </Button>	
			</div> );
	
	}
}

const mapDispatchToComponent = (dispatch) =>
{
	return {
		signOut: () => { dispatch(signOut()) }
	}
}

const mapStateToProps = (state) => 
{
  console.log(state);
	return {
		authError: state.auth.authError,
		auth: state.firebase.auth
  }
}

export default connect(mapStateToProps, mapDispatchToComponent) (Profile);

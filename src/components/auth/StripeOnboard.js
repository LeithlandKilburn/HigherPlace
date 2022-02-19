import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import {Redirect} from 'react-router';
import firebase from 'firebase';
import axios from 'axios';
import { functions } from '../../config/fbConfig';
import '../logged-in/css/Profile.css';
import { signUp } from '../../store/actions/authActions';

class StripeOnboard extends Component{
	constructor(props){
		super(props);
	}

	componentDidMount = () =>
	{
		/*const db = firebase.firestore();
        console.log(this.props.auth.uid);
		db.collection("users").where("userID", "==", this.props.auth.uid).
		get().then((querySnapshot) => 
        {
            console.log(querySnapshot.docs);
            console.log(querySnapshot.docs[0].data().stripeSuccess);
            if (querySnapshot.docs[0].data().stripeSuccess)
            {
                window.location.href = "https://us-central1-higherplace-d3623.cloudfunctions.net/addMessage?text=Recreate%20Stripe%20Link";
                
            }
        });
        axios.get('https://jsonplaceholder.typicode.com/posts?_limit=15')
            .then( res => {
                console.log(res)
            }).catch( err => {console.log(err)});*/
        
        
	}

    handleClick = () =>
    {
        window.location.href = 'https://connect.stripe.com/setup/s/UCxTzmbaZtk3';
    }

	render()
	{

		const { auth } = this.props;
		if (!auth.uid) return <Redirect to='/login'/>

		return(
            <div>
                <h1>Stripe Onboarding</h1> 
                <button onClick={this.handleClick}>Try Stripe</button>
            </div>
        );
	
	}
}

const mapDispatchToProps = (dispatch) =>
{
	return {
		signUp: (newUser) => { dispatch(signUp(newUser)) }
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

export default connect(mapStateToProps, mapDispatchToProps) (StripeOnboard);

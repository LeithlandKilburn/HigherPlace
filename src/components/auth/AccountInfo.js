import React, { Component } from 'react';
import './css/Login.css';
import { signUp } from '../../store/actions/authActions';
import { artCont } from '../../store/actions/authActions';
import { connect } from 'react-redux';
import firebase from 'firebase';
import {Redirect} from 'react-router';


class AccountInfo extends Component
{
		constructor( props )
    {
			super( props );
		  this.state = 
		  {
        profilePic: null,  
        email: "",
        password: "",
        username: "",
        city: "",
        test: "",
        labelWidth: 0,
      }
    }

    componentDidMount = () =>
    {
      if (this.props.tempAcc)
      {
        this.setState({
          ...this.state,
          email: this.props.tempAcc.email,
          password: this.props.tempAcc.password,
          username: this.props.tempAcc.username,
          city: this.props.tempAcc.city,
        })
      }
    }

    handleChange = (e) =>
    {
        this.setState(
        {
            ...this.state,
            [e.target.name] : e.target.value 
        }, () => {
          console.log(this.state);
        })
    }

    handleSubmit = (e) =>
    {
        e.preventDefault();
        console.log(this.state);
    }

    fileSelected = (e) => 
    {
      let file = e.target.name;
      URL.revokeObjectURL(this.state.file); 
      this.setState({
          ...this.state,
          [e.target.name]: URL.createObjectURL(e.target.files[0])
      });
      console.log(e.target.files[0]);
      console.log(typeof this.state.profilePic);

      // Upload Selected File.
      const storageRef = firebase.storage().ref(`/projectPhoto/${e.target.name}`) ;
      const task = storageRef.put(e.target.files[0]);
      task.on('state_changed', snapshot => {
          let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          this.setState({
              ...this.state,
              uploadValue: percentage
          })
      }, error => {console.log(error.message)}, () => {
          this.setState({
              ...this.state,
              uploadValue: 100,
          })
      });
    }

    buttonFinish = () =>
    {
      this.setState({
        ...this.state,
        profession: [this.state.profession.pro1, this.state.profession.pro2],
      }, () => {
        this.props.signUp(this.state);
      })
      
    }

    buttonContinue = (e) =>
    {
      this.props.artCont(this.state);
      this.props.history.push('/ArtistSignUp');
      
    }
          
    render()
    {
        const { auth } = this.props;
        if (auth.uid) return <Redirect to='/home'/>

        return (
            <div className ="container">
                <div>
                <h1 className="center"> HigherPlace</h1>
                <br/>

                <div className="loginInfo collection"/>

                <input type="file" onChange={this.fileSelected} name="profilePic" id="profilePic"/>
                <form>
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" id="username" value={this.state.username} onChange={this.handleChange} required=""/>

                    <label htmlFor="email">Email</label>
                    <input type="email" name="email"  id="email" value={this.state.email} onChange={this.handleChange} required/>
                    
                    <label htmlFor="password">Password</label>
                    <input type="text" name="password" id="password" value={this.state.password} onChange={this.handleChange} required/>

                    <label htmlFor="address">City of Residence</label>
                    <input type="text" name="city" id="address" value={this.state.city} onChange={this.handleChange} required/>
                </form>
                </div>

                <div className="AccFinish">
                  <h5>Finish</h5>
                  <button className="AccButtons" onClick={this.buttonFinish} >Finish</button>
                  <h5>Continue Artist Sign Up</h5>
                  <button className="AccButtons" onClick={this.buttonContinue} variant="contained">Continue</button>
                </div>

            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (newUser) => dispatch(signUp(newUser)),
        artCont: (newUser) => dispatch(artCont(newUser))
    }
}

const mapStateToProps = (state) => 
{
  console.log(state);
	return {
		auth: state.firebase.auth,
    tempAcc: state.auth.tempAcc,
  }
}


export default (connect(mapStateToProps, mapDispatchToProps) (AccountInfo));

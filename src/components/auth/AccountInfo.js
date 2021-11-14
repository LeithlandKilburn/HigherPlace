import React, { Component } from 'react';
import Button from "@material-ui/core/Button";
import { firestoreConnect } from 'react-redux-firebase';
import './css/Login.css';    
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { signUp } from '../../store/actions/authActions';
import { connect } from 'react-redux';
import firebase from 'firebase';
import {Redirect} from 'react-router';
import Stylesheet from './css/Stylesheet';


const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing.unit * 2,
    },
  });

class AccountInfo extends Component
{
		constructor( props ){
			super( props );
		  this.state = 
		  {
        profilePic: null,  
        email: "",
        password: "",
        username: "",
        address: "",
        test: "",
        artist: false,
        profession1: "",
        profession2: "",
        labelWidth: 0,
      }
  
			this.buttonFinish = this.buttonFinish.bind( this );
    };

    handleChange = (e) =>
    {
        this.setState(
        {
            ...this.state,
            [e.target.name] : e.target.value 
        })
        console.log(this.state); 
    }

    handleChange2 = name => event => {
        this.setState({ 
          ...this.state,
          [name]: event.target.value
        });
        this.setState({ 
          ...this.state,
          profession1: event.target.value,
          artist: true
        });
        console.log(this.state);
      };
      
      handleChange3 = name => event => {
        this.setState({ 
          ...this.state,
          [name]: event.target.value 
        });
        this.setState({ 
          ...this.state,
          profession2: event.target.value,
          artist: true
         });
        console.log(this.state);
      };

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

    buttonFinish = (e) =>
    {
      // Double check that firebase stores hashed passwrods automatically.
      const bcrypt = require('bcryptjs');
      const saltRounds = 10;
      bcrypt.genSalt(saltRounds, function(err, salt) {
              bcrypt.hash(this.state.password, salt, function(err, hash) {
                this.setState({
                  ...this.state,
                  password: hash
                })  
                console.log(`Bcrypt is working and salt is:${salt}.
                The hashed password is ${hash}.`);
              });
            });
      this.props.signUp(this.state);
    }
          
    render()
    {
        const { classes } = this.props;
        const { auth } = this.props;
        if (auth.uid) return <Redirect to='/home'/>

        return (
            <div className = "container">
            <Stylesheet/>
                <div>
                <h1 className="center"> HigherPlace</h1>
                <br/>

                <div className="loginInfo collection"/>

                <input type="file" onChange={this.fileSelected} name="profilePic" id="profilePic"/>
                <form>
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" id="usernmae" onChange={this.handleChange} required=""/>

                    <label htmlFor="email">Email</label>
                    <input type="email" name="email"  id="email" onChange={this.handleChange} required/>
                    
                    <label htmlFor="password">Password</label>
                    <input type="text" name="password" id="password" onChange={this.handleChange} required/>

                    <label htmlFor="address">City of Residence</label>
                    <input type="text" name="address" id="address" onChange={this.handleChange} required/>
                </form>
                </div>
                
                <div>
                  <br/>
                  <h5 className="center">Join HigherPlace's Artist Community!</h5>
                  <h6 className="center"> Choose Up To 2 Professions</h6>
                  <br/>
                </div>

                <div className="center">
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor="profession-native-simple">profession1</InputLabel>
                        <Select
                          native
                          value={this.state.profession1}
                          onChange={this.handleChange2('profession')}
                          inputProps={{
                            name: 'profession',
                            id: 'profession-native-simple',
                          }}
                        >
                          <option value=""/> 
                          <option value={9}>None</option> 
                          <option value={10}>Painter</option>
                          <option value={20}>Graphic Artist</option>
                          <option value={30}>Illustrator</option>
                          <option value={40}>3D Artist</option>
                          <option value={50}>Photographer </option>
                          <option value={60}>Videographer </option>
                          <option value={70}>Music Producer </option>
                          <option value={80}>Barber </option>
                          <option value={90}>Hairstylist </option>
                          <option value={100}>Makeup Artist </option>
                          <option value={110}>Tattoo Artist </option>
                        </Select>
                    </FormControl>

                { /* Second Profession */}
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="profession-native-simple">profession2</InputLabel>
                  <Select
                    native
                    value={this.state.profession2}
                    onChange={this.handleChange3('profession')}
                    inputProps={{
                      name: 'profession',
                      id: 'profession-native-simple',
                    }}
                  >
                    <option value=""/> 
                    <option value={9}>None</option> 
                    <option value={10}>Painter</option>
                    <option value={20}>Graphic Artist</option>
                    <option value={30}>Illustrator</option>
                    <option value={40}>3D Artist</option>
                    <option value={50}>Photographer </option>
                    <option value={60}>Videographer </option>
                    <option value={70}>Music Producer </option>
                    <option value={80}>Barber </option>
                    <option value={90}>Hairstylist </option>
                    <option value={100}>Makeup Artist </option>
                    <option value={110}>Tattoo Artist </option>
                  </Select>
                </FormControl>
                </div>
                <Button className="finish" onClick={this.buttonFinish} variant="contained">Continue</Button>


                
            </div>

            
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (newUser) => dispatch(signUp(newUser))
    }
}

const mapStateToProps = (state) => 
{
  console.log(state);
	return {
		auth: state.firebase.auth
  }
}


export default withStyles(styles) (connect(mapStateToProps, mapDispatchToProps) (AccountInfo));

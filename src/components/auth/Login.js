import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn } from '../../store/actions/authActions';
import './css/Login.css';
import Button from '@material-ui/core/Button';
import {Redirect } from 'react-router';
var authError = "";
class LoginInfo extends Component
{
   constructor(props){
		super(props);
        this.state =
        {
            email: "",
            password: "",
        }
    }
        
    handleChange = ({target}) =>
    {
        this.setState ({
            ...this.state,
            [target.name] : target.value 
        }) 
    }

    handleSubmit = (e) =>
    {
        e.preventDefault();
        authError = this.props.authError;
        this.props.signIn(this.state); 
    }

    buttonLogin = (e) =>
    {
        this.props.signIn(this.state);
            authError = this.props.authError;
    }

    buttonAccount = () => {
        this.props.history.push('/AccountInfo');      
    } 
    
    componentDidMount()
    {
        console.log("Login mounted")
    }

    render()
    {
        const { auth } = this.props;
        if (auth.uid) return <Redirect to='/profile'/>

        return (
            <div className = "Container">
            <h1 className="center"> HigherPlace</h1>

            <form onSubmit={this.handleSubmit}>
                <label htmlFor='email'>Email</label>
                <input type="email" id='email' name="email" required="" onChange={this.handleChange}/>
                
                <label htmlFor='password'>Password</label>
                <input type="password" id='password' name="password" required="" onChange={this.handleChange}/>
            </form>

            <div>
                <Button className="container" onClick={this.buttonLogin} variant="contained">Login</Button>
            </div>
            
            <div>
                <Button className="container" onClick={this.buttonAccount} variant="contained">Create Account</Button>
            </div>
            <div className='red-text center'>
                <br/> <br/> <br/>
                { authError ? <p>{authError}</p> : null }
            </div>

            </div>
        )
    }
}  


const mapStateToProps = (state) => 
{
    return {
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) =>
{
    return {
        signIn: (creds) => { dispatch(signIn(creds)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (LoginInfo);

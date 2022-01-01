import React, { Component } from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import Toolbar from './components/logged-in/';
import Profile from './components/logged-in/Profile'
import Messages from './components/logged-in/Messages/Messages';
import ChatScreen from './components/logged-in/Messages/ChatScreen';
import Galleries from './components/logged-in/Galleries';
import ProjUpload from './components/logged-in/AuxGallery/ProjUpload';
import ProjectPost from './components/logged-in/AuxGallery/ProjectPost';
import ExtendProject from './components/logged-in/AuxGallery/ExtendProject';
import { connect } from 'react-redux';
import Home from './components/logged-in/Home';
import Login from './components/auth/Login'
import AccountInfo from './components/auth/AccountInfo';
import ArtistSignUp from './components/auth/ArtistSignUp';
import { getArtists } from './store/actions/homeActions';
import "./App.css";


class App extends Component
{
	constructor(props){
		super(props)
		this.state = {
			loggedin: false,
			user: "",
			user_address: "",
			artist: ""
		}
	}

  render() 
  {
	const { auth } = this.props;

	return (
				
		<div>
				
					<BrowserRouter>
						<div>
							<Route path="/login" render={(props) => <Login {...props} myfunc = {this.login} /> }/>
							<Route path="/AccountInfo" render={(props) => <AccountInfo {...props} />}/>
							<Route path="/ArtistSignUp" render={(props) => <ArtistSignUp {...props} />}/>
							<Route path = '/galleries/:user' render={(props) => <Galleries {...props} uid={auth.uid} user={this.state.user}/>}/>
							<Route path = '/galleries' render={(props) => <Galleries {...props} uid={auth.uid} user={this.state.user}/>}/>  
							<Route path = '/projUpload' render={(props) => <ProjUpload {...props} user={this.state.user}/>}/>  
							<Route path = '/home' render={(props) => <Home {...props} city={this.props.profile.city} uid={auth.uid} user={this.state.user}/>}/>
							<Route path = '/messages' render={(props) => <Messages {...props} uid={auth.uid} user={this.state.user}/>}/>
							<Route path = '/profile' render={(props) => <Profile {...props} user={this.state.user} />}/>
							<Route path = '/ProjectPost' render={(props) => <ProjectPost {...props} user={this.state.user}/>}/>
							<Route path = '/ExtendProject' render={(props) => <ExtendProject {...props} user={this.state.user}/>}/>
							<Route path = '/ChatScreen' render={(props) => <ChatScreen {...props} user={this.state.user}/>}/>
							<Route path = '/'>
								<div>
									<Route path="/" render={(props) => <Toolbar {...props} />}/>
								</div>
							</Route>
						</div>
					</BrowserRouter>
		</div>
    );
  }
}

const mapStateToProps = (state) => 
{
	return {
		authError: state.auth.authError,
		auth: state.firebase.auth,
		profile: state.firebase.profile,
  }
}

const mapDispatchToProps = (dispatch) =>
{
	return{
        getArtists: (user) => dispatch(getArtists(user)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
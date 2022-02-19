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
import StripeOnboard from './components/auth/StripeOnboard';
import { getArtists } from './store/actions/homeActions';
import { v1 as uuidv1 } from 'uuid';
import { v4 as uuidv4 } from 'uuid';
import firebase from 'firebase';
import { db } from './config/fbConfig'
import { createProject } from './store/actions/galleryActions';
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

	fileUpload = async (state) =>
    {
        // Upload Selected File.
        let uuid1 = uuidv1();
        let refArray = [null, null, null, null, null, null, null];

        let storageRef = firebase.storage().ref(`/projectMedia/${state.userID}/${state.projectTitle}${uuid1}/${uuidv4()}`);
        if (state.thumbnail != null)
        {
            await storageRef.put(state.thumbnail);
            refArray[0] = storageRef.location.path + '_1440x2160';
        }
                    
        let projMedias = [state.projectMedia1, state.projectMedia2, state.projectMedia3, 
            state.projectMedia4, state.projectMedia5, state.projectMedia6];
        for (let i = 0; i < 6; i++) 
        {
            storageRef = firebase.storage().ref(`/projectMedia/${state.userID}/${state.projectTitle}${uuid1}/${uuidv4()}`);
            console.log("Preject media " + (i+1) + "is " + projMedias[i]);
            if (projMedias[i] === null)
            {
                i++;
            } else
            {
                await storageRef.put(projMedias[i]).catch(err => {
					return;
				});
                console.log("Successfuly put " + projMedias[i]);

                // Save reference to the project media to the state to be uplaoded to Firestore.
                console.log(storageRef);
                refArray[i + 1] = storageRef.location.path + '_1440x2160';
            }
        }
		//Create projectID
        let projectID = db.collection("projects").doc().id;

        // Activate the reducer
        let date = Date.now()
        let time = await firebase.firestore.Timestamp.fromDate(new Date(date));
        let newProject = {
            ...state,
            thumbnail: refArray[0],
            projectMedia1: refArray[1],
            projectMedia2: refArray[2],
            projectMedia3: refArray[3],
            projectMedia4: refArray[4],
            projectMedia5: refArray[5],
            projectMedia6: refArray[6],
            userID: this.props.auth.uid,
            projectID: projectID,
            timestamp: time,
        };
		console.log(this.state.thumbnail);
		this.props.createProject(newProject);
		console.log(newProject);
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
                            <Route path="/StripeOnboard" render={(props) => <StripeOnboard {...props} />}/>
							<Route path = '/galleries/:user' render={(props) => <Galleries {...props} uid={auth.uid} user={this.state.user}/>}/>
							<Route path = '/galleries' render={(props) => <Galleries {...props} uid={auth.uid} user={this.state.user}/>}/>  
							<Route path = '/projUpload' render={(props) => <ProjUpload {...props} fileUpload={this.fileUpload} user={this.state.user}/>}/>  
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
		createProject: (project) => dispatch(createProject(project)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
import React, { Component } from 'react';
import "./css/Home.css";
import HigherArtists from "./HigherArtist.js";
import Search from "./Search.js";
import { connect } from 'react-redux';
import {Redirect} from 'react-router';
import { Paper} from '@material-ui/core/';
import SearchIcon from '@material-ui/icons/Search';
import { getArtists } from '../../store/actions/homeActions';
import { getArtist } from '../../store/actions/galleryActions';
import { firebase } from '../../config/fbConfig';

class Home extends Component
{
	constructor(props)
  {
		super(props);
		this.state={
			city: this.props.city,
			loggedin: this.props.location.loggedin,
      username: this.props.location.username 
    }
    console.log("HOME PAGE IS BEING CONSTRUCTED!!!!!");
  };


  goProfile = (userID) =>
  {
    if (userID)
    {
      this.props.getArtist(userID);
      this.props.history.push('/galleries/');
    }
    
    
  }

  componentDidMount = () =>
	{
    console.log(this.props);

    firebase.auth().onAuthStateChanged( () => {
      if (this.props.city) {
        this.props.getArtists(this.props.city);
      }
      else {
        return
      }
    })
  }

   

  render ()
  {
    //Route gaurding
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to='/login'/>


    let higherArtists = this.props.cityArtist ? (
			this.props.cityArtist.map(higherArtist => <HigherArtists key={higherArtist.userID}
        goProfile={this.goProfile} artistInfo={higherArtist}/> )
			) : <p>No artists in your area.</p>
    
    return(
     
        <div className="HomeScreen">

          <Search/>

          <div className="HomeProfiles" style={{
              overflow: 'scroll',
            }}>
              <Paper className="PaperScroll">  
                <div className="profession"><h5>Photographers</h5></div>
                  <div className="scrolling-wrapper">
                      <div className='hs'>
                          {higherArtists}
                          {higherArtists}
                      </div>
                    </div>
                  </Paper>
                  
                
                  <Paper className="PaperScroll">  
                  <div className="profession"><h5>Videographers</h5></div>
                    <div className="scrolling-wrapper">
                        <div className='hs'>
                        {higherArtists}
                        {higherArtists}
                        </div>
                      </div>
                  </Paper>
              
                  <Paper className="PaperScroll">
                  <div className="profession"><h5>Graphic Designers</h5></div>
                      <div className="scrolling-wrapper">
                          <div className='hs'>
                          {higherArtists}
                          {higherArtists}
                          </div>
                        </div>
                  </Paper>
                                

                    <Paper className="PaperScroll">
                    <div className="profession"><h5>Tattoo Artists</h5></div>

                          <div className="scrolling-wrapper">
                            <div className='hs'>
                             {higherArtists}
                             {higherArtists}
                            </div>
                          </div>
                    </Paper>

                    <Paper className="PaperScroll">
                  <div className="profession"><h5>Hair Stylists</h5></div>
                      <div className="scrolling-wrapper">
                          <div className='hs'>
                          
                          </div>
                        </div>
                  </Paper>

                    <Paper className="PaperScroll">
                    <div className="profession"><h5>Makeup Artists</h5></div>

                        <div className="scrolling-wrapper">
                            <div className='hs'>
                            
                            </div>
                          </div>
                      </Paper>
                      </div>
          </div>
          
      )
  }
}

const mapStateToProps = (state) => 
{
	return {
		auth: state.firebase.auth,
    authError: state.auth.authError,
		profile: state.firebase.profile,
		projects: state.project.projects,
    cityArtist: state.home.cityArtist
  }
}

const mapDispatchToProps = (dispatch) =>
{
	return{
        getArtists: (user) => dispatch(getArtists(user)),
        getArtist: (uid) => dispatch(getArtist(uid)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

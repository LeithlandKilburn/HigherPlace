import React, { Component } from 'react';
import "./css/Home.css";
import HigherArtists from "./HigherArtist.js";
import Search from "./Search.js";
import { connect } from 'react-redux';
import {Redirect} from 'react-router';
import { Paper} from '@material-ui/core/';
import { getArtists, filterArtists } from '../../store/actions/homeActions';
import { getArtist } from '../../store/actions/galleryActions';
import { firebase } from '../../config/fbConfig';
import PayRequest from './payment/PayRequest';

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

    if (!this.props.searchObject.null)
    {
      firebase.auth().onAuthStateChanged( () => {
        if (this.props.city) {
          this.props.getArtists(this.props.city);
        }
        else {
          return
        }
      })
    }
  }

  componentDidUpdate = (prevProps, prevState, snapshot) =>
  {
    if (prevProps.searchObject.newQueryTest !== this.props.searchObject.newQueryTest )
    {
        console.log("The Market Has Updated!!", prevProps);
        this.props.filterArtists(this.props.searchObject);
    }
    console.log(this.props.searchObject);
  }

   

  render ()
  {
    //Route gaurding
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to='/login'/>


    //Choose Home or Filtered Artists.
    let marketArtists = (this.props.filteredArtists === null) ? this.props.cityArtists : this.props.filteredArtists;
    console.log(this.props);

    let higherArtists = marketArtists ? (
			marketArtists.map(higherArtist => <HigherArtists key={higherArtist.userID}
        goProfile={this.goProfile} artistInfo={higherArtist}/> )
			) : <p>No artists in your area.</p>
      console.log(higherArtists);

      this.props.searchObject ? console.log(this.props.searchObject) : console.log("Nothing");
    
    return(
     
        <div className="HomeScreen">

          <Search homeCity={this.props.city}/>

          <div className="HomeProfiles" style={{
              overflow: 'scroll',
            }}>
              <Paper className="PaperScroll">  
                <div className="profession"><h5>Photographers</h5></div>
                  <div className="scrolling-wrapper">
                      <div className='hs'>
                          {higherArtists}
                      </div>
                    </div>
                  </Paper>

                  <Paper className="PaperScroll">
                    <div className="profession"><h5>Videographers</h5></div>

                          <div className="scrolling-wrapper">
                            <div className='hs'>
                             {higherArtists}
                            </div>
                          </div>
                    </Paper>

                    <Paper className="PaperScroll">
                    <div className="profession"><h5>Graphic Designers</h5></div>

                          <div className="scrolling-wrapper">
                            <div className='hs'>
                             {higherArtists}
                            </div>
                          </div>
                    </Paper>

                    <Paper className="PaperScroll">
                    <div className="profession"><h5>Visual Artists</h5></div>
                        <div className="scrolling-wrapper">
                            <div className='hs'>
                            {higherArtists}
                            </div>
                          </div>
                    </Paper>
                
                  <Paper className="PaperScroll">  
                  <div className="profession"><h5>Makeup Artists</h5></div>
                    <div className="scrolling-wrapper">
                        <div className='hs'>
                        {higherArtists}
                        </div>
                      </div>
                  </Paper>

                  <Paper className="PaperScroll">
                  <div className="profession"><h5>Models</h5></div>
                      <div className="scrolling-wrapper">
                          <div className='hs'>
                            {higherArtists}
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
    cityArtists: state.home.cityArtist,
    searchObject: state.home.searchObject,
    filteredArtists: state.home.filteredArtists,
  }
}

const mapDispatchToProps = (dispatch) =>
{
	return {
        getArtists: (user) => dispatch(getArtists(user)),
        getArtist: (uid) => dispatch(getArtist(uid)),
        filterArtists: (searchObject) => dispatch(filterArtists(searchObject)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

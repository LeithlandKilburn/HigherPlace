import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { firebase } from '../../config/fbConfig';
import { Paper, Tabs, Tab, Grid } from '@material-ui/core/';
import { displayProfileCard } from '../../store/actions/galleryActions';
import { getGallery } from '../../store/actions/galleryActions';
import { clearGallery } from '../../store/actions/galleryActions';
import ProfileCard from './AuxGallery/ProfileCard';
import ProjectPost from "./AuxGallery/ProjectPost";
import "./AuxGallery/Gallery.css"


/* I will include custom username url's with paid accounts who have paid 
to reserve their usernames so I can use their usernames as a unique identifier 
to query for their projects. */

class Galleries extends Component
{

	hasMounted = false;
	constructor(props)
	{
		super(props);
		this.state = {
			leftGallery: true,
		};

	}

	componentDidMount = () =>
	{
		this.hasMounted = true;
		console.log('GALLERIES HAS MOUNTED!!!!');

		//Load the selected user's gallery into the Gallery Reducer using their unique user id.
		

		firebase.auth().onAuthStateChanged( () => {
			if (this.props.artistID) {
				this.props.getGallery(this.props.artistID);
			}
			else if (this.props.uid)
			{
				this.props.getGallery(this.props.uid);
				return
			}
		  })
		console.log(this.props);
		console.log(this.props.match.params);
		
		console.log(this.props);
			
	}

	stayOnGallery = () =>
	{
		this.setState({
			...this.state,
			leftGallery: false,
		})
	}

	componentWillUnmount = () =>
	{
		if(this.state.leftGallery)
		{
			this.props.clearGallery();
		}
		console.log("THE GALLERY IS UNMOUNTING")
	}

	render ()
	{
		console.log("GALLERIES IS RENDERING")

		if (!this.props.artistID && !this.props.uid)
		{
			return <Redirect to='/login'/>
		}
		
		
		let projectPosts = this.props.projects ? (
			this.props.projects.map(project => <ProjectPost history={this.props.history} stayOnGallery={this.stayOnGallery}
				key={project.projectID} post={project}/> )
			) : <p>Upload some prjects and show your work to potential clients!</p>
		
		return (
			<div className="Gallery">
				<div className="GalleryHeader">
					<ProfileCard history={this.props.history} stayOnGallery={this.stayOnGallery} 
					artist={this.props.artistID} uid={this.props.uid} profile={this.props.profile}/>
					<Tabs value={0} className="tabsWrapper" TabIndicatorProps={{style: {display: "none",},}} centered>
						<Tab label="My Gallery" />
						<Tab label="My Aritsts" />
					</Tabs>
				</div>
				<Paper>
				<div className="scrolling-wrapperGA">
					<div id="GalleryContent">
					<br/>
						<div className="GridItems">
							{projectPosts}
						</div>
					</div>
				</div>
				</Paper>
			</div>
		)
	}
	
}

const mapStateToProps = (state) => 
{
	return {
		authError: state.auth.authError,
		profile: state.firebase.profile,
		auth: state.firebase.auth,
		projects: state.project.projects,
		artistID: state.project.artistID,
  }
}

const mapDispatchToProps = (dispatch) =>
{
	return{
        displayProfileCard: (auth) => dispatch(displayProfileCard(auth)),
		getGallery: (uid) => dispatch(getGallery(uid)),
		clearGallery: () => dispatch(clearGallery()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Galleries);




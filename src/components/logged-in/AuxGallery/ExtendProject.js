import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { firebase } from '../../../config/fbConfig';
import { Card, CardText, Media } from 'react-md';
import CardMedia from '@material-ui/core/CardMedia';
import { displayProfileCard } from '../../../store/actions/galleryActions';
import ExtProjCard from './ExtProjCard.js';
import Aj from "../ajund.jpg";
import "./Gallery.css";
import "./ExtendProject.css";
import { Paper} from '@material-ui/core/';



const styles = themes => ({
	card: {
	  width: 120,
	  display: 'inline-block',
	},
	media: {
	  height: 180,
	},
  
	content: {
	  height: 80,
	}
  });
  
 
  class ExtendProject extends Component {
    
    
    hasMounted = false;
    constructor(props)
	{
		super(props);
		this.state = {
			user: null,
			project: null,
            projectMedia: [],
		}

    }

    componentDidMount = () =>
	{
		this.hasMounted = true;
		//Retrieving the current project from the firestore "Projects" collection.
		const db = firebase.firestore();
		console.log(this.props.history);
		db.collection("projects").where("projectID", "==", this.props.history.location.state.projectID).
		get().then((querySnapshot) => {
			if (this.hasMounted)
			{
				console.log(querySnapshot);
				this.setState(() => {
					return {
						...this.state,
						project: querySnapshot.docs[0].data()
					}
				}, () => {
					console.log(this.props)
					//Creating download references for the media files in Firebase storage.
					let mediaURLs = [];
					let projMedRef = [this.state.project.projectMedia1, this.state.project.projectMedia2, this.state.project.projectMedia3,
						this.state.project.projectMedia4, this.state.project.projectMedia5, this.state.project.projectMedia6];
					console.log(this.state.project.projectMedia1);
					for (let i = 0; i < 6; i++)
					{
						if (projMedRef[i] === null)
						{
							i++;
						}
						else 
						{
							console.log(projMedRef[i]);
							firebase.storage().ref(projMedRef[i]).getDownloadURL().then((url) => {
								console.log(url);
								mediaURLs[i] = url;
								console.log("got the number " + (i + 1) + "URL!")
							}).then(() =>
							{
								this.setState(() => {
									return {
										...this.state,
										projectMedia: mediaURLs
									}
								}, () => {
									console.log(this.state);
									console.log(`${this.state.projectMedia[0]}`);
								})
							}).catch(err => {
								console.log(`Project media num.${i+1} did not load.`);
							})
						}
					}
				})
			}
		})

		
    }
    
    componentWillUnmount = () =>
	{
		this.hasMounted = false;
	}
    
    render ()
    {
        const { classes } = this.props;
        
		let projectPosts = this.state.projectMedia.map(project => 
			(( <img src={project} className="extProjPost"></img> ))
		)
            
            return (
            <div className="ExtGallery">
				<Paper>
					<div className="scrolling-wrapperG" style={{
						position: 'relative',
						height: '1100px',
						overflow: 'scroll',
						marginBottom: '0px'
					}}>
						<ExtProjCard project={this.state.project} user={this.state.user}/>
						<div className="ExtGalleryContent">
							{projectPosts}
						</div>
					</div>
				</Paper>
			</div>
        );
    }
}

const mapStateToProps = (state) => 
{
	return {
		authError: state.auth.authError,
		auth: state.firebase.auth.uid
  }
}

const mapDispatchToProps = (dispatch) =>
{
	return{
        displayProfileCard: (auth) => dispatch(displayProfileCard(auth))
    }
}

export default withStyles(styles) (connect(mapStateToProps, mapDispatchToProps) (ExtendProject));
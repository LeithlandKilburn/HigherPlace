import React, {Component} from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { firebase } from '../../../config/fbConfig';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { Paper, Tabs, Tab, Grid } from '@material-ui/core/';
import withStyles from '@material-ui/core/styles/withStyles';
import Avatar from '@material-ui/core/Avatar';
import { displayProfileCard } from '../../../store/actions/galleryActions';
import "./ExtendProject.css";


class ExtProjCard extends Component
{

	hasMounted = false;
	
	constructor(props)
	{
		super(props);
		this.state = {
			user: null,
			avatar: null,
			project: "",
			title: ""
		}

	}

	componentDidUpdate(prevProps) {
		// Typical usage (don't forget to compare props):
		if (this.props.project !== prevProps.project) 
		{
			this.setState(() => {
				return {
					...this.state,
					project: this.props.project,
					title: this.props.project.projectTitle,
					user: this.props.user,
				}
			})
		}
		console.log(this.state);
	  }

	render()
	{
		// The User's bio
		//const { classes } = this.props;

		return(
			<div className="ProfileCardExt">
				<Paper>
					<Card className="ExtArtCard">
						<CardContent className="ExtContent">
						<Typography variant="body2" text="white" component="p">
						<h6 className="Title">{this.state.title}</h6>
						</Typography>
						<Typography variant="body2" text="white" component="p">
						<p className="Title">{this.state.project.projectDescription}</p>
						</Typography>
						</CardContent>
					</Card>
				</Paper>
			</div>
		);
	}
	
}

const mapStateToProps = (state) => 
{
	return {
		authError: state.auth.authError,
		auth: state.firebase.auth.uid,
		auth1: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) =>
{
	return{
        displayProfileCard: (auth) => dispatch(displayProfileCard(auth))
    }
}

export default ((connect(mapStateToProps, mapDispatchToProps) (ExtProjCard)));


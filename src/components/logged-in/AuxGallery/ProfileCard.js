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
import EmailIcon from '@material-ui/icons/Email';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { displayProfileCard } from '../../../store/actions/galleryActions';
import Gin from "../Gin1.jpg";
import "./Gallery.css"
import "./ProfileCard.css"


const styles = themes => ({
	card: {
	  
	}
  });



class ProfileCard extends Component
{

	hasMounted = false;
	
	constructor(props)
	{
		super(props);
		this.state = {
			avatar: "",
			projects: [],
		}

	}

	inquire = async () => 
	{
		await this.props.stayOnGallery();
		if (!this.props.artist)
		{
			this.props.history.push('/ChatScreen', 
			{chatType: "Inquiries", thisConvo: `${this.props.uid}:${this.props.uid}`, 
				currentUser: this.props.profile.username, receiver: this.state.party2});
		} else
		{
			this.props.history.push('/ChatScreen', 
			{chatType: "Inquiries", thisConvo: `${this.props.artist}:${this.props.uid}`, 
				currentUser: this.props.profile.username, receiver: this.state.party2});
		}
	}

	projUpload = async () =>
	{
		await this.props.stayOnGallery();
		this.props.history.push('/projUpload');
	}

	componentDidMount = async () =>
	{
		this.hasMounted = true;

		//Retrieving the current user's avatar from firebase storage.
		await firebase.storage().ref('/projectPhoto/projectMedia2').getDownloadURL().then((url) => {
			this.setState(() => {
				return {
					...this.state,
					avatar: url,
				}
			})
		}).catch(err => {
			console.log("The avatar did not load");
		})

		if (this.props.artist)
		{
			let party2T = await firebase.firestore().collection("users").doc(this.props.artist).get();
			party2T = party2T.exists ? party2T.data().username : "No One";
			
			this.setState(() => {
				return {
					...this.state,
					party2: party2T,
				}
	
			});
		} else
		{
			this.setState(() => {
				return {
					...this.state,
					party2: this.props.profile.username,
				}
			})
		};
	}

	componentWillUnmount = () =>
	{
		this.hasMounted = false;
	}

	render()
	{
		//Route gaurding
		const { uid } = this.props;
		console.log(this.props);
		if (!uid) return <Redirect to='/login'/>
		
		// The User's bio
		const bio = this.props.profile.bio ? this.props.profile.bio : "No Bio";
		const profession = this.props.profile.profession ? this.props.profile.profession.stringValue : "Not Artist";

		return(
			<div className="ProfileCard">
					<Card className="ArtCard">
						<CardHeader className="Head"
							avatar={
							<Avatar className="AvatarPic" alt="Remy Sharp" src={this.state.avatar}/>
							}
							action={
								<ul className="right">
								<li>
									<button onClick={this.inquire}>
										{<EmailIcon label="Inquire"/> }
									</button>
								</li> 
								<br/>
								<li>
									<button onClick={this.projUpload}>
										{<PersonAddIcon label="Save Artist" /> }
									</button>
								</li> 
							</ul>
						}/>
						<CardContent className="Content">
						<Typography variant="body2" text="white" component="p">
							{profession}
						</Typography>
						<Typography variant="body2" text="white" component="p">
							{bio}
						</Typography>
						<Typography className="CardText" variant="body2" text="white" component="p">
							3 mi
						</Typography>
						</CardContent>
					</Card>
			</div>
		)
	}
	
}

const mapStateToProps = (state) => 
{
	return {
		authError: state.auth.authError,
  }
}

const mapDispatchToProps = (dispatch) =>
{
	return{
        displayProfileCard: (auth) => dispatch(displayProfileCard(auth))
    }
}

export default withStyles(styles)((connect(mapStateToProps, mapDispatchToProps) (ProfileCard)));


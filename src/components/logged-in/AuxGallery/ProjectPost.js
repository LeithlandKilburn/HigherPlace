import React, { Component } from 'react';
import { firebase } from '../../../config/fbConfig';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Gin from "../Gin1.jpg";
import White from "../white.jpg";
import { Grid } from '@material-ui/core';
import "./ProjectPost.css";

class ProjectPost extends Component {

    constructor(props)
	  {
      super(props);
      this.state = {
    
      }
    }

    projectClick = async () => 
    {
      await this.props.stayOnGallery();
      console.log("NOT CLEARING GALLERY!!!")
      this.props.history.push('/ExtendProject', {projectID: `${this.state.project.projectID}`});
    }

    componentDidMount = () => 
    {
      this.setState({
        project: this.props.post,
        title: this.props.post.projectTitle
      }, () => {
        console.log("This is being passed to the project posts => ", this.props.post)

        //Retrieving thumbnail image from Firebase storage.
        //let thumbRef = `${this.props.post.thumbnail.slice(34)}`;
        console.log(this.state.title);
        firebase.storage().ref(`${this.props.post.thumbnail}`).getDownloadURL().then((url) => {
          this.setState(() => {
            return {
              ...this.state,
              thumbnail: url,
            }
          })
        }).catch(err => {
          console.log("The thumbnail did not load");
          
        })
        })
    }
    
    render() 
    {
        const { classes } = this.props;

        return (
            
            
          <div className="projectPost">
            <Card id="projCard" onClick={this.projectClick}>
                <CardMedia
                className="media"
                image= {(this.state.thumbnail) ? (this.state.thumbnail) : White}
                title="Contemplative Reptile"
                />
            </Card>
              <h6 className="Title">{this.state.title}</h6>
            </div>
        );
    }
}

export default ProjectPost;
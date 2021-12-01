import React, {Component} from 'react';
import { firebase } from '../../config/fbConfig';
import { Card} from 'react-md';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import lp11 from "./Gin1.jpg";
import bron from "./bron.jpg";
import lp15 from "./LP-15.jpg";
import "./css/HigherArtists.css";


class HigherArtists extends Component 
{

  constructor(props)
  {
		super(props);
		this.state={
			previewIndex: 0,
      thumbnail: 'hkkj',
    }
  };

  handleClick = (e) =>
  {
    this.props.goProfile(this.props.artistInfo.userID);
  }

  showPreview = (e) =>
  {
    if (this.props.artistInfo.projectPreviews)
    {
      let total = this.props.artistInfo.projectPreviews.length;
      if ((this.state.previewIndex + 1) < total)
      {
        this.setState( (prevState => (
          {
            ...this.state,
            previewIndex: (prevState.previewIndex + 1)
          }
        )))
      } else
      {
        this.setState(
          {
            ...this.state,
            previewIndex: 0,
          }
        )
      }
    }
  }

  componentDidUpdate = (prevProps, prevState) =>
  {
    console.log(prevState);
    if (prevState.previewIndex !== this.state.previewIndex)
    {
      //Retrieving thumbnail image from Firebase storage.
      if (this.props.artistInfo.projectPreviews)
      {
        console.log(this.state.title);
          firebase.storage().ref(`${this.props.artistInfo.projectPreviews[this.state.previewIndex]}`).getDownloadURL().then((url) => {
            this.setState(() => {
              return {
                ...this.state,
                thumbnail: url,
              }
            })
          }).catch(err => {
            console.log("The thumbnail did not load");
            
          })
      }
    }
  }

  componentDidMount = () =>
  {
    if (this.props.artistInfo.projectPreviews)
    {
      //Retrieving thumbnail image from Firebase storage.
      //let thumbRef = `${this.props.post.thumbnail.slice(34)}`;
        console.log(this.state.title);
        firebase.storage().ref(`${this.props.artistInfo.projectPreviews[this.state.previewIndex]}`).getDownloadURL().then((url) => {
          this.setState(() => {
            return {
              ...this.state,
              thumbnail: url,
            }
          })
        }).catch(err => {
          console.log("The thumbnail did not load");
          
        })
      }
  }
  
  render()
  {
    console.log(this.props);

    let pic = this.props.artistInfo.projectPreviews ? this.state.thumbnail : bron;

    return (
            
      <>
       <div className="Artists">
          <Card className="ArtistCard">
              <CardMedia
              className="galleryPrev"
              image= {pic}
              title="Contemplative Reptile"
              onClick={this.showPreview}
              />
          </Card>
          
          <div className="ArtistInfo" onClick={this.handleClick}>
            <Avatar id="Avatar" src={bron} alt="Remy"/>
            <p className="QInfo">{this.props.artistInfo.username}</p>
            <p className="QInfo">{this.props.artistInfo.profession1}</p>
            <p className="ArtistStatus">Available</p>
          </div>
      </div>
   </>
  )
  }
}  

export default HigherArtists;

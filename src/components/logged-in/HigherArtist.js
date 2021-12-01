import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getPreviews} from '../../store/actions/homeActions';
import { firebase } from '../../config/fbConfig';
import { Card} from 'react-md';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import lp11 from "./Gin1.jpg";
import bron from "./bron.jpg";
import lp15 from "./LP-15.jpg";
import "./css/HigherArtists.css";
import { TransferWithinAStation } from '@material-ui/icons';


class HigherArtists extends Component 
{

  constructor(props)
  {
		super(props);
		this.state={
			previewIndex: 0,
    }
  };

  handleClick = (e) =>
  {
    this.props.goProfile(this.props.artistInfo.userID);
  }

  showPreview = (e) =>
  {
    let total = this.props.artistInfo.projectPreviews.length;
    if ((this.state.previewIndex + 1) < total)
    {
      console.log(this.state.previewIndex + 1)
      this.setState( (prevState => (
        {
          ...this.state,
          previewIndex: (prevState.previewIndex + 1),
        }
      )))
    } else
    {
      this.setState( (prevState => (
        {
          ...this.state,
          previewIndex: 0,
        }
      )))
    }
  }

  componentDidMount = async () =>
  {

    //Retrieve all thumbnail URL's 
    if (this.props.artistInfo.projectPreviews)
      {
        if (!(this.props.urlArray[this.props.artistInfo.userID]))
        {
          this.props.getPreviews(this.props.artistInfo.projectPreviews, this.props.artistInfo.userID);
        }
      }
  }

  componentDidUpdate = () => 
  {

  }
  
  render()
  {

    let pic = this.props.urlArray[this.props.artistInfo.userID] ? this.props.urlArray[this.props.artistInfo.userID][this.state.previewIndex] : "o";

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

const mapStateToProps = (state) =>
{
  return {
    urlArray: state.home,
  }
}

const mapDispatchToProps = (dispatch) =>
{
  return {
    getPreviews: (pathsArray, uid) => dispatch(getPreviews(pathsArray, uid)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HigherArtists);

import React, {Component} from 'react';
import { Card} from 'react-md';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import lp11 from "./Gin1.jpg";
import bron from "./bron.jpg";
import lp15 from "./LP-15.jpg";
import "./css/HigherArtists.css";


class HigherArtists extends Component {

  constructor(props)
  {
		super(props);
		this.state={
			
    }
  };

  handleClick = (e) =>
  {
    this.props.goProfile(this.props.artistInfo.userID);
  }
  
  render()
  {
    return (
            
      <>
       <div className="Artists">
          <Card className="ArtistCard">
              <CardMedia
              className="galleryPrev"
              image= {bron}
              title="Contemplative Reptile"
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

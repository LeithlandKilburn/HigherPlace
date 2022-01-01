import React, { Component } from 'react';
import Button from "@material-ui/core/Button";
import { firestoreConnect } from 'react-redux-firebase';
import './css/Login.css';    
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { signUp } from '../../store/actions/authActions';
import { connect } from 'react-redux';
import {Redirect} from 'react-router';
import Checkbox from './Checkbox';

const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing.unit * 2,
    },
  });

class ArtistSignUp extends Component 
{
  constructor( props )
  {
    super( props );
    this.state = {
      profilePic: null,  
      email: "",
      password: "",
      username: "",
      city: "",
      test: "",
      artist: false,
      profession: {},
      labelWidth: 0,
    }
  }

  handleProfession = (e) =>
  {
    console.log(e.target);
    if (e.target.name === "profession1")
    {
      this.setState(
        {
            ...this.state,
            profession : {...this.state.profession, pro1 : e.target.value}
        }, () =>
        {
          console.log(this.state);
        })
    } else
    {
      this.setState(
        {
            ...this.state,
            profession : {...this.state.profession, pro2 : e.target.value}
        }, () =>
        {
          console.log(this.state);
          console.log([this.state.profession.pro1, this.state.profession.pro2]);
        })
    }
  }

  render()
  {
                            /*<select id="ArtistryDrop" className="GiveCursor" ref={this.art1Ref} 
                                value={this.state.StyleTerm} onChange={this.setStyleTerm}>
                                <option value="">Select A Genre (Optional)</option>
                                <option value="editor">Video Editor</option>
                                <option value="events">Events</option>
                                <option value="sports">Sports</option>
                                <option value="music">Music Videos</option>
                                <option value="film">Film/Vintage</option>
                                <option value="product">Product/Commercial</option>
                            </select>*/
    const { auth } = this.props;
    if (auth.uid) return <Redirect to='/home'/>
    console.log(this.props.tempAcc);

    //Style Selector. Style Selector. Style Selector. Style Selector. Style Selector. Style Selector. Style Selector. Style Selector.
    let artDrop = <div></div>;
    let artDrop2 = <div></div>;
    let box = <CheckBoxOutlineBlankIcon/>;
    switch (this.state.profession.pro1)
      {
          case "Photographer":
            artDrop = <div className="styleSelect1">
                        <Checkbox style={"Events"} box={box}/>
                        <Checkbox style={"Sports"} box={box}/>
                        <Checkbox style={"Photoshop/Airbrush"} box={box}/><br/>
                        <Checkbox style={"Studio"} box={box}/>
                        <Checkbox style={"Film/Vintage"} box={box}/>
                        <Checkbox style={"Fashion"} box={box}/>
                        <Checkbox style={"Budoir"} box={box}/><br/>
                        <Checkbox style={"Food"} box={box}/>
                        <Checkbox style={"Prints/Canvas"} box={box}/>
                        <Checkbox style={"Real Estate "} box={box}/>
                      </div>
              break;
          case "Videographer":
            artDrop = <div className="styleSelect1">
                        <Checkbox style={"Video Editor"} box={box}/>
                        <Checkbox style={"Events"} box={box}/>
                        <Checkbox style={"Sports"} box={box}/><br/>
                        <Checkbox style={"Music Videos"} box={box}/>
                        <Checkbox style={"Film/Vintage"} box={box}/><br/>
                        <Checkbox style={"Product/Commercial"} box={box}/>
                      </div>
              break;
          case "Graphic Designer":
            artDrop = <div className="styleSelect1">
                        <Checkbox style={"Flyers"} box={box}/>
                        <Checkbox style={"Logos"} box={box}/>
                        <Checkbox style={"Digital Art"} box={box}/><br/>
                      </div>
              break;
          case "Visual Artist":
            artDrop = <div className="styleSelect1">
                        <Checkbox style={"Painter"} box={box}/>
                        <Checkbox style={"Illustrator"} box={box}/>
                        <Checkbox style={"3D/Sculpting"} box={box}/><br/>
                        <Checkbox style={"Ceramics"} box={box}/>
                        <Checkbox style={"Large Form"} box={box}/><br/>
                        <Checkbox style={"Framed"} box={box}/>
                      </div>
              break;
          case "Fashion Designer":
            artDrop = <div className="styleSelect1">
                        <Checkbox style={"Cultural Clothing"} box={box}/>
                        <Checkbox style={"Dresses"} box={box}/>
                        <Checkbox style={"Jackets"} box={box}/><br/>
                        <Checkbox style={"Studio"} box={box}/>
                        <Checkbox style={"Shoes"} box={box}/>
                        <Checkbox style={"Embroidery"} box={box}/>
                        <Checkbox style={"Bleach"} box={box}/><br/>
                        <Checkbox style={"Tie-Dye"} box={box}/><br/>
                      </div>
              break;
          case "Makeup Artist":
            artDrop = <div className="styleSelect1">
                        <Checkbox style={"Natural"} box={box}/>
                        <Checkbox style={"Soft Glam"} box={box}/>
                        <Checkbox style={"Full Glam"} box={box}/><br/>
                        <Checkbox style={"Matte/Smokey"} box={box}/>
                        <Checkbox style={"Costume"} box={box}/>
                      </div>
              break;
          case "Model":
            artDrop = <div className="styleSelect1">
                        <Checkbox style={"Fashion"} box={box}/>
                        <Checkbox style={"Fitness"} box={box}/>
                        <Checkbox style={"Under/Swimwear"} box={box}/><br/>
                      </div>
              break;
          
          default:
            break
      }
    
    return (
      <div>
        <div>
          <h5 className="center">Join HigherPlace's Artist Community!</h5>
          <h6 className="center"> Choose Up To 2 Professions</h6>
        </div>

        {/* SELECT ARTISTRY SELECT ARTISTRY SELECT ARTISTRY SELECT ARTISTRY SELECT ARTISTRY SELECT ARTISTRY SELECT ARTISTRY SELECT ARTISTRY */}
        <div className="ArtistInfo">
          <select
            className="proSelect" value={this.state.profession.pro1}
            onChange={this.handleProfession} name="profession1"
          >
            <option value="">Select A Profession</option> 
            <option value="Photographer">Photographer</option>
            <option value="Videographer">Videographer</option>
            <option value="Graphic Designer">Graphic Designer</option>
            <option value="Visual Artist">Visual Artist</option>
            <option value="Fashion Designer">Fashion Designer</option>
            <option value="Makeup Artist">Makeup Artist </option>
            <option value="Model">Model</option>
          </select>
          {artDrop}

          <select
            className="proSelect" value={this.state.profession.pro2}
            onChange={this.handleProfession} name="profession2"
          >
            <option value="">Select A Profession (Optional)</option>
            <option value="Photographer">Photographer</option>
            <option value="Videographer">Videographer</option>
            <option value="Graphic Designer">Graphic Designer</option>
            <option value="Visual Artist">Visual Artist</option>
            <option value="Fashion Designer">Fashion Designer</option>
            <option value="Makeup Artist">Makeup Artist</option>
            <option value="Model">Model</option>
          </select>
          {artDrop2}
        </div>

        

        <div className="AccFinish">
          <h5 >Finish Sign Up</h5>
          <button className="AccButtons" onClick={this.buttonFinish} >Finish</button>
        </div>

      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      signUp: (newUser) => dispatch(signUp(newUser))
  }
}

const mapStateToProps = (state) => 
{
  console.log(state);
  return {
    auth: state.firebase.auth,
    tempAcc: state.auth.tempAcc,
  }
}


export default (connect(mapStateToProps, mapDispatchToProps) (ArtistSignUp));
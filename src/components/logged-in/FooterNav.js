import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Galleries from './images/bookmark-multiple.svg';
import Chat from './images/chat.svg';
import Market from './images/market.svg';
import HomeIcon from './images/home.svg';
import NavBar from '../auth/NavBar';
import { connect } from 'react-redux';
import {Redirect} from 'react-router';

const styles = {
    root: {
      position: 'fixed',
      bottom: 0,
      width: '100%',
          zIndex:'100',
    },
  };

class FooterNav extends React.Component 
{
	constructor(props){
		super(props);
  		this.state = {
      value: '',
  	};
    this.handleChange = this.handleChange.bind(this);
		
	};

  handleChange = (event, value) => {
    this.setState({ 
      ...this.state,
      value: value 
    });
		this.props.history.push( "/" + value );
  };

  
  componentDidMount ()
  {
    console.log(this.state.value);
    if (this.state.value === "") this.props.history.push( "profile" );
  }

  render() {
    const { classes } = this.props;
    let { value } = this.state.value;

    return (
      <div>
        <BottomNavigation elevation="12" value={value} onChange={this.handleChange} showLabels className={classes.root}>
        <BottomNavigationAction label="Home" value="profile" icon={<img src={HomeIcon}/>} />
        <BottomNavigationAction label="Market" id="home" value="home" icon={<img src={Market}/>} />
        <BottomNavigationAction label="Galleries" value="galleries" icon={<img src={Galleries}/>} />
        <BottomNavigationAction label="Messages" value="messages" icon={<img src={Chat}/>} />
        </BottomNavigation>
      </div>
    );
  }
}

FooterNav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles) (FooterNav);

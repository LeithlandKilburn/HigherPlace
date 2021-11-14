import React, { Component } from 'react';
import Toolbar from './logged-in'
import { connect } from 'react-redux';

const LoggedIn = () => 
{
  return (
    <Toolbar/>
  )
}

const mapStateToProps = (state) =>
{
  console.log(state);
  return {

  }
}

export default connect(mapStateToProps)(LoggedIn);
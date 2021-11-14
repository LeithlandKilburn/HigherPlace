import React, { Component } from 'react';
import Button from "@material-ui/core/Button";
import { firestoreConnect } from 'react-redux-firebase';
import './css/Login.css';    
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { signUp } from '../../store/actions/authActions';
import { connect } from 'react-redux';
import {Redirect} from 'react-router';
import Stylesheet from './css/Stylesheet';
const opencage = require('opencage-api-client');

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
      constructor(props)
      {
           super(props);
           this.state =
           {
               
           }
      }
  }
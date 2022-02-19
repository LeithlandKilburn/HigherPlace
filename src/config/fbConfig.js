import { GeoFirestore } from 'geofirestore';

export const firebase = require('firebase');

require('firebase/firestore');
require('firebase/auth');
require('firebase/database');
require('firebase/functions');
var config = {
  apiKey: "AIzaSyA49718NOYrIcRocpQwGnNNrHRZBIZAngI",
  authDomain: "higherplace-d3623.firebaseapp.com",
  databaseURL: "https://higherplace-d3623.firebaseio.com",
  projectId: "higherplace-d3623",
  storageBucket: "higherplace-d3623.appspot.com",
  messagingSenderId: "922698813513"
};


firebase.initializeApp(config);
export const db = firebase.firestore();
// Initialize Cloud Functions through Firebase
export const functions = firebase.functions();

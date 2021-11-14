import authReducer from './authReducer'
import projectReducer from './projectReducer'
import inquiryReducer from './inquiryReducer'
import homeReducer from './homeReducer'
import { combineReducers } from 'redux'
import  { firebaseReducer } from 'react-redux-firebase'
import  { firestoreReducer } from 'redux-firestore'

const rootReducer = combineReducers({
    auth: authReducer,
    project: projectReducer,
    inquiry: inquiryReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    home: homeReducer
});

export default rootReducer
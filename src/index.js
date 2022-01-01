import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router} from "react-router-dom";
import './index.css';
import App from './App';
import rootReducer from './store/reducers/rootReducer';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import { firebase } from './config/fbConfig';
import {loadStripe} from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY);

const store = createStore(rootReducer, 
    compose(
        applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore})),
        reduxFirestore(firebase),
        reactReduxFirebase(firebase, {useFirestoreForProfile: true, userProfile: 'users', attachAuthIsReady: true})
    )
); 

store.firebaseAuthIsReady.then(() => {
    ReactDOM.render(

        <Router>
            <Provider store={store}><Elements stripe={stripePromise}><App/></Elements></Provider>
        </Router>, document.getElementById('root'));
})

    



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA

serviceWorker.register();
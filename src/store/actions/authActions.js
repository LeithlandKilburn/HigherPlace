import { firebase, db } from '../../config/fbConfig'
import axios from 'axios';

export const artCont = (newUser) =>
{
    return(dispatch) =>
    {
        let tempAcc = {
            username: newUser.username,
            password: newUser.password,
            email: newUser.email,
            city: newUser.city,
            bio: "this is a bio",
            profession: newUser.profession,
            styles: newUser.styles,
        };

        console.log("Document has been added to firestore.");
        dispatch({ type: 'ART_CONT', tempAcc });
    }
}

export const signUp = (newUser) =>
{
    return async (dispatch) =>
    {
        let userCreds = await firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password,
        );

        let fireObject = {};
        let propArray = ["profession", "style", "ethnicity", "lang",
                            "sexualityTerm", "genderTerm", "ReligionTerm"];
        let fireArray = ["profession", "style", "ethnicity", "languages",
                            "sexuality", "gender", "religion"];
        for (let i = 0; i < 7; i++)
        {
            if (newUser[propArray[i]])
            {
                fireObject[fireArray[i]] = newUser[propArray[i]];
            }
        }

        await db.collection('users').doc(userCreds.user.uid).set({
                username: newUser.username,
                userID: userCreds.user.uid,
                email: newUser.email,
                city: newUser.city,
                ...fireObject,
                stripeSuccess: false,
            });
        
        let idToken = await userCreds.user.getIdToken();
        axios.post('https://us-central1-higherplace-d3623.cloudfunctions.net/onboardStripe/createStripe/', {
            country: 'US',
            email: newUser.email,
            uid: userCreds.user.uid,
        }, { headers: {'Content-Type': 'application/json', 'authorization': 'Bearer ' + `${idToken}`}})
        .then( async (res) => {
            console.log("Document has been added to firestore.");
            console.log(res);
            //window.location.href = res.data.url;
            dispatch({ type: 'SIGNUP_SUCCESS' })
        }).catch(err => {
            console.log(err)
            dispatch({ type: 'SIGNUP_ERROR', err })
        })
    }
}

export const retryStripe = (user, stripeID) =>
{
    return async (dispatch) =>
    {
        console.log(stripeID);
        let idToken = await user.getIdToken();
        axios.patch('https://us-central1-higherplace-d3623.cloudfunctions.net/onboardStripe/createStripe/', {
            country: 'US',
            email: user.email,
            accID: stripeID,
        }, { headers: {'Content-Type': 'application/json', 'authorization': 'Bearer ' + `${idToken}`}})
        .then( async (res) => {
            console.log("RETRY SUCCESS.");
            console.log(res);
            window.location.href = res.data.url;
            dispatch({ type: 'RETRY_SUCCESS' })
        }).catch(err => {
            console.log(err)
            dispatch({ type: 'RETRY_ERROR', err })
        })
    }
}

export const signIn = (credentials) => 
{
    return(dispatch, getState, { getFirebase }) =>
    {

        
        firebase.auth().signInWithEmailAndPassword (
            credentials.email,
            credentials.password
        ).then(() =>
        {
            dispatch({ type: 'LOGIN_SUCCESS'});
        }).catch((err) =>
        {
            dispatch({ type: 'LOGIN_ERROR', err});
        })
    }
}

export const signOut = () => 
{
    return (dispatch) => {

        dispatch({ type: 'SIGNOUT_SUCCESS' });
    }
}





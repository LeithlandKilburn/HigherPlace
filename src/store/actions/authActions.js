import { firebase, db } from '../../config/fbConfig'

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
    return (dispatch, getState, {getFirebase}) => {

        const firebase= getFirebase();
        firebase.auth().signOut().then(() =>
        {
            dispatch({ type: 'SIGNOUT_SUCCESS' })
        });
    }
}

export const signUp = (newUser) =>
{
    return(dispatch) =>
    {
        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password,

        ).then((resp) => {
            return db.collection('users').doc(resp.user.uid).set({
                username: newUser.username,
                userID: resp.user.uid,
                artist: newUser.profession[0] ? true : false,
                profession: newUser.profession,
                email: newUser.email,
                city: newUser.city,
                bio: "this is a bio"
            })
        }).then(() => {
            console.log("Document has been added to firestore.")
            dispatch({ type: 'SIGNUP_SUCCESS' })
        }).catch(err => {
            console.log(err)
            dispatch({ type: 'SIGNUP_ERROR', err })
        })
    }
}

export const artCont = (newUser) =>
{
    return(dispatch) =>
    {
        let tempAcc = {
            username: newUser.username,
            email: newUser.email,
            city: newUser.city,
            bio: "this is a bio",
        };

        console.log("Document has been added to firestore.");
        dispatch({ type: 'ART_CONT', tempAcc });
    }
}

export const ArtistSignUp = (newUser) =>
{
    return(dispatch) =>
    {
        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password,
        ).then((resp) => {
            return db.collection('users').doc(resp.user.uid).set({
                username: newUser.username,
                userID: resp.user.uid,
                artist: newUser.profession[0] ? true : false,
                profession: newUser.profession,
                email: newUser.email,
                city: newUser.city,
            })
        }).then(() => {
            console.log("Document has been added to firestore.");
            dispatch({ type: 'ART_SIGNUP_SUCCESS' });
        }).catch(err => {
            console.log(err);
            dispatch({ type: 'ART_SIGNUP_ERROR', err });
        })
    }
}

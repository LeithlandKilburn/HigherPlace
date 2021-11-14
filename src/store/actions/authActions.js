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
                artist: newUser.profession1 ? true : false,
                profession1: newUser.profession1,
                profession2: newUser.profession2,
                email: newUser.email,
                bio: "this is a bio"
            })
        }).then(() => {
            console.log("Document has been added to firestore.")
            dispatch({ type: 'SIGNUP_SUCCESS' })
        }).catch(err => {
            dispatch({ type: 'SIGNUP_ERROR', err })
        })
    }
}

export const getArtists = (userCity) => 
{
    return (dispatch, getState, {getFirebase}) =>
    {
        let homeArtists = [];
        
        // Perform asynchronous task.
        const firebase = getFirebase();
        const db = firebase.firestore();

        //Retrieving the current city's artists from the 'users' collection.
            db.collection('users').where("city", "==", userCity).get().then((snapshot) => {
                console.log(snapshot);

                snapshot.docs.forEach(doc =>  {
                    let tempArtist = doc.data();
                    homeArtists = [...homeArtists, tempArtist];
                })

                dispatch({type: 'GET_ARTISTS', homeArtists});

            }).catch((err) => {
        
                //Activate the reducer.
                dispatch({type: 'GET_ARTISTS_ERROR', err});
            })
    }
}
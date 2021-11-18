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

export const goSearch = (searchObject) =>
{
    return (dispatch) => 
    {
        console.log("The Market will receive the search query ", searchObject);
        dispatch ({type: "SEARCH", searchObject});
    }
}

export const filterArtists = (searchObject) =>
{
    return (dispatch, getState, {getFirebase}) =>
    {
        let filteredArtists = [];
        
        // Perform asynchronous task.
        const firebase = getFirebase();
        const db = firebase.firestore();
        
        //Filtering artists from the 'users' collection.
        db.collection('users').where("city", "==", searchObject.Location).get().then((snapshot) => {
            console.log(snapshot);

            snapshot.docs.forEach(doc =>  {
                let tempArtist = doc.data();
                filteredArtists = [...filteredArtists, tempArtist];
            })

            console.log("Filtering Artists for Home Page", searchObject);
            dispatch({type: "FILTER_ARTISTS", filteredArtists});

        }).catch((err) => {
    
            //Activate the reducer.
            dispatch({type: 'FILTER_ARTISTS_ERROR', err});
        })
        
        
    }
}
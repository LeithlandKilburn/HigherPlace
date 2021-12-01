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

export const getPreviews = (pathsArray, uid) =>
{
    return async (dispatch, getState, {getFirebase}) => 
    {
        // Perform asynchronous task.
        const firebase = getFirebase();
        
        let total = pathsArray.length;
        let urlArray = [];
        let error = false;
        let url = "dm";

        for (let i = 0; i < total; i++)
        {
            console.log("The thumbnail loaded");
            url = await firebase.storage().ref(`${pathsArray[i]}`).getDownloadURL()
                      .catch(err => 
                        { 
                            console.log("The thumbnail did not load");
                            error = true;
                            dispatch({type: 'GET_PREVIEWS_ERROR'});
                        });
            urlArray = [...urlArray, url];  
        }

        if (error === false)
        {
            let artistPreview = { urlArray: urlArray, uid: uid};
            dispatch({type: 'GET_PREVIEWS', artistPreview});
        }
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


export const createProject = (project) => 
{
    return(dispatch, getState, { getFirebase, getFirestore }) => 
    {
        const firebase = getFirebase();
        const firestore = getFirestore();
        console.log(project.projectID);
        firestore.collection('projects').doc(`${project.projectID}`).set({
            ...project, 
        }).then(() => 
            {
                console.log("fileUploaded");
                firestore.collection('users').doc(project.userID).update({
                    projectPreviews: firebase.firestore.FieldValue.arrayUnion(project.thumbnail)
                }).then( () => 
                {
                    dispatch({type: 'CREATE_PROJECT', project});
                }).catch((err) => 
                {
                    dispatch({type: 'CREATE_PROJECT_ERROR', err});
                })
            })
        
    }
};
 
export const getGallery = (uid) =>
{
    return(dispatch, getState, {getFirebase}) => 
    {
        const firebase = getFirebase();
        const db = firebase.firestore();
        let projHolder = []
            //Retrieving the current user's projects from the
            //firestore "projects" collection.
            db.collection('projects').where("userID", "==", uid).orderBy("timestamp").get().then((snapshot) => {
                console.log(snapshot);
                snapshot.docs.forEach(doc =>  {
                    let tempProject = doc.data();
                    console.log(tempProject);
                    projHolder = [...projHolder, tempProject];
                    })
                console.log(projHolder);

                //Activate the reducer.
                dispatch({type: "GET_GALLERY", projHolder});  
                }).catch((err) => {
        
                    //Activate the reducer.
                    dispatch({type: 'GET_GALLERY_ERROR', err});
                })
    }
}

export const getArtist = (artistID) =>
{
    return(dispatch) =>
    {
        dispatch({type: 'GET_ARTIST', artistID });
    }
}

export const displayProfileCard = (id) =>
{
    return(dispatch, getState, {getFirestore}) =>
    {
        const firestore = getFirestore();
        firestore.collection("users").get({id}).then(function(querySnapshot){
            querySnapshot.forEach( doc => {
                console.log(doc.data())
            });
        })
    }  
}

export const clearGallery = () =>
{
    return(dispatch) =>
    {
        dispatch({type: 'CLEAR_GALLERY'});
    }
}


const initState = 
{
    // Thanks to UseFirestoreForProfile in the main index.js file, all this
    // information is already available to the gallery component.
        projects: null
}

const projectReducer = (state = initState, action) => 
{
    switch (action.type)
    {
        case 'GET_GALLERY':
            console.log("Get_Gallery Reducer", action.projHolder);
            return {
                ...state,
                projects: action.projHolder
            }
        case 'CREATE_PROJECT':
            console.log("Project uploaded to firestore", action.project);
            return state;
        case 'CREATE_PROJECT_ERROR':
            console.log("Project was not uploaded", action.err);
            return state;
        case 'GET_ARTIST':
            console.log("THE ARTIST PARAM FROM THE PROJECT REDUCER IS " + action.artistID);
            return {
                ...state,
                artistID: action.artistID,
            }
        case 'CLEAR_GALLERY':
            console.log("CLEARING GALLERY!!!");
            return{
                
            }
        default:
            return state;
    }
}

export default projectReducer;
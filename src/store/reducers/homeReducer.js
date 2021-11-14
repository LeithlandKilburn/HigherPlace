const initState = 
{
    city: "Atlanta",
    cityArtist: null

}

const homeReducer = (state = initState, action) =>
{
    switch (action.type)
    {
        case "GET_ARTISTS":
            return {
                ...state,
                cityArtist: action.homeArtists
            }
        
        case "GET_ARTISTS_ERROR":
            return state;
        
        default: 
            return state;
    }
}

export default homeReducer;
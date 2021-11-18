const initState = 
{
    city: "Atlanta",
    cityArtist: null,
    searchObject: null,
    filteredArtists: null,
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
        case "SEARCH":  
            return {
                    ...state,
                    searchObject: action.searchObject,
                };
        case "FILTER_ARTISTS":
            return {
                    ...state,
                    filteredArtists: action.filteredArtists
            };
        default: 
            return state;
    }
}

export default homeReducer;
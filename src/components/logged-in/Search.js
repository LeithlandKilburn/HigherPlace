import React, { Component } from 'react';
import "./css/Home.css";


class Search extends Component
{
    constructor(props)
    {
        super(props);
        this.state =
        {
            city: "",
            profession: "",
            aesthetic: "",
            affinity: "",
        }
    }
    
    
    render()
    {
        return(

            <div className="Search">
                <input id="SearchBar" placeholder="Artists, Locations, & Cultural Groups" type="text"/>
                <div className="SearchFilters">
                    <button className="FilterButton">Artistry</button>
                    <button className="FilterButton">Location</button>
                    <button className="FilterButton">Availability</button>
                    <button className="FilterButton">Affinity</button>
                </div>
            </div>
        )
    }
}

export default Search;
import React, { Component } from 'react';
import "./css/Search.css";
import { connect } from 'react-redux';
import { goSearch } from "../../store/actions/homeActions";


class Search extends Component
{
    constructor(props)
    {
        super(props);
        this.inputRef = React.createRef();
        this.state =
        {
            searchClicked: false,
            searchFilter: "ArtistName",
            searchObject: {
                ArtistName: "",
                Location: "",
                Artistry: "",
                Affinity: "",
                Availability: "",
            }
        }
    }
    
    showFilters = () =>
    {
        this.setState(
            {
                ...this.state,
                searchClicked: true,
            }
        )
    }

    hideFilters = (e) =>
    {
        if (e)
        {
            e.preventDefault();
        }
        
        this.setState(
            {
                ...this.state,
                searchClicked: false,
            }
        )
    }

    searchClick = (e) =>
    {
        e.preventDefault();
        console.log("gonna reset search filters");
        this.setState(
            {
                ...this.state,
                searchFilter: "",
                searchClicked: false,
            }
        );
        this.props.goSearch(this.state.searchObject);
        console.log("Just reset search filters");
        console.log("You have searched " , this.state);
        this.inputRef.current.blur();
    }

    searchArtist = (e) =>
    {
        let filter = this.state.searchFilter;
        switch(filter)
        {
            case "Location":
                this.setState(
                    {
                        ...this.state,
                        searchObject: {...this.state.searchObject,
                                        Location: e.target.value
                                    },
                    }
                )
                break;
            case "Artistry":
                this.setState(
                    {
                        ...this.state,
                        searchObject: {...this.state.searchObject,
                                        Artistry: e.target.value
                                    },
                    }
                )
                break;
            case "Affinity":
                this.setState(
                    {
                        ...this.state,
                        searchObject: {...this.state.searchObject,
                                        Affinity: e.target.value
                                    },
                    }
                )
                break;
            case "Availability":
                this.setState(
                    {
                        ...this.state,
                        searchObject: {...this.state.searchObject,
                                        Availability: e.target.value
                                    },
                    }
                )
                break;
            default:
                this.setState(
                    {
                        ...this.state,
                        searchObject: {...this.state.searchObject,
                                        ArtistName: e.target.value
                                    },
                    }
                )
                break;
        }
    }

    filterClick = (e) =>
    {
        e.preventDefault();
        this.setState(
            {
                ...this.state,
                searchFilter: e.target.value,
            }
        )
    }

    noBlur = (e) =>
    {
        e.preventDefault();
        console.log("No Blur");
    }
    
    render()
    {

        let currentFilter;
        switch (this.state.searchFilter)
        {
            case "Location":
                currentFilter = this.state.searchObject.Location;
                break;
            case "Artistry":
                currentFilter = this.state.searchObject.Artistry;
                break;
            case "Affinity":
                currentFilter = this.state.searchObject.Affinity;
                break;
            case "Availability":
                currentFilter = this.state.searchObject.Availability;
                break;
            case "default":
                currentFilter = this.state.searchObject.ArtistName;
                break;
        }

        console.log(this.state);

        const searchFilters = this.state.searchClicked ? 

                            <form onSubmit={this.searchClick}>
                                <div className="SearchFunctions">
                                    <input id="SearchBarClicked" onChange={this.searchArtist} placeholder="Find An Artist" ref={this.inputRef}
                                    type="text" value={currentFilter}/>
                                    <button onContextMenu={this.noBlur} onMouseDown={this.searchClick} className="SearchButton"> Search </button>
                                </div>
                                <div className="SearchFilters">
                                    <button onContextMenu={this.noBlur} value="Location" onMouseDown={this.noBlur} 
                                        onClick={this.filterClick} className="FilterButton">Location</button>
                                    <button onContextMenu={this.noBlur} value="Artistry" onMouseDown={this.noBlur} 
                                        onClick={this.filterClick} className="FilterButton">Artistry</button>
                                    <button onContextMenu={this.noBlur} value="Affinity" onMouseDown={this.noBlur} 
                                        onClick={this.filterClick} className="FilterButton">Affinity</button>
                                    <button onContextMenu={this.noBlur} value="Availability" onMouseDown={this.noBlur} 
                                        onClick={this.filterClick} className="FilterButton">Availability</button>
                                </div>
                            </form>

                            : <form onSubmit={this.searchClick}>
                                <div className="SearchFunctions">
                                    <input id="SearchBarNotClicked" onChange={this.searchArtist} placeholder="Find An Artist" ref={this.inputRef}
                                    type="text" value={currentFilter}/>
                                </div>
                                <div className="SearchFilters">
                                    <button onContextMenu={this.noBlur} value="Location" onMouseDown={this.noBlur} 
                                        onClick={this.filterClick} className="FilterButton">Location</button>
                                    <button onContextMenu={this.noBlur} value="Artistry" onMouseDown={this.noBlur} 
                                        onClick={this.filterClick} className="FilterButton">Artistry</button>
                                    <button onContextMenu={this.noBlur} value="Affinity" onMouseDown={this.noBlur} 
                                        onClick={this.filterClick} className="FilterButton">Affinity</button>
                                    <button onContextMenu={this.noBlur} value="Availability" onMouseDown={this.noBlur} 
                                        onClick={this.filterClick} className="FilterButton">Availability</button>
                                </div>
                            </form>

        return(

            <div className="Search" onFocus={this.showFilters} onBlur={this.hideFilters}>
                {searchFilters}
            </div>
        )
    }
}

const mapStateToProps = (state) =>
{
    return {};
}

const mapDispatchToProps = (dispatch) =>
{
    return {
        goSearch: (searchObject) => dispatch(goSearch(searchObject)),
    }
}

export default connect (mapStateToProps, mapDispatchToProps) (Search);
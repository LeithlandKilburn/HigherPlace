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
        this.filter1Ref = React.createRef();
        this.filter2Ref = React.createRef();
        this.filter3Ref = React.createRef();
        this.filter4Ref = React.createRef();
        this.state =
        {
            searchClicked: false,
            searchFilter: "Name",
            searchObject: {
                ArtistName: "",
                Location: "",
                Artistry: "",
                Affinity: "",
                Names: "",
            },
            ArtistName: "",
            LocationOpen: false,
            ArtistryOpen: false,
            AffinityOpen: false,
            NamesOpen: false,
        }
    }
    
    showFilters = (e) =>
    {
        e.target.focus();
        console.log("Filter OnFilter OnFocussss");
        this.setState(
            {
                ...this.state,
                searchClicked: true,
            }
        )
    }

    hideFilters = (e) =>
    {
        console.log("On Blurrr. New target is: ", e.relatedTarget, this.filter1Ref.current);
        if ((e.relatedTarget === this.filter1Ref.current || e.relatedTarget === this.filter2Ref.current ||
            e.relatedTarget === this.filter3Ref.current || e.relatedTarget === this.filter4Ref.current) && e.relatedTarget !== null)
        {
            console.log("Not blurring cuz we're in a dropdown.");
        } else
        {
            this.setState(
                {
                    ...this.state,
                    searchClicked: false,
                }
            )
        }
    }

    searchClick = (e) =>
    {
        e.preventDefault();
        console.log(this.inputRef);
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
            case "Names":
                this.setState(
                    {
                        ...this.state,
                        searchObject: {...this.state.searchObject,
                                        Names: e.target.value
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
        console.log(document.activeElement);
        console.log(e.target);
        if (document.activeElement === e.target)
        e.target.focus();

        if(this.state.searchFilter === e.target.value && this.state.searchClicked === false)
        {
            console.log("Filter OnClickkk and this.searchClicked is falseee");
            this.setState(
                {
                    ...this.state,
                    searchClicked: true,
                    searchFilter: e.target.value,
                    [`${e.target.value}Open`]: true,
                }
            )
        } else if (this.state.searchFilter === e.target.value && this.state.searchClicked === true)
        {
            this.setState(
                {
                    ...this.state,
                    searchFilter: e.target.value,
                    [`${e.target.value}Open`]: !this.state[`${e.target.value}Open`],
                }
            )
        } else
        {
            let filterOpen;
            switch (e.target.value)
            {
                case "Location":
                    filterOpen = "LocationOpen";
                    this.setState(
                        {
                            ...this.state,
                            searchClicked: true,
                            searchFilter: e.target.value,
                            LocationOpen: !this.state.LocationOpen,
                            ArtistryOpen: false,
                            AffinityOpen: false,
                            NamesOpen: false,
                        }
                    )
                    break;
                case "Artistry":
                    filterOpen = "ArtistryOpen";
                    this.setState(
                        {
                            ...this.state,
                            searchClicked: true,
                            searchFilter: e.target.value,
                            LocationOpen: false,
                            ArtistryOpen: !this.state.ArtistryOpen,
                            AffinityOpen: false,
                            NamesOpen: false,
                        }
                    )
                    break;
                case "Affinity":
                    filterOpen = "AffinityOpen";
                    this.setState(
                        {
                            ...this.state,
                            searchClicked: true,
                            searchFilter: e.target.value,
                            LocationOpen: false,
                            ArtistryOpen: false,
                            AffinityOpen: !this.state.AffinityOpen,
                            NamesOpen: false,
                        }
                    )
                    break;
                case "Names":
                    filterOpen = "NamesOpen";
                    this.setState(
                        {
                            ...this.state,
                            searchClicked: true,
                            searchFilter: e.target.value,
                            LocationOpen: false,
                            ArtistryOpen: false,
                            AffinityOpen: false,
                            NamesOpen: !this.state.NamesOpen,
                        }
                    )
                    break;
                default:
                    break;
                
            } 
        }
    }

    selectArt = (e) =>
    {
        this.setState(
            {
                ...this.state,
                searchClicked: true,
                LocationOpen: false,
                ArtistryOpen: true,
                AffinityOpen: false,
                NamesOpen: false,
            })
    }

    noBlur = (e) =>
    {
        console.log("No Blur");
    }

    noBlurNames = (e) =>
    {
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
            case "Names":
                currentFilter = this.state.searchObject.Names;
                break;
            case "default":
                currentFilter = this.state.searchObject.ArtistName;
                break;
        }

        console.log(this.state);

        const searchFilters = (this.state.searchClicked) ? 

                            <form onSubmit={this.searchClick}>
                                <div className="SearchFunctions ">
                                    <input id="SearchBarClicked" className="GiveCursor" onChange={this.searchArtist} placeholder="Find An Artist" ref={this.inputRef}
                                    type="text" onFocus={this.showFilters} onBlur={this.hideFilters} value={currentFilter}/>

                                    <button onContextMenu={this.noBlur} onClick={this.searchClick} className="SearchButton GiveCursor"> Search </button>
                                </div>
                                <div className="SearchFilters" >
                                    <button  value="Location" onBlur={this.hideFilters} 
                                        onClick={this.filterClick} className="FilterButton GiveCursor">Location</button>

                                    <button value="Names"  onBlur={this.hideFilters}
                                        onClick={this.filterClick} className="FilterButton GiveCursor">Names</button>
                                
                                    <button value="Artistry"  onBlur={this.hideFilters}
                                        onClick={this.filterClick} className="FilterButton GiveCursor">Artistry</button>
                                        
                                    <button tabIndex="0" value="Affinity" onBlur={this.hideFilters} onClick={this.filterClick}
                                        className="FilterButton GiveCursor">Affinity</button>
                                </div>
                                {this.state.LocationOpen && <input type="text" className="GiveCursor" onContextMenu={this.noBlur} ref={this.filter1Ref} onBlur={this.hideFilters} onClick={this.showFilters}/>}
                                {this.state.ArtistryOpen && <div>
                                                                <form>
                                                                <select id="ArtistryDrop" className="GiveCursor" ref={this.filter2Ref} value="lime" onBlur={this.hideFilters} onChange={this.handleChange}>
                                                                    <option value="grapefruit">Grapefruit</option>
                                                                    <option value="lime">Lime</option>
                                                                    <option value="coconut">Coconut</option>
                                                                    <option value="mango">Mango</option>
                                                                </select>
                                                                </form>
                                                            </div>}
                                {this.state.AffinityOpen && <button onFocus={this.showFilters} className="GiveCursor" ref={this.filter3Ref} onBlur={this.hideFilters} 
                                                                onClick={(e) => {e.preventDefault(); e.target.focus();}} onContextMenu={this.noBlur} >Affinity open.</button>}
                                {this.state.NamesOpen && <button className="GiveCursor" onFocus={this.showFilters} ref={this.filter4Ref} onBlur={this.hideFilters} 
                                                                onClick={(e) => {e.preventDefault(); e.target.focus();}}onContextMenu={this.noBlur} >Names open.</button>}
                            </form>

                            : <form>
                                <div className="SearchFunctions">
                                    <input id="SearchBarNotClicked" placeholder="Find An Artist" ref={this.inputRef}
                                    type="text" onFocus={this.showFilters} value={currentFilter}/>
                                </div>
                                <div className="SearchFilters">
                                    <button onContextMenu={this.noBlur} onClick={this.filterClick} ref={this.filter1Ref} className="FilterButton GiveCursor"
                                    value="Location"> Location </button>
                                    <button onContextMenu={this.noBlur} onClick={this.filterClick} className="FilterButton GiveCursor"
                                    value="Names"> Names </button>
                                    <button onContextMenu={this.noBlur} onClick={this.filterClick} className="FilterButton GiveCursor"
                                    value="Artistry"> Artistry </button>
                                    <button  onContextMenu={this.noBlur} onClick={this.filterClick} className="FilterButton GiveCursor"
                                    value="Affinity"> Affinity </button>
                                </div>
                            </form>

        return(

            <div className="Search">
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
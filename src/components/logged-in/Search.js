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
        this.searchRef = React.createRef();
        this.check1Ref = React.createRef();
        this.check2Ref = React.createRef();
        this.check3Ref = React.createRef();
        this.check4Ref = React.createRef();
        this.AffRef = React.createRef();
        this.aff1Ref = React.createRef();
        this.aff2Ref = React.createRef();
        this.aff3Ref = React.createRef();
        this.aff4Ref = React.createRef();
        this.loc1Ref = React.createRef();
        this.loc2Ref = React.createRef();
        this.names1Ref = React.createRef();
        this.names2Ref = React.createRef();
        this.art1Ref = React.createRef();
        this.eth1Ref = React.createRef();
        this.eth2Ref = React.createRef();
        this.eth3Ref = React.createRef();
        this.religRef = React.createRef();
        this.langRef = React.createRef();
        this.LGBTQRef = React.createRef();

        this.state =
        {
            searchClicked: false,
            searchFilter: "Name",
            LocationTerm: "",
            NamesTerm: "",
            ArtistryTerm: "",
            AffinityTerm: {},
            LocationOpen: false,
            ArtistryOpen: false,
            AffinityOpen: false,
            NamesOpen: false,
            affCat: false,
            affSelect: "",
            affSelect2: "",
            whatChanged: []
        }
    }
    
    showFilters = (e) =>
    {
        e.target.focus();
        console.log(document.activeElement);
        this.setState(
            {
                ...this.state,
                searchClicked: true,
            }
        )
    }

    hideFilters = (e) =>
    {
        if(e.relatedTarget !== null) {e.relatedTarget.focus()};
        console.log("On Blurrr. New target is: ", e.relatedTarget, this.aff1Ref.current, document.activeElement.tagName);
        if ((e.relatedTarget === this.filter1Ref.current || e.relatedTarget === this.filter2Ref.current ||
            e.relatedTarget === this.searchRef.current || e.relatedTarget === this.check1Ref.current
            || e.relatedTarget === this.check2Ref.current || e.relatedTarget === this.check3Ref.current
            || e.relatedTarget === this.check4Ref.current || e.relatedTarget === this.AffRef.current
            || e.relatedTarget === this.aff1Ref.current || e.relatedTarget === this.aff2Ref.current
            || e.relatedTarget === this.aff3Ref.current || e.relatedTarget === this.aff4Ref.current
            || e.relatedTarget === this.loc1Ref.current || e.relatedTarget === this.loc2Ref.current 
            || e.relatedTarget === this.names1Ref.current || e.relatedTarget === this.names2Ref.current
            || e.relatedTarget === this.inputRef.current || e.relatedTarget === this.eth1Ref.current
            || e.relatedTarget === this.eth2Ref.current || e.relatedTarget === this.eth3Ref.current
            || e.relatedTarget === this.religRef.current || e.relatedTarget === this.langRef.current
            || e.relatedTarget === this.LGBTQRef.current || e.relatedTarget === this.art1Ref.current) && e.relatedTarget !== null)
        {
            console.log("Not blurring cuz we're in a dropdown.");
        } else
        {
            this.setState(
                {
                    ...this.state,
                    searchClicked: false,
                    LocationOpen: false,
                    ArtistryOpen: false,
                    AffinityOpen: false,
                    NamesOpen: false,
                }
            )
        }
    }

    searchClick = (e) =>
    {
        e.preventDefault();
        console.log(this.inputRef);
        console.log("gonna reset search filters");
        let somethingChanged = false;
        
        let searchObject = {
            ...this.props.searchObject,
            homeCity: this.props.homeCity,
            newQueryTest: this.props.searchObject.newQueryTest,
            AffinityTerm: {...this.props.searchObject.AffinityTerm, empty : true},
        }

        let changedTerms = ["LocationTerm", "NamesTerm", "ArtistryTerm", "StyleTerm", "RaceTerm", "RegionTerm", 
                                "CountryTerm", "ReligionTerm", "LanguageTerm", "SexualityTerm", "GenderTerm"];
                                
        changedTerms.forEach((term) => {
            if (this.state.whatChanged[term] || this.state.whatChanged[term] === "")
            {
                console.log("Check1", term);
                if (this.props.searchObject[term] !== this.state[term])
                {
                    console.log("Check2");
                    if (this.props.searchObject.AffinityTerm[term] !== this.state[term])
                    {
                        console.log("Check 3 NOOOO", this.props.searchObject.AffinityTerm[term]);
                        somethingChanged = true;

                        if (term === "RaceTerm" ||term === "RegionTerm" || term === "CountryTerm" || term === "ReligionTerm" || term === "LanguageTerm" || 
                        term === "SexualityTerm" || term === "GenderTerm")
                        {
                            searchObject.AffinityTerm[term] = this.state[term];
                            
                        } else
                        {
                            console.log("Check 3");
                            console.log(term, this.state[term]);
                            somethingChanged = true;
                            searchObject[term] = this.state[term];
                        }
                    }
                }
            }
        })

        if (somethingChanged === true)
        {
            searchObject.newQueryTest = !searchObject.newQueryTest;
            console.log(Object.keys(searchObject.AffinityTerm));
            let affKeys = Object.keys(searchObject.AffinityTerm);
            for (let i = 0; i < affKeys.length; i++)
            {
                if (searchObject.AffinityTerm[affKeys[i]])
                {
                    if (affKeys[i] !== "empty")
                    {
                        console.log(searchObject.AffinityTerm[affKeys[i]]);
                        searchObject.AffinityTerm.empty = false;
                    }
                }
            }
            this.props.goSearch(searchObject);
            console.log("Just reset search filters");
            console.log("You have searched " , this.state);
            this.setState(
                {
                    ...this.state,
                    searchFilter: "",
                    searchClicked: false,
                    LocationOpen: false,
                    ArtistryOpen: false,
                    AffinityOpen: false,
                    NamesOpen: false,
                    whatChanged: [],
                }
            );
        } else
        {
            this.setState(
                {
                    ...this.state,
                    searchFilter: "",
                    searchClicked: false,
                    LocationOpen: false,
                    ArtistryOpen: false,
                    AffinityOpen: false,
                    NamesOpen: false,
                }
            );
        }

        
        
        this.inputRef.current && this.inputRef.current.blur();
    }

    formSubmit = (e) =>
    {
        e.preventDefault();
        if (this.props)
        
        if (this.state.affSelect !== "Language" && this.state.affSelect !== "Ethnicity")
        {
            this.inputRef.current.blur();
        console.log(e.target, this.aff3Ref);
        }

        this.setState(
            {
                ...this.state,
                affCat: false,
                
            });
        
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
            if (this.state.affCat && this.state.affSelect === "Ethnicity" || this.state.affSelect === "Religion"
                || this.state.affSelect === "Language" || this.state.affSelect === "LGBTQ")
            {
                this.setState(
                    {
                        ...this.state,
                        searchFilter: e.target.value,
                        affSelect : "",
                        affSelect2 : "",
                        affSelect3 : "",
                    })
            } else 
            {
               this.setState(
                {
                    ...this.state,
                    searchFilter: e.target.value,
                    [`${e.target.value}Open`]: !this.state[`${e.target.value}Open`],
                })
            }
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

    selectAff = (e) =>
    {
       this.setState(
            {
                ...this.state,
                affSelect: e.target.innerText,
                affCat: true,
            }
        )
    }

    setSearchTerm = (e) =>
    {
        this.setState(
            {
                ...this.state,
                [`${this.state.searchFilter}Term`]: e.target.value,
                whatChanged: {...this.state.whatChanged, [`${this.state.searchFilter}Term`] : e.target.value},
            }, 
            () => {
                console.log("Chose Affinity", this.state);
            }
        )
    }
    setStyleTerm = (e) =>
    {
        this.setState(
            {
                ...this.state,
                StyleTerm: e.target.value,
                whatChanged: {...this.state.whatChanged, StyleTerm : e.target.value},
            })
    }

    setAffinity = (e) =>
    {
        if (this.state.affSelect === "Ethnicity")
        {
            this.setState(
                {
                    ...this.state,
                    affSelect2: "Region",
                    RaceTerm : e.target.value,
                    RegionTerm: "",
                    whatChanged: {...this.state.whatChanged, RaceTerm : e.target.value},
                })
        } else
        {
            this.setState(
                {
                    ...this.state,
                    [`${this.state.affSelect}Term`] : e.target.value,
                    whatChanged: {...this.state.whatChanged, [`${this.state.affSelect}Term`] : e.target.value},
                })
        }
        
    }

    setAffinity2 = (e) =>
    {
        this.setState(
            {
                ...this.state,
                affSelect3: "Country",
                RegionTerm : e.target.value,
                CountryTerm: "",
                whatChanged: {...this.state.whatChanged, RegionTerm : e.target.value},
            }) 
    }
    
    setAffinity3 = (e) =>
    {
        this.setState(
            {
                ...this.state,
                CountryTerm : e.target.value,
                whatChanged: {...this.state.whatChanged, CountryTerm : e.target.value},
            }) 
    }
    setAffinityLGBTQ = (e) =>
    {
        if (e.target.value == "gay" || e.target.value == "lesbian" || e.target.value == "bisexual")
            {
                this.setState(
                    {
                        ...this.state,
                        SexualityTerm : e.target.value,
                        LGBTQTerm : e.target.value,
                        GenderTerm: "",
                        whatChanged: {...this.state.whatChanged, SexualityTerm : e.target.value, GenderTerm: "",},
                    })
            } else 
            {
                this.setState(
                    {
                        ...this.state,
                        GenderTerm : e.target.value,
                        LGBTQTerm : e.target.value,
                        SexualityTerm: "",
                        whatChanged: {...this.state.whatChanged, GenderTerm : e.target.value, SexualityTerm: "",},
                    })
            }
         
    }

    render()
    {
        console.log(this.state, this.props);

        let affDrop;
        let regionDrop;
        let regionsArray = "";
        switch (this.state.RaceTerm)
        {
            case "black":
                regionDrop = ["North America", "Central America", "South America", "West Indies", 
                                "West Africa", "East Africa", "Central Africa", "South Africa"];
                regionsArray = regionDrop.map(region => <option value={region}>{region}</option> )
                console.log(regionsArray);
                break;
            case "white":
                regionDrop = ["North American", "Western Europe", "Eastern Europe"];
                regionsArray = regionDrop.map(region => <option value={region}>{region}</option> )
                console.log(regionsArray);
                break;
            case "native":
                regionDrop = ["North America", "South America", "Central America"];
                regionsArray = regionDrop.map(region => <option value={region}>{region}</option> )
                console.log(regionsArray);
                break;
            case "asian":
                regionDrop = ["Western Asia", "East Asia", "Southeast Asia", "South Asia", "Pacific Islands"];
                regionsArray = regionDrop.map(region => <option value={region}>{region}</option> )
                console.log(regionsArray);
                break;
            case "arabic":
                regionDrop = ["Middle East"];
                regionsArray = regionDrop.map(region => <option value={region}>{region}</option> )
                console.log(regionsArray);
                break;
            default:
                break;
        }

        switch (this.state.affSelect)
        {
            case "Ethnicity":
                if (!this.state.RaceTerm)
                {
                affDrop =   <form onSubmit={this.formSubmit}>
                                <select id="RaceDrop" className="GiveCursor" ref={this.eth1Ref} 
                                    value={this.state.RaceTerm} onChange={this.setAffinity}>
                                    <option value="">Select A Race</option>
                                    <option value="arabic">Arabic</option>
                                    <option value="asian">Asian</option>
                                    <option value="black">Black/African</option>
                                    <option value="white">White/European</option>
                                    <option value="native">Indig. American</option>
                                </select>
                            </form>
                } else if (this.state.RaceTerm && !this.state.RegionTerm)
                {
                affDrop =   <form onSubmit={this.formSubmit}>
                                <select id="RaceDrop" className="GiveCursor" ref={this.eth1Ref} 
                                    value={this.state.RaceTerm} onChange={this.setAffinity}>
                                    <option value="">Select A Race</option>
                                    <option value="arabic">Arabic</option>
                                    <option value="asian">Asian</option>
                                    <option value="black">Black/African</option>
                                    <option value="white">White/European</option>
                                    <option value="native">Indig. American</option>
                                </select>
                                <select id="RegionDrop" className="GiveCursor" ref={this.eth2Ref} 
                                    value={this.state.RegionTerm} onChange={this.setAffinity2}>
                                    <option value="">Select A Region (Optional)</option>
                                    {regionsArray}
                                </select>
                            </form>
                } else
                {
                    affDrop =   <form onSubmit={this.formSubmit}>
                                <select id="RaceDrop" className="GiveCursor" ref={this.eth1Ref} 
                                    value={this.state.RaceTerm} onChange={this.setAffinity}>
                                    <option value="">Select A Race</option>
                                    <option value="asian">Asian</option>
                                    <option value="arabic">Arabic/Middle Eastern</option>
                                    <option value="black">Black/African</option>
                                    <option value="white">White/European</option>
                                    <option value="native">Indig. American</option>
                                </select>
                                <select id="RegionDrop" className="GiveCursor" ref={this.eth2Ref} 
                                    value={this.state.RegionTerm} onChange={this.setAffinity2}>
                                    <option value="">Select A Region (Optional)</option>
                                    {regionsArray}
                                </select>
                                <input type="text" tabIndex="0" placeholder="Search A Country" className="GiveCursor" ref={this.eth3Ref} onChange={this.setAffinity3} 
                                        value={this.state.CountryTerm} onSubmit={this.formSubmit}/>
                            </form>
                }
                break;
            case "Religion":
                affDrop =   <form onSubmit={this.formSubmit}>
                                <select id="ReligionDrop" className="GiveCursor" ref={this.religRef} 
                                    value={this.state.ReligionTerm} onChange={this.setAffinity}>
                                    <option value="">Select A Religion</option>
                                    <option value="christian">Christian</option>
                                    <option value="muslim">Muslim</option>
                                    <option value="catholic">Catholic</option>
                                    <option value="jewish">Jewish</option>
                                    <option value="hindu">Hindu</option>
                                    <option value="buddhist">Buddhist</option>
                                    <option value="native">Sikh</option>
                                </select>
                            </form>
                break;
            case "Language":
                affDrop =   <form onSubmit={this.formSubmit}>
                                <input type="text" tabIndex="0" placeholder="Search A Language" className="GiveCursor" ref={this.langRef} onChange={this.setAffinity} 
                                        onSubmit={this.formSubmit} value={this.state.LanguageTerm}/>
                            </form>
                    break;
            case "LGBTQ":
                affDrop =   <form onSubmit={this.formSubmit}>
                                <select id="LGBTQDrop" className="GiveCursor" ref={this.LGBTQRef} 
                                    value={this.state.LGBTQTerm} onChange={this.setAffinityLGBTQ}>
                                    <option value="">Select An Identity</option>
                                    <option value="lesbian">Lesbian</option>
                                    <option value="gay">Gay</option>
                                    <option value="bisexual">Bisexual</option>
                                    <option value="transgender">Transgender</option>
                                    <option value="nonbinary">Non-Binary</option>
                                </select>
                            </form>
                break;
            default:    
                affDrop =   <div tabIndex="0" ref={this.AffRef}> 
                                <p tabIndex="0" onClick={this.selectAff} ref={this.aff1Ref} className="GiveCursor">Ethnicity</p> 
                                <p tabIndex="0" onClick={this.selectAff} ref={this.aff2Ref} className="GiveCursor">Religion</p> 
                                <p tabIndex="0" onClick={this.selectAff} ref={this.aff3Ref} className="GiveCursor">Language</p> 
                                <p tabIndex="0" onClick={this.selectAff} ref={this.aff4Ref} className="GiveCursor">LGBTQ</p> 
                            </div>;
                break;
        }   

        let affValue;
        switch (this.state.affSelect)
        {
            case "Ethnicity":
                affValue = this.state.RaceTerm; break;
            case "Religion":
                affValue = this.state.ReligionTerm; break;
            case "Language":
                affValue = this.state.LanguageTerm; break;
            case "LGBTQ":
                affValue = this.state.LGBTQTerm; break;
            default: 
                break;
        }

        let artDrop;

        switch (this.state.ArtistryTerm)
        {
            case "Photographer":
                artDrop = <form onSubmit={this.formSubmit}>
                    <select id="ArtistryDrop" className="GiveCursor" ref={this.filter1Ref} 
                        value={this.state.ArtistryTerm} onChange={this.setSearchTerm}>
                            <option value="">Select A Profession</option>
                            <option value="Photographer">Photographer</option>
                            <option value="Videographer">Videographer</option>
                            <option value="Graphic Designer">Graphic Designer</option>
                            <option value="Visual Artist">Visual Artists</option>
                            <option value="Fashion Designer">Fashion Designer</option>
                            <option value="Makeup Artist">Makeup Artists</option>
                            <option value="Model">Models</option>
                    </select>
        
                    <select id="ArtistryDrop" className="GiveCursor" ref={this.art1Ref} 
                        value={this.state.StyleTerm} onChange={this.setStyleTerm}>
                            <option value="">Select A Genre (Optional)</option>
                            <option value="events">Events</option>
                            <option value="sports">Sports</option>
                            <option value="airbrush">Photoshop/Airbrush</option>
                            <option value="studio">Studio</option>
                            <option value="film">Film/Vintage</option>
                            <option value="fashion">Fashion</option>
                            <option value="budoir">Budoir</option>
                            <option value="food">Food</option>
                            <option value="prints">Prints/Canvas</option>
                            <option value="estate">Real Estate</option>
                        </select>
                </form>
                break;
            case "Videographer":
                artDrop = <form onSubmit={this.formSubmit}>
                            <select id="ArtistryDrop" className="GiveCursor" ref={this.filter1Ref} 
                                value={this.state.ArtistryTerm} onChange={this.setSearchTerm}>
                                <option value="">Select A Profession</option>
                                <option value="Photographer">Photographer</option>
                                <option value="Videographer">Videographer</option>
                                <option value="Graphic Designer">Graphic Designer</option>
                                <option value="Visual Artist">Visual Artists</option>
                                <option value="Fashion Designer">Fashion Designer</option>
                                <option value="Makeup Artist">Makeup Artists</option>
                                <option value="Model">Models</option>
                            </select>
                
                            <select id="ArtistryDrop" className="GiveCursor" ref={this.art1Ref} 
                                value={this.state.StyleTerm} onChange={this.setStyleTerm}>
                                <option value="">Select A Genre (Optional)</option>
                                <option value="editor">Video Editor</option>
                                <option value="events">Events</option>
                                <option value="sports">Sports</option>
                                <option value="music">Music Videos</option>
                                <option value="film">Film/Vintage</option>
                                <option value="product">Product/Commercial</option>
                            </select>
                        </form>
                break;
            case "Graphic Designer":
                artDrop = <form onSubmit={this.formSubmit}>
                            <select id="ArtistryDrop" className="GiveCursor" ref={this.filter1Ref} 
                                value={this.state.ArtistryTerm} onChange={this.setSearchTerm}>
                                <option value="">Select A Profession</option>
                                <option value="Photographer">Photographer</option>
                                <option value="Videographer">Videographer</option>
                                <option value="Graphic Designer">Graphic Designer</option>
                                <option value="Visual Artist">Visual Artists</option>
                                <option value="Fashion Designer">Fashion Designer</option>
                                <option value="Makeup Artist">Makeup Artists</option>
                                <option value="Model">Models</option>
                            </select>
                
                            <select id="ArtistryDrop" className="GiveCursor" ref={this.art1Ref} 
                                value={this.state.StyleTerm} onChange={this.setStyleTerm}>
                                <option value="">Select A Genre (Optional)</option>
                                <option value="flyers">Flyers</option>
                                <option value="logos">Logos</option>
                                <option value="digital">Digital Art</option>
                            </select>
                        </form>
                break;
            case "Makeup Artist":
                artDrop = <form onSubmit={this.formSubmit}>
                            <select id="ArtistryDrop" className="GiveCursor" ref={this.filter1Ref} 
                                value={this.state.ArtistryTerm} onChange={this.setSearchTerm}>
                                <option value="">Select A Profession</option>
                                <option value="Photographer">Photographer</option>
                                <option value="Videographer">Videographer</option>
                                <option value="Graphic Designer">Graphic Designer</option>
                                <option value="Visual Artist">Visual Artists</option>
                                <option value="Fashion Designer">Fashion Designer</option>
                                <option value="Makeup Artist">Makeup Artists</option>
                                <option value="Model">Models</option>
                            </select>
                
                            <select id="ArtistryDrop" className="GiveCursor" ref={this.art1Ref} 
                                value={this.state.StyleTerm} onChange={this.setStyleTerm}>
                                <option value="">Select A Genre (Optional)</option>
                                <option value="natural">Natural</option>
                                <option value="soft">Soft Glam</option>
                                <option value="glam">Full Glam</option>
                                <option value="matte">Matte/Smokey</option>
                                <option value="costume">Costume</option>
                            </select>
                        </form>
                break;
                case "Fashion Designer":
                    artDrop = <form onSubmit={this.formSubmit}>
                                <select id="ArtistryDrop" className="GiveCursor" ref={this.filter1Ref} 
                                    value={this.state.ArtistryTerm} onChange={this.setSearchTerm}>
                                    <option value="">Select A Profession</option>
                                    <option value="Photographer">Photographer</option>
                                    <option value="Videographer">Videographer</option>
                                    <option value="Graphic Designer">Graphic Designer</option>
                                    <option value="Visual Artist">Visual Artists</option>
                                    <option value="Fashion Designer">Fashion Designer</option>
                                    <option value="Makeup Artist">Makeup Artists</option>
                                    <option value="Model">Models</option>
                                </select>
                    
                                <select id="ArtistryDrop" className="GiveCursor" ref={this.art1Ref} 
                                    value={this.state.StyleTerm} onChange={this.setStyleTerm}>
                                    <option value="">Select A Genre (Optional)</option>
                                    <option value="Cultural Clothing">Cultural Clothing</option>
                                    <option value="Dresses">Dresses</option>
                                    <option value="Jackets">Jackets</option>
                                    <option value="Shoes">Shoes</option>
                                    <option value="Embroidery">Embroidery</option>
                                    <option value="Bleach">Bleach</option>
                                    <option value="Tie-Dye">Tie-Dye</option>
                                </select>
                            </form>
                    break;
            case "Model":
                artDrop = <form onSubmit={this.formSubmit}>
                            <select id="ArtistryDrop" className="GiveCursor" ref={this.filter1Ref} 
                                value={this.state.ArtistryTerm} onChange={this.setSearchTerm}>
                                <option value="">Select A Profession</option>
                                <option value="Photographer">Photographer</option>
                                <option value="Videographer">Videographer</option>
                                <option value="Graphic Designer">Graphic Designer</option>
                                <option value="Visual Artist">Visual Artists</option>
                                <option value="Fashion Designer">Fashion Designer</option>
                                <option value="Makeup Artist">Makeup Artists</option>
                                <option value="Model">Models</option>
                            </select>
                
                            <select id="ArtistryDrop" className="GiveCursor" ref={this.art1Ref} 
                                value={this.state.StyleTerm} onChange={this.setStyleTerm}>
                                <option value="">Select A Genre (Optional)</option>
                                <option value="fashion">Fashion</option>
                                <option value="fitness">Fitness</option>
                                <option value="underwear">Under/Swimwear</option>
                            </select>
                        </form>
                break;
            case "Visual Artist":
                artDrop = <form onSubmit={this.formSubmit}>
                            <select id="ArtistryDrop" className="GiveCursor" ref={this.filter1Ref} 
                                value={this.state.ArtistryTerm} onChange={this.setSearchTerm}>
                                <option value="">Select A Profession</option>
                                <option value="Photographer">Photographer</option>
                                <option value="Videographer">Videographer</option>
                                <option value="Graphic Designer">Graphic Designer</option>
                                <option value="Visual Artist">Visual Artists</option>
                                <option value="Fashion Designer">Fashion Designer</option>
                                <option value="Makeup Artist">Makeup Artists</option>
                                <option value="Model">Models</option>
                            </select>
                
                            <select id="ArtistryDrop" className="GiveCursor" ref={this.art1Ref} 
                                value={this.state.StyleTerm} onChange={this.setStyleTerm}>
                                <option value="">Select A Genre (Optional)</option>
                                <option value="painter">Painter</option>
                                <option value="illustrator">Illustrator</option>
                                <option value="3d">3D/Sculpting</option>
                                <option value="ceramic">Ceramics</option>
                                <option value="large">Large Form</option>
                                <option value="framed">Framed</option>
                            </select>
                        </form> 
                break;
            default:
                artDrop = <form onSubmit={this.formSubmit}>
                        <select id="ArtistryDrop" className="GiveCursor" ref={this.filter1Ref} 
                        value={this.state.ArtistryTerm} onChange={this.setSearchTerm}>
                            <option value="">Select A Profession</option>
                            <option value="Photographer">Photographer</option>
                            <option value="Videographer">Videographer</option>
                            <option value="Graphic Designer">Graphic Designer</option>
                            <option value="Visual Artist">Visual Artists</option>
                            <option value="Fashion Designer">Fashion Designer</option>
                            <option value="Makeup Artist">Makeup Artists</option>
                            <option value="Model">Models</option>
                        </select>
                    </form>
                break;
        }

        console.log(this.state);
        console.log(document.activeElement.tagName);

        const searchFilters = (this.state.searchClicked) ? 

                            <div>
                                <div className="SearchFunctions ">
                                    <div id="SearchBarClicked" className="GiveCursor" placeholder="Find An Artist"
                                    type="text" onFocus={this.showFilters} onBlur={this.hideFilters}></div>

                                    <button ref={this.searchRef} onClick={this.searchClick} className="SearchButton GiveCursor"> Search </button>
                                </div>
                                <div className="SearchFilters" >
                                    <button value="Location" onBlur={this.hideFilters} 
                                        onClick={this.filterClick} className="FilterButton GiveCursor">Location</button>

                                    <button value="Names"  onBlur={this.hideFilters}
                                        onClick={this.filterClick} className="FilterButton GiveCursor">Names</button>
                                
                                    <button value="Artistry"  onBlur={this.hideFilters}
                                        onClick={this.filterClick} className="FilterButton GiveCursor">Artistry</button>
                                        
                                    <button tabIndex="0" value="Affinity" onBlur={this.hideFilters}
                                        onClick={this.filterClick} className="FilterButton GiveCursor">Affinity</button>
                                </div>
                                {this.state.LocationOpen && <form onSubmit={this.formSubmit}>
                                                                <div tabIndex="0" ref={this.loc1Ref}>
                                                                    <input type="text" tabIndex="0" ref={this.loc2Ref} onChange={this.setSearchTerm} 
                                                                        ref={this.inputRef} value={this.state.LocationTerm} onSubmit={this.formSubmit}/>
                                                                </div>
                                                            </form>
                                }
                                {this.state.NamesOpen && <form onSubmit={this.formSubmit}>
                                                                <div tabIndex="0" ref={this.names1Ref}>
                                                                    <input type="text" tabIndex="0" ref={this.names2Ref} onChange={this.setSearchTerm} 
                                                                        ref={this.inputRef} value={this.state.NamesTerm} onSubmit={this.formSubmit}/>
                                                                </div>
                                                            </form>
                                }
                                {this.state.ArtistryOpen && artDrop}
                                {this.state.AffinityOpen && affDrop}
                            </div>

                            : <div>
                                <div className="SearchFunctions">
                                    <div id="SearchBarNotClicked" placeholder="Find An Artist"
                                    type="text" onFocus={this.showFilters}> </div>
                                </div>
                                <div className="SearchFilters">
                                    <button onClick={this.filterClick} ref={this.filter1Ref} className="FilterButton GiveCursor"
                                    value="Location"> Location </button>
                                    <button onClick={this.filterClick} className="FilterButton GiveCursor"
                                    value="Names"> Names </button>
                                    <button onClick={this.filterClick} className="FilterButton GiveCursor"
                                    value="Artistry"> Artistry </button>
                                    <button  onClick={this.filterClick} className="FilterButton GiveCursor"
                                    value="Affinity"> Affinity </button>
                                </div>
                            </div>

        return(

            <div className="Search">
                {searchFilters}
            </div>
        )
    }
}

const mapStateToProps = (state) =>
{
    return {
        searchObject: state.home.searchObject,
    };
}

const mapDispatchToProps = (dispatch) =>
{
    return {
        goSearch: (searchObject) => dispatch(goSearch(searchObject)),
    }
}

export default connect (mapStateToProps, mapDispatchToProps) (Search);
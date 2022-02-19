import React, {Component} from 'react';
import './elements.css';

class LangSearch extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            boxChecked: false,
            countrySearch: "",
            newList: "",
        }
    };

    countryList = ["English", "Mandarin", "Spanish", "Cantonese", "French", "Arabic", "Hindi",
                    "Russian", "Portuguese", "Tagalog", "Haitian Creole", "Vietnamese", "Japanese",
                    "Dutch", "German", "Zulu", "Swahili", "Yoruba", "Twi", "Igbo", "Oromo", "Amharic",
                    "Somali", "Hebrew", "Italian", "Czech", "Slovakian", "Romanian", "Hausa", "Swedish",
                    "Norwegian", "Polish", "Thai", "Punjabi", "Cape Verdean Creole", "Xhosa", "Turkish",
                    "Farsi", "Armenian", "Ukranian", "Korean", "Malay", "Bengala", "Urdu"]
        
        searchCountry = (e) => 
        {
            let filtered;
            let field = {name: this.props.name, value: e.target.value, type: "lang"};

            if (e.target.value !== "")
            {
                filtered = this.countryList.filter((country) => (country.slice(0, (e.target.value.length))) === e.target.value.slice(0, (e.target.value.length)));
                console.log(this.countryList[8].slice(0, (e.target.value.length)));
                console.log(e.target.value.slice(0, (e.target.value.length)));
            }
            this.setState({
                ...this.state,
                countrySearch: e.target.value,
                newList: filtered,
            }, () =>
            {
                this.props.setAffinity(field);
            });
        }

        clickCountry = (e) =>
        {
            let field = {name: this.props.name, value: e.target.innerText, type: "lang"};
            this.setState({
                ...this.state,
                countrySearch: e.target.innerText,
                newList: "",
            }, () =>
            {
                this.props.setAffinity(field);
            });
        }

        onSubmit = (e) =>
        {
            e.preventDefault();
        }
    

        render()
        {
            let countryNames;
            if (this.state.newList)
            {
                countryNames = this.state.newList.map(country => <div className="CountryName" onClick={this.clickCountry}><p>{country}</p></div>)
            }
            console.log(this.state.countrySearch);

            return (
                <div className="FilterSearch">
                    <div className="CountryInput">
                        <form onSubmit={this.onSubmit}>
                            <input type="text" tabIndex="0" id="RaceDropLOG" placeholder="Choose Language" className="GiveCursor" onChange={this.searchCountry} 
                                      onSubmit={this.onSubmit} value={this.props.lang}/>
                        </form>
                    </div>
                    <div className="CountryList">
                        {countryNames}
                    </div>
                </div>
            )
        };
			
    }

export default LangSearch;
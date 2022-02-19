import React, {Component} from 'react';
import './elements.css';

class CountrySearch extends Component
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

    countryList = [ "Afghanistan", "Albania", "Algeria",
                    "American Samoa", "Andorra", "Angola", "Anguilla",
                    "Antarctica", "Antigua and B.", "Argentina",
                    "Armenia", "Aruba", "Australia", "Austria",
                    "Azerbaijan", "The Bahamas", "Bahrain",
                    "Bangladesh", "Barbados", "Belarus", "Belgium",
                    "Belize", "Benin", "Bermuda", "Bhutan",
                    "Bolivia", "Bonaire, Sint Eust.", "Bosnia and Herz.",
                    "Botswana", "Bouvet Island", "Brazil",
                    "Brunei Darussalam", "Bulgaria",
                    "Burkina Faso", "Burundi", "Cabo Verde",
                    "Cambodia", "Cameroon", "Canada",
                    "Cayman Islands", "Central African Rep.",
                    "Chad", "Chile", "China", "Christmas Island",
                    "Cocos (Keeling) Islands", "Colombia",
                    "The Comoros", "Congo", "The Cook Islands", "Costa Rica",
                    "Croatia", "Cuba", "Curaçao", "Cyprus", "Czechia",
                    "Côte d'Ivoire", "Denmark", "Djibouti", "Dominica",
                    "Dominican Republic", "Ecuador", "Egypt",
                    "El Salvador", "Equatorial Guinea", "Eritrea",
                    "Estonia", "Eswatini", "Ethiopia",
                    "The Falkland Islands",
                    "The Faroe Islands", "Fiji", "Finland", "France",
                    "French Guiana", "French Polynesia", "Gabon",
                    "The Gambia", "Georgia", "Germany",  "Ghana",
                    "Gibraltar", "Greece", "Greenland",  "Grenada",
                    "Guadeloupe", "Guam", "Guatemala",  "Guernsey",
                    "Guinea", "Guinea-Bissau", "Guyana", "Haiti",
                    "Heard Island and M.",
                    "Honduras", "Hong Kong", "Hungary", "Iceland", "India",
                    "Indonesia", "Iran", "Iraq",
                    "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica",
                    "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya",
                    "Kiribati", "South Korea", "Korea", "Kuwait", "Kyrgyzstan",
                    "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya",
                    "Liechtenstein", "Lithuania", "Luxembourg", "Macao",
                    "Madagascar", "Malawi", "Malaysia", "Maldives",  "Mali",
                    "Malta", "The Marshall Islands", "Martinique", "Mauritania",
                    "Mauritius", "Mayotte", "Mexico", "Micronesia",
                    "Moldova", "Monaco", "Mongolia", "Montenegro",
                    "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia",
                    "Nauru", "Nepal", "The Netherlands", "New Caledonia",
                    "New Zealand", "Nicaragua", "Niger", "Nigeria",
                    "Niue", "Norfolk Island", "Northern Mariana Islands",
                    "Norway", "Oman", "Pakistan", "Palau", "Palestine",
                    "Panama", "Papua New Guinea", "Paraguay", "Peru", "The Philippines",
                    "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar",
                    "North Macedonia", "Romania", "Russia",
                    "Rwanda", "Réunion", "Saint Barthélemy",
                    "Saint Helena, A. & T.",
                    "Saint Kitts and N.", "Saint Lucia", "Saint Martin",
                    "Saint Pierre and M.", "Saint Vincent",
                    "Samoa", "San Marino", "Sao Tome and P.", "Saudi Arabia",
                    "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore",
                    "Sint Maarten", "Slovakia", "Slovenia", "Solomon Islands",
                    "Somalia", "South Africa", "South Georgia",
                    "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname",
                    "Svalbard and Jan Mayen", "Sweden", "Switzerland", "Syria",
                    "Taiwan", "Tajikistan", "Tanzania", "Thailand",
                    "Timor-Leste", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago",
                    "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos",
                    "Tuvalu", "Uganda", "Ukraine", "United Arab Emir.",
                    "United Kingdom", "United States", "Uruguay", "Uzbekistan",
                    "Vanuatu", "Venezuela", "Viet Nam", "British Virgin Islands",
                     "US Virgin Islands", "Wallis and Futuna", "Western Sahara", 
                     "Yemen", "Zambia", "Zimbabwe", "Åland Islands"
                ];
        
        searchCountry = (e) => 
        {
            let filtered;
            let field = {name: this.props.name, value: e.target.value, type: "ethnic"};
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
            let field = {name: this.props.name, value: e.target.innerText, type: "ethnic"};
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
                            <input type="text" tabIndex="0" id="RaceDropLOG" placeholder="Search A Country" className="GiveCursor" onChange={this.searchCountry} 
                                      onSubmit={this.onSubmit} value={this.props.country}/>
                        </form>
                    </div>
                    <div className="CountryList">
                        {countryNames}
                    </div>
                </div>
            )
        };
			
    }

export default CountrySearch;
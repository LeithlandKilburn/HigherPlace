import React, { Component } from 'react';
import './css/Login.css';    
import { signUp } from '../../store/actions/authActions';
import { artCont } from '../../store/actions/authActions';
import { connect } from 'react-redux';
import SelectBox from '../elements/SelectBox';
import CountrySearch from '../elements/CountrySearch';
import LangSearch from '../elements/LangSearch';

const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing.unit * 2,
    },
  });

class ArtistSignUp extends Component 
{
  constructor( props )
  {
    super( props );
    this.state = {
      profilePic: null,  
      email: "",
      password: "",
      username: "",
      city: "",
      artist: false,
      profession: "",
      ethnicity: "",
      lang: "",
      proSeld: "",
      style: "",
      allDone: false,
      searchFilter: "Affinity",
      affSelect: "",
    }
  }

  componentDidMount = () =>
  {
    console.log("COMPONENT UNMOUNTING!!!!");
    if (this.props.tempAcc)
    {
      this.setState({
        ...this.state,
        email: this.props.tempAcc.email,
        password: this.props.tempAcc.password,
        username: this.props.tempAcc.username,
        city: this.props.tempAcc.city,
      })
    }
  }

  componentWillUnmount = () => 
  {
    if (!this.state.allDone)
    {
      this.props.artCont(this.state);
    }
  }

  handleProfession = (e) =>
  {
    console.log(e.target);
    if (e.target.name === "profession1")
    {
      this.setState(
        {
            ...this.state,
            profession : {...this.state.profession, pro1 : e.target.value},
            proSeld: e.target.name,
            style: [],
        }, () =>
        {
          console.log(this.state);
        })
    } else
    {
      this.setState(
        {
            ...this.state,
            profession : {...this.state.profession, pro2 : e.target.value},
            proSeld: e.target.name,
        }, () =>
        {
          console.log(this.state);
          console.log([this.state.profession.pro1, this.state.profession.pro2]);
        })
    }
  }

  handleStyle = (style, boxAction) =>
  {
    if (boxAction === "add")
    {
      this.setState({
        ...this.state,
        style: [...this.state.style, style]
      }, () => {console.log(this.state);})
    } else
    {
      this.setState({
        ...this.state,
        style: this.state.style.filter( (noStyle) => noStyle !== style )
      }, () => {console.log(this.state);})
    }
    
  }
  
  selectPro = (pro) =>
  {
    this.setState({
        ...this.state,
        profession : {...this.state.profession, pro1 : pro},
      })
  }

  selectPro2 = (pro) =>
  {
    this.setState({
        ...this.state,
        profession : {...this.state.profession, pro2 : pro},
      })
  }



  affClick = (e) =>
  {
    this.setState(
      {
        ...this.state,
        affSelect: e.target.innerText,
      }
    )
  }

  setAffinity = (e) =>
  {
      if (this.state.affSelect === "Ethnicity")
      {
        switch (e.target.name)
        {
          case "race1":
            this.setState(
            {
                ...this.state,
                ethnicity : {...this.state.ethnicity, race1: e.target.value, region1: "", country1: ""},
            });
            break;
          case "region1":
            this.setState(
            {
                ...this.state,
                ethnicity : {...this.state.ethnicity, region1: e.target.value, country1: ""},
            });
            break;
          case "race2":
            this.setState(
              {
                  ...this.state,
                  ethnicity : {...this.state.ethnicity, race2: e.target.value, region2: "", country2: ""},
              });
            break;
          case "region2":
            this.setState(
              {
                  ...this.state,
                  ethnicity : {...this.state.ethnicity, region2: e.target.value, country2: ""},
              });
            break;
          case "race3":
            this.setState(
              {
                  ...this.state,
                  ethnicity : {...this.state.ethnicity, race3: e.target.value, region3: "", country3: ""},
              });
            break;
          case "region3":
            this.setState(
              {
                  ...this.state,
                  ethnicity : {...this.state.ethnicity, region3: e.target.value, country3: ""},
              });
            break;
          default:
            break;
        }
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
  setAffinityLGBTQ = (e) =>
  {
    if (e.target.value !== "non-binary" || e.target.value !== "transgender")
    {
      this.setState(
      {
          ...this.state,
          sexualityTerm : e.target.value,
          whatChanged: {...this.state.whatChanged, SexualityTerm : e.target.value, GenderTerm: "",},
      })
    } else 
    {
        this.setState(
            {
                ...this.state,
                genderTerm : e.target.value,
                whatChanged: {...this.state.whatChanged, GenderTerm : e.target.value, SexualityTerm: "",},
            })
    }
  }

  filterAffinity = (field) =>
  {
    if (field.type === "ethnic")
    {
      this.setState({
        ...this.state,
        ethnicity: {
          ...this.state.ethnicity,
          [field.name]: field.value,
        }
      })
    }
    else
    {
      this.setState({
        ...this.state,
        lang: {
          ...this.state.lang,
          [field.name]: field.value,
        }
      })
    }
  }

  buttonFinish = (e) =>
  {
    //Convert ethnicity object to an array for Firestore. Convert ethnicity object to an array for Firestore.
    let ethnicArray = [];
    let ethnicKeys = Object.keys(this.state.ethnicity);
    for (let i = 0; i < ethnicKeys.length; i++)
    {
      if (this.state.ethnicity[ethnicKeys[i]] !== "")
      {
        ethnicArray[i] = this.state.ethnicity[ethnicKeys[i]];
      }
      
    }

    //Convert ethnicity object to an array for Firestore. Convert ethnicity object to an array for Firestore.
    let langArray = [];
    let langKeys = Object.keys(this.state.lang);
    for (let i = 0; i < langKeys.length; i++)
    {
      if (this.state.lang[langKeys[i]] !== "")
      {
        langArray[i] = this.state.lang[langKeys[i]];
      }
      
    }
    
    //Convert ethnicity object to an array for Firestore. Convert ethnicity object to an array for Firestore.
    let proArray = [];
    let proKeys = Object.keys(this.state.profession);
    for (let i = 0; i < proKeys.length; i++)
    {
      if (this.state.profession[proKeys[i]] !== "")
      {
        proArray[i] = this.state.profession[proKeys[i]];
      }
      
    }
    
    this.setState({
      ...this.state,
      allDone: true,
      profession: proArray,
      ethnicity: ethnicArray,
      lang: langArray,
    }, () => {
      this.props.signUp(this.state);
    })
    
  }

  render()
  {
    const { auth } = this.props;
    if (this.props.redirectNow) {this.props.history.push('/profile')};
    console.log(this.state);

    let artDrop = <div></div>;
    let artDrop2 = <div></div>;
    let affDrop;
    let regionDrop1;
    let regionsArray1 = "";
    let regionDrop2;
    let regionsArray2 = "";
    let regionDrop3;
    let regionsArray3 = "";
    
    switch (this.state.ethnicity.race1)
    {
        case "black":
            regionDrop1 = ["North America", "Central America", "South America", "West Indies", 
                            "West Africa", "East Africa", "Central Africa", "South Africa", "North Africa"];
            regionsArray1 = regionDrop1.map(region => <option value={"B"+region}>{region}</option> )
            break;
        case "white":
            regionDrop1 = ["North American", "Western Europe", "Eastern Europe"];
            regionsArray1 = regionDrop1.map(region => <option value={"W"+region}>{region}</option> )
            break;
        case "native":
            regionDrop1 = ["North America", "South America", "Central America"];
            regionsArray1 = regionDrop1.map(region => <option value={"I"+region}>{region}</option> )
            break;
        case "asian":
            regionDrop1 = ["Western Asia", "East Asia", "Southeast Asia", "South Asia", "Pacific Islands"];
            regionsArray1 = regionDrop1.map(region => <option value={"A"+region}>{region}</option> )
            break;
        case "arabic":
            regionDrop1 = ["Middle East", "North Africa"];
            regionsArray1 = regionDrop1.map(region => <option value={"M"+region}>{region}</option> )
            break;
        default:
            break;
    }
    switch (this.state.ethnicity.race2)
    {
        case "black":
            regionDrop2 = ["North America", "Central America", "South America", "West Indies", 
                            "West Africa", "East Africa", "Central Africa", "South Africa", "North Africa"];
            regionsArray2 = regionDrop2.map(region => <option value={"B"+region}>{region}</option> )
            break;
        case "white":
            regionDrop2 = ["North American", "Western Europe", "Eastern Europe"];
            regionsArray2 = regionDrop2.map(region => <option value={"W"+region}>{region}</option> )
            break;
        case "native":
            regionDrop2 = ["North America", "South America", "Central America"];
            regionsArray2 = regionDrop2.map(region => <option value={"I"+region}>{region}</option> )
            break;
        case "asian":
            regionDrop2 = ["Western Asia", "East Asia", "Southeast Asia", "South Asia", "Pacific Islands"];
            regionsArray2 = regionDrop2.map(region => <option value={"A"+region}>{region}</option> )
            break;
        case "arabic":
            regionDrop2 = ["Middle East", "North Africa"];
            regionsArray2 = regionDrop2.map(region => <option value={"M"+region}>{region}</option> )
            break;
        default:
            break;
    }
    switch (this.state.ethnicity.race3)
    {
        case "black":
            regionDrop3 = ["North America", "Central America", "South America", "West Indies", 
                            "West Africa", "East Africa", "Central Africa", "South Africa", "North Africa"];
            regionsArray3 = regionDrop3.map(region => <option value={"B"+region}>{region}</option> )
            break;
        case "white":
            regionDrop3 = ["North American", "Western Europe", "Eastern Europe"];
            regionsArray3 = regionDrop3.map(region => <option value={"W"+region}>{region}</option> )
            break;
        case "native":
            regionDrop3 = ["North America", "South America", "Central America"];
            regionsArray3 = regionDrop3.map(region => <option value={"I"+region}>{region}</option> )
            break;
        case "asian":
            regionDrop3 = ["Western Asia", "East Asia", "Southeast Asia", "South Asia", "Pacific Islands"];
            regionsArray3 = regionDrop3.map(region => <option value={"A"+region}>{region}</option> )
            break;
        case "arabic":
            regionDrop3 = ["Middle East", "North Africa"];
            regionsArray3 = regionDrop3.map(region => <option value={"M"+region}>{region}</option> )
            break;
        default:
            break;
    }
    
      
      /*CHOOSE AFFINITY DROPDOWN. CHOOSE AFFINITY DROPDOWN. CHOOSE AFFINITY DROPDOWN. CHOOSE AFFINITY DROPDOWN. CHOOSE AFFINITY DROPDOWN. CHOOSE AFFINITY DROPDOWN. CHOOSE AFFINITY DROPDOWN.CHOOSE AFFINITY DROPDOWN. 
      CHOOSE AFFINITY DROPDOWN. CHOOSE AFFINITY DROPDOWN. CHOOSE AFFINITY DROPDOWN. CHOOSE AFFINITY DROPDOWN. CHOOSE AFFINITY DROPDOWN. CHOOSE AFFINITY DROPDOWN. CHOOSE AFFINITY DROPDOWN. CHOOSE AFFINITY DROPDOWN.*/
      //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------/
      
      //3 RACE SELECTS. 3 RACE SELECTS. 3 RACE SELECTS. 3 RACE SELECTS. 3 RACE SELECTS. 3 RACE SELECTS. 3 RACE SELECTS. 3 RACE SELECTS. 3 RACE SELECTS.
      switch (this.state.affSelect)
      {
        case "Ethnicity":
          affDrop =   <div className="affBSelect">
                          <div className="ethSelect">
                            <form onSubmit={this.formSubmit}>
                              <select id="RaceDropLOG" name="race1" className="GiveCursor" 
                                  value={this.state.ethnicity.race1} onChange={this.setAffinity}>
                                  <option value="">Select Race</option>
                                  <option value="asian">Asian</option>
                                  <option value="arabic">Middle Eastern/Arabic</option>
                                  <option value="black">African/Black</option>
                                  <option value="white">European/White</option>
                                  <option value="native">Indig. American</option>
                              </select>
                            </form>

                            <form>
                              <select id="RaceDropLOG" name="region1" className="GiveCursor" 
                                  value={this.state.ethnicity.region1} onChange={this.setAffinity}>
                                  <option value="">Region</option>
                                  {regionsArray1}
                              </select>
                            </form>
                            <CountrySearch setAffinity={this.filterAffinity} country={this.state.ethnicity.country1} name="country1"/>
                          </div>


                          <div className="ethSelect">
                            <form onSubmit={this.formSubmit}>
                              <select id="RaceDropLOG" name="race2" className="GiveCursor" 
                                  value={this.state.ethnicity.race2} onChange={this.setAffinity}>
                                  <option value="">Select Race</option>
                                  <option value="asian">Asian</option>
                                  <option value="arabic">Middle Eastern/Arabic</option>
                                  <option value="black">African/Black</option>
                                  <option value="white">European/White</option>
                                  <option value="native">Indig. American</option>
                              </select>
                            </form>

                            <form>
                              <select id="RaceDropLOG" name="region2" className="GiveCursor" 
                                  value={this.state.ethnicity.region2} onChange={this.setAffinity}>
                                  <option value="">Region</option>
                                  {regionsArray2}
                              </select>
                            </form>
                            <CountrySearch setAffinity={this.filterAffinity} country={this.state.ethnicity.country2} name="country2"/>
                          </div>

                          
                          <div className="ethSelect">
                            <form onSubmit={this.formSubmit}>
                              <select id="RaceDropLOG" name="race3" className="GiveCursor"
                                  value={this.state.ethnicity.race3} onChange={this.setAffinity}>
                                  <option value="">Select Race</option>
                                  <option value="asian">Asian</option>
                                  <option value="arabic">Middle Eastern/Arabic</option>
                                  <option value="black">African/Black</option>
                                  <option value="white">European/White</option>
                                  <option value="native">Indig. American</option>
                              </select>
                            </form>

                            <form>
                              <select id="RaceDropLOG" name="region3" className="GiveCursor"
                                  value={this.state.ethnicity.region3} onChange={this.setAffinity}>
                                  <option value="">Region</option>
                                  {regionsArray3}
                              </select>
                            </form>
                            <CountrySearch setAffinity={this.filterAffinity} country={this.state.ethnicity.country3} name="country3"/>
                          </div>
                        </div>
        break;
        case "Religion":
            affDrop =   <div className="affCSelect">
                          <div className="ethSelect">
                            <form onSubmit={this.formSubmit}>
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
                          </div>
                        </div>
        break;
        case "Language":
            affDrop =   <div className="affLSelect">
                          <div className="LangSelect">
                            <LangSearch setAffinity={this.filterAffinity} name="lang1" lang={this.state.lang.lang1}/>
                          </div>
                          <div className="LangSelect">
                            <LangSearch setAffinity={this.filterAffinity} name="lang2" lang={this.state.lang.lang2}/>
                          </div>
                          <div className="LangSelect">
                            <LangSearch setAffinity={this.filterAffinity} name="lang3" lang={this.state.lang.lang3}/>
                          </div>
                          <div className="LangSelect">
                            <LangSearch setAffinity={this.filterAffinity} name="lang4" lang={this.state.lang.lang4}/>
                          </div>
                          <div className="LangSelect">
                            <LangSearch setAffinity={this.filterAffinity} name="lang5" lang={this.state.lang.lang5}/>
                          </div>
                          <div className="LangSelect">
                            <LangSearch setAffinity={this.filterAffinity} name="lang6" lang={this.state.lang.lang6}/>
                          </div>
                          <div className="LangSelect">
                            <LangSearch setAffinity={this.filterAffinity} name="lang7" lang={this.state.lang.lang7}/>
                          </div>
                          <div className="LangSelect">
                            <LangSearch setAffinity={this.filterAffinity} name="lang8" lang={this.state.lang.lang8}/>
                          </div>
                        </div>
        break;
        case "LGBTQ":
            affDrop =   <div className="affCSelect">
                          <form onSubmit={this.formSubmit}>
                            <select id="LGBTQDrop" className="GiveCursor"
                                value={this.state.sexualityTerm} onChange={this.setAffinityLGBTQ}>
                                <option value="">Select An Sexuality</option>
                                <option value="lesbian">Lesbian</option>
                                <option value="gay">Gay</option>
                                <option value="bisexual">Bisexual</option>
                                <option value="pansexual">Pansexual</option>
                                <option value="asexual">Asexual</option>
                            </select>
                          </form>
                          <form onSubmit={this.formSubmit}>
                            <select id="LGBTQDrop" className="GiveCursor" 
                                value={this.state.genderTerm} onChange={this.setAffinityLGBTQ}>
                                <option value="">Select A Gender</option>
                                <option value="transgender">Transgender</option>
                                <option value="nonbinary">Non-Binary</option>
                            </select>
                          </form>
                        </div>
          break;
          default:
            affDrop = <div></div>  
          break;
      }
    
    return (
      <div className="ASContainer">
        <div className="ArtistSignup">
          <div>
            <h5 className="center">Join HigherPlace's Artist Community!</h5>
            <h6 className="center"> Choose Up To 2 Professions</h6>
          </div>

          {/* SELECT ARTISTRY SELECT ARTISTRY SELECT ARTISTRY SELECT ARTISTRY SELECT ARTISTRY SELECT ARTISTRY SELECT ARTISTRY SELECT ARTISTRY */}
          <div className="ArtistInfo2">
            
            <div>
              <SelectBox handleStyle={this.handleStyle} first={true} selectPro={this.selectPro}/>
            </div>

            <div>
              <SelectBox handleStyle={this.handleStyle} first={false} selectPro2={this.selectPro2}/>
            </div>
          </div>

          <div className="affinity">
            <h5 className="affHeader">Claim Affinity Groups (Optional):</h5>
            <div className="scroll-wrapper-LOG">
              <div className="affBContainer">
                  <span>
                    <button tabIndex="0" value="Affinity" onBlur={this.hideFilters}
                      onClick={this.affClick} className="affinityButton GiveCursor">Ethnicity</button>
                  </span> 
                  <span>
                    <button tabIndex="0" value="Affinity" onBlur={this.hideFilters}
                      onClick={this.affClick} className="affinityButton GiveCursor">Language</button>
                  </span> 
                  <span>
                    <button tabIndex="0" value="Affinity" onBlur={this.hideFilters}
                      onClick={this.affClick} className="affinityButton GiveCursor">LGBTQ</button>
                  </span>
                  <span>
                    <button tabIndex="0" value="Affinity" onBlur={this.hideFilters}
                      onClick={this.affClick} className="affinityButton GiveCursor">Religion</button>
                  </span>
                </div>
              </div>
              <hr/>
              
              <div>
                {affDrop}
              </div>
          </div>
        </div>

        

        <div className="AccFinish">
          <h4 >SIGN UP ON STRIPE TO RECIEVE <br/> PAY FROM CLIENTS</h4>
          <button className="AccButtons" onClick={this.buttonFinish} >CONTINUE TO STRIPE</button>
        </div>

      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      signUp: (newUser) => dispatch(signUp(newUser)),
      artCont: (newUser) => dispatch(artCont(newUser)),
  }
}

const mapStateToProps = (state) => 
{
  console.log(state);
  return {
    auth: state.firebase.auth,
    tempAcc: state.auth.tempAcc,
    redirectNow: state.auth.redirectNow,
  }
}


export default (connect(mapStateToProps, mapDispatchToProps) (ArtistSignUp));
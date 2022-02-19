import React, {Component} from 'react';
import Checkbox from '../elements/Checkbox';
import './elements.css';

class SelectBox extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            first: "",
            boxChecked: false,
        }
    };

    selectOpt = (e) =>
    {
        e.persist();
        let pro = e.target.innerText;
        console.log(e);
        console.log(e.target);
        if (this.props.first)
        {
            this.setState(
                {
                    ...this.state,
                    first: pro,
                }, () =>
                {
                    this.props.selectPro(pro);
                }
            )
        } else
        {
            this.setState(
                {
                    ...this.state,
                    first: pro,
                }, () =>
                {
                    this.props.selectPro2(pro);
                }
            )
        }
    }

    render()
    {
        console.log(this.state);
        let artDrop = <div></div>;

        switch (this.state.first)
        {
            case "Photographer":
                artDrop = <div className="styleSelect1">
                            <Checkbox key={1} style={"Events"} handleStyle={this.props.handleStyle}/>
                            <Checkbox key={2} style={"Sports"} handleStyle={this.props.handleStyle}/>
                            <Checkbox key={3} style={"Photoshop/Airbrush"} handleStyle={this.props.handleStyle}/>
                            <Checkbox key={4} style={"Studio"} handleStyle={this.props.handleStyle}/>
                            <Checkbox key={5} style={"Film/Vintage"} handleStyle={this.props.handleStyle}/>
                            <Checkbox key={6} style={"Fashion"} handleStyle={this.props.handleStyle}/>
                            <Checkbox key={7} style={"Budoir"} handleStyle={this.props.handleStyle}/>
                            <Checkbox key={8} style={"Food"} handleStyle={this.handleStyle}/>
                            <Checkbox key={9} style={"Prints/Canvas"} handleStyle={this.props.handleStyle}/>
                            <Checkbox key={10} style={"Real Estate "} handleStyle={this.props.handleStyle}/>
                            </div>
            break;
            case "Videographer":
                artDrop = <div className="styleSelect1">
                            <Checkbox key={11} style={"Video Editor"} handleStyle={this.props.handleStyle}/>
                            <Checkbox key={12} style={"Events"} handleStyle={this.props.handleStyle}/>
                            <Checkbox key={13} style={"Sports"} handleStyle={this.props.handleStyle}/>
                            <Checkbox key={14} style={"Music Videos"} handleStyle={this.props.handleStyle}/>
                            <Checkbox key={15} style={"Film/Vintage"} handleStyle={this.props.handleStyle}/>
                            <Checkbox key={16} style={"Product/Commercial"} handleStyle={this.props.handleStyle}/>
                            </div>

                break;
            case "Graphic Designer":
                artDrop = <div className="styleSelect1">
                            <Checkbox key={17} style={"Flyers"} handleStyle={this.props.handleStyle}/>
                            <Checkbox key={18} style={"Logos"} handleStyle={this.props.handleStyle}/>
                            <Checkbox key={19} style={"Digital Art"} handleStyle={this.props.handleStyle}/>
                            </div>

                break;
            case "Visual Artist":
                artDrop = <div className="styleSelect1">
                            <Checkbox key={20} style={"Painter"} handleStyle={this.props.handleStyle}/>
                            <Checkbox key={21} style={"Illustrator"} handleStyle={this.props.handleStyle}/>
                            <Checkbox key={22} style={"3D/Sculpting"} handleStyle={this.props.handleStyle}/>
                            <Checkbox key={23} style={"Ceramics"} handleStyle={this.props.handleStyle}/>
                            <Checkbox key={24} style={"Large Form"} handleStyle={this.props.handleStyle}/>
                            <Checkbox key={25} style={"Framed"} handleStyle={this.props.handleStyle}/>
                            </div>

                break;
            case "Fashion Designer":
                artDrop = <div className="styleSelect1">
                            <Checkbox key={26} style={"Cultural Clothing"} handleStyle={this.props.handleStyle}/>
                            <Checkbox key={27} style={"Dresses"} handleStyle={this.props.handleStyle}/>
                            <Checkbox key={28} style={"Jackets"} handleStyle={this.props.handleStyle}/>
                            <Checkbox key={30} style={"Shoes"} handleStyle={this.props.handleStyle}/>
                            <Checkbox key={31} style={"Embroidery"} handleStyle={this.props.handleStyle}/>
                            <Checkbox key={32} style={"Bleach"} handleStyle={this.props.handleStyle}/>
                            <Checkbox key={33} style={"Tie-Dye"} handleStyle={this.props.handleStyle}/>
                            </div>

                break;
            case "Makeup Artist":
                artDrop = <div className="styleSelect1">
                            <Checkbox key={34} style={"Natural"} handleStyle={this.props.handleStyle}/>
                            <Checkbox key={35} style={"Soft Glam"} handleStyle={this.props.handleStyle}/>
                            <Checkbox key={36} style={"Full Glam"} handleStyle={this.props.handleStyle}/>
                            <Checkbox key={37} style={"Matte/Smokey"} handleStyle={this.props.handleStyle}/>
                            <Checkbox key={38} style={"Costume"} handleStyle={this.props.handleStyle}/>
                        </div>

                break;
            case "Model":
                artDrop = <div className="styleSelect1">
                            <Checkbox key={39} style={"Fashion"} handleStyle={this.props.handleStyle}/>
                            <Checkbox key={40} style={"Fitness"} handleStyle={this.props.handleStyle}/>
                            <Checkbox key={41} style={"Under/Swimwear"} handleStyle={this.props.handleStyle}/>
                            </div>

                break;
            
            default:
                artDrop = <div>
                            <div className="SBCat" name="Photographer" onClick={this.selectOpt}>Photographer</div>
                            <div className="SBCat" name="Videographer" onClick={this.selectOpt}>Videographer</div>
                            <div className="SBCat" name="Graphic Designer" onClick={this.selectOpt}>Graphic Designer</div>
                            <div className="SBCat" name="Visual Artist" onClick={this.selectOpt}>Visual Artist</div>
                            <div className="SBCat" name="Fashion Designer" onClick={this.selectOpt}>Fashion Designer</div>
                            <div className="SBCat" name="Makeup Artist" onClick={this.selectOpt}>Makeup Artist</div>
                            <div className="SBCat" name="Model" onClick={this.selectOpt}>Model</div>
                          </div>
                break
        }
        return (
                <div className="SelectCont">
                    {artDrop}
                </div>
            )};
			
    }

export default SelectBox;
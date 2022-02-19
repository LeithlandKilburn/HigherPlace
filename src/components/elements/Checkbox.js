import React, {Component} from 'react';
import './elements.css';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

class Checkbox extends Component
{
    constructor(props){
        super(props);
        this.state = {
            boxChecked: false,
        }
        };

    checkStyle = (e) =>
    {
        let boxAction;
        if (this.state.boxChecked === false)
        {
            boxAction = "add";
        } else
        {
            boxAction = "remove";
        }

        this.setState(
            {
                ...this.state,
                boxChecked: !this.state.boxChecked,
            }, () => {
                this.props.handleStyle(this.props.style, boxAction);
            }
        )
    }
        
    render()
    {
        let box = this.state.boxChecked ? <CheckBoxIcon/> : <CheckBoxOutlineBlankIcon/>;
        return (
                <div className="CheckboxUnit">
                    <span onClick={this.checkStyle} ><span>{box}</span><p className="styleSelText">{this.props.style}</p></span>
                </div>
            )};
			
    }

export default (Checkbox);
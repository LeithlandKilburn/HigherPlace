import React from 'react';
import './css/Login.css';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

class Checkbox extends React.Component
{
    constructor(props){
        super(props);
        this.state = {
            boxChecked: false, 
        }
        };

    checkStyle = (e) =>
    {
        this.setState(
            {
                ...this.state,
                boxChecked: !this.state.boxChecked,
            }
        )
    }
        
    render()
    {
        let box = this.state.boxChecked ? <CheckBoxIcon/> : <CheckBoxOutlineBlankIcon/>;
        return (
                <span onClick={this.checkStyle} ><span>{box}</span><p className="styleSelText">{this.props.style}</p></span>
            )};
			
    }

export default (Checkbox);
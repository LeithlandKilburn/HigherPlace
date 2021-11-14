import React, {Component} from 'react';
import "../css/Messages.css";


class ChatText extends Component
{
    constructor (props)
    {
        super(props);
        this.state = {
            usersChats: null,
        };
    }

    render()
    {
        return(
            <div className="Convo">   
                <div className="ChatTextCont">
                    <p className="ChatText">
                        {this.props.msg}
                    </p>
                </div>

               {/* <div className={`ChatTextCont ${true && "Reciever"}`}>
                    <p className="ChatText">
                        Hey man. Hey man. Hey man.
                    </p>
                </div> */}
            </div>    
        )
    }
}

export default ChatText;
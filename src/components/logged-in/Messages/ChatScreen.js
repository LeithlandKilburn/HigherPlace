import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Send from '@material-ui/icons/Send';
import Avatar from '@material-ui/core/Avatar';
import Gin from "../LP-15.jpg";
import '../css/Messages.css';
import ChatText from "./ChatText.js";
import { firebase } from '../../../config/fbConfig';
import { createInquiry } from '../../../store/actions/inquiryActions';
import { getMsgs } from '../../../store/actions/inquiryActions';
import { clearMsgs } from '../../../store/actions/inquiryActions';
import { connect } from 'react-redux';


class ChatScreen extends Component
{   
    constructor(props){
		super(props);
		this.state={
            inquiries: [],
            newInquiry: "",
            thisConvo: this.props.history.location.state.thisConvo,
            name:this.props.history.location.state.name,
            receiver: this.props.history.location.state.receiver,
			}
    };

    typeMsg = (e) =>
    {
        this.setState({
            ...this.state,
            newInquiry: e.target.value,
        })
    }
    
    sendInquiry = (e) =>
    {
        e.preventDefault();
        let tempMes = this.state.newInquiry;
        console.log("You typed: " + tempMes);

        //ACTION CREATOR - Write message to database.
        this.props.createInquiry(this.state);

        //Reset the input bar.
        this.setState({
            newInquiry: "",
        })
    }

    componentDidMount = () =>
    {
        // Retrieve previous messages from the reducer
        let uid = this.state.thisConvo.slice(0, (this.state.thisConvo.indexOf(":"))); 
        let receiver = this.state.thisConvo.slice(((this.state.thisConvo.indexOf(":"))) + 1);
        this.props.getInquiries(uid, receiver);
    }

    componentWillUnmount = () =>
    {
        this.props.clearMsgs();
    }
    
    render()
    {
        const { classes } = this.props;
        let receiver = this.state.receiver ? this.state.receiver : this.state.name;

        console.log(this.props.inquiries);

        return (
        <div className="Chat">
            <div className="ChatHeader">
                <div className="CHIcons">
                    <Avatar src={Gin} alt="Remy"/>
                </div>
                <p>{receiver}</p>
            </div> {/* Chat Header */} 

            <div className ="ChatBody">
                    {this.props.inquiries.map((msg) => (
                        <ChatText msg={msg.Message}/>
                    ))}
            </div>  {/* Chat Body */}  

            <div className="ChatFooter">
                <form className="TextLine">
                    <div className="TextCont">     
                        <div className="SendMsg">
                            <input value={this.state.newInquiry} type="text" placeholder="Type a message" onChange={this.typeMsg}
                            className="ChatBox" className= "TxtInput" required=""/>
                            <button onClick={this.sendInquiry}>Send a message</button>
                            <Send className="sendButton" onClick={this.sendInquiry}/>
                        </div>
                    </div>
                </form>
            </div> {/* Chat footer */}     
        </div>
        )
    }
}

const mapStateToProps = (state) =>
{
    return {
        inquiries: state.inquiry.messages
    }
}

const mapDispatchToProps = (dispatch) =>
{
    return {
        createInquiry: (inquiry) => dispatch(createInquiry(inquiry)),
        getInquiries: (uid, receiver) => dispatch(getMsgs(uid, receiver)),
        clearMsgs: () => dispatch (clearMsgs()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (ChatScreen);
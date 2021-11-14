import React, { Component } from 'react';
import PreChat from "./PreChat.js";
import List from '@material-ui/core/List';
import { firebase } from '../../../config/fbConfig';
import { connect } from 'react-redux';
import { getMsgList } from '../../../store/actions/inquiryActions';

class InquiryList extends Component 
{
    constructor (props)
    {
        super(props);
        this.state = {
            chatType: props.chatType,
        };
        console.log(this.state);
    }

    componentDidMount = async () =>
    {
        //Retrieve this user's inquiries.
        await this.props.getMsgList(this.props.uid);
        console.log(this.props);
    }

    render()
    {
        // Get the names of the current user's messaging partners.
        let otherUsers = [];
        if (this.props.userChats.length > 0)
        {
            for (let i = 0; i < this.props.userChats.length; i++)
            {
                let tempUser1 = this.props.userChats[i].users[0];
                let tempUser2 = this.props.userChats[i].users[1];
        
                if (this.props.uid === tempUser1)
                {
                    otherUsers[i] = tempUser2;
                } else
                {
                    otherUsers[i] = tempUser1;
                }
            }
        }
        
        let userInquiries = [];
        for (let i = 0; i < this.props.userChats.length; i++)
        {
            userInquiries = [...userInquiries, <PreChat history={this.props.history} chatType={this.state.chatType}
            key={`${this.props.userChats[i].convo}`} uid={this.props.uid} thisConvo={`${this.props.userChats[i].convo}`} 
            name={otherUsers[i]} currentUser={this.props.currentUser} />];
        };
        
        return (
            <>
                <List>
                    {userInquiries}
                </List>
            </>
        );
    }
}

const mapStateToProps = (state) =>
{
    return {

        userChats: state.inquiry.msgList
    }
}

const mapDispatchToProps = (dispatch) =>
{
    return {
        getMsgList: (uid) => dispatch(getMsgList(uid))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (InquiryList);

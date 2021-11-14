import React, {Component} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from "@material-ui/core/Divider";
import "../css/Messages.css";
import Gin from "../LP-15.jpg";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import { firebase } from '../../../config/fbConfig';

class PreChat extends Component
{
    
    constructor (props)
    {
        super(props);
        this.state = {
            party2: ""
        };
        console.log(this.state);
    }

    selectedChat = () =>
	{
        this.props.history.push('/ChatScreen', {chatType: this.props.chatType, uid: this.props.uid,
            thisConvo: this.props.thisConvo, name: this.state.party2, currentUser: this.props.currentUser});
	}
    
    componentDidMount = async () => 
    {
        //Get 2nd party's username.
        let db = firebase.firestore();
        let party2T = await db.collection("users").doc(this.props.name).get();
        party2T = party2T.exists ? party2T.data().username : "No One";
        
        this.setState(() => {
            return {
                ...this.state,
                party2: party2T,
            }

        });
        console.log(party2T);
    }
    
    render()
    {
        return (
            <>
                <div className="ChatPreview" onClick={this.selectedChat}>
                <ListItem>
                    <ListItemAvatar>
                    <Avatar src={Gin} alt="Remy">
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={this.state.party2}
                        secondary={'Last message' }
                    />
                    </ListItem>
                </div>
            </>
        )
    }
}

export default PreChat;
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import '../css/Messages.css';
import InquiryList from './InquiryList';
import { Paper, Tabs, Tab, Grid } from '@material-ui/core/';
import PersonIcon from '@material-ui/icons/Person';
import SendIcon from '@material-ui/icons/Send';

import {firebase,database} from '../../../config/fbConfig.js';

class Messages extends Component
{
	constructor(props) 
	{
		super(props);
		this.state = {
			tabValue: 1,
		};
	}

	componentDidMount = () =>
	{
		console.log(this.props);
	}
	
	render() 
	{
		// Route gaurding.
		const { auth } = this.props;
		if (!auth.uid) return <Redirect to='/login'/>


		//Chat tabs
		let tabs = auth.uid ? <div> 
			<Tab className="tabsWrapper" TabIndicatorProps={{style: {display: "none",},}} value={0} label="Inquiries" />
			<Tab label="Artist Chat" TabIndicatorProps={{style: {display: "none",},}} value={1} /> 
			</div>
			:
			<Tab className="tabsWrapper" TabIndicatorProps={{style: {display: "none",},}} label="Inquiries" />


		return (
			<>
				<div className="MsgTabs">
					<Paper>
						<Tabs TabIndicatorProps={{style: {display: "none",},}} value={0} centered>
							{tabs}
						</Tabs>
					</Paper>
					<Paper>
						<InquiryList tab={this.state.tabValue} currentUser={this.props.currentUser} 
							chatType={"Inquiries"} uid={this.props.uid} history={this.props.history}/>
					</Paper>
				</div>
				
			</>
		)
	}
}
const mapStateToProps = (state) => 
{
  console.log(state);
	return {
		authError: state.auth.authError,
		auth: state.firebase.auth,
		currentUser: state.firebase.profile.username
  }
}

export default connect(mapStateToProps)(Messages);

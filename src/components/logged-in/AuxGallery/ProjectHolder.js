import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { firebase } from '../../../config/fbConfig';
import { Paper, Tabs, Tab, Grid } from '@material-ui/core/';
import { displayProfileCard } from '../../../store/actions/galleryActions';
import { getGallery } from '../../../store/actions/galleryActions';
import ProfileCard from './ProfileCard';
import ProjectPost from "./ProjectPost";
import "./Gallery.css"


class ProjectHolder extends Component
{
    constructor(props)
	{
		super(props);
		this.state = {

		};
	}

    render()
    {

        let projectPosts = this.props.projects ? (
			this.props.projects.map(project => <ProjectPost history={this.props.history} post={project}/> )
			) : <p>Upload some prjects and show your work to potential clients!</p>

        return (
            <div className="Gallery">
				<div className="scrolling-wrapperG" style={{
					position: 'relative',
					height: '900px',
					overflow: 'scroll',
					marginBottom: '0px'
				}}>
					<div className="GalleryContent">
					<div><h5 className="Profession">Photographer</h5></div>
					<br/>
						<div className="GridItems">
							{projectPosts}
						</div>
					</div>
				</div>
			</div>
        )
    }
}


const mapStateToProps = (state) => 
{
	return {
		projects: state.project.projects,
  }
}

const mapDispatchToProps = (dispatch) =>
{
	return{
		getGallery: (uid) => dispatch(getGallery(uid)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (ProjectHolder);
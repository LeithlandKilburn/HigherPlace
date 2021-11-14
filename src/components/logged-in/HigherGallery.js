import React, { Component } from 'react'
import { connect } from 'react-redux' 

class HigherGallery extends Component 
{
    render()
    {
        console.log(this.props);
        return (
           
            <div>
				<h2>Viewing galleries</h2>
				<h2>Viewing galleries</h2>
				<h2>Viewing galleries</h2>
				<h2>Viewing galleries</h2>
				<h2>Viewing galleries</h2>
				<h2>Viewing galleries</h2>
			</div>
        )
    }
}

const mapStateToProps = (state) =>
{
    return {
        projects: state.project.projects
    }
}

export default connect(mapStateToProps)(HigherGallery)
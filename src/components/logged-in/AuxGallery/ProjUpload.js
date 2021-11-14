import React, {Component} from 'react' ;
import { Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { db } from '../../../config/fbConfig'
import { createProject } from '../../../store/actions/galleryActions';
import { v1 as uuidv1 } from 'uuid';
import { v4 as uuidv4 } from 'uuid';


class ProjUpload extends Component 
{
    constructor(props)
	{
		super(props);
        
        this.state = {
            uploadValue: 0,
            projectTitle: null,
            projectDescription: null,
            thumbnail: null,
            projectMedia1: null,
            projectMedia2: null,
            projectMedia3: null,
            projectMedia4: null,
            projectMedia5: null,
            projectMedia6: null,
            keyword1: null,
            keyword2: null, 
            keyword3: null,
            keyword4: null,
            keyword5: null,
            keyword6: null,
            userID: "jhbjhbjhbjh",
            projectID: "kfdjdjldk",
            timestamp: null
        }
    }
   

    fileSelected = (e) => 
    {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.files[0],
        });
    }

    handleChange = e =>
    {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });
    }

    keywordChange = e =>
    {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });
    }

    fileUpload = () =>
    {
        // Upload Selected File.
        let uuid1 = uuidv1();
        let refArray = [null, null, null, null, null, null, null];

        let storageRef = firebase.storage().ref(`/projectMedia/${this.state.userID}/${this.state.projectTitle}${uuid1}/${uuidv4()}`);
        if (this.state.thumbnail != null)
        {
            storageRef.put(this.state.thumbnail);
            refArray[0] = storageRef.location.path;
        }
                    
        let projMedias = [this.state.projectMedia1, this.state.projectMedia2, this.state.projectMedia3, 
            this.state.projectMedia4, this.state.projectMedia5, this.state.projectMedia6];
        for (let i = 0; i < 6; i++) 
        {
            storageRef = firebase.storage().ref(`/projectMedia/${this.state.userID}/${this.state.projectTitle}${uuid1}/${uuidv4()}`);
            console.log("Preject media " + (i+1) + "is " + projMedias[i]);
            if (projMedias[i] === null)
            {
                i++;
            } 
            else
            {
                storageRef.put(projMedias[i]);
                console.log("Successfuly put " + projMedias[i]);

                // Save reference to the project media to the state to be uplaoded to Firestore.
                console.log(storageRef);
                refArray[i + 1] = storageRef.location.path;
            }
        }

        //Create projectID
        let projectID = db.collection("projects").doc().id;

        // Activate the reducer
        let date = Date.now()
        let time = firebase.firestore.Timestamp.fromDate(new Date(date));
        this.setState({
            ...this.state,
            thumbnail: refArray[0],
            projectMedia1: refArray[1],
            projectMedia2: refArray[2],
            projectMedia3: refArray[3],
            projectMedia4: refArray[4],
            projectMedia5: refArray[5],
            projectMedia6: refArray[6],
            userID: this.props.auth.uid,
            projectID: projectID,
            timestamp: time,
        }, () => {
            console.log(this.state.thumbnail);
            this.props.createProject(this.state);
            console.log(this.state);
            this.props.history.push('/galleries');
        })
    }

    componentDidMount = () => {
        this.setState({
            ...this.state,
            userID: this.props.auth.uid
        })
    }

   


    render ()
    {
        //Route gaurding
        const { auth } = this.props;
		if (!auth) return <Redirect to='/login'/>
        
        const imgSrc = this.state.selectedFile;
        return (
            <div className="conatiner">
                <br/> <br/> <br/> 
                 <div className="loginInfo collection">
                    <form>
                        
                        <label htmlFor="projectTitle">Project Title</label>
                        <input type="text" name="projectTitle" id="projectTitle" onChange={this.handleChange} required=""/>
                        <label htmlFor="projectDescription">Project Description</label>
                        <input type="text" name="projectDescription"  id="projectDescription" onChange={this.handleChange} required/>
                    </form>
                </div>
                <div>
                <br/> <br/> 
                <input type="file" onChange={this.fileSelected} name="thumbnail" id="thumbnail"/>
                <br/> <br/> 
                <input type="file" onChange={this.fileSelected} name="projectMedia1" id="projectMedia1"/>
                <br/> <br/> 
                <input type="file" onChange={this.fileSelected} name="projectMedia2" id="projectMedia2"/>
                <br/> <br/> 
                <input type="file" onChange={this.fileSelected} name="projectMedia3" id="fprojectMedia"/>
                <br/> <br/> 
                <input type="file" onChange={this.fileSelected} name="projectMedia4" id="projectMedia4"/>
                <br/> <br/> 
                <input type="file" onChange={this.fileSelected} name="projectMedia5" id="projectMedia5"/>
                <br/> <br/> 
                <input type="file" onChange={this.fileSelected} name="projectMedia6" id="projectMedia6"/>
                </div>
                <span><img width="160" src={this.state.thumbnail}/></span>
                <span><img width="160" src={this.state.projectMedia1}/></span>
                <span><img width="160" src={this.state.projectMedia2}/></span>
                <br></br>
                <span><img width="160" src={this.state.projectMedia3}/></span>
                <span><img width="160" src={this.state.projectMedia4}/></span>
                <span><img width="160" src={this.state.projectMedia5}/></span>
                <span><img width="160" src={this.state.projectMedia6}/></span>
                <hr/>
                <h6 className="center">Add this project can appear in project searches</h6>
                <form>

                <label htmlFor="keyword1">Keyword</label>
                <input type="textArea" onChange={this.keywordChange} name="keyword1" id="keyword1"></input>

                <label htmlFor="keyword2">Keyword</label>
                <input type="textArea" onChange={this.keywordChange} name="keyword2" id="keyword2"></input>

                <label htmlFor="keyword3">Keyword</label>
                <input type="textArea" onChange={this.keywordChange} name="keyword3" id="keyword3"></input>

                <label htmlFor="keyword4">Keyword</label>
                <input type="textArea" onChange={this.keywordChange} name="keyword4" id="keyword4"></input>

                <label htmlFor="keyword5">Keyword</label>
                <input type="textArea" onChange={this.keywordChange} name="keyword5" id="keyword5"></input>

                <label htmlFor="keyword6">Keyword</label>
                <input type="textArea" onChange={this.keywordChange} name="keyword6" id="keyword6"></input>

                </form>

                <div>
                <button onClick={this.fileUpload}>Upload</button>
                <br/><br/>
                <progress value={this.state.uploadValue}/>
                </div>
                <br/><br/><br/><br/><br/><br/>
                
            </div>
            
        );
    }
}

const mapDispatchToProps = (dispatch) =>
{
    return{
        createProject: (project) => dispatch(createProject(project))
    }
}

const mapStateToProps = (state) => 
{
	return {
		authError: state.auth.authError,
		auth: state.firebase.auth
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProjUpload);
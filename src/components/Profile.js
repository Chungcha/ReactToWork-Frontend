
import React from 'react'
import ResultsContainer from '../containers/ResultsContainer'
import { FaUserAstronaut } from 'react-icons/fa'


class Profile extends React.Component {


render() {
return <div className="home-background-with-results App container-fluid" id="home">
    <div className ="col profile-info">
    </div>
    <div className="card profile-page">
        <h1 className="hero-text display-1 font-weight-bolder"><FaUserAstronaut /></h1>
        <div className="card profile-div-top">
            <div className="card-body">
                <h1 className="card-title">{this.props.user && this.props.user.username}</h1>
                <div className="row align-items-start profile-row"><strong>{"Email: "} </strong><span>&nbsp;</span>{this.props.user && `${this.props.user.email}`}</div>
                <div className="row profile-row profile-bio"><strong>{"Bio: "} </strong><span>&nbsp;</span>{this.props.user && this.props.user.bio}</div>
                <div className="row">
                    <div className="col text-center "><h2>Your Saved Jobs:</h2></div>
                </div>
            </div>
        </div>
        <ResultsContainer usersSavedJobs={this.props.usersSavedJobs} addToSavedJobs={this.props.addToSavedJobs} jobs={this.props.jobs}/>
        <div className="card profile-div-top">
            <div className="card-body"></div>
            <div className="row">
                <div className="col text-center "><h2>Your Posted Jobs:</h2></div>
            </div>
                {this.props.user && this.props.user.posts ? <ResultsContainer usersSavedJobs={this.props.usersSavedJobs} addToSavedJobs={this.props.addToSavedJobs} jobs={this.props.user.posts}/> : <h1>no posts</h1>}
            </div>
    </div>
</div>
    }
}

export default Profile
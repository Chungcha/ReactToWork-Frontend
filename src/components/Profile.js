
import React from 'react'
import ResultsContainer from '../containers/ResultsContainer'


class Profile extends React.Component {

render() {
return <div className="home-background-with-results App container-fluid" id="home">
      
<div className ="col profile-info">{this.props.user && `${this.props.user.username}`}</div>
<div className="card profile-page"><h1 className="hero-text display-1 font-weight-bolder">HI</h1></div>
     <ResultsContainer usersSavedJobs={this.props.usersSavedJobs} addToSavedJobs={this.props.addToSavedJobs} jobs={this.props.jobs}/>
      </div>
    }
}

export default Profile
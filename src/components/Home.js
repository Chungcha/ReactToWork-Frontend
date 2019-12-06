
import React from 'react'
import ResultsContainer from '../containers/ResultsContainer'
import Search from './Search'
import Loading from './Loading'


class Home extends React.Component {

render() {
return <div className={this.props.searchResults ? "home-background-with-results App container-fluid" : "home-background App container-fluid" } id="home">
        
      <Search path="/" searchResults={this.props.searchResults} includeRemote={this.props.includeRemote} setSearch={this.props.setSearch} submitSearch={this.props.submitSearch} setFromRemoteOK={this.props.setFromRemoteOK} currentUser={this.props.currentUser} toggleCreatePost={this.props.toggleCreatePost} /><Loading />
      {this.props.jobs.length>0 && <ResultsContainer usersSavedJobs={this.props.usersSavedJobs} addToSavedJobs={this.props.addToSavedJobs} jobs={this.props.jobs}/> }
      
      
      </div>
    }
}

export default Home
import React from 'react';

import './App.css';
import Search from './components/Search'
import Navigation from './components/Nav'
import ResultsContainer from './containers/ResultsContainer'
import {Router} from "@reach/router"

class App extends React.Component {
  
    state = {
      search: "",
      jobs: [],
      includeRemote:false,
      searchResults:false,
      loginInfo: {
        username: "",
        password: ""
      }
  }

  setSearch = (e) => {
      let search = e.target.value
      this.setState({search})
  }

  addJobsToState = (jobs) => {
      this.setState({jobs})
  }

  setFromRemoteOK = () => {
      console.log("attempting to include remote")
      this.setState(pre => {return {includeRemote: !pre.includeRemote}})
  }

  fetchFromIndex = () => {
      let city = this.state.search.split(" ").join("+")
      fetch(`http://localhost:3000/jobs?search=${city}`)
      .then(res=>res.json())
      .then(this.addJobsToState)
  }

  fetchFromStackOverFlow = () => {
      let city = this.state.search.split(" ").join("+")
      fetch(`http://localhost:3000/stackoverflowjobs?search=${city}`)
      .then(res=>res.json())
      .then(this.addJobsToState)
  }

  submitSearch = (e) => {
      this.setState({searchResults:true})
      e.preventDefault()
      if (this.state.includeRemote){
        this.fetchFromIndex()
      } else {
        this.fetchFromStackOverFlow() 
      }
  }

  handleLogin = (e) => {
    e.preventDefault()
    let loginObj={
      username:e.target.username.value,
      password:e.target.password.value
    }
    this.setState({
      loginInfo: loginObj
    })
    this.userLogin()
  }

  userLogin = () =>{
    console.log("Work in progress")
  }

  render() {
    return (
      <div className="home-container">
      <Navigation/>
      <div className={this.state.searchResults ? "home-background-with-results App container-fluid" : "home-background App container-fluid" } id="home">
      <Search searchResults={this.state.searchResults} includeRemote={this.state.includeRemote} setSearch={this.setSearch} submitSearch={this.submitSearch} setFromRemoteOK={this.setFromRemoteOK}/>
      <ResultsContainer jobs={this.state.jobs}/>
      {/* <Router>
        
      </Router> */}
      </div>
      </div>
    );
  }

}

export default App;

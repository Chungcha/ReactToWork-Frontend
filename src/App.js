import React from 'react';

import './App.css';
import Search from './components/Search'
import Navigation from './components/Nav'
import ResultsContainer from './containers/ResultsContainer'
import CreateAccount from './components/CreateAccount'
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
      },
      showCreateAccount: false,
      currentUser: null
  }
  
  componentDidMount(){
    if(localStorage.getItem("jwt")){
      fetch("http://localhost:3000/profile", {
        headers: {
          "Authorization" : localStorage.getItem("jwt")
        }
      })
      .then(response=>response.json())
      .then(user=>this.setState({currentUser: user}))
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
    }, this.userLogin(loginObj))
  }

  userLogin = (loginObj) =>{
    let objConfig ={
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
        "Accept": "Application/json"
      },
      body: JSON.stringify({
        user: loginObj
      })
    }
    fetch('http://localhost:3000/login', objConfig)
    .then(response=>response)
    .then(response=>response.json())
    .then(data=>console.log(data))
  }

  toggleCreateAccount = (boolean) => {
    this.setState({
      showCreateAccount: boolean
    })
  }

  createAccount = (e) => {
    e.preventDefault()
    if (e.target.password.value === e.target.confirmPassword.value) {
      let userInfo = {
        username: e.target.username.value,
        password: e.target.password.value,
        bio: e.target.bio.value,
        email: e.target.email.value,
        zipCode: e.target.zipCode.value,
        admin: false
      }
      fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          user: userInfo
        })
      })
        .then(r => r.json())
        .then(data=>{
          localStorage.setItem("jwt", data.jwt)
          this.setState({currentUser: data.user})
        })
          } else {
            alert("different password")
          }
  }

  render() {
    return (
      <div className="App" id="home">
      <Navigation handleLogin={this.handleLogin} toggleCreateAccount={this.toggleCreateAccount}/>
      <CreateAccount show={this.state.showCreateAccount} onHide={()=>{this.toggleCreateAccount(false)}} handleSubmit={this.createAccount}/>
      <Search includeRemote={this.state.includeRemote} setSearch={this.setSearch} submitSearch={this.submitSearch} setFromRemoteOK={this.setFromRemoteOK}/>
      <ResultsContainer jobs={this.state.jobs}/>
      </div>
    );
  }

}

export default App;

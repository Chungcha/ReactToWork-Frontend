import React from 'react';
import './App.css';
import Search from './components/Search'
import Navigation from './components/Nav'
import ResultsContainer from './containers/ResultsContainer'
import CreateAccount from './components/CreateAccount'

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
      .then(user=>this.updateUser(user))
    }
  }

  updateUser = (obj) => {
    this.setState({
      currentUser: obj
    })
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
    .then(response=>response.json())
    .then(data=>{
      localStorage.setItem("jwt", data.jwt)
      this.updateUser(data.user)
    })
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
          this.updateUser(data.user)
        })
          } else {
            alert("different passwords")
          }
  }

  logOut = () => {
    this.updateUser(null)
    localStorage.removeItem("jwt")
  }

  render() {
    return (
      <div className="home-container">
      <Navigation/>
      <div className={this.state.searchResults ? "home-background-with-results App container-fluid" : "home-background App container-fluid" } id="home">
      <Search searchResults={this.state.searchResults} includeRemote={this.state.includeRemote} setSearch={this.setSearch} submitSearch={this.submitSearch} setFromRemoteOK={this.setFromRemoteOK}/>
      {this.state.jobs.length>0 && <ResultsContainer jobs={this.state.jobs}/>}
      {/* <Router>
        
      </Router> */}
      {/* <div className="App" id="home">
      <Navigation handleLogin={this.handleLogin} toggleCreateAccount={this.toggleCreateAccount} currentUserState={this.state.currentUser} logOut={this.logOut}/>
      <CreateAccount show={this.state.showCreateAccount} onHide={()=>{this.toggleCreateAccount(false)}} handleSubmit={this.createAccount}/>
      <Search includeRemote={this.state.includeRemote} setSearch={this.setSearch} submitSearch={this.submitSearch} setFromRemoteOK={this.setFromRemoteOK}/>
      <ResultsContainer jobs={this.state.jobs}/>
      </div> */}
      </div>
      </div>
    );
  }

}

export default App;

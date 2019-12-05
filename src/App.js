import React from 'react';
import './App.css';
import Home from './components/Home'
import Navigation from './components/Nav'
import Profile from './components/Profile'
import CreatePost from "./components/CreatePost"
import CreateAccount from './components/CreateAccount'
import {Router} from '@reach/router'

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
      showCreatePost: false,
      currentUser: null,
      usersSavedJobs:[]
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
    },()=>this.updateSavedJobs(obj))
  }

  setSearch = (e) => {
      let search = e.target.value
      this.setState({search})
  }

  addJobsToState = (jobs) => {
      this.setState({jobs})
  }

  setFromRemoteOK = () => {
      
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
        this.setState({showCreateAccount:false})
  }

  logOut = () => {
    this.updateUser(null)
    localStorage.removeItem("jwt")
  }

  addToSavedJobs = (job,saved) => {
    if (!saved) {
    let data

    if (Array.isArray(job.category)){
      data = {
        job: {
        company: job.company,
        description: job.description,
        link: job.link,
        position:job.position,
        category:job.category.join(" "),
        zipCode:this.state.search,
        date:job.date}
      }
    } else {
      data = {
        job: {
        company: job.company,
        description: job.description,
        link: job.link,
        position:job.position,
        category:job.category,
        zipCode:this.state.search,
        date:job.date}
      }
    }

    let token = localStorage.jwt
     let objConfig ={
      method: "POST",
      headers: {
        "Save": true,
        "Authorization": token,
        "Content-Type": "Application/json",
        "Accept": "Application/json"
      },
      body: JSON.stringify(data)
    }
    fetch('http://localhost:3000/jobs', objConfig)
    .then(res=>res.json())
    .then(this.addSavedJobToState)
    } else {
      

    }
  }

  addSavedJobToState = (job) => {
    if (job.category){
    job.category = job.category.split(" ")
    
    this.setState({usersSavedJobs:this.state.usersSavedJobs.concat(job)})
    }
  }

  updateSavedJobs = (userObj) => {
    if (this.state.currentUser) {
    let usersSavedJobs = userObj.jobs.map(job=>{
      if (job.category) {
      job.category = job.category.split(" ")
      return job
    }})
    this.setState({usersSavedJobs})
    }
  }
  
  toggleCreatePost = (boolean) => {
    this.setState({
      showCreatePost: boolean
    })
  }

  createAPost = () => {
    // let objConfig ={
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "Application/json",
    //     "Accept": "Application/json"
    //   },
    //   body: JSON.stringify({
    //     user: {}
    //   })
    // }
    // fetch('http://localhost:3000/jobs', objConfig)
  }

  render() {
    return (

      <div className="home-container">
      <Navigation handleLogin={this.handleLogin} toggleCreateAccount={this.toggleCreateAccount} currentUserState={this.state.currentUser} logOut={this.logOut}/>

      {!this.state.currentUser && <CreateAccount show={this.state.showCreateAccount} onHide={()=>{this.toggleCreateAccount(false)}} handleSubmit={this.createAccount}/>}

      <CreatePost show={this.state.showCreatePost} onHide={()=>{this.toggleCreatePost(false)}}/>

      <Router>

      <Home path="/" usersSavedJobs={this.state.usersSavedJobs} searchResults={this.state.searchResults} includeRemote={this.state.includeRemote} setSearch={this.setSearch} submitSearch={this.submitSearch} setFromRemoteOK={this.setFromRemoteOK} addToSavedJobs={this.addToSavedJobs} jobs={this.state.jobs} currentUser={this.state.currentUser} toggleCreatePost={this.toggleCreatePost}/>
    

      <Profile path="/profile" user={this.state.currentUser}/>

      </Router>
      
      
    
      </div>


    );
  }

}

export default App;

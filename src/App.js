import React from 'react';
import './App.css';
import Home from './components/Home'
import Navigation from './components/Nav'
import Profile from './components/Profile'
import CreatePost from "./components/CreatePost"
import CreateAccount from './components/CreateAccount'
import {Router,navigate} from '@reach/router'
import FourOFour from './components/404'
import Swal from 'sweetalert2'
import {trackPromise} from 'react-promise-tracker'
// import Loading from './components/Loading'


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
      usersSavedJobs:[],
      usersSaves:[],
      createPostInfo: {
        company: "",
        position: "",
        description: "",
        link: "",
        zipCode: "",
        categories: ""
      }
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
    this.setState({jobs:[]})
      let city = this.state.search.split(" ").join("+")
    trackPromise(
      fetch(`http://localhost:3000/jobs?search=${city}`))
      .then(res=>res.json())
      .then(this.addJobsToState)
  }

  fetchFromStackOverFlow = () => {
    this.setState({jobs:[]})
      let city = this.state.search.split(" ").join("+")
      trackPromise(fetch(`http://localhost:3000/stackoverflowjobs?search=${city}`))
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
    this.setState({usersSavedJobs:[],
      usersSaves:[]})
    localStorage.removeItem("jwt")
    navigate("/")
  }

  addToSavedJobs = (job,saved) => {
  if (this.state.currentUser) {
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
      
      let newJob = this.state.usersSavedJobs.find(savedJob=>savedJob.link === job.link)
      let save = this.state.usersSaves.find(save=>save.job_id===newJob.id)
      
      fetch(`http://localhost:3000/saves/${save.id}`,{
        method: "DELETE", 
        headers: {
          "Authorization":localStorage.jwt,
          "Content-Type":"Applicaiton/json",
          "Accept":"Application/json"
        }
        }

      ).then(res=>res.json())
      .then(()=>this.removeFromSaved(job,save))

    }
  }else{
    alert("You need to log in to do that!")
  }
  }

  removeFromSaved = (job,save) => {
    let newSaves = [...this.state.usersSavedJobs]
    let splicer = newSaves.findIndex(savedJob=>savedJob.link===job.link)
    newSaves.splice(splicer,1)
    this.setState({usersSavedJobs:newSaves})

    let usersSaves = [...this.state.usersSaves]
    let index = usersSaves.findIndex(s=>s===save)
    usersSaves.splice(index,1)
    this.setState({usersSaves})
  } 

  addSavedJobToState = (job) => {
   
    if (job.job.category){
    job.job.category = job.job.category.split(" ")
    
      let usersSaves = [...this.state.usersSaves, job["save"]]
      

    this.setState({usersSavedJobs:this.state.usersSavedJobs.concat(job.job)})
    this.setState({usersSaves})
    }
  }

  updateSavedJobs = (userObj) => {
    let usersSaves
    if (this.state.currentUser) {
      if(userObj.saves) {
     usersSaves = userObj.saves 
      }
    let usersSavedJobs = userObj.jobs.map(job=>{
      if (job.category) {
      job.category = job.category.split(" ")
      return job
    }})
    this.setState({usersSavedJobs,usersSaves})
    }
  }
  
  toggleCreatePost = (boolean) => {
    this.setState({
      showCreatePost: boolean
    })
  }

  updatePostFormState = (event) => {
    this.setState({
      createPostInfo: {...this.state.createPostInfo, [event.target.name] : event.target.value}
    })
  }
  

  submitAPost = (e) => {
    debugger
    e.preventDefault()
    let objConfig ={
      method: "POST",
      headers: {
        "Save": false,
        "Authorization": localStorage.jwt,
        "Content-Type": "Application/json",
        "Accept": "Application/json"
      },
      body: JSON.stringify({
        job: this.state.createPostInfo
      })
    }
    fetch('http://localhost:3000/jobs', objConfig)
    .then(response=>response.json())
    .then(data=>{
      Swal.fire({
        title: 'Successful Posting',
        text: 'Do you want to continue',
        icon: 'success',
        confirmButtonText: 'Cool'
      })
      this.toggleCreatePost(false)
      this.setState({createPostInfo: {
        company: "",
        position: "",
        description: "",
        link: "",
        zipCode: "",
        categories: ""}})
        // This can definitely be done better
      this.setState({currentUser: {...this.state.currentUser, ["posts"]: [...this.state.currentUser["posts"], data]}})})
  
  }

  render() {

    return (

      <div className="home-container">
      <Navigation handleLogin={this.handleLogin} toggleCreateAccount={this.toggleCreateAccount} currentUserState={this.state.currentUser} logOut={this.logOut}/>

      {!this.state.currentUser && <CreateAccount show={this.state.showCreateAccount} onHide={()=>{this.toggleCreateAccount(false)}} handleSubmit={this.createAccount}/>}

      <CreatePost show={this.state.showCreatePost} onHide={()=>{this.toggleCreatePost(false)}} updatePostFormState={this.updatePostFormState} formState={this.state.createPostInfo} submitAPost={this.submitAPost}/>
      {/* <Loading/> */}
      <Router>

      <Home path="/" usersSavedJobs={this.state.usersSavedJobs} searchResults={this.state.searchResults} includeRemote={this.state.includeRemote} setSearch={this.setSearch} submitSearch={this.submitSearch} setFromRemoteOK={this.setFromRemoteOK} addToSavedJobs={this.addToSavedJobs} jobs={this.state.jobs} currentUser={this.state.currentUser} toggleCreatePost={this.toggleCreatePost}/>
    
      <FourOFour default />

      <Profile path="/profile" user={this.state.currentUser} usersSavedJobs={this.state.usersSavedJobs} jobs={this.state.usersSavedJobs} addToSavedJobs={this.addToSavedJobs}/>

      </Router>
      
    
    
      </div>


    );
  }

}

export default App;

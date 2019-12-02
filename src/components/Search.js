import React from 'react'

class Search extends React.Component {

    state = {
        search: "",
        jobs: [],
        includeRemote:false
    }

    setSearch = (e) => {
        let search = e.target.value
        this.setState({search})
    }

    addJobsToState = (json) => {

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
        fetch(`http://localhost:3000/StackOverFlowJobs`)
        .then(res=>res.json())
        .then(this.addJobsToState)
    }

    submitSearch = (e) => {
        e.preventDefault()
        if (this.state.includeRemote){
          this.fetchFromStackOverFlow()
        } else {
            this.fetchFromIndex()
        }
    }

    render() {
        return <div>
            <form onSubmit={this.submitSearch}>
            <label htmlFor='search'></label>
            <input type='text' onChange={this.setSearch}></input>
            <label htmlFor='RemoteOK'></label>
            <input type='checkbox' name="RemoteOK" defaultChecked={this.state.includeRemote} onChange={this.setFromRemoteOK}></input>
            <input type='submit'></input>
            </form>
        </div>
    }

}

export default Search
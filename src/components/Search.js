import React from 'react'

class Search extends React.Component {

    state = {
        search: "",
        jobs: []
    }

    setSearch = (e) => {
        let search = e.target.value
        this.setState({search})
    }

    submitSearch = (e) => {
        e.preventDefault()
        let city = this.state.search.split(" ").join("+")
        console.log(city)
        fetch(`http://localhost:3000/jobs?search=${city}`)
        .then(res=>res.json())
        .then(console.log)
    }

    render() {
        return <div>
            <form onSubmit={this.submitSearch}>
            <label htmlFor='search'></label>
            <input type='text' onChange={this.setSearch}></input>
            <input type='submit'></input>
            </form>
        </div>
    }

}

export default Search
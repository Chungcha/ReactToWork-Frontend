import React from 'react'

class Search extends React.Component {


    render() {
        return <div className="landing-text">
            <form onSubmit={this.props.submitSearch}>
            <label htmlFor='search'></label>
            <input type='text' onChange={this.props.setSearch}></input>
            <br></br>
            <label htmlFor='RemoteOK'> Remote OK? </label>
            <input type='checkbox' name="RemoteOK" defaultChecked={this.props.includeRemote} onChange={this.props.setFromRemoteOK}></input>
            <br></br>
            <input type='submit' className='btn btn-primary' value='Search'></input>
            </form>
        </div>
    }

}

export default Search
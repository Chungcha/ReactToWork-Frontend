import React from 'react'

class Search extends React.Component {


    render() {
        return <div>
            <form onSubmit={this.props.submitSearch}>
            <label htmlFor='search'></label>
            <input type='text' onChange={this.props.setSearch}></input>
            <label htmlFor='RemoteOK'></label>
            <input type='checkbox' name="RemoteOK" defaultChecked={this.props.includeRemote} onChange={this.props.setFromRemoteOK}></input>
            <input type='submit'></input>
            </form>
        </div>
    }

}

export default Search
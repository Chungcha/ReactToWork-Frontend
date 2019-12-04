import React from 'react'


class Search extends React.Component {


    render() {
        return <div className={this.props.searchResults ? `landing-text-with-results row` : `landing-text row`}>
                <div className="col"><h1 className="hero-text display-1 font-weight-bolder">{"<"}ReactToWork{"/>"}</h1>
                    <form onSubmit={this.props.submitSearch}>
                        <label htmlFor='search'></label>
                        <input type='text' placeholder="Enter a Zip for Jobs Near You" className='search-input' onChange={this.props.setSearch}></input>
                        <br></br>
                        <label htmlFor='RemoteOK'> Remote OK? </label>
                        <input className="checkbox" type='checkbox' name="RemoteOK" defaultChecked={this.props.includeRemote} onChange={this.props.setFromRemoteOK}></input>
                        <br></br>
                        <input type='submit' className='btn btn-primary' value='Search'></input>
                    </form>
                </div>
        </div>
    }

}

export default Search
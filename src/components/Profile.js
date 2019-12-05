
import React from 'react'


class Profile extends React.Component {

render() {
return <div className={this.props.searchResults ? "home-background-with-results App container-fluid" : "home-background App container-fluid" } id="home">
      <div className="container">
          <div className ="row">
<div className ="col profile-info">{this.props.user && `${this.props.user.username}`}</div>
          </div>
      </div>
      
      </div>
    }
}

export default Profile
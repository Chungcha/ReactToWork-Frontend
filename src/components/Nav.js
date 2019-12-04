import React from 'react'
import Login from "./Login"

class Navigation extends React.Component {

  constructor(){
    super()
    this.state={
      showLogin:false
    }
  }

  toggleLogin = () => {
    this.setState({
      showLogin: !this.state.showLogin
    })
  }

    render() {
        return <div>
              <nav className="navbar fixed-top navbar-expand-sm navbar-light bg-light">
                 
    <a href="/" className="navbar-brand">{"<"}ReactToWork{"/>"}</a>

    <div className="collapse navbar-collapse">
      <ul className="navbar-nav ml-auto">
      <li className="nav-item">
          {/* <a href="/CreateAccount" className="nav-link">Create Account</a> */}
          <button className="nav-link" onClick={()=>this.props.toggleCreateAccount(true)}>Create Account</button>
        </li>
        <li className="nav-item">
          {/* <a class="nav-link">Login</a> */}
          <button className="nav-item" onClick={this.toggleLogin}>Login</button>
          {this.state.showLogin ? <Login handleLogin={this.props.handleLogin}/> : null}
        </li>

      </ul>
    </div>
  </nav>
        </div>
    }

}

export default Navigation

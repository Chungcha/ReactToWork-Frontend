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
    {this.props.currentUserState ? <p>SUP {this.props.currentUserState.username} <span onClick={this.props.logOut}>LogOut</span></p> : <button className="nav-link" onClick={()=>this.props.toggleCreateAccount(true)}>Create Account</button>}
        </li>
        <li className="nav-item">
          {/* <a class="nav-link">Login</a> */}
          <a className="nav-link" onClick={this.toggleLogin}>{this.state.showLogin ? "Hide Login" : "Login"}</a>
          {/* {this.props.currentUserState ? null : <button className="nav-item" onClick={this.toggleLogin}>Login</button>}
          {this.state.showLogin ? <Login handleLogin={this.props.handleLogin}/> : null} */}
        </li>
        {this.state.showLogin ? <Login handleLogin={this.props.handleLogin}/> : null}

      </ul>
    </div>
  </nav>
        </div>
    }

}

export default Navigation



import React from 'react'

class Navigation extends React.Component {


    render() {
        return <div>
              <nav class="navbar fixed-top navbar-expand-sm navbar-light bg-light">
                 
    <a href="/" class="navbar-brand">{"<"}ReactToWork{"/>"}</a>

    <div class="collapse navbar-collapse">
      <ul class="navbar-nav ml-auto">
      <li class="nav-item">
          <a href="/CreateAccount" class="nav-link">Create Account</a>
        </li>
        <li class="nav-item">
          <a href="/login" class="nav-link">Login</a>
        </li>

      </ul>
    </div>
  </nav>
        </div>
    }

}

export default Navigation

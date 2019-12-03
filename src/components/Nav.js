
import {FaCode} from 'react-icons/fa';
import React from 'react'

class Navigation extends React.Component {


    render() {
        return <div>
              <nav class="navbar fixed-top navbar-expand-sm navbar-light bg-light">
                  <div className="code-icon">
                  <FaCode/>
                  </div>
    <a href="/" class="navbar-brand">ReactToWork</a>

    <div class="collapse navbar-collapse">
      <ul class="navbar-nav ml-auto">
        <li>
          <a href="/" class="nav-link">Search</a>
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

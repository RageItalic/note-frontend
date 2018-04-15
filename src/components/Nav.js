import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import axios from 'axios';

axios.defaults.withCredentials = true;

class Nav extends Component {
  state = {
    loggedIn: false
  }

  componentDidMount() {
    document.addEventListener('DOMContentLoaded', function () {

      // Get all "navbar-burger" elements
      var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

      // Check if there are any navbar burgers
      if ($navbarBurgers.length > 0) {

        // Add a click event on each of them
        $navbarBurgers.forEach(function ($el) {
          $el.addEventListener('click', function () {

            // Get the target from the "data-target" attribute
            var target = $el.dataset.target;
            var $target = document.getElementById(target);

            // Toggle the class on both the "navbar-burger" and the "navbar-menu"
            $el.classList.toggle('is-active');
            $target.classList.toggle('is-active');

          });
        });
      }
    });

    if(localStorage.getItem('userData')) {
      this.setState({
        loggedIn: true
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log("FROM LOGOUT?")
    console.log("PORPOSPOSPOS, ", this.props)
    console.log("NEXT PORPS", nextProps)
    //if(this.props.fromLogin === true) {
      if (nextProps.shouldUpdate === true) {
        this.setState({
          loggedIn: nextProps.shouldUpdate
        })
      }
    //}
  }

  handleLogout = () => {
    alert("triggered")
    axios.get('https://mysterious-earth-91528.herokuapp.com/users/logout')
      .then(response => {
        console.log("logout, ", response)
        if (response.status === 200) {
          localStorage.setItem('userData', '')
          localStorage.clear()
          this.setState({
            loggedIn: false
          })
          this.props.updateNav(false)
          this.props.history.push('/')
        }
      })
  }

  render() {
    const {loggedIn} = this.state;
    console.log("state in nav buddyÿ", this.state)

    return (
      <nav className="navbar">
        <div className="navbar-brand">
          <h3 className="navbar-item">
            <Link to="/" className="link"><strong>Note</strong></Link>
          </h3>
          <div className="navbar-item">
            <div className="field">
              <p className="control">
                <Link className="button" to="/find">
                  <span className="icon">
                    <i className="fas fa-search"></i>
                  </span>
                  <span>Find</span>
                </Link>
              </p>
            </div>
          </div>
          <div className="navbar-burger burger" data-target="navbarExampleTransparentExample">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div id="navbarExampleTransparentExample" className="navbar-menu">
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="field is-grouped">
                <p className="control">
                  <Link className="navbar-item" to="/note">
                    Make a Note
                  </Link>
                </p>
                {loggedIn === true &&
                  <p className="control">
                    <Link className="navbar-item" to="/your-notes">
                      Your Notes
                    </Link>
                  </p>
                }
                {loggedIn === true &&
                  <p className="control">
                    <a className="navbar-item" onClick={this.handleLogout}>
                      Logout
                    </a>
                  </p>
                }
              </div>
            </div>
          </div>
        </div>
      </nav>

    )
  }
}

export default withRouter(Nav);
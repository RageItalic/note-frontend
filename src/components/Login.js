import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';

axios.defaults.withCredentials = true;

class Login extends Component {
  state = {
    email: '',
    password: '',
    redirect: false
  }

  handleEmailChange = (event) => {
    this.setState({
      email: event.target.value
    })
  }

  handlePassChange = (event) => {
    this.setState({
      password: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const {email, password} = this.state;
    const {updateNav} = this.props;
    alert("axios post now, check console.")
    axios.post("https://mysterious-earth-91528.herokuapp.com/users/login", {
      email,
      password
    }).then(response => {
      console.log("login response data", response.data)
      if (response.data.name) {
        localStorage.setItem('userData',JSON.stringify(response.data))
        this.setState({
          redirect: true
        })
        updateNav(true)
      } else {
        console.log("ERORR LOL")
      }
    })


  }

  render() {
    const {email, password, redirect} = this.state;

    if (redirect || localStorage.getItem('userData')) {
      return (
        <Redirect to="/note" />
      )
    }

    return (
      <div>
        <section className="section">
          <div className="container">
            <h1 className="title">
              Login to Start Taking and Viewing Notes.
            </h1>
            <p className="subtitle">
              Not signed up? Sign up <Link to="/signup">here.</Link>
            </p>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <div className="columns is-mobile is-centered">
              <div className="column is-one-quarter-desktop is-two-thirds-mobile is-two-thirds-tablet is-narrow">
                <form onSubmit={this.handleSubmit}>
                  <div className="field">
                    <p className="control has-icons-left has-icons-right">
                      <input
                        className="input"
                        type="email"
                        placeholder="Email"
                        onChange={this.handleEmailChange}
                        value={email}
                        required />
                      <span className="icon is-small is-left">
                        <i className="fa fa-envelope"></i>
                      </span>
                    </p>
                  </div>
                  <div className="field">
                    <p className="control has-icons-left">
                      <input
                        className="input"
                        type="password"
                        placeholder="Password"
                        onChange={this.handlePassChange}
                        value={password}
                        required />
                      <span className="icon is-small is-left">
                        <i className="fa fa-lock"></i>
                      </span>
                    </p>
                  </div>
                  <div className="field is-grouped is-grouped-right">
                    <p className="control">
                      <input className="button" type="submit">
                      </input>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default Login
import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';

class Signup extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    error: false,
    redirect: false, //true,
    //paramError: false
  }

  // componentWillMount() {
  //   console.log("props", window.location.search.substring(1))
  //   var query = window.location.search.substring(1);
  //   var params = query.split('&');
  //   const paramArray = params.map(param => param.split('=')[1])
  //   if(paramArray[0] && paramArray[1] === 'parthpatelgee@gmail.com') {
  //     if(paramArray[0] === true) {
  //       this.setState({
  //         redirect: false
  //       })
  //     }
  //   } else {
  //     this.setState({
  //       paramError: true
  //     })
  //   }
  // }

  handleNameChange = (event) => {
    this.setState({name: event.target.value})
  }

  handleEmailChange = (event) => {
    this.setState({email: event.target.value})
  }

  handlePasswordChange = (event) => {
    this.setState({password: event.target.value})
  }

  handleConfirmPassChange = (event) => {
    this.setState({confirmPassword: event.target.value})
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const {name, email, password, confirmPassword} = this.state
    if (password !== confirmPassword) {
      this.setState({error: true});
      alert("ERROR")
    } else {
      alert("post to server here.")
      axios.post("https://mysterious-earth-91528.herokuapp.com/users/signup", {
        name,
        email,
        confirmPassword
      }).then(response => {
        console.log('signup response data', response.data)
        if (response.data.name) {
          localStorage.setItem('userData',JSON.stringify(response.data))
          this.setState({
            redirect: true
          })
        } else {
          console.log("ERORR LOL")
        }
      })
    }

  }

  render() {
    const {name, email, password, confirmPassword, error, redirect, /*paramError*/} = this.state;

    if(redirect === true || localStorage.getItem('userData')) {
      return (<Redirect to="/note" />)
    }

    // if(paramError) {
    //   return <Error />
    // }

    return (
      <div>
        <section className="section">
          <div className="container">
            <h1 className="title">
              Sign up here to Start Taking and Viewing Notes.
            </h1>
            <p className="subtitle">
              Already signed up? Log in <Link to="/login">here.</Link>
            </p>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <div className="columns is-mobile is-centered">
              <div className="column is-one-quarter-desktop is-two-thirds-mobile is-two-thirds-tablet is-narrow">
                <form onSubmit={this.handleSubmit}>
                  <div className="field">
                    <div className="control has-icons-left">
                      <input
                        className="input"
                        type="text"
                        placeholder="Full Name"
                        onChange={this.handleNameChange}
                        value={name}
                        required />
                      <span className="icon is-small is-left">
                        <i className="fa fa-user"></i>
                      </span>
                    </div>
                  </div>
                  <div className="field">
                    <p className="control has-icons-left">
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
                        onChange={this.handlePasswordChange}
                        value={password}
                        required />
                      <span className="icon is-small is-left">
                        <i className="fa fa-lock"></i>
                      </span>
                    </p>
                  </div>
                  <div className="field">
                    <p className="control has-icons-left">
                      <input
                        className="input"
                        type="password"
                        placeholder="Confirm Password"
                        onChange={this.handleConfirmPassChange}
                        value={confirmPassword}
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
                {error &&
                  <h1>PASSWORDS NO MATCH</h1>
                }
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

// function Error() {
//   return (
//     <section className="section">
//       <div className="container has-text-centered">
//         <br />
//         <br />
//         <br />
//         <br />
//         <br />
//         <br />
//         <h1>乁( ⁰͡ Ĺ̯ ⁰͡ )ㄏ</h1>
//         <h1>Who are you?</h1>
//       </div>
//     </section>
//   )
// }

export default Signup;
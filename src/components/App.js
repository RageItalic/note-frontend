import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  //Redirect
} from 'react-router-dom'
// axios from 'axios'
import Nav from './Nav'
import Home from './Home'
import Note from './Note'
import Find from './Find'
import OneNote from './OneNote'
import Signup from './Signup'
import Login from './Login'
import YourNotes from './YourNotes'


class App extends Component {
  state = {
    navBool: null
  }

  updateNav = (bool) => {
    console.log("BOOL IS HERE", bool)
    this.setState({
      navBool: bool
    })
  }

  render() {
    const {navBool} = this.state;

    return (
      <Router>
        <div>
          <Nav shouldUpdate={navBool} updateNav={this.updateNav}/>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/note" component={Note} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" render={(props, updateNav) => <Login {...props} updateNav={this.updateNav} />} />
            <Route path="/find" component={Find} />
            <Route path="/your-notes" component={YourNotes} />
            <Route path="/note/:id" component={OneNote} />
            <Route render={() => <h1 style={{textAlign: 'center'}}>Chaarso Chaar</h1>} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;

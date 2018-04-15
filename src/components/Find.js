import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Find extends Component {
  state = {
    email: '',
    submitted: false,
    notes: null
  }

  handleChange = (event) => {
    this.setState({
      email: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const {email} = this.state;
    axios.get(`https://mysterious-earth-91528.herokuapp.com/users/${email}`)
      .then(response => {
        this.setState({
          submitted: true,
          notes: response.data
        })
      })
  }

  resetState = () => {
    this.setState({
      email: '',
      submitted: false,
      notes: null
    })
  }

  render() {
    const {email, notes, submitted} = this.state;
    console.log("notes, ", this.state)
    return (
      <section className="section">
        <div className="container has-text-centered">
          <h1>Find Your Notes.</h1>
          <div className="columns is-centered">
            <div className="column">

              {!notes && submitted === false &&
                <div className="field has-addons has-addons-centered">
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      placeholder="Your Email"
                      onChange={this.handleChange}
                      value={email}/>
                  </div>
                  <div className="control">
                    <a
                      className="button"
                      onClick={this.handleSubmit}>
                      Find
                    </a>
                  </div>
                </div>
              }

              {notes && submitted === true &&
                <div className="columns is-centered">
                  <div className="column is-6">
                    <a className="button" onClick={this.resetState}>Find Other Notes.</a>
                    <br />
                    <br />
                    {notes.map(note => {
                      return (
                        <Note
                          key={note.id}
                          note={note}/>
                      )
                    })}
                  </div>
                </div>
              }


            </div>
          </div>

        </div>
      </section>
    )
  }
}

function Note({note}) {
  return (
    <div>
    <div className="card">
      <div className="card-content">
        <p className="title">
          {note.title}
        </p>
        <p className="subtitle">
          {note.email}
        </p>
      </div>
      <footer className="card-footer">
        <p className="card-footer-item">
          <span>
            <Link to={`/note/${note.id}`}>View</Link>
          </span>
        </p>
      </footer>
    </div>
    <br />
    </div>
  )
}

export default Find;
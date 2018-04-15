import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

class Note extends Component {
  state = {
    title: '',
    email: '',
    content: '',
    submitted: false,
    note: null,
    redirect: true
  }

  handleTitleChange = (event) => {
    this.setState({title: event.target.value})
  }

  handleEmailChange = (event) => {
    this.setState({email: event.target.value})
  }

  handleContentChange = (event) => {
    this.setState({content: event.target.value})
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const {title, email, content} = this.state;

    console.log(this.state)
    axios.post('https://mysterious-earth-91528.herokuapp.com/notes/save', {
      title,
      email,
      content
    })
    .then(response => {
      console.log(response);
      if(response.status === 200) {
        this.setState({
          submitted: true,
          note: response.data
        })
      }
    })
    .catch(error => {
      console.log(error);
    });
  }

  componentWillMount() {
    if(localStorage.getItem('userData')) {
      this.setState({
        redirect: false
      })
    }
  }


  render() {
    const {title, email, content, submitted, note, redirect} = this.state;

    if (redirect === true) {
      return (<Redirect to="/login" />)
    }

    return (
      <section className="section">
        <div className="container has-text-centered">
          <h1>Make a Note.</h1>
          <div className="columns is-centered">
            <div className="column is-6">
              <form onSubmit={this.handleSubmit}>
                <div className="field">
                  <p className="control has-icons-left has-icons-right">
                    <input
                      className="input"
                      type="email"
                      placeholder="Email... Needed to save and access your notes"
                      onChange={this.handleEmailChange}
                      value={email}
                      required />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input"
                      type="text"
                      placeholder="Title"
                      onChange={this.handleTitleChange}
                      value={title}
                      required />
                    <span className="icon is-small is-left">
                      <i className="fas fa-heading"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <div className="control" style={{height: '307px'}}>
                    <textarea
                      className="textarea"
                      placeholder="Textarea"
                      style={{height: '307px'}}
                      onChange={this.handleContentChange}
                      value={content}>
                    </textarea>
                  </div>
                </div>
                <div className="field is-grouped is-grouped-right">
                  <p className="control">
                    <input className="button" type="submit" />
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>

        {submitted === true && (
          <Redirect to={`/note/${note[0].id}`} />
        )}

      </section>
    );
  }
}

export default Note;

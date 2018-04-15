import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';


class Note extends Component {
  state = {
    email: '',
    title: '',
    content: '',
    loading: true,
    error: false,
    redirect: true
  }

  componentWillMount() {
    if (localStorage.getItem('userData')) {
      this.setState({
        redirect: false
      })
    }
  }

  componentDidMount() {
    axios.get(`https://mysterious-earth-91528.herokuapp.com/notes/${this.props.match.params.id}`)
      .then(note => {
        console.log("note from db", note)
        if (note.data.length > 0) {
          this.setState({
            loading: false,
            email: note.data[0].email,
            title: note.data[0].title,
            content: note.data[0].content
          })
        } else if (note.data.length === 0) {
          this.setState({
            loading: false,
            error: true
          })
        }
      })
  }

  render() {
    const {loading, email, title, content, error, redirect} = this.state;

    if (redirect === true) {
      return (<Redirect to="/login" />)
    }

    if (loading === true) {
      return (
        <section className="section">
          <div className="container has-text-centered">
            <h1>Loading...</h1>
          </div>
        </section>
      )
    } else if (loading === false && error === false) {
      return (
        <section className="section" id="sectioN">
          <div className="container has-text-centered">
            <h1>{title}</h1><p>by {email}</p>
            <br />
            <p className="content">{content}</p>
          </div>
        </section>
      )
    } else if (loading === false && error === true) {
      return (
        <section className="section">
          <div className="container has-text-centered">
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <h1>乁( ⁰͡ Ĺ̯ ⁰͡ )ㄏ</h1>
            <h1>This Note Does Not Exist.</h1>
          </div>
        </section>
      )
    }
  }
}

export default Note;
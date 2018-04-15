import React,{Component} from 'react'
import {Redirect, Link} from 'react-router-dom'
import axios from 'axios'

axios.defaults.withCredentials = true;

class YourNotes extends Component {
  state = {
    notes: null,
    error: false,
    redirect: true,
    loading: true
  }

  componentWillMount() {
    if (localStorage.getItem('userData')) {
      this.setState({
        redirect: false
      })
      //const userData = localStorage.getItem('userData');
      // axios.get(`http://localhost:5000/users/personNotes/${JSON.parse(userData).email}`, {
      //   credentials: 'same-origin'
      // })
      //   .then(response => console.log("response is here, ", response))
      //   .catch(err => console.log("error is here, ", err))

      // axios(`http://localhost:5000/users/personNotes/${JSON.parse(userData).email}`, {
      //   method: "get",
      //   withCredentials: true
      // })
      // .then(response => console.log("response is here, ", response))
      // .catch(err => console.log("error is here, ", err))
    }
  }

  componentDidMount() {
    if (localStorage.getItem('userData')) {
      const userData = localStorage.getItem('userData');
      console.log("DATA, ", JSON.parse(userData).email)
      axios.get(`https://mysterious-earth-91528.herokuapp.com/users/personNotes/${JSON.parse(userData).email}`)
        .then(response => {
          console.log("YOUR NOTES, ", response)
          this.setState({
            loading: false,
            notes: response.data,
            //redirect: false
          })
        })
        .catch(err => {
          console.log("ERORRORO, ", err)
          this.setState({
            //redirect: false,
            loading: false,
            error: true
          })
        })
    }
  }

  render() {
    const {notes, error, redirect, loading} = this.state;

    if (redirect === true) {
      return (<Redirect to="/login" />)
    }

    if(error === true) {
      return (<h1 style={{textAlign: 'center'}}>There was an error. Please log out and log in again.</h1>)
    }

    return (
      <section className="section">
        <div className="container has-text-centered">
          <h1>Your Notes</h1>
          <br />
          <ul style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
            {notes &&
              notes.map(note => {
                return (
                  <li key={note.id} style={{margin: '20px'}}>
                    <Note  note={note}/>
                  </li>
                )
              })
            }
          </ul>
          {notes === null && loading === true &&
            <h1>Loading...</h1>
          }
          {notes === null && loading === false &&
            <h1>You dont have any notes, try <Link to="/note">making some</Link> first.</h1>
          }
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

export default YourNotes;
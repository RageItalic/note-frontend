import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Typist from 'react-typist';

class Home extends Component {
  render() {
    return (
      <section className="section">
        <div className="container has-text-centered">
          <div className="columns is-vcentered">
            <div className="column">
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <h1>Note.</h1>
              <Link to="/note" className="button">
                <Typist>
                  <Typist.Delay ms={2000} />
                  Make a Note.
                </Typist>
              </Link>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Home;
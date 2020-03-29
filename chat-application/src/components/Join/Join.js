import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Join.css";

const Join = () => {
  const [username, setName] = useState('');

  return (
    <section id="cover" className="min-vh-100">
      <div id="cover-caption">
        <div className="container">
          <div className="row text-white">
            <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4">
              <h1 className="display-4 py-2 text-truncate">Enter Username</h1>
              <div className="px-2">
                <div className="justify-content-center">
                  <div className="form-group">
                    <label className="sr-only">Name</label>
                    <input className="form-control" type="text" placeholder="Username" onChange={event => setName(event.target.value)} />
                  </div>
                  <Link onClick={event => !username ? event.preventDefault() : null} to={{pathname: "/chat", search: `?username=${username}`}}>
                    <button type="submit" className="btn btn-primary btn-lg">
                      Submit
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Join;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Join.css";

const Join = () => {
  const [username, setName] = useState('');
  const room = "Default";

  return (
    <section id="cover" className="min-vh-100">
      <div id="cover-caption">
        <div className="container">
          <div className="row text-white">
            <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4">
              <h1 className="display-4 py-1 text-truncate">Enter Username</h1>
              <div className="px-2">
                <div className="justify-content-center">
                  <Link onClick={event => !username ? event.preventDefault() : null} to={{pathname: "/chatroom", search: `?username=${username}`}}>
                    <form className="form-group" id="join-form">
                      <div className="form-group">
                        <input className="form-control" type="text" placeholder="Username" onChange={event => setName(event.target.value)} />
                      </div>
                      <button type="submit" className="btn btn-primary btn-lg full-width">Submit</button>
                    </form>
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

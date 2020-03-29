import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";

import "./Login.css";

// const port = process.env.port || 5000;
// const endpoint = `http://localhost:5000/user/login`; -> LOCAL ENDPOINT
// const endpoint = 'https://chat-application-backend.herokuapp.com/';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [condition, setCondition] = useState(Boolean);

  const handleSubmit = event => {
    console.log(`${username} - ${password}`);
    event.preventDefault();
    axios
      .post("http://localhost:5000/user/login", { username: username, password: password }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        console.log(res);
      });
  };

  useEffect(() => {
    // setCondition((username == "admin" && password == "password"))
  });

  return (
    <section id="loginCover" className="min-vh-100">
      <div id="cover-caption">
        <div className="container">
          <div className="row text-white">
            <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4">
              <div className="formContainer">
                <h1 className="display-4 py-2">Admin Login</h1>
                <div>
                  <div className="justify-content-center">
                    <form className="form-group" onSubmit={handleSubmit}>
                      <div className="form-group">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Username"
                          onChange={event => setUsername(event.target.value)}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <input
                          className="form-control"
                          type="password"
                          placeholder="Password"
                          onChange={event => setPassword(event.target.value)}
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg full-width"
                      >
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;

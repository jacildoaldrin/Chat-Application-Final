import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const port = process.env.port || 5000;
const endpoint = `https://localhost:${port}/user/login`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [condition, setCondition] = useState(Boolean);

  useEffect(() => {
    axios
      .post(`${endpoint}`, { username: username, password: password })
      .then(res => {
        console.log(res.data);
      });
    // setCondition(username == "admin" && password == "password");
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
                    <form className="form-group">
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
                          type="text"
                          placeholder="Password"
                          onChange={event => setPassword(event.target.value)}
                          required
                        />
                      </div>
                      <button
                        onClick={event =>
                          !condition ? event.preventDefault() : null
                        }
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

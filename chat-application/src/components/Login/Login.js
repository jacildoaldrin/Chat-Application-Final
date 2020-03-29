import React from "react";
import "./Login.css";

const Login = () => {
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
                        <input className="form-control" type="text" placeholder="Username" required/>
                      </div>
                      <div className="form-group">
                        <input className="form-control" type="text" placeholder="Password" required/>
                      </div>
                      <button type="submit" className="btn btn-primary btn-lg full-width">Submit</button>
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

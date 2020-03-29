import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Chatroom from "./components/Chatroom/Chatroom";
import Join from "./components/Join/Join";
import 'bootstrap/dist/css/bootstrap.min.css';
import Admin from "./components/Admin/Admin";

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={Join} />
      <Route path="/login" component={Login} />
      <Route path="/chatroom" component={Chatroom} />
      <Route path="/admin" component={Admin}/>
    </Router>
  );
};

export default App;

import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login";
import Chat from "./components/Chat";
import Join from "./components/Join/Join";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={Join} />
      <Route path="/login" component={Login} />
      <Route path="/chat" component={Chat} />
    </Router>
  );
};

export default App;

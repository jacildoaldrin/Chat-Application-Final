import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Chatroom from "./components/Chatroom/Chatroom";
import Join from "./components/Join/Join";
import Admin from "./components/Admin/Admin";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Join} />
      <Route path="/login" component={Login} />
      <Route path="/chatroom" component={Chatroom} />
      <Route path="/admin" component={Admin}/>
    </BrowserRouter>
  );
};

export default App;

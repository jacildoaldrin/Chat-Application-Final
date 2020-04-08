import React from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';

//css
import "./GoAdmin.css";

class GoAdmin extends React.Component {
    state = {  }
    render() { 
        return (
            <div>
                <Link to={'/login'}>
                <Button className="myButton" variant="primary">Admin</Button>
                </Link>  
            </div>
        );
    }
}
 
export default GoAdmin;
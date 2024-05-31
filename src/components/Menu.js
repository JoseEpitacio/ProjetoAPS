import React from "react";
import { Link } from "react-router-dom";



import "../routes/Login.css";

function Menu() {
    return(
        <div className="links">
            <Link to="/login">Login|</Link> 
            <Link to="/">Home|</Link> 
            <Link to="/register">Register</Link>
            
        </div>
        
    );
}
export default Menu;
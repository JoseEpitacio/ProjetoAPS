import React from "react";
import { Link } from "react-router-dom";

import "../routes/Login.css";

function Menu() {
    return(
        <div className="links">
            <Link to="/">Home|</Link>
            <Link to="/login">Login</Link>
        </div>
    );
}
export default Menu;
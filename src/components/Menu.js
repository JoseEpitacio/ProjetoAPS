import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";





function Menu() {

    const handleClickLogout = () => {
        const token = sessionStorage.getItem('token');
        axios.get('http://127.0.0.1:8000/api/logout/', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            console.log(response);
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('user_id')
        })
        .catch(error => {
            console.error('Erro: ', error);
        });
    }

    return(
        <div className="links">
            <Link to="/login">Login|</Link> 
            <Link to="/">Home|</Link> 
            <Link to="/register">Register|</Link>
            <Link to="/newbook">Novo Livro</Link>
            <button className="logout_button" onClick={handleClickLogout}>Sair</button>
        </div>
        
    );
}
export default Menu;
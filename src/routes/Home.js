import React from 'react';
import { Link } from "react-router-dom";


function Home() {
    return (
        <div className="container">
            <h1 className='menu'>Faça seu login aqui:</h1>
    
            <div className='div_link'>
            
            <Link className='link_menu' to="/login">Login</Link>
            </div>
      </div> 
        
  );
} 
export default Home;



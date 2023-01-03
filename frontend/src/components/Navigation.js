import React from 'react';
import '../assets/css/navbar.css'
 
const Navigation = () => {
    return (
        <div className="navbar">
        <a href="/list">Categories</a>
        <a href="/add">Money Management</a>
        <a href="/">Home</a>
    </div>
    );
}
 
export default Navigation;


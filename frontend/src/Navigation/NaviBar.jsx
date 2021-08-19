import React from "react";
import { faGripLines } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./NavBar.css";
const NaviBar = () => {
  return (
  <nav className="navbar navbar-expand-lg bg-light ml-4 mr-4">
  <Link to='/'>Home</Link>
  <button className="navbar-toggler " type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon bg-info rounded-circle"><FontAwesomeIcon className='mt-1 text-light' icon={faGripLines}/></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <div className=" justify-content-end ">
    <Link to="/adminsignup">
       <button className="main-button">Sign Up</button>
       </Link>
     
      <div className="dropdown">
  <button className="dropbtn">LogIn</button>
  <div className="dropdown-content">
  <Link to="/adminsignin">
  <button className="main-button">Login admin</button>
  </Link>
  <Link to="/writesignin">
  <button className="main-button">Login writer</button>
  </Link>
  </div>
</div>
      </div>
  </div>
</nav>
  )
}
export default NaviBar;

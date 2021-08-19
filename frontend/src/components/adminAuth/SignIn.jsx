import React, { useState } from 'react'
import { Link, useHistory } from "react-router-dom";
import axios from 'axios'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faKey
  } from "@fortawesome/free-solid-svg-icons";
import './SignIn.css'

const SignIn =()=>{
  const history = useHistory()
  const [inputdata,setinputdata] = useState({
     email:'',
     password:''
  })
  const handleinput =(e)=>{
    const name = e.target.name;
    const value = e.target.value
    setinputdata({...inputdata,[name]:value})
  }
 const onreceive=async (e)=>{
   e.preventDefault();
   try{
   const res = await axios.post('/adminsignIn', inputdata 
  )
   if(res.status === 400 || !res ){
        alert("Invalid User")
   }else{
       setinputdata([])
       history.push('/adminhome')
   }
  }catch(err){
    alert("Invalid User")
    console.log(err)
  }
  }
    return(
        <div className='cards fk'>
            <div className='card mx-auto d-flex mt-5'>
            <form className=" p-3" onSubmit={onreceive}>  
            <h3 className="pb-3">Sign In</h3>
              <div className="input-icons mb-4 mt-2">
                <FontAwesomeIcon
                  className="icon i mt-3 md-col-right"
                  icon={faUser}
                />
                <input
                  className="input-field"
                  type="text"
                  value={inputdata.email}
                  onChange={handleinput}
                  name='email'
                  placeholder="email address"
                  maxLength="500"
                />
              </div>
              <div className="input-icons mb-4 ">
                <FontAwesomeIcon
                  className="icon i mt-3 md-col-right"
                  icon={faKey}
                />
                <input
                  className="input-field"
                  type="password"
                  value={inputdata.password}
                  onChange={handleinput}
                  name='password'
                  placeholder="Password"
                  maxLength="50"
                />
              </div>
              <div >
                <button className='button btn btn-primary float-left w-100' >
                  Sign In
                </button>
              </div>
              <br></br>
              <div className="text-dark text-center row mt-4">
                <a className="col-lg-6 col-md-6 d-color" href="#!">
                  Forgot password ?
                </a>
                <div className="col-lg-6 col-md-6 ">
                  Not registered ? <Link to="/adminsignup" className='d-color'>Register</Link>
                </div>
              </div>
              </form> 
            </div>         
        </div>
    )
}

export default SignIn;
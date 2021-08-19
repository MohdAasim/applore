import React from 'react'
import { Link, useHistory } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faKey,
    faPhone,
    faEnvelope
  } from "@fortawesome/free-solid-svg-icons";
import './SignIn.css'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  phoneNumber:yup.string().required().min(10).max(10),
  password:yup.string().required().min(8),
  cpassword:yup.string().oneOf([yup.ref('password'),null],'Password must match')
  
});

const SignUp=()=>{
  const history = useHistory()
  const {register,handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  })
  const storedata =async (datainp,e)=>{
    try{
     const res = await axios.post('/adminregister', datainp )
     const data = await res
     if(data.status === 422 ||!data){
       window.alert("invalid registrartion")
       console.log("invalid registrartion")
     }
     else{
      history.push('/adminsignin')
     }
    // e.target.reset();
    }catch(err){
      console.log(err)
    }
  }

    return(
        <div className='cards fk'>
            <div className='card mx-auto d-flex mt-5'>
            <form className=" p-3"  onSubmit={handleSubmit(storedata)}>  
            <h3 className="pb-3 text-center">Sign Up</h3>
            <div className="input-icons mb-4 mt-2">
                <FontAwesomeIcon
                  className="icon i mt-3 md-col-right"
                  icon={faUser}
                />
                <input
                  className="input-field"
                  type="text"
                  name='name'
                  // value={userRegistration.name}     
                  // onChange={handleinput}     
                  autoComplete="off"
                  placeholder="Name"
                  {...register('name')}
                />
                <p className='text-danger'>{errors.name?.message }</p>
              </div>
              <div className="input-icons mb-4 mt-2">
                <FontAwesomeIcon
                  className="icon i mt-3 md-col-right"
                  icon={faEnvelope}
                />
                <input
                  className="input-field"
                  type="email"
                  autoComplete="off"
                  name='email'   
                  // value={userRegistration.email}     
                  // onChange={handleinput}                         
                  placeholder="email address"
                  {...register('email')}
                 
                />
                  <p className='text-danger'>{errors.email?.message }</p>
              </div>
              <div className="input-icons mb-4 mt-2">
                <FontAwesomeIcon
                  className="icon i mt-3 md-col-right"
                  icon={faPhone}
                />
                <input
                  className="input-field"
                  type="Number"
                  name='phoneNumber'      
                  // value={userRegistration.phone}     
                  // onChange={handleinput}         
                  autoComplete="off"
                  placeholder="Phone"
                  {...register('phoneNumber')}
                />
                 <p className='text-danger'>{errors.phone?.message }</p>
              </div>
              <div className="input-icons mb-4 ">
                <FontAwesomeIcon
                  className="icon i mt-3 md-col-right"
                  icon={faKey}
                />
                <input
                  className="input-field"
                  type="password"
                  name='password'    
                  // value={userRegistration.password}     
                  // onChange={handleinput}                
                  placeholder="Password"
                  {...register('password')}
                />
                <p className='text-danger'>{errors.password?.message }</p>
              </div>
              <div className="input-icons mb-4 ">
                <FontAwesomeIcon
                  className="icon i mt-3 md-col-right"
                  icon={faKey}
                />
                <input
                  className="input-field"
                  type="password"
                  name='cpassword'
                  // value={userRegistration.cpassword}     
                  // onChange={handleinput}  
                  placeholder="Confirm Password"
                  {...register('cpassword')}
                />
                <p className='text-danger'>{errors.cpassword?.message }</p>
              </div>
              <div >
                <button className='button btn btn-primary float-left w-100'
                type='submit' >
                  Sign Up
                </button>
              </div>
              <br></br>
              <div className="text-dark text-center row mt-4 ">
                <div className="col-lg-12 col-md-12 ">
                  Already Registered ? <Link to="/adminsignin" className='d-color'>SignIn</Link>
                </div>
              </div>
              </form> 
            </div>         
        </div>
    )
}
export default SignUp
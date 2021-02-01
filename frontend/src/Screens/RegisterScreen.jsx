import { PromiseProvider } from 'mongoose';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import { register } from '../actions/signinaction';


function RegisterScreen(props){
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const userInfo = useSelector(state => state.userRegister);
    const { loading, user, error } = userInfo;
    const dispatch = useDispatch();
    const redirect = props.location.search?props.location.search.split('=')[1]:'/';

    useEffect(()=> {

        if(user){
            props.history.push(redirect);
        }

    },[userInfo]);

    function submitHandler(e){
        e.preventDefault();
        dispatch(register(name,email,password));

    }
    


    return <div className="form">
    <form  onSubmit = {submitHandler}>

        <ul className = "form-container">
            <li><h3 className="h3 mb-3 font-weight-normal"> Register</h3></li>
            <li>
            {loading&&<div>Loading...</div>}
                {error&&<div>{error}</div>}
               
            </li>
            <li>
                <label htmlFor="name">Full name</label>
                <input type="text" name="name" id="name" onChange = {(e)=> setName(e.target.value)}  required autoFocus />
            </li>
            <li>
                <label htmlFor="email">Email address</label>
                <input type="email" name="email" id="email" onChange = {(e)=> setEmail(e.target.value)}  required autoFocus />
            </li>
            <li>
                <label htmlFor="password" >Password</label>
                <input type="password"  name='password' id="password" onChange = {e=> setPassword(e.target.value)}required />
      
            </li>
            <li>
                <label htmlFor="repassword" >Re-Password</label>
                <input type="password"  name='repassword' id="repassword" onChange = {e=> setRepassword(e.target.value)}required />
      
            </li>
            <li>
                 <button className="btn btn-lg btn-primary btn-block" type="submit">Register</button>

            </li>
            <li>
                <p className="text-center"> Already have an account?</p>
            </li>
            <li>
                <Link to = {redirect === '/'?'/signin':'/signin?redirect='+redirect} className="text-center">Sign in</Link>
            </li>
        </ul> 
  

    </form>
  </div>
}

export default RegisterScreen;
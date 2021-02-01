import { PromiseProvider } from 'mongoose';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import { signin } from '../actions/signinaction';


function SignInScreen(props){
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const userInfo = useSelector(state => state.userSignin);
    const {loading, user, error } = userInfo;

    const redirect = props.location.search?props.location.search.split('=')[1]:'/';
    


    useEffect(()=> {

        if(user){
            props.history.push(redirect);
        }

    },[userInfo]);

    function submitHandler(e){
        e.preventDefault();
        dispatch(signin(email,password));

    }
    


    return <div className="form">
    <form  onSubmit = {submitHandler}>

        <ul className = "form-container">
            <li><h3 className="h3 mb-3 font-weight-normal"> Sign In </h3></li>
            <li>
                {loading&&<div>Loading...</div>}
                {error&&<div>{error}</div>}
            </li>
            <li>
                <label htmlFor="email">Email address</label>
                <input type="email" name="email" id="inputEmail" onChange = {(e)=> setEmail(e.target.value)}  required autoFocus />
            </li>
            <li>
                <label htmlFor="password" >Password</label>
                <input type="password"  name='password' id="password" onChange = {e=> setPassword(e.target.value)}required />
      
            </li>
            <li>
                 <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>

            </li>
            <li>
                <p className="text-center"> New to amazon</p>
            </li>
            <li>
                <Link to = {redirect==='/'?"/register":"/register?redirect="+redirect}className="text-center">Register now</Link>
            </li>
        </ul> 
  

    </form>
  </div>
}

export default SignInScreen;
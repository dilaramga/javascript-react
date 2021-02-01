import React, { useState } from 'react';
import { useDispatch} from 'react-redux';
import { saveShipping } from '../actions/cartaction';
import CheckoutSteps from '../components/checkoutsteps';


function ShippingScreen(props){
    const [fullName,setFullName] = useState('');
    const [address, setAddress] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [postcode, setPostcode] = useState('');
    const dispatch = useDispatch();  

    function submitHandler(e){
        e.preventDefault();
        dispatch(saveShipping({fullName,address,country,city,postcode}));
        props.history.push('/payment');

    }

    return <div>
        <CheckoutSteps step1 step2 />
    
    <div className="form">
    <form  onSubmit = {submitHandler}>

        <ul className = "form-container">

            <li>
                <h3 className="h3 mb-3 font-weight-normal"> Shipping Address</h3>
            </li>
            <li>
                <label htmlFor="fullName">Full Name</label>
                <input type="text" name="fullName" id="fullName" value ={fullName} onChange = {(e)=> setFullName(e.target.value)}  required autoFocus />
            </li>
           
            <li>
                <label htmlFor="address">Address</label>
                <input type="text" name="address" id="address" value ={address} onChange = {(e)=> setAddress(e.target.value)}  required autoFocus />
            </li>
            <li>
                <label htmlFor="country">Country</label>
                <input type="text" name="country" id="country" value ={country} onChange = {(e)=> setCountry(e.target.value)}  required autoFocus />
            </li>
            <li>
                <label htmlFor="city">City</label>
                <input type="text" name="city" id="city" value ={city} onChange = {(e)=> setCity(e.target.value)}  required autoFocus />
            </li>
            <li>
                <label htmlFor="postcode">Post Code</label>
                <input type="text" name="postcode" id="postcode" value ={postcode} onChange = {(e)=> setPostcode(e.target.value)}  required autoFocus />
            </li>
            
            <li>
                 <button className="btn btn-lg btn-primary btn-block" type="submit">Continue</button>

            </li>
           
        </ul> 
  

    </form>
  </div>

  </div>
}

export default ShippingScreen;
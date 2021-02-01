import React, { useState } from 'react';
import { useDispatch} from 'react-redux';
import { savePayment } from '../actions/cartaction';
import CheckoutSteps from '../components/checkoutsteps';


function PaymentScreen(props){
    const [paymentMethod, setPaymentMethod ] = useState('');
 
    const dispatch = useDispatch();  

    function submitHandler(e){
        e.preventDefault();
        dispatch(savePayment({paymentMethod}));
        props.history.push('/placeorder');

    }

    return <div>
        <CheckoutSteps step1 step2 step3 />
    
    <div className="form">
    <form  onSubmit = {submitHandler}>

        <ul className = "form-container">

            <li>
                <h3 className="h3 mb-3 font-weight-normal"> Shipping Address</h3>
            </li>
           
            <li><div>
                <input type="radio" name="paymentMethod" id="paymentMethod" value ='paypal' onChange = {(e)=> setPaymentMethod(e.target.value)}  required />
                <label htmlFor="paymentMethod">Paypal</label>
                </div>
            </li>
          
           
            
            <li>
                 <button className="btn btn-lg btn-primary btn-block" type="submit">Continue</button>

            </li>
           
        </ul> 
  

    </form>
  </div>

  </div>
}

export default PaymentScreen;
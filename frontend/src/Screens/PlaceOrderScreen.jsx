import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../components/checkoutsteps';

function PlaceOrderScreen(props){
    
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
   

    if (!cart.shipping.address){
        props.history.push('/shipping');
    } else if (!cart.payment.paymentMethod) {
        props.history.push('/payment')
    }
    const toPrice = (x) => Number(x.toFixed(x));

    cart.subTotal = toPrice(cart.cartItems.reduce((a,c)=>a+c.qty*c.price,0));
    cart.shippingPrice = cart.subTotal>20?toPrice(0):toPrice(5);
    cart.totalPrice = toPrice(cart.subTotal+cart.shippingPrice+cart.serviceCharge);
    cart.taxPrice = toPrice(cart.totalPrice*0.2);

    const placeOrderHandler = () => {
        //
        
    }
    
    useEffect(()=>{
        

    },[]);

    return <div>
        <CheckoutSteps step1 step2 step3 step4 />
    
    <div className="placeorder">
    <div className="placeorder-info">
        
            
            <div className='placeorder-shipping'>

                <h3>Shipping</h3>
                {cart.shipping.fullName}
                {cart.shipping.address} {cart.shipping.country} {cart.shipping.city} cart.{cart.shipping.postcode}
            </div>
            <div className='placeorder-payment'>
                <h3>Payment method</h3>
                {cart.payment.paymentMethod}
            </div>
            <div className='placeholder-cart'>
            <h3>Cart</h3>
            <ul className="cartlist-container">
            <li>
                {
                    cart.cartItems.length===0?<div>Cart is empty</div>:cart.cartItems.map(item =>
                    (<div className="cart-items-list">
                        <div class='cart-image'>
                            <img src={item.img}/>
                        </div>
                        
                        <div className='cart-name'>
                            <div>{item.name}</div>
                            <div>Qty:{item.qty}                
                            </div> 
                            
                            </div>
                        <div className='cart-price'>${item.price}</div>
                       
                    </div>)
                    )
                }
            </li>
        </ul>
        </div>

    </div>

    <div className="placeorder-action">
        <h3>
            Subtotal: {cart.cartItems.reduce((a,c) => a+c.qty,0)} Items
            ${cart.cartItems.reduce((a,c)=>a+c.price*c.qty,0)}
        </h3>

        <button onClick={placeOrderHandler} className="btn btn-primary btn-lg"disabled={cart.cartItems.length===0}>Proceed to checkout</button>       


    </div>
 
    </div>
    </div>
}

export default PlaceOrderScreen;
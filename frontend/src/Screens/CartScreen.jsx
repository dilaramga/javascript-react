import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, deleteFromCart } from '../actions/cartaction';

function CartScreen(props){
    const product = props.match.params.id;
    const qty = props.location.search?Number(props.location.search.split('=')[1]):1;
    const dispatch = useDispatch();
    const {cartItems} = useSelector(state => state.cart);
    
    useEffect(()=>{
        if (product){
            dispatch(addToCart(product,qty));
        }
        

    },[]);

    return <div className="cart">
    <div className="cart-list">
        <ul className="cart-list-container">
            <li>
                <h1>Shopping cart</h1>
                <div>Price</div>
            </li>
            <li>
                {
                    cartItems.length===0?<div>Cart is empty</div>:cartItems.map(item =>
                    (<div className="cart-items-list">
                        <div class='cart-image'>
                            <img src={item.img}/>
                        </div>
                        
                        <div className='cart-name'>
                            <div>{item.name}</div>
                            <div>Qty: <select value={item.qty} onChange={(e)=>dispatch(addToCart(item.product,Number(e.target.value)))}>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                            </select>
                            <button className ="btn btn-danger" onClick = {()=>dispatch(deleteFromCart(item.product))}>Delete</button>
                            </div> 
                            
                            </div>
                        <div className='cart-price'>${item.price}</div>
                       
                    </div>)
                    )
                }
            </li>
        </ul>

    </div>

    <div className="cart-action">
        <h3>
            Subtotal: {cartItems.reduce((a,c) => a+c.qty,0)} Items
            ${cartItems.reduce((a,c)=>a+c.price*c.qty,0)}
        </h3>

        <button className="btn btn-primary btn-lg"disabled={cartItems.length===0}>Proceed to checkout</button>       


    </div>
 
    </div>
}

export default CartScreen;
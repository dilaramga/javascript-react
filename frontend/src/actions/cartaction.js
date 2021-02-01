import axios from "axios"
import { CART_ADD_PRODUCT, CART_REMOVE_PRODUCT, CART_SAVE_PAYMETN, CART_SAVE_SHIPPING } from "../constants/cartconstants";
import Cookie from 'js-cookie';

const addToCart = (product,qty) => async (dispatch,getState) =>{
    const {data} = await axios.get("/api/products/"+product);
    try {
        dispatch( {
            type:CART_ADD_PRODUCT,
            payload:{
                product:data._id,
                name:data.name,
                img:data.image,
                price:data.price,
                brand:data.brand,
                qty
            }
    
        });

        const {cart:{cartItems}} = getState();
        Cookie.set('cartItems', JSON.stringify(cartItems));
    } catch (error) {
        
    }
  
}

const deleteFromCart = (productId) => (dispatch, getState) =>{
    dispatch({
        type:CART_REMOVE_PRODUCT,
        payload:productId
    });
    const {cart:{cartItems}} = getState();
    Cookie.set('cartItems', JSON.stringify(cartItems));
}

const saveShipping = (data) => (dispatch) => {
    dispatch ({
        type:CART_SAVE_SHIPPING,
        payload:data
    })
}

const savePayment = (data) => (dispatch) => {
    dispatch ({
        type:CART_SAVE_PAYMETN,
        payload:data
    })
}

export  {addToCart, deleteFromCart, saveShipping, savePayment};
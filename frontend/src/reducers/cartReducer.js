import { CART_ADD_PRODUCT, CART_REMOVE_PRODUCT, CART_SAVE_PAYMETN, CART_SAVE_SHIPPING } from "../constants/cartconstants";

function cartReducer(state = {cartItems:[],shipping:[],payment:[]},action){
    const item = action.payload;
    switch (action.type){
        case CART_ADD_PRODUCT:
            
            const product = state.cartItems.find(x => x.product === item.product);
            if (product){
                return {cartItems:state.cartItems.map(x =>x.product ===item.product?item:x )};
            }
            return {cartItems:[...state.cartItems,item]};
        case CART_REMOVE_PRODUCT:
            return {cartItems:state.cartItems.filter(x=>x.product!==item)};
        case CART_SAVE_SHIPPING:
            return {...state,shipping:action.payload};
        case CART_SAVE_PAYMETN:
            return {...state,payment:action.payload}
        default:
            return state;

    }
}

export {cartReducer};
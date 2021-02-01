import { productListReducer, productItemReducer, productSaveReducer, productDeleteReducer } from './reducers/productListReducer';
import {compose,applyMiddleware,combineReducers,createStore} from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducer';
import Cookie from 'js-cookie';
import userSigninReducer, { userRegisterReducer } from './reducers/usersigninReducer';

const cartItems = Cookie.getJSON("cartItems") || [];
const userInfo = Cookie.getJSON("userInfo") || null;
const initialState = {cart:{cartItems, shipping:{},payment:{}}, userSignin:{userInfo}};
const reducer = combineReducers({
    productList:productListReducer,
    productItem:productItemReducer,
    cart: cartReducer,
    userSignin:userSigninReducer,
    userRegister:userRegisterReducer,
    saveProduct:productSaveReducer,
    deleteProduct:productDeleteReducer
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const myStore = createStore(reducer,initialState,composeEnhancer(applyMiddleware(thunk)));

export default myStore;
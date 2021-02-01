import data from "./data";
import {BrowserRouter, Route, Link} from 'react-router-dom';
import HomeScreen from "./Screens/HomeScreen";
import ProductScreen from "./Screens/ProductScreen";
import CartScreen from "./Screens/CartScreen";
import SignInScreen from "./Screens/SignInScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import { useSelector } from "react-redux";
import ProductsScreen from "./Screens/ProductsScreen";
import ShippingScreen from "./Screens/ShippingScreen";
import PaymentScreen from "./Screens/PaymentScreen";
import PlaceOrderScreen from "./Screens/PlaceOrderScreen";


function App() {

const userSignin = useSelector(state=>state.userSignin);
const {userInfo} = userSignin;
const showmenu = () => {
  document.querySelector(".sidebar").classList.add('sidebar-open');
}

const closemenu = () => {
  document.querySelector(".sidebar").classList.remove('sidebar-open');
}
  
  return (
      <BrowserRouter >
    <div className="grid-container">
            <div className="header">
                <div className="brand">
                    <button className="hamburger-icon" onClick={showmenu}>&#9776;</button>
                    <Link to = "/">amazona</Link>
                </div>
                <div className="header-links">
                    <Link to="/cart">Cart</Link>
                    {userInfo ? <Link to ="/profile">{userInfo.name}</Link> : <Link to="/signin">SignIn</Link>}
                    
                </div>
            </div>
            <aside className="sidebar">
                <h1>Shopping Categories</h1>
                <button className="close-btn" onClick={closemenu}>X</button>
                <ul>
                    <li>Pants</li>
                    <li>Shoes</li>
                </ul>
            </aside>

            <div className="main">
               <div className="content">
               <Route path="/products" component = {ProductsScreen} />               
               <Route path ="/" exact={true} component={HomeScreen} />
               <Route path ="/product/:id" component = {ProductScreen} />
               <Route path ="/cart/:id?" component={CartScreen} />
               <Route path="/signin" component={SignInScreen} />
               <Route path="/register" component={RegisterScreen} />
               <Route path='/shipping' component = {ShippingScreen} />
               <Route path='/payment' component = {PaymentScreen} />
               <Route path='/placeorder' component = {PlaceOrderScreen} />
                   
               </div>
            </div>
            <div className="footer">
                All rights reserved
            </div>

        </div>
        </BrowserRouter>

  );
}

export default App;

import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { productList } from '../actions/action';


function HomeScreen(){

    const productListReducerState = useSelector(state=>state.productList);
    const {loading,products,error} = productListReducerState;
    const dispatch = useDispatch();

    useEffect( () => {
        dispatch(productList());
        
        return () => {

        };
        
    } , [] );

    return loading? <div>Loading...</div>:error?<div>{error}</div>:<ul className="products">
    {products.map(product =><li key = {product._id}>
            <div className="product">
            <Link to={'/product/'+product._id}>
                <img src={product.image} alt="shirtone" className="product-image" />
                <div className="product-name">
                    {product.name}
                </div></Link> 
                <div className="product-brand">{product.brand}</div>
                <div className="product-price">{product.price}</div>
                <div className="product-rating">{product.rating} star ({product.numReviews} ratings)</div>
            </div>
        </li>)}
        
       
    </ul>
}

export default HomeScreen;
import React, { useEffect, useState } from 'react';
import data from '../data';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { productItem } from '../actions/action';

function ProductScreen(props){

    const [Qty,setQty] = useState(1);

    const productItemReducerState = useSelector(state=>state.productItem);
    const {loading,product,error} = productItemReducerState;
    const dispatch = useDispatch();

    useEffect( () => {
        
        dispatch(productItem(props.match.params.id));
        
        return () => {

        };
        
    } , [] );
  
    return <div>
        <div className="backtoresult">
            <Link to="/">Back to result</Link>
        </div>
        {console.log(product)}
        {loading?<div>Loading...</div>:
        error?<div>{error}</div>:
        (
            <div className="details">
            <div className="details-image">
                <img src={product.image} alt="product" />
            </div>

            <div className="details-info">
                <h1>{product.name}</h1>
                <h2>Price : £{product.price}</h2>
                <h3>{product.rating + ' star (' +product.numReviews + ')' }</h3>
            </div>

            <div className="details-action">

                <ul>
                    <li>Qty: <select value ={Qty} onChange={(e)=>{setQty(e.target.value)}}>
                        {product.countInStock>0 &&[...Array(product.countInStock).keys()].map(x => {
                            return <option>{x+1}</option>
                        })}
                    </select></li>
                    <li>
                        <button class="btn btn-primary" onClick={()=>props.history.push("/cart/"+product._id+"?qty="+Qty)}>add to cart</button> 
                    </li>
                </ul>

            </div>
        </div>)}
    </div>
}

export default ProductScreen;
import { PromiseProvider } from 'mongoose';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import { productList, saveProduct, deleteProduct } from '../actions/action';


function ProductsScreen(props){
    const [modelVisible,setModelVisible] = useState(false);
    const [id,setID] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [countInStock, setCountInStock] = useState('');

    const productsapi = useSelector(state=> state.productList);
    const {loading, products,error} = productsapi;

    const savedProduct = useSelector(state => state.saveProduct);
    const {loading: saveLoading, success:saveSuccess, error: saveError } = savedProduct;

    const deletedProduct = useSelector(state => state.deleteProduct);
    const {loading: deleteLoading, success:deleteSuccess, error: deleteError } = deletedProduct;

    const dispatch = useDispatch();


    useEffect(()=> {
        if (saveSuccess) {
            setModelVisible(false);

        }
        dispatch(productList());

        

    },[saveSuccess, deleteSuccess]);

    function submitHandler(e){
        e.preventDefault();
        dispatch(saveProduct({_id:id,name,price,image,brand,category,description,countInStock}));

    }

    function productDeleteHandler(product_id){
        dispatch(deleteProduct(product_id));
    }

    function openModel(product){
        setModelVisible(true);
        setID(product._id);
        setName(product.name);
        setPrice(product.price);
        setBrand(product.brand);
        setCategory(product.category);
        setImage(product.image);
        setDescription(product.description);
        setCountInStock(product.countInStock);

    }
    


    return <div className="content content-margin">
    <div className="product-headers" >
        <h3>Products</h3>
        <button onClick ={()=>openModel({})}>Create product</button>
    </div>
    {modelVisible && <div className="form">
    <form  onSubmit = {submitHandler}>

        <ul className = "form-container">
            <li><h3 className="h3 mb-3 font-weight-normal"> Enter new product details </h3></li>
            <li>
                {saveLoading&&<div>Loading...</div>}
                {saveError&&<div>{saveError}</div>}
            </li>
            <li>
                <label htmlFor="name">Product Name</label>
                <input type="text" name="name" value={name} id="name" onChange = {(e)=> setName(e.target.value)}  required autoFocus />
            </li>
            <li>
                <label htmlFor="price" >Price</label>
                <input type="Number"  name='price' value={price} id="price" onChange = {e=> setPrice(e.target.value)} required />
      
            </li>
            <li>
                <label htmlFor="brand">Brand</label>
                <input type="text" name="brand" value ={brand}id="brand" onChange = {(e)=> setBrand(e.target.value)}  required />
            </li>
            <li>
                <label htmlFor="category" >Category</label>
                <input type="text"  name='category'value={category} id="category" onChange = {e=> setCategory(e.target.value)} required />
      
            </li>
            <li>
                <label htmlFor="countInStock">countInStock</label>
                <input type="text" name="countInStock" value={countInStock} id="countInStock" onChange = {(e)=> setCountInStock(e.target.value)}  required />
            </li>
            <li>
                <label htmlFor="image" >Image</label>
                <input type="string"  name='image' id="image" value={image} onChange = {e=> setImage(e.target.value)}required />
      
            </li>
            <li>
                <label htmlFor="description">Product description</label>
                <input type="text" name="description" id="description" value= {description} onChange = {(e)=> setDescription(e.target.value)}  required/>
            </li>
           
            <li>
                 {<button className="btn btn-lg btn-primary btn-block" type="submit">{id?'Update':'Create'}</button>}
                 <button className="btn btn-lg btn-primary btn-block" onClick={() => setModelVisible(false)}>Back</button>

            </li>
            
        </ul> 
  

    </form>
  </div>}

        
    <div className="products-list">
        <table className="admin-product-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Image</th>
                    <th>Category</th>
                    <th>brand</th>
                    <th>description</th>
                    <th>rating</th>
                    <th>numreviews</th>
                    <th>countInStock</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
            {products.map(product=><tr key={product._id}>
                    <td> {product._id}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.image}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>{product.description}</td>
                    <td>{product.rating}</td>
                    <td>{product.numreviews}</td>
                    <td>{product.countInStock}</td>
                    <td>
                        <button onClick ={() => openModel(product)}>Edit</button>
                        <button onClick ={()=>productDeleteHandler(product._id)}>Delete</button>
                    </td>
                </tr>)}
                
            </tbody>
        </table>
    </div>

    </div>
    
    
}

export default ProductsScreen;
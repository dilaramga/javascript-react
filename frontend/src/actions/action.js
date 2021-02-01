import axios from "axios";
import { PRODUCT_DELETE_FAIL, PRODUCT_DELETE_REQUESTED, PRODUCT_DELETE_SUCCESS, PRODUCT_ITEM_FAIL, PRODUCT_ITEM_REQUESTED, PRODUCT_ITEM_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUESTED, PRODUCT_LIST_SUCCESS, PRODUCT_SAVE_FAIL, PRODUCT_SAVE_REQUESTED, PRODUCT_SAVE_SUCCESS } from "../constants/loadingconstants";

const productList = () => async (dispatch) =>{


        try {
            dispatch({type: PRODUCT_LIST_REQUESTED});
            const {data} = await axios.get("/api/products");
            dispatch({type:PRODUCT_LIST_SUCCESS, payload:data});            
        } catch (error) {
            dispatch({type:PRODUCT_LIST_FAIL, payload:error.message});
            
        }

    
}

const productItem = (product_id) => async (dispatch) => {
    dispatch({type:PRODUCT_ITEM_REQUESTED,payload:product_id});
    try {
        
        const {data} = await axios.get("/api/products/"+product_id);
        dispatch({type:PRODUCT_ITEM_SUCCESS, payload:data});
    } catch (error) {
        dispatch({type:PRODUCT_ITEM_FAIL, payload:error.message});
        
    }
    
}

const deleteProduct = (product_id) => async (dispatch,getState) => {
    
    try {
        dispatch({type:PRODUCT_DELETE_REQUESTED,payload:product_id});
        const {userSignin : {userInfo}} = getState();
       
       
            const {data} = await axios.delete("/api/products/"+product_id,{
                headers:{
                    'Authorization':'Bearer'+userInfo.token
                }
            });
            dispatch({type:PRODUCT_DELETE_SUCCESS, payload:data});

     
        
    } catch (error) {
        dispatch({type:PRODUCT_DELETE_FAIL, payload:error.message});
        
    }
    
}

const saveProduct = (product) => async (dispatch,getState) =>{

    
    
    try {
            dispatch({type:PRODUCT_SAVE_REQUESTED, payload:product});
            const {userSignin : { userInfo } } = getState();
            if(product._id){
                const {data} = await axios.put("/api/products/"+product._id,product,{
                    headers:{
                    'Authorization':'Bearer'+userInfo.token
                    }});
                dispatch({type:PRODUCT_SAVE_SUCCESS, payload:data});

            } else {
            const {data} = await axios.post("/api/products",product,{
            headers:{
            'Authorization':'Bearer'+userInfo.token
            }
            
        });
        dispatch({type:PRODUCT_SAVE_SUCCESS, payload:data});

        
        }
       
        
    } catch (error) {
        dispatch({type:PRODUCT_SAVE_FAIL, payload:error.message});
        
    }

}

export {productList,productItem, saveProduct, deleteProduct};
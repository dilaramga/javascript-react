import { PRODUCT_DELETE_FAIL, PRODUCT_DELETE_REQUESTED, PRODUCT_DELETE_SUCCESS, PRODUCT_ITEM_FAIL, PRODUCT_ITEM_REQUESTED, PRODUCT_ITEM_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUESTED, PRODUCT_LIST_SUCCESS, PRODUCT_SAVE_FAIL, PRODUCT_SAVE_REQUESTED, PRODUCT_SAVE_SUCCESS } from "../constants/loadingconstants";
function productListReducer(state = {products:[]},action) {
    switch(action.type){

            case PRODUCT_LIST_REQUESTED:
                return {loading:true,
                        products:[]}

            case PRODUCT_LIST_SUCCESS:
                return {
                    loading:false,
                    products:action.payload
                }

            case PRODUCT_LIST_FAIL:
                return {
                    loading:false,
                    error:action.payload
                }
            default:
                return state;
    }
}

const productItemReducer = (state ={product:{}},action) =>{

    switch(action.type){
        case PRODUCT_ITEM_REQUESTED:
            return {
                loading:true
            }
        case PRODUCT_ITEM_SUCCESS:
            return{
                loading:false,
                product:action.payload
            }
        case PRODUCT_ITEM_FAIL:
            return{
                loading:false,
                error:action.payload
            }
        default:
            return state;
    }

}

const productSaveReducer = (state ={product:{}},action) =>{

    switch(action.type){
        case PRODUCT_SAVE_REQUESTED:
            return {
                loading:true
            }
        case PRODUCT_SAVE_SUCCESS:
            return{
                loading:false,
                success:true,
                product:action.payload
            }
        case PRODUCT_SAVE_FAIL:
            return{
                loading:false,
                error:action.payload
            }
        default:
            return state;
    }

}

const productDeleteReducer = (state ={product:{}},action) =>{

    switch(action.type){
        case PRODUCT_DELETE_REQUESTED:
            return {
                loading:true
            }
        case PRODUCT_DELETE_SUCCESS:
            return{
                loading:false,
                success:true,
                product:action.payload
            }
        case PRODUCT_DELETE_FAIL:
            return{
                loading:false,
                error:action.payload
            }
        default:
            return state;
    }

}

export {productListReducer, productItemReducer, productSaveReducer, productDeleteReducer};
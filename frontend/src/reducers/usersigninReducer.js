import { USER_REGISTER_FAIL, USER_REGISTER_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS } from "../constants/signinconstants";

function userSigninReducer (state= {userInfo:{}},action){
    switch(action.type){
        case USER_SIGNIN_REQUEST:
            return {
                loading:true
            }
        case USER_SIGNIN_SUCCESS:
            return {
                loading:false,
                user:action.payload
            }
        case USER_SIGNIN_FAIL:
            return {
                loading:false,
                error:action.payload
            }
        default:
            return state;
    }
}


function userRegisterReducer (state= {userInfo:{}},action){
    switch(action.type){
        
        case USER_REGISTER_SUCCESS:
            return {
                loading:false,
                user:action.payload
            }
        case USER_REGISTER_FAIL:
            return {
                loading:false,
                error:action.payload
            }
        default:
            return state;
    }
}

export default userSigninReducer;
export {userRegisterReducer}
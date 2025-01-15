import{
    ALL_USER_REQUEST,
    ALL_USER_SUCCESS,
    ALL_USER_FAIL,
    ALL_REGISTER_USER_REQUEST,
    ALL_REGISTER_USER_SUCCESS,
    ALL_REGISTER_USER_FAIL,
} from "../constants/userConstant";

const initialState ={
 user:null,
 loading: false,
 error: null,
};

export const userReducer = (state = initialState, action) =>{
    switch(action.type){
        case ALL_USER_REQUEST:
            return{
                ...state,
                loading: true,
                user: null,
                error: null
            };

            case ALL_USER_SUCCESS:
                return{
                    ...state,
                    loading: false,
                    user : action.payload,
                    error:null,
                };
                case ALL_USER_FAIL:
                    return{
                        ...state,
                        loading: false,
                        error: action.payload,
                    };
                    default: 
                    return state;
    }
};

// REGISTER-USER-REDUCER
export const registerReducer = (state = initialState, action) =>{
    switch(action.type){
        case ALL_REGISTER_USER_REQUEST:
            return{
                ...state,
                loading: true,
                user: null,
                error: null
            };

            case ALL_REGISTER_USER_SUCCESS:
                return{
                    ...state,
                    loading: false,
                    user : action.payload,
                    error:null,
                };
                case ALL_REGISTER_USER_FAIL:
                    return{
                        ...state,
                        loading: false,
                        error: action.payload,
                    };
                    default: 
                    return state;
    }
};
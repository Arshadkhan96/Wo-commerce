import axios from "axios";
import{
    ALL_USER_REQUEST,
    ALL_USER_SUCCESS,
    ALL_USER_FAIL,
    ALL_REGISTER_USER_REQUEST,
    ALL_REGISTER_USER_SUCCESS,
    ALL_REGISTER_USER_FAIL,
} from "../constants/userConstant.js"

export const loginUser = (formData) => async(dispatch) =>{
    try{
        dispatch({type: ALL_USER_REQUEST});
        const { data} = await axios.post("http://localhost:5000/api/v1/login",formData,
            {
                headers:{"Content-Type":"application/json"},
            }
        );

        dispatch({
            type:ALL_USER_SUCCESS,
            payload: data,
        });
    } catch (error){
        dispatch({
            type: ALL_USER_FAIL,
            payload: error.response?.data?.message || "login failed",
        });
    }
};
// Register User
export const registerUser = (formData) => async(dispatch) =>{
    try{
        dispatch({type: ALL_REGISTER_USER_REQUEST});
        const { data} = await axios.post("http://localhost:5000/api/v1/register",formData,
            {
                headers:{"Content-Type":"application/json"},
            }
        );

        dispatch({
            type:ALL_REGISTER_USER_SUCCESS,
            payload: data,
        });
    } catch (error){
        dispatch({
            type: ALL_REGISTER_USER_FAIL,
            payload: error.response?.data?.message || "register failed",
        });
    }
};
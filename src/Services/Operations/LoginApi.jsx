import {toast} from "react-hot-toast";
import {apiConnector} from "../apiConnector";
import {authEndpoint} from "../apis";
import {setToken, setLoading} from "../../Slices/authSlice";

const {LOGIN_API} = authEndpoint;

// actions/auth.js
export const login = (email, password, navigate) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        const toastId = toast.loading("Loading...");
        try {
            const res = await apiConnector("POST", LOGIN_API, {
            email,
            password,
            });
            if (!res.data.success) {
            throw new Error(res.data.message);
            }
    
            dispatch(setToken(res.data.token));
            localStorage.setItem("admintoken", res.data.token);
            navigate("/home");
            toast.success("Login successful");
        } catch (err) {
            toast.error("Login failed");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
        };
};

export const logout = () => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        const toastId = toast.loading("Loading...");
        try {
            localStorage.removeItem("admintoken");
            dispatch(setToken(null));
            toast.success("Logout successful");
        } catch (err) {
            toast.error("Logout failed");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    };
};

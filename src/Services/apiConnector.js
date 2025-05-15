import axios from "axios";
import {toast} from "react-hot-toast"


export const axiosInstance=axios.create({});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;
        const message = error.response?.data?.message;

        if (status === 401 && message === "JWT expired") {
        toast.error("Session expired. Please login again.");
        localStorage.removeItem("admintoken");
        window.location.href = "/";
        }

        return Promise.reject(error);
    }
);

export const apiConnector=(method,url,bodyData,headers,params)=>{
    return axiosInstance({
        method:method,
        url:url,
        data:bodyData ? bodyData : null,
        headers:headers ? headers : null,
        params:params ? params : null,
    })
}
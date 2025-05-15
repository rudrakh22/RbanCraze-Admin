import { categoryEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import { toast } from "react-hot-toast";

const {
    GET_CATEGORIES_WITH_SUBCATEGORIES,
    GET_ALL_CATEGORIES,
    DELETE_CATEGORY,
    ADD_CATEGORIES,
    GET_CATEGORIES_BY_ID,
    EDIT_CATEGORY,
    ADD_SUB_CATEGORIES,
    DELETE_SUBCATEGORY
} = categoryEndpoints;

export const getCategoriesWithSubCategories = async () => {
    let res = [];
    const toastId = toast.loading("Loading Categories...");
    try {
        const response = await apiConnector(
        "GET",
        GET_CATEGORIES_WITH_SUBCATEGORIES
        );
        if (!response?.data?.success) {
        throw new Error(response?.message);
        }
        res = response?.data?.data;
    } catch (error) {
        toast.error("Error while fetching categories");
    }
    toast.dismiss(toastId);
    return res;
    };

    export const getAllCategories = (token) => {
    return async (dispatch) => {
        let res = [];
        try {
        const response = await apiConnector("GET", GET_ALL_CATEGORIES, null, {
            Authorization: `Bearer ${token}`,
        });
        if (!response?.data?.success) {
            throw new Error(response.message);
        }
        res = response?.data?.data;
        toast.success("Category fetched successfully")
        } catch (error) {
            toast.error("Error while fetching categories")
        }
        return res;
    };
    };

    export const deleteCategory = (categoryId, token) => {
    return async (dispatch) => {
        const toastId = toast.loading("Deleting Category...");
        try {
        const response = await apiConnector(
            "DELETE",
            `${DELETE_CATEGORY}${categoryId}`,
            null,
            {
            Authorization: `Bearer ${token}`,
            }
        );
        if (!response?.data?.success) {
            throw new Error(response?.message);
        }
        toast.success("Category deleted successfully");
        } catch (error) {
        toast.error(error?.message);
        }
        toast.dismiss(toastId);
    };
    };

    export const addCategory = (formData, token) => {
    return async (dispatch) => {
        const toastId = toast.loading("Creating Category");
        let res = [];
        try {
        const response = await apiConnector("POST", ADD_CATEGORIES, formData, {
            Authorization: `Bearer ${token}`,
        });
        if (!response?.data?.success) {
            throw new Error(response?.message);
        }
        res = response?.data?.data;
        toast.success("Category added successfully");
        } catch (error) {
        toast.error(error.message || "Failed to add category");
        }
        toast.dismiss(toastId);
        return res;
    };
    };


    export const addSubCategory = (formData, token, categoryId) => {
    return async (dispatch) => {
        const toastId = toast.loading("Creating Subcategory");
        let res = null;
        try {
        const response = await apiConnector(
            "POST",
            `${ADD_SUB_CATEGORIES}${categoryId}`,
            formData,
            {
            Authorization: `Bearer ${token}`,
            }
        );
        if (!response?.data?.success) {
            throw new Error(response?.data?.message || "Failed to add subcategory");
        }

        res = response?.data.data;
        toast.success("Subcategory added successfully");
        } catch (error) {
        toast.error(error.message || "Error adding subcategory");
        }
        toast.dismiss(toastId);
        return res;
    };
};



export const getCategoryById=(categoryId)=>{
    return async(dispatch)=>{
        let res=[];
        const toastId=toast.loading("Fetching Categories");
        try{
            const response=await apiConnector("GET",`${GET_CATEGORIES_BY_ID}${categoryId}`)
            if(!response?.data?.success){
                throw new Error(response.message);
            }
            res=response?.data?.category;
            toast.success("category fetched successfully")
        }catch(error){
            toast.error("Error fetching categories")
        }
        toast.dismiss(toastId);
        return res;
    }
}

export const editCategoryDetails=(formData,token,categoryId)=>{
    return async(dispatch)=>{
        let res=[];
        const toastId=toast.loading("editing category...")
        try{
            const response=await apiConnector(
                "PUT",
                `${EDIT_CATEGORY}${categoryId}`,
                formData,
                {
                    Authorization:`Bearer ${token}`
                }
            )
            if(!response?.data?.success){
                throw new Error(response?.message)
            }
            res=response?.data?.data
            toast.success("changes saved")
        }catch(error){
            toast.error("Error while editing category");
        }
        toast.dismiss(toastId);
        return res;
    }
}
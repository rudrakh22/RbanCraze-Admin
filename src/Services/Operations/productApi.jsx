import {apiConnector} from "../apiConnector";
import {toast} from "react-hot-toast";
import { productEndpoints } from "../apis";
import {setLoading} from "../../Slices/authSlice";
import { setProduct } from "../../Slices/productSlice";
const {
  CREATE_PRODUCT,
  GET_ALL_PRODUCTS,
  DELETE_PRODUCT,
  GET_PRODUCT_BY_ID,
  EDIT_PRODUCT,
  ADD_VARIANT,
  DELETE_VARIANT,
  UPDATE_VARIANT,
  GET_VARIANT_BY_ID,
}=productEndpoints;

export const createProduct = (productData, token) => {
    return async (dispatch) => {
      dispatch(setLoading(true));
      const toastId = toast.loading("Creating Product...");
      let res = [];
  
      try {
        const response = await apiConnector(
          "POST",
          CREATE_PRODUCT,
          productData,
          {
            Authorization: `Bearer ${token}`,
          }
        );
  
        if (!response?.data?.success) {
          throw new Error(response?.message);
        }
        res = response?.data?.product;
        toast.success("Product created successfully");
      } catch (error) {
        toast.error(error.response.data.error)
      }
  
      dispatch(setLoading(false));
      toast.dismiss(toastId);
      return res;
    };
  };

export const deleteProduct=(productId,token)=>{
  return async(dispatch)=>{
    const toastId=toast.loading("Deleting Product...")
    try{
      const response=await apiConnector(
        "DELETE",
        `${DELETE_PRODUCT}${productId}`,
        null,
        {
            Authorization: `Bearer ${token}`,
        }
      )
      if(!response?.data?.success){
        throw new Error(response?.message)
      }
      toast.success("Product deleted successfully")
    }catch(error){
      toast.error(error?.message)
    }
    toast.dismiss(toastId);
  }
}


export const getAllProduct=()=>{
  return async(dispatch)=>{
    dispatch(setLoading(true))
    const toastId=toast.loading("Fetching Products...")
    let res=[];
    try{
      const response=await apiConnector("GET",GET_ALL_PRODUCTS)
      if(!response?.data?.success){
          throw new Error(response?.message)
      }
      res=response?.data?.products
    }catch(error){
      toast.error(error.message)
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
    return res;
  }
}


export const getProductById=(productId)=>{
  return async(dispatch)=>{
    dispatch(setLoading(true))
    const toastId=toast.loading("Fetching Product Details...")
    let res;
    try{
        const response=await apiConnector('GET',`${GET_PRODUCT_BY_ID}${productId}`)
        if(!response?.data?.success){
            throw new Error(response.message);
        }
        res=response?.data?.data;
        toast.success("Product fetched successfully")
    }catch(error){
      toast.error(error?.message)
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId);
    return res;
  }
}

export const editProductDetails = (formData, token, productId) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const toastId = toast.loading("Editing Product...");
    let res;
    try {
      const response = await apiConnector(
        "PUT",
        `${EDIT_PRODUCT}${productId}`,
        formData, // make sure this is FormData
        {
          Authorization: `Bearer ${token}`,
          // ✅ Do NOT set Content-Type manually here
        }
      );

      if (!response || !response.data) {
        throw new Error(response?.message || "Failed to edit product");
      }

      res = response.data;
      toast.success("Changes saved");
    } catch (error) {
      toast.error(error.message);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
    return res;
  };
};

export const addVariant=(formData,productId,token)=>{
  return async(dispatch)=>{
    dispatch(setLoading(true))

    const toastId=toast.loading("Adding Variant...")
    let res;
    try{
      const response=await apiConnector(
        "POST",
        `${ADD_VARIANT}${productId}`,
        formData,
        {
          Authorization: `Bearer ${token}`,
        }
      )
      if(!response?.data?.success){
        throw new Error(response?.message)
      }
      res=response?.data?.variant
      toast.success("Variant added successfully")
    }catch(error){
      toast.error(error.message)
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId);
    return res;
  }
}

export const updateVariant=(variantId,formData,token)=>{
  return async(dispatch)=>{
    dispatch(setLoading(true))
    const toastId=toast.loading("Updating Variant...")
    let res;
    try{
      const response=await apiConnector(
        "PUT",
        `${UPDATE_VARIANT}${variantId}`,
        formData,
        {
          Authorization: `Bearer ${token}`,
        }
      )
      if(!response?.data?.success){
        throw new Error(response?.message)
      }
      res=response?.data?.variant
      toast.success("Variant updated successfully")
    }catch(error){
      toast.error(error.message)
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId);
    return res;
  }
}


export const deleteVariant = (variantId, token) => {
  return async (dispatch, getState) => {
    dispatch(setLoading(true));
    const toastId = toast.loading("Deleting Variant...");

    try {
      const response = await apiConnector(
        "DELETE",
        `${DELETE_VARIANT}${variantId}`,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (!response?.data?.success) {
        throw new Error(response?.message || "Failed to delete variant");
      }

      toast.success("Variant deleted successfully");

      // 🟡 Update product in store after successful deletion
      const { product } = getState().product;

      const updatedVariants = product.productVariants.filter(
        (variant) => variant._id !== variantId
      );

      dispatch(setProduct({ ...product, productVariants: updatedVariants }));
    } catch (error) {
      toast.error(error.message);
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
};


export const getVariantById=(variantId,token)=>{
  return async(dispatch)=>{
    dispatch(setLoading(true))
    const toastId=toast.loading("Fetching Variant Details...")
    let res;
    try{
      const response=await apiConnector(
        "GET",
        `${GET_VARIANT_BY_ID}${variantId}`,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      )
      if(!response?.data){
        throw new Error(response?.message)
      }
      res=response?.data
      toast.success("Variant fetched successfully")
    }catch(error){
      toast.error(error.message)
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId);
    return res;
  }
}
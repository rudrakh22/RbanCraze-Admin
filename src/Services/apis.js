const BASE_URL =import.meta.env.VITE_REACT_APP_BASE_URL;

export const authEndpoint={
    LOGIN_API:`${BASE_URL}/api/admin/login`,
}

export const categoryEndpoints={
    GET_CATEGORIES_WITH_SUBCATEGORIES: BASE_URL + "/api/products/getCategoriesWithSubCategories",
    GET_ALL_CATEGORIES:BASE_URL+"/api/products/allCategories",
    DELETE_CATEGORY:BASE_URL+"/api/products/deletecategory/",
    ADD_CATEGORIES:BASE_URL+"/api/products/createCategory",
    ADD_SUB_CATEGORIES:BASE_URL+"/api/products/createAndAddSubCategory/",
    GET_CATEGORIES_BY_ID:BASE_URL+"/api/products/get-category/",
    EDIT_CATEGORY:BASE_URL+"/api/products/editCategory/",
}

export const productEndpoints={
    CREATE_PRODUCT:BASE_URL+"/api/products/createProduct",
    GET_ALL_PRODUCTS:BASE_URL+"/api/products/getallproducts",
    DELETE_PRODUCT:BASE_URL+"/api/products/deleteProduct/",
    GET_PRODUCT_BY_ID:BASE_URL+"/api/products/details/",
    EDIT_PRODUCT:BASE_URL+"/api/products/editProduct/",
    ADD_VARIANT:BASE_URL+"/api/products/createVariant/",
    UPDATE_VARIANT:BASE_URL+"/api/products/editVariant/",
    DELETE_VARIANT:BASE_URL+"/api/products/deleteVariant/",
    GET_VARIANT_BY_ID:BASE_URL+"/api/products/variant-details/",
}
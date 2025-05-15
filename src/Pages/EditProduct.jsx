import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductById } from "../Services/Operations/productApi";
import { setProduct, setEditProduct } from "../Slices/productSlice";
import AddProduct from "../Pages/AddProduct";

const EditProduct = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const { product } = useSelector((state) => state.product);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchProductDetails = async () => {
      const response = await dispatch(getProductById(productId, token));
      if (response) {
        dispatch(setEditProduct(true));
        dispatch(setProduct(response));
      }
    };
    fetchProductDetails();
  }, []);

  return (
    <div>
      {product ? (
        <AddProduct />
      ) : (
        <div className="flex py-14 w-full h-[85vh]">
          <div className="p-14 border-[2px] border-richblack-800 w-full h-[40%] flex justify-center items-center">
            <p className="md:text-3xl text-2xl py-14  font-medium text-white">
              Product Not Found
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProduct;

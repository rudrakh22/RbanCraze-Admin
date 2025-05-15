import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getCategoryById } from "../Services/Operations/categoryApi";
import { setCompleteCategory, setEditCategory } from "../Slices/categorySlice";
import AddCategories from "./AddCategories";

const EditCategories = () => {
    const dispatch = useDispatch();
    const { completeCategory } = useSelector((state) => state.category);

    const { categoryId } = useParams();
    const { token } = useSelector((state) => state.auth);
    useEffect(() => {
        const fetchCategoryDetails = async () => {
        const response = await dispatch(getCategoryById(categoryId));
        dispatch(setCompleteCategory(response));
        dispatch(setEditCategory(true));
        };
        fetchCategoryDetails();
    }, []);

    return (
        <div className="text-white">
        {completeCategory ? (
            <AddCategories/>
        ) : (
            <div className="flex py-14 w-full h-[85vh]">
            <div className="p-14 border-[2px] border-richblack-800 w-full h-[40%] flex justify-center items-center">
                <p className="md:text-3xl text-2xl py-14  font-medium text-white">
                Category Not Found
                </p>
            </div>
            </div>
        )}
        </div>
    );
};

export default EditCategories;

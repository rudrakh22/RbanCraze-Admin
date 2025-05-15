import React, { useState, useRef, useCallback,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate,useParams } from "react-router-dom";
import ComponentCard from "../components/common/ComponentCard";
import { toast } from "react-hot-toast";
import Label from "../components/form/Label";
import Input from "../components/form/input/InputField";
import Button from "../components/ui/button/Button";
import DropzoneComponent from "../components/form/form-elements/DropZone";
import { FaArrowLeftLong } from "react-icons/fa6";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import {
    addCategory,
    addSubCategory,
    editCategoryDetails,
    deleteCategory
} from "../Services/Operations/categoryApi";
import { HiArrowRightStartOnRectangle } from "react-icons/hi2";

const AddCategories = () => {
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {categoryId}=useParams();
    const {editCategory,completeCategory} =useSelector(state=>state.category)

    const categoryDropzoneRef = useRef();
    const subDropzoneRef = useRef();

    const [categoryForm, setCategoryForm] = useState({ name : "", images: "" });
    const [subForm, setSubForm] = useState({ name: "", images: "" });
    const [categoryData, setCategoryData] = useState(null);
    const [subCategories, setSubCategories] = useState([]);
    const [showSubForm, setShowSubForm] = useState(false);
    const [errors, setErrors] = useState({});
    const [showSubCategories, setShowSubCategories] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

useEffect(() => {
    if (editCategory && completeCategory) {
        setCategoryForm({
            name: completeCategory.name || "",
            images: completeCategory?.image ? [completeCategory.image] : [],
        });
        setCategoryData(completeCategory);
        setSubCategories(completeCategory?.subCategories || []);
    }
}, [editCategory, completeCategory]);

    const validateCategory = () => {
        const newErrors = {};
        if (!categoryForm.name.trim()) newErrors.name = "Please add a category name";
        return newErrors;
    };

    const handleCategoryChange = (e) => {
        const { name, value } = e.target;
        setCategoryForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubFormChange = (e) => {
        const { name, value } = e.target;
        setSubForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleToggleSubCategories = () => {
        setIsExpanded((prev) => !prev);
        setShowSubCategories(prev => !prev);
    };

    const handleEditCategorySubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateCategory();
    if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
    }
    
    const formData = new FormData();
    formData.append("name", categoryForm.name);
    if (categoryForm.images && categoryForm.images.length > 0) {
        categoryForm.images.forEach((file) => {
            formData.append("images", file); // Append each file individually
        });
    }
    try {
        const response=await dispatch(editCategoryDetails(formData,token,categoryId))  
        navigate("/categories", { replace: true });
        categoryDropzoneRef.current?.clearFiles?.();
    } catch (error) {
    }
};


    const handleCategorySubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateCategory();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const formData = new FormData();
        formData.append("name", categoryForm.name);
            if (categoryForm.images && categoryForm.images.length > 0) {
        categoryForm.images.forEach((file) => {
            formData.append("images", file); // Append each file individually
        });
    }

        try {
            const result = await dispatch(addCategory(formData, token));
            if (result) {
                setCategoryData(result);
                setCategoryForm({ name: "", images: "" });
                categoryDropzoneRef.current?.clearFiles?.();
            } else {
            }
        } catch (error) {
        }
    };


    const handleSubFilesSelected = useCallback((files) => {
        setSubForm((prev) => ({ ...prev, images: files[0] }));
    }, []);

    const handleSubSubmit = async (e) => {
        e.preventDefault();
        if (!subForm.name.trim()) {
            toast.error("Subcategory name is required");
            return;
        }

        const formData = new FormData();
        formData.append("name", subForm.name);
        formData.append("images", subForm.images);
        formData.append("categoryId", categoryData._id);

        try {
            const result = await dispatch(addSubCategory(formData, token, categoryData._id));
            if (result && result.subCategory) {
                setSubCategories((prev) => [...prev, result.subCategory]);
                setSubForm({ name: "", images: "" });
                subDropzoneRef.current?.clearFiles?.();
                setShowSubForm(false);
            } else {
            }
        } catch (error) {
        }
    };

    return (
        <div className="space-y-4">
            {/* ADD CATEGORY FORM */}
            {(!categoryData || editCategory ) && (
                <ComponentCard title={editCategory ? "Edit Category" : "Create Category"}>
                    <form onSubmit={editCategory ? handleEditCategorySubmit : handleCategorySubmit}  className="space-y-6">
                        <div>
                            <Label htmlFor="categoryName">Category Name</Label>
                            <Input
                                name="name"
                                id="categoryName"
                                value={categoryForm.name}
                                onChange={handleCategoryChange}
                                placeholder="Enter category name"
                                error={!!errors.name}
                                hint={errors.name}
                            />
                        </div>

                        <div>
                            <DropzoneComponent
                                ref={categoryDropzoneRef}
                                onFilesSelected={(files)=>setCategoryForm({...categoryForm,images:files})}
                                initialImages={editCategory && completeCategory?.image ? [completeCategory.image] : []}
                                key="category-dropzone"
                            />
                        </div>

                        <Button
                            size="sm"
                            variant="primary"
                            startIcon={<HiArrowRightStartOnRectangle size={20} />}
                        >
                            {editCategory?"Save Changes":"Submit Category"}
                        </Button>
                    </form>
                </ComponentCard>
            )}

            {/* CATEGORY PREVIEW & ADD SUBCATEGORY */}
            {categoryData && (
                <ComponentCard title="Category Details">
                    <div className="w-full space-y-4">
                        {/* Toggle Button */}
                        <div
                            onClick={handleToggleSubCategories}
                            className="flex items-center justify-between p-4 border dark:border-gray-700 rounded cursor-pointer dark:bg-gradient-to-r from-gray-800 to-gray-700 hover:shadow-lg transition duration-300"
                        >
                            <p className="font-semibold text-xl text-gray-900 dark:text-white">
                                {categoryData.name} 
                            </p>
                            <div className="flex items-center gap-2">
                                {categoryData.image && (
                                    <img
                                        src={categoryData.image}
                                        alt={categoryData.name}
                                        className="h-20 w-20 object-cover rounded shadow-md "
                                    />
                                )}
                                {isExpanded ? (
                                    <MdKeyboardArrowUp size={22} className="dark:text-white text-gray-800"/>
                                    ) : (
                                    <MdKeyboardArrowDown size={22} className="dark:text-white text-gray-800"/>
                                    )}
                                

                            </div>
                        </div>

                        {/* Subcategories */}
                        <div
                            className={`transition-all duration-500 ease-in-out overflow-hidden ${
                                showSubCategories ? "max-h-96 opacity-100 scale-100" : "max-h-0 opacity-0 scale-95"
                            } dark:border border-gray-700 dark:bg-gray-800 rounded p-4`}
                        >
                            <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Subcategories:</h4>
                            {subCategories.length === 0 ? (
                                <p className="text-gray-800 dark:text-white">No subcategories yet.</p>
                            ) : (
                                <ul className="list-disc list-inside space-y-1 text-white">
                                    {subCategories.map((sub, idx) => (
                                        <li key={idx} className="flex items-center border-1 border-gray-300 shadow-md dark:border-gray-600 justify-between p-2 text-gray-800 dark:text-white hover:shadow-xl transition duration-200">
                                            <span>{sub.name}</span>
                                            <div className="flex items-center gap-3">
                                                <FaEdit 
                                                onClick={()=>{
                                                    navigate(`/edit-category/${sub._id}`)
                                                }}
                                                className="text-lg text-gray-700 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-500"/>
                                                <FiTrash2
                                                    size={22}
                                                    className="cursor-pointer text-red-700 hover:text-red-800"
                                                    onClick={() => {
                                                        dispatch(deleteCategory(sub._id,token))
                                                        setSubCategories((prev) => prev.filter((item) => item._id !== sub._id));
                                                    }}
                                                />
                                                {sub.image && (
                                                    <img
                                                        src={sub.image}
                                                        alt={sub.name}
                                                        className="w-10 h-10 object-cover rounded border"
                                                    />
                                                )}

                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Add Subcategory Button */}
                        {!showSubForm && (
                            <div className="text-right">
                                <Button
                                    size="sm"
                                    variant="primary"
                                    onClick={() => setShowSubForm(true)}
                                    className="transition-all duration-300"
                                >
                                    Add Subcategory
                                </Button>
                            </div>
                        )}
                    </div>
                </ComponentCard>
            )}

            {/* SUBCATEGORY FORM */}
            {showSubForm && (
                <ComponentCard title="Add Subcategory">
                    <form onSubmit={handleSubSubmit} className="space-y-6">
                        <div>
                            <Label htmlFor="subName">Subcategory Name</Label>
                            <Input
                                name="name"
                                id="subName"
                                value={subForm.name}
                                onChange={handleSubFormChange}
                                placeholder="Enter subcategory name"
                            />
                        </div>

                        <div>
                            <DropzoneComponent
                                ref={subDropzoneRef}
                                onFilesSelected={handleSubFilesSelected}
                                initialImages={[]}
                                key="sub-dropzone"
                            />
                        </div>

                        <div className="flex space-x-2 items-center">

                        <Button
                            size="sm"
                            variant="primary"
                            startIcon={<HiArrowRightStartOnRectangle size={20} />}
                        >
                            Add Subcategory
                        </Button>
                        <Button 
                            size="sm"
                            variant="primary"
                            className="flex items-center gap-2 px-4 py-2 text-white bg-gray-700 
                            hover:bg-gray-800
                            transition-all duration-300 rounded-full shadow-md"
                            onClick={() => setShowSubForm(false)}
                        >
                            <FaArrowLeftLong size={16} />
                            <span className="font-semibold">Back to Category</span>
                        </Button>
                        </div>

                    </form>
                </ComponentCard>
            )}
        </div>
    );
};

export default AddCategories;

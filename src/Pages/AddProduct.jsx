    import React from "react";
    import { useState, useEffect, useRef } from "react";
    import { useSelector, useDispatch } from "react-redux";
    import ComponentCard from "../components/common/ComponentCard";
    import Label from "../components/form/Label";
    import Input from "../components/form/input/InputField";
    import TextArea from "../components/form/input/TextArea";
    import Button from "../components/ui/button/Button";
    import Switch from "../components/form/switch/Switch";
    import Select from "../components/form/Select";
    import DropzoneComponent from "../components/form/form-elements/DropZone";
    import { HiArrowRightStartOnRectangle } from "react-icons/hi2";
    import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
    import {
    createProduct,
    deleteVariant,
    editProductDetails,
    } from "../Services/Operations/productApi";
    import { FaEdit } from 'react-icons/fa';
    import { FiTrash2 } from 'react-icons/fi';

    import { useNavigate, useParams } from "react-router-dom";

    const Product = () => {
    const { categories } = useSelector((state) => state.category);
    const { token } = useSelector((state) => state.auth);
    const { editProduct } = useSelector((state) => state.product);
    const { product } = useSelector((state) => state.product);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const dropzoneRef = useRef();
    const categoryOptions = categories.map((cat) => ({
        value: cat._id,
        label: cat.name,
    }));
    const [form, setForm] = useState({
        name: "",
        description: "",
        brand: "",
        actualPrice: "",
        discountPercentage: "",
        isSponsored: false,
        category_id: "",
        specifications: [{ key: "", value: "" }],
        dietaryInfo: [{ key: "", value: "" }],
        allergens: [""],
        expirationDate: "",
        stock_quantity: "",
        images: [],
    });

    useEffect(() => {
        if (editProduct && product) {
        setForm({
            name: product.name || "",
            description: product.description || "",
            brand: product.brand || "",
            actualPrice: product.actualPrice || "",
            discountPercentage: product.discountPercentage || "",
            isSponsored: product.isSponsored || false,
            category_id: product.category_id?._id || "",
            specifications: product.specifications
            ? Object.entries(product.specifications).map(([key, value]) => ({
                key,
                value,
                }))
            : [{ key: "", value: "" }],
            dietaryInfo: product.dietaryInfo
            ? Object.entries(product.dietaryInfo).map(([key, value]) => ({
                key,
                value,
                }))
            : [{ key: "", value: "" }],
            allergens: product.allergens?.length > 0 ? product.allergens : [""],
            expirationDate: product.expirationDate?.slice(0, 10) || "",
            stock_quantity: product.stock_quantity || "",
            images: product.images, // We leave this empty for new uploads; optionally preview old images
        });
        }
    }, [editProduct, product]);
    const { productId } = useParams();

    const [errors, setErrors] = useState({});
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({
        ...form,
        [name]: type === "checkbox" ? checked : value,
        });
    };

    // handle dietary change

    const handleDietaryChange = (index, field, value) => {
        const updated = [...form.dietaryInfo];
        updated[index][field] = value;
        setForm((prev) => ({ ...prev, dietaryInfo: updated }));
    };

    const addDietaryField = () => {
        setForm((prev) => ({
        ...prev,
        dietaryInfo: [...prev.dietaryInfo, { key: "", value: "" }],
        }));
    };

    const removeDietaryField = (index) => {
        const updated = form.dietaryInfo.filter((_, i) => i !== index);
        setForm((prev) => ({ ...prev, dietaryInfo: updated }));
    };

    // handle specifications
    const handleSpecChange = (index, field, value) => {
        const updatedSpecs = [...form.specifications];
        updatedSpecs[index][field] = value;
        setForm({ ...form, specifications: updatedSpecs });
    };

    const addSpecificationField = () => {
        setForm({
        ...form,
        specifications: [...form.specifications, { key: "", value: "" }],
        });
    };

    const removeSpecificationField = (index) => {
        const updatedSpecs = [...form.specifications];
        updatedSpecs.splice(index, 1);
        setForm({ ...form, specifications: updatedSpecs });
    };

    // handle allergens

    const handleAllergenChange = (index, value) => {
        const updatedAllergens = [...form.allergens];
        updatedAllergens[index] = value;
        setForm((prev) => ({ ...prev, allergens: updatedAllergens }));
    };

    const addAllergenField = () => {
        setForm((prev) => ({ ...prev, allergens: [...prev.allergens, ""] }));
    };

    const removeAllergenField = (index) => {
        const updatedAllergens = form.allergens.filter((_, i) => i !== index);
        setForm((prev) => ({ ...prev, allergens: updatedAllergens }));
    };

    // handle file change

    const handleFilesSelected = (files) => {
        setForm((prevForm) => ({
        ...prevForm,
        images: files,
        }));
    };

    const validate = () => {
        const newErrors = {};

        if (!form.name.trim()) newErrors.name = "Please add a product name";
        if (!form.brand.trim()) newErrors.brand = "Please add a brand";
        if (!form.actualPrice) newErrors.actualPrice = "Please add a price";
        if (!form.description) newErrors.description = "Please add a description";
        if (!form.discountPercentage)
        newErrors.discountPercentage = "Please add a discount percentage";
        if (!form.stock_quantity)
        newErrors.stock_quantity = "Please add stock quantity";
        if (
        !Array.isArray(form.specifications) ||
        form.specifications.length === 0 ||
        form.specifications.some(
            (spec) => !String(spec.key).trim() || !String(spec.value).trim()
        )
        ) {
        newErrors.specifications =
            "Please add at least one valid specification (key and value)";
        }
        const groceryCategory = categories.find((cat) => cat.name === "Grocery");
        if (groceryCategory && form.category_id === groceryCategory?._id) {
        if (
            !form.dietaryInfo ||
            form.dietaryInfo.length === 0 ||
            form.dietaryInfo.every(
            (item) => !String(item.key).trim() && !String(item.value).trim()
            )
        ) {
            newErrors.dietaryInfo = "Please add at least one dietary info item";
        }
        if (
            !form.allergens ||
            form.allergens.length === 0 ||
            form.allergens.every((a) => !a.trim())
        ) {
            newErrors.allergens = "Please add at least one allergen";
        }
        if (!form.expirationDate)
            newErrors.expirationDate = "Please add product expiry date";
        }
        return newErrors;
    };

    const resetForm = () => {
        setForm({
        name: "",
        description: "",
        brand: "",
        actualPrice: "",
        discountPercentage: "",
        isSponsored: false,
        category_id: "",
        specifications: [{ key: "", value: "" }],
        dietaryInfo: [{ key: "", value: "" }],
        allergens: [""],
        expirationDate: "",
        stock_quantity: "",
        images: [],
        });
        setErrors({});
        dropzoneRef.current?.clearFiles(); // Reset Dropzone
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
        }

        const dietaryInfoObject = {};
        form.dietaryInfo.forEach((item) => {
        if (item.key.trim()) {
            dietaryInfoObject[item.key] = item.value;
        }
        });

        const specificationsObject = {};
        form.specifications.forEach((item) => {
        if (item.key.trim()) {
            specificationsObject[item.key] = item.value;
        }
        });

        const formData = new FormData();

        const existingImageURLs = [];
        form.images.forEach((img) => {
        if (typeof img === "string") {
            // Existing image URL
            existingImageURLs.push(img);
        } else {
            // New File object
            formData.append("images", img);
        }
        });

        // Append all existing images as one JSON array string
        formData.append("existingImages", JSON.stringify(existingImageURLs));

        // 🧾 2. Append structured data as JSON strings
        formData.append("specifications", JSON.stringify(specificationsObject));
        formData.append("dietaryInfo", JSON.stringify(dietaryInfoObject));

        // 📦 3. Append remaining fields
        for (let key in form) {
        if (["images", "specifications", "dietaryInfo"].includes(key)) continue;
        if (Array.isArray(form[key])) {
            formData.append(key, JSON.stringify(form[key]));
        } else {
            formData.append(key, form[key]);
        }
        }

        try {
        if (editProduct) {
            await dispatch(editProductDetails(formData, token, productId));
        } else {
            await dispatch(createProduct(formData, token));
        }
        navigate("/products");
        } catch (err) {
        alert("Error: " + (err.response?.data?.error || err.message));
        } finally {
        resetForm(); // This will always run unless the page navigates before it
        }
    };
    const [showVariants, setShowVariants] = useState(false);

    const handleToggleSubCategories = () => {
        setShowVariants((prev) => !prev);
    };

    return (
        <div className="md:space-y-6 space-y-3">
        <ComponentCard title={editProduct ? "Edit Product" : "Add Product"}>
            <form className="space-y-6" onSubmit={handleSubmit}>
            {/* name */}
            <div>
                <Label htmlFor="productName">Product Name</Label>
                <Input
                name="name"
                value={form.name}
                id="productName"
                onChange={handleChange}
                placeholder="Enter product name"
                error={!!errors.name}
                hint={errors.name}
                />
            </div>
            {/* description */}
            <div>
                <Label htmlFor="description">Product Description</Label>
                <TextArea
                placeholder="Enter description"
                rows={6}
                value={form.description}
                onChange={(value) => setForm({ ...form, description: value })}
                id="description"
                error={!!errors.description}
                hint={errors.description}
                />
            </div>
            {/* brand */}
            <div>
                <Label htmlFor="brand">Product Brand</Label>
                <Input
                name="brand"
                value={form.brand}
                id="brand"
                onChange={handleChange}
                placeholder="Enter product brand"
                error={!!errors.brand}
                hint={errors.brand}
                />
            </div>
            {/* actual price */}
            <div>
                <Label htmlFor="actualPrice">Actual Price</Label>
                <Input
                name="actualPrice"
                value={form.actualPrice}
                id="actualPrice"
                onChange={handleChange}
                placeholder="Enter actualPrice"
                error={!!errors.actualPrice}
                hint={errors.actualPrice}
                />
            </div>
            {/* discount */}
            <div>
                <Label htmlFor="discountPercentage">Discount %</Label>
                <Input
                name="discountPercentage"
                value={form.discountPercentage}
                id="discountPercentage"
                onChange={handleChange}
                placeholder="Enter discount percentage"
                error={!!errors.discountPercentage}
                hint={errors.discountPercentage}
                />
            </div>
            {/* Category */}
            <div>
                <Label>Category</Label>
                <Select
                options={categoryOptions}
                placeholder="Select a category"
                defaultValue={form.category_id}
                onChange={(value) => setForm({ ...form, category_id: value })}
                />
            </div>
            {/* images */}
            <div>
                <DropzoneComponent
                ref={dropzoneRef}
                onFilesSelected={(files) => setForm({ ...form, images: files })}
                initialImages={editProduct ? product?.images : []} // assuming product.images is an array of URLs
                />
            </div>
            {/* Grocery */}
            {form.category_id ===
                categories.find((cat) => cat.name === "Grocery")?._id && (
                <div className="space-y-2">
                <div>
                    <Label>Dietary Info</Label>
                    {form.dietaryInfo.map((info, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                        <Input
                        placeholder="Key"
                        value={info.key}
                        onChange={(e) =>
                            handleDietaryChange(index, "key", e.target.value)
                        }
                        />
                        <Input
                        placeholder="Value"
                        value={info.value}
                        onChange={(e) =>
                            handleDietaryChange(index, "value", e.target.value)
                        }
                        />
                        <button
                        type="button"
                        onClick={() => removeDietaryField(index)}
                        className="text-red-500"
                        >
                        Remove
                        </button>
                    </div>
                    ))}
                    <button
                    type="button"
                    onClick={addDietaryField}
                    className="text-blue-500"
                    >
                    + Add Dietary Info
                    </button>
                    {errors.dietaryInfo && (
                    <p
                        className={`mt-1.5 text-xs ${
                        errors.dietaryInfo
                            ? "text-error-500"
                            : success
                            ? "text-success-500"
                            : "text-gray-500"
                        }`}
                    >
                        {errors.dietaryInfo}
                    </p>
                    )}
                </div>
                <div>
                    <Label>Allergens</Label>
                    {form.allergens.map((item, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                        <Input
                        placeholder={`Allergen ${index + 1}`}
                        value={item}
                        onChange={(e) =>
                            handleAllergenChange(index, e.target.value)
                        }
                        />
                        {form.allergens.length > 1 && (
                        <button
                            type="button"
                            className="text-red-500"
                            onClick={() => removeAllergenField(index)}
                        >
                            Remove
                        </button>
                        )}
                    </div>
                    ))}
                    <button
                    type="button"
                    className="text-blue-500"
                    onClick={addAllergenField}
                    >
                    + Add Allergen
                    </button>
                    {errors.allergens && (
                    <p className="mt-1.5 text-xs text-error-500">
                        {errors.allergens}
                    </p>
                    )}
                </div>
                <div className="md:max-w-[50%]">
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input
                    type="date"
                    id="expirationDate"
                    name="expirationDate"
                    value={form.expirationDate}
                    onChange={handleChange}
                    error={!!errors.expirationDate}
                    hint={errors.expirationDate}
                    />
                </div>
                </div>
            )}
            {/* specifications */}
            <div>
                <Label>Specifications</Label>
                {form.specifications.map((spec, index) => (
                <div key={index} className="flex gap-2 mb-2">
                    <Input
                    placeholder="Key"
                    value={spec.key}
                    onChange={(e) =>
                        handleSpecChange(index, "key", e.target.value)
                    }
                    error={!!errors.specifications}
                    />
                    <Input
                    placeholder="Value"
                    value={spec.value}
                    onChange={(e) =>
                        handleSpecChange(index, "value", e.target.value)
                    }
                    error={!!errors.specifications}
                    />
                    <button
                    type="button"
                    onClick={() => removeSpecificationField(index)}
                    className="text-red-500"
                    >
                    Remove
                    </button>
                </div>
                ))}
                <button
                type="button"
                onClick={addSpecificationField}
                className="text-blue-500"
                >
                + Add Specification
                </button>
                {errors.specifications && (
                <p
                    className={`mt-1.5 text-xs ${
                    errors.specifications
                        ? "text-error-500"
                        : success
                        ? "text-success-500"
                        : "text-gray-500"
                    }`}
                >
                    {errors.specifications}
                </p>
                )}
            </div>
            {/* Stock quantity */}
            <div>
                <Label htmlFor="stock_quantity">Stock Quantity</Label>
                <Input
                name="stock_quantity"
                value={form.stock_quantity}
                id="stock_quantity"
                onChange={handleChange}
                placeholder="Enter stock quantity"
                error={!!errors.stock_quantity}
                hint={errors.stock_quantity}
                />
            </div>
            {/* is sponsored */}
            <div>
                <Switch
                label="Is Sponsored"
                color="blue"
                disabled={false}
                checked={form.isSponsored}
                onChange={(checked) => setForm({ ...form, isSponsored: checked })}
                />
            </div>
            {/* submit button */}
            <Button
                size="sm"
                variant="primary"
                startIcon={<HiArrowRightStartOnRectangle size={20} />}
            >
                {editProduct ? "Save Changes" : "Submit"}
            </Button>
            </form>
        </ComponentCard>
        <ComponentCard title="Add Variants">
            <div className="w-full space-y-4">
            {/* Toggle Button */}
            <div
                onClick={handleToggleSubCategories}
                className="flex items-center justify-between p-4 border dark:border-gray-700 rounded cursor-pointer dark:bg-gradient-to-r from-gray-800 to-gray-700 hover:shadow-lg transition duration-300"
            >
                <p className="font-semibold text-xl text-gray-900 dark:text-white">
                {product?.name}
                </p>
                <div className="flex items-center gap-2">
                {product?.images[0] && (
                    <img
                    src={product?.images[0]}
                    alt={product?.name}
                    className="h-20 w-20 object-cover rounded shadow-md "
                    />
                )}
                {showVariants ? (
                    <MdKeyboardArrowUp
                    size={22}
                    className="dark:text-white text-gray-800"
                    />
                ) : (
                    <MdKeyboardArrowDown
                    size={22}
                    className="dark:text-white text-gray-800"
                    />
                )}
                </div>
            </div>
            {/* Subcategories */}
            <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                showVariants
                    ? "max-h-96 opacity-100 scale-100"
                    : "max-h-0 opacity-0 scale-95"
                } dark:border border-gray-700 dark:bg-gray-800 space-y-3 lg:space-y-5 rounded p-4`}
            >
                <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-2">
                    Product Variants:
                    </h4>
                    <div className="text-right">
                        <Button
                            size="sm"
                            variant="primary"
                            onClick={() => navigate(`/${product._id}/add-variant`)}
                            className="transition-all duration-300"
                        >
                            Add Variant +
                        </Button>
                    </div>

                </div>
                {product?.productVariants?.length === 0 ? (
                <p className="text-gray-800 dark:text-white">
                    No variants yet.
                </p>
                ) : (
                <ul className="list-disc list-inside space-y-1 text-white">
                    {product?.productVariants.map((sub, idx) => (
                    <li
                        key={idx}
                        className="flex items-center border-1 border-gray-300 shadow-md dark:border-gray-600 justify-between p-2 text-gray-800 dark:text-white hover:shadow-xl transition duration-200"
                    >
                        <div className="flex items-center gap-3">
                            Price :<span>{sub?.actualPrice}</span>
                        </div>

                        <div className="flex items-center gap-3">
                        <FaEdit
                            onClick={() => {
                            navigate(`/${productId}/edit-variant/${sub._id}`);
                            }}
                            className="text-lg text-gray-700 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-500"
                        />
                        <FiTrash2
                            size={22}
                            className="cursor-pointer text-red-700 hover:text-red-800"
                            onClick={() => {
                            dispatch(deleteVariant(sub._id, token));
                            product.productVariant.filter(
                                (variant) => variant._id !== targetVariantId
                            );
                            }}
                        />
                        {sub?.images[0] && (
                            <img
                            src={sub?.images[0]}
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
            </div>
        </ComponentCard>
        </div>

        // {/* CATEGORY PREVIEW & ADD SUBCATEGORY */}
        // {categoryData && (
        //     <ComponentCard title="Category Details">
        //         <div className="w-full space-y-4">
        //             {/* Toggle Button */}
        //             <div
        //                 onClick={handleToggleSubCategories}
        //                 className="flex items-center justify-between p-4 border dark:border-gray-700 rounded cursor-pointer dark:bg-gradient-to-r from-gray-800 to-gray-700 hover:shadow-lg transition duration-300"
        //             >
        //                 <p className="font-semibold text-xl text-gray-900 dark:text-white">
        //                     {categoryData.name}
        //                 </p>
        //                 <div className="flex items-center gap-2">
        //                     {categoryData.image && (
        //                         <img
        //                             src={categoryData.image}
        //                             alt={categoryData.name}
        //                             className="h-20 w-20 object-cover rounded shadow-md "
        //                         />
        //                     )}
        //                     {isExpanded ? (
        //                         <MdKeyboardArrowUp size={22} className="dark:text-white text-gray-800"/>
        //                         ) : (
        //                         <MdKeyboardArrowDown size={22} className="dark:text-white text-gray-800"/>
        //                         )}

        //                 </div>
        //             </div>

        //             {/* Subcategories */}
        //             <div
        //                 className={`transition-all duration-500 ease-in-out overflow-hidden ${
        //                     showSubCategories ? "max-h-96 opacity-100 scale-100" : "max-h-0 opacity-0 scale-95"
        //                 } dark:border border-gray-700 dark:bg-gray-800 rounded p-4`}
        //             >
        //                 <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Subcategories:</h4>
        //                 {subCategories.length === 0 ? (
        //                     <p className="text-gray-800 dark:text-white">No subcategories yet.</p>
        //                 ) : (
        //                     <ul className="list-disc list-inside space-y-1 text-white">
        //                         {subCategories.map((sub, idx) => (
        //                             <li key={idx} className="flex items-center border-1 border-gray-300 shadow-md dark:border-gray-600 justify-between p-2 text-gray-800 dark:text-white hover:shadow-xl transition duration-200">
        //                                 <span>{sub.name}</span>
        //                                 <div className="flex items-center gap-3">
        //                                     <FaEdit
        //                                     onClick={()=>{
        //                                         navigate(`/edit-category/${sub._id}`)
        //                                     }}
        //                                     className="text-lg text-gray-700 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-500"/>
        //                                     <FiTrash2
        //                                         size={22}
        //                                         className="cursor-pointer text-red-700 hover:text-red-800"
        //                                         onClick={() => {
        //                                             dispatch(deleteCategory(sub._id,token))
        //                                             setSubCategories((prev) => prev.filter((item) => item._id !== sub._id));
        //                                         }}
        //                                     />
        //                                     {sub.image && (
        //                                         <img
        //                                             src={sub.image}
        //                                             alt={sub.name}
        //                                             className="w-10 h-10 object-cover rounded border"
        //                                         />
        //                                     )}

        //                                 </div>
        //                             </li>
        //                         ))}
        //                     </ul>
        //                 )}
        //             </div>

        //             {/* Add Subcategory Button */}
        //             {!showSubForm && (
        //                 <div className="text-right">
        //                     <Button
        //                         size="sm"
        //                         variant="primary"
        //                         onClick={() => setShowSubForm(true)}
        //                         className="transition-all duration-300"
        //                     >
        //                         Add Subcategory
        //                     </Button>
        //                 </div>
        //             )}
        //         </div>
        //     </ComponentCard>
        // )}
    );
    };

    export default Product;

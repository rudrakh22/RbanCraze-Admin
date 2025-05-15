    import { useState, useEffect, useRef } from "react";
    import { useDispatch, useSelector } from "react-redux";
    import { useNavigate, useParams } from "react-router-dom";
    import ComponentCard from "../components/common/ComponentCard";
    import Label from "../components/form/Label";
    import Input from "../components/form/input/InputField";
    import Button from "../components/ui/button/Button";
    import DropzoneComponent from "../components/form/form-elements/DropZone";
    import {
    addVariant,
    updateVariant,
    getVariantById,
    } from "../Services/Operations/productApi";
import Select from "../components/form/Select";

    const AddVariant = ({ isEdit }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.auth);
    const dropzoneRef = useRef();
    const { productId, variantId } = useParams(); // variantId if editing
    const [variant,setVariant] = useState(null);

    const [form, setForm] = useState({
        storageCapacity: "",
        dimensions: "",
        color: "",
        finishType: "",
        sizeInClothes: "",
        sizeInEatables: "",
        flavor: "",
        volume: "",
        weight: "",
        stock_quantity: "",
        actualPrice: "",
        discountPercentage: "",
        images: [],
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (isEdit && variantId) {
        dispatch(getVariantById(variantId, token)).then((data) => {

            if (data) {
                setVariant(data);
            setForm({ ...data.attributes, ...data, images: data.images || [] });
            }
        });
        }
    }, [isEdit, variantId, dispatch, token]);

    const validateForm = () => {
        const newErrors = {};
        if (!form.stock_quantity)
        newErrors.stock_quantity = "Stock quantity is required";
        if (!form.actualPrice) newErrors.actualPrice = "Actual price is required";
        if (!form.images.length || !form.images[0])
        newErrors.images = "At least one image is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    function cleanVariantAttributes(attrs) {
        const cleaned = {};
        for (const key in attrs) {
        if (attrs[key] !== "") {
            cleaned[key] = attrs[key];
        }
        }
        return cleaned;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        const attributes = cleanVariantAttributes({
        storageCapacity: form.storageCapacity,
        material: form.material,
        dimensions: form.dimensions,
        color: form.color,
        finishType: form.finishType,
        sizeInClothes: form.sizeInClothes,
        sizeInEatables: form.sizeInEatables,
        flavor: form.flavor,
        packaging: form.packaging,
        volume: form.volume,
        weight: form.weight,
        });

        const variantData = {
        product_id: productId,
        attributes,
        stock_quantity: form.stock_quantity,
        actualPrice: form.actualPrice,
        discountPercentage: form.discountPercentage,
        images: form.images,
        };
        console.log("variantData",variantData)

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

        formData.append("existingImages", JSON.stringify(existingImageURLs));
        formData.append("attributes", JSON.stringify(variantData.attributes));
        formData.append("stock_quantity", variantData.stock_quantity);
        formData.append("actualPrice", variantData.actualPrice);
        formData.append("discountPercentage", variantData.discountPercentage);

        if (isEdit) {
        await dispatch(updateVariant(variantId, formData, token));
        } else {
        await dispatch(addVariant(formData, productId, token));
        }

        navigate(`/edit-product/${productId}`, { replace: true });
    };

    return (
        <ComponentCard title={isEdit ? "Edit Variant" : "Add Variant"}>
        <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
            {[
            { label: "Storage Capacity", name: "storageCapacity" },
            { label: "Material", name: "material" },
            { label: "Dimensions", name: "dimensions" },
            { label: "Color", name: "color" },
            { label: "Finish Type", name: "finishType" },
            { label: "Size (Clothes)", name: "sizeInClothes" },
            { label: "Size (Eatables)", name: "sizeInEatables" },
            { label: "Flavor", name: "flavor" },
            { label: "Packaging", name: "packaging" },
            { label: "Volume", name: "volume" },
            { label: "Weight", name: "weight" },
            { label: "Stock Quantity", name: "stock_quantity", required: true },
            { label: "Actual Price", name: "actualPrice", required: true },
            { label: "Discount %", name: "discountPercentage" },
            ].map(({ label, name, required }) => (
            <div key={name}>
                <Label htmlFor={name}>{label}</Label>
                {(
                <Input
                    id={name}
                    name={name}
                    value={form[name]}
                    onChange={handleChange}
                    placeholder={`Enter ${label.toLowerCase()}`}
                    error={!!errors[name]}
                    hint={errors[name]}
                />
                )}

                {errors[name] && (
                <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
                )}
            </div>
            ))}

            <div className="col-span-2">
            <Label></Label>
            <DropzoneComponent
                ref={dropzoneRef}
                onFilesSelected={(files) => setForm({ ...form, images: files })}
                initialImages={isEdit ? variant?.images : []}
            />
            {errors.images && (
                <p className="text-red-500 text-sm mt-1">{errors.images}</p>
            )}
            </div>

            <div className="col-span-2 text-right">
            <Button type="submit" variant="primary">
                {isEdit ? "Update Variant" : "Add Variant"}
            </Button>
            </div>
        </form>
        </ComponentCard>
    );
    };

    export default AddVariant;

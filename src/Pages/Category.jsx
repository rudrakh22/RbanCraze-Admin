import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate} from "react-router-dom";
import { MdAddCircle } from "react-icons/md";
import Button from "../components/ui/button/Button";
import { FaRegEdit } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../components/ui/table/index";
import { deleteCategory, getAllCategories } from "../Services/Operations/categoryApi";
import { setEditCategory } from '../Slices/categorySlice';

const Category = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { token } = useSelector(state => state.auth);

    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const categoriesPerPage = 7;

    const fetchCategories = async () => {
        const res = await dispatch(getAllCategories(token));
        setCategories(res?.length > 0 ? res : []);
    };

    useEffect(() => {
        fetchCategories();
    }, [setCategories]);

    const handleDelete = async (categoryId) => {
        await dispatch(deleteCategory(categoryId, token));
        setCategories(categories.filter(cat => cat._id !== categoryId));  // Update state locally
    };

    // Handle edit operation
    const handleEdit = (categoryId) => {
        navigate(`/edit-category/${categoryId}`);
    };

    // Pagination logic
    const indexOfLast = currentPage * categoriesPerPage;
    const indexOfFirst = indexOfLast - categoriesPerPage;
    const currentCategories = categories.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(categories.length / categoriesPerPage);

    const getPageNumbers = (totalPages, currentPage) => {
        const pages = [];
        if (totalPages <= 5) {
        for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
        pages.push(1);
        if (currentPage > 3) pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
            if (i > 1 && i < totalPages) pages.push(i);
        }
        if (currentPage < totalPages - 2) pages.push("...");
        pages.push(totalPages);
        }
        return pages;
    };

    const pageNumbers = getPageNumbers(totalPages, currentPage);

    return (
        <div className="md:space-y-6 space-y-3">
        <div className="flex justify-between items-center">
            <h3 className="text-2xl font-medium text-gray-800 dark:text-white/90">
            Categories
            </h3>
            <Button onClick={() => {dispatch(setEditCategory(false));navigate("/add-category")}}>
            Add Categories <MdAddCircle size={20} />
            </Button>
        </div>

        {currentCategories.length > 0 ? (
            <div>
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-[#0E1320] sm:px-6">
                <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">
                Categories
                </h3>
                <div className="max-w-full overflow-x-auto">
                <Table>
                    <TableHeader className="border-y border-gray-100 dark:border-gray-800">
                    <TableRow>
                        <TableCell className="py-3 text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                        Image
                        </TableCell>
                        <TableCell className="py-3 text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                        Name
                        </TableCell>
                        <TableCell className="py-3 text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                        Actions
                        </TableCell>
                    </TableRow>
                    </TableHeader>
                    <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {currentCategories.map((category) => (
                        <TableRow key={category._id}>
                        <TableCell className="py-3">
                            <img
                            src={category?.image?.[0]}
                            alt={category?.name}
                            className="h-[50px] w-[50px] rounded-md object-cover"
                            />
                        </TableCell>
                        <TableCell className="py-3 text-gray-800 dark:text-white/90">
                            {category?.name}
                        </TableCell>
                        <TableCell className="py-3">
                            <div className="flex gap-2 items-center">
                            <FaRegEdit
                                size={20}
                                className="cursor-pointer text-gray-500 hover:text-gray-600 dark:text-gray-400 hover:dark:text-gray-500"
                                onClick={() => handleEdit(category._id)}
                            />
                            <FiTrash2
                                size={22}
                                className="cursor-pointer text-red-700 hover:text-red-800"
                                onClick={() => handleDelete(category._id)}
                            />
                            </div>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </div>
            </div>

            {totalPages > 1 && (
                <div className="flex justify-between items-center gap-2 mt-6 border-t-1 py-3 border-gray-300 dark:border-gray-700 dark:text-white">
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="bg-brand-500 rounded-3xl p-2 px-3 md:px-4 text-sm md:text-lg text-white hover:bg-brand-600 disabled:opacity-50"
                >
                    ← Previous
                </button>

                <div>
                    {pageNumbers.map((number, index) => (
                    <button
                        key={index}
                        onClick={() => typeof number === "number" && setCurrentPage(number)}
                        className={`px-4 py-1 rounded ${
                        number === currentPage
                            ? "text-brand-500 font-semibold border-b-2 border-brand-500 bg-gray-300 dark:bg-gray-700"
                            : "text-gray-600"
                        } ${number === "..." && "cursor-default"}`}
                        disabled={number === "..."}>
                        {number}
                    </button>
                    ))}
                </div>

                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="bg-brand-500 rounded-3xl p-2 px-3 md:px-4 text-sm md:text-lg text-white hover:bg-brand-600 disabled:opacity-50"
                >
                    Next → 
                </button>
                </div>
            )}
            </div>
        ) : (
            <div className="md:min-h-[72vh] min-h-[74vh] flex items-center justify-center text-gray-900 dark:text-white text-2xl">
            No Categories Found. Please add categories
            </div>
        )}
        </div>
    );
};

export default Category;

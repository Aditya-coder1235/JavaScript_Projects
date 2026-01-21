import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const CreateProduct = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        cate: "elec",
    });

    const createProduct = async () => {
        try {
            await axios.post(
                "http://localhost:8080/api/product/create",
                formData,
                { withCredentials: true },
            );
            alert("Product uploaded successfully!");
            navigate("/");
        } catch (error) {
            console.error(error.response?.data || error);
            alert(error.response?.data?.message || "Failed to upload product");
        }
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        createProduct();
    };

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-200 to-purple-200">
            <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Upload New Product
                </h2>

                <form onSubmit={handleOnSubmit} className="flex flex-col gap-5">
                    <div className="flex flex-col">
                        <label className="text-gray-700 font-semibold">
                            Product Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleOnChange}
                            placeholder="Eg. iPhone 14"
                            className="mt-2 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-gray-700 font-semibold">
                            Description
                        </label>
                        <input
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleOnChange}
                            placeholder="Eg. Latest model, 128GB"
                            className="mt-2 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-gray-700 font-semibold">
                            Price
                        </label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleOnChange}
                            placeholder="Eg. 999"
                            className="mt-2 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4">
                        <div className="flex flex-col sm:w-1/2">
                            <label className="text-gray-700 font-semibold">
                                Category
                            </label>
                            <select
                                name="cate"
                                value={formData.cate}
                                onChange={handleOnChange}
                                className="mt-2 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                            >
                                <option value="elec">Electronics</option>
                                <option value="beauty">Beauty</option>
                                <option value="furni">Furniture</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition"
                        >
                            Upload
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateProduct;

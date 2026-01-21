import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ProductById = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const userId = localStorage.getItem("userId");

    const fetchById = async () => {
        try {
            const res = await axios.get(
                `http://localhost:8080/api/product/getProduct/${id}`,
            );
            setProduct(res.data.product);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchById();
    }, [id]);

    // console.log(userId);
    // console.log(product);
    const deleteProduct = async () => {
        try {
            await axios.delete(
                `http://localhost:8080/api/product/delete/${id}`,
                { withCredentials: true },
            );
            alert("Product deleted successfully");
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <p className="text-lg text-gray-500">Loading product...</p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="h-screen flex items-center justify-center">
                <p className="text-lg text-red-500">Product not found</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-10">
            <h2 className="text-3xl font-semibold text-center mb-8">
                Product Details
            </h2>

            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-800">
                    {product.name}
                </h3>

                <p className="text-gray-600 mt-3">{product.description}</p>

                <div className="flex justify-between items-center mt-6">
                    <span className="text-xl font-semibold text-indigo-600">
                        ₹{product.price}
                    </span>

                    <span className="text-sm bg-indigo-100 text-indigo-600 px-4 py-1 rounded-full">
                        {product.cate}
                    </span>
                </div>

                {userId === product?.owner?._id && (
                    <div className="flex gap-4 mt-8">
                        <button
                            onClick={() => navigate(`/update/${product._id}`)}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition"
                        >
                            Update
                        </button>

                        <button
                            onClick={deleteProduct}
                            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition"
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductById;

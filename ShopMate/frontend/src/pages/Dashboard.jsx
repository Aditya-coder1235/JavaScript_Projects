import React, { useEffect } from "react";
import {
    fetchAllProducts,
    filterbyCategory,
    filterByPrice,
} from "../features/productSlice";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cartSlice";

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { products, loading, error } = useSelector((state) => state.product);

    useEffect(() => {
        dispatch(fetchAllProducts());
    }, [dispatch]);

    const handleOnChangeForCate = (e) => {
        dispatch(filterbyCategory(e.target.value));
    };

    const handleOnChangeForPrice = (e) => {
        dispatch(filterByPrice(e.target.value));
    };

    return (
        <div className="min-h-screen bg-gray-100 px-10 py-8">
            <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">
                Explore Products
            </h2>

            <div className="flex flex-wrap justify-center gap-6 mb-10">
                <select
                    onChange={handleOnChangeForCate}
                    className="px-4 py-2 rounded-xl border bg-white shadow focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    <option value="all">All Categories</option>
                    <option value="elec">Electronics</option>
                    <option value="beauty">Beauty</option>
                    <option value="furni">Furniture</option>
                </select>

                <select
                    onChange={handleOnChangeForPrice}
                    className="px-4 py-2 rounded-xl border bg-white shadow focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    <option value="all">All Prices</option>
                    <option value="500">Under ₹500</option>
                    <option value="1000">Under ₹1000</option>
                    <option value="10000">Under ₹10000</option>
                </select>
            </div>

            {loading && (
                <p className="text-center text-lg text-gray-500">
                    Loading products...
                </p>
            )}

            {error && (
                <p className="text-center text-red-500">
                    Something went wrong!
                </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {products.map((product) => (
                    <div
                        key={product._id}
                        className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition flex flex-col justify-between"
                    >
                        <div>
                            <h3 className="text-xl font-semibold text-gray-800">
                                {product.name}
                            </h3>

                            <p className="text-gray-500 mt-2 line-clamp-2">
                                {product.description}
                            </p>

                            <p className="mt-3 font-bold text-indigo-600">
                                ₹{product.price}
                            </p>

                            <span className="inline-block mt-2 text-sm bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full">
                                {product.cate}
                            </span>
                        </div>

                        <div className="flex justify-between items-center mt-6">
                            {product && (
                                <button
                                    onClick={() =>
                                        navigate(
                                            `/productInDetail/${product?._id}`,
                                        )
                                    }
                                    className="bg-gray-600 px-2 py-1 text-gray-200 rounded"
                                >
                                    View In Detail
                                </button>
                            )}

                            <button
                                onClick={() => dispatch(addToCart(product))}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1 rounded-lg transition"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;

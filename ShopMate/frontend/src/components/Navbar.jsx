import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { filterByInput } from "../features/productSlice";
import { useDispatch } from "react-redux";
import axios from "axios";

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [input, setInput] = useState("");

    const logoutUser = async () => {
        try {
            await axios.post(
                "http://localhost:8080/api/auth/logout",
                {},
                { withCredentials: true },
            );

            localStorage.clear();
            alert("User logged out successfully");
            navigate("/login");
        } catch (error) {
            console.error(error);
        }
    };

    const handleOnChange = (e) => {
        setInput(e.target.value);
        dispatch(filterByInput(e.target.value));
    };

    const role=localStorage.getItem('role')
    const token = localStorage.getItem("token");


    return (
        <nav className="sticky top-0 z-50 bg-slate-900 shadow-lg">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex h-16 items-center justify-between">
                    <Link to="/" className="flex items-center gap-2">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/263/263142.png"
                            alt="Shop Logo"
                            className="h-8 w-8"
                        />
                        <span className="text-xl font-bold text-indigo-400">
                            ShopMate
                        </span>
                    </Link>

                    <div className="flex-1 mx-10">
                        <input
                            type="text"
                            value={input}
                            onChange={handleOnChange}
                            placeholder="Search products..."
                            className="w-full h-10 px-4 rounded-full bg-slate-800 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div className="flex items-center gap-6 text-gray-200 font-medium">
                        <Link
                            to="/"
                            className="hover:text-indigo-400 transition"
                        >
                            Home
                        </Link>

                        {role === "seller" && (
                            <Link
                                to="/createProduct"
                                className="hover:text-indigo-400 transition"
                            >
                                Upload
                            </Link>
                        )}

                        <Link
                            to="/cart"
                            className="hover:text-indigo-400 transition"
                        >
                            Cart
                        </Link>

                        {!token && (
                            <>
                                <Link
                                    to="/login"
                                    className="hover:text-indigo-400 transition"
                                >
                                    Login
                                </Link>

                                <Link
                                    to="/signup"
                                    className="hover:text-indigo-400 transition"
                                >
                                    Signup
                                </Link>
                            </>
                        )}

                        <button
                            onClick={logoutUser}
                            className="bg-indigo-600 hover:bg-indigo-700 px-4 py-1 rounded-full text-white transition"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

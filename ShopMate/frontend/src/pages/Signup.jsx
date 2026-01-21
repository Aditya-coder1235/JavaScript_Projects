import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "user",
    });

    const createUser = async () => {
        try {
            let res = await axios.post(
                "http://localhost:8080/api/auth/signup",
                formData,
                { withCredentials: true },
            );
            alert("Signup successfully!");
            navigate("/login");
        } catch (error) {
            console.error(error.response?.data || error);
            alert(error.response?.data?.message || "Signup failed!");
        }
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        createUser();
    };

    const handleOnChange = (e) => {
        let { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-200 to-purple-200">
            <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Create Account
                </h2>

                <form onSubmit={handleOnSubmit} className="flex flex-col gap-5">
                    <div className="flex flex-col">
                        <label className="text-gray-700 font-semibold">
                            Username
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleOnChange}
                            placeholder="Eg. Peter James"
                            className="mt-2 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-gray-700 font-semibold">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleOnChange}
                            placeholder="Eg. peterjames@gmail.com"
                            className="mt-2 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-gray-700 font-semibold">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleOnChange}
                            placeholder="***********"
                            className="mt-2 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4">
                        <div className="flex flex-col sm:w-1/2">
                            <label className="text-gray-700 font-semibold">
                                Role
                            </label>
                            <select
                                value={formData.role}
                                onChange={handleOnChange}
                                name="role"
                                className="mt-2 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                            >
                                <option value="user">User</option>
                                <option value="seller">Seller</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>

                <p className="text-center text-gray-500 mt-6">
                    Already have an account?{" "}
                    <span
                        className="text-indigo-600 font-semibold cursor-pointer hover:underline"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Signup;

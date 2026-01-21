import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const loginUser = async () => {
        try {
            let res = await axios.post(
                "http://localhost:8080/api/auth/login",
                formData,
                { withCredentials: true },
            );

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("role", res.data.user.role);
            localStorage.setItem("userId", res.data.user._id);
            localStorage.setItem("email", res.data.user.email);

            alert("Login successful!");
            navigate("/");
        } catch (error) {
            console.error(error.response?.data || error);
            alert(error.response?.data?.message || "Login failed!");
        }
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        loginUser();
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
                    Welcome Back
                </h2>

                <form onSubmit={handleOnSubmit} className="flex flex-col gap-5">
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

                    <button
                        type="submit"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition mt-4"
                    >
                        Login
                    </button>
                </form>

                <p className="text-center text-gray-500 mt-6">
                    Don't have an account?{" "}
                    <span
                        className="text-indigo-600 font-semibold cursor-pointer hover:underline"
                        onClick={() => navigate("/signup")}
                    >
                        Sign Up
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Login;

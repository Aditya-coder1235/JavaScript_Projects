import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-6 py-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/263/263142.png"
                            alt="Logo"
                            className="h-6 w-6"
                        />
                        <span className="font-semibold text-indigo-400">
                            ShopMate
                        </span>
                    </div>

                    <div className="flex gap-6 text-sm">
                        <Link
                            to="/privacy"
                            className="hover:text-indigo-400 transition"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            to="/terms"
                            className="hover:text-indigo-400 transition"
                        >
                            Terms & Conditions
                        </Link>
                        <Link
                            to="/contact"
                            className="hover:text-indigo-400 transition"
                        >
                            Contact
                        </Link>
                    </div>

                    <div className="text-sm text-gray-400">
                        © {new Date().getFullYear()} Aditya Pvt. Ltd.
                        <span className="ms-1">All rights reserved.</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

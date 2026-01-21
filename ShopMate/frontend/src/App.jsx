import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CreateProduct from "./pages/CreateProduct";
import ProductById from "./pages/ProductById";
import UpdateProduct from "./pages/UpdateProduct";
import Cart from "./pages/Cart";
import ProtectedRoute from "./pages/ProtectedRoute";

const App = () => {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<Dashboard />}></Route>
                    <Route
                        path="/createProduct"
                        element={<CreateProduct />}
                    ></Route>
                    <Route
                        path="/productInDetail/:id"
                        element={<ProductById />}
                    ></Route>
                    <Route path="/update" element={<UpdateProduct />}></Route>
                    <Route path="/cart" element={<Cart />}></Route>
                </Route>
                <Route path="/signup" element={<Signup />}></Route>
                <Route path="/login" element={<Login />}></Route>
            </Routes>
            <Footer />
        </div>
    );
};

export default App;

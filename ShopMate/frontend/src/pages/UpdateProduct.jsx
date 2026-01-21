import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const UpdateProduct = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        cate: "elec",
    });

    let id=localStorage.getItem('userId')

    const UpdateProduct = async () => {
        try {
            let res = await axios.put(
                `http://localhost:8080/api/product/update/${id}`,
                formData,
                { withCredentials: true },
            );
            // console.log(res.data);
            alert('update success')
            navigate("/");
        } catch (error) {
            console.error(error.response?.data || error);
        }
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        UpdateProduct();
    };

    const handleOnChange = (e) => {
        let { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <div className="flex justify-center pt-20 pb-10 bg-gray-300 h-screen">
            <div className="bg-gray-100 h-115 w-90 rounded-2xl p-10 border shadow-2xl">
                <h2 className="font-semibold pb-4 text-2xl">Update Product</h2>
                <form onSubmit={handleOnSubmit} className="flex flex-col gap-5">
                    <div className="flex flex-col">
                        <label htmlFor="">Product Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleOnChange}
                            placeholder="Product name"
                            className="border rounded p-2"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="">Description</label>
                        <input
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleOnChange}
                            placeholder="description"
                            className="border rounded p-2"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="">Price</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleOnChange}
                            placeholder="Price"
                            className="border rounded p-2"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                            <label htmlFor="">Role</label>
                            <select
                                value={formData.cate}
                                onChange={handleOnChange}
                                name="cate"
                                className="border rounded-2xl p-2 w-30"
                            >
                                <option value="elec">Electronics</option>
                                <option value="beauty">Beauty</option>
                                <option value="furni">Furniture</option>
                            </select>
                        </div>
                        <button className="bg-gray-500 px-4 py-1 rounded hover:bg-gray-600 text-gray-100">
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProduct;

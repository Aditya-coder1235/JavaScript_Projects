import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { removeFromCart,clearCart } from '../features/cartSlice'

const Cart = () => {
    const dispatch=useDispatch()
    const items=useSelector((state)=>state.cart.items)

    // console.log(items)/
     const total = items.reduce(
         (sum, item) => sum + item.price * (item.qty || 1),
         0,
     );

   return (
       <div className="min-h-screen bg-gray-100 p-10">
           <h2 className="text-3xl font-semibold text-center mb-8">
               🛒 My Cart
           </h2>

           <div className="max-w-4xl mx-auto space-y-6">
               {items.map((item) => (
                   <div
                       key={item._id}
                       className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition"
                   >
                       {/* Product Info */}
                       <div>
                           <h3 className="text-xl font-semibold text-gray-800">
                               {item.name}
                           </h3>
                           <p className="text-gray-500 mt-1">
                               {item.description}
                           </p>
                           <p className="text-sm text-gray-400 mt-1">
                               Category: {item.cate}
                           </p>
                       </div>

                       {/* Price & Actions */}
                       <div className="text-right">
                           <p className="text-lg font-bold text-gray-700">
                               ₹{item.price}
                           </p>
                           <p className="text-sm text-gray-400 mb-3">
                               Qty: {item.qty || 1}
                           </p>

                           <button
                               onClick={() =>
                                   dispatch(removeFromCart(item._id))
                               }
                               className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg transition"
                           >
                               Remove
                           </button>
                       </div>
                   </div>
               ))}
           </div>

           {/* Cart Summary */}
           <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow-md">
               <div className="flex justify-between items-center text-xl font-semibold">
                   <span>Total Amount</span>
                   <span>₹{total}</span>
               </div>

               <div className="flex justify-end mt-6 gap-4">
                   <button
                       onClick={() => dispatch(clearCart())}
                       className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-2 rounded-lg transition"
                   >
                       Clear Cart
                   </button>

                   <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition">
                       Checkout
                   </button>
               </div>
           </div>
       </div>
   );
}

export default Cart
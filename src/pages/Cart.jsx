import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

export default function Cart() {
    const { cart, removeFromCart, clearCart, updateCart } = useContext(CartContext);
    const navigate = useNavigate();
    const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);

    return (
        <div className="pt-28 px-6 min-h-screen bg-dark text-white">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold text-primary mb-4">Your Cart</h1>
                {cart.length === 0 ? (
                    <div className="bg-gray-900 p-8 rounded-lg text-center">
                        <p>No items in cart.</p>
                        <Link to="/" className="mt-4 inline-block text-accent">Continue shopping</Link>
                    </div>
                ) : (
                    <>
                        <div className="space-y-4">
                            {cart.map(item => (
                                <div key={item.id} className="flex items-center justify-between bg-gray-900 p-4 rounded-xl shadow-neon hover:shadow-pink transition-all">
                                    
                                    {/* Product Info */}
                                    <div className="flex items-center gap-4">
                                        <img src={item.imageUrl || "/placeholder.png"} alt={item.name} className="w-20 h-20 object-cover rounded" />
                                        <div>
                                            <h3 className="font-semibold text-primary">{item.name}</h3>

                                            {/* Product Description */}
                                            {item.description && (
                                                <p className="text-gray-300 text-sm mt-1 line-clamp-2">
                                                    {item.description}
                                                </p>
                                            )}
                                            
                                            {/* Quantity Selector */}
                                            <div className="flex items-center gap-2 mt-2">
                                                <button
                                                    onClick={() => updateCart(item, item.quantity - 1)}
                                                    disabled={item.quantity <= 1}
                                                    className={`px-2 py-1 rounded ${item.quantity <= 1 ? "bg-gray-700 cursor-not-allowed" : "bg-gray-600 hover:bg-gray-500"}`}
                                                >-</button>

                                                <span className="px-3 py-1 bg-gray-800 rounded">{item.quantity}</span>

                                                <button
                                                    onClick={() => updateCart(item, item.quantity + 1)}
                                                    disabled={item.quantity >= item.stock}
                                                    className={`px-2 py-1 rounded ${item.quantity >= item.stock ? "bg-gray-700 cursor-not-allowed" : "bg-gray-600 hover:bg-gray-500"}`}
                                                >+</button>

                                                {/* Weight Display */}
                                                <p className="px-2 py-1 bg-gray-700 rounded text-white text-sm">
                                                    {`${item.quantity} Kg`}
                                                </p>
                                            </div>

                                            {/* Stock Notice */}
                                            {item.quantity >= item.stock && (
                                                <p className="text-xs text-red-400 mt-1">Maximum stock reached</p>
                                            )}

                                        </div>
                                    </div>

                                    {/* Price & Remove */}
                                    <div className="text-right">
                                        <p className="font-bold text-lg">₹{item.price * item.quantity}</p>
                                        <button className="text-sm text-red-400 mt-2 hover:underline" onClick={() => removeFromCart(item.id)}>Remove</button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Cart Summary */}
                        <div className="mt-6 bg-gray-900 p-4 rounded-xl flex justify-between items-center shadow-neon">
                            <div>
                                <p className="text-gray-400">Total</p>
                                <p className="text-2xl font-bold">₹{total}</p>
                            </div>
                            <div className="flex gap-3">
                                <button onClick={() => clearCart()} className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-500 transition-all">Clear</button>
                                <button onClick={() => navigate("/checkout")} className="px-4 py-2 bg-primary text-dark rounded-lg hover:bg-accent transition-all">Checkout</button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

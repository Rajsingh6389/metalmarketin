import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart, clearCart, updateCart } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <div className="pt-24 min-h-screen bg-[#f1f3f6]">
      <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-0">

        {/* TITLE */}
        <h1 className="text-xl md:text-2xl font-semibold mb-5 text-gray-800">
          My Cart ({cart.length})
        </h1>

        {cart.length === 0 ? (
          <div className="bg-white p-6 rounded shadow text-center">
            <p className="text-gray-600 text-sm md:text-base">Your cart is empty.</p>
            <Link
              to="/"
              className="text-blue-600 mt-3 inline-block font-medium hover:underline"
            >
              Shop Now →
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-5">

            {/* LEFT SIDE – CART ITEMS */}
            <div className="flex-1 space-y-4">

              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded shadow p-4 flex flex-col md:flex-row gap-4"
                >
                  {/* PRODUCT IMAGE */}
                  <img
                    src={item.imageUrl || "/placeholder.png"}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-md border"
                  />

                  {/* DETAILS */}
                  <div className="flex-1">
                    <h2 className="text-gray-900 font-semibold text-base md:text-lg leading-tight">
                      {item.name}
                    </h2>

                    <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                      {item.description || "High quality metal material"}
                    </p>

                    {/* QUANTITY CONTROLS */}
                    <div className="flex items-center gap-3 mt-3">

                      {/* MINUS */}
                      <button
                        onClick={() => updateCart(item, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className={`px-3 py-1 border rounded text-lg 
                          ${
                            item.quantity <= 1
                              ? "border-gray-300 text-gray-300 cursor-not-allowed"
                              : "border-gray-400 hover:bg-gray-100"
                          }`}
                      >
                        -
                      </button>

                      {/* INPUT */}
                      <input
                        type="number"
                        value={item.quantity}
                        min="1"
                        max={item.stock}
                        onChange={(e) => {
                          const newQty = parseInt(e.target.value);
                          if (newQty >= 1 && newQty <= item.stock) {
                            updateCart(item, newQty);
                          }
                        }}
                        className="w-14 text-center border rounded p-1 text-gray-800"
                      />

                      {/* PLUS */}
                      <button
                        onClick={() => updateCart(item, item.quantity + 1)}
                        disabled={item.quantity >= item.stock}
                        className={`px-3 py-1 border rounded text-lg 
                          ${
                            item.quantity >= item.stock
                              ? "border-gray-300 text-gray-300 cursor-not-allowed"
                              : "border-gray-400 hover:bg-gray-100"
                          }`}
                      >
                        +
                      </button>
                    </div>

                    {/* STOCK WARNING */}
                    {item.quantity >= item.stock && (
                      <p className="text-xs text-red-600 mt-1">
                        Only {item.stock} left in stock!
                      </p>
                    )}

                    {/* REMOVE */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="mt-2 text-sm text-red-600 font-medium hover:underline"
                    >
                      Remove
                    </button>
                  </div>

                  {/* PRICE */}
                  <div className="text-right md:min-w-[120px]">
                    <p className="text-gray-800 font-semibold text-lg">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT SIDE – PRICE DETAILS */}
            <div className="w-full lg:w-80">

              <div className="bg-white shadow rounded p-5">
                <h2 className="text-gray-700 font-semibold text-lg mb-4">
                  Price Details
                </h2>

                <div className="border-t border-gray-200 pt-3 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Price ({cart.length} items)</span>
                    <span>₹{total}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Delivery Charges</span>
                    <span className="text-green-600">Free</span>
                  </div>

                  <div className="flex justify-between font-semibold text-gray-800 text-base pt-2 border-t">
                    <span>Total Amount</span>
                    <span>₹{total}</span>
                  </div>
                </div>

                {/* BUTTONS */}
                <div className="mt-4 flex flex-col gap-3">

                  <button
                    onClick={() => navigate("/checkout")}
                    className="w-full bg-[#fb641b] hover:bg-[#e7560e] text-white py-2 rounded font-medium text-sm"
                  >
                    PLACE ORDER
                  </button>

                  <button
                    onClick={clearCart}
                    className="w-full bg-gray-300 hover:bg-gray-400 text-gray-900 py-2 rounded font-medium text-sm"
                  >
                    Clear Cart
                  </button>

                </div>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}

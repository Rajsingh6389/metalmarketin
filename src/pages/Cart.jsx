import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart, clearCart, updateCart } = useContext(CartContext);
  const navigate = useNavigate();
  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <div className="pt-28 px-4 sm:px-6 lg:px-8 min-h-screen bg-dark text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-xl sm:text-2xl font-bold text-primary mb-4 sm:mb-6 text-center sm:text-left">
          Your Cart
        </h1>

        {cart.length === 0 ? (
          <div className="bg-gray-900 p-4 sm:p-6 rounded-lg text-center">
            <p className="text-sm sm:text-base">No items in cart.</p>
            <Link to="/" className="mt-2 sm:mt-4 inline-block text-accent text-sm sm:text-base font-semibold">
              Continue shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-3 sm:space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gray-900 p-3 sm:p-4 rounded-lg sm:rounded-xl hover:shadow-pink transition-all gap-3 sm:gap-4"
                >
                  {/* Product Info */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 flex-1">
                    <img
                      src={item.imageUrl || "/placeholder.png"}
                      alt={item.name}
                      className="w-20 h-20 sm:w-20 sm:h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-primary text-sm sm:text-md line-clamp-2">
                        {item.name}
                      </h3>

                      {item.description && (
                        <p className="text-gray-300 text-xs sm:text-sm mt-1 line-clamp-2">
                          {item.description}
                        </p>
                      )}

                      {/* Quantity Selector */}
                      <div className="flex items-center gap-1 sm:gap-2 mt-2 flex-wrap">
                        <button
                          onClick={() => updateCart(item, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className={`px-2 py-0.5 sm:px-2 sm:py-1 rounded text-xs sm:text-sm ${
                            item.quantity <= 1
                              ? "bg-gray-700 cursor-not-allowed"
                              : "bg-gray-600 hover:bg-gray-500"
                          }`}
                        >
                          -
                        </button>

                        <input
                          type="number"
                          value={item.quantity}
                          min="1"
                          max={item.stock}
                          onChange={(e) => {
                            const newQty = parseInt(e.target.value);
                            if (!isNaN(newQty) && newQty >= 1 && newQty <= item.stock) {
                              updateCart(item, newQty);
                            }
                          }}
                          className="w-12 sm:w-16 text-center bg-gray-800 rounded p-1 text-white text-xs sm:text-sm outline-none border border-gray-700 focus:border-primary"
                        />

                        <button
                          onClick={() => updateCart(item, item.quantity + 1)}
                          disabled={item.quantity >= item.stock}
                          className={`px-2 py-0.5 sm:px-2 sm:py-1 rounded text-xs sm:text-sm ${
                            item.quantity >= item.stock
                              ? "bg-gray-700 cursor-not-allowed"
                              : "bg-gray-600 hover:bg-gray-500"
                          }`}
                        >
                          +
                        </button>

                        <p className="px-2 py-0.5 sm:px-2 sm:py-1 bg-gray-700 rounded text-white text-xs sm:text-sm">
                          {`${item.quantity} Kg`}
                        </p>
                      </div>

                      {item.quantity >= item.stock && (
                        <p className="text-xs text-red-400 mt-1">
                          Maximum stock reached
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Price & Remove */}
                  <div className="text-right flex-shrink-0 mt-2 sm:mt-0">
                    <p className="font-bold text-sm sm:text-lg">₹{item.price * item.quantity}</p>
                    <button
                      className="text-xs sm:text-sm text-red-400 mt-1 sm:mt-2 hover:underline"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="mt-4 sm:mt-6 bg-gray-900 p-3 sm:p-4 rounded-lg sm:rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center hover:shadow-pink gap-3 sm:gap-0">
              <div>
                <p className="text-gray-400 text-sm sm:text-base">Total</p>
                <p className="text-lg sm:text-2xl font-bold">₹{total}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
                <button
                  onClick={() => clearCart()}
                  className="px-3 py-1 sm:px-4 sm:py-2 bg-red-600 rounded-lg hover:bg-red-500 transition-all w-full sm:w-auto text-xs sm:text-sm"
                >
                  Clear
                </button>
                <button
                  onClick={() => navigate("/checkout")}
                  className="px-3 py-1 sm:px-4 sm:py-2 bg-primary text-dark rounded-lg hover:bg-accent transition-all w-full sm:w-auto text-xs sm:text-sm"
                >
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

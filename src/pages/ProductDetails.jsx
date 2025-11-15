import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import API from "../api";
import { CartContext } from "../context/CartContext";
import toast from "react-hot-toast";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    API.get(`/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(() => {});
  }, [id]);

  if (!product)
    return (
      <div className="pt-28 text-center text-white text-lg animate-pulse">
        Loading product details...
      </div>
    );

  const isOutOfStock = product.stock === 0;

  return (
    <div className="pt-28 px-6 min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800 text-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-start bg-gray-900/60 rounded-3xl shadow-[0_0_35px_rgba(255,0,255,0.2)] p-8 border border-gray-800 backdrop-blur-md hover:shadow-[0_0_45px_rgba(255,0,255,0.3)] transition-all duration-500">

        {/* Product Image Section */}
        <div className="relative">
          <div className="overflow-hidden rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            <img
              src={product.imageUrl || "/placeholder.png"}
              alt={product.name}
              className="w-full h-96 object-cover rounded-2xl transform hover:scale-105 transition-all duration-500"
            />
          </div>
          <span className="absolute top-4 left-4 bg-primary text-dark px-3 py-1 rounded-full text-xs font-semibold shadow-md">
            {product.category}
          </span>
        </div>

        {/* Product Info Section */}
        <div className="flex flex-col justify-center">
          <h2 className="text-4xl font-bold text-primary tracking-wide">
            {product.name}
          </h2>

          <p className="mt-2 text-sm text-gray-400 uppercase tracking-wider">
            Category: {product.category}
          </p>

          <p className="mt-4 text-2xl font-extrabold text-accent drop-shadow-[0_0_8px_#ff007f99]">
            ₹{product.price} / per Kg
          </p>

          <p className="mt-4 text-gray-300 leading-relaxed text-sm border-t border-gray-700 pt-3">
            {product.description}
          </p>

          {/* Stock & Quantity */}
          <div className="mt-5 flex items-center gap-5">
            <span
              className={`font-semibold px-3 py-1 rounded-lg text-sm ${
                isOutOfStock
                  ? "bg-red-800/40 text-red-400 border border-red-700"
                  : "bg-green-800/40 text-green-400 border border-green-700"
              }`}
            >
              {isOutOfStock ? "Out of Stock" : `In Stock: ${product.stock}`}
            </span>

            {!isOutOfStock && (
              <div className="flex items-center gap-2 bg-gray-800/60 px-3 py-1 rounded-lg border border-gray-700">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="px-2 py-1 text-lg font-bold text-gray-300 hover:text-primary transition"
                >
                  −
                </button>
                <span className="px-4 py-1 text-gray-100 font-medium">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                  className="px-2 py-1 text-lg font-bold text-gray-300 hover:text-primary transition"
                >
                  +
                </button>
              </div>
            )}
          </div>

          {/* Add to Cart Button */}
          <div className="mt-8 flex gap-4">
            <button
              onClick={() => {
                addToCart({ ...product, quantity });
                toast.success("Added to cart successfully!");
              }}
              disabled={isOutOfStock}
              className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 shadow-[0_0_15px_rgba(255,0,255,0.3)] ${
                isOutOfStock
                  ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:shadow-[0_0_25px_rgba(255,0,255,0.6)] hover:scale-105"
              }`}
            >
              {isOutOfStock ? "Not Available" : "Add to Cart"}
            </button>
          </div>

          {/* Powered by Footer */}
          <p className="mt-10 text-xs text-gray-500 text-right opacity-60">
            Powered by <span className="text-primary">Material Mart</span>
          </p>
        </div>
      </div>
    </div>
  );
}

import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AiFillStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const isOutOfStock = product.stock === 0;

  const handleAddToCart = () => {
    // ✅ Add product to cart
    addToCart(product);

    // ✅ Navigate to confirmation page
    navigate("/added-to-cart");
  };

  return (
    <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 pb-6 rounded-2xl border border-gray-700 hover:border-yellow-400 shadow-lg hover:shadow-yellow-400/20 transition-all transform hover:-translate-y-1 cursor-pointer w-64 mx-auto duration-300">

      {/* Glow overlay */}
      <div className="absolute inset-0 rounded-2xl bg-yellow-300 opacity-0 hover:opacity-10 pointer-events-none transition-all duration-300"></div>

      {/* Product Image */}
      <div className="relative overflow-hidden rounded-xl z-10">
        <img
          src={product.imageUrl || "/placeholder.png"}
          alt={product.name}
          className="h-44 w-full object-cover rounded-xl transition-transform duration-500 hover:scale-110"
        />
        <span className="absolute top-2 left-2 bg-yellow-400 text-black px-2 py-0.5 rounded-full text-xs font-semibold shadow-md z-20">
          {product.category}
        </span>
      </div>

      {/* Product Info */}
      <div className="z-10 mt-3">
        <h3 className="text-md font-semibold text-white tracking-wide">{product.name}</h3>

        {/* Stars */}
        <div className="flex items-center gap-1 mt-1">
          {[...Array(5)].map((_, i) => (
            <AiFillStar
              key={i}
              className={`text-yellow-400 ${i < product.rating ? "opacity-100" : "opacity-30"} text-sm`}
            />
          ))}
          <span className="text-gray-400 text-xs ml-1">({product.rating || 0})</span>
        </div>

        {/* Price */}
        <p className="text-yellow-400 font-bold text-lg mt-2">
          ₹{product.price} <span className="text-gray-400 text-sm">/ 1Kg</span>
        </p>

        {/* Buttons */}
        <div className="mt-3 flex justify-between items-center gap-2">
          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`flex p-2 rounded-lg font-semibold text-sm transition-all duration-300 
              ${isOutOfStock 
                ? "bg-gray-700 text-gray-400 cursor-not-allowed" 
                : "bg-gradient-to-r from-yellow-400 to-amber-500 text-black hover:scale-[1.03] hover:shadow-md hover:shadow-yellow-400/30"
              }`}
          >
            {isOutOfStock ? "Not Available" : "🛒 Add to Cart"}
          </button>

          {/* View Details */}
          <button
            onClick={() => navigate(`/products/${product.id}`)}
            className="flex-1 px-2 py-2 rounded-lg font-semibold text-sm bg-gray-800 text-white hover:bg-gray-700 hover:scale-[1.02] transition-all duration-300 shadow-inner"
          >
            View Details
          </button>
        </div>
      </div>

      {/* Powered By Footer */}
      <p className="absolute bottom-1 right-4 text-gray-500 text-[10px] opacity-70 z-10">
        ⚙️ Powered by <span className="text-yellow-400">Material Mart</span>
      </p>
    </div>
  );
}

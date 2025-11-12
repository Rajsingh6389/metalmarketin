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
    <div className="relative bg-gray-900 p-3 pb-6 rounded-2xl shadow-neon hover:shadow-pink transition-all transform hover:scale-105 cursor-pointer w-64 mx-auto">

      {/* Glow overlay */}
      <div className="absolute inset-0 rounded-2xl bg-pink-200 opacity-0 hover:opacity-10 pointer-events-none transition-all"></div>

      {/* Product Image */}
      <div className="relative overflow-hidden rounded-xl z-10">
        <img
          src={product.imageUrl || "/placeholder.png"}
          alt={product.name}
          className="h-40 w-full object-cover rounded-xl transition-transform duration-500 hover:scale-110"
        />
        <span className="absolute top-2 left-2 bg-primary text-dark px-2 py-0.5 rounded-full text-xs font-semibold shadow-md z-20">
          {product.category}
        </span>
      </div>

      {/* Product Info */}
      <div className="z-10 mt-2">
        <h3 className="text-md font-semibold text-primary">{product.name}</h3>

        {/* Stars */}
        <div className="flex items-center gap-1 mt-1">
          {[...Array(5)].map((_, i) => (
            <AiFillStar
              key={i}
              className={`text-yellow-400 ${i < product.rating ? "opacity-100" : "opacity-30"} text-sm`}
            />
          ))}
          <span className="text-gray-400 text-xs">({product.rating || 0})</span>
        </div>

        {/* Price */}
        <p className="text-accent font-bold text-lg mt-1">
          ₹{product.price} / 1Kg
        </p>

        {/* Buttons */}
        <div className="mt-2 flex justify-between">
          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`max-w-max px-3 py-1.5 rounded-lg font-semibold text-sm shadow-neon transition-all
              ${isOutOfStock ? "bg-gray-700 text-gray-400 cursor-not-allowed" : "bg-primary text-dark hover:bg-accent"}`}
          >
            {isOutOfStock ? "Not Available" : "Add to Cart"}
          </button>

          {/* View Details */}
          <button
            onClick={() => navigate(`/products/${product.id}`)}
            className="max-w-max px-3 py-1.5 rounded-lg font-semibold text-sm bg-gray-700 text-white hover:bg-gray-600 transition-all shadow-inner"
          >
            View Details
          </button>
        </div>
      </div>

      {/* Powered By Footer */}
      <p className="absolute bottom-1 right-4 text-gray-400 text-[10px] opacity-60 z-10">
        Powered by Material Mart
      </p>
    </div>
  );
}

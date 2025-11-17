import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AiFillStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const isOutOfStock = product.stock === 0;

  const handleAddToCart = () => {
    addToCart(product);
    navigate("/added-to-cart");
  };

  return (
    <div className="bg-white border rounded-md p-2 sm:p-3 shadow hover:shadow-lg transition-all cursor-pointer flex flex-col">

      {/* ------------ PRODUCT IMAGE ------------ */}
      <div
        className="relative w-full h-32 xs:h-36 sm:h-40 md:h-44 rounded-md overflow-hidden"
        onClick={() => navigate(`/products/${product.id}`)}
      >
        <img
          src={product.imageUrl || "/placeholder.png"}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />

        <span className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-0.5 text-[10px] sm:text-xs rounded shadow">
          {product.category}
        </span>
      </div>

      {/* ------------ PRODUCT DETAILS ------------ */}
      <div className="mt-3 flex flex-col flex-1">

        {/* NAME */}
        <h3
          className="text-xs sm:text-sm md:text-base font-semibold line-clamp-2 leading-tight"
          onClick={() => navigate(`/products/${product.id}`)}
        >
          {product.name}
        </h3>

        {/* RATING */}
        <div className="flex items-center gap-1 mt-1">
          {[...Array(5)].map((_, i) => (
            <AiFillStar
              key={i}
              className={`${
                i < product.rating ? "text-yellow-500" : "text-gray-300"
              } text-xs sm:text-sm`}
            />
          ))}
          <span className="text-[10px] sm:text-xs text-gray-600">
            ({product.rating || 0})
          </span>
        </div>

        {/* PRICE */}
        <p className="text-base sm:text-lg font-bold text-gray-900 mt-2">
          ₹{product.price}
          <span className="text-gray-500 text-xs sm:text-sm"> / Kg</span>
        </p>

        {/* ------------ BUTTONS ------------ */}
        <div className="mt-auto flex flex-col sm:flex-row gap-2 pt-3">

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`w-full py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-md transition-all 
              ${
                isOutOfStock
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-orange-500 text-white hover:bg-orange-600"
              }`}
          >
            {isOutOfStock ? "Out of Stock" : "Add to Cart"}
          </button>

          {/* Details */}
          <button
            onClick={() => navigate(`/products/${product.id}`)}
            className="w-full py-1.5 sm:py-2 bg-blue-600 text-white text-xs sm:text-sm font-medium rounded-md transition-all hover:bg-blue-700"
          >
            Details
          </button>
        </div>

      </div>
    </div>
  );
}

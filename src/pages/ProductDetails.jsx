import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api";
import { CartContext } from "../context/CartContext";
import toast from "react-hot-toast";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);
  const navigate=useNavigate();

  useEffect(() => {
    API.get(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch(() => {});
  }, [id]);

  if (!product)
    return (
      <div className="pt-28 text-center text-gray-600 text-lg animate-pulse">
        Loading product details...
      </div>
    );

  const isOutOfStock = product.stock === 0;

  return (
    <div className="pt-28 px-4 sm:px-6 md:px-10 min-h-screen bg-[#f1f3f6]">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* --------------------- PRODUCT IMAGE --------------------- */}
        <div className="flex flex-col items-center">
          <div className="border rounded-lg overflow-hidden shadow-sm w-full max-w-md bg-gray-100">
            <img
              src={product.imageUrl || "/placeholder.png"}
              alt={product.name}
              className="w-full h-80 object-contain p-4"
            />
          </div>

          <span className="mt-4 text-xs px-3 py-1 bg-[#2874f0] text-white rounded-full shadow-sm">
            {product.category}
          </span>
        </div>

        {/* --------------------- PRODUCT INFO --------------------- */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">
            {product.name}
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Category: {product.category}
          </p>

          <p className="mt-4 text-3xl font-bold text-[#2874f0]">
            ₹{product.price} <span className="text-lg text-gray-500">/ kg</span>
          </p>

          {/* Description */}
          <p className="mt-4 text-gray-700 text-sm leading-relaxed border-t pt-3">
            {product.description}
          </p>

          {/* --------------------- STOCK + QUANTITY --------------------- */}
          <div className="mt-5 flex items-center gap-4">
            <span
              className={`font-medium px-3 py-1 rounded text-sm ${
                isOutOfStock
                  ? "bg-red-100 text-red-600 border border-red-300"
                  : "bg-green-100 text-green-600 border border-green-300"
              }`}
            >
              {isOutOfStock ? "Out of Stock" : `In Stock: ${product.stock}`}
            </span>

            {/* Quantity controller */}
            {!isOutOfStock && (
              <div className="flex items-center gap-2 border border-gray-300 px-3 py-1 rounded-lg bg-gray-50">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="text-lg font-bold text-gray-700 hover:text-[#2874f0]"
                >
                  −
                </button>
                <span className="px-2 text-gray-900">{quantity}</span>
                <button
                  onClick={() =>
                    setQuantity((q) => Math.min(product.stock, q + 1))
                  }
                  className="text-lg font-bold text-gray-700 hover:text-[#2874f0]"
                >
                  +
                </button>
              </div>
            )}
          </div>

          {/* --------------------- ADD TO CART BUTTON --------------------- */}
          <div className="mt-8 flex gap-4">
            <button
              onClick={() => {
                addToCart({ ...product, quantity });
                toast.success("Added to cart");
              }}
              disabled={isOutOfStock}
              className={`px-6 py-3 rounded-md font-semibold text-white transition-all shadow-sm ${
                isOutOfStock
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#ff9f00] hover:bg-[#fb8c00]"
              }`}
            >
              {isOutOfStock ? "Not Available" : "Add to Cart"}
            </button>

            <button
              disabled={isOutOfStock}
              className={`px-6 py-3 rounded-md font-semibold text-white shadow-sm ${
                isOutOfStock
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#fb641b] hover:bg-[#e65a18]"
              }`}
              onClick={()=>{navigate("/checkout")}}
            >
              Buy Now
            </button>
          </div>

          {/* Footer */}
          <p className="mt-10 text-xs text-gray-500 text-right">
            Authorized Seller: <span className="font-medium">Material Mart</span>
          </p>
        </div>
      </div>
    </div>
  );
}

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

  if (!product) return <div className="pt-28 text-center">Loading...</div>;

  const isOutOfStock = product.stock === 0;

  return (
    <div className="pt-28 px-6 min-h-screen bg-dark text-white">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-start">
        
        {/* Product Image */}
        <div className="bg-gray-900 p-6 rounded-3xl shadow-neon">
          <img
            src={product.imageUrl || "/placeholder.png"}
            alt={product.name}
            className="w-full h-96 object-cover rounded-xl"
          />
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h2 className="text-3xl font-bold text-primary">{product.name}</h2>
          <p className="mt-2 text-gray-400">{product.category}</p>
          <p className="mt-4 text-xl font-bold text-accent">₹{`${product.price} Per Grams`}</p>
          <p className="mt-4 text-gray-300">{product.description}</p>

          {/* Stock & Quantity */}
          <div className="mt-4 flex items-center gap-4">
            <span className={`font-semibold ${isOutOfStock ? 'text-red-400' : 'text-green-400'}`}>
              {isOutOfStock ? "Out of Stock" : `In Stock: ${product.stock}`}
            </span>

            {!isOutOfStock && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="px-3 py-1 bg-gray-700 rounded text-white"
                >-</button>
                <span className="px-3 py-1 bg-gray-800 rounded">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                  className="px-3 py-1 bg-gray-700 rounded text-white"
                >+</button>
              </div>
            )}
          </div>

          {/* Add to Cart */}
          <div className="mt-6 flex gap-4">
            <button
              onClick={() => { addToCart({ ...product, quantity }); toast.success("Added to cart"); }}
              disabled={isOutOfStock}
              className={`px-6 py-3 rounded-lg font-semibold shadow-neon transition-all
                ${isOutOfStock ? "bg-gray-700 text-gray-400 cursor-not-allowed" : "bg-primary text-dark hover:bg-accent"}`}
            >
              {isOutOfStock ? "Item not available" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

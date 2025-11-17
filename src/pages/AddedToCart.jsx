import { Link } from "react-router-dom";

export default function AddedToCart() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f1f3f6] px-4">

      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm text-center border border-gray-200">
        
        {/* Success Icon */}
        <div className="text-5xl mb-3">
          <span className="text-green-500">✔</span>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-gray-800">
          Added to Cart
        </h1>

        <p className="text-gray-600 text-sm mt-2">
          Your item has been successfully added to the cart.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">

          {/* Continue Shopping */}
          <Link
            to="/"
            className="w-full sm:w-auto px-5 py-2 text-sm font-medium bg-white border border-[#2874f0] text-[#2874f0] 
            rounded-md hover:bg-[#2874f0]/10 transition-all"
          >
            Continue Shopping
          </Link>

          {/* Go to Cart */}
          <Link
            to="/cart"
            className="w-full sm:w-auto px-5 py-2 text-sm font-semibold bg-[#fb641b] text-white 
            rounded-md hover:bg-[#e65a18] transition-all"
          >
            Go to Cart
          </Link>
        </div>
      </div>
    </div>
  );
}

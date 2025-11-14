import { Link } from "react-router-dom";

export default function AddedToCart() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800 text-white text-center px-4">
      <div className="bg-gray-900/80 backdrop-blur-md p-8 rounded-2xl shadow-[0_0_25px_rgba(0,255,255,0.2)] max-w-sm w-full border border-gray-700 transition-all hover:shadow-[0_0_35px_rgba(0,255,255,0.3)] duration-500">
        <div className="text-5xl mb-3 animate-bounce drop-shadow-[0_0_10px_#00ffff]">🛒</div>

        <h1 className="text-2xl font-semibold text-cyan-400 mb-2 tracking-wide">
          Item Added Successfully!
        </h1>
        <p className="text-gray-400 text-sm mb-6">
          Your product is now in your cart. Continue shopping or head to your cart to checkout.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="px-4 py-2 text-sm font-medium bg-gray-800 border border-gray-600 rounded-lg hover:bg-gray-700 hover:border-cyan-400 transition-all duration-300"
          >
            Continue Shopping
          </Link>
          <Link
            to="/cart"
            className="px-4 py-2 text-sm font-semibold bg-cyan-400 text-gray-900 rounded-lg shadow-[0_0_15px_#00ffffaa] hover:bg-cyan-300 hover:shadow-[0_0_25px_#00ffff] transition-all duration-300"
          >
            Go to Cart
          </Link>
        </div>
      </div>
    </div>
  );
}

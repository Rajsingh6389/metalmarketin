import { Link } from "react-router-dom";

export default function AddedToCart() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-dark text-white text-center px-6">
      <div className="bg-gray-900 p-10 rounded-2xl shadow-neon max-w-md w-full">
        <div className="text-6xl mb-4 animate-bounce">🛒</div>
        <h1 className="text-3xl font-bold text-primary mb-2">Item Added to Cart!</h1>
        <p className="text-gray-400 mb-6">
          Your item has been successfully added to your cart. You can continue shopping or proceed to checkout.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="px-6 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-all"
          >
            Continue Shopping
          </Link>
          <Link
            to="/cart"
            className="px-6 py-2 bg-primary text-dark rounded-lg hover:bg-accent transition-all"
          >
            Go to Cart
          </Link>
        </div>
      </div>
    </div>
  );
}

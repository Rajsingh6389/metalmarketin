import { useEffect, useState } from "react";
import API from "../api";
import ProductCard from "../components/ProductCard";
import LoadingSpinner from "../components/LoadingSpinner";
import brassimg from '../image/brass.png'
import ironimg from '../image/iron.png'
import copperimg from '../image/copper.png'

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    API.get("/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="pt-20 bg-dark min-h-screen text-white">
      {/* Header */}
      <div className="text-center py-10 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">
          <marquee behavior="scroll" direction="left" scrollamount="10">
            Welcome to MetalMarket
          </marquee>
        </h1>
        <p className="text-gray-400 mt-2 text-lg md:text-xl">
          High-quality materials delivered to your doorstep or ready for pickup.
        </p>
      </div>

      {/* Products */}
      {loading ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 px-4 sm:px-8">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}

      {/* Popular Categories */}
      <div className="mt-16 max-w-6xl mx-auto px-4 sm:px-8">
        <h3 className="text-3xl font-bold text-primary mb-6">Popular Categories</h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-dark rounded-xl shadow-neon p-4 text-center hover:scale-105 transition-transform">
            <img src={ironimg} alt="Steel" className="mx-auto w-24 h-24"/>
            <p className="mt-2 text-white font-semibold">Iron</p>
          </div>
          <div className="bg-dark rounded-xl shadow-neon p-4 text-center hover:scale-105 transition-transform">
            <img src={brassimg} alt="Copper" className="mx-auto w-24 h-24"/>
            <p className="mt-2 text-white font-semibold">Brass</p>
          </div>
          <div className="bg-dark rounded-xl shadow-neon p-4 text-center hover:scale-105 transition-transform">
            <img src={copperimg} alt="Aluminum" className="mx-auto w-24 h-24"/>
            <p className="mt-2 text-white font-semibold">Copper</p>
          </div>
    
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="mt-16 max-w-6xl mx-auto px-4 sm:px-8">
        <h3 className="text-3xl font-bold text-primary mb-6">Why Choose MetalStore?</h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-dark rounded-xl shadow-neon p-6 text-center hover:scale-105 transition-transform">
            <p className="text-accent text-4xl mb-2">⚡</p>
            <p className="text-white font-semibold">Fast Delivery</p>
          </div>
          <div className="bg-dark rounded-xl shadow-neon p-6 text-center hover:scale-105 transition-transform">
            <p className="text-accent text-4xl mb-2">🏆</p>
            <p className="text-white font-semibold">Premium Quality</p>
          </div>
          <div className="bg-dark rounded-xl shadow-neon p-6 text-center hover:scale-105 transition-transform">
            <p className="text-accent text-4xl mb-2">📦</p>
            <p className="text-white font-semibold">Bulk Orders</p>
          </div>
          <div className="bg-dark rounded-xl shadow-neon p-6 text-center hover:scale-105 transition-transform">
            <p className="text-accent text-4xl mb-2">🤝</p>
            <p className="text-white font-semibold">Professional Support</p>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="mt-16 bg-dark px-6 py-12 text-center rounded-3xl shadow-neon">
        <h3 className="text-3xl font-bold text-primary mb-8">What Our Customers Say</h3>
        <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-6">
          <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
            <p className="text-gray-300 mb-4">"Excellent quality metals and fast delivery. Highly recommended!"</p>
            <p className="text-accent font-semibold">- Rajesh Kumar</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-xl shadow-lg">
            <p className="text-gray-300 mb-4">"Best place to buy industrial materials in Kanpur. Great service!"</p>
            <p className="text-accent font-semibold">- Priya Singh</p>
          </div>
        </div>
      </div>
    </div>
  );
}

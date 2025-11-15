import { useEffect, useState } from "react";
import API from "../api";
import ProductCard from "../components/ProductCard";
import LoadingSpinner from "../components/LoadingSpinner";
import copperimg from "../image/copper.png";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const ironimg = "https://i.ibb.co/DfYrp2Sx/bf8fc24a67b1.jpg";
  const brassimg = "https://i.ibb.co/hFFHG6ZX/77cdb4317162.jpg";

  useEffect(() => {
    API.get("/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div
      className="pt-20 min-h-screen text-white font-inter relative overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 20% 30%, rgba(255, 215, 0, 0.08), transparent 60%),
          radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.05), transparent 60%),
          linear-gradient(180deg, #0d0d0f 0%, #111111 45%, #1a1a1d 100%)
        `,
      }}
    >
      {/* Subtle texture */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-mosaic.png')] opacity-10 mix-blend-overlay"></div>

      {/* Soft animated light shine */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-[200%] h-[200%] bg-gradient-to-r from-yellow-500/5 via-transparent to-yellow-500/5 animate-[shine_12s_linear_infinite]" />
      </div>

      <style>
        {`
          @keyframes shine {
            0% { transform: translateX(-50%) translateY(-50%) rotate(0deg); }
            100% { transform: translateX(-50%) translateY(-50%) rotate(360deg); }
          }
        `}
      </style>

      {/* Header */}
      <div className="relative text-center py-12 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">
          <marquee behavior="scroll" direction="left" scrollamount="10">
            Welcome to MetalMarket
          </marquee>
        </h1>
        <p className="text-gray-300 mt-3 text-lg md:text-xl tracking-wide">
          High-quality metals delivered with speed, precision, and trust.
        </p>
      </div>

      {/* Products */}
      {loading ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="relative grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 px-6 sm:px-10 z-10">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}

      {/* Popular Categories */}
      <div className="relative mt-20 max-w-6xl mx-auto px-6 sm:px-10 z-10">
        <h3 className="text-3xl font-bold text-yellow-400 mb-8 text-center">
          Popular Categories
        </h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          {[{ img: ironimg, name: "Iron" }, { img: brassimg, name: "Brass" }, { img: copperimg, name: "Copper" }].map(
            (cat, i) => (
              <div
                key={i}
                className="bg-gray-900/80 border border-gray-700 backdrop-blur-lg rounded-2xl p-4 text-center shadow-lg shadow-yellow-500/10 hover:shadow-yellow-400/30 hover:-translate-y-2 transition-all duration-300"
              >
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-full h-28 object-cover rounded-lg mb-3"
                />
                <p className="text-lg font-semibold text-gray-100 tracking-wide">
                  {cat.name}
                </p>
              </div>
            )
          )}
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="relative mt-20 max-w-6xl mx-auto px-6 sm:px-10 z-10">
        <h3 className="text-3xl font-bold text-yellow-400 mb-8 text-center">
          Why Choose MetalMarket?
        </h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: "⚡", text: "Fast Delivery" },
            { icon: "🏆", text: "Premium Quality" },
            { icon: "📦", text: "Bulk Orders" },
            { icon: "🤝", text: "24/7 Support" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-gray-900/80 border border-gray-700 rounded-2xl text-center py-6 px-4 hover:-translate-y-2 transition-all shadow-md hover:shadow-yellow-400/20"
            >
              <p className="text-4xl mb-2 text-yellow-400">{item.icon}</p>
              <p className="text-gray-200 font-semibold">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="relative mt-20 bg-gray-900/70 border-t border-yellow-500/30 px-8 py-12 text-center rounded-t-[40px] shadow-inner shadow-yellow-500/20 z-10">
        <h3 className="text-3xl font-bold text-yellow-400 mb-10">
          What Our Customers Say
        </h3>
        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-8">
          {[
            {
              text: "Excellent quality metals and fast delivery. Highly recommended!",
              name: "Rajesh Kumar",
            },
            {
              text: "Best place to buy industrial materials in Kanpur. Great service!",
              name: "Priya Singh",
            },
          ].map((review, i) => (
            <div
              key={i}
              className="bg-gray-950/80 p-6 rounded-2xl border border-gray-700 shadow-md hover:shadow-yellow-400/10 transition-all"
            >
              <p className="text-gray-300 italic mb-4 text-lg">
                “{review.text}”
              </p>
              <p className="text-yellow-400 font-semibold">- {review.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

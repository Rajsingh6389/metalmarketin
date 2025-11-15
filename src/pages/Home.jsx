import { useEffect, useState } from "react";
import API from "../api";
import ProductCard from "../components/ProductCard";
import LoadingSpinner from "../components/LoadingSpinner";

// Local images
import copperimg from "../image/copper.png";
import sliderimg from "../image/pexels-pixabay-162534.jpg";
import slider2img from "../image/pexels-pixabay-56030.jpg";
import slider3img from "../image/pexels-padrinan-114108.jpg";

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
    <div className="pt-20 min-h-screen text-white font-inter relative overflow-hidden bg-[#0d0d0f]">

      {/* 🌌 Animated Starfield Background */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="stars"></div>
        <div className="stars2"></div>
        <div className="stars3"></div>
      </div>

      {/* ⭐ CSS ANIMATIONS */}
      <style>
        {`
          /* STARFIELD ANIMATION */
          .stars, .stars2, .stars3 {
            position: absolute;
            width: 200%;
            height: 200%;
            background-repeat: repeat;
            top: -50%;
            left: -50%;
            animation: moveStars 80s linear infinite;
          }

          .stars {
            background-image: url('https://i.ibb.co/VN3BgZP/stars1.png');
            opacity: 0.4;
          }
          .stars2 {
            background-image: url('https://i.ibb.co/5sdxLQF/stars2.png');
            opacity: 0.2;
            animation-duration: 120s;
          }
          .stars3 {
            background-image: url('https://i.ibb.co/zG3WdWw/stars3.png');
            opacity: 0.1;
            animation-duration: 180s;
          }

          @keyframes moveStars {
            from { transform: translateY(0); }
            to   { transform: translateY(-500px); }
          }

          /* FADE SLIDER */
          .slider-fade {
            width: 100%;
            height: 100%;
            position: relative;
          }

          .slider-fade-img {
            position: absolute;
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
            opacity: 0;
            animation: fadeSlide 15s infinite ease-in-out;
            transition: opacity 1s ease-in-out;
          }

          .slider-fade-img:nth-child(1) { animation-delay: 0s; }
          .slider-fade-img:nth-child(2) { animation-delay: 5s; }
          .slider-fade-img:nth-child(3) { animation-delay: 10s; }

          @keyframes fadeSlide {
            0%   { opacity: 0; }
            10%  { opacity: 1; }
            30%  { opacity: 1; }
            40%  { opacity: 0; }
            100% { opacity: 0; }
          }
        `}
      </style>

      {/* 🔥 HERO IMAGE SLIDER */}
      <div
        className="
          relative w-full 
          h-[240px] sm:h-[320px] md:h-[420px] lg:h-[500px] 
          overflow-hidden mb-14 rounded-xl 
          shadow-lg shadow-black/40
        "
      >
        <div className="slider-fade">
          <img src={sliderimg} className="slider-fade-img" />
          <img src={slider2img} className="slider-fade-img" />
          <img src={slider3img} className="slider-fade-img" />
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-xl md:text-5xl font-extrabold text-yellow-400 drop-shadow-lg">
            Premium Metals • Fast Delivery
          </h1>
          <p className="text-gray-200 mt-3 text-sm md:text-lg max-w-xl">
            India's most trusted supplier for industry-grade metals.
          </p>
        </div>
      </div>

      {/* ⭐ NEW SCROLL DOWN ANIMATION */}
      <div className="flex flex-col items-center animate-bounce">
        <p className="text-gray-300 text-sm md:text-lg tracking-wide">
          Scroll down to explore products
        </p>
        <span className="text-yellow-400 text-3xl mt-1">↓</span>
      </div>

      {/* PRODUCTS SECTION */}
      {loading ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="relative grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 px-6 sm:px-10 ">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}

      {/* POPULAR CATEGORIES */}
      <div className="relative mt-20 max-w-6xl mx-auto px-6 sm:px-10">
        <h3 className="text-3xl font-bold text-yellow-400 mb-8 text-center">
          Popular Categories
        </h3>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          {[{ img: ironimg, name: "Iron" }, { img: brassimg, name: "Brass" }, { img: copperimg, name: "Copper" }].map(
            (cat, i) => (
              <div
                key={i}
                className="bg-gray-900/80 border border-gray-700 rounded-2xl p-4 text-center shadow-lg hover:-translate-y-2 transition-all"
              >
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-full h-28 object-cover rounded-lg mb-3"
                />
                <p className="text-lg font-semibold text-gray-100">{cat.name}</p>
              </div>
            )
          )}
        </div>
      </div>

      {/* WHY CHOOSE US */}
      <div className="relative mt-20 max-w-6xl mx-auto px-6 sm:px-10 mb-20">
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
              className="bg-gray-900/80 border border-gray-700 rounded-2xl text-center py-6 px-4 hover:-translate-y-2 transition-all shadow-md"
            >
              <p className="text-4xl mb-2 text-yellow-400">{item.icon}</p>
              <p className="text-gray-200 font-semibold">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

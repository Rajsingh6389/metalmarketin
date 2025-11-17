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
    <div className="min-h-screen bg-[#f1f3f6] text-gray-900">

      {/* ---------------- HERO SLIDER ---------------- */}
      <div className="w-full aspect-[16/7] sm:aspect-[16/6] md:aspect-[16/5] lg:aspect-[16/4] bg-white shadow-sm overflow-hidden rounded-sm">
        <div className="relative h-full w-full">
          <div className="absolute inset-0 slider-fade">
            <img src={slider3img} className="slider-fade-img" alt="" />
            <img src={slider2img} className="slider-fade-img" alt="" />
            <img src={slider3img} className="slider-fade-img" alt="" />
          </div>
        </div>
      </div>

      <style>
        {`
          .slider-fade { width: 100%; height: 100%; position: relative; }
          .slider-fade-img {
            position: absolute;
            width: 100%;
            height: 100%;
            object-fit: cover;
            opacity: 0;
            animation: fadeSlide 12s infinite linear;
          }
          .slider-fade-img:nth-child(1) { animation-delay: 0s; }
          .slider-fade-img:nth-child(2) { animation-delay: 4s; }
          .slider-fade-img:nth-child(3) { animation-delay: 8s; }

          @keyframes fadeSlide {
            0% { opacity: 0; }
            10% { opacity: 1; }
            33% { opacity: 1; }
            43% { opacity: 0; }
            100% { opacity: 0; }
          }
        `}
      </style>

      {/* ---------------- CATEGORY HORIZONTAL SCROLL ---------------- */}
      <div className="bg-white shadow-sm mt-4 p-4 rounded-sm">
        <h2 className="text-lg md:text-xl font-semibold mb-4">Popular Categories</h2>

        <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-2">
          {[{ img: ironimg, name: "Iron" }, { img: brassimg, name: "Brass" }, { img: copperimg, name: "Copper" }].map(
            (cat, i) => (
              <div
                key={i}
                className="flex flex-col items-center cursor-pointer min-w-[85px] sm:min-w-[95px]"
              >
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-full border p-1 shadow-sm"
                />
                <p className="mt-2 text-xs sm:text-sm md:text-base font-medium">
                  {cat.name}
                </p>
              </div>
            )
          )}
        </div>
      </div>

      {/* ---------------- PRODUCT GRID ---------------- */}
      <div className="bg-white mt-4 p-4 md:p-6 shadow-sm rounded-sm">
        <h2 className="text-lg md:text-xl font-semibold mb-4">Products</h2>

        {loading ? (
          <div className="flex justify-center items-center h-[200px]">
            <LoadingSpinner />
          </div>
        ) : (
          <div
            className="
            grid 
            grid-cols-2 
            sm:grid-cols-3 
            md:grid-cols-4 
            lg:grid-cols-5 
            gap-3 sm:gap-4 md:gap-6
          "
          >
            {products.map((p) => (
              <div
                key={p.id}
                className="bg-white shadow-md p-2 sm:p-3 rounded-md hover:shadow-xl transition-all border cursor-pointer"
              >
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ---------------- WHY CHOOSE US ---------------- */}
      <div className="bg-white mt-5 mb-8 p-5 shadow-sm rounded-sm">
        <h2 className="text-lg md:text-xl font-semibold mb-5">Why Buy From Us?</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {[ 
            { icon: "🚚", text: "Fast Delivery" },
            { icon: "🏅", text: "High Quality Metals" },
            { icon: "📦", text: "Bulk Order Support" },
            { icon: "📞", text: "24/7 Customer Support" },
          ].map((item, i) => (
            <div
              key={i}
              className="p-4 border rounded-md shadow-sm bg-[#f8f9fb] text-center"
            >
              <p className="text-4xl sm:text-5xl">{item.icon}</p>
              <p className="font-medium mt-2 text-sm sm:text-base">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scrollbar Hide */}
      <style>
        {`
          .scrollbar-hide::-webkit-scrollbar { display: none; }
          .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        `}
      </style>
    </div>
  );
}

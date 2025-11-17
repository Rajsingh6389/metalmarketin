import { useNavigate } from "react-router-dom";
import { FiPhone, FiMapPin } from "react-icons/fi";
import { motion } from "framer-motion";

export default function AboutShop() {
  const navigate = useNavigate();

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  return (
    <div className="pt-28 px-4 sm:px-6 lg:px-8 bg-[#f1f3f6] text-gray-800 min-h-screen">

      {/* ---------------- INTRO SECTION ---------------- */}
      <motion.div
        className="max-w-5xl mx-auto flex flex-col gap-6 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#2874f0] leading-tight"
          variants={fadeInUp}
        >
          About{" "}
          <span className="text-[#ff9f00]">
            MaterialMart
          </span>
        </motion.h2>

        <motion.p
          className="text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed"
          variants={fadeInUp}
        >
          Welcome to{" "}
          <span className="text-[#2874f0] font-semibold">MaterialMart</span> —
          trusted for premium metals, fast delivery & exceptional customer service.
        </motion.p>

        {/* ------------ CONTACT SHORT INFO ------------ */}
        <div className="flex flex-col md:flex-row gap-4 justify-center mt-2">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 text-gray-700 hover:text-[#ff9f00] transition"
          >
            <FiPhone className="text-[#2874f0] w-6 h-6" />
            <span className="text-sm sm:text-base">
              Phone:{" "}
              <a href="tel:9201309578" className="font-semibold hover:text-[#2874f0]">
                9201309578
              </a>
            </span>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 text-gray-700 hover:text-[#ff9f00] transition"
          >
            <FiMapPin className="text-[#2874f0] w-6 h-6" />
            <span className="text-sm sm:text-base">
              522, Hanspuram, Naubasta, Kanpur Nagar, UP 208021
            </span>
          </motion.div>
        </div>

        {/* BUTTON */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 w-44 sm:w-52 px-5 py-3 bg-[#2874f0] text-white font-bold rounded-md shadow-md hover:bg-[#1f5fcc] transition"
          onClick={() => navigate("/")}
        >
          Explore Products
        </motion.button>
      </motion.div>

      {/* ---------------- MAP + VISIT SECTION ---------------- */}
      <motion.div
        className="mt-16 max-w-4xl mx-auto flex flex-col gap-6 items-center text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { duration: 1 } }}
        viewport={{ once: true }}
      >
        <h3 className="text-2xl sm:text-3xl font-bold text-[#2874f0]">
          Visit Our Shop
        </h3>

        <p className="text-gray-700 text-base sm:text-lg leading-relaxed max-w-3xl">
          Our store in Kanpur provides quality metals & bulk order support.
          Visit us anytime — we are happy to assist you.
        </p>

        {/* ------------ GOOGLE MAP ------------ */}
        <div className="w-full rounded-xl overflow-hidden shadow-lg border border-gray-200">
          <iframe
            title="MetalStore Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.358110932949!2d80.3177283150454!3d26.39014258315083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399c467d62cfd26d%3A0xa04877de65f55c0d!2s522%2C%20Hanspuram%2C%20Naubasta%2C%20Kanpur%20Nagar%2C%20Uttar%20Pradesh%20208021!5e0!3m2!1sen!2sin!4v1700173243012!5m2!1sen!2sin"
            width="100%"
            height="300"
            className="border-0 rounded-xl"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* ------------ CONTACT CARDS ------------ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mt-6">

          {/* Phone */}  
          <a
            href="tel:9201309578"
            className="flex flex-col items-center bg-white rounded-xl p-6 shadow-md border border-gray-200 hover:shadow-lg transition"
          >
            <div className="text-[#2874f0] text-4xl mb-1">📞</div>
            <span className="font-semibold text-gray-800 text-lg">Phone</span>
            <span className="text-gray-600 text-sm mt-1">9201309578</span>
          </a>

          {/* Address */}  
          <div className="flex flex-col items-center bg-white rounded-xl p-6 shadow-md border border-gray-200 hover:shadow-lg transition">
            <div className="text-[#2874f0] text-4xl mb-1">📍</div>
            <span className="font-semibold text-gray-800 text-lg">Address</span>
            <span className="text-gray-600 text-center text-sm mt-1 leading-relaxed">
              522, Hanspuram, Naubasta, <br /> Kanpur Nagar, Uttar Pradesh 208021
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

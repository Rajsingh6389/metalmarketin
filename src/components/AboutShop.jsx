import { useNavigate } from "react-router-dom";
import { FiPhone, FiMapPin } from "react-icons/fi";
import { motion } from "framer-motion";

export default function AboutShop() {
  const navigate = useNavigate();

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <div className="pt-28 px-4 md:px-6 bg-dark text-white min-h-screen relative">
      {/* Intro Section */}
      <motion.div
        className="max-w-6xl mx-auto flex flex-col gap-6 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-primary drop-shadow-lg"
          variants={fadeInUp}
        >
          About <span className="text-accent bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">MaterialMart</span>
        </motion.h2>
        <motion.p className="text-gray-300 text-lg md:text-xl" variants={fadeInUp}>
          Welcome to <span className="text-accent font-semibold">MaterialMart</span>!
          We offer high-quality products with fast delivery and excellent customer service.
        </motion.p>

        {/* Contact Info */}
        <div className="flex flex-col md:flex-row gap-4 justify-center mt-4">
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-3 text-gray-300 hover:text-accent cursor-pointer">
            <FiPhone className="text-accent w-6 h-6 animate-pulse" />
            <span>Phone: <a href="tel:9201309578" className="text-white font-semibold hover:text-accent">9201309578</a></span>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-3 text-gray-300 hover:text-accent cursor-pointer">
            <FiMapPin className="text-accent w-6 h-6 animate-pulse" />
            <span>Address: 522, Hanspuram, Naubasta, Kanpur Nagar, UP 208021</span>
          </motion.div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 w-48 px-5 py-3 bg-gradient-to-r from-primary to-accent text-dark font-bold rounded-xl transition-all shadow-neon mx-auto"
          onClick={() => navigate("/")}
        >
          Explore Products
        </motion.button>
      </motion.div>

      {/* Map & Contact Section */}
      <motion.div
        className="mt-20 max-w-4xl mx-auto flex flex-col gap-6 items-center text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { duration: 1 } }}
        viewport={{ once: true }}
      >
        <h3 className="text-3xl font-bold text-primary">Visit Our Shop</h3>
        <p className="text-gray-300 text-lg">
          Our physical store is located in the heart of Kanpur. Come explore our wide range of metals and materials in person. Our team is ready to assist with bulk orders and product inquiries.
        </p>

        {/* Google Map */}
        <div className="w-full rounded-2xl overflow-hidden shadow-neon">
          <iframe
            title="MetalStore Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.358110932949!2d80.3177283150454!3d26.39014258315083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399c467d62cfd26d%3A0xa04877de65f55c0d!2s522%2C%20Hanspuram%2C%20Naubasta%2C%20Kanpur%20Nagar%2C%20Uttar%20Pradesh%20208021!5e0!3m2!1sen!2sin!4v1700173243012!5m2!1sen!2sin"
            width="100%"
            height="300"
            className="border-0 rounded-2xl"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* Contact Cards */}
        <div className="grid sm:grid-cols-2 gap-4 mt-6 w-full">
          {/* Phone */}
          <a href="tel:9201309578" className="flex flex-col items-center bg-dark rounded-2xl p-4 shadow-neon hover:scale-105 transition-transform cursor-pointer">
            <div className="text-accent text-3xl mb-1 animate-pulse">📞</div>
            <span className="text-white font-semibold">Phone</span>
            <span className="text-gray-300 mt-1">9201309578</span>
          </a>

          {/* Address */}
          <div className="flex flex-col items-center bg-dark rounded-2xl p-4 shadow-neon hover:scale-105 transition-transform">
            <div className="text-accent text-3xl mb-1 animate-pulse">📍</div>
            <span className="text-white font-semibold">Address</span>
            <span className="text-gray-300 mt-1 text-center">
              522, Hanspuram, Naubasta, <br /> Kanpur Nagar, Uttar Pradesh 208021
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

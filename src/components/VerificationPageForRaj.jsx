import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function VerificationPageForRaj() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  // Read values from URL
  const cert = params.get("cert") || "N/A";
  const rawName = params.get("name") || "Unknown";

  // Convert “RitikTiwari” → “Ritik Tiwari”
  const formattedName = rawName.replace(/([A-Z])/g, " $1").trim();

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <div className="pt-20 min-h-screen text-white font-inter relative overflow-hidden bg-dark px-4 md:px-6">

      <motion.div
        className="max-w-3xl mx-auto bg-dark/40 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-10 text-center mt-10"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        {/* Verified Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1, transition: { duration: 0.5 } }}
        >
          <CheckCircle className="w-24 h-24 mx-auto mb-6 text-green-500 drop-shadow-lg" />
        </motion.div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-accent drop-shadow-lg mb-4">
          Internship Verification
        </h1>

        <p className="text-gray-300 text-lg md:text-xl">
          Certificate ID:
          <span className="text-primary font-bold ml-2">{cert}</span>
        </p>

        <p className="text-gray-300 text-lg md:text-xl mt-4">
          This is to certify that
        </p>

        <h2 className="text-3xl font-bold mt-2 text-primary">
          {formattedName}
        </h2>

        <p className="text-gray-400 mt-2 text-lg">
          from <span className="font-semibold text-accent">ABES Engineering College</span>
        </p>

        <p className="text-gray-300 mt-6 leading-relaxed text-lg">
          has successfully completed his internship at our company
          <br />
          <span className="font-semibold text-primary text-xl">MetalMarketin.com</span>.
        </p>

        <p className="mt-8 text-accent font-semibold text-lg">
          ✔ Verified & Approved
        </p>
      </motion.div>

      {/* Background glow effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-primary/30 blur-3xl rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-accent/30 blur-3xl rounded-full"></div>
      </div>
    </div>
  );
}

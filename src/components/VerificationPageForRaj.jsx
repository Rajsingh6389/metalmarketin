import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function VerificationPageForRaj() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const cert = params.get("cert") || "N/A";
  const rawName = params.get("name") || "Unknown";
  const formattedName = rawName.replace(/([A-Z])/g, " $1").trim();

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="pt-24 min-h-screen bg-[#0D1117] text-white px-4 relative overflow-hidden">

      {/* Subtle Background Glow */}
      <div className="absolute inset-0 -z-10 opacity-40">
        <div className="absolute top-32 left-10 w-80 h-80 bg-primary/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent/10 blur-[120px] rounded-full"></div>
      </div>

      {/* Company Header */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="max-w-3xl mx-auto text-center mb-10"
      >
        <h1 className="text-4xl font-bold tracking-tight text-primary">
          MetalMarketin.com
        </h1>
        <p className="text-gray-400 text-sm tracking-wide mt-2">
          Official Internship Verification Portal
        </p>
      </motion.div>

      {/* SLIP CONTAINER */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="max-w-2xl mx-auto bg-[#161B22] border border-white/10 shadow-xl rounded-2xl p-8"
      >

        {/* Verified Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <CheckCircle className="w-14 h-14 text-green-500 drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
            <div className="absolute inset-0 rounded-full blur-2xl bg-green-600/20"></div>
          </div>
        </div>

        {/* Slip Title */}
        <h2 className="text-2xl font-bold text-center text-white tracking-wide">
          Verification Slip
        </h2>
        <p className="text-center text-gray-400 text-sm mt-1">
          Certificate Authentication Record
        </p>

        {/* Divider */}
        <div className="w-full h-px bg-white/10 my-6"></div>

        {/* INFORMATION TABLE */}
        <div className="space-y-4 text-[15px]">

          <div className="flex justify-between">
            <span className="text-gray-400">Certificate ID:</span>
            <span className="font-semibold text-white">{cert}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-400">Student Name:</span>
            <span className="font-semibold text-white">{formattedName}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-400">College:</span>
            <span className="font-medium text-white">ABES Engineering College</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-400">Status:</span>
            <span className="font-semibold text-green-400">✔ Verified</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-400">Verified By:</span>
            <span className="font-medium">MetalMarketin Verification Dept.</span>
          </div>

        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/10 my-6"></div>

        {/* Footer Message */}
        <p className="text-gray-400 text-sm text-center leading-relaxed">
          This slip confirms that the above candidate has successfully completed
          the internship and the certificate is valid and registered in our system.
        </p>

        {/* Bottom Branding */}
        <div className="text-center mt-6">
          <p className="text-primary text-sm font-semibold">www.metalmarketin.com</p>
          <div className="w-24 h-[2px] bg-gradient-to-r from-primary to-accent mx-auto mt-2 rounded-full"></div>
        </div>

      </motion.div>
    </div>
  );
}

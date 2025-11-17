import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#0b0c10] text-gray-300 py-6 mt-14 border-t border-gray-700">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-3">

        {/* Left text */}
        <p className="text-sm sm:text-base">
          © {new Date().getFullYear()} All Rights Reserved
        </p>

        {/* Developers */}
        <p className="text-sm sm:text-base">
          Developed by{" "}
          <a
            href="https://rajs1nghportfollio.netlify.app/"
            className="text-orange-300 hover:text-orange-400 transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            Raj Singh
          </a>{" "}
          &{" "}
          <a
            href="https://ritiktiwari.netlify.app/"
            className="text-orange-300 hover:text-orange-400 transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ritik Tiwari
          </a>
        </p>

      </div>
    </footer>
  );
}

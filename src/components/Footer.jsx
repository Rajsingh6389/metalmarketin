import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-dark text-gray-400 py-6 mt-14">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-center items-center text-center md:text-left gap-2">
        <p>© {new Date().getFullYear()} All Rights Reserved</p>
        <p>
          Developed by{" "}
          <Link
            to="https://rajs1nghportfollio.netlify.app/"
            className="text-orange-300 hover:underline-none"
            target="_blank"
          >
            Raj Singh
          </Link>{" "}
          &{" "}
          <Link
            to="https://ritiktiwari.netlify.app/"
            className="text-orange-300 hover:underline-none"
            target="_blank"
          >
            Ritik Tiwari
          </Link>
        </p>
      </div>
    </footer>
  );
}

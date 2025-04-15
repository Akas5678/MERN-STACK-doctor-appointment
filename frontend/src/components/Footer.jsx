import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-950 py-6 w-full">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
        <div>
          <h2 className="text-xl font-bold text-gray-950">Prescripto</h2>
          <p className="mt-2 text-lg">
            Innovating the future, one step at a time. Providing top-notch
            solutions for a better tomorrow.
          </p>
        </div>

        <div>
          <h2 className="font-bold text-xl text-white">Quick Links</h2>
          <ul className="mt-2 text-sm space-y-1">
            <li>
              <a
                href="/about"
                className="hover:text-blue-700 transition duration-300"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="/doctors"
                className="hover:text-blue-700 transition duration-300"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="/"
                className="hover:text-blue-700 transition duration-300"
              >
                Blog
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="hover:text-blue-700 transition duration-300"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold  mt-6">Follow Us</h2>
          <div className="flex justify-center md:justify-start space-x-4 mt-3">
            <a
              href="#"
              className="text-gray-400 hover:text-blue-500 transition transform hover:scale-110 duration-300 text-lg"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-blue-400 transition transform hover:scale-110 duration-300 text-lg"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-pink-500 transition transform hover:scale-110 duration-300 text-lg"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-blue-700 transition transform hover:scale-110 duration-300 text-lg"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-500 text-xs mt-6 border-t border-gray-700 pt-3">
        &copy; {new Date().getFullYear()}{" "}
        <span className="font-semibold text-white">Company Name</span>. All
        rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';
import { assets } from '../assets/assets';

const Contact = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-gray-800 text-center">Contact Us</h2>
      
      {/* Contact Details & Image Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-6">
        
        {/* Left - Full Image */}
        <div className="w-full h-96 bg-gray-200 rounded-lg overflow-hidden">
          <img src={assets.contact_image} alt="Contact Us" className="w-full h-full object-cover" />
        </div>

        {/* Right - Contact Details */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md h-full flex flex-col justify-center">
          <p className="text-lg font-semibold text-gray-700">📍 Address:</p>
          <p className="text-gray-600">123 Health Street, City, Country</p>
          <p className="text-gray-600">Building 5, Floor 3, Near Central Hospital</p>
          <p className="text-gray-600">Landmark: Opposite Green Park</p>
          
          <p className="text-lg font-semibold text-gray-700 mt-4">📞 Phone:</p>
          <p className="text-gray-600">+123 456 7890</p>
          <p className="text-gray-600">+987 654 3210 (Emergency)</p>
          
          <p className="text-lg font-semibold text-gray-700 mt-4">📧 Email:</p>
          <p className="text-gray-600">contact@healthcare.com</p>
          <p className="text-gray-600">support@healthcare.com</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;

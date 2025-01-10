import React from 'react';
import { Link } from 'react-router-dom';
import NavigationButtons from './Buttons/NavigationButtons';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Logo e nome applicazione */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white font-bold">HC</span>
              </div>
              <span className="ml-2 text-gray-800 font-semibold text-lg">
                Contracts
              </span>
            </Link>
          </div>

          {/* Menu di destra con navigazione e profilo */}
          <div className="flex items-center space-x-6">
            {/* Bottoni di navigazione */}
            <div className="flex items-center">
              <NavigationButtons />
            </div>
            
            {/* Icona profilo */}
            <div className="relative">
              <button className="flex items-center space-x-1 text-gray-700 hover:text-gray-900">
                <span className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20" 
                    fill="currentColor" 
                    className="w-5 h-5"
                  >
                    <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
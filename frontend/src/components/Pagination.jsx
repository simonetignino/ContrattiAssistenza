import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex items-center justify-between py-4 px-6 bg-white border-t border-gray-200">
      <div className="flex items-center text-sm text-gray-600">
        <span>
          Pagina {currentPage} di {totalPages}
        </span>
      </div>
      
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`p-2 rounded-md ${
            currentPage === 1
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Numeri delle pagine */}
        <div className="flex items-center gap-1">
          {[...Array(totalPages)].map((_, index) => {
            const pageNumber = index + 1;
            // Mostra sempre la prima pagina, l'ultima, la pagina corrente e una pagina prima e dopo quella corrente
            if (
              pageNumber === 1 ||
              pageNumber === totalPages ||
              pageNumber === currentPage ||
              pageNumber === currentPage - 1 ||
              pageNumber === currentPage + 1
            ) {
              return (
                <button
                  key={pageNumber}
                  onClick={() => onPageChange(pageNumber)}
                  className={`w-8 h-8 rounded-md ${
                    currentPage === pageNumber
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {pageNumber}
                </button>
              );
            } else if (
              pageNumber === currentPage - 2 ||
              pageNumber === currentPage + 2
            ) {
              return <span key={pageNumber}>...</span>;
            }
            return null;
          })}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`p-2 rounded-md ${
            currentPage === totalPages
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
          }`}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
import React, { useEffect, useState } from "react";
import { getContracts } from "../../services/api.js";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import ContractHwTemplate from "../ContractHwTemplate";
import Pagination from "../Pagination.jsx";

export default function Hardware() {
  const [contracts, setContracts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchContracts = async () => {
      setLoading(true);
      try {
        const response = await getContracts({
          page: currentPage,
          limit: 16,
          sort: "number",
          sortDirection: "desc"
        });
        
        if (!response) {
          alert("Nessun contratto trovato");
          return;
        }
        
        setContracts(response.data.contracts);
        setTotalPages(response.data.totalePages);
      } catch (error) {
        console.error("Errore nell'estrarre i contratti");
      } finally {
        setLoading(false);
      }
    };
    fetchContracts();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo(0, 0);
  };

  const getContractTimeStatus = (contract) => {
    if (!contract.endingDuration) {
      return {
        status: "Non definito",
        dotColor: "bg-gray-500"
      };
    }

    const today = new Date();
    const endDate = new Date(contract.endingDuration);
    const daysUntilEnd = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));

    if (daysUntilEnd <= 0) {
      return {
        status: "Scaduto",
        dotColor: "bg-red-500"
      };
    } else if (daysUntilEnd <= 30) {
      return {
        status: "In scadenza",
        dotColor: "bg-yellow-500"
      };
    } else {
      return {
        status: "Attivo",
        dotColor: "bg-green-500"
      };
    }
  };

  const getRemainingHoursStyle = (remainingHours, contractHours) => {
    const percentage = (remainingHours / (contractHours * 60)) * 100;
    
    if (percentage <= 20) {
      return "text-gray-600 border border-red-200 rounded px-2 py-1 bg-red-50";
    } else if (percentage <= 50) {
      return "text-gray-600 border border-yellow-200 rounded px-2 py-1 bg-yellow-50";
    } else {
      return "text-gray-600";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg mx-4 my-6">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">
            Contratti Hardware
          </h2>
          <Link
            to="/create"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors duration-200 flex items-center gap-2"
          >
            <span className="text-lg">+</span>
            <span>Nuovo Contratto</span>
          </Link>
        </div>
      </div>
      
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                {[
                  "Cliente",
                  "Indirizzo",
                  "Tipo Contratto",
                  "Ore Contratto",
                  "Ore Rimanenti",
                  "Numero Contratto",
                  "Scadenza",
                  "Status Contratto",
                  "Scadenza",
                  "N° Interventi",
                  // "Azioni"
                ].map((header, index) => (
                  <th key={index} className="text-left p-4 text-sm font-medium text-gray-600 border-b border-gray-200">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {contracts.map((contract, index) => {
                const timeStatus = getContractTimeStatus(contract);
                const remainingHoursStyle = getRemainingHoursStyle(contract.remainingHours, contract.contractHours);
                
                return (
                  <tr
                    key={contract.id || index}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-all duration-200"
                  >
                    <td className="p-4 text-sm text-gray-600">{contract.holder.name}</td>
                    <td className="p-4 text-sm text-gray-600">{contract.holder.address}</td>
                    <td className="p-4 text-sm text-gray-600">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        contract.contractType === 'Gold' ? 'bg-yellow-100 text-yellow-800' :
                        contract.contractType === 'Silver' ? 'bg-gray-100 text-gray-800' :
                        contract.contractType === 'Standard' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {contract.contractType}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-gray-600">{contract.contractHours}h</td>
                    <td className="p-4 text-sm">
                      <span className={remainingHoursStyle}>
                        {Math.floor(contract.remainingHours / 60)}h e {contract.remainingHours % 60}m
                      </span>
                    </td>
                    <td className="p-4 text-sm">
                      <Link
                        to={`/contracts-hw/${contract._id}/interventions`}
                        className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                      >
                        {contract.letter + "/" + contract.number}
                      </Link>
                    </td>
                    <td className="p-4 text-sm text-gray-600">
                      {contract.endingDuration && format(new Date(contract.endingDuration), 'dd/MM/yyyy')}
                    </td>
                    <td className="p-4 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        contract.status === 'In corso' ? 'bg-green-100 text-green-800' :
                        contract.status === 'In attesa' ? 'bg-yellow-100 text-yellow-800' :
                        contract.status === 'Scaduto' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {contract.status}
                      </span>
                    </td>
                    <td className="p-4 text-sm">
                      <div className="relative inline-block">
                        <div 
                          className={`w-3 h-3 rounded-full ${timeStatus.dotColor} cursor-help`}
                          title={timeStatus.status}
                        />
                      </div>
                    </td>
                    <td className="p-4 text-sm text-gray-600">
                      <span className="bg-gray-100 px-2 py-1 rounded-full">
                        {contract.interventionsCount}
                      </span>
                    </td>
                    {/* <td className="p-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <ContractHwTemplate 
                          clientData={contract.holder}
                          selectedPlan={contract.contractType}
                        />
                        <Link
                          to={`/contracts-hw/${contract._id}/upload`}
                          className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                          title="Carica contratto firmato"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="17 8 12 3 7 8" />
                            <line x1="12" y1="3" x2="12" y2="15" />
                          </svg>
                        </Link>
                      </div>
                    </td> */}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Paginazione inferiore */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
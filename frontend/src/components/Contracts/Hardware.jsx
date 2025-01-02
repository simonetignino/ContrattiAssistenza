import React, { useEffect, useState } from "react";
import { getContracts } from "../../services/api.js";
import { format } from "date-fns";
import { Link } from "react-router-dom";

export default function Hardware() {
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const response = await getContracts();
        if (!response) {
          alert("Nessun contratto trovato")
        }
        setContracts(response.data.contracts)
      } catch (error) {
        console.error("Errore nell'estrarre i contratti")
      }
    }
    fetchContracts();
  }, [])

  return (
    <div className="bg-white rounded-lg shadow-lg mx-4 my-6">
      {/* Header della sezione */}
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

      {/* Contenuto della tabella */}
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                {["Cliente", "Indirizzo", "Tipo Contratto", "Ore Contratto", "Ore Rimanenti", "Numero Contratto", "Scadenza", "N° Interventi"].map((header, index) => (
                  <th key={index} className="text-left p-4 text-sm font-medium text-gray-600 border-b border-gray-200">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {contracts.map((contract, index) => (
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
                  <td className="p-4 text-sm text-gray-600">{contract.contractHours}</td>
                  <td className="p-4 text-sm text-gray-600">{contract.remainingHours}</td>
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
                  <td className="p-4 text-sm text-gray-600">
                    <span className="bg-gray-100 px-2 py-1 rounded-full">
                      {contract.interventionsCount}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
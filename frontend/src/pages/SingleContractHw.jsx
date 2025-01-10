import React, { useEffect, useState } from "react";
import { getContract, getInterventions } from "../services/api";
import { Link, useParams } from "react-router-dom";
import NewInterventiontHw from "../components/Buttons/NewInterventionHw";
import NavigationButtons from "../components/Buttons/NavigationButtons";
import Pagination from "../components/Pagination";
import { format } from "date-fns";
import RemainingHours from "../components/RemainingHours";

export default function SingleContractHw() {
  const { id } = useParams();
  const [contract, setContract] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    limit: 16,
    total: 0,
    interventions: []
  });

  useEffect(() => {
    const fetchContract = async () => {
      try {
        const response = await getContract(id);
        setContract(response.data);
      } catch (error) {
        console.error("Impossibile trovare il contratto", error);
      }
    };
    fetchContract();
  }, [id]);

  useEffect(() => {
    const fetchInterventions = async () => {
      setIsLoading(true);
      try {
        const response = await getInterventions(id, {
          page: pagination.currentPage,
          limit: pagination.limit,
          sort: 'number',
          sortDirection: 'desc'
        });

        setPagination(prev => ({
          ...prev,
          interventions: response.data.interventions,
          currentPage: response.data.currentPage,
          totalPages: response.data.totalPages,
          total: response.data.totalInterventions
        }));
      } catch (error) {
        console.error("Errore nel recuperare gli interventi", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchInterventions();
    }
  }, [id, pagination.currentPage]);

  const handlePageChange = (newPage) => {
    setPagination(prev => ({
      ...prev,
      currentPage: newPage
    }));
    window.scrollTo(0, 0);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-gray-600">Caricamento...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Card principale */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header con info contratto */}
          <div className="border-b border-gray-200 bg-white px-6 py-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  {contract.holder?.name}
                </h2>
                <p className="text-gray-600 mt-1">
                  {contract.holder?.address}, {contract.holder?.city} ({contract.holder?.district})
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  contract.contractType === 'Gold' ? 'bg-yellow-100 text-yellow-800' :
                  contract.contractType === 'Silver' ? 'bg-gray-100 text-gray-800' :
                  contract.contractType === 'Standard' ? 'bg-blue-100 text-blue-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {contract.contractType}
                </span>
                <NewInterventiontHw id={contract._id} />
              </div>
            </div>
            
            {/* Stats del contratto */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Ore Contratto</p>
                <p className="text-xl font-semibold text-gray-800">{contract.contractHours} ore</p>
              </div>
              <RemainingHours 
                remainingHours={contract.remainingHours} 
                contractHours={contract.contractHours}
              />
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Numero Interventi</p>
                <p className="text-xl font-semibold text-gray-800">{contract.interventionsCount || 0}</p>
              </div>
            </div>
          </div>

          {/* Tabella interventi con paginazione */}
          <div>
            <div className="px-6 pt-4">
              <Pagination 
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Data</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">N° Intervento</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Tipo</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Durata</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Eseguito da</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Problema</th>
                  </tr>
                </thead>
                <tbody>
                  {pagination.interventions.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center py-8 text-gray-500">
                        Nessun intervento registrato
                      </td>
                    </tr>
                  ) : (
                    pagination.interventions.map((intervention, index) => (
                      <tr 
                        key={intervention._id || index}
                        className="border-b border-gray-100 hover:bg-gray-50 transition-all duration-200"
                      >
                        <td className="py-4 px-6 text-sm text-gray-600">
                          {intervention.interventionDate && format(new Date(intervention.interventionDate), 'dd/MM/yyyy')}
                        </td>
                        <td className="py-4 px-6 text-sm text-gray-900 font-medium">
                          <Link to={`/contracts-hw/${id}/interventions/${intervention._id}`}>
                            {intervention.letter}/{intervention.number}
                          </Link>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            intervention.interventionType === 'Fisico' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {intervention.interventionType}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-sm text-gray-600">
                          {Math.floor(intervention.duration / 60)} ore e {intervention.duration % 60} minuti
                        </td>
                        <td className="py-4 px-6 text-sm text-gray-600">
                          {intervention.carriedBy}
                        </td>
                        <td className="py-4 px-6 text-sm text-gray-600">
                          {intervention.problemEncountered.length > 50 
                            ? `${intervention.problemEncountered.substring(0, 50)}...` 
                            : intervention.problemEncountered}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="px-6 pb-4">
              <Pagination 
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
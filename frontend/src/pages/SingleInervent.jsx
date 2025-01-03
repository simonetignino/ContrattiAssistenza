import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getIntervention } from "../services/api";
import NavigationButtons from "../components/Buttons/NavigationButtons";
import { format } from "date-fns";

export default function SingleIntervention() {
  const { id } = useParams();
  const [intervention, setIntervention] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchIntervention = async () => {
      setIsLoading(true);
      try {
        const response = await getIntervention(id);
        setIntervention(response.data);
      } catch (error) {
        console.error("Impossibile trovare l'intervento", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchIntervention();
  }, [id]);

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
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header con info intervento */}
          <div className="border-b border-gray-200 bg-white px-6 py-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  Intervento #{intervention.number}{intervention.letter}
                </h2>
                <p className="text-gray-600 mt-1">
                  Eseguito da: {intervention.carriedBy}
                </p>
              </div>
              <div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  intervention.interventionType === 'Fisico' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {intervention.interventionType}
                </span>
              </div>
            </div>

            {/* Stats dell'intervento */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Data Intervento</p>
                <p className="text-xl font-semibold text-gray-800">
                  {intervention.interventionDate && format(new Date(intervention.interventionDate), 'dd/MM/yyyy')}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Durata</p>
                <p className="text-xl font-semibold text-gray-800">
                  {Math.floor(intervention.duration / 60)} ore e {intervention.duration % 60} minuti
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Inserito da</p>
                <p className="text-xl font-semibold text-gray-800">{intervention.insertBy}</p>
              </div>
            </div>
          </div>

          {/* Dettagli intervento */}
          <div className="px-6 py-4">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Problema Riscontrato</h3>
                <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">
                  {intervention.problemEncountered}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Intervento Effettuato</h3>
                <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">
                  {intervention.interventionCarriedOut}
                </p>
              </div>

              {intervention.notes && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Note</h3>
                  <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">
                    {intervention.notes}
                  </p>
                </div>
              )}

              {intervention.itemsUsed && intervention.itemsUsed.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Materiali Utilizzati</h3>
                  <div className="bg-gray-50 rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Articolo</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Quantità</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Note</th>
                        </tr>
                      </thead>
                      <tbody>
                        {intervention.itemsUsed.map((item, index) => (
                          <tr key={index} className="border-t border-gray-200">
                            <td className="py-3 px-4 text-sm text-gray-600">{item.name}</td>
                            <td className="py-3 px-4 text-sm text-gray-600">{item.quantity}</td>
                            <td className="py-3 px-4 text-sm text-gray-600">{item.notes || '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer con navigazione */}
          <div className="border-t border-gray-200 px-6 py-4">
            <NavigationButtons />
          </div>
        </div>
      </div>
    </div>
  );
}
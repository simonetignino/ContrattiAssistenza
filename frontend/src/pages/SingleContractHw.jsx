import React, { useEffect, useState } from "react";
import { getContract } from "../services/api";
import { Link, useParams } from "react-router-dom";
import NewInterventiontHw from "../components/Buttons/NewInterventionHw";

export default function SingleContractHw() {
  const { id } = useParams();
  const [contract, setContract] = useState({});
  const [interventions, setInterventions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContractAndInterventions = async () => {
      setIsLoading(true);
      try {
        const response = await getContract(id);
        const contractData = response.data;
        const interventionsData = response.data.interventions || [];

        setContract(contractData);
        setInterventions(interventionsData);
      } catch (error) {
        console.error("Impossibile trovare il contratto", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchContractAndInterventions();
  }, [id]);

  if (isLoading) {
    return <div>Caricamento...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-center mb-8 font-bold">Interventi effettuati a {contract.holder.name}</h2>
      <div className="flex justify-end mb-5">
        <NewInterventiontHw id={contract._id} />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg">
          <thead className="bg-blue-50 border-b">
            <tr>
              {["Cliente", "Indirizzo", "Tipo Intervento", "Durata Intervento", "Numero intervento", "Data"].map(
                (header, index) => (
                  <th key={index} className="p-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {interventions.map((intervention, index) => (
              <tr
                key={intervention.id || index}
                className="border-b hover:bg-gray-100 transition-colors"
              >
                <td className="px-3 text-sm text-gray-700">{contract.holder.name}</td>
                <td className="px-3 text-sm text-gray-700">{contract.holder.address || "Indirizzo non disponibile"}</td>
                <td className="px-3 text-sm text-gray-700">{intervention.interventionType || "Tipo non specificato"}</td>
                <td className="px-3 text-sm text-gray-700">{intervention.duration || "N/A"}</td>
                <td className="px-3 text-sm text-gray-700">{intervention.number || "N/A"}</td>
                <td className="px-3 text-sm text-gray-700">
                  <Link to={`/interventions/${intervention.id}`}>{intervention.date || "Data non disponibile"}</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

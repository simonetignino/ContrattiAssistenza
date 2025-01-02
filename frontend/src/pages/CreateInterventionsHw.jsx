import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getContract, createIntervention, updateIntervention, updateContract } from "../services/api";

export default function CreateInterventionsHw() {
    const [intervention, setIntervention] = useState({
        number: 1,
        letter: 'I',
        problemEncountered: '',
        interventionCarriedOut: '',
        carriedBy: '',
        insertBy: '',
        notes: '',
        itemsUsed: [],
        interventionDate: '',
        interventionType: '',
        durationH: 0,
        durationM: 0,
        duration: 0
    });
    
    const [contractData, setContractData] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchContract = async () => {
            try {
                const response = await getContract(id);
                setContractData(response.data);
                
                // Trova l'ultimo numero di intervento
                if (response.data && response.data.interventions && response.data.interventions.length > 0) {
                    const lastIntervention = response.data.interventions.reduce((max, intervention) => 
                        intervention.number > max ? intervention.number : max
                    , 0);
                    
                    // Incrementa di 1 il numero dell'ultimo intervento
                    setIntervention(prev => ({
                        ...prev,
                        number: lastIntervention + 1
                    }));
                }
            } catch (error) {
                console.error("Impossibile recuperare gli interventi");
            }
        };
        fetchContract();
    }, [id]); // Aggiunto id alle dipendenze

    const handleChange = (e) => {
        const { name, value } = e.target;
        setIntervention(prev => ({
            ...prev,
            [name]: name === 'durationH' || name === 'durationM' ? Number(value) : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try { 
            // Convertiamo la durata in numero e formatta itemsUsed come array
            const totalMinutes = (Number(intervention.durationH) * 60) + Number(intervention.durationM);

            const formattedIntervention = {
                ...intervention,
                duration: totalMinutes,  // Usiamo i minuti totali
            };
            console.log('URL della richiesta:', `/contracts-hw/${id}/interventions`);
            console.log('Dati intervento formattati:', formattedIntervention);
            await createIntervention(id, formattedIntervention);
            // await updateContract(id, updatedContractData);     
            navigate(`/contracts-hw/${id}/interventions`);
        } catch (error) {
            console.error("Errore completo:", error);
            if (error.response) {
                console.error("Status:", error.response.status);
                console.error("Dati errore:", error.response.data);
                console.error("Headers:", error.response.headers);
            } else if (error.request) {
                console.error("Richiesta:", error.request);
            }
            console.error("Config richiesta:", error.config);
            alert(`Errore durante il salvataggio dell'intervento. Controlla la console per i dettagli.`);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold text-center mb-6">
                Nuovo Intervento
            </h2>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Numero</label>
                        <input
                            type="number"
                            name="number"
                            value={intervention.number}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                            disabled
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Lettera</label>
                        <input
                            type="text"
                            name="letter"
                            value={intervention.letter}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                            disabled
                        />
                    </div>
                    <div className="col-span-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Problema Riscontrato</label>
                        <textarea
                            name="problemEncountered"
                            value={intervention.problemEncountered}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-24"
                            required
                        />
                    </div>
                    <div className="col-span-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Intervento Effettuato</label>
                        <textarea
                            name="interventionCarriedOut"
                            value={intervention.interventionCarriedOut}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-24"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Eseguito Da</label>
                        <input
                            type="text"
                            name="carriedBy"
                            value={intervention.carriedBy}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Inserito Da</label>
                        <input
                            type="text"
                            name="insertBy"
                            value={intervention.insertBy}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                            required
                        />
                    </div>
                    <div className="col-span-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Note</label>
                        <textarea
                            name="notes"
                            value={intervention.notes}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-24"
                        />
                    </div>
                    {/* <div className="col-span-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Materiale Utilizzato</label>
                        <textarea
                            name="itemsUsed"
                            value={intervention.itemsUsed}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                        />
                    </div> */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Data Intervento</label>
                        <input
                            type="date"
                            name="interventionDate"
                            value={intervention.interventionDate}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Tipo Intervento</label>
                        <select
                            name="interventionType"
                            value={intervention.interventionType}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                            required
                        >
                            <option value="">Seleziona tipo</option>
                            <option value="Fisico">Fisico</option>
                            <option value="Remoto">Remoto</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Ore</label>
                        <input
                            type="number"
                            name="durationH"
                            value={intervention.durationH}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Minuti</label>
                        <input
                            type="number"
                            name="durationM"
                            value={intervention.durationM}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                        />
                    </div>
                </div>
                <div className="flex items-center justify-center mt-6">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Salva Intervento
                    </button>
                </div>
            </form>
        </div>
    );
}
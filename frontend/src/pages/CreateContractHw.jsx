import React, { useState, useEffect } from 'react';
import { createContract, updateContract, getContract, getContracts } from '../services/api';
import { useNavigate } from "react-router-dom";
import NavigationButtons from '../components/Buttons/NavigationButtons';

export default function CreateContractHw({ contractId = null }) {
  const [numberC, setNumberC] = useState();
  const [maxNumber, setMaxNumber] = useState(0);
  const [contracts, setContracts] = useState([]);

  const [contract, setContract] = useState({
    holder: {
      name: '',
      address: '',
      city: '',
      district: '',
      cap: ''
    },
    contractType: '',
    contractHours: '',
    remainingHours: '',
    letter: 'C',
    number: 1,
    endingDuration: '',
    interventionsCount: 0,
    signedContract: '',
    annualAmount: '',
    contractDuration: '',
    remainingDuration: '',
    insertBy: '',
    lastModified: ''
  });

  const navigate = useNavigate();

  // Primo useEffect per caricare i contratti e calcolare il numero massimo
  useEffect(() => {
    const fetchNumber = async () => {
      try {
        const response = await getContracts();
        const contractsData = response.data.contracts;
        // Troviamo il numero massimo
        const maxNum = contractsData.reduce((max, contract) => {
          return contract.number > max ? contract.number : max;
        }, 0);
        
        setContracts(contractsData);
        setMaxNumber(maxNum);
        setNumberC(maxNum + 1);
        
      } catch (error) {
        console.log('Errore:', error);
        alert("Errore nel trovare il numero contratto")
      }
    };
    
    fetchNumber();
  }, []);

  // useEffect per aggiornare il numero del contratto quando numberC cambia
  useEffect(() => {
    if (numberC) {
      setContract(prev => ({
        ...prev,
        number: numberC
      }));
    }
  }, [numberC]);

  // useEffect per recuperare un contratto esistente se stiamo modificando
  useEffect(() => {
    if (contractId) {
      const fetchContract = async () => {
        try {
          const response = await getContract(contractId);
          setContract(response.data);
        } catch (error) {
          console.error("Errore nel recuperare il contratto");
        }
      };
      fetchContract();
    }
  }, [contractId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split('.');
    
    if (keys.length > 1) {
      setContract(prev => ({
        ...prev,
        [keys[0]]: {
          ...prev[keys[0]],
          [keys[1]]: value
        }
      }));
    } else {
      setContract(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (contractId) {
        await updateContract(contractId, contract);
        alert("Contratto aggiornato con successo");
      } else {
        await createContract(contract);
        alert("Contratto creato con successo");
        navigate("/")
      }
    } catch (error) {
      console.error("Errore nel salvare il contratto");
      alert("Errore nel salvare il contratto");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Container principale con ombreggiatura e bordi arrotondati */}
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
        {/* Header del form */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            {contractId ? 'Modifica Contratto' : 'Nuovo Contratto'}
          </h2>
        </div>

        {/* Form content */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sezione Cliente */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-medium text-gray-700 mb-4">Dati Cliente</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Nome e Cognome / Azienda
                  </label>
                  <input
                    type="text"
                    name="holder.name"
                    value={contract.holder.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Città
                  </label>
                  <input
                    type="text"
                    name="holder.city"
                    value={contract.holder.city}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Provincia
                  </label>
                  <select
                    name="holder.district"
                    value={contract.holder.district}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    required
                  >
                    <option value="">Seleziona provincia</option>
                    {/* ... opzioni province ... */}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    CAP
                  </label>
                  <input
                    type="text"
                    name="holder.cap"
                    value={contract.holder.cap}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Indirizzo
                  </label>
                  <input
                    type="text"
                    name="holder.address"
                    value={contract.holder.address}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Sezione Dettagli Contratto */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-medium text-gray-700 mb-4">Dettagli Contratto</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Tipo Contratto
                  </label>
                  <select
                    name="contractType"
                    value={contract.contractType}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    required
                  >
                    <option value="">Seleziona tipo</option>
                    <option value="Mini">Mini</option>
                    <option value="Standard">Standard</option>
                    <option value="Plus">Plus</option>
                    <option value="Silver">Silver</option>
                    <option value="Gold">Gold</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Ore Contratto
                  </label>
                  <input
                    type="number"
                    name="contractHours"
                    value={contract.contractHours}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Scadenza Contratto
                  </label>
                  <input
                    type="date"
                    name="endingDuration"
                    value={contract.endingDuration}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer con pulsanti */}
          <div className="mt-8 flex justify-between items-center">
            <NavigationButtons />
            <button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors duration-200"
            >
              {contractId ? 'Aggiorna Contratto' : 'Crea Contratto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

          
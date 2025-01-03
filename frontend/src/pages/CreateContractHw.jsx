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
    remainingHours: 0,
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
        const formattedContract = {
          ...contract,
          remainingHours: contract.contractHours * 60
        }
        await createContract(formattedContract);
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
                    <option value="AG">Agrigento</option>
                    <option value="AL">Alessandria</option>
                    <option value="AN">Ancona</option>
                    <option value="AO">Aosta</option>
                    <option value="AR">Arezzo</option>
                    <option value="AP">Ascoli Piceno</option>
                    <option value="AT">Asti</option>
                    <option value="AV">Avellino</option>
                    <option value="BA">Bari</option>
                    <option value="BT">Barletta-Andria-Trani</option>
                    <option value="BL">Belluno</option>
                    <option value="BN">Benevento</option>
                    <option value="BG">Bergamo</option>
                    <option value="BI">Biella</option>
                    <option value="BO">Bologna</option>
                    <option value="BZ">Bolzano</option>
                    <option value="BS">Brescia</option>
                    <option value="BR">Brindisi</option>
                    <option value="CA">Cagliari</option>
                    <option value="CL">Caltanissetta</option>
                    <option value="CB">Campobasso</option>
                    <option value="CE">Caserta</option>
                    <option value="CT">Catania</option>
                    <option value="CZ">Catanzaro</option>
                    <option value="CH">Chieti</option>
                    <option value="CO">Como</option>
                    <option value="CS">Cosenza</option>
                    <option value="CR">Cremona</option>
                    <option value="KR">Crotone</option>
                    <option value="CN">Cuneo</option>
                    <option value="EN">Enna</option>
                    <option value="FM">Fermo</option>
                    <option value="FE">Ferrara</option>
                    <option value="FI">Firenze</option>
                    <option value="FG">Foggia</option>
                    <option value="FC">Forlì-Cesena</option>
                    <option value="FR">Frosinone</option>
                    <option value="GE">Genova</option>
                    <option value="GO">Gorizia</option>
                    <option value="GR">Grosseto</option>
                    <option value="IM">Imperia</option>
                    <option value="IS">Isernia</option>
                    <option value="SP">La Spezia</option>
                    <option value="AQ">L'Aquila</option>
                    <option value="LT">Latina</option>
                    <option value="LE">Lecce</option>
                    <option value="LC">Lecco</option>
                    <option value="LI">Livorno</option>
                    <option value="LO">Lodi</option>
                    <option value="LU">Lucca</option>
                    <option value="MC">Macerata</option>
                    <option value="MN">Mantova</option>
                    <option value="MS">Massa-Carrara</option>
                    <option value="MT">Matera</option>
                    <option value="ME">Messina</option>
                    <option value="MI">Milano</option>
                    <option value="MO">Modena</option>
                    <option value="MB">Monza e Brianza</option>
                    <option value="NA">Napoli</option>
                    <option value="NO">Novara</option>
                    <option value="NU">Nuoro</option>
                    <option value="OR">Oristano</option>
                    <option value="PD">Padova</option>
                    <option value="PA">Palermo</option>
                    <option value="PR">Parma</option>
                    <option value="PV">Pavia</option>
                    <option value="PG">Perugia</option>
                    <option value="PU">Pesaro e Urbino</option>
                    <option value="PE">Pescara</option>
                    <option value="PC">Piacenza</option>
                    <option value="PI">Pisa</option>
                    <option value="PT">Pistoia</option>
                    <option value="PN">Pordenone</option>
                    <option value="PZ">Potenza</option>
                    <option value="PO">Prato</option>
                    <option value="RG">Ragusa</option>
                    <option value="RA">Ravenna</option>
                    <option value="RC">Reggio Calabria</option>
                    <option value="RE">Reggio Emilia</option>
                    <option value="RI">Rieti</option>
                    <option value="RN">Rimini</option>
                    <option value="RM">Roma</option>
                    <option value="RO">Rovigo</option>
                    <option value="SA">Salerno</option>
                    <option value="SS">Sassari</option>
                    <option value="SV">Savona</option>
                    <option value="SI">Siena</option>
                    <option value="SR">Siracusa</option>
                    <option value="SO">Sondrio</option>
                    <option value="SU">Sud Sardegna</option>
                    <option value="TA">Taranto</option>
                    <option value="TE">Teramo</option>
                    <option value="TR">Terni</option>
                    <option value="TO">Torino</option>
                    <option value="TP">Trapani</option>
                    <option value="TN">Trento</option>
                    <option value="TV">Treviso</option>
                    <option value="TS">Trieste</option>
                    <option value="UD">Udine</option>
                    <option value="VA">Varese</option>
                    <option value="VE">Venezia</option>
                    <option value="VB">Verbano-Cusio-Ossola</option>
                    <option value="VC">Vercelli</option>
                    <option value="VR">Verona</option>
                    <option value="VV">Vibo Valentia</option>
                    <option value="VI">Vicenza</option>
                    <option value="VT">Viterbo</option>
                    <option value="ALTRO">Altro</option>
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

          
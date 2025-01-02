import React, { useEffect, useState } from "react";
import { getContracts } from "../services/api";
import Tabs from "../components/Tabs";
import NewContractHw from "../components/Buttons/NewContractHw";

export default function Home() {
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
    
    <div className="container mx-auto">
      < Tabs />
    </div>
  )
}
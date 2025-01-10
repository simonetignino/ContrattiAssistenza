import axios from "axios"

const API_URL = "http://localhost:5001";
const api = axios.create({ baseURL: API_URL });

// Chiamate per i contratti
export const getContracts = (params = {}) => {
        const { page = 1, limit = 16, sort = 'number', sortDirection = 'desc' } = params;

        const queryParams = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
            sort,
            sortDirection
        }).toString();

        return api.get(`/contracts-hw${queryParams ? `?${queryParams}` : ''}`);
  };
export const getContract = (id) => api.get(`/contracts-hw/${id}`);
export const deleteContract = (id) => api.delete(`/contracts-hw/${id}`);
export const updateContract = (id, contractData) => api.patch(`/contracts-hw/${id}`, contractData);
export const createContract = (contractData) => api.post(`/contracts-hw`, contractData, {
    headers: { "Content-Type": "application/json" },
});

// Chiamate per gli interventi 
export const getInterventions = (id, params = {}) => {
    const { page = 1, limit = 16, sort = 'number', sortDirection = 'desc' } = params;
    
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      sort,
      sortDirection
    }).toString();
  
    return api.get(`/contracts-hw/${id}/interventions${queryParams ? `?${queryParams}` : ''}`);
  };
export const getIntervention = (id, interventionId) => api.get(`/contracts-hw/${id}/interventions/${interventionId}`);
export const deleteIntervention = (id, interventionId) => api.delete(`/contracts-hw/${id}/interventions/${interventionId}`);
export const updateIntervention = (id, interventionId, interventionData) => api.patch(`/contracts-hw/${id}/interventions/${interventionId}`, interventionData);
export const createIntervention = (id, interventionData) => api.post(`/contracts-hw/${id}/interventions`, interventionData, {
    headers: { "Content-type": "application/json" },
});